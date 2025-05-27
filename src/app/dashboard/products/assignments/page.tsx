'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/cassandra';
import { Seller } from '@/lib/services/seller-service';
import { getAllProducts } from '@/lib/services/product-service';
import { getSellers } from '@/lib/api-client/seller-client';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader } from '@/components/ui/Loader';

export default function ProductAssignmentsPage() {
  // State for sellers dropdown
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [selectedSellerId, setSelectedSellerId] = useState<string>('');
  
  // State for unassigned products
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [unassignedProducts, setUnassignedProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch all sellers on mount
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        console.log('Fetching sellers...');
        const response = await getSellers({ limit: 100 });
        console.log('Sellers response:', response);
        console.log('Sellers data array:', response.data);
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };
    
    fetchSellers();
  }, []);
  
  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching all products');
        const response = await getAllProducts();
        setAllProducts(response.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // When seller changes, fetch unassigned products
  useEffect(() => {
    if (selectedSellerId && allProducts.length > 0) {
      fetchUnassignedProducts();
    }
  }, [selectedSellerId, allProducts]);
  
  // Fetch unassigned products
  const fetchUnassignedProducts = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching unassigned products...');
      
      // Get assigned product IDs for all sellers except the current one
      const response = await fetch(`/api/products/unassigned`);
      const data = await response.json();
      
      // Filter products to get unassigned ones
      const unassigned = allProducts.filter(product => 
        !data.productIds.includes(product.id)
      );
      
      console.log(`Found ${unassigned.length} unassigned products out of ${allProducts.length} total products`);
      
      setUnassignedProducts(unassigned);
      // Clear previous selections
      setSelectedProductIds([]);
    } catch (error) {
      console.error('Error fetching unassigned products:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle seller selection
  const handleSellerChange = (sellerId: string) => {
    setSelectedSellerId(sellerId);
  };
  
  // Handle product selection
  const handleProductToggle = (productId: string) => {
    console.log('Toggling product:', productId);
    setSelectedProductIds(prevSelected => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };
  
  // Handle select all products
  const handleSelectAllProducts = () => {
    console.log('Select all toggled, current selected:', selectedProductIds.length, 'filtered products:', filteredProducts.length);
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map(product => product.id));
    }
  };
  
  // Handle assigning products to seller
  const handleAssignProducts = async () => {
    if (!selectedSellerId) {
      alert('Please select a seller first');
      return;
    }
    
    if (selectedProductIds.length === 0) {
      alert('Please select at least one product to assign');
      return;
    }
    
    setIsAssigning(true);
    
    try {
      // Call the API to assign products to the selected seller
      const response = await fetch(`/api/sellers/${selectedSellerId}/assign-products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds: selectedProductIds }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to assign products');
      }
      
      // Show success message
      alert(`Successfully assigned ${selectedProductIds.length} products to seller`);
      
      // Clear selections
      setSelectedProductIds([]);
      
      // Refresh unassigned products
      fetchUnassignedProducts();
    } catch (error) {
      console.error('Error assigning products:', error);
      alert('Failed to assign products');
    } finally {
      setIsAssigning(false);
    }
  };
  
  // Filter products based on search query
  const filteredProducts = searchQuery 
    ? unassignedProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : unassignedProducts;
  
  return (
    <DashboardShell>
      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Assign Products to Sellers</CardTitle>
                <CardDescription>
                  Manage product assignments to sellers. Each product can only be assigned to one seller at a time. Products already assigned to other sellers will not appear in the list below.
                </CardDescription>
              </div>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Refresh Data
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Seller selection */}
            <div className="mb-6">
              <Label htmlFor="seller-select" className="block mb-2">
                Select Seller
              </Label>
              <select
                id="seller-select"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={selectedSellerId}
                onChange={(e) => handleSellerChange(e.target.value)}
              >
                <option value="">Select a seller</option>
                {sellers.map(seller => (
                  <option key={seller.id} value={seller.id}>
                    {seller.name} - {seller.email}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Search products */}
            <div className="mb-4">
              <Label htmlFor="search-products" className="block mb-2">
                Search Products
              </Label>
              <input
                id="search-products"
                type="text"
                placeholder="Search by name or SKU"
                className="w-full p-2 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={!selectedSellerId || isLoading}
              />
            </div>
            
            {/* Unassigned products list */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Available Products (Not Assigned to Any Seller)</h3>
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    id="select-all" 
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAllProducts}
                    disabled={!selectedSellerId || isLoading || filteredProducts.length === 0}
                  />
                  <label htmlFor="select-all" className="ml-2 text-sm text-gray-700">
                    Select All
                  </label>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-3">Loading products...</span>
                </div>
              ) : !selectedSellerId ? (
                <div className="p-4 text-center text-gray-500 border border-dashed rounded-md">
                  Please select a seller to view unassigned products
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-4 text-center text-gray-500 border border-dashed rounded-md">
                  {searchQuery ? 'No products match your search' : 'No products available for assignment. Products that are already assigned to other sellers are not shown here.'}
                </div>
              ) : (
                <div className="border rounded-md max-h-96 overflow-y-auto">
                  <ul className="divide-y">
                    {filteredProducts.map(product => (
                      <li key={product.id} className="p-3 hover:bg-gray-50">
                        <div className="flex items-center">
                          <input 
                            type="checkbox"
                            id={`product-${product.id}`}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedProductIds.includes(product.id)}
                            onChange={() => handleProductToggle(product.id)}
                          />
                          <div className="ml-3 flex-1">
                            <label htmlFor={`product-${product.id}`} className="font-medium cursor-pointer">
                              {product.name}
                            </label>
                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ₹{product.salePrice || product.price}
                            </p>
                            {product.salePrice && (
                              <p className="text-sm text-gray-500 line-through">
                                ₹{product.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-2 text-sm text-gray-500">
                {selectedProductIds.length > 0 ? (
                  <span>{selectedProductIds.length} product(s) selected</span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <button
              onClick={handleAssignProducts}
              disabled={!selectedSellerId || selectedProductIds.length === 0 || isAssigning}
              className={`px-4 py-2 rounded-md ${
                !selectedSellerId || selectedProductIds.length === 0 || isAssigning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isAssigning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Assigning Products...
                </>
              ) : (
                'Assign Products to Seller'
              )}
            </button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
} 