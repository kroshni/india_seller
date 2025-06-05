'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from './Button';

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className = '' }: LogoutButtonProps) {
  const handleLogout = async () => {
    // First sign out from NextAuth
    await signOut({ redirect: false });
    
    // Then call our custom logout API to clear the JWT cookie
    await fetch('/api/customers/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Redirect to login page
    window.location.href = '/customer/login';
  };

  return (
    <Button 
      onClick={handleLogout}
      variant="ghost"
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${className}`}
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
}