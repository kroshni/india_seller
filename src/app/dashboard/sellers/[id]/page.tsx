'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface SellerDetails {
  seller: {
    id: string;
    name: string;
    email: string;
    phone: string;
    profilePicture?: string;
    isTopScorer: boolean;
    kycStatus: 'Verified' | 'Pending';
    status: 'Active' | 'Inactive';
    createdAt: string;
    updatedAt: string;
  };
  business: {
    sellerId: string;
    companyName: string;
    address: string;
    gstin: string;
    pan: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
  products: {
    sellerId: string;
    productName: string;
    category: string;
  }[];
  documents: {
    sellerId: string;
    documentType: string;
    documentUrl: string;
    uploadedAt: string;
  }[];
}

export default function SellerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const sellerId = params.id as string;
  
  const [sellerDetails, setSellerDetails] = useState<SellerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    const fetchSellerDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/sellers/${sellerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch seller details');
        }
        
        const data = await response.json();
        setSellerDetails(data);
      } catch (error) {
        console.error('Error fetching seller details:', error);
        setError('Failed to load seller details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (sellerId) {
      fetchSellerDetails();
    }
  }, [sellerId]);
  
  const handleDeleteSeller = async () => {
    try {
      const response = await fetch(`/api/sellers/${sellerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete seller');
      }
      
      router.push('/dashboard/sellers');
    } catch (error) {
      console.error('Error deleting seller:', error);
      setError('Failed to delete seller. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center my-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading seller details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-md text-red-700 mb-6">
        {error}
        <div className="mt-4">
          <Link
            href="/dashboard/sellers"
            className="text-blue-600 hover:underline"
          >
            Back to Sellers
          </Link>
        </div>
      </div>
    );
  }
  
  if (!sellerDetails) {
    return (
      <div className="bg-yellow-100 p-4 rounded-md text-yellow-700 mb-6">
        Seller not found.
        <div className="mt-4">
          <Link
            href="/dashboard/sellers"
            className="text-blue-600 hover:underline"
          >
            Back to Sellers
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{sellerDetails.seller.name}</h1>
          <p className="mt-1 text-sm text-gray-600">
            Seller Details
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Link
            href={`/dashboard/sellers/${sellerId}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Seller
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Seller
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 h-20 w-20 relative mr-4">
              {sellerDetails.seller.profilePicture ? (
                <div className="h-20 w-20 rounded-full overflow-hidden">
                  <img
                    src={sellerDetails.seller.profilePicture}
                    alt={sellerDetails.seller.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-2xl font-medium">
                    {sellerDetails.seller.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <div className="text-lg font-medium">{sellerDetails.seller.name}</div>
              <div className="text-gray-600">{sellerDetails.seller.email}</div>
              <div className="text-gray-600">{sellerDetails.seller.phone}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className={`mt-1 inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                sellerDetails.seller.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {sellerDetails.seller.status}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">KYC Status</p>
              <div className={`mt-1 inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                sellerDetails.seller.kycStatus === 'Verified' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {sellerDetails.seller.kycStatus}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Top Scorer</p>
              <div className={`mt-1 inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                sellerDetails.seller.isTopScorer 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {sellerDetails.seller.isTopScorer ? 'Yes' : 'No'}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="mt-1 text-sm font-medium">
                {new Date(sellerDetails.seller.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Business Details</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-gray-500">Company Name</p>
              <p className="mt-1 font-medium">{sellerDetails.business.companyName}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="mt-1">{sellerDetails.business.address}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">GSTIN</p>
                <p className="mt-1">{sellerDetails.business.gstin}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">PAN</p>
                <p className="mt-1">{sellerDetails.business.pan}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Bank Details</p>
              <div className="mt-1 space-y-1">
                <p>{sellerDetails.business.bankName}</p>
                <p>A/C: {sellerDetails.business.accountNumber}</p>
                <p>IFSC: {sellerDetails.business.ifscCode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          
          {sellerDetails.products.length === 0 ? (
            <p className="text-gray-500">No products added yet.</p>
          ) : (
            <div className="space-y-4">
              {sellerDetails.products.map((product, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-md p-3 hover:shadow-sm"
                >
                  <div className="font-medium">{product.productName}</div>
                  <div className="text-sm text-gray-500">{product.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          
          {sellerDetails.documents.length === 0 ? (
            <p className="text-gray-500">No documents uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {sellerDetails.documents.map((document, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-md p-3 hover:shadow-sm"
                >
                  <div className="font-medium">{document.documentType}</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </span>
                    <a 
                      href={document.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete {sellerDetails.seller.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSeller}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 