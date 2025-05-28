'use client';

interface ResultSummaryProps {
  result: {
    success: boolean;
    message?: string;
    totalProcessed?: number;
    successCount?: number;
    failureCount?: number;
    failures?: Array<{
      row: number;
      reason: string;
    }>;
  };
  onReset: () => void;
  onGoToSellers: () => void;
}

export default function ResultSummary({ result, onReset, onGoToSellers }: ResultSummaryProps) {
  const { 
    success, 
    message, 
    totalProcessed = 0, 
    successCount = 0, 
    failureCount = 0, 
    failures = [] 
  } = result || {};
  
  return (
    <div>
      {success ? (
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Import Complete!</h2>
          <p className="text-gray-600">{message || 'Your sellers have been successfully imported.'}</p>
        </div>
      ) : (
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Import Failed</h2>
          <p className="text-gray-600">{message || 'There was an error processing your import.'}</p>
        </div>
      )}
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <span className="text-2xl font-bold text-blue-700">{totalProcessed}</span>
          <p className="text-sm text-blue-600">Total Processed</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <span className="text-2xl font-bold text-green-700">{successCount}</span>
          <p className="text-sm text-green-600">Successfully Imported</p>
        </div>
        <div className={`rounded-lg p-4 text-center ${failureCount > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
          <span className={`text-2xl font-bold ${failureCount > 0 ? 'text-red-700' : 'text-gray-700'}`}>
            {failureCount}
          </span>
          <p className={`text-sm ${failureCount > 0 ? 'text-red-600' : 'text-gray-600'}`}>
            Failed
          </p>
        </div>
      </div>
      
      {/* Failures List */}
      {failureCount > 0 && failures && failures.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Failed Imports</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              <table className="min-w-full divide-y divide-red-200">
                <thead className="bg-red-100 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Row
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Error
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-red-200">
                  {failures.map((failure, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {failure.row}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-700">
                        {failure.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          onClick={onReset}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Upload Another File
        </button>
        <button
          onClick={onGoToSellers}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Sellers List
        </button>
      </div>
    </div>
  );
} 