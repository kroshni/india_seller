'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
  children?: {
    href: string;
    title: string;
  }[];
  isActive: boolean;
  checkActive: (path: string) => boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>('sellers');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

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
        // Force a hard redirect to the login page
        window.location.href = '/auth/login';
        // Use replace to prevent back navigation after logout
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

  // Icons using simple SVG for each menu item
  const icons = {
    dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
    sellers: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
      </svg>
    ),
    customers: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    categories: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
    products: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    logout: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
      </svg>
    ),
  };

  const SidebarItem = ({ href, title, icon, children, isActive, checkActive }: SidebarItemProps) => {
    const hasChildren = children && children.length > 0;
    const isExpanded = expandedItem === title.toLowerCase();
    
    return (
      <div className="mb-1">
        {hasChildren ? (
          <button
            onClick={() => toggleExpand(title.toLowerCase())}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
              isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3">{icon}</span>
              <span>{title}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        ) : (
          <Link
            href={href}
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">{icon}</span>
            <span>{title}</span>
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="ml-8 mt-1 space-y-1">
            {children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`block px-3 py-2 rounded-md ${
                  checkActive(child.href) ? 'bg-blue-50 text-blue-800' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-blue-700">Seller Admin</span>
        </Link>
      </div>
      
      <nav className="space-y-1">
        <SidebarItem 
          href="/dashboard" 
          title="Dashboard" 
          icon={icons.dashboard}
          isActive={isActive('/dashboard')}
          checkActive={isActive}
          children={[]}
        />
        
        <SidebarItem 
          href="/dashboard/sellers" 
          title="Sellers" 
          icon={icons.sellers}
          isActive={isActive('/dashboard/sellers')}
          checkActive={isActive}
          children={[
            { href: '/dashboard/sellers', title: 'Listing' },
            { href: '/dashboard/sellers/products', title: 'Products' }
          ]}
        />
        
        <SidebarItem 
          href="/dashboard/customers" 
          title="Customers" 
          icon={icons.customers}
          isActive={isActive('/dashboard/customers')}
          checkActive={isActive}
          children={[]}
        />
        
        <SidebarItem 
          href="/dashboard/categories" 
          title="Categories" 
          icon={icons.categories}
          isActive={isActive('/dashboard/categories')}
          checkActive={isActive}
          children={[]}
        />
        
        <SidebarItem 
          href="/dashboard/products" 
          title="Products" 
          icon={icons.products}
          isActive={isActive('/dashboard/products')}
          checkActive={isActive}
          children={[]}
        />
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3">{icons.logout}</span>
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </nav>
    </div>
  );
} 