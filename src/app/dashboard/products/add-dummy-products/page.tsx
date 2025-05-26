'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/cassandra';

export default function AddDummyProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalProducts: number;
    addedProducts: number;
  } | null>(null);

  const addDummyProducts = async () => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      // Fetch the dummy products JSON
      const response = await fetch('/dummy-products.json');
      if (!response.ok) {
        throw new Error(`Failed to load dummy products: ${response.status} ${response.statusText}`);
      }
      
      const dummyProducts = await response.json();
      
      // Get existing products from localStorage
      const localStorageKey = 'india_seller_products';
      const existingData = localStorage.getItem(localStorageKey);
      let existingProducts: Product[] = [];
      
      if (existingData) {
        try {
          existingProducts = JSON.parse(existingData);
        } catch (err) {
          console.error('Error parsing existing products:', err);
          throw new Error('Could not parse existing products from localStorage');
        }
      }
      
      // Add dummy products to existing products
      const combinedProducts = [...existingProducts];
      let addedCount = 0;
      
      // Add each dummy product if it doesn't already exist
      dummyProducts.forEach((dummyProduct: Product) => {
        const exists = existingProducts.some(p => p.sku === dummyProduct.sku);
        if (!exists) {
          combinedProducts.push(dummyProduct);
          addedCount++;
        }
      });
      
      // Save back to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(combinedProducts));
      
      // Update stats
      setStats({
        totalProducts: combinedProducts.length,
        addedProducts: addedCount
      });
      
      setIsSuccess(true);
    } catch (err) {
      console.error('Error adding dummy products:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Dummy Products</h1>
        <p className="mt-1 text-sm text-gray-600">
          Use this page to add 15 dummy products with detailed information to your product catalog.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Successfully added dummy products!</p>
          {stats && (
            <p className="mt-2">
              Added {stats.addedProducts} new products. Total products in system: {stats.totalProducts}
            </p>
          )}
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={addDummyProducts}
          disabled={isLoading}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Adding Products...' : 'Add Dummy Products'}
        </button>
        
        <Link
          href="/dashboard/products"
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back to Products
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-2">About the Dummy Products</h2>
        <p className="mb-3">
          This will add 15 realistic products to your catalog with the following details:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
          <li>Various product types (Simple, Configurable, Virtual, etc.)</li>
          <li>Realistic product names, descriptions, and specifications</li>
          <li>Proper pricing including sale prices with dates</li>
          <li>Stock information including quantity and status</li>
          <li>Product dimensions and weight</li>
          <li>Main product image and gallery images</li>
          <li>Category and brand assignments</li>
          <li>Custom attributes specific to product types</li>
          <li>Tags for improved searchability</li>
        </ul>
        <p className="text-gray-700">
          The products cover various categories including Electronics, Clothing, Footwear, and Home & Kitchen items.
        </p>
      </div>
    </div>
  );
} 