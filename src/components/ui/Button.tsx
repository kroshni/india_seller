'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    // Base styles
    let buttonClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    // Variant styles
    if (variant === 'primary') {
      buttonClasses += ' bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
    } else if (variant === 'secondary') {
      buttonClasses += ' bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500';
    } else if (variant === 'danger') {
      buttonClasses += ' bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
    } else if (variant === 'outline') {
      buttonClasses += ' bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700';
    } else if (variant === 'ghost') {
      buttonClasses += ' bg-transparent hover:bg-gray-100 text-gray-700';
    } else if (variant === 'link') {
      buttonClasses += ' bg-transparent underline-offset-4 hover:underline text-blue-600 hover:text-blue-800 p-0 h-auto';
    }
    
    // Size styles
    if (size === 'xs') {
      buttonClasses += ' h-8 px-2.5 text-xs';
    } else if (size === 'sm') {
      buttonClasses += ' h-9 px-3';
    } else if (size === 'md') {
      buttonClasses += ' h-10 px-4';
    } else if (size === 'lg') {
      buttonClasses += ' h-11 px-6';
    } else if (size === 'xl') {
      buttonClasses += ' h-12 px-8';
    }
    
    // Full width
    if (fullWidth) {
      buttonClasses += ' w-full';
    }
    
    // Custom classes
    buttonClasses += ` ${className}`;
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button'; 