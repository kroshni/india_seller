'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function NewRequirementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    details: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.productName.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.details.trim()) {
      toast.error('Details are required');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/customers/requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create requirement');
      }

      toast.success('Requirement posted successfully');
      router.push('/customer/dashboard/requirements');
    } catch (err: any) {
      toast.error(err.message || 'An error occurred while posting the requirement');
      console.error('Error posting requirement:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/customer/dashboard/requirements')}
          className="p-0 h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Post New Requirement</h1>
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <Input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter the product name you're looking for"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              Details *
            </label>
            <Textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Describe your requirements in detail (specifications, quantity, etc.)"
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Contact Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email for contact"
              required
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Requirement'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}