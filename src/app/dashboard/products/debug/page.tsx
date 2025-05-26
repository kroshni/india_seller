'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/cassandra';
import { debugProducts, getProductById } from '@/lib/services/product-service';
import Link from 'next/link';

export default function DebugProductsPage() {
  const [stats, setStats] = useState<any>(null);
  const [mockProducts, setMockProducts] = useState<Product[]>([]);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDebugData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get debug stats
        const debugStats = await debugProducts();
        setStats(debugStats);

        // Load mock products directly
        if (typeof window !== 'undefined') {
          // Load from localStorage in the browser
          const localStorageKey = 'india_seller_products';
          const data = localStorage.getItem(localStorageKey);
          if (data) {
            const products = JSON.parse(data) as Product[];
            setLocalProducts(products);
          }
        }
      } catch (err) {
        console.error('Error loading debug data:', err);
        setError('Failed to load debug data. Check console for details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDebugData();
  }, []);

  // Function to reset localStorage
  const resetLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const localStorageKey = 'india_seller_products';
      localStorage.removeItem(localStorageKey);
      window.location.reload(); // Reload the page
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading debug data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Product Debug Page</h1>
        <p className="mt-1 text-sm text-gray-600">
          This page shows details about the product data in the system.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <Link
          href="/dashboard/products"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Products
        </Link>
        <button
          onClick={resetLocalStorage}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Reset localStorage
        </button>
      </div>

      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Product Stats</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(stats, null, 2)}
        </pre>
      </div>

      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Products in localStorage</h2>
        {localProducts.length === 0 ? (
          <p className="text-gray-500">No products found in localStorage.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {localProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className="font-mono text-xs">{product.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/dashboard/products/view/${product.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 