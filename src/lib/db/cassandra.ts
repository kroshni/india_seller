import { Client, types } from 'cassandra-driver';

let client: Client | null = null;

export async function getClient() {
  if (client) return client;

  client = new Client({
    contactPoints: process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['127.0.0.1'],
    localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1',
    keyspace: process.env.CASSANDRA_KEYSPACE || 'indiaseller1',
    credentials: {
      username: process.env.CASSANDRA_USERNAME || 'cassandra',
      password: process.env.CASSANDRA_PASSWORD || 'cassandra',
    }
  });

  await client.connect();
  console.log('Connected to Cassandra');
  
  return client;
}

export async function createKeyspaceIfNotExists() {
  // Create a temporary client without keyspace to create the keyspace
  const tempClient = new Client({
    contactPoints: process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['127.0.0.1'],
    localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1',
    credentials: {
      username: process.env.CASSANDRA_USERNAME || 'cassandra',
      password: process.env.CASSANDRA_PASSWORD || 'cassandra',
    }
  });

  await tempClient.connect();
  
  await tempClient.execute(`
    CREATE KEYSPACE IF NOT EXISTS ${process.env.CASSANDRA_KEYSPACE || 'indiaseller1'}
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
  `);
  
  await tempClient.shutdown();
}

export async function initializeSchema() {
  const client = await getClient();
  
  // Create sellers table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS sellers (
      id uuid PRIMARY KEY,
      name text,
      email text,
      phone text,
      profile_picture text,
      is_top_scorer boolean,
      kyc_status text,
      status text,
      created_at timestamp,
      updated_at timestamp
    )
  `);
  
  // Create seller_business table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS seller_business (
      seller_id uuid PRIMARY KEY,
      company_name text,
      address text,
      gstin text,
      pan text,
      bank_name text,
      account_number text,
      ifsc_code text
    )
  `);
  
  // Create seller_products table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS seller_products (
      seller_id uuid,
      product_name text,
      category text,
      PRIMARY KEY (seller_id, product_name)
    )
  `);
  
  // Create seller_product_assignments table (many-to-many relationship)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS seller_product_assignments (
      seller_id uuid,
      product_id uuid,
      assigned_at timestamp,
      PRIMARY KEY (seller_id, product_id)
    )
  `);
  
  // Create seller_documents table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS seller_documents (
      seller_id uuid,
      document_type text,
      document_url text,
      uploaded_at timestamp,
      PRIMARY KEY (seller_id, document_type)
    )
  `);
  
  // Create customers table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id uuid PRIMARY KEY,
      name text,
      email text,
      phone text,
      profile_picture text,
      status text,
      created_at timestamp,
      updated_at timestamp
    )
  `);
  
  // Create customer_addresses table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS customer_addresses (
      id uuid PRIMARY KEY,
      customer_id uuid,
      address_type text,
      address_line1 text,
      address_line2 text,
      city text,
      state text,
      postal_code text,
      country text,
      is_default boolean
    )
  `);
  
  // Create customer_documents table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS customer_documents (
      id uuid,
      customer_id uuid,
      document_type text,
      document_url text,
      uploaded_at timestamp,
      PRIMARY KEY (customer_id, document_type)
    )
  `);
  
  // Create customer_requirements table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS customer_requirements (
      id uuid,
      customer_id text,
      customer_name text,
      product_name text,
      details text,
      email text,
      status text,
      created_at timestamp,
      updated_at timestamp,
      PRIMARY KEY (id)
    )
  `);
  
  // Create index on customer_id for faster lookups
  await client.execute(`
    CREATE INDEX IF NOT EXISTS ON customer_requirements (customer_id)
  `);
  
  // Create index on status for filtering
  await client.execute(`
    CREATE INDEX IF NOT EXISTS ON customer_requirements (status)
  `);
  
  // Create users table for authentication
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      email text PRIMARY KEY,
      password text,
      name text,
      role text,
      created_at timestamp
    )
  `);
}

export async function shutdownClient() {
  if (client) {
    await client.shutdown();
    client = null;
  }
}