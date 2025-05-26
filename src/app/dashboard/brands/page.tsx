'use client';

import { useState, useEffect } from 'react';
import { 
  Brand, 
  getAllBrands, 
  updateBrandStatus, 
  deleteBrand 
} from '@/lib/services/brand-service';
import BrandTable from '@/components/brands/BrandTable';
import BrandAddModal from '@/components/brands/BrandAddModal';
import BrandEditModal from '@/components/brands/BrandEditModal';
import DeleteConfirmationDialog from '@/components/brands/DeleteConfirmationDialog';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Load brands on component mount
  useEffect(() => {
    loadBrands();
  }, []);

  // Function to load all brands
  const loadBrands = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getAllBrands();
      setBrands(data);
    } catch (err) {
      console.error('Error loading brands:', err);
      setError('Failed to load brands. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle brand added
  const handleBrandAdded = (brand: Brand) => {
    setBrands(prev => [...prev, brand]);
    setIsAddModalOpen(false);
  };

  // Handle brand updated
  const handleBrandUpdated = (updatedBrand: Brand) => {
    setBrands(prev => 
      prev.map(brand => 
        brand.id === updatedBrand.id ? updatedBrand : brand
      )
    );
  };

  // Handle status update
  const handleStatusUpdate = async (id: string, status: 'Active' | 'Inactive') => {
    try {
      const updatedBrand = await updateBrandStatus(id, status);
      if (updatedBrand) {
        handleBrandUpdated(updatedBrand);
      }
    } catch (err) {
      console.error('Error updating brand status:', err);
      setError('Failed to update brand status. Please try again.');
    }
  };

  // Handle delete click
  const handleDeleteClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDeleteDialogOpen(true);
  };

  // Handle edit click
  const handleEditClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsEditModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedBrand) return;

    try {
      const success = await deleteBrand(selectedBrand.id);
      if (success) {
        setBrands(prev => prev.filter(brand => brand.id !== selectedBrand.id));
      } else {
        setError('Failed to delete brand. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting brand:', err);
      setError('Failed to delete brand. Please try again.');
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedBrand(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Brand
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <BrandTable
        brands={brands}
        isLoading={isLoading}
        onStatusUpdate={handleStatusUpdate}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
      />

      <BrandAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onBrandAdded={handleBrandAdded}
      />

      <BrandEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBrand(null);
        }}
        brand={selectedBrand}
        onBrandUpdated={handleBrandUpdated}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Brand"
        message={`Are you sure you want to delete the brand "${selectedBrand?.name}"? This action cannot be undone.`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedBrand(null);
        }}
      />
    </div>
  );
} 