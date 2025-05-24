// Script to create secondary indexes for seller-related tables
const { Client } = require('cassandra-driver');

// Connect to Cassandra
const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'indiaseller1',
  credentials: {
    username: 'cassandra',
    password: 'cassandra',
  }
});

async function createSellerIndexes() {
  try {
    console.log('Connecting to Cassandra database...');
    await client.connect();
    console.log('Connected to database');
    
    // Create index on seller_addresses
    console.log('Creating index on seller_addresses.seller_id...');
    await client.execute(
      'CREATE INDEX IF NOT EXISTS ON seller_addresses(seller_id)'
    );
    console.log('Successfully created index on seller_addresses.seller_id');
    
    // Skip seller_products as seller_id is the partition key
    console.log('Skipping seller_products.seller_id as it is the partition key');
    
    // Create index on seller_documents
    console.log('Creating index on seller_documents.seller_id...');
    await client.execute(
      'CREATE INDEX IF NOT EXISTS ON seller_documents(seller_id)'
    );
    console.log('Successfully created index on seller_documents.seller_id');
    
    // Create index on seller_gallery
    console.log('Creating index on seller_gallery.seller_id...');
    await client.execute(
      'CREATE INDEX IF NOT EXISTS ON seller_gallery(seller_id)'
    );
    console.log('Successfully created index on seller_gallery.seller_id');
    
    console.log('All seller indexes created successfully!');
  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    await client.shutdown();
    console.log('Database connection closed');
  }
}

// Run the function
createSellerIndexes()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to create indexes:', error);
    process.exit(1);
  }); 