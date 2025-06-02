import { NextRequest, NextResponse } from 'next/server';
import { authenticateSellerRequest } from '@/lib/auth';
import { getRequirementById } from '@/lib/services/requirement-service';

// GET /api/admin/requirements/[id]
// Retrieves a specific customer requirement by ID for admin view
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check seller authentication (admin)
    const user = await authenticateSellerRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get requirement ID from URL params
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: 'Requirement ID is required' },
        { status: 400 }
      );
    }

    // Get requirement by ID
    const requirement = await getRequirementById(id);
    if (!requirement) {
      return NextResponse.json(
        { error: 'Requirement not found' },
        { status: 404 }
      );
    }

    // Return the requirement
    return NextResponse.json(requirement);
  } catch (error) {
    console.error('Error retrieving requirement for admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}