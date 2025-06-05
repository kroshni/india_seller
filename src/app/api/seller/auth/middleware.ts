import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export interface AuthenticatedSellerRequest {
  email: string;
  name: string;
  role: string;
  sellerId: string;
}

// Middleware to check if seller is authenticated
export const authenticateSellerRequest = async (request: NextRequest): Promise<AuthenticatedSellerRequest | null> => {
  const token = request.cookies.get('auth-token')?.value;
  
  console.log('Seller auth check - Token exists:', !!token);
  
  if (!token) {
    console.log('Seller authentication failed: No token found');
    return null;
  }
  
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    console.log('Verifying token with secret:', secret ? 'Secret exists' : 'No secret');
    
    const decoded = verify(token, secret) as any;
    console.log('Token verified successfully, user:', decoded.email || 'unknown');
    
    // Check if the user has the correct role (admin or seller)
    if (decoded.role !== 'admin' && decoded.role !== 'seller') {
      console.log('User does not have admin or seller role:', decoded.role);
      return null;
    }
    
    return {
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      sellerId: decoded.sellerId
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};