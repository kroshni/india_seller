import { getClient } from './db/cassandra';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export interface User {
  email: string;
  name: string;
  role: string;
}

export interface CustomerUser extends User {
  customerId: string;
}

export interface SellerUser extends User {
  sellerId: string;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const client = await getClient();
    const query = 'SELECT email, password, name, role FROM users WHERE email = ?';
    const result = await client.execute(query, [email], { prepare: true });
    
    const user = result.first();
    if (!user) return null;

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) return null;

    return {
      email: user.email,
      name: user.name,
      role: user.role
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function createUser(email: string, password: string, name: string, role: string = 'admin'): Promise<User | null> {
  try {
    const client = await getClient();
    
    // Check if user already exists
    const checkQuery = 'SELECT email FROM users WHERE email = ?';
    const checkResult = await client.execute(checkQuery, [email], { prepare: true });
    
    if (checkResult.rowLength > 0) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = await hash(password, 10);
    const timestamp = new Date();
    
    const insertQuery = 'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, ?)';
    await client.execute(insertQuery, [email, hashedPassword, name, role, timestamp], { prepare: true });
    
    return { email, name, role };
  } catch (error) {
    console.error('Create user error:', error);
    return null;
  }
}

// Seed an initial admin user if none exists
export async function seedAdminUser() {
  try {
    const client = await getClient();
    const query = 'SELECT count(*) as count FROM users WHERE role = ? ALLOW FILTERING';
    const result = await client.execute(query, ['admin'], { prepare: true });
    
    const count = result.first()?.count?.low || 0;
    
    if (count === 0) {
      await createUser(
        'admin@example.com',
        'Admin@123',
        'Admin User',
        'admin'
      );
      console.log('Admin user seeded');
    }
  } catch (error) {
    console.error('Seed admin error:', error);
  }
} 

// Authenticate a customer user
export async function authenticateCustomer(email: string, password: string): Promise<CustomerUser | null> {
  try {
    const client = await getClient();
    
    // First check if there's a user with this email and role 'customer'
    const userQuery = 'SELECT email, password, name, role FROM users WHERE email = ?';
    const userResult = await client.execute(userQuery, [email], { prepare: true });
    
    const user = userResult.first();
    if (!user) return null;
    if (user.role !== 'customer') return null;

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) return null;

    // Find the associated customer record
    const customerQuery = 'SELECT id FROM customers WHERE email = ? ALLOW FILTERING';
    const customerResult = await client.execute(customerQuery, [email], { prepare: true });
    
    if (customerResult.rowLength === 0) {
      console.error('User exists but no matching customer record found');
      return null;
    }
    
    const customerId = customerResult.first().id.toString();
    
    return {
      email: user.email,
      name: user.name,
      role: user.role,
      customerId
    };
  } catch (error) {
    console.error('Customer authentication error:', error);
    return null;
  }
}

// Create a customer user account
export async function createCustomerUser(email: string, password: string, name: string, customerId: string): Promise<CustomerUser | null> {
  try {
    const client = await getClient();
    
    // Check if user already exists
    const checkQuery = 'SELECT email FROM users WHERE email = ?';
    const checkResult = await client.execute(checkQuery, [email], { prepare: true });
    
    if (checkResult.rowLength > 0) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = await hash(password, 10);
    const timestamp = new Date();
    
    const insertQuery = 'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, ?)';
    await client.execute(insertQuery, [email, hashedPassword, name, 'customer', timestamp], { prepare: true });
    
    return { 
      email, 
      name, 
      role: 'customer',
      customerId 
    };
  } catch (error) {
    console.error('Create customer user error:', error);
    return null;
  }
}

// Create a seller user account
export async function createSellerUser(email: string, password: string, name: string, sellerId: string): Promise<SellerUser | null> {
  try {
    const client = await getClient();
    
    // Check if user already exists
    const checkQuery = 'SELECT email FROM users WHERE email = ?';
    const checkResult = await client.execute(checkQuery, [email], { prepare: true });
    
    if (checkResult.rowLength > 0) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = await hash(password, 10);
    const timestamp = new Date();
    
    const insertQuery = 'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, ?)';
    await client.execute(insertQuery, [email, hashedPassword, name, 'seller', timestamp], { prepare: true });
    
    return { 
      email, 
      name, 
      role: 'seller',
      sellerId 
    };
  } catch (error) {
    console.error('Create seller user error:', error);
    return null;
  }
}

// Authenticate a seller with email and password
export async function authenticateSeller(email: string, password: string): Promise<SellerUser | null> {
  try {
    const client = await getClient();
    
    // First check if the user exists and has the correct role
    const userQuery = 'SELECT email, password, name, role FROM users WHERE email = ?';
    const userResult = await client.execute(userQuery, [email], { prepare: true });
    
    if (userResult.rowLength === 0) return null;
    
    const user = userResult.first();
    if (!user) return null;
    if (user.role !== 'seller' && user.role !== 'admin') return null;

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) return null;

    // Find the associated seller record if the user is a seller
    if (user.role === 'seller') {
      const sellerQuery = 'SELECT id FROM sellers WHERE email = ? ALLOW FILTERING';
      const sellerResult = await client.execute(sellerQuery, [email], { prepare: true });
      
      if (sellerResult.rowLength === 0) {
        console.error('User exists but no matching seller record found');
        return null;
      }
      
      const sellerId = sellerResult.first().id.toString();
      
      return {
        email: user.email,
        name: user.name,
        role: user.role,
        sellerId
      };
    }
    
    // For admin users, we don't need a sellerId
    return {
      email: user.email,
      name: user.name,
      role: user.role,
      sellerId: 'admin'
    };
  } catch (error) {
    console.error('Seller authentication error:', error);
    return null;
  }
}

// Middleware to check if user is authenticated
export const authenticateRequest = async (request: NextRequest) => {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    return null;
  }
};

// Middleware to check if seller/admin is authenticated
export const authenticateSellerRequest = async (request: NextRequest) => {
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
    
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Middleware to check if customer is authenticated
export const authenticateCustomerRequest = async (request: NextRequest) => {
  const token = request.cookies.get('customer-auth-token')?.value;
  
  console.log('Customer auth check - Token exists:', !!token);
  
  if (!token) {
    console.log('Customer authentication failed: No token found');
    return null;
  }
  
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    console.log('Verifying token with secret:', secret ? 'Secret exists' : 'No secret');
    
    const decoded = verify(token, secret);
    console.log('Token verified successfully, user:', (decoded as any).email || 'unknown');
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await authenticateCustomer(credentials.email, credentials.password);
        
        if (user) {
          // Store the customerId in the user object to be used in the JWT callback
          return {
            id: user.customerId,
            email: user.email,
            name: user.name,
            role: user.role,
            customerId: user.customerId // Add customerId explicitly
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/customer/login',
    signOut: '/api/customers/auth/logout',
    error: '/customer/login', // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.customerId = user.customerId; // Store customerId in the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.customerId = token.customerId as string; // Add customerId to session
      }
      return session;
    }
  },
  events: {
    async signIn({ user, account }) {
      // When a user signs in, create a custom JWT token and set it as a cookie
      if (user && user.customerId) {
        try {
          // This will be executed on the server side
          const token = sign(
            {
              email: user.email,
              name: user.name,
              role: 'customer',
              customerId: user.customerId
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
          );
          
          // Note: We can't directly set cookies here as this runs on the server
          // The cookie will be set in a middleware or API route
          // We'll store this in the token to be used later
          console.log('Created custom JWT token for user:', user.email);
        } catch (error) {
          console.error('Error creating custom JWT token:', error);
        }
      }
    }
  }
};