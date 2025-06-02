import { NextRequest, NextResponse } from 'next/server';
import { getSellerById } from '@/lib/services/seller-service';
import { authenticateRequest } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    console.log(`Getting public seller details for ID: ${id}`);
    
    if (!id) {
      return NextResponse.json(
        { error: 'Seller ID is required' },
        { status: 400 }
      );
    }

    // Get seller data from database
    const sellerData = await getSellerById(id);
    
    if (!sellerData) {
      console.log(`No seller found with ID: ${id}`);
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    // Extract only the public seller data (removing confidential information)
    const publicSellerData = {
      seller: {
        id: sellerData.seller.id,
        name: sellerData.seller.name,
        email: sellerData.seller.email,
        phone: sellerData.seller.phone,
        profilePicture: sellerData.seller.profilePicture,
        isTopScorer: sellerData.seller.isTopScorer,
        kycStatus: sellerData.seller.kycStatus,
        status: sellerData.seller.status,
        createdAt: sellerData.seller.createdAt
      },
      business: {
        companyName: sellerData.business.companyName
      },
      addresses: sellerData.addresses.map(address => ({
        id: address.id,
        addressType: address.addressType,
        city: address.city,
        state: address.state,
        country: address.country,
        image: address.image
      })),
      // No documents - these are confidential
      gallery: sellerData.gallery
    };
    
    console.log(`Successfully retrieved public seller data for ID: ${id}`);
    return NextResponse.json(publicSellerData);
  } catch (error) {
    console.error('Error fetching public seller data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seller' },
      { status: 500 }
    );
  }
}