'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SellerUser {
  email: string;
  name: string;
  role: string;
  sellerId: string;
}

interface SellerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  isTopScorer: number;
  kycStatus: 'Verified' | 'Pending';
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
  business?: {
    companyName: string;
    gstin: string;
    pan: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
  addresses?: Array<{
    id: string;
    addressType: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
}

export default function SellerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<SellerUser | null>(null);
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await fetch('/api/seller/auth/check', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          // Not authenticated, redirect to login
          router.replace('/seller/login');
          return;
        }
        
        const data = await response.json();
        setUser(data.user);
        
        // Fetch seller details
        if (data.user && data.user.sellerId) {
          await fetchSellerData(data.user.sellerId);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setError('Failed to authenticate');
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAuthentication();
  }, [router]);
  
  const fetchSellerData = async (sellerId: string) => {
    try {
      const response = await fetch(`/api/sellers/${sellerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch seller data');
      }
      
      const data = await response.json();
      setSellerData(data.seller);
    } catch (error) {
      console.error('Error fetching seller data:', error);
      setError('Failed to load seller information');
    }
  };
  
  const handleLogout = async () => {
    try {
      await fetch('/api/seller/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      router.push('/seller/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => router.push('/seller/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Navigation</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <Link href="/seller/dashboard" className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/profile" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/products" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/orders" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/documents" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      KYC Documents
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-1 md:col-span-2">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Account Status</h3>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${sellerData?.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{sellerData?.status || 'Unknown'}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">KYC Status</p>
                  <p className={`font-medium ${sellerData?.kycStatus === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {sellerData?.kycStatus || 'Pending'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Seller Score</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        {sellerData?.isTopScorer || 0}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div 
                      style={{ width: `${sellerData?.isTopScorer || 0}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Improve your seller score by completing your profile and maintaining good service.
                </p>
              </div>
            </div>
            
            {/* Business Information */}
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Business Information</h2>
              </div>
              <div className="p-6">
                {sellerData?.business ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-medium">{sellerData.business.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GSTIN</p>
                      <p className="font-medium">{sellerData.business.gstin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">PAN</p>
                      <p className="font-medium">{sellerData.business.pan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bank Details</p>
                      <p className="font-medium">
                        {sellerData.business.bankName ? 
                          `${sellerData.business.bankName} - ${sellerData.business.accountNumber?.slice(-4).padStart(sellerData.business.accountNumber?.length || 0, '*')}` : 
                          'Not provided'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No business information available</p>
                )}
              </div>
            </div>
            
            {/* Address Information */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Address Information</h2>
              </div>
              <div className="p-6">
                {sellerData?.addresses && sellerData.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {sellerData.addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{address.addressType}</h3>
                          {address.isDefault && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700">
                          {address.addressLine1}
                          {address.addressLine2 && <>, {address.addressLine2}</>}<br />
                          {address.city}, {address.state} {address.postalCode}<br />
                          {address.country}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-4">No addresses added yet</p>
                    <Link 
                      href="/seller/profile" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Address
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}