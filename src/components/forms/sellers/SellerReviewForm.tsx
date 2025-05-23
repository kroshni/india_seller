'use client';

interface SellerReviewFormProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function SellerReviewForm({
  formData,
  onBack,
  onSubmit,
  isSubmitting,
}: SellerReviewFormProps) {
  return (
    <div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Review Seller Information</h3>
          <p className="mt-1 text-sm text-gray-600">
            Please review all the information before submitting
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-3">Personal Details</h4>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
            </div>
            {formData.profilePicture && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Profile Picture</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a
                    href={formData.profilePicture}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-3">Business Details</h4>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Company Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.business.companyName}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Business Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.business.address}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">GSTIN</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.business.gstin}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">PAN</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.business.pan}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.business.bankName}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Account Number</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formData.business.accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">IFSC Code</dt>
              <dd className="mt-1 text-sm text-gray-900">{formData.business.ifscCode}</dd>
            </div>
          </dl>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-3">Products ({formData.products.length})</h4>
          {formData.products.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {formData.products.map((product: any, index: number) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{product.productName}</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No products added</p>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-3">Documents ({formData.documents.length})</h4>
          {formData.documents.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {formData.documents.map((document: any, index: number) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{document.documentType}</span>
                    <a
                      href={document.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Document
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No documents added</p>
          )}
        </div>
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
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Seller'}
        </button>
      </div>
    </div>
  );
} 