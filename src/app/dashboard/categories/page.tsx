'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Category, 
  getAllCategories, 
  deleteCategory, 
  updateCategoryStatus 
} from '@/lib/services/category-service';
import { isDbConnected } from '@/lib/cassandra';
import CategoryAddModal from '@/components/categories/CategoryAddModal';
import CategoryEditModal from '@/components/categories/CategoryEditModal';
import CategoryTable from '@/components/categories/CategoryTable';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { toast } from 'sonner';

export default function CategoriesPage() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      setError(null);
      try {
        console.log('Database connected status:', isDbConnected());
        // Use direct service call instead of API route
        const categoriesList = await getAllCategories();
        console.log('Fetched categories:', categoriesList);
        setCategories(categoriesList);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again.');
        toast.error('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  // Handle category creation
  const handleCategoryAdded = (newCategory: Category) => {
    setCategories(prev => [...prev, newCategory]);
    setIsAddModalOpen(false);
    toast.success('Category added successfully');
    router.refresh(); // Refresh the page to update the data
  };

  // Handle category update
  const handleCategoryUpdated = (updatedCategory: Category) => {
    setCategories(prev => 
      prev.map(c => c.id === updatedCategory.id ? updatedCategory : c)
    );
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
    toast.success('Category updated successfully');
  };

  // Handle edit click
  const handleEditClick = (category: Category) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: 'Active' | 'Inactive') => {
    try {
      // Use direct service call instead of API route
      const updatedCategory = await updateCategoryStatus(id, newStatus);
      
      if (updatedCategory) {
        // Update the categories list with the updated category
        setCategories(prev => 
          prev.map(c => c.id === id ? updatedCategory : c)
        );
        
        toast.success(`Category status updated to ${newStatus}`);
      } else {
        toast.error('Category not found');
      }
    } catch (err) {
      console.error('Error updating category status:', err);
      toast.error('Failed to update category status');
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  // Handle actual deletion
  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    
    setIsDeleting(true);
    try {
      console.log('Deleting category with ID:', categoryToDelete.id);
      
      // Use direct service call instead of API route
      const success = await deleteCategory(categoryToDelete.id);
      
      console.log('Delete operation result:', success);
      
      if (success) {
        // Remove the deleted category from the list
        setCategories(prev => 
          prev.filter(c => c.id !== categoryToDelete.id)
        );
        
        toast.success('Category deleted successfully');
      } else {
        toast.error('Category not found or could not be deleted');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Failed to delete category');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <DashboardShell>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all product categories available on the platform.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>+</span>
              Add Category
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <CategoryTable 
          categories={categories}
          isLoading={isLoading}
          onStatusUpdate={handleStatusUpdate}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />
      </div>
      
      {/* Add Category Modal */}
      <CategoryAddModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCategoryAdded={handleCategoryAdded}
      />
      
      {/* Edit Category Modal */}
      <CategoryEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCategoryToEdit(null);
        }}
        category={categoryToEdit}
        onCategoryUpdated={handleCategoryUpdated}
      />
      
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete the category "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </DashboardShell>
  );
} 