import { v4 as uuidv4 } from 'uuid';
import { 
  getClient, 
  isDbConnected, 
  Product as CassandraProduct,
  ProductType,
  ProductStatus,
  StockStatus,
  Visibility,
  ProductDimensions,
  CustomAttribute
} from '../cassandra';
import { 
  loadProducts, 
  saveProducts, 
  addProduct as addToLocalStorage,
  updateProductInStorage,
  deleteProductFromStorage,
  deleteBulkProductsFromStorage,
  updateBulkProductStatusInStorage
} from '../local-storage';

// Define types - use the interface from cassandra.ts
export type Product = CassandraProduct;

export type ProductCreateInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type ProductUpdateInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

// Sample mock data for products
const mockProducts: Product[] = [
  /*{
    id: '550e8400-e29b-41d4-a716-446655440100',
    sku: 'TSH-001',
    name: 'Basic Cotton T-Shirt',
    slug: 'basic-cotton-t-shirt',
    type: 'Simple',
    description: 'A comfortable 100% cotton t-shirt for everyday wear. Available in multiple colors.',
    shortDescription: 'Comfortable cotton t-shirt',
    price: 19.99,
    salePrice: 14.99,
    saleStartDate: new Date(2023, 6, 1).toISOString(),
    saleEndDate: new Date(2023, 7, 30).toISOString(),
    stockStatus: 'In Stock',
    stockQuantity: 100,
    manageStock: true,
    weight: 0.2,
    dimensions: { length: 30, width: 20, height: 2 },
    mainImage: 'https://example.com/images/tshirt.jpg',
    galleryImages: [
      'https://example.com/images/tshirt-front.jpg',
      'https://example.com/images/tshirt-back.jpg'
    ],
    categoryIds: ['550e8400-e29b-41d4-a716-446655440001'], // Clothing category
    tags: ['cotton', 't-shirt', 'casual'],
    brandId: '550e8400-e29b-41d4-a716-446655440010', // Apple brand ID
    visibility: 'Both',
    status: 'Enabled',
    customAttributes: [
      { name: 'color', value: 'White' },
      { name: 'material', value: 'Cotton' }
    ],
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 15).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    sku: 'JNS-001',
    name: 'Slim Fit Jeans',
    slug: 'slim-fit-jeans',
    type: 'Configurable',
    description: 'Slim fit jeans with stretch material for comfort. Available in multiple sizes and colors.',
    shortDescription: 'Comfortable slim fit jeans',
    price: 49.99,
    stockStatus: 'In Stock',
    stockQuantity: 75,
    manageStock: true,
    weight: 0.5,
    dimensions: { length: 40, width: 30, height: 5 },
    mainImage: 'https://example.com/images/jeans.jpg',
    galleryImages: [
      'https://example.com/images/jeans-front.jpg',
      'https://example.com/images/jeans-back.jpg'
    ],
    categoryIds: ['550e8400-e29b-41d4-a716-446655440001'], // Clothing category
    tags: ['jeans', 'denim', 'slim fit'],
    brandId: '550e8400-e29b-41d4-a716-446655440011', // Samsung brand ID
    visibility: 'Both',
    status: 'Enabled',
    customAttributes: [
      { name: 'material', value: 'Denim' },
      { name: 'fit', value: 'Slim' }
    ],
    createdAt: new Date(2023, 4, 10).toISOString(),
    updatedAt: new Date(2023, 4, 10).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    sku: 'SHS-001',
    name: 'Running Shoes',
    slug: 'running-shoes',
    type: 'Configurable',
    description: 'Lightweight running shoes with cushioned soles for maximum comfort.',
    shortDescription: 'Lightweight running shoes',
    price: 79.99,
    salePrice: 59.99,
    stockStatus: 'In Stock',
    stockQuantity: 50,
    manageStock: true,
    weight: 0.8,
    dimensions: { length: 35, width: 20, height: 15 },
    mainImage: 'https://example.com/images/shoes.jpg',
    galleryImages: [
      'https://example.com/images/shoes-side.jpg',
      'https://example.com/images/shoes-front.jpg'
    ],
    categoryIds: ['550e8400-e29b-41d4-a716-446655440002'], // Footwear category
    tags: ['shoes', 'running', 'sports'],
    brandId: '550e8400-e29b-41d4-a716-446655440012', // Sony brand ID
    visibility: 'Both',
    status: 'Enabled',
    customAttributes: [
      { name: 'material', value: 'Synthetic' },
      { name: 'color', value: 'Black/Red' }
    ],
    createdAt: new Date(2023, 3, 5).toISOString(),
    updatedAt: new Date(2023, 3, 5).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440103',
    sku: 'LPT-001',
    name: 'Laptop Backpack',
    slug: 'laptop-backpack',
    type: 'Simple',
    description: 'Water-resistant backpack with padded compartment for laptops up to 15 inches.',
    shortDescription: 'Water-resistant laptop backpack',
    price: 45.99,
    stockStatus: 'In Stock',
    stockQuantity: 30,
    manageStock: true,
    weight: 1.2,
    dimensions: { length: 45, width: 30, height: 15 },
    mainImage: 'https://example.com/images/backpack.jpg',
    galleryImages: [
      'https://example.com/images/backpack-front.jpg',
      'https://example.com/images/backpack-inside.jpg'
    ],
    categoryIds: ['550e8400-e29b-41d4-a716-446655440003'], // Accessories category
    tags: ['backpack', 'laptop', 'travel'],
    brandId: '550e8400-e29b-41d4-a716-446655440013', // LG brand ID
    visibility: 'Both',
    status: 'Enabled',
    customAttributes: [
      { name: 'material', value: 'Polyester' },
      { name: 'waterproof', value: 'Yes' }
    ],
    createdAt: new Date(2023, 2, 20).toISOString(),
    updatedAt: new Date(2023, 2, 20).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440104',
    sku: 'WTC-001',
    name: 'Smart Watch',
    slug: 'smart-watch',
    type: 'Simple',
    description: 'Smart watch with heart rate monitor, step tracker, and notifications.',
    shortDescription: 'Smart watch with health features',
    price: 129.99,
    salePrice: 99.99,
    stockStatus: 'In Stock',
    stockQuantity: 20,
    manageStock: true,
    weight: 0.1,
    dimensions: { length: 10, width: 5, height: 2 },
    mainImage: 'https://example.com/images/watch.jpg',
    galleryImages: [
      'https://example.com/images/watch-front.jpg',
      'https://example.com/images/watch-side.jpg'
    ],
    categoryIds: ['550e8400-e29b-41d4-a716-446655440000'], // Electronics category
    tags: ['watch', 'smart', 'fitness'],
    brandId: '550e8400-e29b-41d4-a716-446655440014', // HP brand ID
    visibility: 'Both',
    status: 'Enabled',
    customAttributes: [
      { name: 'color', value: 'Black' },
      { name: 'waterproof', value: 'Yes' }
    ],
    createdAt: new Date(2023, 1, 15).toISOString(),
    updatedAt: new Date(2023, 1, 15).toISOString()
  } */
];

