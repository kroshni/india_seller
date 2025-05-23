'use client';

import { useState } from 'react';

interface ProductCategoryFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function ProductCategoryForm({
  formData,
  updateFormData,
  onBack,
  onNext,
}: ProductCategoryFormProps) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing & Apparel' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'toys', name: 'Toys & Games' },
    { id: 'books', name: 'Books & Stationery' },
    { id: 'sports', name: 'Sports & Outdoors' },
    { id: 'grocery', name: 'Grocery & Gourmet' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'jewelry', name: 'Jewelry & Watches' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'other', name: 'Other' },
  ];
  
  const addProduct = () => {
    const newErrors: Record<string, string> = {};
    
    if (!productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!category) {
      newErrors.category = 'Category is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add the new product to the products array
    const updatedProducts = [
      ...formData.products,
      {
        productName,
        category,
      },
    ];
    
    updateFormData({ products: updatedProducts });
    
    // Reset the form
    setProductName('');
    setCategory('');
    setErrors({});
  };
  
  const removeProduct = (index: number) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    updateFormData({ products: updatedProducts });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.products.length === 0) {
      setErrors({ form: 'Please add at least one product category' });
      return;
    }
    
    onNext();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Add Product Categories</h3>
          <p className="mt-1 text-sm text-gray-600">
            Specify the types of products the seller will be offering
          </p>
        </div>
        
        {errors.form && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {errors.form}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                if (errors.productName) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.productName;
                    return newErrors;
                  });
                }
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.productName ? 'border-red-300' : 'border-gray-300'
              } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="e.g., Smartphones, T-shirts, Books"
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (errors.category) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.category;
                    return newErrors;
                  });
                }
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
        </div>
        
        <div>
          <button
            type="button"
            onClick={addProduct}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Product
          </button>
        </div>
        
        {formData.products.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Added Products</h4>
            <ul className="border rounded-md divide-y">
              {formData.products.map((product: any, index: number) => (
                <li key={index} className="p-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{product.productName}</span>
                    <span className="ml-2 text-sm text-gray-500">({product.category})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Document Upload
        </button>
      </div>
    </form>
  );
} 