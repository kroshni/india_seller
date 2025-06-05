import { NextRequest, NextResponse } from 'next/server';
import { createSellerUser } from '@/lib/auth';
import { createSeller } from '@/lib/services/seller-service';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.password) {
      return NextResponse.json(
        { message: 'Name, email, phone, and password are required' },
        { status: 400 }
      );
    }
    
    if (!data.business || !data.business.companyName) {
      return NextResponse.json(
        { message: 'Business company name is required' },
        { status: 400 }
      );
    }
    
    // Create the seller record first
    const sellerData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      business: data.business,
      addresses: data.addresses || []
    };
    
    const sellerId = await createSeller(sellerData);
    
    if (!sellerId) {
      return NextResponse.json(
        { message: 'Failed to create seller' },
        { status: 500 }
      );
    }
    
    // Then create the user account with the seller role
    const user = await createSellerUser(data.email, data.password, data.name, sellerId);
    
    if (!user) {
      // This is a problem - we created a seller but couldn't create the user
      // In a production system, we would need to handle this better, possibly with transactions
      console.error('Created seller but failed to create user account');
      return NextResponse.json(
        { message: 'Failed to create user account' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Seller registered successfully',
      sellerId
    }, { status: 201 });
  } catch (error) {
    console.error('Seller registration error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to register seller' },
      { status: 500 }
    );
  }
}