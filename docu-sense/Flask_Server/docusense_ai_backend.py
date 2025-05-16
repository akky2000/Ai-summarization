











from fastapi import FastAPI, File, UploadFile, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
import tempfile
import os
import fitz  # PyMuPDF
import docx2txt
from PIL import Image
import spacy
from transformers import pipeline, logging
import traceback
import requests
from urllib.parse import urlparse

# Disable transformers logging
logging.set_verbosity_error()

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Tesseract path (update for your system)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Load NLP models
nlp = spacy.load("en_core_web_sm")
summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small")

@app.post("/process-document")
async def process_document(file: UploadFile = File(...)):
    """Endpoint for direct file uploads"""
    return await process_file(file, is_upload=True)

@app.post("/process-url")
async def process_url(data: dict = Body(...)):
    """Endpoint for Cloudinary URLs"""
    url = data.get("url")
    if not url:
        return JSONResponse({"error": "URL parameter is required"}, status_code=400)
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        parsed_url = urlparse(url)
        filename = os.path.basename(parsed_url.path)
        file_ext = os.path.splitext(filename)[1].lower()
        
        if file_ext not in ('.pdf', '.docx', '.jpg', '.jpeg', '.png'):
            return JSONResponse({"error": "Unsupported file format"}, status_code=400)
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as tmp:
            tmp.write(response.content)
            tmp_path = tmp.name
        
        return await process_file(tmp_path, filename, original_url=url, is_upload=False)
    
    except requests.exceptions.RequestException as e:
        return JSONResponse({"error": f"Failed to fetch document: {str(e)}"}, status_code=400)
    except Exception as e:
        print(f"❌ Processing error: {str(e)}")
        print(traceback.format_exc())
        return JSONResponse({"error": f"Processing failed: {str(e)}"}, status_code=500)
    finally:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)

async def process_file(file, filename=None, original_url=None, is_upload=True):
    """Common processing logic for both uploads and URLs"""
    tmp_path = None
    try:
        if is_upload:
            # Handle uploaded file
            file_ext = os.path.splitext(file.filename)[1].lower()
            if file_ext not in ('.pdf', '.docx', '.jpg', '.jpeg', '.png',".doc"):
                return JSONResponse({"error": "Unsupported file format"}, status_code=400)
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as tmp:
                tmp.write(await file.read())
                tmp_path = tmp.name
            filename = file.filename
            file_path = tmp_path
        else:
            # Handle temporary file from URL
            file_path = file

        # Extract text based on file extension
        file_ext = os.path.splitext(filename)[1].lower()
        try:
            if file_ext == '.pdf':
                text = extract_text_from_pdf(file_path)
            elif file_ext == '.docx':
                text = extract_text_from_docx(file_path)

                
            elif file_ext in ('.jpg', '.jpeg', '.png'):
                text = extract_text_from_image(file_path)
        except ValueError as e:
            return JSONResponse({"error": str(e)}, status_code=400)
        except RuntimeError as e:
            return JSONResponse({"error": str(e)}, status_code=400)
        except Exception as e:
            return JSONResponse({"error": f"Error extracting text: {str(e)}"}, status_code=500)

        # Process extracted text
        entities = extract_named_entities(text)
        classification = classify_and_summarize(text)

        return {
            "filename": filename,
            "url": original_url,
            "text_preview": text[:1000],
            "entities": entities,
            "classification": classification
        }

    except Exception as e:
        print(f"❌ Processing error: {str(e)}")
        print(traceback.format_exc())
        return JSONResponse({"error": f"Processing failed: {str(e)}"}, status_code=500)
    finally:
        if is_upload and tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = "\n".join([page.get_text() for page in doc])
    if not text.strip():
        raise ValueError("No text found in PDF")
    return text

def extract_text_from_docx(docx_path):
    text = docx2txt.process(docx_path)
    if not text.strip():
        raise ValueError("No text found in DOCX")
    return text

def extract_text_from_image(image_path):
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image).strip()
        if not text:
            raise ValueError("No text detected in image")
        return text
    except Exception as e:
        raise RuntimeError(f"OCR failed: {e}")

def extract_named_entities(text):
    doc = nlp(text)
    result = {"PERSON": [], "EMAIL": [], "DATE": [], "MONEY": []}
    for ent in doc.ents:
        if ent.label_ in result:
            result[ent.label_].append(ent.text)
    # Extract emails from the existing doc
    result["EMAIL"] = [token.text for token in doc if token.like_email]
    return result

def classify_and_summarize(text):
    short_text = text[:1000] if len(text) > 1000 else text
    try:
        summary = summarizer(short_text, max_length=600, min_length=20, do_sample=False)[0]['summary_text']
    except Exception as e:
        summary = f"Summarization failed: {str(e)}"

    lowered = short_text.lower()
    doc_type = "Unknown"
    
    if any(keyword in lowered for keyword in ["curriculum vitae", "objective", "work experience"]):
        doc_type = "Resume"
    elif any(keyword in lowered for keyword in ["invoice number", "bill to", "total amount"]):
        doc_type = "Invoice"
    elif any(keyword in lowered for keyword in ["report", "analysis", "findings"]):
        doc_type = "Report"
    elif any(keyword in lowered for keyword in ["contract", "agreement", "clause"]):
        doc_type = "Legal Document"

    return {"type": doc_type, "summary": summary}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
