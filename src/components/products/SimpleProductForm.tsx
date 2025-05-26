'use client';

import { useState, useEffect } from 'react';
import { ProductCreateInput } from '@/lib/cassandra';
import BasicInfoSection from './form-sections/BasicInfoSection';
import PricingSection from './form-sections/PricingSection';
import InventorySection from './form-sections/InventorySection';
import CategoriesSection from './form-sections/CategoriesSection';
import ImagesSection from './form-sections/ImagesSection';
import AttributesSection from './form-sections/AttributesSection';

interface SimpleProductFormProps {
  initialValues: Partial<ProductCreateInput>;
  onSubmit: (values: ProductCreateInput) => Promise<void>;
  isSubmitting: boolean;
  buttonText: string;
}

export default function SimpleProductForm({
  initialValues,
  onSubmit,
  isSubmitting,
  buttonText
}: SimpleProductFormProps) {
  const [formValues, setFormValues] = useState<Partial<ProductCreateInput>>(initialValues);
  const [activeTab, setActiveTab] = useState('basic');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Function to handle form value changes
  const handleChange = (
    field: keyof ProductCreateInput,
    value: any
  ) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Function to validate the form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Basic info validation
    if (!formValues.sku) newErrors.sku = 'SKU is required';
    if (!formValues.name) newErrors.name = 'Product name is required';
    
    // Pricing validation
    if (formValues.price === undefined || formValues.price < 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (formValues.salePrice !== undefined && formValues.salePrice > formValues.price!) {
      newErrors.salePrice = 'Sale price cannot be higher than regular price';
    }
    
    // Set errors and return validation result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formValues as ProductCreateInput);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Generate slug from name if slug is empty
  useEffect(() => {
    if (formValues.name && !formValues.slug) {
      const slug = formValues.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      handleChange('slug', slug);
    }
  }, [formValues.name]);

  // Define tabs
  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'categories', label: 'Categories & Brands' },
    { id: 'images', label: 'Images' },
    { id: 'attributes', label: 'Attributes' }
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm 
                ${activeTab === tab.id 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form content */}
      <div className="p-6">
        {/* Basic Info */}
        {activeTab === 'basic' && (
          <BasicInfoSection
            values={formValues}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {/* Pricing */}
        {activeTab === 'pricing' && (
          <PricingSection
            values={formValues}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {/* Inventory */}
        {activeTab === 'inventory' && (
          <InventorySection
            values={formValues}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {/* Categories & Brands */}
        {activeTab === 'categories' && (
          <CategoriesSection
            values={formValues}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {/* Images */}
        {activeTab === 'images' && (
          <ImagesSection
            values={formValues}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {/* Attributes */}
        {activeTab === 'attributes' && (
          <AttributesSection
            values={formValues}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {/* Submit button */}
        <div className="mt-8 border-t border-gray-200 pt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Saving...' : buttonText}
          </button>
        </div>
      </div>
    </form>
  );
} 