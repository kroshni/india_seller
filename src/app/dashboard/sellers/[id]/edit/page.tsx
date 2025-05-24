'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSellerById, updateSeller } from '@/lib/api-client/seller-client';

export default function EditSellerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const sellerId = params.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    // Personal details
    name: '',
    email: '',
    phone: '',
    profilePicture: '',
    status: 'Active',
    kycStatus: 'Pending',
    isTopScorer: 0,
    
    // Business details
    business: {
      companyName: '',
      gstin: '',
      pan: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
    },
    
    // Addresses
    addresses: [],
    
    // Products
    products: [],
    
    // Documents
    documents: [],
    
    // Gallery
    gallery: [],
  });
  
  useEffect(() => {
    const fetchSellerDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const sellerData = await getSellerById(sellerId);
        
        // Format the data for the form
        setFormData({
          name: sellerData.seller.name,
          email: sellerData.seller.email,
          phone: sellerData.seller.phone,
          profilePicture: sellerData.seller.profilePicture || '',
          status: sellerData.seller.status,
          kycStatus: sellerData.seller.kycStatus,
          isTopScorer: sellerData.seller.isTopScorer,
          
          business: {
            companyName: sellerData.business.companyName,
            gstin: sellerData.business.gstin || '',
            pan: sellerData.business.pan || '',
            bankName: sellerData.business.bankName || '',
            accountNumber: sellerData.business.accountNumber || '',
            ifscCode: sellerData.business.ifscCode || '',
          },
          
          addresses: sellerData.addresses.length > 0 
            ? sellerData.addresses
            : [{
                addressType: 'Business',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'India',
                isDefault: true,
                image: '',
              }],
          
          products: sellerData.products.length > 0
            ? sellerData.products
            : [{
                productName: '',
                category: '',
              }],
          
          documents: sellerData.documents || [],
          
          gallery: sellerData.gallery || [],
        });
      } catch (error) {
        console.error('Error fetching seller details:', error);
        setError('Failed to load seller details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSellerDetails();
  }, [sellerId]);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle address changes
  const handleAddressChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => {
      const updatedAddresses = [...prev.addresses];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        [field]: value
      };
      return {
        ...prev,
        addresses: updatedAddresses
      };
    });
  };
  
  // Add a new address
  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          addressType: 'Other',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'India',
          isDefault: false,
          image: '',
        }
      ]
    }));
  };
  
  // Remove an address
  const removeAddress = (index: number) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };
  
  // Handle product changes
  const handleProductChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value
      };
      return {
        ...prev,
        products: updatedProducts
      };
    });
  };
  
  // Add a new product
  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [
        ...prev.products,
        {
          productName: '',
          category: '',
        }
      ]
    }));
  };
  
  // Remove a product
  const removeProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Name, email, and phone are required');
      }
      
      if (!formData.business.companyName) {
        throw new Error('Company name is required');
      }
      
      if (formData.addresses.length === 0 || !formData.addresses[0].addressLine1) {
        throw new Error('At least one address is required');
      }
      
      if (formData.products.length === 0 || !formData.products[0].productName) {
        throw new Error('At least one product is required');
      }
      
      // Send data to the API
      const success = await updateSeller(sellerId, formData);
      
      if (success) {
        // Redirect to the seller details page
        router.push(`/dashboard/sellers/${sellerId}`);
      } else {
        throw new Error('Failed to update seller');
      }
    } catch (error) {
      console.error('Error updating seller:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while updating the seller');
    } finally {
      setIsSubmitting(false);
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
          onClick={() => router.push(`/dashboard/sellers/${sellerId}`)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Go Back to Seller
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Seller</h1>
        <p className="mt-1 text-sm text-gray-600">
          Update the seller information
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture URL
              </label>
              <input
                type="text"
                id="profilePicture"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="kycStatus" className="block text-sm font-medium text-gray-700 mb-1">
                KYC Status
              </label>
              <select
                id="kycStatus"
                name="kycStatus"
                value={formData.kycStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="isTopScorer" className="block text-sm font-medium text-gray-700 mb-1">
                Top Scorer (%)
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="isTopScorer"
                  name="isTopScorer"
                  min="0"
                  max="100"
                  value={formData.isTopScorer}
                  onChange={handleChange}
                  className="w-full mr-4"
                />
                <span className="w-10 text-center">{formData.isTopScorer}%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Business Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Business Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="business.companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="business.companyName"
                name="business.companyName"
                value={formData.business.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="business.gstin" className="block text-sm font-medium text-gray-700 mb-1">
                GSTIN
              </label>
              <input
                type="text"
                id="business.gstin"
                name="business.gstin"
                value={formData.business.gstin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="business.pan" className="block text-sm font-medium text-gray-700 mb-1">
                PAN
              </label>
              <input
                type="text"
                id="business.pan"
                name="business.pan"
                value={formData.business.pan}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="business.bankName" className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                id="business.bankName"
                name="business.bankName"
                value={formData.business.bankName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="business.accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                id="business.accountNumber"
                name="business.accountNumber"
                value={formData.business.accountNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="business.ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                id="business.ifscCode"
                name="business.ifscCode"
                value={formData.business.ifscCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Business Addresses */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Business Addresses</h2>
            <button
              type="button"
              onClick={addAddress}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Add Address
            </button>
          </div>
          
          {formData.addresses.map((address: any, index: number) => (
            <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium">Address {index + 1}</h3>
                {formData.addresses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAddress(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Type
                  </label>
                  <select
                    value={address.addressType}
                    onChange={(e) => handleAddressChange(index, 'addressType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Business">Business</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Factory">Factory</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Is Default
                  </label>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      checked={address.isDefault}
                      onChange={(e) => handleAddressChange(index, 'isDefault', e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Set as default address</span>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => handleAddressChange(index, 'addressLine1', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={address.addressLine2 || ''}
                    onChange={(e) => handleAddressChange(index, 'addressLine2', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.country}
                    onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Image URL
                  </label>
                  <input
                    type="text"
                    value={address.image || ''}
                    onChange={(e) => handleAddressChange(index, 'image', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Products</h2>
            <button
              type="button"
              onClick={addProduct}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Add Product
            </button>
          </div>
          
          {formData.products.map((product: any, index: number) => (
            <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium">Product {index + 1}</h3>
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={product.productName}
                    onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={product.category}
                    onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Link
            href={`/dashboard/sellers/${sellerId}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 