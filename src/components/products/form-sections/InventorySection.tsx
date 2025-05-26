'use client';

import { ProductCreateInput, StockStatus } from '@/lib/cassandra';

interface InventorySectionProps {
  values: Partial<ProductCreateInput>;
  onChange: (field: keyof ProductCreateInput, value: any) => void;
  errors: Record<string, string>;
}

export default function InventorySection({
  values,
  onChange,
  errors
}: InventorySectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Inventory</h2>
      
      {/* Stock Status */}
      <div>
        <label htmlFor="stockStatus" className="block text-sm font-medium text-gray-700">
          Stock Status
        </label>
        <select
          id="stockStatus"
          value={values.stockStatus || 'In Stock'}
          onChange={(e) => onChange('stockStatus', e.target.value as StockStatus)}
          className={`mt-1 block w-full border ${
            errors.stockStatus ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="On Backorder">On Backorder</option>
        </select>
        {errors.stockStatus && (
          <p className="mt-1 text-sm text-red-600">{errors.stockStatus}</p>
        )}
      </div>
      
      {/* Manage Stock */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="manageStock"
            type="checkbox"
            checked={values.manageStock ?? true}
            onChange={(e) => onChange('manageStock', e.target.checked)}
            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="manageStock" className="font-medium text-gray-700">
            Manage Stock
          </label>
          <p className="text-gray-500">
            Enable stock management at product level
          </p>
        </div>
      </div>
      
      {/* Stock Quantity */}
      {values.manageStock && (
        <div>
          <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            min="0"
            step="1"
            value={values.stockQuantity || 0}
            onChange={(e) => onChange('stockQuantity', parseInt(e.target.value) || 0)}
            className={`mt-1 block w-full border ${
              errors.stockQuantity ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.stockQuantity && (
            <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>
          )}
        </div>
      )}
      
      <hr className="border-gray-200" />
      
      {/* Physical Dimensions */}
      <div>
        <h3 className="text-base font-medium text-gray-900">Physical Dimensions</h3>
        <p className="mt-1 text-sm text-gray-500">
          Optional. Leave empty for digital products or if not tracking dimensions.
        </p>
      </div>
      
      {/* Weight */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          min="0"
          step="0.01"
          value={values.weight || ''}
          onChange={(e) => onChange('weight', e.target.value === '' ? undefined : parseFloat(e.target.value))}
          className={`mt-1 block w-full border ${
            errors.weight ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {errors.weight && (
          <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
        )}
      </div>
      
      {/* Dimensions */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">
            Length (cm)
          </label>
          <input
            type="number"
            id="length"
            min="0"
            step="0.1"
            value={values.dimensions?.length || ''}
            onChange={(e) => {
              const length = e.target.value === '' ? undefined : parseFloat(e.target.value);
              const dimensions = values.dimensions || { length: 0, width: 0, height: 0 };
              onChange('dimensions', length === undefined ? undefined : { ...dimensions, length });
            }}
            className={`mt-1 block w-full border ${
              errors.dimensions ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
        </div>
        
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700">
            Width (cm)
          </label>
          <input
            type="number"
            id="width"
            min="0"
            step="0.1"
            value={values.dimensions?.width || ''}
            onChange={(e) => {
              const width = e.target.value === '' ? undefined : parseFloat(e.target.value);
              const dimensions = values.dimensions || { length: 0, width: 0, height: 0 };
              onChange('dimensions', width === undefined ? undefined : { ...dimensions, width });
            }}
            className={`mt-1 block w-full border ${
              errors.dimensions ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
        </div>
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            min="0"
            step="0.1"
            value={values.dimensions?.height || ''}
            onChange={(e) => {
              const height = e.target.value === '' ? undefined : parseFloat(e.target.value);
              const dimensions = values.dimensions || { length: 0, width: 0, height: 0 };
              onChange('dimensions', height === undefined ? undefined : { ...dimensions, height });
            }}
            className={`mt-1 block w-full border ${
              errors.dimensions ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
        </div>
      </div>
    </div>
  );
} 