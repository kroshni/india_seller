'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Product, 
  ProductType,
  ProductStatus
} from '@/lib/cassandra';
import { 
  getAllProducts, 
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  bulkUpdateProductStatus
} from '@/lib/services/product-service';
import ProductTable from '@/components/products/ProductTable';
import ProductFilters from '@/components/products/ProductFilters';
import BulkActions from '@/components/products/BulkActions';
import DeleteConfirmationDialog from '@/components/products/DeleteConfirmationDialog';
import Link from 'next/link';

export default function ProductsPage() {
  const router = useRouter();
  
  // State for products
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  
  // Sorting
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Filters
  const [filters, setFilters] = useState<{
    search?: string;
    productType?: ProductType;
    status?: ProductStatus;
    categoryId?: string;
    brandId?: string;
  }>({});
  
  // Delete confirmation
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

  // Load products on component mount and when dependencies change
  useEffect(() => {
    loadProducts();
  }, [page, sortBy, sortOrder, filters]);

  // Function to load products
  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAllProducts({
        page,
        limit: 10,
        search: filters.search,
        sortBy: sortBy as any,
        sortOrder,
        productType: filters.productType,
        status: filters.status,
        categoryId: filters.categoryId,
        brandId: filters.brandId
      });
      
      setProducts(response.products);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      
      // Reset selected IDs when products change
      setSelectedIds([]);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle sort change
  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order);
  };

  // Handle filter change
  const handleFilterChange = (newFilters: {
    search?: string;
    productType?: ProductType;
    status?: ProductStatus;
    categoryId?: string;
    brandId?: string;
  }) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  // Handle selection change
  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  // Handle status update
  const handleStatusUpdate = async (id: string, status: ProductStatus) => {
    try {
      await updateProduct(id, { status });
      setProducts(prev => 
        prev.map(product => 
          product.id === id 
            ? { ...product, status, updatedAt: new Date().toISOString() } 
            : product
        )
      );
    } catch (err) {
      console.error('Error updating product status:', err);
      setError('Failed to update product status. Please try again.');
    }
  };

  // Handle delete click
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  // Handle edit click
  const handleEditClick = (product: Product) => {
    router.push(`/dashboard/products/edit/${product.id}`);
  };

  // Handle view click
  const handleViewClick = (product: Product) => {
    router.push(`/dashboard/products/view/${product.id}`);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const success = await deleteProduct(productToDelete.id);
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
        // If this was the last product on the page and not the first page, go to previous page
        if (products.length === 1 && page > 1) {
          setPage(prev => prev - 1);
        }
      } else {
        setError('Failed to delete product. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Handle bulk status change
  const handleBulkStatusChange = async (status: ProductStatus) => {
    if (selectedIds.length === 0 || !status) return;
    
    try {
      const result = await bulkUpdateProductStatus(selectedIds, status);
      if (result.success) {
        // Update local state
        setProducts(prev => 
          prev.map(product => 
            selectedIds.includes(product.id) 
              ? { ...product, status, updatedAt: new Date().toISOString() } 
              : product
          )
        );
        setSelectedIds([]);
      } else {
        setError(`Failed to update status for ${selectedIds.length} products. Please try again.`);
      }
    } catch (err) {
      console.error('Error bulk updating product status:', err);
      setError('Failed to update product statuses. Please try again.');
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setIsBulkDeleteDialogOpen(true);
  };

  // Confirm bulk delete
  const confirmBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    
    setIsDeleting(true);
    
    try {
      const result = await bulkDeleteProducts(selectedIds);
      if (result.success) {
        // If all products on current page are deleted and not the first page, go to previous page
        if (result.count === products.length && page > 1) {
          setPage(prev => prev - 1);
        } else {
          // Otherwise just refresh the current page
          await loadProducts();
        }
      } else {
        setError(`Failed to delete ${selectedIds.length} products. Please try again.`);
      }
    } catch (err) {
      console.error('Error bulk deleting products:', err);
      setError('Failed to delete products. Please try again.');
    } finally {
      setIsDeleting(false);
      setIsBulkDeleteDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your product inventory, pricing, and details.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
          <Link
            href="/dashboard/products/add-dummy-products"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Dummy Products
          </Link>
          <Link
            href="/dashboard/products/add"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Product
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filters */}
      <ProductFilters 
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedIds={selectedIds}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkDelete={handleBulkDelete}
      />

      {/* Product Table */}
      <ProductTable
        products={products}
        total={total}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        onStatusUpdate={handleStatusUpdate}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onViewClick={handleViewClick}
        onSelectionChange={handleSelectionChange}
        currentSort={{ field: sortBy, order: sortOrder }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Product"
        message={`Are you sure you want to delete the product "${productToDelete?.name}"? This action cannot be undone.`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setProductToDelete(null);
        }}
        isDeleting={isDeleting}
      />

      {/* Bulk Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isBulkDeleteDialogOpen}
        title="Delete Multiple Products"
        message={`Are you sure you want to delete ${selectedIds.length} products? This action cannot be undone.`}
        confirmButtonText="Delete All"
        cancelButtonText="Cancel"
        onConfirm={confirmBulkDelete}
        onCancel={() => setIsBulkDeleteDialogOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
} 