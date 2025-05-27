'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Product } from '@/lib/cassandra';
import { getAllProducts } from '@/lib/services/product-service';
import { getSellerProductAssignments, updateSellerProductAssignments } from '@/lib/api-client/seller-client';
import { toast } from 'sonner';

interface ProductAssignmentFormProps {
  sellerId: string;
  standalone?: boolean; // Whether this component is used standalone or inside another form
}

export default function ProductAssignmentForm({ 
  sellerId, 
  standalone = false 
}: ProductAssignmentFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const previousSelections = useRef<string[]>([]);
  const selectionCount = useRef(0);
  
  // Fetch all products and currently assigned products
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all products
        const productsResponse = await getAllProducts({ limit: 100 });
        console.log(`Loaded ${productsResponse.products.length} products from service`);
        
        // Check UUID format of products
        const validUuids = productsResponse.products.filter(p => {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          return uuidRegex.test(p.id);
        });
        
        console.log(`Found ${validUuids.length} products with valid UUIDs`);
        
        if (validUuids.length !== productsResponse.products.length) {
          console.warn(`${productsResponse.products.length - validUuids.length} products have invalid UUID format`);
          // Print the first few invalid IDs
          const invalidProducts = productsResponse.products.filter(p => {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return !uuidRegex.test(p.id);
          });
          console.warn('Sample invalid product IDs:', invalidProducts.slice(0, 3).map(p => p.id));
        }
        
        setProducts(productsResponse.products);
        
        // Fetch assigned products
        const assignedProductIds = await getSellerProductAssignments(sellerId);
        console.log(`Fetched ${assignedProductIds.length} assigned product IDs:`, assignedProductIds);
        
        // Set the selectedProducts state with the fetched data
        console.log('Setting initial selected products state:', assignedProductIds);
        setSelectedProducts(assignedProductIds);
        previousSelections.current = [...assignedProductIds];
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load products data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [sellerId]);
  
  // Debug log when selectedProducts changes
  useEffect(() => {
    selectionCount.current += 1;
    console.log(`SELECTION UPDATE #${selectionCount.current} - Products selected: ${selectedProducts.length}`);
    console.log('Previous selections:', previousSelections.current);
    console.log('Current selections:', selectedProducts);
    
    // Check what products were added or removed
    const added = selectedProducts.filter(id => !previousSelections.current.includes(id));
    const removed = previousSelections.current.filter(id => !selectedProducts.includes(id));
    
    if (added.length > 0) {
      console.log('Products added:', added);
    }
    
    if (removed.length > 0) {
      console.log('Products removed:', removed);
    }
    
    // Update the previous selections reference
    previousSelections.current = [...selectedProducts];
  }, [selectedProducts]);
  
  // Handle product selection
  const handleProductToggle = (productId: string) => {
    console.log(`Toggling product selection: ${productId}`);
    
    // Create a new array for the updated selections
    let newSelectedProducts;
    
    if (selectedProducts.includes(productId)) {
      console.log(`Removing product ${productId} from selection`);
      newSelectedProducts = selectedProducts.filter(id => id !== productId);
    } else {
      console.log(`Adding product ${productId} to selection`);
      newSelectedProducts = [...selectedProducts, productId];
    }
    
    console.log(`New selected products (${newSelectedProducts.length}):`, newSelectedProducts);
    
    // Set the state with the new array
    setSelectedProducts([...newSelectedProducts]);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      console.log(`Submitting ${selectedProducts.length} products for seller ${sellerId}`);
      console.log('Selected product IDs for submission:', selectedProducts);
      
      // Check products array
      if (!Array.isArray(selectedProducts)) {
        throw new Error('Selected products is not an array');
      }
      
      if (selectedProducts.length === 0) {
        console.warn('No products selected for submission');
      }
      
      // Ensure all product IDs are valid UUIDs
      const validProducts = [];
      const invalidProducts = [];
      
      for (const id of selectedProducts) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(id)) {
          validProducts.push(id);
        } else {
          invalidProducts.push(id);
        }
      }
      
      if (invalidProducts.length > 0) {
        console.warn('Products with invalid UUID format will not be saved:', invalidProducts);
        
        // If we're losing products due to filtering, show a warning
        toast.warning(`${invalidProducts.length} products have invalid format and can't be saved to the database. Valid: ${validProducts.length}/${selectedProducts.length}`);
      }
      
      console.log(`Sending ${validProducts.length} valid product IDs to API:`, validProducts);
      
      // Make sure we're actually sending products
      if (validProducts.length === 0 && selectedProducts.length > 0) {
        toast.error('None of the selected products have valid UUIDs. Cannot save assignments.');
        return;
      }
      
      // Call the API to update product assignments
      const result = await updateSellerProductAssignments(sellerId, validProducts);
      console.log('API response success:', result);
      toast.success('Product assignments updated successfully');
      
      // Don't refresh - keep the user's selections
    } catch (error) {
      console.error('Error saving product assignments:', error);
      toast.error(`Failed to update product assignments: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Debug selected products list
  const debugSelectedProductsList = () => {
    if (selectedProducts.length === 0) {
      return <div className="text-red-500">No products selected</div>;
    }
    
    return (
      <div className="text-xs overflow-x-auto">
        <div className="font-bold mb-1">Selected Products ({selectedProducts.length}):</div>
        <ul className="list-disc pl-5">
          {selectedProducts.map((id, index) => (
            <li key={index} className="mb-1">
              {id}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  // Filter products based on search query
  const filteredProducts = searchQuery
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;
  
  // Debug products list
  const debugProductsList = () => {
    if (products.length === 0) {
      return <div className="text-red-500">No products loaded</div>;
    }
    
    return (
      <div className="text-xs bg-gray-100 p-2 rounded mb-4">
        <h3 className="font-bold mb-1">Debug: Products</h3>
        <p>Total products loaded: {products.length}</p>
        <p>Products with valid UUIDs: {
          products.filter(p => {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return uuidRegex.test(p.id);
          }).length
        }</p>
        <p>Products with invalid UUIDs: {
          products.filter(p => {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return !uuidRegex.test(p.id);
          }).length
        }</p>
        <div className="mt-2">
          <p className="font-bold">Sample Product IDs:</p>
          <ul className="list-disc pl-5">
            {products.slice(0, 3).map((product, index) => (
              <li key={index}>{product.id} - {product.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  // Form content to avoid duplication
  const formContent = (
    <>
      {/* Search input */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search Products
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or SKU"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Selected count and debug info */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 font-bold">
          {selectedProducts.length} products selected
        </div>
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          {debugSelectedProductsList()}
        </div>
      </div>
      
      {/* Products list */}
      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md mb-4">
        {filteredProducts.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredProducts.map(product => {
              const isSelected = selectedProducts.includes(product.id);
              
              return (
                <li key={product.id} className="p-3 hover:bg-gray-50">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleProductToggle(product.id)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        SKU: {product.sku} 
                        {isSelected && <span className="ml-2 text-green-600 font-bold">(Selected)</span>}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ₹{product.salePrice || product.price}
                      </p>
                      {product.salePrice && (
                        <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
                      )}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            {searchQuery ? 'No products match your search' : 'No products available'}
          </div>
        )}
      </div>
      
      {/* Save button */}
      <div className="flex justify-end">
        <button
          type={standalone ? "submit" : "button"}
          onClick={standalone ? undefined : handleSubmit}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Product Assignments'}
        </button>
      </div>
    </>
  );
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Assign Products</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3">Loading products...</span>
        </div>
      ) : (
        standalone ? (
          <form onSubmit={handleSubmit}>
            {formContent}
          </form>
        ) : (
          <div>
            {formContent}
          </div>
        )
      )}
      
      {debugProductsList()}
    </div>
  );
} 