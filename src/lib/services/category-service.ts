import { v4 as uuidv4 } from 'uuid';
import { getClient, isDbConnected, Category as CassandraCategory } from '../cassandra';
import { 
  loadCategories, 
  saveCategories, 
  addCategory as addToLocalStorage,
  updateCategoryInStorage,
  deleteCategoryFromStorage
} from '../local-storage';

// Define types - use the interface from cassandra.ts
export type Category = CassandraCategory;

export type CategoryCreateInput = Omit<Category, 'id' | 'productCount' | 'createdAt' | 'updatedAt'>;
export type CategoryUpdateInput = Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>;

// In-memory storage for development - will be initialized from localStorage if available
let mockCategories: Category[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    status: 'Active',
    productCount: 42,
    createdAt: new Date(2023, 6, 15).toISOString(),
    updatedAt: new Date(2023, 6, 15).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Apparel and fashion items',
    status: 'Active',
    productCount: 128,
    createdAt: new Date(2023, 5, 10).toISOString(),
    updatedAt: new Date(2023, 7, 5).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Home appliances and kitchen essentials',
    status: 'Active',
    productCount: 76,
    createdAt: new Date(2023, 4, 22).toISOString(),
    updatedAt: new Date(2023, 4, 22).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Books',
    slug: 'books',
    description: 'Books across all genres',
    status: 'Inactive',
    productCount: 210,
    createdAt: new Date(2023, 3, 5).toISOString(),
    updatedAt: new Date(2023, 8, 1).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Sports equipment and outdoor gear',
    status: 'Active',
    productCount: 65,
    createdAt: new Date(2023, 7, 12).toISOString(),
    updatedAt: new Date(2023, 7, 12).toISOString()
  }
];

// Initialize mock data from localStorage if available
if (typeof window !== 'undefined') {
  const storedCategories = loadCategories();
  if (storedCategories && storedCategories.length > 0) {
    console.log('Initializing categories from localStorage:', storedCategories.length);
    mockCategories = storedCategories;
  } else {
    // Store initial mock data to localStorage
    saveCategories(mockCategories);
  }
}

// Environment check - use this to toggle between mock and real data
// Force a check for database connection on each request
const DEBUG = process.env.DEBUG_CATEGORIES === 'true';

// Helper function to log debugging information
function log(...args: any[]) {
  if (DEBUG) {
    console.log('[CategoryService]', ...args);
  }
}

// Helper to check if we should use mock data
function shouldUseMockData(): boolean {
  // Always check connection status on each request
  const connected = isDbConnected();
  const useMock = !connected;
  
  if (useMock) {
    log('Database not connected, using mock data');
  }
  
  return useMock;
}

// Helper to generate a slug from a name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// CRUD Operations
export async function getAllCategories(): Promise<Category[]> {
  log('Getting all categories');
  
  if (shouldUseMockData()) {
    log('Using mock data');
    
    // Try to load from localStorage first (for client-side)
    if (typeof window !== 'undefined') {
      const storedCategories = loadCategories();
      if (storedCategories && storedCategories.length > 0) {
        return storedCategories;
      }
    }
    
    return [...mockCategories];
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      return [...mockCategories];
    }

    const result = await client.execute('SELECT * FROM categories');
    
    return result.rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      slug: row.slug,
      description: row.description,
      status: row.status as 'Active' | 'Inactive',
      productCount: row.product_count,
      createdAt: row.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
    }));
  } catch (error) {
    log('Error getting all categories:', error);
    log('Falling back to mock data');
    return [...mockCategories];
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  log(`Getting category by ID: ${id}`);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    const category = mockCategories.find(c => c.id === id);
    return category || null;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      const category = mockCategories.find(c => c.id === id);
      return category || null;
    }

    const result = await client.execute('SELECT * FROM categories WHERE id = ?', [id], { prepare: true });
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id.toString(),
      name: row.name,
      slug: row.slug,
      description: row.description,
      status: row.status as 'Active' | 'Inactive',
      productCount: row.product_count,
      createdAt: row.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
    };
  } catch (error) {
    log('Error getting category by ID:', error);
    log('Falling back to mock data');
    const category = mockCategories.find(c => c.id === id);
    return category || null;
  }
}

export async function createCategory(data: CategoryCreateInput): Promise<Category> {
  log('Creating new category:', data);
  
  const now = new Date();
  const id = uuidv4();
  const slug = data.slug || generateSlug(data.name);
  
  const newCategory: Category = {
    id,
    name: data.name,
    slug,
    description: data.description,
    status: data.status,
    productCount: 0,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
  
  if (shouldUseMockData()) {
    log('Using mock data for category creation');
    mockCategories.push(newCategory);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      addToLocalStorage(newCategory);
    }
    
    return newCategory;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      mockCategories.push(newCategory);
      
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        addToLocalStorage(newCategory);
      }
      
      return newCategory;
    }

    console.log('Saving category to database:', newCategory);
    
    await client.execute(
      'INSERT INTO categories (id, name, slug, description, status, product_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        data.name,
        slug,
        data.description,
        data.status,
        0,
        now,
        now
      ],
      { prepare: true }
    );
    
    console.log('Category saved successfully to database');
    return newCategory;
  } catch (error) {
    console.error('Error creating category in database:', error);
    log('Falling back to mock data');
    mockCategories.push(newCategory);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      addToLocalStorage(newCategory);
    }
    
    return newCategory;
  }
}

