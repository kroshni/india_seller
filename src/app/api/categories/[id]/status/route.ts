import { NextRequest, NextResponse } from 'next/server';
import { updateCategoryStatus } from '@/lib/services/category-service';

// PATCH - Update category status
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // In Next.js 14+, params is not a promise, so we don't need to await it
    const id = context.params.id;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Validate status field
    if (!data.status || !['Active', 'Inactive'].includes(data.status)) {
      return NextResponse.json(
        { message: 'Valid status (Active/Inactive) is required' },
        { status: 400 }
      );
    }
    
    const category = await updateCategoryStatus(id, data.status);
    
    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error(`Category status update error for ID ${context.params.id}:`, error);
    return NextResponse.json(
      { message: 'Failed to update category status' },
      { status: 500 }
    );
  }
} 