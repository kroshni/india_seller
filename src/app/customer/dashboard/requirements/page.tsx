'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';

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

export default function RequirementsPage() {
  const router = useRouter();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customers/requirements');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch requirements');
      }
      
      const data = await response.json();
      setRequirements(data.requirements || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching requirements');
      console.error('Error fetching requirements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this requirement?')) {
      return;
    }

    try {
      const response = await fetch(`/api/customers/requirements/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete requirement');
      }

      toast.success('Requirement deleted successfully');
      fetchRequirements(); // Refresh the list
    } catch (err: any) {
      toast.error(err.message || 'An error occurred while deleting the requirement');
      console.error('Error deleting requirement:', err);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/customer/dashboard/requirements/edit/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={fetchRequirements}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Requirements</h1>
        <Button 
          onClick={() => router.push('/customer/dashboard/requirements/new')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Post New Requirement
        </Button>
      </div>

      {requirements.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-md">
          <p className="text-gray-500 mb-4">You haven't posted any requirements yet.</p>
          <Button 
            onClick={() => router.push('/customer/dashboard/requirements/new')}
            className="flex items-center gap-2 mx-auto"
          >
            <Plus className="h-4 w-4" /> Post Your First Requirement
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-medium text-gray-600">Product Name</th>
                <th className="p-3 text-left font-medium text-gray-600">Details</th>
                <th className="p-3 text-left font-medium text-gray-600">Status</th>
                <th className="p-3 text-left font-medium text-gray-600">Date</th>
                <th className="p-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req) => (
                <tr key={req.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{req.productName}</td>
                  <td className="p-3">
                    {req.details.length > 50 ? `${req.details.substring(0, 50)}...` : req.details}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : req.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {req.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-3">{formatDate(req.createdAt)}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(req.id)}
                        className="p-1"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(req.id)}
                        className="p-1 text-red-500 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}