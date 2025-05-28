import { NextRequest, NextResponse } from 'next/server';
import { createSeller } from '@/lib/services/seller-service';
import { formatSellerData } from '@/lib/validations/seller-validation';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { sellers } = body;
    
    if (!Array.isArray(sellers) || sellers.length === 0) {
      return NextResponse.json(
        { error: 'No sellers provided or invalid format' },
        { status: 400 }
      );
    }
    
    console.log(`Processing bulk upload of ${sellers.length} sellers`);
    
    // Process each seller
    const results = {
      totalProcessed: sellers.length,
      successCount: 0,
      failureCount: 0,
      failures: [] as Array<{ row: number; reason: string }>,
    };
    
    // Set a batch size to avoid overwhelming the database
    const BATCH_SIZE = 10;
    const batches = Math.ceil(sellers.length / BATCH_SIZE);
    
    for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
      const batchStart = batchIndex * BATCH_SIZE;
      const batchEnd = Math.min(batchStart + BATCH_SIZE, sellers.length);
      const batch = sellers.slice(batchStart, batchEnd);
      
      console.log(`Processing batch ${batchIndex + 1}/${batches} (${batch.length} sellers)`);
      
      // Process batch in parallel with Promise.all
      const batchResults = await Promise.allSettled(
        batch.map(async (rawSellerData: any, index: number) => {
          const rowIndex = batchStart + index + 1; // +1 for human-readable row number
          
          try {
            // Format the seller data to match our API schema
            const formattedSellerData = formatSellerData(rawSellerData);
            
            // Additional validation that might not be caught in the frontend
            if (!formattedSellerData.email || !formattedSellerData.name) {
              throw new Error('Missing required fields: name or email');
            }
            
            // Check for duplicate email (this should be handled by the database but let's catch it earlier)
            // This is simplified and would need to be properly implemented with database checks
            
            // Create the seller
            const sellerId = await createSeller(formattedSellerData);
            
            if (!sellerId) {
              throw new Error('Failed to create seller record');
            }
            
            return { success: true, sellerId };
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            
            // Add to failure list
            results.failures.push({
              row: rowIndex,
              reason: message
            });
            
            return { success: false, error: message };
          }
        })
      );
      
      // Update success/failure counts
      batchResults.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.success) {
          results.successCount++;
        } else {
          results.failureCount++;
        }
      });
    }
    
    // Check if any succeeded
    const success = results.successCount > 0;
    
    // Generate appropriate message
    let message;
    if (results.successCount === sellers.length) {
      message = `All ${results.successCount} sellers were successfully imported.`;
    } else if (results.successCount > 0) {
      message = `${results.successCount} out of ${sellers.length} sellers were successfully imported. ${results.failureCount} failed.`;
    } else {
      message = 'No sellers were imported. Please check the errors and try again.';
    }
    
    // Return the response
    return NextResponse.json({
      success,
      message,
      ...results
    });
  } catch (error) {
    console.error('Error processing bulk upload:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
} 