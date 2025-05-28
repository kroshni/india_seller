'use client';

import { useState } from 'react';

interface GalleryImage {
  id?: string;
  imageUrl: string;
  caption: string;
}

interface GalleryUploaderProps {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
}

export default function GalleryUploader({ images = [], onChange }: GalleryUploaderProps) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Add a new image
  const addImage = () => {
    setError(null);
    
    // Validate inputs
    if (!newImageUrl) {
      setError('Please enter an image URL');
      return;
    }
    
    // Create a new image object
    const newImage: GalleryImage = {
      imageUrl: newImageUrl,
      caption: newCaption || '',
    };
    
    // Add to images array
    const updatedImages = [...images, newImage];
    onChange(updatedImages);
    
    // Reset form
    setNewImageUrl('');
    setNewCaption('');
  };
  
  // Remove an image
  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onChange(updatedImages);
  };
  
  return (
    <div>
      {/* Gallery grid */}
      {images.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Gallery Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={image.imageUrl} 
                    alt={image.caption || `Gallery image ${index + 1}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40 rounded-lg">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                {image.caption && (
                  <p className="mt-1 text-sm text-gray-500 truncate">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500 text-sm">No gallery images added yet</p>
        </div>
      )}
      
      {/* Add new image form */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Add New Gallery Image</h3>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Enter URL of the image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caption
            </label>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="Enter a caption for the image (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={addImage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Image
          </button>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        <p>Note: Upload your images to a file hosting service and paste the URL here.</p>
      </div>
    </div>
  );
} 