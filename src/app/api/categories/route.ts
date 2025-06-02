import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllCategories, 
  createCategory,
  CategoryCreateInput
} from '@/lib/services/category-service';
import { authenticateRequest } from '@/lib/auth';

// GET - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const categories = await getAllCategories();
    
    return NextResponse.json({ categories }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Categories GET error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create a new category
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
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { message: 'Category name is required' },
        { status: 400 }
      );
    }
    
    // Validate status if provided
    if (data.status && !['Active', 'Inactive'].includes(data.status)) {
      return NextResponse.json(
        { message: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Create new category input
    const categoryInput: CategoryCreateInput = {
      name: data.name,
      slug: data.slug || '', // Let the service generate a slug if not provided
      description: data.description || '',
      status: data.status || 'Active'
    };
    
    // Create the category
    const category = await createCategory(categoryInput);
    
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Categories POST error:', error);
    return NextResponse.json(
      { message: 'Failed to create category' },
      { status: 500 }
    );
  }
}