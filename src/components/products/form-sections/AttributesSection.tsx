'use client';

import { useState } from 'react';
import { ProductCreateInput, CustomAttribute } from '@/lib/cassandra';

interface AttributesSectionProps {
  values: Partial<ProductCreateInput>;
  onChange: (field: keyof ProductCreateInput, value: any) => void;
  errors: Record<string, string>;
}

export default function AttributesSection({
  values,
  onChange,
  errors
}: AttributesSectionProps) {
  // Local state for new attribute input
  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');
  const [attributeError, setAttributeError] = useState<string | null>(null);

  // Get current attributes or empty array
  const attributes = values.customAttributes || [];

  // Add a new attribute
  const handleAddAttribute = () => {
    // Validate
    if (!newAttributeName.trim()) {
      setAttributeError('Attribute name cannot be empty');
      return;
    }

    if (!newAttributeValue.trim()) {
      setAttributeError('Attribute value cannot be empty');
      return;
    }

    // Check for duplicate attribute names
    if (attributes.some(attr => attr.name.toLowerCase() === newAttributeName.toLowerCase())) {
      setAttributeError(`Attribute "${newAttributeName}" already exists`);
      return;
    }

    // Clear any previous error
    setAttributeError(null);

    // Add the new attribute
    const newAttributes = [
      ...attributes,
      { name: newAttributeName, value: newAttributeValue }
    ];
    
    // Update parent form
    onChange('customAttributes', newAttributes);
    
    // Clear inputs
    setNewAttributeName('');
    setNewAttributeValue('');
  };

  // Remove an attribute
  const handleRemoveAttribute = (index: number) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    onChange('customAttributes', newAttributes);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Custom Attributes</h2>
      
      <p className="text-sm text-gray-600">
        Add custom attributes to provide additional product information (e.g., material, color, size).
      </p>

      {/* Attribute list */}
      {attributes.length > 0 && (
        <div className="mt-4 border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attributes.map((attribute, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {attribute.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attribute.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => handleRemoveAttribute(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add new attribute form */}
      <div className="mt-4 border rounded-md p-4 bg-gray-50">
        <h3 className="text-base font-medium text-gray-900 mb-3">Add New Attribute</h3>
        
        {attributeError && (
          <div className="mb-3 text-sm text-red-600">
            {attributeError}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="attribute-name" className="block text-sm font-medium text-gray-700">
              Attribute Name
            </label>
            <input
              type="text"
              id="attribute-name"
              value={newAttributeName}
              onChange={(e) => setNewAttributeName(e.target.value)}
              placeholder="e.g., Color, Material, Size"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="attribute-value" className="block text-sm font-medium text-gray-700">
              Attribute Value
            </label>
            <input
              type="text"
              id="attribute-value"
              value={newAttributeValue}
              onChange={(e) => setNewAttributeValue(e.target.value)}
              placeholder="e.g., Red, Cotton, XL"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleAddAttribute}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Attribute
          </button>
        </div>
      </div>
    </div>
  );
} 