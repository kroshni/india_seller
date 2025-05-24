'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSellers, updateSellerStatus, updateSellerKycStatus, updateSellerTopScorer, bulkUpdateSellers, bulkDeleteSellers } from '@/lib/api-client/seller-client';
import { Seller, SellerFilters } from '@/lib/services/seller-service';

import SellerStatusBadge from '@/components/sellers/SellerStatusBadge';
import KycStatusBadge from '@/components/sellers/KycStatusBadge';
import TopScorerBar from '@/components/sellers/TopScorerBar';
import InlineEditableStatus from '@/components/sellers/InlineEditableStatus';
import InlineEditableKyc from '@/components/sellers/InlineEditableKyc';
import InlineEditableTopScorer from '@/components/sellers/InlineEditableTopScorer';

export default function SellersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isBulkActionLoading, setIsBulkActionLoading] = useState(false);
  const [bulkActionMessage, setBulkActionMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Pagination state
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  
  // Filter state
  const [filters, setFilters] = useState<SellerFilters>({
    search: searchParams.get('search') || '',
    status: (searchParams.get('status') as any) || 'All',
    kycStatus: (searchParams.get('kycStatus') as any) || 'All',
    sortBy: searchParams.get('sortBy') || 'name',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc',
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
  });
  
  // Bulk operation state
  const [bulkAction, setBulkAction] = useState<'none' | 'status' | 'kyc' | 'topscore' | 'delete'>('none');
  const [bulkStatusValue, setBulkStatusValue] = useState<'Active' | 'Inactive'>('Active');
  const [bulkKycValue, setBulkKycValue] = useState<'Verified' | 'Pending'>('Verified');
  const [bulkTopScoreValue, setBulkTopScoreValue] = useState(0);
  
  // Fetch sellers from the server based on current filters
  useEffect(() => {
    const fetchSellers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await getSellers(filters);
        setSellers(result.data);
        setTotalSellers(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
        setCurrentPage(result.pagination.currentPage);
        setPageLimit(result.pagination.limit);
      } catch (error) {
        console.error('Error fetching sellers:', error);
        setError('Failed to load sellers. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSellers();
  }, [filters]);
  
  // Update URL with current filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.status && filters.status !== 'All') params.set('status', filters.status);
    if (filters.kycStatus && filters.kycStatus !== 'All') params.set('kycStatus', filters.kycStatus);
    if (filters.page && filters.page > 1) params.set('page', filters.page.toString());
    if (filters.limit && filters.limit !== 10) params.set('limit', filters.limit.toString());
    if (filters.sortBy && filters.sortBy !== 'name') params.set('sortBy', filters.sortBy);
    if (filters.sortOrder && filters.sortOrder !== 'asc') params.set('sortOrder', filters.sortOrder);
    
    const url = `/dashboard/sellers${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(url, { scroll: false });
  }, [filters, router]);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = (e.target as any).search.value;
    
    setFilters(prev => ({
      ...prev,
      search: searchValue,
      page: 1, // Reset to first page on new search
    }));
  };
  
  // Handle filter changes
  const handleFilterChange = (key: keyof SellerFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value, // Reset to first page on filter change except when the page itself is changing
    }));
  };
  
  // Handle pagination
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    handleFilterChange('page', page);
  };
  
  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSellers([]);
    } else {
      setSelectedSellers(sellers.map(seller => seller.id));
    }
    setSelectAll(!selectAll);
  };
  
  // Handle individual seller selection
  const handleSelectSeller = (sellerId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSellers(prev => [...prev, sellerId]);
    } else {
      setSelectedSellers(prev => prev.filter(id => id !== sellerId));
    }
  };
  
  // Handle bulk action submission
  const handleBulkAction = async () => {
    if (selectedSellers.length === 0) {
      setBulkActionMessage({ type: 'error', text: 'No sellers selected' });
      return;
    }
    
    if (bulkAction === 'none') {
      setBulkActionMessage({ type: 'error', text: 'No action selected' });
      return;
    }
    
    setIsBulkActionLoading(true);
    setBulkActionMessage(null);
    
    try {
      let success = false;
      
      if (bulkAction === 'delete') {
        success = await bulkDeleteSellers(selectedSellers);
      } else {
        const data: any = { sellerIds: selectedSellers };
        
        if (bulkAction === 'status') {
          data.status = bulkStatusValue;
        } else if (bulkAction === 'kyc') {
          data.kycStatus = bulkKycValue;
        } else if (bulkAction === 'topscore') {
          data.isTopScorer = bulkTopScoreValue;
        }
        
        success = await bulkUpdateSellers(data);
      }
      
      if (success) {
        setBulkActionMessage({ 
          type: 'success', 
          text: `Successfully ${bulkAction === 'delete' ? 'deleted' : 'updated'} ${selectedSellers.length} seller${selectedSellers.length > 1 ? 's' : ''}` 
        });
        
        // Reset selections
        setSelectedSellers([]);
        setSelectAll(false);
        setBulkAction('none');
        
        // Refresh data
        const result = await getSellers(filters);
        setSellers(result.data);
        setTotalSellers(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
      } else {
        setBulkActionMessage({ type: 'error', text: 'Failed to perform bulk action' });
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
      setBulkActionMessage({ type: 'error', text: 'An error occurred while performing bulk action' });
    } finally {
      setIsBulkActionLoading(false);
    }
  };
  
  // Handle inline updates
  const handleStatusUpdate = async (sellerId: string, status: 'Active' | 'Inactive') => {
    try {
      return await updateSellerStatus(sellerId, status);
    } catch (error) {
      console.error('Error updating status:', error);
      return false;
    }
  };
  
  const handleKycUpdate = async (sellerId: string, kycStatus: 'Verified' | 'Pending') => {
    try {
      return await updateSellerKycStatus(sellerId, kycStatus);
    } catch (error) {
      console.error('Error updating KYC status:', error);
      return false;
    }
  };
  
  const handleTopScorerUpdate = async (sellerId: string, score: number) => {
    try {
      return await updateSellerTopScorer(sellerId, score);
    } catch (error) {
      console.error('Error updating top scorer:', error);
      return false;
    }
  };
  
  // Generate pagination controls
  const renderPagination = () => {
    const pages = [];
    
    // Add previous button
    pages.push(
      <button
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
      >
        Previous
      </button>
    );
    
    // Add page numbers
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded border ${
            i === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Add next button
    pages.push(
      <button
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
      >
        Next
      </button>
    );
    
    return (
      <div className="flex space-x-2 mt-6">
        {pages}
      </div>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sellers</h1>
        <Link
          href="/dashboard/sellers/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Seller
        </Link>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search bar */}
          <div className="flex-1">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search sellers..."
                  defaultValue={filters.search}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Status filter */}
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            
            {/* KYC filter */}
            <select
              value={filters.kycStatus}
              onChange={(e) => handleFilterChange('kycStatus', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All KYC</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
            </select>
            
            {/* Sort filter */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="isTopScorer">Sort by Top Scorer</option>
              <option value="createdAt">Sort by Date</option>
            </select>
            
            {/* Sort order */}
            <button
              onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filters.sortOrder === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Bulk actions */}
      {selectedSellers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-blue-700 font-medium">
              {selectedSellers.length} seller{selectedSellers.length !== 1 ? 's' : ''} selected
            </span>
            
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">Select Action</option>
              <option value="status">Update Status</option>
              <option value="kyc">Update KYC</option>
              <option value="topscore">Update Top Scorer</option>
              <option value="delete">Delete</option>
            </select>
            
            {bulkAction === 'status' && (
              <select
                value={bulkStatusValue}
                onChange={(e) => setBulkStatusValue(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            )}
            
            {bulkAction === 'kyc' && (
              <select
                value={bulkKycValue}
                onChange={(e) => setBulkKycValue(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
              </select>
            )}
            
            {bulkAction === 'topscore' && (
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bulkTopScoreValue}
                  onChange={(e) => setBulkTopScoreValue(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="w-12 text-center">{bulkTopScoreValue}%</span>
              </div>
            )}
            
            <button
              onClick={handleBulkAction}
              disabled={isBulkActionLoading || bulkAction === 'none'}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 ml-auto"
            >
              {isBulkActionLoading ? 'Processing...' : 'Apply'}
            </button>
          </div>
          
          {bulkActionMessage && (
            <div className={`mt-2 text-sm ${bulkActionMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {bulkActionMessage.text}
            </div>
          )}
        </div>
      )}
      
      {/* Sellers table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading sellers...</span>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-600">{error}</div>
        ) : sellers.length === 0 ? (
          <div className="py-8 text-center text-gray-600">
            No sellers found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
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
                      <input
                        type="checkbox"
                        checked={selectedSellers.includes(seller.id)}
                        onChange={(e) => handleSelectSeller(seller.id, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {seller.profilePicture ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={seller.profilePicture}
                              alt={seller.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                              {seller.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {seller.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {seller.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {seller.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {/* Here we would normally have the business name from a join */}
                        Business
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <InlineEditableStatus
                        sellerId={seller.id}
                        initialValue={seller.status}
                        onSave={handleStatusUpdate}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <InlineEditableKyc
                        sellerId={seller.id}
                        initialValue={seller.kycStatus}
                        onSave={handleKycUpdate}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <InlineEditableTopScorer
                        sellerId={seller.id}
                        initialValue={seller.isTopScorer}
                        onSave={handleTopScorerUpdate}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/sellers/${seller.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/sellers/${seller.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => bulkDeleteSellers([seller.id])}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-white">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{Math.min(1 + (currentPage - 1) * pageLimit, totalSellers)}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * pageLimit, totalSellers)}</span> of{' '}
                  <span className="font-medium">{totalSellers}</span> results
                </p>
              </div>
              <div>
                {renderPagination()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 