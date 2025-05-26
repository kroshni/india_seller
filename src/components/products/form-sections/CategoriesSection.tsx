'use client';

import { useState, useEffect } from 'react';
import { ProductCreateInput } from '@/lib/cassandra';
import { getAllCategories } from '@/lib/services/category-service';
import { getAllBrands } from '@/lib/services/brand-service';

interface CategoriesSectionProps {
  values: Partial<ProductCreateInput>;
  onChange: (field: keyof ProductCreateInput, value: any) => void;
  errors: Record<string, string>;
}

export default function CategoriesSection({
  values,
  onChange,
  errors
}: CategoriesSectionProps) {
  // State for categories and brands data
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // State for selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>(values.categoryIds || []);
  
  // Get current tag input state
  const [tagInput, setTagInput] = useState('');

  // Load categories and brands on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setLoadError(null);
      
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
        console.error('Error loading categories and brands:', error);
        setLoadError('Failed to load categories and brands. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    let newSelectedCategories: string[];
    
    if (categoryId === '') {
      return; // Skip if "Select a category" is chosen
    }
    
    // Add to selected categories if not already selected
    if (!selectedCategories.includes(categoryId)) {
      newSelectedCategories = [...selectedCategories, categoryId];
      setSelectedCategories(newSelectedCategories);
      onChange('categoryIds', newSelectedCategories);
    }
  };

  // Handle removing a category
  const handleRemoveCategory = (categoryId: string) => {
    const newSelectedCategories = selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(newSelectedCategories);
    onChange('categoryIds', newSelectedCategories);
  };

  // Handle brand selection
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange('brandId', e.target.value === '' ? undefined : e.target.value);
  };

  // Handle adding a tag
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    const newTag = tagInput.trim();
    const currentTags = values.tags || [];
    
    // Check if tag already exists
    if (!currentTags.includes(newTag)) {
      const newTags = [...currentTags, newTag];
      onChange('tags', newTags);
    }
    
    setTagInput('');
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    const currentTags = values.tags || [];
    const newTags = currentTags.filter(t => t !== tag);
    onChange('tags', newTags);
  };

  // Handle pressing Enter in tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Categories & Brands</h2>
      
      {loadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {loadError}
        </div>
      )}
      
      {/* Categories */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categories
        </label>
        <div className="mt-1">
          <select
            id="category"
            onChange={handleCategoryChange}
            value=""
            className={`block w-full border ${
              errors.categoryIds ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            disabled={isLoading}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option 
                key={category.id} 
                value={category.id}
                disabled={selectedCategories.includes(category.id)}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {errors.categoryIds && (
          <p className="mt-1 text-sm text-red-600">{errors.categoryIds}</p>
        )}
        
        {/* Selected categories */}
        {selectedCategories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedCategories.map(categoryId => {
              const category = categories.find(c => c.id === categoryId);
              return (
                <div 
                  key={categoryId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {category ? category.name : 'Unknown Category'}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(categoryId)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Brand */}
      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
          Brand
        </label>
        <select
          id="brand"
          value={values.brandId || ''}
          onChange={handleBrandChange}
          className={`mt-1 block w-full border ${
            errors.brandId ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          disabled={isLoading}
        >
          <option value="">Select a brand (optional)</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        {errors.brandId && (
          <p className="mt-1 text-sm text-red-600">{errors.brandId}</p>
        )}
      </div>
      
      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <div className="mt-1 flex space-x-2">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Enter a tag and press Enter"
            className={`block w-full border ${
              errors.tags ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {errors.tags && (
          <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Tags help customers find your product. Separate with Enter.
        </p>
        
        {/* Tag list */}
        {(values.tags?.length || 0) > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {values.tags?.map((tag, index) => (
              <div 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 