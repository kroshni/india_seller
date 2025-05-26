'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductCreateInput, ProductType, ProductStatus, StockStatus, Visibility } from '@/lib/cassandra';
import { createProduct, isSkuUnique } from '@/lib/services/product-service';
import SimpleProductForm from '@/components/products/SimpleProductForm';
import Link from 'next/link';

export default function AddSimpleProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial values for a simple product
  const initialValues: Partial<ProductCreateInput> = {
    type: 'Simple',
    price: 0,
    stockStatus: 'In Stock',
    manageStock: true,
    stockQuantity: 0,
    visibility: 'Both',
    status: 'Disabled',
    categoryIds: [],
    tags: [],
    customAttributes: []
  };

  const handleSubmit = async (values: ProductCreateInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate SKU uniqueness
      const isUnique = await isSkuUnique(values.sku);
      if (!isUnique) {
        setError(`The SKU "${values.sku}" is already in use. Please choose a different SKU.`);
        setIsSubmitting(false);
        return;
      }

      // Create the product
      await createProduct(values);
      
      // Redirect to products page
      router.push('/dashboard/products');
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Simple Product</h1>
        <p className="mt-1 text-sm text-gray-600">
          Create a new simple product with basic information.
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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        buttonText="Create Product"
      />
    </div>
  );
} 