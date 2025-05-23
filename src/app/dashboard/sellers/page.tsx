'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  isTopScorer: boolean;
  kycStatus: 'Verified' | 'Pending';
  status: 'Active' | 'Inactive';
}

export default function SellersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingSuccess, setSeedingSuccess] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSellers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/sellers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch sellers');
        }
        
        const { sellers } = await response.json();
        
        // Apply filter if provided
        let filteredSellers = sellers;
        if (filter === 'pending') {
          filteredSellers = sellers.filter((seller: Seller) => seller.kycStatus === 'Pending');
        } else if (filter === 'verified') {
          filteredSellers = sellers.filter((seller: Seller) => seller.kycStatus === 'Verified');
        } else if (filter === 'active') {
          filteredSellers = sellers.filter((seller: Seller) => seller.status === 'Active');
        } else if (filter === 'inactive') {
          filteredSellers = sellers.filter((seller: Seller) => seller.status === 'Inactive');
        } else if (filter === 'top-scorers') {
          filteredSellers = sellers.filter((seller: Seller) => seller.isTopScorer);
        }
        
        setSellers(filteredSellers);
      } catch (error) {
        console.error('Error fetching sellers:', error);
        setError('Failed to load sellers. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSellers();
  }, [filter, seedingSuccess]);
  
  const handleDeleteSeller = async () => {
    if (!selectedSeller) return;
    
    try {
      const response = await fetch(`/api/sellers/${selectedSeller}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete seller');
      }
      
      // Remove deleted seller from state
      setSellers(sellers.filter(seller => seller.id !== selectedSeller));
      setShowDeleteModal(false);
      setSelectedSeller(null);
    } catch (error) {
      console.error('Error deleting seller:', error);
      setError('Failed to delete seller. Please try again.');
    }
  };
  
  const confirmDelete = (id: string) => {
    setSelectedSeller(id);
    setShowDeleteModal(true);
  };
  
  const handleSeedDummyData = async () => {
    setIsSeeding(true);
    setSeedingSuccess(null);
    setError(null);
    
    try {
      const response = await fetch('/api/seed/sellers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to seed dummy data');
      }
      
      const data = await response.json();
      setSeedingSuccess(`Successfully added ${data.count} dummy sellers.`);
      
      // Reload the sellers list after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error seeding dummy data:', error);
      setError('Failed to seed dummy data. Please try again.');
    } finally {
      setIsSeeding(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sellers</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage all sellers in the system
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleSeedDummyData}
            disabled={isSeeding}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {isSeeding ? 'Adding Sellers...' : 'Add 15 Dummy Sellers'}
          </button>
          <Link
            href="/dashboard/sellers/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Seller
          </Link>
        </div>
      </div>
      
      {seedingSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          {seedingSuccess}
        </div>
      )}
      
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/dashboard/sellers"
          className={`px-3 py-1 rounded-full text-sm ${
            !filter ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </Link>
        <Link
          href="/dashboard/sellers?filter=active"
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Active
        </Link>
        <Link
          href="/dashboard/sellers?filter=inactive"
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Inactive
        </Link>
        <Link
          href="/dashboard/sellers?filter=pending"
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pending KYC
        </Link>
        <Link
          href="/dashboard/sellers?filter=verified"
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'verified' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Verified KYC
        </Link>
        <Link
          href="/dashboard/sellers?filter=top-scorers"
          className={`px-3 py-1 rounded-full text-sm ${
            filter === 'top-scorers' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Top Scorers
        </Link>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading sellers...</p>
          </div>
        </div>
      ) : sellers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-600">No sellers found.</p>
          <div className="mt-4 flex justify-center space-x-2">
            <button
              onClick={handleSeedDummyData}
              disabled={isSeeding}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {isSeeding ? 'Adding Sellers...' : 'Add 15 Dummy Sellers'}
            </button>
            <Link
              href="/dashboard/sellers/new"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Your First Seller
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    KYC
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Top Scorer
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          {seller.profilePicture ? (
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={seller.profilePicture}
                                alt={seller.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium">
                                {seller.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                          <div className="text-sm text-gray-500">{seller.email}</div>
                          <div className="text-sm text-gray-500">{seller.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seller.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {seller.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seller.kycStatus === 'Verified' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {seller.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seller.isTopScorer 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {seller.isTopScorer ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/dashboard/sellers/${seller.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        <Link
                          href={`/dashboard/sellers/${seller.id}/edit`}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => confirmDelete(seller.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this seller? This action cannot be undone.
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