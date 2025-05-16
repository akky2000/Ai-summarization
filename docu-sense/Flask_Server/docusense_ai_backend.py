# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import JSONResponse
# import pytesseract
# pytesseract.pytesseract.tesseract_cmd = r"D:\chrome download\tesseract-ocr-w64-setup-5.5.0.20241111.exe"


# from PIL import Image
# import tempfile
# import os
# import fitz  # PyMuPDF for PDF
# import spacy
# import openai
# import docx2txt

# app = FastAPI()
# nlp = spacy.load("en_core_web_sm")

# # 🔑 Replace with your actual OpenAI API Key
# openai.api_key = "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"

# @app.post("/process-document")
# async def process_document(file: UploadFile = File(...)):
#     # Step 1: Save uploaded file temporarily
#     with tempfile.NamedTemporaryFile(delete=False) as tmp:
#         tmp_path = tmp.name
#         content = await file.read()
#         tmp.write(content)

#     # Step 2: Extract text based on file type
#     file_type = file.filename.lower()
#     try:
#         if file_type.endswith(".pdf"):
#             text = extract_text_from_pdf(tmp_path)
#         elif file_type.endswith(".docx"):
#             text = extract_text_from_docx(tmp_path)
#         elif file_type.endswith((".jpg", ".jpeg", ".png")):
#             text = extract_text_from_image(tmp_path)
#         else:
#             return JSONResponse({"error": "Unsupported file format"}, status_code=400)
#     except Exception as e:
#         return JSONResponse({"error": f"Error extracting text: {str(e)}"}, status_code=500)
#     finally:
#         os.remove(tmp_path)  # Clean up temp file

#     # Step 3: Entity Extraction (NER using spaCy)
#     entities = extract_named_entities(text)

#     # Step 4: OpenAI GPT summary & classification
#     try:
#         gpt_result = classify_and_summarize(text)
#     except Exception as e:
#         gpt_result = {"type": "Unknown", "summary": f"OpenAI Error: {str(e)}"}

#     # Step 5: Return JSON result
#     return {
#         "filename": file.filename,
#         "text_preview": text[:1000],  # limit preview
#         "entities": entities,
#         "classification": gpt_result
#     }

# # ----------- AI Helper Functions -----------

# def extract_text_from_pdf(pdf_path):
#     doc = fitz.open(pdf_path)
#     return "\n".join([page.get_text() for page in doc])

# def extract_text_from_image(image_path):
#     image = Image.open(image_path)
#     return pytesseract.image_to_string(image)

# def extract_text_from_docx(docx_path):
#     return docx2txt.process(docx_path)

# def extract_named_entities(text):
#     doc = nlp(text)
#     result = {"PERSON": [], "EMAIL": [], "DATE": [], "MONEY": []}
#     for ent in doc.ents:
#         if ent.label_ in result:
#             result[ent.label_].append(ent.text)
#     return result

# def classify_and_summarize(text):
#     prompt = f"""
# You are a document AI system. Given the text below, determine:
# 1. What type of document is this? (e.g., Resume, Invoice, Report)
# 2. Provide a 2-sentence summary of its content.

# Return the result as JSON with keys "type" and "summary".

# TEXT:
# {text}
# """

#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=[
#             {"role": "system", "content": "You analyze and summarize documents."},
#             {"role": "user", "content": prompt}
#         ]
#     )

#     result = response['choices'][0]['message']['content']
#     # Optional: If you want, use `json.loads()` to parse it if GPT returns valid JSON
#     return eval(result) if result.startswith("{") else {"type": "Unknown", "summary": result}
# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# import pytesseract
# import tempfile, os, fitz, docx2txt
# from PIL import Image, UnidentifiedImageError
# import spacy
# from transformers import pipeline, logging
# import traceback

# # Disable transformers logging
# logging.set_verbosity_error()

# app = FastAPI()

# # CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load NLP models
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # ✅ Confirm path
# nlp = spacy.load("en_core_web_sm")
# summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small")

# @app.post("/process-document")
# async def process_document(file: UploadFile = File(...)):
#     # Use correct file extension for tempfile
#     _, ext = os.path.splitext(file.filename)
#     with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
#         tmp_path = tmp.name
#         tmp.write(await file.read())

#     try:
#         if ext.lower().endswith(".pdf"):
#             text = extract_text_from_pdf(tmp_path)
#         elif ext.lower().endswith(".docx"):
#             text = extract_text_from_docx(tmp_path)
#         elif ext.lower().endswith((".jpg", ".jpeg", ".png")):
#             text = extract_text_from_image(tmp_path)
#         else:
#             return JSONResponse({"error": "Unsupported file format"}, status_code=400)
#     except Exception as e:
#         print("❌ ERROR during processing:", str(e))
#         print(traceback.format_exc())
#         return JSONResponse({"error": f"Failed to process file: {str(e)}"}, status_code=500)
#     finally:
#         if os.path.exists(tmp_path):
#             os.remove(tmp_path)

#     entities = extract_named_entities(text)
#     classification = classify_and_summarize(text)

#     return {
#         "filename": file.filename,
#         "text_preview": text[:1000],
#         "entities": entities,
#         "classification": classification
#     }

# # ---------- Helper Functions ----------

# def extract_text_from_pdf(pdf_path):
#     doc = fitz.open(pdf_path)
#     return "\n".join([page.get_text() for page in doc])

# def extract_text_from_docx(docx_path):
#     return docx2txt.process(docx_path)

# # def extract_text_from_image(image_path):
# #     try:
# #         image = Image.open(image_path)
# #         return pytesseract.image_to_string(image)
# #     except UnidentifiedImageError as e:
# #         raise RuntimeError(f"Image loading failed: {e}")
# #     except Exception as e:
# #         raise RuntimeError(f"OCR failed: {e}")
# def extract_text_from_image(image_path):
#     try:
#         # Open the image
#         image = Image.open(image_path)
#         # Optional: log image size or check if it’s being opened correctly
#         print(f"Image opened successfully: {image_path}")
#         # Use pytesseract to extract text from the image
#         text = pytesseract.image_to_string(image)
        
#         if not text:
#             raise ValueError("OCR returned empty text, check the image quality.")
        
#         return text
#     except UnidentifiedImageError as e:
#         raise RuntimeError(f"Image loading failed: {e}")
#     except Exception as e:
#         raise RuntimeError(f"OCR failed: {e}")

# def extract_named_entities(text):
#     doc = nlp(text)
#     result = {"PERSON": [], "EMAIL": [], "DATE": [], "MONEY": []}
#     for ent in doc.ents:
#         if ent.label_ in result:
#             result[ent.label_].append(ent.text)
#     return result

# def classify_and_summarize(text):
#     short_text = text[:1000] if len(text) > 1000 else text
#     try:
#         summary = summarizer(short_text, max_length=60, min_length=20, do_sample=False)[0]['summary_text']
#     except Exception as e:
#         summary = f"Summarization failed: {str(e)}"

#     lowered = short_text.lower()
#     if "curriculum vitae" in lowered or "objective" in lowered:
#         doc_type = "Resume"
#     elif "invoice number" in lowered or "bill to" in lowered:
#         doc_type = "Invoice"
#     elif "report" in lowered and "analysis" in lowered:
#         doc_type = "Report"
#     else:
#         doc_type = "Unknown"

#     return {"type": doc_type, "summary": summary}














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