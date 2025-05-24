import React from 'react';

interface KycStatusBadgeProps {
  status: 'Verified' | 'Pending';
}

export default function KycStatusBadge({ status }: KycStatusBadgeProps) {
  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${status === 'Verified' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-yellow-100 text-yellow-800'}
      `}
    >
      {status}
    </span>
  );
} 