'use client';

import { ProductStatus } from '@/lib/cassandra';

interface BulkActionsProps {
  selectedIds: string[];
  onBulkStatusChange: (status: ProductStatus) => void;
  onBulkDelete: () => void;
}

export default function BulkActions({
  selectedIds,
  onBulkStatusChange,
  onBulkDelete
}: BulkActionsProps) {
  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between">
      <div className="text-sm text-blue-800">
        <span className="font-medium">{selectedIds.length}</span> products selected
      </div>
      <div className="flex space-x-3">
        <div>
          <select
            onChange={(e) => onBulkStatusChange(e.target.value as ProductStatus)}
            className="border border-blue-300 rounded px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Change Status</option>
            <option value="Enabled">Enable</option>
            <option value="Disabled">Disable</option>
          </select>
        </div>
        <button
          onClick={onBulkDelete}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
} 