'use client';

import { ProductCreateInput } from '@/lib/cassandra';

interface PricingSectionProps {
  values: Partial<ProductCreateInput>;
  onChange: (field: keyof ProductCreateInput, value: any) => void;
  errors: Record<string, string>;
}

export default function PricingSection({
  values,
  onChange,
  errors
}: PricingSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Pricing Information</h2>
      
      {/* Regular Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Regular Price <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">₹</span>
          </div>
          <input
            type="number"
            id="price"
            min="0"
            step="0.01"
            value={values.price || ''}
            onChange={(e) => onChange('price', parseFloat(e.target.value) || 0)}
            className={`block w-full pl-7 pr-12 border ${
              errors.price ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">INR</span>
          </div>
        </div>
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price}</p>
        )}
      </div>
      
      {/* Sale Price */}
      <div>
        <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700">
          Sale Price
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">₹</span>
          </div>
          <input
            type="number"
            id="salePrice"
            min="0"
            step="0.01"
            value={values.salePrice || ''}
            onChange={(e) => onChange('salePrice', e.target.value === '' ? undefined : parseFloat(e.target.value))}
            className={`block w-full pl-7 pr-12 border ${
              errors.salePrice ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">INR</span>
          </div>
        </div>
        {errors.salePrice && (
          <p className="mt-1 text-sm text-red-600">{errors.salePrice}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Leave empty if the product is not on sale.
        </p>
      </div>
      
      {/* Sale Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="saleStartDate" className="block text-sm font-medium text-gray-700">
            Sale Start Date
          </label>
          <input
            type="date"
            id="saleStartDate"
            value={values.saleStartDate ? new Date(values.saleStartDate).toISOString().split('T')[0] : ''}
            onChange={(e) => onChange('saleStartDate', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
            className={`mt-1 block w-full border ${
              errors.saleStartDate ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.saleStartDate && (
            <p className="mt-1 text-sm text-red-600">{errors.saleStartDate}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="saleEndDate" className="block text-sm font-medium text-gray-700">
            Sale End Date
          </label>
          <input
            type="date"
            id="saleEndDate"
            value={values.saleEndDate ? new Date(values.saleEndDate).toISOString().split('T')[0] : ''}
            onChange={(e) => onChange('saleEndDate', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
            className={`mt-1 block w-full border ${
              errors.saleEndDate ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.saleEndDate && (
            <p className="mt-1 text-sm text-red-600">{errors.saleEndDate}</p>
          )}
        </div>
      </div>
    </div>
  );
} 