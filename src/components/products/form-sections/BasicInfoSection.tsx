'use client';

import { ProductCreateInput, Visibility, ProductStatus } from '@/lib/cassandra';

interface BasicInfoSectionProps {
  values: Partial<ProductCreateInput>;
  onChange: (field: keyof ProductCreateInput, value: any) => void;
  errors: Record<string, string>;
}

export default function BasicInfoSection({
  values,
  onChange,
  errors
}: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
      
      {/* SKU */}
      <div>
        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
          SKU <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="sku"
          value={values.sku || ''}
          onChange={(e) => onChange('sku', e.target.value)}
          className={`mt-1 block w-full border ${
            errors.sku ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {errors.sku && (
          <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Stock Keeping Unit. A unique identifier for your product.
        </p>
      </div>
      
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={values.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          className={`mt-1 block w-full border ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      
      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          value={values.slug || ''}
          onChange={(e) => onChange('slug', e.target.value)}
          className={`mt-1 block w-full border ${
            errors.slug ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          URL-friendly version of the product name. Leave empty to generate automatically.
        </p>
      </div>
      
      {/* Short Description */}
      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
          Short Description
        </label>
        <textarea
          id="shortDescription"
          rows={2}
          value={values.shortDescription || ''}
          onChange={(e) => onChange('shortDescription', e.target.value)}
          className={`mt-1 block w-full border ${
            errors.shortDescription ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {errors.shortDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.shortDescription}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Brief summary of the product (displayed in product listings).
        </p>
      </div>
      
      {/* Full Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Full Description
        </label>
        <textarea
          id="description"
          rows={5}
          value={values.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          className={`mt-1 block w-full border ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Detailed description of the product (displayed on product detail page).
        </p>
      </div>
      
      {/* Visibility */}
      <div>
        <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
          Visibility
        </label>
        <select
          id="visibility"
          value={values.visibility || 'Both'}
          onChange={(e) => onChange('visibility', e.target.value as Visibility)}
          className={`mt-1 block w-full border ${
            errors.visibility ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        >
          <option value="Both">Visible in Store & Search</option>
          <option value="Store">Visible in Store Only</option>
          <option value="Search">Visible in Search Only</option>
          <option value="None">Not Visible</option>
        </select>
        {errors.visibility && (
          <p className="mt-1 text-sm text-red-600">{errors.visibility}</p>
        )}
      </div>
      
      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={values.status || 'Disabled'}
          onChange={(e) => onChange('status', e.target.value as ProductStatus)}
          className={`mt-1 block w-full border ${
            errors.status ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        >
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Disabled products won't be displayed on the storefront.
        </p>
      </div>
    </div>
  );
} 