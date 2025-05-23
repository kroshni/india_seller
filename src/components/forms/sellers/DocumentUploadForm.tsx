'use client';

import { useState } from 'react';

interface DocumentUploadFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function DocumentUploadForm({
  formData,
  updateFormData,
  onBack,
  onNext,
}: DocumentUploadFormProps) {
  const [documentType, setDocumentType] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const documentTypes = [
    { id: 'gstin', name: 'GSTIN Certificate' },
    { id: 'pan', name: 'PAN Card' },
    { id: 'bank', name: 'Bank Statement/Passbook' },
    { id: 'identity', name: 'Identity Proof' },
    { id: 'address', name: 'Address Proof' },
    { id: 'business', name: 'Business Registration' },
    { id: 'other', name: 'Other Documents' },
  ];
  
  const addDocument = () => {
    const newErrors: Record<string, string> = {};
    
    if (!documentType) {
      newErrors.documentType = 'Document type is required';
    }
    
    if (!documentUrl.trim()) {
      newErrors.documentUrl = 'Document URL is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add the new document to the documents array
    const updatedDocuments = [
      ...formData.documents,
      {
        documentType,
        documentUrl,
      },
    ];
    
    updateFormData({ documents: updatedDocuments });
    
    // Reset the form
    setDocumentType('');
    setDocumentUrl('');
    setErrors({});
  };
  
  const removeDocument = (index: number) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments.splice(index, 1);
    updateFormData({ documents: updatedDocuments });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.documents.length === 0) {
      setErrors({ form: 'Please add at least one document' });
      return;
    }
    
    onNext();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
          <p className="mt-1 text-sm text-gray-600">
            Add document URLs for seller verification
          </p>
        </div>
        
        {errors.form && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {errors.form}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">
              Document Type
            </label>
            <select
              id="documentType"
              value={documentType}
              onChange={(e) => {
                setDocumentType(e.target.value);
                if (errors.documentType) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.documentType;
                    return newErrors;
                  });
                }
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.documentType ? 'border-red-300' : 'border-gray-300'
              } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Select document type</option>
              {documentTypes.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
            {errors.documentType && (
              <p className="mt-1 text-sm text-red-600">{errors.documentType}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="documentUrl" className="block text-sm font-medium text-gray-700">
              Document URL
            </label>
            <input
              type="text"
              id="documentUrl"
              value={documentUrl}
              onChange={(e) => {
                setDocumentUrl(e.target.value);
                if (errors.documentUrl) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.documentUrl;
                    return newErrors;
                  });
                }
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.documentUrl ? 'border-red-300' : 'border-gray-300'
              } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="https://example.com/document.pdf"
            />
            {errors.documentUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.documentUrl}</p>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Note: For demo purposes, we're accepting document URLs. In a production environment, you would implement a secure document upload functionality.
          </p>
          <button
            type="button"
            onClick={addDocument}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Document
          </button>
        </div>
        
        {formData.documents.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Added Documents</h4>
            <ul className="border rounded-md divide-y">
              {formData.documents.map((document: any, index: number) => (
                <li key={index} className="p-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{document.documentType}</span>
                    <a 
                      href={document.documentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-sm text-blue-600 hover:underline"
                    >
                      View Document
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Review
        </button>
      </div>
    </form>
  );
} 