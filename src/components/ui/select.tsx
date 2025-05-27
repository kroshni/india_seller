import React, { SelectHTMLAttributes, forwardRef, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

interface SelectTriggerProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function SelectTrigger({ className = '', children, onClick }: SelectTriggerProps) {
  return (
    <div 
      className={`flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="ml-2"
      >
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </div>
  );
}

export function SelectValue({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <span className={`text-sm ${className}`}>
      {children}
    </span>
  );
}

export function SelectContent({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export function SelectItem({ className = '', children, value, ...props }: { className?: string; children: ReactNode; value: string; [key: string]: any }) {
  return (
    <div 
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
      data-value={value}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectTrigger2({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`flex items-center ${className}`}>
      {children}
    </div>
  );
} 