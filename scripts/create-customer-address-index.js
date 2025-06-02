// Script to create a secondary index on customer_id in the customer_addresses table
const { Client } = require('cassandra-driver');
require('dotenv').config({ path: '.env.local' });

async function createCustomerAddressIndex() {
  console.log('Creating secondary index on customer_id in customer_addresses table...');
  
  // Create a client
  const client = new Client({
    contactPoints: process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['127.0.0.1'],
    localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1',
    keyspace: process.env.CASSANDRA_KEYSPACE || 'indiaseller1', // Using the keyspace from .env.local
    credentials: {
      username: process.env.CASSANDRA_USERNAME || 'cassandra',
      password: process.env.CASSANDRA_PASSWORD || 'cassandra',
    }
  });

  try {
    await client.connect();
    console.log('Connected to Cassandra');
    
    // Create the index
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer_id 
      ON customer_addresses (customer_id)
    `;
    
    await client.execute(createIndexQuery);
    console.log('Secondary index created successfully!');
    
    // Verify the index was created
    const keyspace = process.env.CASSANDRA_KEYSPACE || 'indiaseller1'; // Using the keyspace from .env.local
    const verifyQuery = `
      SELECT index_name 
      FROM system_schema.indexes 
      WHERE keyspace_name = ? AND table_name = ? AND column_name = ?
    `;
    
    const result = await client.execute(verifyQuery, [keyspace, 'customer_addresses', 'customer_id'], { prepare: true });
    
    if (result.rowLength > 0) {
      console.log(`Index verified: ${result.rows[0].index_name}`);
    } else {
      console.warn('Warning: Index creation was attempted but could not be verified.');
    }
  } catch (error) {
    console.error('Error creating index:', error);
  } finally {
    await client.shutdown();
    console.log('Disconnected from Cassandra');
  }
}

// Run the function
createCustomerAddressIndex();