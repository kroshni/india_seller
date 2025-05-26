'use client';

import { useState, useEffect } from 'react';
import { createCategory, updateCategory, getCategoryById } from '@/lib/api-client/category-client';

interface CategoryFormProps {
  categoryId?: string;
  initialData?: {
    name: string;
    slug: string;
    description: string;
    status: 'Active' | 'Inactive';
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CategoryForm({
  categoryId,
  initialData,
  onSuccess,
  onCancel
}: CategoryFormProps) {
  const isEditMode = !!categoryId;
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    status: initialData?.status || 'Active'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadCategory = async () => {
      if (categoryId && !initialData) {
        setIsLoading(true);
        try {
          const { category } = await getCategoryById(categoryId);
          
          if (category) {
            setFormData({
              name: category.name,
              slug: category.slug,
              description: category.description,
              status: category.status
            });
          }
        } catch (error) {
          console.error('Error loading category:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadCategory();
  }, [categoryId, initialData]);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode && categoryId) {
        await updateCategory(categoryId, formData);
      } else {
        await createCategory(formData);
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving category:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to save category. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {errors.form && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {errors.form}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Category name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="category-slug (leave empty to auto-generate)"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to generate automatically from the name
          </p>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Category description"
          />
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
              {isEditMode ? 'Updating...' : 'Creating...'}
            </div>
          ) : (
            isEditMode ? 'Update Category' : 'Create Category'
          )}
        </button>
      </div>
    </form>
  );
} 