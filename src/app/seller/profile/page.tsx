'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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

interface ProfileFormData {
  name: string;
  phone: string;
  companyName: string;
  gstin: string;
  pan: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export default function SellerProfile() {
  const router = useRouter();
  const [user, setUser] = useState<SellerUser | null>(null);
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>();
  
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
  
  useEffect(() => {
    // Populate form with seller data when available
    if (sellerData) {
      reset({
        name: sellerData.name,
        phone: sellerData.phone,
        companyName: sellerData.business?.companyName || '',
        gstin: sellerData.business?.gstin || '',
        pan: sellerData.business?.pan || '',
        bankName: sellerData.business?.bankName || '',
        accountNumber: sellerData.business?.accountNumber || '',
        ifscCode: sellerData.business?.ifscCode || ''
      });
    }
  }, [sellerData, reset]);
  
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
  
  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.sellerId || !sellerData) return;
    
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const updateData = {
        name: data.name,
        phone: data.phone,
        business: {
          companyName: data.companyName,
          gstin: data.gstin,
          pan: data.pan,
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          ifscCode: data.ifscCode
        }
      };
      
      const response = await fetch(`/api/sellers/${user.sellerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      // Refresh seller data
      await fetchSellerData(user.sellerId);
      setSuccessMessage('Profile updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
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
  
  if (error && !sellerData) {
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
          <h1 className="text-2xl font-bold text-gray-900">Seller Profile</h1>
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
                    <Link href="/seller/dashboard" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/seller/profile" className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
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
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {/* Profile Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Personal Information
                  </button>
                  <button
                    onClick={() => setActiveTab('business')}
                    className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'business' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Business Information
                  </button>
                  <button
                    onClick={() => setActiveTab('bank')}
                    className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'bank' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Bank Details
                  </button>
                </nav>
              </div>
              
              {/* Form */}
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}
                
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {successMessage}
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  {activeTab === 'personal' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          {...register('name', { required: 'Full name is required' })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={sellerData?.email || ''}
                          disabled
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: 'Phone number must be 10 digits',
                            }
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Business Information */}
                  {activeTab === 'business' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                          Company Name
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          {...register('companyName', { required: 'Company name is required' })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.companyName && (
                          <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
                          GSTIN
                        </label>
                        <input
                          id="gstin"
                          type="text"
                          {...register('gstin', {
                            required: 'GSTIN is required',
                            pattern: {
                              value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                              message: 'Invalid GSTIN format',
                            }
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.gstin && (
                          <p className="mt-1 text-sm text-red-600">{errors.gstin.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="pan" className="block text-sm font-medium text-gray-700">
                          PAN Number
                        </label>
                        <input
                          id="pan"
                          type="text"
                          {...register('pan', {
                            required: 'PAN number is required',
                            pattern: {
                              value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                              message: 'Invalid PAN format',
                            }
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.pan && (
                          <p className="mt-1 text-sm text-red-600">{errors.pan.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Bank Details */}
                  {activeTab === 'bank' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                          Bank Name
                        </label>
                        <input
                          id="bankName"
                          type="text"
                          {...register('bankName', { required: 'Bank name is required' })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.bankName && (
                          <p className="mt-1 text-sm text-red-600">{errors.bankName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                          Account Number
                        </label>
                        <input
                          id="accountNumber"
                          type="text"
                          {...register('accountNumber', {
                            required: 'Account number is required',
                            pattern: {
                              value: /^[0-9]{9,18}$/,
                              message: 'Invalid account number format',
                            }
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.accountNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.accountNumber.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                          IFSC Code
                        </label>
                        <input
                          id="ifscCode"
                          type="text"
                          {...register('ifscCode', {
                            required: 'IFSC code is required',
                            pattern: {
                              value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                              message: 'Invalid IFSC code format',
                            }
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.ifscCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.ifscCode.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}