// Initialize mock data
function initializeMockData() {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  console.log('Checking if mock data needs to be initialized in localStorage');
  
  try {
    const storedProducts = loadProducts();
    
    if (!storedProducts || storedProducts.length === 0) {
      console.log('No products found in localStorage, initializing with mock data');
      saveProducts(mockProducts);
      console.log('Saved', mockProducts.length, 'mock products to localStorage');
    } else {
      console.log('Found', storedProducts.length, 'products in localStorage, skipping initialization');
    }
  } catch (error) {
    console.error('Error initializing mock data:', error);
  }
}

// Call initialization on module load in browser environment
if (typeof window !== 'undefined') {
  initializeMockData();
}

// Environment check for debug mode
const DEBUG = process.env.DEBUG_PRODUCTS === 'true';

// Helper function to log debugging information
function log(...args: any[]) {
  if (DEBUG) {
    console.log('[ProductService]', ...args);
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
export async function getAllProducts(
  options: {
    page?: number; 
    limit?: number;
    search?: string;
    sortBy?: 'name' | 'price' | 'status' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    productType?: ProductType;
    status?: ProductStatus;
    categoryId?: string;
    brandId?: string;
  } = {}
): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
  log('Getting all products with options:', options);
  
  // Set default values for pagination
  const page = options.page || 1;
  const limit = options.limit || 10;
  
  if (shouldUseMockData()) {
    log('Using mock data');
    
    // Try to load from localStorage first (for client-side)
    let products: Product[] = [];
    if (typeof window !== 'undefined') {
      products = loadProducts();
    } else {
      products = [...mockProducts];
    }
    
    // Apply filters
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.sku.toLowerCase().includes(searchLower)
      );
    }
    
    if (options.productType) {
      products = products.filter(product => product.type === options.productType);
    }
    
    if (options.status) {
      products = products.filter(product => product.status === options.status);
    }
    
    if (options.categoryId) {
      products = products.filter(product => 
        product.categoryIds.includes(options.categoryId as string)
      );
    }
    
    if (options.brandId) {
      products = products.filter(product => 
        product.brandId === options.brandId
      );
    }
    
    // Apply sorting
    if (options.sortBy) {
      products.sort((a, b) => {
        let valueA, valueB;
        
        switch (options.sortBy) {
          case 'name':
            valueA = a.name;
            valueB = b.name;
            break;
          case 'price':
            valueA = a.price;
            valueB = b.price;
            break;
          case 'status':
            valueA = a.status;
            valueB = b.status;
            break;
          case 'createdAt':
          default:
            valueA = new Date(a.createdAt).getTime();
            valueB = new Date(b.createdAt).getTime();
        }
        
        // Check the sort order and compare values
        if (options.sortOrder === 'desc') {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        } else {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        }
      });
    }
    
    // Calculate pagination values
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total,
      page,
      totalPages
    };
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      return getAllProducts(options); // This will use the mock data branch
    }

    // This is a simplified query for demonstration purposes
    // A real implementation would need to build a more complex query with filtering
    let query = 'SELECT * FROM products';
    const params: any[] = [];
    
    // In a real implementation, you would add WHERE clauses for the filters
    // and handle sorting and pagination server-side
    
    const result = await client.execute(query, params);
    
    let products = result.rows.map(row => ({
      id: row.id.toString(),
      sku: row.sku,
      name: row.name,
      slug: row.slug,
      type: row.type as ProductType,
      description: row.description,
      shortDescription: row.short_description,
      price: row.price,
      salePrice: row.sale_price,
      saleStartDate: row.sale_start_date?.toISOString(),
      saleEndDate: row.sale_end_date?.toISOString(),
      stockStatus: row.stock_status as StockStatus,
      stockQuantity: row.stock_quantity,
      manageStock: row.manage_stock,
      weight: row.weight,
      dimensions: row.dimensions as ProductDimensions,
      mainImage: row.main_image,
      galleryImages: row.gallery_images,
      categoryIds: row.category_ids?.map(id => id.toString()),
      tags: row.tags,
      brandId: row.brand_id?.toString(),
      visibility: row.visibility as Visibility,
      status: row.status as ProductStatus,
      customAttributes: Object.entries(row.custom_attributes || {}).map(
        ([name, value]) => ({ name, value: value as string })
      ),
      sellerId: row.seller_id?.toString(),
      createdAt: row.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
    }));
    
    // Apply filters
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.sku.toLowerCase().includes(searchLower)
      );
    }
    
    if (options.productType) {
      products = products.filter(product => product.type === options.productType);
    }
    
    if (options.status) {
      products = products.filter(product => product.status === options.status);
    }
    
    if (options.categoryId) {
      products = products.filter(product => 
        product.categoryIds.includes(options.categoryId as string)
      );
    }
    
    if (options.brandId) {
      products = products.filter(product => 
        product.brandId === options.brandId
      );
    }
    
    // Apply sorting
    if (options.sortBy) {
      products.sort((a, b) => {
        let valueA, valueB;
        
        switch (options.sortBy) {
          case 'name':
            valueA = a.name;
            valueB = b.name;
            break;
          case 'price':
            valueA = a.price;
            valueB = b.price;
            break;
          case 'status':
            valueA = a.status;
            valueB = b.status;
            break;
          case 'createdAt':
          default:
            valueA = new Date(a.createdAt).getTime();
            valueB = new Date(b.createdAt).getTime();
        }
        
        // Check the sort order and compare values
        if (options.sortOrder === 'desc') {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        } else {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        }
      });
    }
    
    // Calculate pagination values
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total,
      page,
      totalPages
    };
  } catch (error) {
    log('Error getting all products:', error);
    log('Falling back to mock data');
    return getAllProducts(options); // This will use the mock data branch
  }
}

