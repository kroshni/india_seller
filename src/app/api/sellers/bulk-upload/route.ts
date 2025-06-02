import { NextRequest, NextResponse } from 'next/server';
import { createSeller } from '@/lib/services/seller-service';
import { formatSellerData } from '@/lib/validations/seller-validation';
import { authenticateRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
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
            // Log the data we're working with to help debugging
            console.log(`Processing row ${rowIndex}, data keys:`, Object.keys(rawSellerData));
            
            // Format the seller data to match our API schema
            const formattedSellerData = formatSellerData(rawSellerData);
            
            // Log the formatted data structure
            console.log(`Formatted data for row ${rowIndex}:`, JSON.stringify({
              name: formattedSellerData.name,
              email: formattedSellerData.email,
              hasProducts: Array.isArray(formattedSellerData.products),
              numAddresses: formattedSellerData.addresses?.length,
              numDocuments: formattedSellerData.documents?.length,
              numGalleryItems: formattedSellerData.gallery?.length
            }));
            
            // Additional validation that might not be caught in the frontend
            // Case-insensitive field access
            const getName = () => {
              const nameKey = Object.keys(rawSellerData).find(k => 
                k.toLowerCase() === 'name'
              );
              return nameKey ? rawSellerData[nameKey] : null;
            };
            
            const getEmail = () => {
              const emailKey = Object.keys(rawSellerData).find(k => 
                k.toLowerCase() === 'email'
              );
              return emailKey ? rawSellerData[emailKey] : null;
            };
            
            const name = getName();
            const email = getEmail();
            
            if (!name || !email) {
              let missingFields = [];
              if (!name) missingFields.push('Name');
              if (!email) missingFields.push('Email');
              throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }
            
            // Create the seller
            const sellerId = await createSeller(formattedSellerData);
            
            if (!sellerId) {
              throw new Error('Failed to create seller record - database operation failed');
            }
            
            return { success: true, sellerId };
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Error processing row ${rowIndex}:`, message);
            
            if (error instanceof Error && error.stack) {
              console.error(`Stack trace for row ${rowIndex}:`, error.stack);
            }
            
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
        message: 'An unexpected error occurred during import',
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        totalProcessed: 0,
        successCount: 0,
        failureCount: 0,
        failures: []
      },
      { status: 500 }
    );
  }
}