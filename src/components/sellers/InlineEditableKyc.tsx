import React, { useState } from 'react';
import KycStatusBadge from './KycStatusBadge';

interface InlineEditableKycProps {
  sellerId: string;
  initialValue: 'Verified' | 'Pending';
  onSave: (sellerId: string, newValue: 'Verified' | 'Pending') => Promise<boolean>;
}

export default function InlineEditableKyc({ 
  sellerId, 
  initialValue, 
  onSave 
}: InlineEditableKycProps) {
  const [value, setValue] = useState<'Verified' | 'Pending'>(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };
  
  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
    setError(null);
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      const success = await onSave(sellerId, value);
      
      if (success) {
        setIsEditing(false);
      } else {
        setError('Failed to save');
      }
    } catch (error) {
      setError('An error occurred');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isEditing) {
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setValue('Verified')}
            className={`px-2 py-1 text-xs rounded ${
              value === 'Verified' 
              ? 'bg-blue-100 text-blue-800 border border-blue-300' 
              : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setValue('Pending')}
            className={`px-2 py-1 text-xs rounded ${
              value === 'Pending' 
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
              : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}
          >
            Pending
          </button>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
        
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
  
  return (
    <div className="group flex items-center">
      <KycStatusBadge status={value} />
      <button
        onClick={handleEdit}
        className="ml-2 p-1 text-gray-400 rounded hover:text-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>
    </div>
  );
} 