'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductCreateInput, Product } from '@/lib/cassandra';
import { getProductById, updateProduct, isSkuUnique } from '@/lib/services/product-service';
import SimpleProductForm from '@/components/products/SimpleProductForm';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (values: ProductCreateInput) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate SKU uniqueness (only if SKU changed)
      if (values.sku !== product?.sku) {
        const isUnique = await isSkuUnique(values.sku, id);
        if (!isUnique) {
          setError(`The SKU "${values.sku}" is already in use. Please choose a different SKU.`);
          setIsSubmitting(false);
          return;
        }
      }
      
      // Update the product
      const updatedProduct = await updateProduct(id, values);
      
      // Check if update was successful
      if (!updatedProduct) {
        setError('Failed to update product. Please try again.');
        setIsSubmitting(false);
        return;
      }
      
      // Redirect to product list
      router.push('/dashboard/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError('An error occurred while updating the product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product: {product.name}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Update product information using the form below.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-end mb-6">
        <Link
          href="/dashboard/products"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>

      <SimpleProductForm
        initialValues={product}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        buttonText="Update Product"
      />
    </div>
  );
} 