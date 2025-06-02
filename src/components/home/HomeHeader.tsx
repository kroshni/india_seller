'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomeHeader() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">IndiaSeller</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/sell" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Sell
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Blog
            </Link>
            <Link href="/dashboard/products" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            
            {/* Login Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Login
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLoginOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <Link 
                    href="/auth/login?role=seller" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    Login as Seller
                  </Link>
                  <Link 
                    href="/auth/login?role=admin" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    Login as Admin
                  </Link>
                  <Link 
                    href="/customer/login" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    Login as Customer
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-indigo-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 