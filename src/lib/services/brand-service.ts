import { v4 as uuidv4 } from 'uuid';
import { getClient, isDbConnected, Brand as CassandraBrand } from '../cassandra';
import { 
  loadBrands, 
  saveBrands, 
  addBrand as addToLocalStorage,
  updateBrandInStorage,
  deleteBrandFromStorage
} from '../local-storage';

// Define types - use the interface from cassandra.ts
export type Brand = CassandraBrand;

export type BrandCreateInput = Omit<Brand, 'id' | 'productCount' | 'createdAt' | 'updatedAt'>;
export type BrandUpdateInput = Partial<Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>>;

// In-memory storage for development - will be initialized from localStorage if available
let mockBrands: Brand[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    name: 'Apple',
    slug: 'apple',
    logo: 'https://example.com/logos/apple.png',
    status: 'Active',
    productCount: 42,
    createdAt: new Date(2023, 6, 15).toISOString(),
    updatedAt: new Date(2023, 6, 15).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    name: 'Samsung',
    slug: 'samsung',
    logo: 'https://example.com/logos/samsung.png',
    status: 'Active',
    productCount: 128,
    createdAt: new Date(2023, 5, 10).toISOString(),
    updatedAt: new Date(2023, 7, 5).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    name: 'Sony',
    slug: 'sony',
    logo: 'https://example.com/logos/sony.png',
    status: 'Active',
    productCount: 76,
    createdAt: new Date(2023, 4, 22).toISOString(),
    updatedAt: new Date(2023, 4, 22).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013',
    name: 'LG',
    slug: 'lg',
    logo: 'https://example.com/logos/lg.png',
    status: 'Inactive',
    productCount: 45,
    createdAt: new Date(2023, 3, 5).toISOString(),
    updatedAt: new Date(2023, 8, 1).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440014',
    name: 'HP',
    slug: 'hp',
    logo: 'https://example.com/logos/hp.png',
    status: 'Active',
    productCount: 65,
    createdAt: new Date(2023, 7, 12).toISOString(),
    updatedAt: new Date(2023, 7, 12).toISOString()
  }
];

// Initialize mock data from localStorage if available
if (typeof window !== 'undefined') {
  const storedBrands = loadBrands();
  if (storedBrands && storedBrands.length > 0) {
    console.log('Initializing brands from localStorage:', storedBrands.length);
    mockBrands = storedBrands;
  } else {
    // Store initial mock data to localStorage
    saveBrands(mockBrands);
  }
}

// Environment check - use this to toggle between mock and real data
// Force a check for database connection on each request
const DEBUG = process.env.DEBUG_BRANDS === 'true';

// Helper function to log debugging information
function log(...args: any[]) {
  if (DEBUG) {
    console.log('[BrandService]', ...args);
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
export async function getAllBrands(): Promise<Brand[]> {
  log('Getting all brands');
  
  if (shouldUseMockData()) {
    log('Using mock data');
    
    // Try to load from localStorage first (for client-side)
    if (typeof window !== 'undefined') {
      const storedBrands = loadBrands();
      if (storedBrands && storedBrands.length > 0) {
        return storedBrands;
      }
    }
    
    return [...mockBrands];
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      return [...mockBrands];
    }

    const result = await client.execute('SELECT * FROM brands');
    
    return result.rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      slug: row.slug,
      logo: row.logo,
      status: row.status as 'Active' | 'Inactive',
      productCount: row.product_count,
      createdAt: row.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
    }));
  } catch (error) {
    log('Error getting all brands:', error);
    log('Falling back to mock data');
    return [...mockBrands];
  }
}

export async function getBrandById(id: string): Promise<Brand | null> {
  log(`Getting brand by ID: ${id}`);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    const brand = mockBrands.find(b => b.id === id);
    return brand || null;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      const brand = mockBrands.find(b => b.id === id);
      return brand || null;
    }

    const result = await client.execute('SELECT * FROM brands WHERE id = ?', [id], { prepare: true });
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id.toString(),
      name: row.name,
      slug: row.slug,
      logo: row.logo,
      status: row.status as 'Active' | 'Inactive',
      productCount: row.product_count,
      createdAt: row.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
    };
  } catch (error) {
    log('Error getting brand by ID:', error);
    log('Falling back to mock data');
    const brand = mockBrands.find(b => b.id === id);
    return brand || null;
  }
}

