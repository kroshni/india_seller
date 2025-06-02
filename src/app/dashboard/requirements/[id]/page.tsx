'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';

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

export default function RequirementDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRequirement(id);
    }
  }, [id]);

  const fetchRequirement = async (requirementId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/requirements/${requirementId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch requirement');
      }
      
      const data = await response.json();
      setRequirement(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the requirement');
      console.error('Error fetching requirement:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !requirement) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        <p>{error || 'Requirement not found'}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => router.push('/dashboard/requirements')}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/dashboard/requirements')}
          className="p-0 h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Requirement Details</h1>
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Requirement Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Product Name</p>
                <p className="font-medium">{requirement.productName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${requirement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : requirement.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {requirement.status || 'pending'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p>{formatDate(requirement.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p>{formatDate(requirement.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="font-medium">{requirement.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer ID</p>
                <p className="font-mono text-sm">{requirement.customerId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Email</p>
                <div className="flex items-center gap-2">
                  <p>{requirement.email}</p>
                  <a 
                    href={`mailto:${requirement.email}?subject=Regarding your requirement: ${requirement.productName}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Requirement Details</h2>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
            {requirement.details}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/dashboard/requirements')}
          >
            Back to List
          </Button>
        </div>
      </div>
    </div>
  );
}