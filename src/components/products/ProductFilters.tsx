'use client';

import { useState, useEffect } from 'react';
import { ProductType, ProductStatus } from '@/lib/cassandra';
import { getAllCategories } from '@/lib/services/category-service';
import { getAllBrands } from '@/lib/services/brand-service';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    search?: string;
    productType?: ProductType;
    status?: ProductStatus;
    categoryId?: string;
    brandId?: string;
  }) => void;
  currentFilters: {
    search?: string;
    productType?: ProductType;
    status?: ProductStatus;
    categoryId?: string;
    brandId?: string;
  };
}

export default function ProductFilters({
  onFilterChange,
  currentFilters
}: ProductFiltersProps) {
  // Local state for filters
  const [search, setSearch] = useState(currentFilters.search || '');
  const [productType, setProductType] = useState<ProductType | ''>((currentFilters.productType as ProductType) || '');
  const [status, setStatus] = useState<ProductStatus | ''>((currentFilters.status as ProductStatus) || '');
  const [categoryId, setCategoryId] = useState(currentFilters.categoryId || '');
  const [brandId, setBrandId] = useState(currentFilters.brandId || '');
  
  // State for options from API
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load categories and brands on component mount
  useEffect(() => {
    const loadFilters = async () => {
      setIsLoading(true);
      try {
        // Load categories
        const categoriesData = await getAllCategories();
        setCategories(
          categoriesData
            .filter(cat => cat.status === 'Active')
            .map(cat => ({ id: cat.id, name: cat.name }))
        );
        
        // Load brands
        const brandsData = await getAllBrands();
        setBrands(
          brandsData
            .filter(brand => brand.status === 'Active')
            .map(brand => ({ id: brand.id, name: brand.name }))
        );
      } catch (error) {
        console.error('Error loading filter options:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFilters();
  }, []);

  // Handle search input changes with debounce
  const handleSearchChange = (value: string) => {
    setSearch(value);
    
    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(() => {
      onFilterChange({
        ...currentFilters,
        search: value,
      });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  // Handle filter changes
  const handleFilterChange = (
    field: 'productType' | 'status' | 'categoryId' | 'brandId',
    value: string
  ) => {
    // Update local state
    switch (field) {
      case 'productType':
        setProductType(value as ProductType | '');
        break;
      case 'status':
        setStatus(value as ProductStatus | '');
        break;
      case 'categoryId':
        setCategoryId(value);
        break;
      case 'brandId':
        setBrandId(value);
        break;
    }
    
    // Update parent component
    onFilterChange({
      ...currentFilters,
      [field]: value || undefined,
    });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearch('');
    setProductType('');
    setStatus('');
    setCategoryId('');
    setBrandId('');
    
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search by name or SKU"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Product Type */}
        <div className="w-full md:w-48">
          <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
            Product Type
          </label>
          <select
            id="productType"
            name="productType"
            value={productType}
            onChange={(e) => handleFilterChange('productType', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            <option value="Simple">Simple</option>
            <option value="Configurable">Configurable</option>
            <option value="Virtual">Virtual</option>
            <option value="Downloadable">Downloadable</option>
            <option value="Grouped">Grouped</option>
            <option value="Bundled">Bundled</option>
          </select>
        </div>
        
        {/* Status */}
        <div className="w-full md:w-36">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
        
        {/* Category */}
        <div className="w-full md:w-48">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={categoryId}
            onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Brand */}
        <div className="w-full md:w-48">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            value={brandId}
            onChange={(e) => handleFilterChange('brandId', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Clear filters button */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleClearFilters}
          className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
} 