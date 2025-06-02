import React from 'react';

interface CustomerStatusBadgeProps {
  status: 'Active' | 'Inactive';
}

const CustomerStatusBadge: React.FC<CustomerStatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
};

export default CustomerStatusBadge;