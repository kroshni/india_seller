interface CategoryStatusBadgeProps {
  status: 'Active' | 'Inactive';
}

export default function CategoryStatusBadge({ status }: CategoryStatusBadgeProps) {
  let badgeClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  if (status === 'Active') {
    badgeClasses += ' bg-green-100 text-green-800';
  } else {
    badgeClasses += ' bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={badgeClasses}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'Active' ? 'bg-green-600' : 'bg-gray-600'} mr-1.5`}></span>
      {status}
    </span>
  );
} 