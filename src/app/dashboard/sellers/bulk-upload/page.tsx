'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FileUploader from '@/components/sellers/BulkUploadFileUploader';
import ImportPreview from '@/components/sellers/BulkUploadPreview';
import ResultSummary from '@/components/sellers/BulkUploadResultSummary';
import { bulkUploadSellers } from '@/lib/api-client/seller-client';

// Import validation and helper functions
import { validateSellerRow, formatSellerData } from '@/lib/validations/seller-validation';

// Define the different states of the import process
type ImportStatus = 'idle' | 'validating' | 'validated' | 'uploading' | 'success' | 'error';
type SellerRowError = { row: number; field: string; message: string };

export default function BulkUploadPage() {
  const router = useRouter();
  
  // State for the file and import process
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [validatedData, setValidatedData] = useState<any[]>([]);
  const [errors, setErrors] = useState<SellerRowError[]>([]);
  const [importStatus, setImportStatus] = useState<ImportStatus>('idle');
  const [importResult, setImportResult] = useState<any>(null);
  
  // Handle file selection
  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setImportStatus('idle');
    setParsedData([]);
    setValidatedData([]);
    setErrors([]);
    setImportResult(null);
  };
  
  // Handle file validation
  const handleValidate = async (data: any[]) => {
    setImportStatus('validating');
    setParsedData(data);
    
    // Validate each row
    const validationErrors: SellerRowError[] = [];
    const validRows: any[] = [];
    
    data.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because index starts at 0 and we need to account for the header row
      const { valid, errors: rowErrors } = validateSellerRow(row);
      
      if (valid) {
        // Format the data for the API
        const formattedData = formatSellerData(row);
        validRows.push(formattedData);
      } else {
        rowErrors.forEach(err => {
          validationErrors.push({
            row: rowNumber,
            field: err.field,
            message: err.message
          });
        });
      }
    });
    
    setValidatedData(validRows);
    setErrors(validationErrors);
    setImportStatus(validationErrors.length === 0 ? 'validated' : 'error');
  };
  
  // Handle import submission
  const handleImport = async () => {
    setImportStatus('uploading');
    
    try {
      // Call the API to process the import
      const result = await bulkUploadSellers(validatedData);
      setImportResult(result);
      setImportStatus('success');
    } catch (error) {
      console.error('Error importing sellers:', error);
      setImportStatus('error');
      setImportResult({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };
  
  // Download sample template
  const handleDownloadSample = () => {
    // Define headers with proper format (all in the same case as validation expects)
    const headers = 'Name,Email,Phone,Company Name,GSTIN,PAN,Bank Name,Account Number,IFSC Code,Profile Picture,Address1_Type,Address1_Line1,Address1_Line2,Address1_City,Address1_State,Address1_Postal,Address1_Country,Address1_Image,Address2_Type,Address2_Line1,Address2_Line2,Address2_City,Address2_State,Address2_Postal,Address2_Country,Address2_Image,Document Types,Document URLs,Gallery URLs,Gallery Captions';
    
    // Example 1: Complete seller with multiple addresses and documents
    const sampleRow1 = '"John Doe","john@example.com","9876543210","Acme Inc.","29ABCDE1234F1Z5","ABCDE1234F","HDFC Bank","1234567890","HDFC0001234","https://example.com/john.jpg","Business","123 Main St","Suite 101","Mumbai","Maharashtra","400001","India","https://example.com/store1.jpg","Warehouse","456 Park Ave","","Delhi","Delhi","110001","India","https://example.com/warehouse1.jpg","GST Certificate,PAN Card","https://example.com/gst.pdf,https://example.com/pan.pdf","https://example.com/gallery1.jpg,https://example.com/gallery2.jpg","Main Store,Product Display"';
    
    // Example 2: Seller with only primary address
    const sampleRow2 = '"Jane Smith","jane@example.com","8765432109","XYZ Corp.","27FGHIJ5678G1Z3","FGHIJ5678G","ICICI Bank","0987654321","ICIC0005678","https://example.com/jane.jpg","Business","456 Park Ave","","Delhi","Delhi","110001","India","","","","","","","","","","Aadhar Card,Business License","https://example.com/aadhar.pdf,https://example.com/license.pdf","https://example.com/gallery3.jpg","Store Front"';
    
    const sampleData = `${headers}\n${sampleRow1}\n${sampleRow2}`;
    
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'seller_import_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Bulk Upload Sellers</h1>
          <Link
            href="/dashboard/sellers"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Back to Sellers
          </Link>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Upload multiple sellers at once using a CSV file. 
          <Link href="/dashboard/sellers/bulk-upload/guide" className="ml-1 text-blue-600 hover:underline">
            View detailed guide
          </Link>
        </p>
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {importStatus === 'success' ? (
          <ResultSummary 
            result={importResult} 
            onReset={() => {
              setFile(null);
              setParsedData([]);
              setValidatedData([]);
              setErrors([]);
              setImportStatus('idle');
              setImportResult(null);
            }}
            onGoToSellers={() => router.push('/dashboard/sellers')}
          />
        ) : (
          <>
            {/* File upload area */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upload File</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <FileUploader 
                    onFileSelected={handleFileSelected} 
                    onDataParsed={handleValidate}
                    file={file}
                    disabled={importStatus === 'validating' || importStatus === 'uploading'}
                  />
                </div>
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Instructions</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Upload a CSV file</li>
                      <li>• File must contain required headers</li>
                      <li>• Maximum file size: 5MB</li>
                      <li>• Use the sample template for correct format</li>
                      <li>• For multiple addresses, use Address1_, Address2_ etc. prefixes</li>
                      <li>• For documents, use comma-separated values in Document Types and Document URLs</li>
                      <li>• For gallery images, use comma-separated URLs in Gallery URLs</li>
                    </ul>
                    <button
                      onClick={handleDownloadSample}
                      className="mt-4 w-full px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded border border-blue-200 hover:bg-blue-100"
                    >
                      Download Sample Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Data preview and validation results */}
            {parsedData.length > 0 && (
              <ImportPreview 
                data={parsedData}
                validData={validatedData}
                errors={errors}
                status={importStatus}
                onImport={handleImport}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
} 