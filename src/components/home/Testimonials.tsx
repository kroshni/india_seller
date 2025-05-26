'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  image: string;
  rating: number;
  text: string;
  date: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll just use mock data
    const fetchTestimonials = () => {
      setIsLoading(true);
      
      // Mock testimonials
      const mockTestimonials: Testimonial[] = [
        {
          id: 'test-1',
          name: 'Amit Sharma',
          role: 'Buyer',
          image: 'https://i.pravatar.cc/150?img=11',
          rating: 5,
          text: 'I found exactly what I was looking for at a great price. The seller was very responsive and the product arrived earlier than expected. Will definitely shop here again!',
          date: '2023-06-15'
        },
        {
          id: 'test-2',
          name: 'Priya Patel',
          role: 'Seller',
          company: 'TechGadgets India',
          image: 'https://i.pravatar.cc/150?img=5',
          rating: 5,
          text: 'IndiaSeller has transformed my small business. The platform is easy to use and has connected me with customers all over India. My sales have increased by 40% since joining!',
          date: '2023-05-22'
        },
        {
          id: 'test-3',
          name: 'Rajesh Kumar',
          role: 'Buyer',
          image: 'https://i.pravatar.cc/150?img=12',
          rating: 4,
          text: 'Great selection of products at competitive prices. The filtering options make it easy to find exactly what I need. Delivery was prompt and the product quality exceeded my expectations.',
          date: '2023-07-03'
        },
        {
          id: 'test-4',
          name: 'Sunita Desai',
          role: 'Seller',
          company: 'Handmade Crafts Co.',
          image: 'https://i.pravatar.cc/150?img=10',
          rating: 5,
          text: 'As an artisan, I was struggling to reach customers beyond my local market. IndiaSeller has given me a national platform to showcase my handcrafted products. The seller tools are intuitive and powerful.',
          date: '2023-04-18'
        }
      ];
      
      setTestimonials(mockTestimonials);
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);

  // Auto rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Change testimonial every 8 seconds
    
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8 animate-pulse">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="ml-4">
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const testimonial = testimonials[activeIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Testimonial Card */}
      <div className="bg-white rounded-lg shadow-md p-8 relative">
        {/* Quote icon */}
        <div className="absolute top-4 right-6 text-indigo-100">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.722 6.065c-5.357 2.56-8.893 7.503-8.893 13.699 0 3.84 1.921 7.68 5.952 7.68 3.177 0 5.098-2.287 5.098-5.098 0-2.56-1.645-4.754-4.204-4.754-0.552 0-1.37 0-1.645 0.275 0.828-3.84 4.48-7.68 7.934-9.049l-4.242-2.753zM25.602 6.065c-5.357 2.56-8.893 7.503-8.893 13.699 0 3.84 1.921 7.68 5.952 7.68 3.177 0 5.098-2.287 5.098-5.098 0-2.56-1.645-4.754-4.204-4.754-0.552 0-1.37 0-1.645 0.275 0.828-3.84 4.48-7.68 7.934-9.049l-4.242-2.753z"></path>
          </svg>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-indigo-100">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
            <p className="text-sm text-gray-600">
              {testimonial.role}
              {testimonial.company && ` at ${testimonial.company}`}
            </p>
            <div className="flex mt-1">
              {renderStars(testimonial.rating)}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
        
        <p className="text-sm text-gray-500">{new Date(testimonial.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      {/* Testimonial navigation dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-indigo-600 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 