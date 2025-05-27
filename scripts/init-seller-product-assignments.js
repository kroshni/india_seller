// Script to initialize seller_product_assignments table
import { Client } from 'cassandra-driver';

async function initSellerProductAssignments() {
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
    
    // Create seller_product_assignments table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS seller_product_assignments (
        seller_id uuid,
        product_id uuid,
        assigned_at timestamp,
        PRIMARY KEY (seller_id, product_id)
      )
    `);
    console.log('Created seller_product_assignments table');
    
    // Create a secondary index on product_id for reverse lookup
    // This allows querying by product to find which sellers have it assigned
    await client.execute(`
      CREATE INDEX IF NOT EXISTS ON seller_product_assignments(product_id)
    `);
    console.log('Created index on product_id');
    
    console.log('Seller product assignments table initialized successfully');
  } catch (error) {
    console.error('Error initializing seller product assignments table:', error);
  } finally {
    if (client) {
      await client.shutdown();
      console.log('Database connection closed');
    }
  }
}

// Run the script
initSellerProductAssignments(); 