export async function debugProducts() {
  // Log mock products
  console.log('Mock products:', mockProducts);
  
  // Log localStorage products if in browser
  if (typeof window !== 'undefined') {
    const products = loadProducts();
    console.log('localStorage products:', products);
  }
  
  return {
    mockProducts: mockProducts.length,
    localStorage: typeof window !== 'undefined' ? loadProducts().length : 'N/A'
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  console.log(`Getting product by ID: ${id}`);
  
  if (shouldUseMockData()) {
    console.log('Using mock data');
    
    // Try to load from localStorage first (for client-side)
    if (typeof window !== 'undefined') {
      const products = loadProducts();
      console.log('Products in localStorage:', products.length);
      const product = products.find(p => p.id === id);
      console.log('Found product in localStorage:', product ? 'Yes' : 'No');
      return product || null;
    }
    
    console.log('Checking mock products:', mockProducts.length);
    const product = mockProducts.find(p => p.id === id);
    console.log('Found product in mockProducts:', product ? 'Yes' : 'No');
    return product || null;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      
      if (typeof window !== 'undefined') {
        const products = loadProducts();
        const product = products.find(p => p.id === id);
        return product || null;
      }
      
      const product = mockProducts.find(p => p.id === id);
      return product || null;
    }

    const result = await client.execute('SELECT * FROM products WHERE id = ?', [id], { prepare: true });
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id.toString(),
      sku: row.sku,
      name: row.name,
      slug: row.slug,
      type: row.type as ProductType,
      description: row.description,
      shortDescription: row.short_description,
      price: row.price,
      salePrice: row.sale_price,
      saleStartDate: row.sale_start_date?.toISOString(),
      saleEndDate: row.sale_end_date?.toISOString(),
      stockStatus: row.stock_status as StockStatus,
      stockQuantity: row.stock_quantity,
      manageStock: row.manage_stock,
      weight: row.weight,
      dimensions: row.dimensions as ProductDimensions,
      mainImage: row.main_image,
      galleryImages: row.gallery_images,
      categoryIds: row.category_ids?.map(id => id.toString()),
      tags: row.tags,
      brandId: row.brand_id?.toString(),
      visibility: row.visibility as Visibility,
      status: row.status as ProductStatus,
      customAttributes: Object.entries(row.custom_attributes || {}).map(
        ([name, value]) => ({ name, value: value as string })
      ),
      sellerId: row.seller_id?.toString(),
      createdAt: row.created_at?.toISOString() || new Date().toISOString(),
      updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
    };
  } catch (error) {
    log('Error getting product by ID:', error);
    log('Falling back to mock data');
    
    if (typeof window !== 'undefined') {
      const products = loadProducts();
      const product = products.find(p => p.id === id);
      return product || null;
    }
    
    const product = mockProducts.find(p => p.id === id);
    return product || null;
  }
}

