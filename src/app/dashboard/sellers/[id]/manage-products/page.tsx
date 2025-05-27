'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSellerById } from '@/lib/api-client/seller-client';
import ProductAssignmentForm from '@/components/sellers/ProductAssignmentForm';
import { use } from 'react';

export default function ManageSellerProductsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // Use React.use to unwrap the params Promise
  const resolvedParams = use(params);
  const sellerId = resolvedParams.id;
  
  const [seller, setSeller] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
          onClick={() => router.push(`/dashboard/sellers/${sellerId}`)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Go Back to Seller
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
          <h1 className="text-2xl font-bold text-gray-900">Manage Products for {seller.seller.name}</h1>
          <p className="text-gray-600">{seller.business.companyName}</p>
        </div>
        
        <div className="flex space-x-3">
          <Link
            href={`/dashboard/sellers/${sellerId}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Back to Seller
          </Link>
        </div>
      </div>
      
      {/* Product Assignment Form - Standalone mode */}
      <ProductAssignmentForm sellerId={sellerId} standalone={true} />
    </div>
  );
} 