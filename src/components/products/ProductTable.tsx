'use client';

import { useState } from 'react';
import { Product, ProductType, ProductStatus } from '@/lib/cassandra';
import Image from 'next/image';

interface ProductTableProps {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onStatusUpdate: (id: string, status: ProductStatus) => Promise<void>;
  onDeleteClick: (product: Product) => void;
  onEditClick: (product: Product) => void;
  onViewClick: (product: Product) => void;
  onSelectionChange: (selectedIds: string[]) => void;
  currentSort: { field: string; order: 'asc' | 'desc' };
}

export default function ProductTable({
  products,
  total,
  page,
  totalPages,
  isLoading,
  onPageChange,
  onSortChange,
  onStatusUpdate,
  onDeleteClick,
  onEditClick,
  onViewClick,
  onSelectionChange,
  currentSort,
}: ProductTableProps) {
  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Handle selection change
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(product => product.id));
    }
    setSelectAll(!selectAll);
    onSelectionChange(selectAll ? [] : products.map(product => product.id));
  };

  // Handle individual selection
  const handleSelectItem = (id: string) => {
    let newSelectedIds: string[];
    
    if (selectedIds.includes(id)) {
      newSelectedIds = selectedIds.filter(selectedId => selectedId !== id);
    } else {
      newSelectedIds = [...selectedIds, id];
    }
    
    setSelectedIds(newSelectedIds);
    
    // If all items are selected, check the "select all" checkbox
    setSelectAll(newSelectedIds.length === products.length);
    
    onSelectionChange(newSelectedIds);
  };

  // Handle sort
  const handleSort = (field: string) => {
    const newOrder = currentSort.field === field && currentSort.order === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newOrder);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="mt-6 animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="h-16 bg-gray-200 rounded mb-2"></div>
        <div className="h-16 bg-gray-200 rounded mb-2"></div>
        <div className="h-16 bg-gray-200 rounded mb-2"></div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th 
                onClick={() => handleSort('name')}
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center">
                  Product
                  {currentSort.field === 'name' && (
                    <span className="ml-1">
                      {currentSort.order === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th 
                onClick={() => handleSort('price')}
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center">
                  Price
                  {currentSort.field === 'price' && (
                    <span className="ml-1">
                      {currentSort.order === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('status')}
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center">
                  Status
                  {currentSort.field === 'status' && (
                    <span className="ml-1">
                      {currentSort.order === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('createdAt')}
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center">
                  Created
                  {currentSort.field === 'createdAt' && (
                    <span className="ml-1">
                      {currentSort.order === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No products found. Create your first product or adjust your filters.
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={() => handleSelectItem(product.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 relative bg-gray-100 rounded">
                      {product.mainImage ? (
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="h-12 w-12 object-contain rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded">
                          No image
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.type}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.sku}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(product.price)}</div>
                    {product.salePrice && (
                      <div className="text-xs text-red-600">{formatCurrency(product.salePrice)}</div>
                    )}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.status === 'Enabled' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(product.createdAt)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onViewClick(product)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View product details"
                      >
                        View
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => onEditClick(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit product"
                      >
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => onStatusUpdate(
                          product.id, 
                          product.status === 'Enabled' ? 'Disabled' : 'Enabled'
                        )}
                        className="text-blue-600 hover:text-blue-900"
                        title={`Set status to ${product.status === 'Enabled' ? 'Disabled' : 'Enabled'}`}
                      >
                        {product.status === 'Enabled' ? 'Disable' : 'Enable'}
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => onDeleteClick(product)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete product"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{((page - 1) * 10) + 1}</span> to <span className="font-medium">{Math.min(page * 10, total)}</span> of{' '}
            <span className="font-medium">{total}</span> products
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    page === pageNum
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  } text-sm font-medium rounded-md`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 