export async function createBrand(data: BrandCreateInput): Promise<Brand> {
  log('Creating new brand:', data);
  
  const now = new Date();
  const id = uuidv4();
  const slug = data.slug || generateSlug(data.name);
  
  const newBrand: Brand = {
    id,
    name: data.name,
    slug,
    logo: data.logo,
    status: data.status,
    productCount: 0,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
  
  if (shouldUseMockData()) {
    log('Using mock data for brand creation');
    mockBrands.push(newBrand);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      addToLocalStorage(newBrand);
    }
    
    return newBrand;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      mockBrands.push(newBrand);
      
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        addToLocalStorage(newBrand);
      }
      
      return newBrand;
    }

    console.log('Saving brand to database:', newBrand);
    
    await client.execute(
      'INSERT INTO brands (id, name, slug, logo, status, product_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        data.name,
        slug,
        data.logo || null,
        data.status,
        0,
        now,
        now
      ],
      { prepare: true }
    );
    
    console.log('Brand saved successfully to database');
    return newBrand;
  } catch (error) {
    console.error('Error creating brand in database:', error);
    log('Falling back to mock data');
    mockBrands.push(newBrand);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      addToLocalStorage(newBrand);
    }
    
    return newBrand;
  }
}

export async function updateBrand(id: string, data: BrandUpdateInput): Promise<Brand | null> {
  log(`Updating brand ${id} with:`, data);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    const index = mockBrands.findIndex(b => b.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const now = new Date();
    const updatedBrand = {
      ...mockBrands[index],
      ...data,
      updatedAt: now.toISOString()
    };
    
    mockBrands[index] = updatedBrand;
    
    // Update in localStorage using our dedicated function
    if (typeof window !== 'undefined') {
      console.log('Updating brand in localStorage:', id);
      updateBrandInStorage(id, data);
    }
    
    return updatedBrand;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      const index = mockBrands.findIndex(b => b.id === id);
      
      if (index === -1) {
        return null;
      }
      
      const now = new Date();
      const updatedBrand = {
        ...mockBrands[index],
        ...data,
        updatedAt: now.toISOString()
      };
      
      mockBrands[index] = updatedBrand;
      
      // Update in localStorage using our dedicated function
      if (typeof window !== 'undefined') {
        console.log('Updating brand in localStorage (fallback):', id);
        updateBrandInStorage(id, data);
      }
      
      return updatedBrand;
    }

    // First check if the brand exists
    const existing = await getBrandById(id);
    if (!existing) {
      return null;
    }
    
    const now = new Date();
    
    // Construct query dynamically based on provided fields
    let query = 'UPDATE brands SET updated_at = ?';
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
    
    if (data.logo !== undefined) {
      query += ', logo = ?';
      params.push(data.logo);
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
    
    // Return the updated brand
    return {
      ...existing,
      ...data,
      updatedAt: now.toISOString()
    };
  } catch (error) {
    log('Error updating brand:', error);
    log('Falling back to mock data');
    
    const index = mockBrands.findIndex(b => b.id === id);
    if (index === -1) {
      return null;
    }
    
    const now = new Date();
    const updatedBrand = {
      ...mockBrands[index],
      ...data,
      updatedAt: now.toISOString()
    };
    
    mockBrands[index] = updatedBrand;
    
    // Update in localStorage using our dedicated function
    if (typeof window !== 'undefined') {
      console.log('Updating brand in localStorage (error fallback):', id);
      updateBrandInStorage(id, data);
    }
    
    return updatedBrand;
  }
}

export async function deleteBrand(id: string): Promise<boolean> {
  log(`Deleting brand ${id}`);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    const index = mockBrands.findIndex(b => b.id === id);
    
    if (index === -1) {
      return false;
    }
    
    mockBrands.splice(index, 1);
    
    // Remove from localStorage using our dedicated function
    if (typeof window !== 'undefined') {
      console.log('Deleting brand from localStorage:', id);
      deleteBrandFromStorage(id);
    }
    
    return true;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      const index = mockBrands.findIndex(b => b.id === id);
      
      if (index === -1) {
        return false;
      }
      
      mockBrands.splice(index, 1);
      
      // Remove from localStorage using our dedicated function
      if (typeof window !== 'undefined') {
        console.log('Deleting brand from localStorage (fallback):', id);
        deleteBrandFromStorage(id);
      }
      
      return true;
    }

    // First check if the brand exists
    const existing = await getBrandById(id);
    if (!existing) {
      return false;
    }
    
    await client.execute('DELETE FROM brands WHERE id = ?', [id], { prepare: true });
    
    return true;
  } catch (error) {
    log('Error deleting brand:', error);
    log('Falling back to mock data');
    
    const index = mockBrands.findIndex(b => b.id === id);
    if (index === -1) {
      return false;
    }
    
    mockBrands.splice(index, 1);
    
    // Remove from localStorage using our dedicated function
    if (typeof window !== 'undefined') {
      console.log('Deleting brand from localStorage (error fallback):', id);
      deleteBrandFromStorage(id);
    }
    
    return true;
  }
}

export async function updateBrandStatus(id: string, status: 'Active' | 'Inactive'): Promise<Brand | null> {
  log(`Updating brand ${id} status to ${status}`);
  return updateBrand(id, { status });
} 