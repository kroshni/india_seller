'use client';

import { useState } from 'react';

interface SellerRowError {
  row: number;
  field: string;
  message: string;
}

interface ImportPreviewProps {
  data: any[];
  validData: any[];
  errors: SellerRowError[];
  status: 'idle' | 'validating' | 'validated' | 'uploading' | 'success' | 'error';
  onImport: () => void;
}

export default function ImportPreview({ 
  data, 
  validData, 
  errors, 
  status, 
  onImport 
}: ImportPreviewProps) {
  const [activeTab, setActiveTab] = useState<'data' | 'errors'>('data');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  
  // Group errors by row for easier display
  const errorsByRow = errors.reduce((acc, error) => {
    const { row } = error;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(error);
    return acc;
  }, {} as Record<number, SellerRowError[]>);
  
  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);
  
  // Get current page data
  const currentPageData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  
  // Headers from the first row
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  
  // Pagination controls
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  
  // Check if a row has errors
  const hasRowError = (rowIndex: number) => {
    const dataIndex = (page - 1) * rowsPerPage + rowIndex;
    const rowNumber = dataIndex + 2; // +2 for header row and 0-indexing
    return !!errorsByRow[rowNumber];
  };
  
  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <div className="flex">
          <button
            className={`px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'data'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('data')}
          >
            Data Preview 
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
              {data.length}
            </span>
          </button>
          <button
            className={`px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'errors'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } ${errors.length > 0 ? 'text-red-600' : ''}`}
            onClick={() => setActiveTab('errors')}
          >
            Validation Issues
            {errors.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                {errors.length}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {activeTab === 'data' ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Data Preview</h3>
              <p className="text-sm text-gray-500">
                {validData.length} of {data.length} rows are valid
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="p-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages || 1}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages || totalPages === 0}
                className="p-1 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Row
                  </th>
                  {headers.slice(0, 5).map((header, index) => (
                    <th key={index} scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                  {headers.length > 5 && (
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ...
                    </th>
                  )}
                  <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPageData.map((row, rowIndex) => {
                  const dataIndex = (page - 1) * rowsPerPage + rowIndex;
                  const rowNumber = dataIndex + 2; // +2 for header row and 0-indexing
                  const hasError = hasRowError(rowIndex);
                  
                  return (
                    <tr key={rowIndex} className={hasError ? 'bg-red-50' : ''}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        {rowNumber}
                      </td>
                      {headers.slice(0, 5).map((header, colIndex) => (
                        <td key={colIndex} className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {row[header] || '-'}
                        </td>
                      ))}
                      {headers.length > 5 && (
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          ...
                        </td>
                      )}
                      <td className="px-3 py-2 whitespace-nowrap text-right text-sm">
                        {hasError ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Error
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Valid
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Validation Issues</h3>
            <p className="text-sm text-gray-500">
              {errors.length} issues found in {Object.keys(errorsByRow).length} rows
            </p>
          </div>
          
          {errors.length > 0 ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-h-96 overflow-y-auto">
              <ul className="space-y-4">
                {Object.entries(errorsByRow).map(([rowNum, rowErrors]) => (
                  <li key={rowNum} className="pb-4 border-b border-red-100 last:border-0">
                    <h4 className="font-medium text-red-800">
                      Row {rowNum}
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {rowErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start">
                          <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            <strong>{error.field}:</strong> {error.message}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <svg className="w-8 h-8 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-green-800 font-medium">No validation issues found!</p>
            </div>
          )}
        </div>
      )}
      
      {/* Import actions */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onImport}
          disabled={validData.length === 0 || status === 'uploading' || (errors.length > 0 && validData.length < data.length)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 flex items-center"
        >
          {status === 'uploading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Import {validData.length} Seller{validData.length !== 1 ? 's' : ''}
            </>
          )}
        </button>
      </div>
      
      {/* Summary stats */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <span className="text-xl font-bold text-blue-700">{data.length}</span>
          <p className="text-sm text-blue-600">Total Rows</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <span className="text-xl font-bold text-green-700">{validData.length}</span>
          <p className="text-sm text-green-600">Valid Rows</p>
        </div>
        <div className={`${errors.length > 0 ? 'bg-red-50' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
          <span className={`text-xl font-bold ${errors.length > 0 ? 'text-red-700' : 'text-gray-700'}`}>
            {errors.length}
          </span>
          <p className={`text-sm ${errors.length > 0 ? 'text-red-600' : 'text-gray-600'}`}>
            Validation Issues
          </p>
        </div>
      </div>
    </div>
  );
} 