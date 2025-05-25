import React, { useState } from "react";
import axios from "axios";
import { File, FileText, X, Search, ScrollText, SaveIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments } from "../redux/slice/documentSlice";
import { useDocuments } from "../hooks/useDocuments";
import { Input } from "../components/ui/input";

const DOCUMENT_TYPES = {
  all: "All Documents",
  pdf: "PDF",
  doc: "DOC",
  docx: "DOCX",
  txt: "Text",
};

const getFileExtension = (fileName) => {
  if (!fileName) return '';
  return fileName.split('.').pop().toLowerCase();
};

const getFileIcon = (fileName) => {
  const ext = getFileExtension(fileName);
  switch (ext) {
    case 'pdf': return <FileText className="text-red-500" />;
    case 'doc': return <File className="text-blue-500" />;
    case 'docx': return <FileText className="text-blue-600" />;
    case 'txt': return <File className="text-gray-500" />;
    default: return <File className="text-gray-400" />;
  }
};

const AllDocument = () => {
  useDocuments();
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [summarizationResults, setSummarizationResults] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { documents } = useSelector((state) => state?.documents);

  const filteredDocuments = documents.filter(doc => {
    const matchesType = selectedType === 'all' || 
      getFileExtension(doc.originalFileName) === selectedType;
    
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.originalFileName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handlePreview = (doc) => {
    setSelectedDocument(doc);
    setSummarizationResults(null);
  };

  const handleClosePreview = () => {
    setSelectedDocument(null);
    setSummarizationResults(null);
  };

  const getPreviewUrl = (doc) => {
    const extension = getFileExtension(doc.originalFileName);
    if (extension === 'pdf') return doc.document;
    return `https://docs.google.com/gview?url=${encodeURIComponent(doc.document)}&embedded=true`;
  };

  const handleSummarize = async (documentUrl) => {
    if (!documentUrl) return;
    setProcessing(true);
    try {
      const { data } = await axios.post(
        'http://localhost:8000/process-url',
        { url: documentUrl },
        { timeout: 500000, headers: { 'Content-Type': 'application/json' } }
      );
      setSummarizationResults(data);
      toast.success("Document analyzed successfully!");
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err.response?.data?.error || err.message || "Analysis failed";
      toast.error(errorMessage);
    } finally {
      setProcessing(false);
    }
  };
  const renderAIResults = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800">
          {/* {summarizationResults.classification.type} */}
          Short Text..
        </h3>
        <p className="text-sm text-blue-700 mt-2">
          {summarizationResults.classification.summary}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-lg mb-2">Summarization</h4>
        <div className="text-m text-gray-500 text-justify bg-blue-50 p-3 ">
          {summarizationResults.text_preview}
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2">Key Entities</h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">People:</span>
              {summarizationResults.entities.PERSON.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {summarizationResults.entities.PERSON.map((person, i) => (
                    <li key={i} className="text-sm text-gray-500">{person}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 mt-1">None found</p>
              )}
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600">Dates:</span>
              {summarizationResults.entities.DATE.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {summarizationResults.entities.DATE.map((date, i) => (
                    <li key={i} className="text-sm text-gray-500">{date}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 mt-1">None found</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2">Financial Details</h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Amounts:</span>
              {summarizationResults.entities.MONEY.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {summarizationResults.entities.MONEY.map((amount, i) => (
                    <li key={i} className="text-sm text-gray-500">{amount}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 mt-1">None found</p>
              )}
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600">Emails:</span>
              {summarizationResults.entities.EMAIL.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {summarizationResults.entities.EMAIL.map((email, i) => (
                    <li key={i} className="text-sm text-gray-500 break-all">{email}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 mt-1">None found</p>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Filter Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900">
          {DOCUMENT_TYPES[selectedType]}
        </h2>

        <div className="flex items-center gap-4 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(DOCUMENT_TYPES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Document Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getFileIcon(doc.originalFileName)}
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {getFileExtension(doc.originalFileName).toUpperCase()}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 truncate mb-1">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-500 truncate mb-2">
                {doc.authorName}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {doc.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <Button
                  onClick={() => handlePreview(doc)}
                  variant="outline"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View Document
                </Button>
                <span className="text-gray-500">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 text-gray-500">
          No documents found {searchQuery ? `for "${searchQuery}"` : ''}
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                {selectedDocument.title}
              </h3>
              <Button
                onClick={handleClosePreview}
                variant="ghost"
                size="icon"
              >
                <X className="h-5 w-5 bg-gray-400" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 p-4 border-b justify-between">
              <Button 
                onClick={() => handleSummarize(selectedDocument?.document)}
                disabled={processing}
                className="gap-2 flex-wap"
              >
                <ScrollText className="h-5 w-3" />
                {processing ? 'Analyzing...' : 'Summarization'}
              </Button>

              <Button 
                onClick={() => handleSummarize(selectedDocument?.document)}
                disabled={processing}
                className="gap-2  bg-green-500"
              >
                <SaveIcon className="h-4 w-4" />
                {/* {processing ? 'Analyzing...' : 'AI Analysis'} */}
                Save 
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {summarizationResults ? (
                renderAIResults()
              ) : (
                <iframe
                  src={getPreviewUrl(selectedDocument)}
                  className="w-full h-[70vh]"
                  title="Document Preview"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDocument;