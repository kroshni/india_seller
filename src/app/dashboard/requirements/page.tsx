'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Eye } from 'lucide-react';

interface Requirement {
  id: string;
  customerId: string;
  customerName: string;
  productName: string;
  details: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminRequirementsPage() {
  const router = useRouter();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRequirements(pagination.page, searchTerm);
  }, [pagination.page]);

  const fetchRequirements = async (page: number, search: string = '') => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString()
      });

      if (search) {
        queryParams.append('search', search);
      }

      const response = await fetch(`/api/admin/requirements?${queryParams.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch requirements');
      }
      
      const data = await response.json();
      setRequirements(data.requirements || []);
      setPagination(data.pagination || pagination);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching requirements');
      console.error('Error fetching requirements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRequirements(1, searchTerm);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/requirements/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  if (loading && requirements.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Requirements</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search by product name or customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button type="submit" variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => fetchRequirements(pagination.page)}
          >
            Try Again
          </Button>
        </div>
      )}

      {!loading && requirements.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-md">
          <p className="text-gray-500">No requirements found.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-medium text-gray-600">Customer</th>
                  <th className="p-3 text-left font-medium text-gray-600">Product Name</th>
                  <th className="p-3 text-left font-medium text-gray-600">Email</th>
                  <th className="p-3 text-left font-medium text-gray-600">Status</th>
                  <th className="p-3 text-left font-medium text-gray-600">Date</th>
                  <th className="p-3 text-left font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requirements.map((req) => (
                  <tr key={req.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{req.customerName}</td>
                    <td className="p-3">{req.productName}</td>
                    <td className="p-3">{req.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : req.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {req.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-3">{formatDate(req.createdAt)}</td>
                    <td className="p-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(req.id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1 || loading}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages || loading}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}