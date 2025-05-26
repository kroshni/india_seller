'use client';

import { useState, useEffect } from 'react';
import { Brand, updateBrand } from '@/lib/services/brand-service';
import { isDbConnected } from '@/lib/cassandra';

interface BrandEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand | null;
  onBrandUpdated: (updatedBrand: Brand) => void;
}

export default function BrandEditModal({
  isOpen,
  onClose,
  brand,
  onBrandUpdated
}: BrandEditModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load brand data when the modal opens or brand changes
  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setSlug(brand.slug);
      setLogo(brand.logo || '');
      setStatus(brand.status);
    }
  }, [brand]);

  if (!isOpen || !brand) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      console.log('Updating brand:', { id: brand.id, name, slug, logo, status });
      console.log('Database connected:', isDbConnected());
      
      // Use direct service call instead of API route
      const updatedBrand = await updateBrand(brand.id, {
        name,
        slug: slug || undefined, // Allow the service to generate a slug if empty
        logo,
        status,
      });
      
      if (!updatedBrand) {
        throw new Error('Failed to update brand - not found');
      }
      
      console.log('Brand updated:', updatedBrand);
      
      onBrandUpdated(updatedBrand);
      onClose();
    } catch (err) {
      console.error('Error updating brand:', err);
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
    if (!slug || slug === generateSlug(brand.name)) {
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
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Edit Brand</h3>
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
              placeholder="Brand name"
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
              placeholder="brand-slug"
            />
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
              URL-friendly version of the name. Leave empty for auto-generation.
            </p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'medium' }}>
              Logo URL
            </label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #D1D5DB', 
                borderRadius: '0.375rem' 
              }}
              placeholder="https://example.com/logo.png"
            />
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
              URL to the brand's logo image (optional)
            </p>
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 