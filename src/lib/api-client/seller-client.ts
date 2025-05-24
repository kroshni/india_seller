import { Seller, SellerFilters, SellerBulkUpdateInput } from '@/lib/services/seller-service';

// Type for pagination response
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

// Generic API response
interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
}

// Get all sellers with filtering and pagination
export async function getSellers(filters: SellerFilters = {}): Promise<PaginatedResponse<Seller>> {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.kycStatus) queryParams.append('kycStatus', filters.kycStatus);
    if (filters.minTopScorer !== undefined) queryParams.append('minTopScorer', filters.minTopScorer.toString());
    if (filters.maxTopScorer !== undefined) queryParams.append('maxTopScorer', filters.maxTopScorer.toString());
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);
    
    const url = `/api/sellers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sellers: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      data: data.sellers,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return {
      data: [],
      pagination: {
        total: 0,
        currentPage: 1,
        totalPages: 0,
        limit: 10,
      },
    };
  }
}

// Get a single seller by ID
export async function getSellerById(id: string): Promise<any> {
  try {
    const response = await fetch(`/api/sellers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch seller: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching seller with ID ${id}:`, error);
    throw error;
  }
}

// Create a new seller
export async function createSeller(sellerData: any): Promise<string> {
  try {
    const response = await fetch('/api/sellers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sellerData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create seller');
    }
    
    const data = await response.json();
    return data.sellerId;
  } catch (error) {
    console.error('Error creating seller:', error);
    throw error;
  }
}

// Update a seller
export async function updateSeller(id: string, sellerData: any): Promise<boolean> {
  try {
    const response = await fetch(`/api/sellers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sellerData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update seller');
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating seller with ID ${id}:`, error);
    return false;
  }
}

// Delete a seller
export async function deleteSeller(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/sellers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete seller');
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting seller with ID ${id}:`, error);
    return false;
  }
}

// Update seller status
export async function updateSellerStatus(id: string, status: 'Active' | 'Inactive'): Promise<boolean> {
  try {
    const response = await fetch(`/api/sellers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update seller status');
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating status for seller with ID ${id}:`, error);
    return false;
  }
}

// Update seller KYC status
export async function updateSellerKycStatus(id: string, kycStatus: 'Verified' | 'Pending'): Promise<boolean> {
  try {
    const response = await fetch(`/api/sellers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kycStatus }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update seller KYC status');
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating KYC status for seller with ID ${id}:`, error);
    return false;
  }
}

// Update seller top scorer percentage
export async function updateSellerTopScorer(id: string, isTopScorer: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/sellers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isTopScorer }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update seller top scorer');
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating top scorer for seller with ID ${id}:`, error);
    return false;
  }
}

// Bulk update sellers
export async function bulkUpdateSellers(data: SellerBulkUpdateInput): Promise<boolean> {
  try {
    const response = await fetch('/api/sellers', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to bulk update sellers');
    }
    
    return true;
  } catch (error) {
    console.error('Error bulk updating sellers:', error);
    return false;
  }
}

// Bulk delete sellers
export async function bulkDeleteSellers(sellerIds: string[]): Promise<boolean> {
  try {
    const response = await fetch('/api/sellers', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sellerIds }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to bulk delete sellers');
    }
    
    return true;
  } catch (error) {
    console.error('Error bulk deleting sellers:', error);
    return false;
  }
} 