'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCustomerById, deleteCustomer } from '@/lib/api-client/customer-client';

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // Remove the use hook and directly access params.id
  const customerId = params.id;
  
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const customerData = await getCustomerById(customerId);
        if (!customerData) {
          setError('Customer not found. The customer may have been deleted or does not exist.');
          return;
        }
        setCustomer(customerData);
      } catch (error: any) {
        console.error('Error fetching customer details:', error);
        if (error.message && error.message.includes('Not Found')) {
          setError('Customer not found. The customer may have been deleted or does not exist.');
        } else {
          setError('Failed to load customer details. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCustomerDetails();
  }, [customerId]);
  
  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      await deleteCustomer(customerId);
      router.push('/dashboard/customers');
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError('Failed to delete customer. Please try again.');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <span className="ml-2">Loading customer details...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <h2 className="text-lg font-medium text-red-800">Error</h2>
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => router.push('/dashboard/customers')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Back to Customers
        </button>
      </div>
    );
  }
  
  if (!customer) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <h2 className="text-lg font-medium text-yellow-800">Customer Not Found</h2>
        <p className="text-yellow-700">The customer you are looking for does not exist or has been deleted.</p>
        <button
          onClick={() => router.push('/dashboard/customers')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Customers
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
        <div className="flex space-x-2">
          <Link
            href="/dashboard/customers"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            &larr; Back to Customers
          </Link>
          <Link
            href={`/dashboard/customers/${customerId}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Customer
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Customer'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Personal Information */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl mr-4">
                {customer.customer.profilePicture ? (
                  <img
                    src={customer.customer.profilePicture}
                    alt={customer.customer.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  customer.customer.name.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium">{customer.customer.name}</h3>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {customer.customer.status}
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customer.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{customer.customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Since</p>
                  <p className="font-medium">
                    {new Date(customer.customer.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Addresses</h2>
          {customer.addresses.length === 0 ? (
            <p className="text-gray-500">No addresses found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.addresses.map((address: any) => (
                <div key={address.id} className="border rounded-lg p-4 relative">
                  {address.isDefault && (
                    <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Default
                    </span>
                  )}
                  <p className="font-medium mb-2">{address.addressType} Address</p>
                  <p className="text-gray-700">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="text-gray-700">{address.addressLine2}</p>}
                  <p className="text-gray-700">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p className="text-gray-700">{address.country}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Documents */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          {customer.documents.length === 0 ? (
            <p className="text-gray-500">No documents found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {customer.documents.map((document: any) => (
                <div key={document.id} className="border rounded-lg p-4">
                  <p className="font-medium mb-2">{document.documentType}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
                  </p>
                  <a
                    href={document.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Document
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this customer? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}