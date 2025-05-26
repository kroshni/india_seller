'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  date: string;
  readTime: number;
  slug: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll just use mock data
    const fetchBlogPosts = () => {
      setIsLoading(true);
      
      // Mock blog posts
      const mockPosts: BlogPost[] = [
        {
          id: 'post-1',
          title: 'How to Start Your Online Business in India',
          excerpt: 'Learn the step-by-step process to set up your e-commerce business in India, from registration to online presence.',
          image: 'https://picsum.photos/id/3/600/400',
          author: 'Vikram Mehta',
          category: 'Business Tips',
          date: '2023-07-15',
          readTime: 8,
          slug: 'how-to-start-your-online-business-in-india'
        },
        {
          id: 'post-2',
          title: 'Top 10 Trending Products to Sell Online in 2023',
          excerpt: 'Discover the hottest products that are flying off the virtual shelves this year and why they\'re so popular.',
          image: 'https://picsum.photos/id/26/600/400',
          author: 'Neha Singh',
          category: 'Market Trends',
          date: '2023-07-10',
          readTime: 6,
          slug: 'top-10-trending-products-to-sell-online-in-2023'
        },
        {
          id: 'post-3',
          title: 'Effective Product Photography Tips for Sellers',
          excerpt: 'Improve your product listings with these professional photography tips that don\'t require expensive equipment.',
          image: 'https://picsum.photos/id/36/600/400',
          author: 'Rahul Kapoor',
          category: 'Seller Tips',
          date: '2023-07-05',
          readTime: 5,
          slug: 'effective-product-photography-tips-for-sellers'
        }
      ];
      
      setPosts(mockPosts);
      setIsLoading(false);
    };

    fetchBlogPosts();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
          <Link href={`/blog/${post.slug}`}>
            <div className="h-48 bg-gray-200 relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 bg-indigo-600 text-white text-xs font-semibold px-3 py-1">
                {post.category}
              </div>
            </div>
          </Link>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 hover:text-indigo-600 transition-colors duration-200">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center">
                <span className="mr-2">{post.author}</span>
                <span>•</span>
                <span className="ml-2">{formatDate(post.date)}</span>
              </div>
              <div>
                {post.readTime} min read
              </div>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 