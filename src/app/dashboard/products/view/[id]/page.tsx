'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/cassandra';
import { getProductById } from '@/lib/services/product-service';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ViewProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const productData = await getProductById(id);
        if (!productData) {
          setError('Product not found');
          return;
        }
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Product not found'}
        </div>
        <Link
          href="/dashboard/products"
          className="text-blue-600 hover:text-blue-800"
        >
          &larr; Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex space-x-2">
          <Link
            href={`/dashboard/products/edit/${product.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Product
          </Link>
          <Link
            href="/dashboard/products"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Back to Products
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        {/* Product header */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
              {product.mainImage ? (
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="h-16 w-16 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                  }}
                />
              ) : (
                <div className="h-16 w-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                  No image
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {product.name}
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </h3>
              <p className="text-sm text-gray-500">
                SKU: {product.sku} | Type: {product.type}
              </p>
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {/* Basic Info */}
            <div className="sm:col-span-2">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h4>
              <div className="border-t border-gray-200 pt-3 grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Product Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.name}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">SKU</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.sku}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.type}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.status}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Visibility</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.visibility}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(product.createdAt)}</dd>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{product.description}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Short Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.shortDescription}</dd>
            </div>

            {/* Pricing */}
            <div className="sm:col-span-2">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Pricing</h4>
              <div className="border-t border-gray-200 pt-3 grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Regular Price</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatCurrency(product.price)}</dd>
                </div>

                {product.salePrice && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Sale Price</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(product.salePrice)}</dd>
                  </div>
                )}

                {product.saleStartDate && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Sale Start Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(product.saleStartDate)}</dd>
                  </div>
                )}

                {product.saleEndDate && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Sale End Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(product.saleEndDate)}</dd>
                  </div>
                )}
              </div>
            </div>

            {/* Inventory */}
            <div className="sm:col-span-2">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Inventory</h4>
              <div className="border-t border-gray-200 pt-3 grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Stock Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.stockStatus}</dd>
                </div>

                {product.manageStock && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Stock Quantity</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.stockQuantity}</dd>
                  </div>
                )}

                {product.weight && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Weight</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.weight} kg</dd>
                  </div>
                )}

                {product.dimensions && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Dimensions (L × W × H)</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                    </dd>
                  </div>
                )}
              </div>
            </div>

            {/* Images */}
            {(product.mainImage || (product.galleryImages && product.galleryImages.length > 0)) && (
              <div className="sm:col-span-2">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Images</h4>
                <div className="border-t border-gray-200 pt-3">
                  {product.mainImage && (
                    <div className="mb-4">
                      <dt className="text-sm font-medium text-gray-500 mb-2">Main Image</dt>
                      <dd className="mt-1">
                        <div className="w-40 h-40 border rounded-md overflow-hidden">
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
                            }}
                          />
                        </div>
                      </dd>
                    </div>
                  )}

                  {product.galleryImages && product.galleryImages.length > 0 && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-2">Gallery Images</dt>
                      <dd className="mt-1">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {product.galleryImages.map((imageUrl, index) => (
                            <div key={index} className="border rounded-md overflow-hidden">
                              <img
                                src={imageUrl}
                                alt={`${product.name} gallery image ${index + 1}`}
                                className="w-full h-32 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </dd>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Custom Attributes */}
            {product.customAttributes && product.customAttributes.length > 0 && (
              <div className="sm:col-span-2">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Attributes</h4>
                <div className="border-t border-gray-200 pt-3">
                  <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                    {product.customAttributes.map((attr, index) => (
                      <div key={index}>
                        <dt className="text-sm font-medium text-gray-500">{attr.name}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{attr.value}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
} 