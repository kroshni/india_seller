import React, { useState } from 'react';
import CustomerStatusBadge from './CustomerStatusBadge';

interface InlineEditableStatusProps {
  customerId: string;
  initialStatus: 'Active' | 'Inactive';
  onSave: (customerId: string, status: 'Active' | 'Inactive') => Promise<boolean>;
}

const InlineEditableStatus: React.FC<InlineEditableStatusProps> = ({
  customerId,
  initialStatus,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<'Active' | 'Inactive'>(initialStatus);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setStatus(initialStatus);
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const success = await onSave(customerId, status);
      if (success) {
        setIsEditing(false);
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError('An error occurred while updating status');
      console.error('Error saving status:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col space-y-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isSaving}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        
        {error && <p className="text-xs text-red-600">{error}</p>}
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center space-x-2">
      <CustomerStatusBadge status={status} />
      <button
        type="button"
        onClick={handleEdit}
        className="hidden group-hover:inline-flex items-center p-1 text-gray-400 hover:text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
    </div>
  );
};

export default InlineEditableStatus;