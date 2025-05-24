import React from 'react';

interface SellerStatusBadgeProps {
  status: 'Active' | 'Inactive';
}

export default function SellerStatusBadge({ status }: SellerStatusBadgeProps) {
  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${status === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'}
      `}
    >
      {status}
    </span>
  );
} 