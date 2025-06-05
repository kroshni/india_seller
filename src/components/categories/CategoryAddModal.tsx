'use client';

import { useState } from 'react';
import { Category, createCategory } from '@/lib/services/category-service';
import { Button } from '@/components/ui/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { isDbConnected } from '@/lib/cassandra';

interface CategoryAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (category: Category) => void;
}

export default function CategoryAddModal({
  isOpen,
  onClose,
  onCategoryAdded
}: CategoryAddModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      console.log('Submitting category:', { name, slug, description, status });
      console.log('Database connected:', isDbConnected());
      
      // Use direct service call instead of API route
      const newCategory = await createCategory({
        name,
        slug: slug || '',
        description,
        status,
      });
      
      console.log('New category created:', newCategory);
      
      onCategoryAdded(newCategory);
      
      // Reset form
      setName('');
      setSlug('');
      setDescription('');
      setStatus('Active');
    } catch (err) {
      console.error('Error creating category:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    
    // Auto-generate slug if user hasn't manually entered one
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(newName));
    }
  };

  // Helper to generate slug
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Simple modal with minimal styling
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        width: '100%',
        maxWidth: '32rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Add New Category</h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ 
              backgroundColor: '#FEE2E2', 
              padding: '0.75rem', 
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              color: '#B91C1C'
            }}>
              Error: {error}
            </div>
          )}
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium' }}>
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #D1D5DB', 
                borderRadius: '0.375rem' 
              }}
              placeholder="Category name"
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium' }}>
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #D1D5DB', 
                borderRadius: '0.375rem' 
              }}
              placeholder="category-slug"
            />
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
              URL-friendly version of the name. Leave empty for auto-generation.
            </p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium' }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #D1D5DB', 
                borderRadius: '0.375rem' 
              }}
              placeholder="Category description"
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium' }}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #D1D5DB', 
                borderRadius: '0.375rem' 
              }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: 'white',
                border: '1px solid #D1D5DB',
                borderRadius: '0.375rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}