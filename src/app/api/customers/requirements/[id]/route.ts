import { NextRequest, NextResponse } from 'next/server';
import { authenticateCustomerRequest } from '@/lib/auth';
import {
  getRequirementById,
  updateRequirement,
  deleteRequirement
} from '@/lib/services/requirement-service';

// GET /api/customers/requirements/[id]
// Retrieves a specific requirement by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check customer authentication
    const user = await authenticateCustomerRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get customer ID from the authenticated user
    const customerId = (user as any).customerId;
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID not found in token' },
        { status: 400 }
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

    // Check if the requirement belongs to the authenticated customer
    if (requirement.customerId !== customerId) {
      return NextResponse.json(
        { error: 'Unauthorized to access this requirement' },
        { status: 403 }
      );
    }

    // Return the requirement
    return NextResponse.json(requirement);
  } catch (error) {
    console.error('Error retrieving requirement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/customers/requirements/[id]
// Updates a specific requirement by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check customer authentication
    const user = await authenticateCustomerRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get customer ID from the authenticated user
    const customerId = (user as any).customerId;
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID not found in token' },
        { status: 400 }
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

    // Get existing requirement to check ownership
    const existingRequirement = await getRequirementById(id);
    if (!existingRequirement) {
      return NextResponse.json(
        { error: 'Requirement not found' },
        { status: 404 }
      );
    }

    // Check if the requirement belongs to the authenticated customer
    if (existingRequirement.customerId !== customerId) {
      return NextResponse.json(
        { error: 'Unauthorized to update this requirement' },
        { status: 403 }
      );
    }

    // Get updated requirement data from request body
    const updateData = await request.json();
    
    // Validate required fields
    if (!updateData.productName || !updateData.details || !updateData.email) {
      return NextResponse.json(
        { error: 'Product name, details, and email are required' },
        { status: 400 }
      );
    }

    // Update the requirement
    const updatedRequirement = await updateRequirement(id, {
      productName: updateData.productName,
      details: updateData.details,
      email: updateData.email
    });

    if (!updatedRequirement) {
      return NextResponse.json(
        { error: 'Failed to update requirement' },
        { status: 500 }
      );
    }

    // Return the updated requirement
    return NextResponse.json(updatedRequirement);
  } catch (error) {
    console.error('Error updating requirement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/requirements/[id]
// Deletes a specific requirement by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check customer authentication
    const user = await authenticateCustomerRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get customer ID from the authenticated user
    const customerId = (user as any).customerId;
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID not found in token' },
        { status: 400 }
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

    // Get existing requirement to check ownership
    const existingRequirement = await getRequirementById(id);
    if (!existingRequirement) {
      return NextResponse.json(
        { error: 'Requirement not found' },
        { status: 404 }
      );
    }

    // Check if the requirement belongs to the authenticated customer
    if (existingRequirement.customerId !== customerId) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this requirement' },
        { status: 403 }
      );
    }

    // Delete the requirement
    const deleted = await deleteRequirement(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete requirement' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting requirement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}