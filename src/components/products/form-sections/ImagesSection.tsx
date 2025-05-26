'use client';

import { useState } from 'react';
import { ProductCreateInput } from '@/lib/cassandra';

interface ImagesSectionProps {
  values: Partial<ProductCreateInput>;
  onChange: (field: keyof ProductCreateInput, value: any) => void;
  errors: Record<string, string>;
}

export default function ImagesSection({
  values,
  onChange,
  errors
}: ImagesSectionProps) {
  // Local state for new image URL input
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imageError, setImageError] = useState<string | null>(null);

  // Get current gallery images or empty array
  const galleryImages = values.galleryImages || [];

  // Add a new gallery image
  const handleAddGalleryImage = () => {
    // Validate
    if (!newImageUrl.trim()) {
      setImageError('Image URL cannot be empty');
      return;
    }

    // Basic URL validation
    try {
      new URL(newImageUrl);
    } catch (e) {
      setImageError('Please enter a valid URL');
      return;
    }

    // Check for duplicate
    if (galleryImages.includes(newImageUrl)) {
      setImageError('This image URL is already in the gallery');
      return;
    }

    // Clear any previous error
    setImageError(null);

    // Add the new image
    const newGalleryImages = [...galleryImages, newImageUrl];
    
    // Update parent form
    onChange('galleryImages', newGalleryImages);
    
    // Clear input
    setNewImageUrl('');
  };

  // Remove a gallery image
  const handleRemoveGalleryImage = (index: number) => {
    const newGalleryImages = [...galleryImages];
    newGalleryImages.splice(index, 1);
    onChange('galleryImages', newGalleryImages);
  };

  // Set main image from gallery
  const handleSetAsMain = (url: string) => {
    onChange('mainImage', url);
  };

  // Handle main image change
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('mainImage', e.target.value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Product Images</h2>
      
      {/* Main Image */}
      <div>
        <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">
          Main Product Image
        </label>
        <input
          type="text"
          id="mainImage"
          value={values.mainImage || ''}
          onChange={handleMainImageChange}
          placeholder="https://example.com/image.jpg"
          className={`mt-1 block w-full border ${
            errors.mainImage ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />
        {errors.mainImage && (
          <p className="mt-1 text-sm text-red-600">{errors.mainImage}</p>
        )}
        
        {/* Main image preview */}
        {values.mainImage && (
          <div className="mt-2">
            <div className="relative w-40 h-40 border rounded-md overflow-hidden">
              <img
                src={values.mainImage}
                alt="Main product image"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Gallery Images */}
      <div className="mt-6">
        <h3 className="text-base font-medium text-gray-900 mb-3">Gallery Images</h3>
        
        {/* Gallery images grid */}
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {galleryImages.map((imageUrl, index) => (
              <div key={index} className="relative group border rounded-md overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Product gallery image ${index + 1}`}
                  className="w-full h-32 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
                  }}
                />
                
                {/* Image actions overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleSetAsMain(imageUrl)}
                    className="mx-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    Set as Main
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="mx-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add new gallery image */}
        <div className="mt-4 border rounded-md p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Add Gallery Image</h4>
          
          {imageError && (
            <div className="mb-3 text-sm text-red-600">
              {imageError}
            </div>
          )}
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/gallery-image.jpg"
              className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddGalleryImage}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Enter the URL of the image you want to add to the product gallery.
          </p>
        </div>
      </div>
    </div>
  );
} 