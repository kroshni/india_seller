'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/lib/cassandra';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productTypes: { type: ProductType; description: string; icon: React.ReactNode }[] = [
    {
      type: 'Simple',
      description: 'A basic product with a single SKU and no variations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      type: 'Configurable',
      description: 'A product with options like size, color, etc.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    },
    {
      type: 'Virtual',
      description: 'A non-physical product like a service or a digital item',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      type: 'Downloadable',
      description: 'A digital product that can be downloaded',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )
    },
    {
      type: 'Grouped',
      description: 'A collection of related products that can be purchased individually',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      type: 'Bundled',
      description: 'A collection of products that must be purchased together',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    }
  ];

  const handleContinue = () => {
    if (!selectedType) return;
    
    setIsSubmitting(true);
    
    // For now, we only support simple products
    if (selectedType === 'Simple') {
      router.push('/dashboard/products/add/simple');
    } else {
      // In the future, we would route to other product type forms
      alert(`${selectedType} product type is not implemented yet. Please select Simple for now.`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="mt-1 text-sm text-gray-600">
          Step 1: Select Product Type
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900">Select Product Type</h2>
          <p className="mt-1 text-sm text-gray-600">
            Choose the type of product you want to create
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productTypes.map((productType) => (
            <div
              key={productType.type}
              className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md 
                ${selectedType === productType.type ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setSelectedType(productType.type)}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={productType.type}
                  name="productType"
                  checked={selectedType === productType.type}
                  onChange={() => setSelectedType(productType.type)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={productType.type} className="text-lg font-medium text-gray-900">
                  {productType.type}
                </label>
              </div>
              
              <div className="mt-4 flex justify-center">
                {productType.icon}
              </div>
              
              <p className="mt-4 text-sm text-gray-600">
                {productType.description}
              </p>
              
              {productType.type !== 'Simple' && (
                <div className="mt-2 text-xs text-gray-500 italic">
                  Coming soon
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Link
            href="/dashboard/products"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            onClick={handleContinue}
            disabled={!selectedType || isSubmitting}
            className={`px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 
              ${(!selectedType || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Please wait...' : 'Continue'}
          </button>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Bulk Upload Products</h2>
        <p className="text-sm text-gray-600 mb-4">
          You can also upload multiple products at once using a CSV or XLSX file.
        </p>
        <Link
          href="/dashboard/products/bulk-upload"
          className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700"
        >
          Bulk Upload
        </Link>
      </div>
    </div>
  );
} 