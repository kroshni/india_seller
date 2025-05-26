import { Category, CategoryCreateInput, CategoryUpdateInput } from '../services/category-service';

// Helper function to add a cache buster to requests
const addCacheBuster = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${Date.now()}`;
};

// Get all categories
export async function getCategories(): Promise<{ categories: Category[] }> {
  try {
    const response = await fetch(addCacheBuster('/api/categories'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

// Get a single category by ID
export async function getCategoryById(id: string): Promise<{ category: Category | null }> {
  try {
    const response = await fetch(addCacheBuster(`/api/categories/${id}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
}

// Create a new category
export async function createCategory(data: CategoryCreateInput): Promise<{ category: Category }> {
  try {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to create category: ${response.status} - ${errorData.message || ''}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

// Update an existing category
export async function updateCategory(id: string, data: CategoryUpdateInput): Promise<{ category: Category | null }> {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to update category: ${response.status} - ${errorData.message || ''}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating category ${id}:`, error);
    throw error;
  }
}

// Delete a category
export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to delete category: ${response.status} - ${errorData.message || ''}`);
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error);
    throw error;
  }
}

// Update category status
export async function updateCategoryStatus(id: string, status: 'Active' | 'Inactive'): Promise<{ category: Category | null }> {
  try {
    const response = await fetch(`/api/categories/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to update category status: ${response.status} - ${errorData.message || ''}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating category ${id} status:`, error);
    throw error;
  }
} 