export async function updateCategory(id: string, data: CategoryUpdateInput): Promise<Category | null> {
  log(`Updating category ${id} with:`, data);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    const index = mockCategories.findIndex(c => c.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const now = new Date();
    const updatedCategory = {
      ...mockCategories[index],
      ...data,
      updatedAt: now.toISOString()
    };
    
    mockCategories[index] = updatedCategory;
    
    // Update in localStorage using our dedicated function
    if (typeof window !== 'undefined') {
      console.log('Updating category in localStorage (fallback):', id);
      updateCategoryInStorage(id, data);
    }
    
    return updatedCategory;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      const index = mockCategories.findIndex(c => c.id === id);
      
      if (index === -1) {
        return null;
      }
      
      const now = new Date();
      const updatedCategory = {
        ...mockCategories[index],
        ...data,
        updatedAt: now.toISOString()
      };
      
      mockCategories[index] = updatedCategory;
      
      // Update in localStorage using our dedicated function
      if (typeof window !== 'undefined') {
        console.log('Updating category in localStorage (fallback):', id);
        updateCategoryInStorage(id, data);
      }
      
      return updatedCategory;
    }

    // First check if the category exists
    const existing = await getCategoryById(id);
    if (!existing) {
      return null;
    }
    
    const now = new Date();
    
    // Construct query dynamically based on provided fields
    let query = 'UPDATE categories SET updated_at = ?';
    const params: any[] = [now];
    
    if (data.name) {
      query += ', name = ?';
      params.push(data.name);
    }
    
    if (data.slug) {
      query += ', slug = ?';
      params.push(data.slug);
    } else if (data.name && !data.slug) {
      // Auto-update slug if name changes but slug is not provided
      const newSlug = generateSlug(data.name);
      query += ', slug = ?';
      params.push(newSlug);
    }
    
    if (data.description !== undefined) {
      query += ', description = ?';
      params.push(data.description);
    }
    
    if (data.status) {
      query += ', status = ?';
      params.push(data.status);
    }
    
    if (data.productCount !== undefined) {
      query += ', product_count = ?';
      params.push(data.productCount);
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    await client.execute(query, params, { prepare: true });
    
    // Return the updated category
    return {
      ...existing,
      ...data,
      updatedAt: now.toISOString()
    };
  } catch (error) {
    log('Error updating category:', error);
    log('Falling back to mock data');
    
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) {
      return null;
    }
    
    const now = new Date();
    const updatedCategory = {
      ...mockCategories[index],
      ...data,
      updatedAt: now.toISOString()
    };
    
    mockCategories[index] = updatedCategory;
    
    // Update in localStorage using our dedicated function
    if (typeof window !== 'undefined') {
      console.log('Updating category in localStorage (error fallback):', id);
      updateCategoryInStorage(id, data);
    }
    
    return updatedCategory;
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  log(`Deleting category ${id}`);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    const index = mockCategories.findIndex(c => c.id === id);
    
    if (index === -1) {
      return false;
    }
    
    mockCategories.splice(index, 1);
    
    // Remove from localStorage using our dedicated function
    if (typeof window !== 'undefined') {
      console.log('Deleting category from localStorage (fallback):', id);
      deleteCategoryFromStorage(id);
    }
    
    return true;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      const index = mockCategories.findIndex(c => c.id === id);
      
      if (index === -1) {
        return false;
      }
      
      mockCategories.splice(index, 1);
      
      // Remove from localStorage using our dedicated function
      if (typeof window !== 'undefined') {
        console.log('Deleting category from localStorage (fallback):', id);
        deleteCategoryFromStorage(id);
      }
      
      return true;
    }

    // First check if the category exists
    const existing = await getCategoryById(id);
    if (!existing) {
      return false;
    }
    
    await client.execute('DELETE FROM categories WHERE id = ?', [id], { prepare: true });
    
    return true;
  } catch (error) {
    log('Error deleting category:', error);
    log('Falling back to mock data');
    
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) {
      return false;
    }
    
    mockCategories.splice(index, 1);
    
    // Remove from localStorage using our dedicated function
    if (typeof window !== 'undefined') {
      console.log('Deleting category from localStorage (error fallback):', id);
      deleteCategoryFromStorage(id);
    }
    
    return true;
  }
}

export async function updateCategoryStatus(id: string, status: 'Active' | 'Inactive'): Promise<Category | null> {
  log(`Updating category ${id} status to ${status}`);
  return updateCategory(id, { status });
} 