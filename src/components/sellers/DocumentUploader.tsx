'use client';

import { useState } from 'react';

interface Document {
  id?: string;
  documentType: string;
  documentUrl: string;
}

interface DocumentUploaderProps {
  documents: Document[];
  onChange: (documents: Document[]) => void;
}

export default function DocumentUploader({ documents = [], onChange }: DocumentUploaderProps) {
  const [newDocumentType, setNewDocumentType] = useState('');
  const [newDocumentUrl, setNewDocumentUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Document types
  const documentTypes = [
    'GST Certificate',
    'PAN Card',
    'Aadhar Card',
    'Business License',
    'Store Images',
    'ID Proof',
    'Shop & Establishment Certificate',
    'Other'
  ];

  // Add a new document
  const addDocument = () => {
    setError(null);
    
    // Validate inputs
    if (!newDocumentType) {
      setError('Please select a document type');
      return;
    }
    
    if (!newDocumentUrl) {
      setError('Please enter a document URL');
      return;
    }
    
    // Create a new document object
    const newDocument: Document = {
      documentType: newDocumentType,
      documentUrl: newDocumentUrl,
    };
    
    // Add to documents array
    const updatedDocuments = [...documents, newDocument];
    onChange(updatedDocuments);
    
    // Reset form
    setNewDocumentType('');
    setNewDocumentUrl('');
  };
  
  // Remove a document
  const removeDocument = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    onChange(updatedDocuments);
  };
  
  return (
    <div>
      {/* Document list */}
      {documents.length > 0 ? (
        <div className="mb-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Uploaded Documents</h3>
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-md">
                  <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{doc.documentType}</p>
                  <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate max-w-xs block">
                    {doc.documentUrl}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeDocument(index)}
                className="text-red-600 hover:text-red-900"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">No documents uploaded yet</p>
        </div>
      )}
      
      {/* Add new document form */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Add New Document</h3>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Type
            </label>
            <select
              value={newDocumentType}
              onChange={(e) => setNewDocumentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Document Type</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document URL
            </label>
            <input
              type="text"
              value={newDocumentUrl}
              onChange={(e) => setNewDocumentUrl(e.target.value)}
              placeholder="Enter URL of uploaded document"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={addDocument}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Document
          </button>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        <p>Note: Upload your documents to a file hosting service and paste the URL here.</p>
      </div>
    </div>
  );
} 