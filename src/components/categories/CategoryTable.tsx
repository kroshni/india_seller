'use client';

import { useState } from 'react';
import { Category } from '@/lib/services/category-service';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  onStatusUpdate: (id: string, status: 'Active' | 'Inactive') => void;
  onDeleteClick: (category: Category) => void;
  onEditClick: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  isLoading,
  onStatusUpdate,
  onDeleteClick,
  onEditClick
}: CategoryTableProps) {
  const [sortField, setSortField] = useState<keyof Category>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Handle sorting
  const handleSort = (field: keyof Category) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort the categories
  const sortedCategories = [...categories].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA === fieldB) return 0;
    
    // Handle different types of fields
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc' 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    } else {
      // Fallback for other types or dates
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });

  // Format date in a user-friendly way
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render sort indicator
  const renderSortIndicator = (field: keyof Category) => {
    if (field !== sortField) return null;
    
    return (
      <span className="ml-1 text-gray-500">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Handle status toggle
  const handleStatusToggle = (id: string, currentStatus: 'Active' | 'Inactive') => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    onStatusUpdate(id, newStatus);
  };

  if (isLoading) {
    return (
      <div className="mt-6 flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="ml-2 text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-gray-200 bg-white py-12 text-center">
        <p className="text-gray-500">No categories found. Add your first category to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort('name')}
              >
                <div className="flex cursor-pointer items-center">
                  Name {renderSortIndicator('name')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Slug
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort('productCount')}
              >
                <div className="flex cursor-pointer items-center">
                  Products {renderSortIndicator('productCount')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort('status')}
              >
                <div className="flex cursor-pointer items-center">
                  Status {renderSortIndicator('status')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                onClick={() => handleSort('updatedAt')}
              >
                <div className="flex cursor-pointer items-center">
                  Updated {renderSortIndicator('updatedAt')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {category.slug}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">
                    {category.description || <em className="text-gray-400">No description</em>}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {category.productCount}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <button
                    onClick={() => handleStatusToggle(category.id, category.status)}
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      category.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {category.status}
                  </button>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {formatDate(category.updatedAt)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEditClick(category)}
                      className="rounded p-1 text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                    >
                      <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Edit {category.name}</span>
                    </button>
                    <button
                      onClick={() => onDeleteClick(category)}
                      className="rounded p-1 text-red-600 hover:bg-red-100 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Delete {category.name}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 