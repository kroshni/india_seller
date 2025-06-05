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
    image?: string;
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

interface AddressFormData {
  id?: string;
  addressType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  image?: string;
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
  const [addresses, setAddresses] = useState<AddressFormData[]>([]);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<AddressFormData | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>();
  const addressForm = useForm<AddressFormData>();
  
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
      
      // Set addresses
      if (sellerData.addresses && sellerData.addresses.length > 0) {
        setAddresses(sellerData.addresses);
      }
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
        },
        addresses: addresses
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
  
  const handleAddAddress = () => {
    setIsEditingAddress(true);
    setCurrentAddress({
      addressType: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: false
    });
    addressForm.reset({
      addressType: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: false
    });
  };
  
  const handleEditAddress = (address: AddressFormData) => {
    setIsEditingAddress(true);
    setCurrentAddress(address);
    addressForm.reset({
      addressType: address.addressType,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault
    });
  };
  
  const handleDeleteAddress = (addressId?: string) => {
    if (!addressId) return;
    
    setAddresses(addresses.filter(addr => addr.id !== addressId));
    setSuccessMessage('Address deleted successfully');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };
  
  const handleSaveAddress = (data: AddressFormData) => {
    if (currentAddress?.id) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === currentAddress.id ? { ...data, id: currentAddress.id } : addr
      ));
    } else {
      // Add new address with temporary ID (will be replaced by server-generated ID)
      setAddresses([...addresses, { ...data, id: `temp-${Date.now()}` }]);
    }
    
    setIsEditingAddress(false);
    setCurrentAddress(null);
    setSuccessMessage('Address saved successfully');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };
  
  const handleCancelEditAddress = () => {
    setIsEditingAddress(false);
    setCurrentAddress(null);
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
                <nav className="-mb-px flex flex-wrap" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Personal
                  </button>
                  <button
                    onClick={() => setActiveTab('business')}
                    className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'business' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Business
                  </button>
                  <button
                    onClick={() => setActiveTab('bank')}
                    className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'bank' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Bank
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'addresses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    Addresses
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
                
                {activeTab !== 'addresses' ? (
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
                ) : (
                  /* Addresses Tab */
                  <div>
                    {isEditingAddress ? (
                      <form onSubmit={addressForm.handleSubmit(handleSaveAddress)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">
                              Address Type *
                            </label>
                            <select
                              id="addressType"
                              {...addressForm.register('addressType', { required: 'Address type is required' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select Type</option>
                              <option value="Business">Business</option>
                              <option value="Factory">Factory</option>
                              <option value="Warehouse">Warehouse</option>
                              <option value="Office">Office</option>
                              <option value="Other">Other</option>
                            </select>
                            {addressForm.formState.errors.addressType && (
                              <p className="mt-1 text-sm text-red-600">{addressForm.formState.errors.addressType.message}</p>
                            )}
                          </div>
                          
                          <div className="md:col-span-2">
                            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                              Address Line 1 *
                            </label>
                            <input
                              id="addressLine1"
                              type="text"
                              {...addressForm.register('addressLine1', { required: 'Address line 1 is required' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {addressForm.formState.errors.addressLine1 && (
                              <p className="mt-1 text-sm text-red-600">{addressForm.formState.errors.addressLine1.message}</p>
                            )}
                          </div>
                          
                          <div className="md:col-span-2">
                            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                              Address Line 2
                            </label>
                            <input
                              id="addressLine2"
                              type="text"
                              {...addressForm.register('addressLine2')}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                              City *
                            </label>
                            <input
                              id="city"
                              type="text"
                              {...addressForm.register('city', { required: 'City is required' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {addressForm.formState.errors.city && (
                              <p className="mt-1 text-sm text-red-600">{addressForm.formState.errors.city.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                              State *
                            </label>
                            <input
                              id="state"
                              type="text"
                              {...addressForm.register('state', { required: 'State is required' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {addressForm.formState.errors.state && (
                              <p className="mt-1 text-sm text-red-600">{addressForm.formState.errors.state.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                              Postal Code *
                            </label>
                            <input
                              id="postalCode"
                              type="text"
                              {...addressForm.register('postalCode', { 
                                required: 'Postal code is required',
                                pattern: {
                                  value: /^[0-9]{6}$/,
                                  message: 'Postal code must be 6 digits',
                                }
                              })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {addressForm.formState.errors.postalCode && (
                              <p className="mt-1 text-sm text-red-600">{addressForm.formState.errors.postalCode.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                              Country *
                            </label>
                            <input
                              id="country"
                              type="text"
                              {...addressForm.register('country', { required: 'Country is required' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {addressForm.formState.errors.country && (
                              <p className="mt-1 text-sm text-red-600">{addressForm.formState.errors.country.message}</p>
                            )}
                          </div>
                          
                          <div className="md:col-span-2">
                            <div className="flex items-center">
                              <input
                                id="isDefault"
                                type="checkbox"
                                {...addressForm.register('isDefault')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                                Set as default address
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={handleCancelEditAddress}
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save Address
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Your Addresses</h3>
                          <button
                            onClick={handleAddAddress}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Address
                          </button>
                        </div>
                        
                        {addresses.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by adding a new address.</p>
                            <div className="mt-6">
                              <button
                                onClick={handleAddAddress}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Address
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map((address) => (
                              <div key={address.id} className="border rounded-lg p-4 relative">
                                {address.isDefault && (
                                  <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Default
                                  </span>
                                )}
                                <div className="font-medium text-gray-900">{address.addressType}</div>
                                <div className="text-gray-500 mt-1">
                                  <div>{address.addressLine1}</div>
                                  {address.addressLine2 && <div>{address.addressLine2}</div>}
                                  <div>{address.city}, {address.state} {address.postalCode}</div>
                                  <div>{address.country}</div>
                                </div>
                                <div className="mt-4 flex space-x-2">
                                  <button
                                    onClick={() => handleEditAddress(address)}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAddress(address.id)}
                                    className="text-sm text-red-600 hover:text-red-800"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={handleSubmit(onSubmit)}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={isSaving}
                          >
                            {isSaving ? 'Saving...' : 'Save All Changes'}
                          </button>
                        </div>
                      </div>
                    )}
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