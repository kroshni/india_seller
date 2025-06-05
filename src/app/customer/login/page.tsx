'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

interface LoginFormData {
  email: string;
  password: string;
}

export default function CustomerLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  // Check if user is already authenticated
  useEffect(() => {
    async function checkAuthentication() {
      try {
        // First check NextAuth session
        const nextAuthResponse = await fetch('/api/auth/session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        
        const nextAuthData = await nextAuthResponse.json();
        
        // If NextAuth session exists, redirect to dashboard
        if (nextAuthData.user) {
          router.replace('/customer/dashboard');
          return;
        }
        
        // If no NextAuth session, check custom JWT token
        const response = await fetch('/api/customers/auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        
        if (response.ok) {
          // User has JWT token but no NextAuth session
          // We need to create a NextAuth session by redirecting to sign in
          router.replace('/api/auth/signin?callbackUrl=/customer/dashboard');
          return;
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    }
    
    checkAuthentication();
  }, [router]);
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Login: Attempting to sign in with credentials');
      
      // Use NextAuth signIn function instead of direct API call
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/customer/dashboard'
      });
      
      console.log('Login: NextAuth sign in result:', result?.error ? 'Error: ' + result.error : 'Success');
      
      if (result?.error) {
        setError(result.error || 'Login failed');
        return;
      }
      
      // After successful NextAuth login, also set the custom JWT token
      console.log('Login: NextAuth login successful, setting custom JWT token');
      
      try {
        // Call our custom login endpoint to set the JWT cookie
        const customTokenResponse = await fetch('/api/customers/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        });
        
        console.log('Login: Custom token API response status:', customTokenResponse.status);
        
        if (!customTokenResponse.ok) {
          console.warn('Login: Failed to set custom JWT token, but NextAuth login succeeded');
          // Continue anyway since NextAuth login succeeded
        } else {
          console.log('Login: Custom JWT token set successfully');
        }
      } catch (tokenErr) {
        console.error('Login: Error setting custom JWT token:', tokenErr);
        // Continue anyway since NextAuth login succeeded
      }
      
      // Redirect to customer dashboard on successful login
      router.replace('/customer/dashboard');
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login: Error during login process:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Customer Login</h1>
          <p className="text-gray-600 mt-2">Sign in to your customer account</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Don't have an account? <Link href="/customer/register" className="text-blue-600 hover:text-blue-800">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}