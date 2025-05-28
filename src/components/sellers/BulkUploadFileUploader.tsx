'use client';

import { useState, useRef } from 'react';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  onDataParsed: (data: any[]) => void;
  file: File | null;
  disabled?: boolean;
}

// Simple CSV parser function
function parseCSV(csv: string): any[] {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const result: any[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // Skip empty lines
    
    const values = lines[i].split(',').map(v => v.trim());
    const obj: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    result.push(obj);
  }
  
  return result;
}

export default function BulkUploadFileUploader({ 
  onFileSelected, 
  onDataParsed, 
  file, 
  disabled = false 
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Maximum file size: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  
  // Supported file types - only CSV for now to avoid external dependencies
  const SUPPORTED_FORMATS = [
    'text/csv',
    'application/csv'
  ];
  
  // Map of expected headers
  const EXPECTED_HEADERS = [
    'Name', 'Email', 'Phone', 'Company Name', 'GSTIN', 'PAN', 
    'Bank Name', 'Account Number', 'IFSC Code', 
    'Address Type', 'Address Line 1', 'Address Line 2', 
    'City', 'State', 'Postal Code', 'Country'
  ];
  
  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      validateAndProcessFile(selectedFile);
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndProcessFile(droppedFile);
    }
  };
  
  // Validate and process the uploaded file
  const validateAndProcessFile = (selectedFile: File) => {
    setErrorMessage(null);
    
    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrorMessage(`File size exceeds the 5MB limit (${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB).`);
      return;
    }
    
    // Check file extension for CSV
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'csv') {
      setErrorMessage('Only CSV files are supported. Please convert your Excel file to CSV format.');
      return;
    }
    
    // File passed validation, notify parent component
    onFileSelected(selectedFile);
    
    // Process the file
    setIsProcessing(true);
    
    const fileReader = new FileReader();
    
    fileReader.onload = (e) => {
      try {
        const fileData = e.target?.result;
        if (!fileData) {
          throw new Error('Failed to read file data');
        }
        
        // Parse CSV
        const parsedData = parseCSV(fileData as string);
        validateHeaders(parsedData);
      } catch (error) {
        console.error('Error processing file:', error);
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
        setIsProcessing(false);
      }
    };
    
    fileReader.onerror = () => {
      setErrorMessage('Error reading the file');
      setIsProcessing(false);
    };
    
    // Read the file as text
    fileReader.readAsText(selectedFile);
  };
  
  // Validate headers in the parsed data
  const validateHeaders = (data: any[]) => {
    // No data
    if (data.length === 0) {
      setErrorMessage('The file contains no data');
      setIsProcessing(false);
      return;
    }
    
    // Check headers
    const firstRow = data[0];
    const missingHeaders = EXPECTED_HEADERS.filter(header => 
      !Object.keys(firstRow).some(key => key.trim().toLowerCase() === header.toLowerCase())
    );
    
    if (missingHeaders.length > 0) {
      setErrorMessage(`Missing required headers: ${missingHeaders.join(', ')}`);
      setIsProcessing(false);
      return;
    }
    
    // All validations passed, notify parent with parsed data
    onDataParsed(data);
    setIsProcessing(false);
  };
  
  return (
    <div className={`relative ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
      {isProcessing && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-blue-600 font-medium">Processing file...</span>
          </div>
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } transition-colors duration-200 ${disabled ? '' : 'hover:bg-gray-50'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv"
          onChange={handleFileChange}
          disabled={disabled}
        />
        
        {file ? (
          <div>
            <div className="flex items-center justify-center mb-4">
              <svg 
                className="w-10 h-10 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={disabled}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              Choose Another File
            </button>
          </div>
        ) : (
          <div>
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop your file here, or 
              <button
                type="button"
                onClick={handleButtonClick}
                disabled={disabled}
                className="mx-1 text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                browse
              </button>
              to select a file
            </p>
            
            <p className="mt-1 text-xs text-gray-500">
              Supported format: CSV • Max 5MB
            </p>
          </div>
        )}
      </div>
      
      {errorMessage && (
        <div className="mt-2 text-sm text-red-600">
          <p className="flex items-center">
            <svg 
              className="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
} 