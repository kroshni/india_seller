import { NextRequest, NextResponse } from 'next/server';
import { getAllSellers } from '@/lib/services/seller-service';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching featured sellers');
    
    // First try to get high-scoring sellers (top tier)
    const { sellers: topTierSellers } = await getAllSellers({ 
      minTopScorer: 70,
      status: 'Active',
      kycStatus: 'Verified',
      limit: 4,
      sortBy: 'isTopScorer',
      sortOrder: 'desc'
    });
    
    // If we have enough top tier sellers, return them
    if (topTierSellers.length >= 2) {
      console.log(`Found ${topTierSellers.length} top tier featured sellers (score > 70)`);
      return NextResponse.json({ sellers: topTierSellers });
    }
    
    // If not enough top tier sellers, try a lower threshold
    console.log(`Not enough top tier sellers (${topTierSellers.length}), trying secondary tier...`);
    
    const { sellers: secondaryTierSellers } = await getAllSellers({ 
      minTopScorer: 50,  // Lower threshold
      status: 'Active',
      kycStatus: 'Verified',
      limit: 4,
      sortBy: 'isTopScorer',
      sortOrder: 'desc'
    });
    
    if (secondaryTierSellers.length > 0) {
      console.log(`Found ${secondaryTierSellers.length} secondary tier featured sellers (score > 50)`);
      return NextResponse.json({ sellers: secondaryTierSellers });
    }
    
    // If still not enough, just get any active sellers
    console.log('Not enough secondary tier sellers, trying any active sellers...');
    
    const { sellers: anySellers } = await getAllSellers({ 
      status: 'Active',
      limit: 4,
      sortBy: 'isTopScorer',
      sortOrder: 'desc'
    });
    
    console.log(`Found ${anySellers.length} active sellers`);
    return NextResponse.json({ sellers: anySellers });
    
  } catch (error) {
    console.error('Error fetching featured sellers:', error);
    
    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch featured sellers',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 