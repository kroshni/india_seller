'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function CategoryListing() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll just use mock data
    const fetchCategories = () => {
      setIsLoading(true);
      
      // Mock categories with icon names (using heroicons)
      const mockCategories: Category[] = [
        { 
          id: 'electronics', 
          name: 'Electronics', 
          icon: 'M13 10V3L4 14h7v7l9-11h-7z', // lightning bolt
          color: 'bg-blue-100 text-blue-600'
        },
        { 
          id: 'fashion', 
          name: 'Fashion', 
          icon: 'M6.5 3.5a3.5 3.5 0 0 1 5.5 1 3.5 3.5 0 0 1 5.5-1A3.5 3.5 0 0 1 21 7.5V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7.5a3.5 3.5 0 0 1 3.5-4z', // shopping bag
          color: 'bg-pink-100 text-pink-600'
        },
        { 
          id: 'home-garden', 
          name: 'Home & Garden', 
          icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h6a2 2 0 002-2v-1a2 2 0 012-2h1.945M5.05 8H4a1 1 0 00-1 1v4h1.05M19.05 8H20a1 1 0 011 1v4h-1.05M10 11V8m4 3V8m-4 8v-4m4 4v-4', // home
          color: 'bg-green-100 text-green-600'
        },
        { 
          id: 'beauty', 
          name: 'Beauty & Personal Care', 
          icon: 'M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM10.38 14.038a2.5 2.5 0 00-3.76 0l-1.5 1.5a2.5 2.5 0 003.76 3.76l1.5-1.5a2.5 2.5 0 000-3.76zM17.5 11.5a2.5 2.5 0 00-3.76 0l-1.5 1.5a2.5 2.5 0 003.76 3.76l1.5-1.5a2.5 2.5 0 000-3.76z', // sparkles
          color: 'bg-purple-100 text-purple-600'
        },
        { 
          id: 'sports', 
          name: 'Sports & Outdoors', 
          icon: 'M14 5l7 7m0 0l-7 7m7-7H3', // running
          color: 'bg-red-100 text-red-600'
        },
        { 
          id: 'automotive', 
          name: 'Automotive', 
          icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', // truck
          color: 'bg-gray-100 text-gray-600'
        },
        { 
          id: 'toys-games', 
          name: 'Toys & Games', 
          icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // puzzle
          color: 'bg-yellow-100 text-yellow-600'
        },
        { 
          id: 'health', 
          name: 'Health & Wellness', 
          icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', // heart
          color: 'bg-teal-100 text-teal-600'
        },
        { 
          id: 'books', 
          name: 'Books & Media', 
          icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', // book
          color: 'bg-indigo-100 text-indigo-600'
        },
        { 
          id: 'food', 
          name: 'Food & Groceries', 
          icon: 'M21 15.5V7.75C21 6.785 20.215 6 19.25 6H4.75C3.785 6 3 6.785 3 7.75v7.75c0 .965.785 1.75 1.75 1.75h14.5c.965 0 1.75-.785 1.75-1.75zM3.75 18h16.5M4.5 9.5h15M4.5 12.5h15', // shopping cart
          color: 'bg-orange-100 text-orange-600'
        },
        { 
          id: 'services', 
          name: 'Services', 
          icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', // briefcase
          color: 'bg-cyan-100 text-cyan-600'
        },
        { 
          id: 'electronics-appliances', 
          name: 'Electronics & Appliances', 
          icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18', // light bulb
          color: 'bg-lime-100 text-lime-600'
        }
      ];
      
      setCategories(mockCategories);
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link 
          href={`/category/${category.id}`} 
          key={category.id}
          className="flex flex-col items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
        >
          <div className={`p-3 rounded-full ${category.color} mb-3`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={category.icon}
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  );
} 