'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminCustomerAccess } from '@/components/ui/admin-customer-access';

export default function Navbar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // First clear any client-side state before calling the API
      localStorage.clear();
      sessionStorage.clear();
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        // Force a hard reload to the login page
        window.location.replace('/auth/login');
      } else {
        // If the logout API fails, still try to redirect
        window.location.replace('/auth/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, still redirect
      window.location.replace('/auth/login');
    }
  };
  
  // Check if the current user is an admin
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await fetch('/api/sellers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.user?.role || null);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    };
    
    checkUserRole();
  }, []);

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold">
              Seller Admin
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
            >
              Dashboard
            </Link>
            
            <Link 
              href="/dashboard/sellers" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800"
            >
              Sellers
            </Link>
            
            {userRole === 'admin' && (
              <div className="px-3 py-2">
                <AdminCustomerAccess />
              </div>
            )}
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 disabled:bg-red-400"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}