export async function createProduct(data: ProductCreateInput): Promise<Product> {
  log('Creating new product:', data);
  
  const now = new Date();
  const id = uuidv4();
  const slug = data.slug || generateSlug(data.name);
  
  const newProduct: Product = {
    id,
    sku: data.sku,
    name: data.name,
    slug,
    type: data.type,
    description: data.description,
    shortDescription: data.shortDescription,
    price: data.price,
    salePrice: data.salePrice,
    saleStartDate: data.saleStartDate,
    saleEndDate: data.saleEndDate,
    stockStatus: data.stockStatus,
    stockQuantity: data.stockQuantity,
    manageStock: data.manageStock,
    weight: data.weight,
    dimensions: data.dimensions,
    mainImage: data.mainImage,
    galleryImages: data.galleryImages || [],
    categoryIds: data.categoryIds || [],
    tags: data.tags || [],
    brandId: data.brandId,
    visibility: data.visibility,
    status: data.status,
    customAttributes: data.customAttributes || [],
    sellerId: data.sellerId,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
  
  if (shouldUseMockData()) {
    log('Using mock data for product creation');
    
    // Add to localStorage for persistence (client-side)
    if (typeof window !== 'undefined') {
      addToLocalStorage(newProduct);
    }
    
    return newProduct;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      
      // Add to localStorage for persistence (client-side)
      if (typeof window !== 'undefined') {
        addToLocalStorage(newProduct);
      }
      
      return newProduct;
    }

    console.log('Saving product to database:', newProduct);
    
    // Convert custom attributes to a map for Cassandra
    const customAttributesMap: { [key: string]: string } = {};
    if (newProduct.customAttributes) {
      newProduct.customAttributes.forEach(attr => {
        customAttributesMap[attr.name] = attr.value;
      });
    }
    
    // Convert dimensions to a map for Cassandra
    const dimensionsMap: { [key: string]: number } = {};
    if (newProduct.dimensions) {
      dimensionsMap.length = newProduct.dimensions.length;
      dimensionsMap.width = newProduct.dimensions.width;
      dimensionsMap.height = newProduct.dimensions.height;
    }

    await client.execute(
      `INSERT INTO products (
        id, sku, name, slug, type, description, short_description, price, 
        sale_price, sale_start_date, sale_end_date, stock_status, stock_quantity, 
        manage_stock, weight, dimensions, main_image, gallery_images, 
        category_ids, tags, brand_id, visibility, status, 
        custom_attributes, seller_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        newProduct.sku,
        newProduct.name,
        slug,
        newProduct.type,
        newProduct.description,
        newProduct.shortDescription,
        newProduct.price,
        newProduct.salePrice || null,
        newProduct.saleStartDate ? new Date(newProduct.saleStartDate) : null,
        newProduct.saleEndDate ? new Date(newProduct.saleEndDate) : null,
        newProduct.stockStatus,
        newProduct.stockQuantity || 0,
        newProduct.manageStock,
        newProduct.weight || null,
        Object.keys(dimensionsMap).length > 0 ? dimensionsMap : null,
        newProduct.mainImage || null,
        newProduct.galleryImages || null,
        newProduct.categoryIds || null,
        newProduct.tags || null,
        newProduct.brandId || null,
        newProduct.visibility,
        newProduct.status,
        Object.keys(customAttributesMap).length > 0 ? customAttributesMap : null,
        newProduct.sellerId || null,
        now,
        now
      ],
      { prepare: true }
    );
    
    // Create category relationships
    if (newProduct.categoryIds && newProduct.categoryIds.length > 0) {
      for (const categoryId of newProduct.categoryIds) {
        await client.execute(
          'INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)',
          [id, categoryId],
          { prepare: true }
        );
      }
    }
    
    // Create tag relationships
    if (newProduct.tags && newProduct.tags.length > 0) {
      for (const tag of newProduct.tags) {
        await client.execute(
          'INSERT INTO product_tags (tag, product_id) VALUES (?, ?)',
          [tag, id],
          { prepare: true }
        );
      }
    }
    
    console.log('Product saved successfully to database');
    return newProduct;
  } catch (error) {
    console.error('Error creating product in database:', error);
    log('Falling back to mock data');
    
    // Add to localStorage for persistence (client-side)
    if (typeof window !== 'undefined') {
      addToLocalStorage(newProduct);
    }
    
    return newProduct;
  }
}

export async function updateProduct(id: string, data: ProductUpdateInput): Promise<Product | null> {
  log(`Updating product ${id} with:`, data);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    
    // Try to load from localStorage first (client-side)
    if (typeof window !== 'undefined') {
      const success = updateProductInStorage(id, data);
      if (success) {
        const products = loadProducts();
        return products.find(p => p.id === id) || null;
      }
      return null;
    }
    
    // Server-side mock data handling
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      return null;
    }
    
    const now = new Date();
    const updatedProduct = {
      ...mockProducts[index],
      ...data,
      updatedAt: now.toISOString()
    };
    
    mockProducts[index] = updatedProduct;
    return updatedProduct;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      
      // Try to load from localStorage first (client-side)
      if (typeof window !== 'undefined') {
        const success = updateProductInStorage(id, data);
        if (success) {
          const products = loadProducts();
          return products.find(p => p.id === id) || null;
        }
        return null;
      }
      
      // Server-side mock data handling
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        return null;
      }
      
      const now = new Date();
      const updatedProduct = {
        ...mockProducts[index],
        ...data,
        updatedAt: now.toISOString()
      };
      
      mockProducts[index] = updatedProduct;
      return updatedProduct;
    }

    // First check if the product exists
    const existing = await getProductById(id);
    if (!existing) {
      return null;
    }
    
    const now = new Date();
    
    // Construct query dynamically based on provided fields
    let query = 'UPDATE products SET updated_at = ?';
    const params: any[] = [now];
    
    // Add each field to the query if it's provided
    if (data.sku !== undefined) {
      query += ', sku = ?';
      params.push(data.sku);
    }
    
    if (data.name !== undefined) {
      query += ', name = ?';
      params.push(data.name);
    }
    
    if (data.slug !== undefined) {
      query += ', slug = ?';
      params.push(data.slug);
    } else if (data.name && !data.slug) {
      // Auto-update slug if name changes but slug is not provided
      const newSlug = generateSlug(data.name);
      query += ', slug = ?';
      params.push(newSlug);
    }
    
    if (data.type !== undefined) {
      query += ', type = ?';
      params.push(data.type);
    }
    
    if (data.description !== undefined) {
      query += ', description = ?';
      params.push(data.description);
    }
    
    if (data.shortDescription !== undefined) {
      query += ', short_description = ?';
      params.push(data.shortDescription);
    }
    
    if (data.price !== undefined) {
      query += ', price = ?';
      params.push(data.price);
    }
    
    if (data.salePrice !== undefined) {
      query += ', sale_price = ?';
      params.push(data.salePrice);
    }
    
    if (data.saleStartDate !== undefined) {
      query += ', sale_start_date = ?';
      params.push(data.saleStartDate ? new Date(data.saleStartDate) : null);
    }
    
    if (data.saleEndDate !== undefined) {
      query += ', sale_end_date = ?';
      params.push(data.saleEndDate ? new Date(data.saleEndDate) : null);
    }
    
    if (data.stockStatus !== undefined) {
      query += ', stock_status = ?';
      params.push(data.stockStatus);
    }
    
    if (data.stockQuantity !== undefined) {
      query += ', stock_quantity = ?';
      params.push(data.stockQuantity);
    }
    
    if (data.manageStock !== undefined) {
      query += ', manage_stock = ?';
      params.push(data.manageStock);
    }
    
    if (data.weight !== undefined) {
      query += ', weight = ?';
      params.push(data.weight);
    }
    
    if (data.dimensions !== undefined) {
      query += ', dimensions = ?';
      const dimensionsMap: { [key: string]: number } = {
        length: data.dimensions.length,
        width: data.dimensions.width,
        height: data.dimensions.height
      };
      params.push(dimensionsMap);
    }
    
    if (data.mainImage !== undefined) {
      query += ', main_image = ?';
      params.push(data.mainImage);
    }
    
    if (data.galleryImages !== undefined) {
      query += ', gallery_images = ?';
      params.push(data.galleryImages);
    }
    
    if (data.categoryIds !== undefined) {
      query += ', category_ids = ?';
      params.push(data.categoryIds);
      
      // Update category relationships
      // This would require additional code to handle the many-to-many relationship
    }
    
    if (data.tags !== undefined) {
      query += ', tags = ?';
      params.push(data.tags);
      
      // Update tag relationships
      // This would require additional code to handle the many-to-many relationship
    }
    
    if (data.brandId !== undefined) {
      query += ', brand_id = ?';
      params.push(data.brandId);
    }
    
    if (data.visibility !== undefined) {
      query += ', visibility = ?';
      params.push(data.visibility);
    }
    
    if (data.status !== undefined) {
      query += ', status = ?';
      params.push(data.status);
    }
    
    if (data.customAttributes !== undefined) {
      query += ', custom_attributes = ?';
      const customAttributesMap: { [key: string]: string } = {};
      data.customAttributes.forEach(attr => {
        customAttributesMap[attr.name] = attr.value;
      });
      params.push(customAttributesMap);
    }
    
    if (data.sellerId !== undefined) {
      query += ', seller_id = ?';
      params.push(data.sellerId);
    }
    
    query += ' WHERE id = ?';
    params.push(id);
    
    await client.execute(query, params, { prepare: true });
    
    // Return the updated product
    return {
      ...existing,
      ...data,
      updatedAt: now.toISOString()
    };
  } catch (error) {
    log('Error updating product:', error);
    log('Falling back to mock data');
    
    // Try to load from localStorage first (client-side)
    if (typeof window !== 'undefined') {
      const success = updateProductInStorage(id, data);
      if (success) {
        const products = loadProducts();
        return products.find(p => p.id === id) || null;
      }
      return null;
    }
    
    // Server-side mock data handling
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      return null;
    }
    
    const now = new Date();
    const updatedProduct = {
      ...mockProducts[index],
      ...data,
      updatedAt: now.toISOString()
    };
    
    mockProducts[index] = updatedProduct;
    return updatedProduct;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  log(`Deleting product ${id}`);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    
    // Try to delete from localStorage first (client-side)
    if (typeof window !== 'undefined') {
      return deleteProductFromStorage(id);
    }
    
    // Server-side mock data handling
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    
    mockProducts.splice(index, 1);
    return true;
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      
      // Try to delete from localStorage first (client-side)
      if (typeof window !== 'undefined') {
        return deleteProductFromStorage(id);
      }
      
      // Server-side mock data handling
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        return false;
      }
      
      mockProducts.splice(index, 1);
      return true;
    }

    // First check if the product exists
    const existing = await getProductById(id);
    if (!existing) {
      return false;
    }
    
    // Delete from product_categories table
    await client.execute('DELETE FROM product_categories WHERE product_id = ?', [id], { prepare: true });
    
    // Delete from product_tags table
    if (existing.tags && existing.tags.length > 0) {
      for (const tag of existing.tags) {
        await client.execute('DELETE FROM product_tags WHERE tag = ? AND product_id = ?', [tag, id], { prepare: true });
      }
    }
    
    // Delete from products table
    await client.execute('DELETE FROM products WHERE id = ?', [id], { prepare: true });
    
    return true;
  } catch (error) {
    log('Error deleting product:', error);
    log('Falling back to mock data');
    
    // Try to delete from localStorage first (client-side)
    if (typeof window !== 'undefined') {
      return deleteProductFromStorage(id);
    }
    
    // Server-side mock data handling
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    
    mockProducts.splice(index, 1);
    return true;
  }
}

export async function bulkDeleteProducts(ids: string[]): Promise<{ success: boolean; count: number }> {
  log(`Bulk deleting products: ${ids.length} items`);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    
    // Try to delete from localStorage first (client-side)
    if (typeof window !== 'undefined') {
      return deleteBulkProductsFromStorage(ids);
    }
    
    // Server-side mock data handling
    const initialCount = mockProducts.length;
    const filteredProducts = mockProducts.filter(p => !ids.includes(p.id));
    const deletedCount = initialCount - filteredProducts.length;
    
    return {
      success: true,
      count: deletedCount
    };
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      
      // Try to delete from localStorage first (client-side)
      if (typeof window !== 'undefined') {
        return deleteBulkProductsFromStorage(ids);
      }
      
      // Server-side mock data handling
      const initialCount = mockProducts.length;
      const filteredProducts = mockProducts.filter(p => !ids.includes(p.id));
      const deletedCount = initialCount - filteredProducts.length;
      
      return {
        success: true,
        count: deletedCount
      };
    }

    let successCount = 0;
    
    // Process each product to delete
    for (const id of ids) {
      try {
        // First check if the product exists
        const existing = await getProductById(id);
        if (!existing) continue;
        
        // Delete from product_categories table
        await client.execute('DELETE FROM product_categories WHERE product_id = ?', [id], { prepare: true });
        
        // Delete from product_tags table
        if (existing.tags && existing.tags.length > 0) {
          for (const tag of existing.tags) {
            await client.execute('DELETE FROM product_tags WHERE tag = ? AND product_id = ?', [tag, id], { prepare: true });
          }
        }
        
        // Delete from products table
        await client.execute('DELETE FROM products WHERE id = ?', [id], { prepare: true });
        
        successCount++;
      } catch (err) {
        log(`Error deleting product ${id}:`, err);
        // Continue with next product
      }
    }
    
    return {
      success: successCount > 0,
      count: successCount
    };
  } catch (error) {
    log('Error in bulk delete products:', error);
    log('Falling back to mock data');
    
    // Try to delete from localStorage first (client-side)
    if (typeof window !== 'undefined') {
      return deleteBulkProductsFromStorage(ids);
    }
    
    // Server-side mock data handling
    const initialCount = mockProducts.length;
    const filteredProducts = mockProducts.filter(p => !ids.includes(p.id));
    const deletedCount = initialCount - filteredProducts.length;
    
    return {
      success: true,
      count: deletedCount
    };
  }
}

export async function bulkUpdateProductStatus(
  ids: string[], 
  status: ProductStatus
): Promise<{ success: boolean; count: number }> {
  log(`Bulk updating product status to ${status} for ${ids.length} products`);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    
    // Try to update in localStorage first (client-side)
    if (typeof window !== 'undefined') {
      return updateBulkProductStatusInStorage(ids, status);
    }
    
    // Server-side mock data handling
    let updatedCount = 0;
    mockProducts.forEach(product => {
      if (ids.includes(product.id)) {
        product.status = status;
        product.updatedAt = new Date().toISOString();
        updatedCount++;
      }
    });
    
    return {
      success: updatedCount > 0,
      count: updatedCount
    };
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      
      // Try to update in localStorage first (client-side)
      if (typeof window !== 'undefined') {
        return updateBulkProductStatusInStorage(ids, status);
      }
      
      // Server-side mock data handling
      let updatedCount = 0;
      mockProducts.forEach(product => {
        if (ids.includes(product.id)) {
          product.status = status;
          product.updatedAt = new Date().toISOString();
          updatedCount++;
        }
      });
      
      return {
        success: updatedCount > 0,
        count: updatedCount
      };
    }

    let successCount = 0;
    const now = new Date();
    
    // Process each product to update
    for (const id of ids) {
      try {
        await client.execute(
          'UPDATE products SET status = ?, updated_at = ? WHERE id = ?',
          [status, now, id],
          { prepare: true }
        );
        
        successCount++;
      } catch (err) {
        log(`Error updating product ${id} status:`, err);
        // Continue with next product
      }
    }
    
    return {
      success: successCount > 0,
      count: successCount
    };
  } catch (error) {
    log('Error in bulk update product status:', error);
    log('Falling back to mock data');
    
    // Try to update in localStorage first (client-side)
    if (typeof window !== 'undefined') {
      return updateBulkProductStatusInStorage(ids, status);
    }
    
    // Server-side mock data handling
    let updatedCount = 0;
    mockProducts.forEach(product => {
      if (ids.includes(product.id)) {
        product.status = status;
        product.updatedAt = new Date().toISOString();
        updatedCount++;
      }
    });
    
    return {
      success: updatedCount > 0,
      count: updatedCount
    };
  }
}

// Helper function to check if a SKU already exists
export async function isSkuUnique(sku: string, excludeProductId?: string): Promise<boolean> {
  log(`Checking if SKU "${sku}" is unique${excludeProductId ? ` (excluding product ${excludeProductId})` : ''}`);
  
  if (shouldUseMockData()) {
    log('Using mock data');
    
    // Try to check in localStorage first (client-side)
    if (typeof window !== 'undefined') {
      const products = loadProducts();
      return !products.some(p => p.sku === sku && p.id !== excludeProductId);
    }
    
    // Server-side mock data handling
    return !mockProducts.some(p => p.sku === sku && p.id !== excludeProductId);
  }

  try {
    const client = getClient();
    if (!client) {
      log('No database client available, falling back to mock data');
      
      // Try to check in localStorage first (client-side)
      if (typeof window !== 'undefined') {
        const products = loadProducts();
        return !products.some(p => p.sku === sku && p.id !== excludeProductId);
      }
      
      // Server-side mock data handling
      return !mockProducts.some(p => p.sku === sku && p.id !== excludeProductId);
    }

    const result = await client.execute('SELECT id FROM products WHERE sku = ?', [sku], { prepare: true });
    
    if (result.rows.length === 0) {
      return true; // SKU doesn't exist, so it's unique
    }
    
    // If excluding a product, check if the found SKU belongs to the excluded product
    if (excludeProductId && result.rows.length === 1) {
      const foundId = result.rows[0].id.toString();
      return foundId === excludeProductId;
    }
    
    return false; // SKU exists
  } catch (error) {
    log('Error checking SKU uniqueness:', error);
    log('Falling back to mock data');
    
    // Try to check in localStorage first (client-side)
    if (typeof window !== 'undefined') {
      const products = loadProducts();
      return !products.some(p => p.sku === sku && p.id !== excludeProductId);
    }
    
    // Server-side mock data handling
    return !mockProducts.some(p => p.sku === sku && p.id !== excludeProductId);
  }
}

// Product duplication
export async function duplicateProduct(id: string, newSku: string): Promise<Product | null> {
  log(`Duplicating product ${id} with new SKU ${newSku}`);
  
  // First check if the new SKU is unique
  const isUnique = await isSkuUnique(newSku);
  if (!isUnique) {
    log(`SKU ${newSku} already exists, cannot duplicate product`);
    throw new Error(`SKU ${newSku} already exists`);
  }
  
  // Get the product to duplicate
  const product = await getProductById(id);
  if (!product) {
    log(`Product ${id} not found, cannot duplicate`);
    return null;
  }
  
  // Create a new product based on the existing one
  const duplicateData: ProductCreateInput = {
    ...product,
    sku: newSku,
    name: `${product.name} (Copy)`,
    slug: `${product.slug}-copy`,
    status: 'Disabled', // Start as disabled
  };
  
  // Remove properties that shouldn't be duplicated
  delete (duplicateData as any).id;
  delete (duplicateData as any).createdAt;
  delete (duplicateData as any).updatedAt;
  
  // Create the duplicated product
  return createProduct(duplicateData);
} 