'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Render stars based on top scorer percentage
const renderStars = (topScorerPercentage: number) => {
  const rating = (topScorerPercentage / 100) * 5;
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  }
  
  // Half star
  if (hasHalfStar) {
    stars.push(
      <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  }
  
  // Empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  }
  
  return stars;
};

export default function SellerDetailsClient({ sellerData }: { sellerData: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data for display
  const categories = ['Electronics', 'Clothing & Apparel', 'Home & Garden', 'Health & Wellness'];
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'];
  
  // Mock data for services and reviews
  const mockServices = [
    { id: 1, name: 'Product Customization', description: 'Custom designs and modifications available on request' },
    { id: 2, name: 'Express Delivery', description: 'Get your orders delivered within 24 hours in select cities' },
    { id: 3, name: 'Installation Support', description: 'Expert installation and setup services available' },
    { id: 4, name: 'Return Policy', description: '30-day easy return and exchange policy' }
  ];
  
  const mockReviews = [
    { id: 1, reviewer: 'Amit Singh', rating: 5, comment: 'Excellent quality products and timely delivery. Will definitely buy again!', date: '2023-10-15' },
    { id: 2, reviewer: 'Priya Sharma', rating: 4, comment: 'Good products overall. Shipping took a bit longer than expected.', date: '2023-09-22' },
    { id: 3, reviewer: 'Rajesh Kumar', rating: 5, comment: 'Very responsive seller. Helped me with product selection and after-sales support.', date: '2023-08-10' }
  ];
  
  if (!sellerData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">Seller Not Found</h2>
          <p className="text-yellow-700">The seller you are looking for does not exist or has been deleted.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  const { seller, business, addresses, gallery } = sellerData;
  // Generate random product count and category for display
  const productCount = Math.floor(Math.random() * 200) + 50;
  const category = categories[Math.floor(Math.random() * categories.length)];
  const location = addresses.length > 0 
    ? `${addresses[0].city}, ${addresses[0].state}` 
    : locations[Math.floor(Math.random() * locations.length)];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <Link href="/sellers" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2">
                Sellers
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{seller.name}</span>
            </div>
          </li>
        </ol>
      </nav>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Hero section */}
        <div className="relative bg-indigo-700 h-48">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        <div className="relative px-6 sm:px-8 pb-8">
          {/* Profile header */}
          <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-6">
            <div className="flex-shrink-0 relative">
              {seller.profilePicture ? (
                <img
                  src={seller.profilePicture}
                  alt={seller.name}
                  className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-semibold">
                  {seller.name.charAt(0).toUpperCase()}
                </div>
              )}
              {seller.kycStatus === 'Verified' && (
                <div className="absolute bottom-1 right-1 bg-green-100 border-2 border-white rounded-full p-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}
            </div>
            
            <div className="mt-6 sm:mt-0 sm:ml-6 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{seller.name}</h1>
                  <p className="text-gray-600">{business.companyName}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {renderStars(seller.isTopScorer)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {((seller.isTopScorer / 100) * 5).toFixed(1)} ({seller.isTopScorer}% top scorer)
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Link 
                    href={`/contact?seller=${seller.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Contact Seller
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`${
                  activeTab === 'photos'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab('quick-info')}
                className={`${
                  activeTab === 'quick-info'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Quick Info
              </button>
              <button
                onClick={() => setActiveTab('locations')}
                className={`${
                  activeTab === 'locations'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                All Locations
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`${
                  activeTab === 'services'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`${
                  activeTab === 'reviews'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Reviews & Ratings
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="mt-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Seller Info */}
                  <div className="col-span-2">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">About {seller.name}</h2>
                      <p className="text-gray-700 mb-4">
                        {business.companyName} is a {category.toLowerCase()} business based in {location}. 
                        We specialize in providing high-quality products and exceptional customer service.
                      </p>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Email</p>
                              <a href={`mailto:${seller.email}`} className="text-sm text-indigo-600 hover:underline">
                                {seller.email}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Phone</p>
                              <a href={`tel:${seller.phone}`} className="text-sm text-indigo-600 hover:underline">
                                {seller.phone}
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Location</p>
                              <p className="text-sm text-gray-600">
                                {location}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Member Since</p>
                              <p className="text-sm text-gray-600">
                                {new Date(seller.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">Top Scorer</span>
                            <span className="text-sm font-medium text-indigo-600">{seller.isTopScorer}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${seller.isTopScorer}%` }}></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-sm text-gray-500">Status</span>
                          <span className={`text-sm font-medium ${
                            seller.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {seller.status}
                          </span>
                        </div>
                        
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-sm text-gray-500">KYC Status</span>
                          <span className={`text-sm font-medium ${
                            seller.kycStatus === 'Verified' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {seller.kycStatus}
                          </span>
                        </div>
                        
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-sm text-gray-500">Product Count</span>
                          <span className="text-sm font-medium text-gray-900">{productCount}</span>
                        </div>
                        
                        <div className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-sm text-gray-500">Category</span>
                          <span className="text-sm font-medium text-gray-900">{category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Gallery</h2>
                {gallery && gallery.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((image: any) => (
                      <div key={image.id} className="relative rounded-lg overflow-hidden bg-gray-200 aspect-square">
                        <img
                          src={image.imageUrl}
                          alt={image.caption || 'Gallery image'}
                          className="w-full h-full object-cover"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No photos</h3>
                    <p className="mt-1 text-sm text-gray-500">This seller hasn't uploaded any gallery photos yet.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Quick Info Tab */}
            {activeTab === 'quick-info' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Information</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Seller Name</dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">{seller.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">{business.companyName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                      <dd className="mt-1 text-base font-medium text-indigo-600">
                        <a href={`mailto:${seller.email}`} className="hover:underline">{seller.email}</a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                      <dd className="mt-1 text-base font-medium text-indigo-600">
                        <a href={`tel:${seller.phone}`} className="hover:underline">{seller.phone}</a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Main Category</dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">{category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">{location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Products Available</dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">{productCount}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Rating</dt>
                      <dd className="mt-1 flex items-center">
                        <div className="flex mr-2">
                          {renderStars(seller.isTopScorer)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {((seller.isTopScorer / 100) * 5).toFixed(1)}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Verification Status</dt>
                      <dd className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          seller.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {seller.kycStatus === 'Verified' && (
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          )}
                          {seller.kycStatus}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                      <dd className="mt-1 text-base font-medium text-gray-900">
                        {new Date(seller.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
            
            {/* Locations Tab */}
            {activeTab === 'locations' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">All Locations</h2>
                {addresses && addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {addresses.map((address: any) => (
                      <div key={address.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                        {address.image ? (
                          <img 
                            src={address.image} 
                            alt={`${address.city} location`} 
                            className="w-full h-40 object-cover"
                          />
                        ) : (
                          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {address.addressType}
                            </span>
                          </div>
                          <p className="text-gray-700 font-medium">{address.city}, {address.state}</p>
                          <p className="text-gray-600">{address.country}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No locations</h3>
                    <p className="mt-1 text-sm text-gray-500">This seller hasn't added any location details yet.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Services Offered</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockServices.map(service => (
                    <div key={service.id} className="bg-white rounded-lg border border-gray-200 p-5">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Reviews & Ratings</h2>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(seller.isTopScorer)}
                    </div>
                    <span className="text-lg font-medium text-gray-900">
                      {((seller.isTopScorer / 100) * 5).toFixed(1)}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">({mockReviews.length} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {mockReviews.map(review => (
                    <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-lg font-semibold">
                              {review.reviewer.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{review.reviewer}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 