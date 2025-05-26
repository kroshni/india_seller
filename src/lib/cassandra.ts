// Use a safe way to check for browser environment
const isBrowser = typeof window !== 'undefined';

// Interfaces to maintain type safety
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'Active' | 'Inactive';
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

// Brand interface for brand management
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  status: 'Active' | 'Inactive';
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

// Product Interfaces
export type ProductType = 'Simple' | 'Configurable' | 'Virtual' | 'Downloadable' | 'Grouped' | 'Bundled';
export type ProductStatus = 'Enabled' | 'Disabled';
export type StockStatus = 'In Stock' | 'Out of Stock' | 'On Backorder';
export type Visibility = 'Store' | 'Search' | 'Both' | 'None';

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
}

export interface CustomAttribute {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  type: ProductType;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  saleStartDate?: string;
  saleEndDate?: string;
  stockStatus: StockStatus;
  stockQuantity?: number;
  manageStock: boolean;
  weight?: number;
  dimensions?: ProductDimensions;
  mainImage?: string;
  galleryImages?: string[];
  categoryIds: string[];
  tags?: string[];
  brandId?: string;
  visibility: Visibility;
  status: ProductStatus;
  customAttributes?: CustomAttribute[];
  sellerId?: string;
  createdAt: string;
  updatedAt: string;
}

// Initialize these variables for both server and client
let client: any = null;
let isConnected = false;
let connectionAttempted = false;

// Only run this code on the server
if (!isBrowser) {
  try {
    // Dynamic import for cassandra-driver (this won't run in the browser)
    const cassandraDriver = require('cassandra-driver');
    const { Client, auth } = cassandraDriver;

    // Initialize the client if we're in a server environment
    try {
      // Check for environment variables
      const contactPoints = process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['localhost'];
      const localDataCenter = process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1';
      const keyspace = process.env.CASSANDRA_KEYSPACE || 'india_seller';
      const username = process.env.CASSANDRA_USERNAME || 'cassandra';
      const password = process.env.CASSANDRA_PASSWORD || 'cassandra';

      // Create new client with proper auth provider
      const options: any = {
        contactPoints,
        localDataCenter,
        keyspace,
        protocolOptions: { maxVersion: 4 }
      };

      // Always add authProvider with default values if not provided
      options.authProvider = new auth.PlainTextAuthProvider(username, password);

      client = new Client(options);
      console.log('Cassandra client created with options:', { contactPoints, localDataCenter, keyspace });
      
      // Immediately attempt to connect to set isConnected flag
      initializeDatabase().catch(err => {
        console.error('Failed to initialize database on startup:', err);
      });
    } catch (error) {
      console.error('Error creating Cassandra client:', error);
      client = null;
    }
  } catch (error) {
    console.error('Failed to load cassandra-driver (this is normal in browser):', error);
  }
}

// Get the client (safely works in both environments)
export function getClient(): any | null {
  return client;
}

// Initialize database with required tables (safely works in both environments)
export async function initializeDatabase(): Promise<boolean> {
  if (isBrowser) {
    console.log('Cannot initialize database in browser environment');
    return false;
  }
  
  if (!client) {
    console.error('No Cassandra client available');
    return false;
  }
  
  if (connectionAttempted && isConnected) {
    console.log('Already connected to database');
    return true;
  }
  
  connectionAttempted = true;
  
  try {
    // Test connection
    await client.connect();
    console.log('Connected to Cassandra successfully');
    isConnected = true;
    
    // Create categories table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id uuid PRIMARY KEY,
        name text,
        slug text,
        description text,
        status text,
        product_count int,
        created_at timestamp,
        updated_at timestamp
      )
    `);
    
    // Create brands table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS brands (
        id uuid PRIMARY KEY,
        name text,
        slug text,
        logo text,
        status text,
        product_count int,
        created_at timestamp,
        updated_at timestamp
      )
    `);
    
    // Create products table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id uuid PRIMARY KEY,
        sku text,
        name text,
        slug text,
        type text,
        description text,
        short_description text,
        price decimal,
        sale_price decimal,
        sale_start_date timestamp,
        sale_end_date timestamp,
        stock_status text,
        stock_quantity int,
        manage_stock boolean,
        weight decimal,
        dimensions map<text, decimal>,
        main_image text,
        gallery_images list<text>,
        category_ids list<uuid>,
        tags list<text>,
        brand_id uuid,
        visibility text,
        status text,
        custom_attributes map<text, text>,
        seller_id uuid,
        created_at timestamp,
        updated_at timestamp
      )
    `);

    // Create product_categories table (for many-to-many relationship)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS product_categories (
        product_id uuid,
        category_id uuid,
        PRIMARY KEY (product_id, category_id)
      )
    `);

    // Create product_tags table (for indexing and searching by tag)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS product_tags (
        tag text,
        product_id uuid,
        PRIMARY KEY (tag, product_id)
      )
    `);
    
    console.log('Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
    isConnected = false;
    return false;
  }
}

// Check if we're connected to the database
export function isDbConnected(): boolean {
  return isConnected;
}

// Close the client connection
export async function closeClient(): Promise<void> {
  if (client) {
    try {
      await client.shutdown();
      console.log('Cassandra client shut down');
    } catch (error) {
      console.error('Error shutting down Cassandra client:', error);
    } finally {
      client = null;
      isConnected = false;
      connectionAttempted = false;
    }
  }
} 