'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSellers } from '@/lib/api-client/seller-client';
import { Seller } from '@/lib/services/seller-service';

// Function to render stars based on top scorer percentage
const renderStars = (topScorerPercentage: number) => {
  // Convert percentage to 5-star scale
  const rating = (topScorerPercentage / 100) * 5;
  
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  }
  
  // Add empty stars to make 5 stars total
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  }
  
  return stars;
};

// Sample seller profile images
const sellerLogos = [
  'https://picsum.photos/id/3/300/300',
  'https://picsum.photos/id/20/300/300',
  'https://picsum.photos/id/42/300/300',
  'https://picsum.photos/id/63/300/300',
  'https://picsum.photos/id/76/300/300',
  'https://picsum.photos/id/91/300/300'
];

// Sample business categories
const categories = [
  'Electronics',
  'Clothing & Apparel',
  'Home & Garden',
  'Health & Wellness',
  'Food & Groceries',
  'Books & Stationery'
];

// Sample locations
const locations = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Kolkata'
];

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Active');
  
  // Fetch sellers
  useEffect(() => {
    const fetchSellers = async () => {
      setIsLoading(true);
      try {
        const response = await getSellers({
          page: currentPage,
          limit: 12,
          search: searchTerm,
          status: statusFilter as any,
          sortBy: 'isTopScorer',
          sortOrder: 'desc'
        });
        
        // Enhance sellers with additional info
        const enhancedSellers = response.data.map((seller, index) => ({
          ...seller,
          logo: sellerLogos[index % sellerLogos.length],
          productCount: Math.floor(Math.random() * 200) + 50, // Random count between 50-250
          category: categories[index % categories.length],
          location: locations[index % locations.length]
        }));
        
        setSellers(enhancedSellers);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSellers();
  }, [currentPage, searchTerm, statusFilter]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Our Sellers</h1>
          <p className="mt-1 text-gray-600">Find and connect with our verified sellers</p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative rounded-md shadow-sm flex-1">
              <input
                type="text"
                className="block w-full rounded-l-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="relative -ml-px inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 rounded-r-md"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('Active')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === 'Active'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active Sellers
          </button>
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === 'All'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Sellers
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : sellers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sellers.map((seller) => (
              <div key={seller.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={seller.logo} 
                      alt={seller.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{seller.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {renderStars(seller.isTopScorer)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{((seller.isTopScorer / 100) * 5).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-1">
                      {seller.kycStatus === 'Verified' && (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded flex items-center mr-2">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Verified
                        </span>
                      )}
                      <span className="text-sm text-gray-600">{seller.productCount} Products</span>
                    </div>
                    <div className="flex flex-wrap text-sm text-gray-600">
                      <span className="mr-3">{seller.category}</span>
                      <span>{seller.location}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/sellers/${seller.id}`}
                    className="block text-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md font-medium transition-colors duration-200"
                  >
                    View Seller
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === idx + 1
                        ? 'bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-xl font-medium text-yellow-800 mb-2">No Sellers Found</h2>
          <p className="text-yellow-700 mb-4">
            {searchTerm
              ? `No results match your search "${searchTerm}". Please try different keywords.`
              : "There are no sellers available at this time."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
} 