import { NextRequest, NextResponse } from 'next/server';
import { authenticateSellerRequest } from '../../auth/middleware';
import { uploadSellerDocument } from '@/lib/services/seller-document-service';
import { getSellerById } from '@/lib/services/seller-service';

// POST /api/seller/documents/upload - Upload a document for the authenticated seller
export async function POST(request: NextRequest) {
  try {
    // Authenticate the seller request
    const authResult = await authenticateSellerRequest(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    
    // Get the seller ID from the authenticated user
    const sellerId = authResult.user.sellerId;
    if (!sellerId) {
      return NextResponse.json({ error: 'Seller ID not found' }, { status: 400 });
    }
    
    // Verify seller exists
    const seller = await getSellerById(sellerId);
    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }
    
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const documentType = formData.get('documentType') as string;
    
    // Validate required fields
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    if (!documentType) {
      return NextResponse.json({ error: 'Document type is required' }, { status: 400 });
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds the 5MB limit' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, JPG, and PNG files are allowed' },
        { status: 400 }
      );
    }
    
    // Upload the document
    const documentId = await uploadSellerDocument(sellerId, documentType, file);
    
    return NextResponse.json(
      { message: 'Document uploaded successfully', documentId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/seller/documents/upload:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}