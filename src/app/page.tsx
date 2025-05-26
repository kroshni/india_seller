import { Suspense } from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';
import SearchSection from '@/components/home/SearchSection';
import CategoryListing from '@/components/home/CategoryListing';
import BusinessTypeSection from '@/components/home/BusinessTypeSection';
import ProductListing from '@/components/home/ProductListing';
import FeaturedSellers from '@/components/home/FeaturedSellers';
import TrendingProducts from '@/components/home/TrendingProducts';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import ServiceListing from '@/components/home/ServiceListing';
import LiveChat from '@/components/home/LiveChat';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />
      
      <main className="flex-grow">
        {/* Search Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <SearchSection />
        </section>
        
        {/* Category Listing */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Browse Categories</h2>
            <Suspense fallback={<div>Loading categories...</div>}>
              <CategoryListing />
            </Suspense>
          </div>
        </section>
        
        {/* B2B / B2C / C2C Sections */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Business Types</h2>
            <BusinessTypeSection />
          </div>
        </section>
        
        {/* Product Listing */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Latest Products</h2>
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductListing />
            </Suspense>
          </div>
        </section>
        
        {/* Featured Listings / Top Sellers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Sellers</h2>
            <Suspense fallback={<div>Loading featured sellers...</div>}>
              <FeaturedSellers />
            </Suspense>
          </div>
        </section>
        
        {/* Trending Products */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Trending Products</h2>
            <Suspense fallback={<div>Loading trending products...</div>}>
              <TrendingProducts />
            </Suspense>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 bg-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What Our Customers Say</h2>
            <Testimonials />
          </div>
        </section>
        
        {/* News or Blog Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Latest News & Articles</h2>
            <Suspense fallback={<div>Loading blog posts...</div>}>
              <BlogSection />
            </Suspense>
          </div>
        </section>
        
        {/* Service Listings */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Professional Services</h2>
            <Suspense fallback={<div>Loading services...</div>}>
              <ServiceListing />
            </Suspense>
          </div>
        </section>
      </main>
      
      {/* Live Chat Widget */}
      <LiveChat />
      
      <HomeFooter />
    </div>
  );
}
