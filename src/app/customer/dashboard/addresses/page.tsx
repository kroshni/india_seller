'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Address {
  id: string;
  customerId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  addressType: string;
}

export default function CustomerAddresses() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false,
    addressType: 'Shipping'
  });

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/customers/addresses');
      
      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to login if unauthorized
          router.push('/customer/login');
          return;
        }
        throw new Error('Failed to fetch addresses');
      }
      
      const data = await response.json();
      setAddresses(data);
    } catch (err) {
      setError('Error loading addresses. Please try again.');
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: false,
      addressType: 'Shipping'
    });
    setEditingAddress(null);
    setShowAddForm(false);
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/customers/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add address');
      }
      
      const newAddress = await response.json();
      setAddresses(prev => [...prev, newAddress]);
      toast.success('Address added successfully');
      resetForm();
    } catch (err) {
      setError('Error adding address. Please try again.');
      console.error('Error adding address:', err);
      toast.error('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddress) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/customers/addresses/${editingAddress.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update address');
      }
      
      const updatedAddress = await response.json();
      setAddresses(prev => 
        prev.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr)
      );
      toast.success('Address updated successfully');
      resetForm();
    } catch (err) {
      setError('Error updating address. Please try again.');
      console.error('Error updating address:', err);
      toast.error('Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/customers/addresses/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete address');
      }
      
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      toast.success('Address deleted successfully');
    } catch (err) {
      setError('Error deleting address. Please try again.');
      console.error('Error deleting address:', err);
      toast.error('Failed to delete address');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
      addressType: address.addressType
    });
    setShowAddForm(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Addresses</h1>
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Address
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="bg-white shadow-md rounded p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h2>
          <form onSubmit={editingAddress ? handleEditAddress : handleAddAddress}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-gray-700 mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-gray-700 mb-1">Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Address Type</label>
                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Shipping">Shipping</option>
                  <option value="Billing">Billing</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Set as default for this address type</label>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? 'Saving...' : editingAddress ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && !showAddForm ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2">Loading addresses...</p>
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-gray-100 p-8 text-center rounded">
          <p className="text-gray-600">You don't have any saved addresses yet.</p>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Address
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(address => (
            <div key={address.id} className="bg-white shadow-md rounded p-4 relative">
              {address.isDefault && (
                <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Default {address.addressType}
                </span>
              )}
              <div className="mb-4">
                <h3 className="font-semibold text-lg">{address.addressType} Address</h3>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{address.city}, {address.state} {address.postalCode}</p>
                <p>{address.country}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(address)}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}