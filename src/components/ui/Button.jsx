export function Button({ className = '', children, ...props }) {
  const buttonClasses = `inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`;
  
  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
} 