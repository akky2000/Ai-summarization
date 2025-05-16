import React, { useState } from 'react';
import axios from 'axios';
import { Upload, File, X } from 'lucide-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useSelector } from 'react-redux';

const DocumentUpload = () => {
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedFile) {
      toast.error('Please select a document to upload');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('authorName', authorName);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('document', selectedFile);

    try {
      const response = await axios.post(`http://localhost:3000/api/v3/upload-document/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status) {
        toast.success('Document uploaded successfully!');
        // Reset form
        setAuthorName('');
        setTitle('');
        setDescription('');
        setSelectedFile(null);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to upload document';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-14">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600">
        <Upload size={24} />
        Upload New Document
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
          <Input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Document</label>
          <div className="flex items-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              <div className="flex flex-col items-center text-gray-500">
                <Upload className="mb-2" />
                <span className="text-sm">
                  {selectedFile ? selectedFile.name : 'Click to choose file'}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  Supported formats: PDF, DOC, DOCX, TXT
                </span>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
            {selectedFile && (
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              <Upload size={18} />
              Upload Document
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default DocumentUpload;