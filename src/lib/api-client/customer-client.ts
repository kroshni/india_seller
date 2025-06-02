import { Customer, CustomerFilters, CreateCustomerInput } from '../services/customer-service';

export async function getCustomers(filters: CustomerFilters = {}) {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);
    
    const queryString = queryParams.toString();
    const url = `/api/customers${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching customers: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getCustomers client function:', error);
    throw error;
  }
}

export async function getCustomerById(id: string) {
  try {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Check specifically for 404 status
      if (response.status === 404) {
        return null; // Return null for not found instead of throwing error
      }
      throw new Error(`Error fetching customer: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getCustomerById client function:', error);
    throw error;
  }
}

export async function createCustomer(data: CreateCustomerInput) {
  try {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error creating customer: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in createCustomer client function:', error);
    throw error;
  }
}

export async function updateCustomer(id: string, data: Partial<CreateCustomerInput>) {
  try {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating customer: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in updateCustomer client function:', error);
    throw error;
  }
}

export async function deleteCustomer(id: string) {
  try {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting customer: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in deleteCustomer client function:', error);
    throw error;
  }
}

export async function updateCustomerStatus(id: string, status: 'Active' | 'Inactive') {
  try {
    const response = await fetch(`/api/customers/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error(`Error updating customer status: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in updateCustomerStatus client function:', error);
    throw error;
  }
}

export async function bulkUpdateCustomers(customerIds: string[], status: 'Active' | 'Inactive') {
  try {
    const response = await fetch('/api/customers', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerIds, status }),
    });
    
    if (!response.ok) {
      throw new Error(`Error bulk updating customers: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in bulkUpdateCustomers client function:', error);
    throw error;
  }
}