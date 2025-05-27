'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSellerById, deleteSeller } from '@/lib/api-client/seller-client';
import TopScorerBar from '@/components/sellers/TopScorerBar';
import SellerStatusBadge from '@/components/sellers/SellerStatusBadge';
import KycStatusBadge from '@/components/sellers/KycStatusBadge';
import AssignedProductsList from '@/components/sellers/AssignedProductsList';
import { use } from 'react';

export default function SellerDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const sellerId = resolvedParams.id;
  
  const [seller, setSeller] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    const fetchSellerDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const sellerData = await getSellerById(sellerId);
        setSeller(sellerData);
      } catch (error) {
        console.error('Error fetching seller details:', error);
        setError('Failed to load seller details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSellerDetails();
  }, [sellerId]);
  
  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const success = await deleteSeller(sellerId);
      
      if (success) {
        router.push('/dashboard/sellers');
      } else {
        setError('Failed to delete seller');
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Error deleting seller:', error);
      setError('An error occurred while deleting the seller');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-xl">Loading seller details...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => router.push('/dashboard/sellers')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Go Back to Sellers
        </button>
      </div>
    );
  }
  
  if (!seller) {
    return (
      <div className="bg-yellow-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-yellow-700 mb-2">Seller Not Found</h2>
        <p className="text-yellow-700">The seller you are looking for does not exist or has been deleted.</p>
        <button
          onClick={() => router.push('/dashboard/sellers')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back to Sellers
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{seller.seller.name}</h1>
          <p className="text-gray-600">{seller.seller.email} • {seller.seller.phone}</p>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center mb-4">
              {seller.seller.profilePicture ? (
                <img
                  src={seller.seller.profilePicture}
                  alt={seller.seller.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-semibold">
                  {seller.seller.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="ml-4">
                <h2 className="text-xl font-bold">{seller.seller.name}</h2>
                <p className="text-gray-600">{seller.business.companyName}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className="mt-1">
                    <SellerStatusBadge status={seller.seller.status} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">KYC Status</h3>
                  <div className="mt-1">
                    <KycStatusBadge status={seller.seller.kycStatus} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Top Scorer</h3>
                  <div className="mt-1">
                    <TopScorerBar score={seller.seller.isTopScorer} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                  <p className="mt-1 text-gray-900">
                    {new Date(seller.seller.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p className="mt-1 text-gray-900">
                    {new Date(seller.seller.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Business Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Business Information</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                <p className="mt-1 text-gray-900">{seller.business.companyName}</p>
              </div>
              
              {seller.business.gstin && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">GSTIN</h3>
                  <p className="mt-1 text-gray-900">{seller.business.gstin}</p>
                </div>
              )}
              
              {seller.business.pan && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">PAN</h3>
                  <p className="mt-1 text-gray-900">{seller.business.pan}</p>
                </div>
              )}
              
              {seller.business.bankName && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bank Details</h3>
                  <p className="mt-1 text-gray-900">
                    {seller.business.bankName}<br />
                    Acc: {seller.business.accountNumber}<br />
                    IFSC: {seller.business.ifscCode}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Products */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Assigned Products</h2>
              <Link
                href={`/dashboard/sellers/${sellerId}/manage-products`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Manage Products
              </Link>
            </div>
            
            <AssignedProductsList sellerId={sellerId} />
          </div>
        </div>
        
        {/* Right column - Addresses, Documents, Gallery */}
        <div className="lg:col-span-2">
          {/* Addresses */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Addresses</h2>
            
            {seller.addresses.length === 0 ? (
              <p className="text-gray-500">No addresses added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seller.addresses.map((address: any) => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {address.addressType}
                        </span>
                        {address.isDefault && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-gray-700 mb-3">
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} {address.postalCode}</p>
                      <p>{address.country}</p>
                    </div>
                    
                    {address.image && (
                      <div className="mt-3">
                        <img
                          src={address.image}
                          alt={`Location of ${address.addressType}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Documents */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Documents</h2>
            
            {seller.documents.length === 0 ? (
              <p className="text-gray-500">No documents added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seller.documents.map((document: any) => (
                  <div key={document.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{document.documentType}</span>
                      <a
                        href={document.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-xs text-blue-600 hover:underline"
                      >
                        View Document
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Gallery */}
          {seller.gallery && seller.gallery.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Gallery</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {seller.gallery.map((image: any) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.imageUrl}
                      alt={image.caption || 'Gallery image'}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg text-sm">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Seller
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this seller? All data related to this seller will be permanently removed.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-red-300"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 