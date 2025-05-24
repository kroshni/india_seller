// Script to initialize seller-related tables
import { Client } from 'cassandra-driver';

async function initSellerTables() {
  let client = null;
  
  try {
    console.log('Connecting to Cassandra database...');
    
    // Connect to the keyspace
    client = new Client({
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
      keyspace: 'indiaseller1',
      credentials: {
        username: 'cassandra',
        password: 'cassandra',
      }
    });
    
    await client.connect();
    console.log('Connected to database');
    
    // Create sellers table with updated schema (isTopScorer as int 0-100 instead of boolean)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS sellers (
        id uuid PRIMARY KEY,
        name text,
        email text,
        phone text,
        profile_picture text,
        is_top_scorer int,
        kyc_status text,
        status text,
        created_at timestamp,
        updated_at timestamp
      )
    `);
    console.log('Created sellers table');
    
    // Create seller_business table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS seller_business (
        seller_id uuid PRIMARY KEY,
        company_name text,
        gstin text,
        pan text,
        bank_name text,
        account_number text,
        ifsc_code text
      )
    `);
    console.log('Created seller_business table');
    
    // Create seller_addresses table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS seller_addresses (
        id uuid,
        seller_id uuid,
        address_type text,
        address_line1 text,
        address_line2 text,
        city text,
        state text,
        postal_code text,
        country text,
        is_default boolean,
        image text,
        PRIMARY KEY (id, seller_id)
      )
    `);
    console.log('Created seller_addresses table');
    
    // Create seller_products table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS seller_products (
        seller_id uuid,
        product_name text,
        category text,
        PRIMARY KEY (seller_id, product_name)
      )
    `);
    console.log('Created seller_products table');
    
    // Create seller_documents table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS seller_documents (
        id uuid,
        seller_id uuid,
        document_type text,
        document_url text,
        uploaded_at timestamp,
        PRIMARY KEY (id, seller_id, document_type)
      )
    `);
    console.log('Created seller_documents table');
    
    // Create seller_gallery table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS seller_gallery (
        id uuid,
        seller_id uuid,
        image_url text,
        caption text,
        uploaded_at timestamp,
        PRIMARY KEY (id, seller_id)
      )
    `);
    console.log('Created seller_gallery table');
    
    console.log('All seller tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    if (client) {
      await client.shutdown();
      console.log('Database connection closed');
    }
  }
}

// Run the initialization function
initSellerTables()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to create seller tables:', error);
    process.exit(1);
  }); 