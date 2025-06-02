'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomerStatusBadge from '@/components/customers/CustomerStatusBadge';
import InlineEditableStatus from '@/components/customers/InlineEditableStatus';
import { 
  getCustomers, 
  updateCustomerStatus, 
  deleteCustomer,
  bulkUpdateCustomers
} from '@/lib/api-client/customer-client';

export default function CustomersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for customers data
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for selected customers (for bulk actions)
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // State for bulk actions
  const [bulkAction, setBulkAction] = useState('');
  const [bulkStatus, setBulkStatus] = useState('Active');
  const [bulkActionMessage, setBulkActionMessage] = useState({ type: '', text: '' });
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  
  // Load customers based on filters and pagination
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get search params from URL
        const urlSearch = searchParams.get('search') || '';
        const urlStatus = searchParams.get('status') || 'All';
        const urlSortBy = searchParams.get('sortBy') || 'name';
        const urlSortOrder = searchParams.get('sortOrder') || 'asc';
        const urlPage = parseInt(searchParams.get('page') || '1');
        
        // Update state with URL params
        setFilters({
          search: urlSearch,
          status: urlStatus,
          sortBy: urlSortBy,
          sortOrder: urlSortOrder
        });
        setCurrentPage(urlPage);
        
        // Fetch customers with filters
        const result = await getCustomers({
          search: urlSearch,
          status: urlStatus !== 'All' ? urlStatus : undefined,
          sortBy: urlSortBy,
          sortOrder: urlSortOrder,
          page: urlPage,
          limit: pageSize
        });
        
        setCustomers(result.customers);
        setTotalCustomers(result.total);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCustomers();
  }, [searchParams, pageSize]);
  
  // Update URL with new filters
  const updateUrl = (newFilters, page) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.status !== 'All') params.set('status', newFilters.status);
    if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);
    if (newFilters.sortOrder) params.set('sortOrder', newFilters.sortOrder);
    if (page > 1) params.set('page', page.toString());
    
    const queryString = params.toString();
    router.push(`/dashboard/customers${queryString ? `?${queryString}` : ''}`);
  };
  
  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateUrl(filters, page);
  };
  
  // Handle customer selection
  const handleSelectCustomer = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };
  
  // Handle select all customers
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map(customer => customer.id));
    }
    setSelectAll(!selectAll);
  };
  
  // Handle bulk action selection
  const handleBulkActionChange = (e) => {
    setBulkAction(e.target.value);
    setBulkActionMessage({ type: '', text: '' });
  };
  
  // Handle bulk status selection
  const handleBulkStatusChange = (e) => {
    setBulkStatus(e.target.value);
  };
  
  // Apply bulk action
  const applyBulkAction = async () => {
    if (!bulkAction || selectedCustomers.length === 0) {
      setBulkActionMessage({ 
        type: 'error', 
        text: 'Please select an action and at least one customer' 
      });
      return;
    }
    
    try {
      if (bulkAction === 'status') {
        await bulkUpdateCustomers(selectedCustomers, bulkStatus);
        setBulkActionMessage({ 
          type: 'success', 
          text: `Successfully updated ${selectedCustomers.length} customers to ${bulkStatus}` 
        });
        
        // Refresh the customer list
        const result = await getCustomers({
          search: filters.search,
          status: filters.status !== 'All' ? filters.status : undefined,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          page: currentPage,
          limit: pageSize
        });
        
        setCustomers(result.customers);
      } else if (bulkAction === 'delete') {
        // Confirm deletion
        if (window.confirm(`Are you sure you want to delete ${selectedCustomers.length} customers? This action cannot be undone.`)) {
          // Delete each customer
          for (const customerId of selectedCustomers) {
            await deleteCustomer(customerId);
          }
          
          setBulkActionMessage({ 
            type: 'success', 
            text: `Successfully deleted ${selectedCustomers.length} customers` 
          });
          
          // Refresh the customer list
          const result = await getCustomers({
            search: filters.search,
            status: filters.status !== 'All' ? filters.status : undefined,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
            page: currentPage,
            limit: pageSize
          });
          
          setCustomers(result.customers);
          setTotalCustomers(result.total);
          setSelectedCustomers([]);
          setSelectAll(false);
        }
      }
    } catch (err) {
      console.error('Error applying bulk action:', err);
      setBulkActionMessage({ 
        type: 'error', 
        text: 'An error occurred while applying the bulk action' 
      });
    }
  };
  
  // Handle status update
  const handleStatusUpdate = async (customerId, status) => {
    try {
      await updateCustomerStatus(customerId, status);
      
      // Update customer in the list
      setCustomers(customers.map(customer => 
        customer.id === customerId 
          ? { ...customer, status } 
          : customer
      ));
      
      return true;
    } catch (err) {
      console.error('Error updating customer status:', err);
      return false;
    }
  };
  
  // Handle customer deletion
  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      try {
        await deleteCustomer(customerId);
        
        // Remove customer from the list
        setCustomers(customers.filter(customer => customer.id !== customerId));
        setTotalCustomers(totalCustomers - 1);
        
        return true;
      } catch (err) {
        console.error('Error deleting customer:', err);
        return false;
      }
    }
    return false;
  };
  
  // Render pagination controls
  const renderPagination = () => {
    const totalPages = Math.ceil(totalCustomers / pageSize);
    if (totalPages <= 1) return null;
    
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${currentPage === i ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
        >
          {i}
        </button>
      );
    }
    
    return (
      <div className="flex space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            Previous
          </button>
        )}
        
        {pages}
        
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            Next
          </button>
        )}
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage customer accounts and information
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Customer List</h2>
          <button
            onClick={() => router.push('/dashboard/customers/create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Customer
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading customers...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No customers found. Try adjusting your filters or add a new customer.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {customer.profilePicture ? (
                            <img
                              src={customer.profilePicture}
                              alt={customer.name}
                              className="h-10 w-10 rounded-full"
                            />
                          ) : (
                            customer.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <InlineEditableStatus
                        customerId={customer.id}
                        initialStatus={customer.status}
                        onSave={handleStatusUpdate}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link href={`/dashboard/customers/${customer.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </Link>
                      <Link href={`/dashboard/customers/${customer.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
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
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            {customers.length > 0 ? (
              <>Showing <span className="font-medium">{customers.length}</span> of <span className="font-medium">{totalCustomers}</span> customers</>
            ) : (
              <>No customers found</>
            )}
          </div>
          {renderPagination()}
        </div>
      </div>
    </div>
  );
}