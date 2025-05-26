'use client';

import { useState } from 'react';
import { updateCategoryStatus } from '@/lib/api-client/category-client';
import CategoryStatusBadge from './CategoryStatusBadge';

interface CategoryStatusToggleProps {
  id: string;
  initialStatus: 'Active' | 'Inactive';
  onStatusChange: (id: string, newStatus: 'Active' | 'Inactive') => void;
}

export default function CategoryStatusToggle({
  id,
  initialStatus,
  onStatusChange
}: CategoryStatusToggleProps) {
  const [status, setStatus] = useState<'Active' | 'Inactive'>(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleToggle = async () => {
    setIsUpdating(true);
    setError(null);
    
    const newStatus = status === 'Active' ? 'Inactive' : 'Active';
    
    try {
      const { category } = await updateCategoryStatus(id, newStatus);
      
      if (category) {
        setStatus(newStatus);
        onStatusChange(id, newStatus);
      } else {
        setError('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating category status:', error);
      setError('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        disabled={isUpdating}
        className="focus:outline-none"
        aria-label={`Toggle status to ${status === 'Active' ? 'Inactive' : 'Active'}`}
      >
        {isUpdating ? (
          <div className="flex items-center">
            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-blue-600 border-r-transparent"></div>
            <CategoryStatusBadge status={status} />
          </div>
        ) : (
          <CategoryStatusBadge status={status} />
        )}
      </button>
      
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-600">
          {error}
        </div>
      )}
    </div>
  );
} 