import { NextRequest, NextResponse } from 'next/server';
import { 
  getCategoryById,
  updateCategory,
  deleteCategory,
  CategoryUpdateInput 
} from '@/lib/services/category-service';
import { authenticateRequest } from '@/lib/auth';

// GET - Fetch a single category by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
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
    
    const id = context.params.id;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    const category = await getCategoryById(id);
    
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ category }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error(`Category GET error for ID ${context.params.id}:`, error);
    return NextResponse.json(
      { message: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - Update a category
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
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
    
    const id = context.params.id;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Validate basic fields
    if (data.status && !['Active', 'Inactive'].includes(data.status)) {
      return NextResponse.json(
        { message: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    const updateData: CategoryUpdateInput = {};
    
    // Only include defined fields
    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.productCount !== undefined) updateData.productCount = data.productCount;
    
    const category = await updateCategory(id, updateData);
    
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error(`Category PUT error for ID ${context.params.id}:`, error);
    return NextResponse.json(
      { message: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a category
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
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
    
    const id = context.params.id;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    const success = await deleteCategory(id);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`Category DELETE error for ID ${context.params.id}:`, error);
    return NextResponse.json(
      { message: 'Failed to delete category' },
      { status: 500 }
    );
  }
}