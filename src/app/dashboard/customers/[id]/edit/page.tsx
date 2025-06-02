'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCustomerById, updateCustomer } from '@/lib/api-client/customer-client';

interface Address {
  id?: string;
  addressType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface Document {
  id?: string;
  documentType: string;
  documentUrl: string;
  uploadedAt?: string;
}

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // const resolvedParams = use(params);
  // const customerId = resolvedParams.id;
  const customerId = params.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('Active');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  
  // New address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    addressType: 'Home',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false
  });
  
  // New document form
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [newDocument, setNewDocument] = useState<Document>({
    documentType: 'ID Proof',
    documentUrl: ''
  });
  
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
        
        // Set customer personal info
        setName(customerData.customer.name);
        setEmail(customerData.customer.email);
        setPhone(customerData.customer.phone);
        setStatus(customerData.customer.status);
        
        // Set addresses and documents
        setAddresses(customerData.addresses || []);
        setDocuments(customerData.documents || []);
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      await updateCustomer(customerId, {
        name,
        email,
        phone,
        status,
        addresses,
        documents
      });
      
      setSuccessMessage('Customer updated successfully!');
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push(`/dashboard/customers/${customerId}`);
      }, 1500);
    } catch (error) {
      console.error('Error updating customer:', error);
      setError('Failed to update customer. Please try again.');
      setIsSaving(false);
    }
  };
  
  const handleAddAddress = () => {
    // Validate address fields
    if (!newAddress.addressLine1 || !newAddress.city || !newAddress.state || !newAddress.postalCode || !newAddress.country) {
      setError('Please fill in all required address fields.');
      return;
    }
    
    // If this is the first address, make it default
    if (addresses.length === 0) {
      newAddress.isDefault = true;
    }
    
    // If this address is set as default, update other addresses
    if (newAddress.isDefault) {
      setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })));
    }
    
    setAddresses([...addresses, { ...newAddress, id: `temp-${Date.now()}` }]);
    
    // Reset form
    setNewAddress({
      addressType: 'Home',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: false
    });
    
    setShowAddressForm(false);
    setError(null);
  };
  
  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = [...addresses];
    const removedAddress = updatedAddresses.splice(index, 1)[0];
    
    // If the removed address was default, set the first remaining address as default
    if (removedAddress.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    
    setAddresses(updatedAddresses);
  };
  
  const handleSetDefaultAddress = (index: number) => {
    setAddresses(
      addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index
      }))
    );
  };
  
  const handleAddDocument = () => {
    // Validate document fields
    if (!newDocument.documentType || !newDocument.documentUrl) {
      setError('Please fill in all required document fields.');
      return;
    }
    
    setDocuments([...documents, { ...newDocument, id: `temp-${Date.now()}` }]);
    
    // Reset form
    setNewDocument({
      documentType: 'ID Proof',
      documentUrl: ''
    });
    
    setShowDocumentForm(false);
    setError(null);
  };
  
  const handleRemoveDocument = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <span className="ml-2">Loading customer details...</span>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Edit Customer</h1>
        <div className="flex space-x-2">
          <Link
            href={`/dashboard/customers/${customerId}`}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Link>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 bg-green-50 p-4 rounded-md">
          <p className="text-green-700">{successMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Addresses */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Addresses</h2>
            <button
              type="button"
              onClick={() => setShowAddressForm(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Add Address
            </button>
          </div>
          
          {addresses.length === 0 ? (
            <p className="text-gray-500">No addresses added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address, index) => (
                <div key={address.id} className="border rounded-lg p-4 relative">
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {!address.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(index)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveAddress(index)}
                      className="text-xs text-red-600 hover:text-red-800 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                  
                  {address.isDefault && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                      Default
                    </span>
                  )}
                  
                  <p className="font-medium">{address.addressType} Address</p>
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
          
          {/* Add Address Form */}
          {showAddressForm && (
            <div className="mt-4 border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-3">Add New Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Type *
                  </label>
                  <select
                    value={newAddress.addressType}
                    onChange={(e) => setNewAddress({ ...newAddress, addressType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Billing">Billing</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={newAddress.addressLine1}
                    onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={newAddress.addressLine2 || ''}
                    onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                      Set as default address
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Documents */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Documents</h2>
            <button
              type="button"
              onClick={() => setShowDocumentForm(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Add Document
            </button>
          </div>
          
          {documents.length === 0 ? (
            <p className="text-gray-500">No documents added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {documents.map((document, index) => (
                <div key={document.id} className="border rounded-lg p-4 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(index)}
                    className="absolute top-2 right-2 text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                  
                  <p className="font-medium">{document.documentType}</p>
                  {document.uploadedAt && (
                    <p className="text-sm text-gray-500 mb-2">
                      Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
                    </p>
                  )}
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
          
          {/* Add Document Form */}
          {showDocumentForm && (
            <div className="mt-4 border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-3">Add New Document</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type *
                  </label>
                  <select
                    value={newDocument.documentType}
                    onChange={(e) => setNewDocument({ ...newDocument, documentType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="ID Proof">ID Proof</option>
                    <option value="Address Proof">Address Proof</option>
                    <option value="Business License">Business License</option>
                    <option value="Tax Document">Tax Document</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document URL *
                  </label>
                  <input
                    type="url"
                    value={newDocument.documentUrl}
                    onChange={(e) => setNewDocument({ ...newDocument, documentUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/document.pdf"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDocumentForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddDocument}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Document
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}