import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { getClient } from '@/lib/db/cassandra';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';

// POST /api/admin/customer-access
// Allows admin users to access the customer panel
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const user = await authenticateRequest(request);
    if (!user || (user as any).role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const client = await getClient();
    const adminEmail = (user as any).email;
    
    // Check if this admin already has a customer record
    const customerQuery = 'SELECT id FROM customers WHERE email = ? ALLOW FILTERING';
    const customerResult = await client.execute(customerQuery, [adminEmail], { prepare: true });
    
    let customerId;
    
    if (customerResult.rowLength === 0) {
      // Create a customer record for this admin
      customerId = uuidv4();
      const timestamp = new Date();
      
      const insertCustomerQuery = 'INSERT INTO customers (id, email, name, phone, address, created_at) VALUES (?, ?, ?, ?, ?, ?)';
      await client.execute(
        insertCustomerQuery, 
        [
          customerId, 
          adminEmail, 
          (user as any).name || 'Admin User', 
          '', // phone
          '', // address
          timestamp
        ], 
        { prepare: true }
      );
      
      console.log(`Created customer record for admin user: ${adminEmail}`);
    } else {
      customerId = customerResult.first().id.toString();
      console.log(`Found existing customer record for admin user: ${adminEmail}`);
    }
    
    // Create a customer JWT token
    const token = sign(
      {
        email: adminEmail,
        name: (user as any).name,
        role: 'customer',
        customerId: customerId
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );
    
    // Set HTTP-only cookie
    const response = NextResponse.json(
      { 
        message: 'Admin access to customer panel granted',
        redirectUrl: '/customer/dashboard'
      },
      { status: 200 }
    );
    
    response.cookies.set({
      name: 'customer-auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day in seconds
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Admin customer access error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}