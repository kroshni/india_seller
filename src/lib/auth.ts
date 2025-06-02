import { getClient } from './db/cassandra';
import { compare, hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { types } from 'cassandra-driver';
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

// Middleware to check if customer is authenticated
export const authenticateCustomerRequest = async (request: NextRequest) => {
  const token = request.cookies.get('customer-auth-token')?.value;
  
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
          return {
            id: user.customerId,
            email: user.email,
            name: user.name,
            role: user.role
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
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};