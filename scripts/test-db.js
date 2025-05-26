// Simple script to test Cassandra connection
const { Client, auth } = require('cassandra-driver');

async function testConnection() {
  console.log('Testing Cassandra connection...');
  
  const contactPoints = process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['localhost'];
  const localDataCenter = process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1';
  const keyspace = process.env.CASSANDRA_KEYSPACE || 'india_seller';
  const username = process.env.CASSANDRA_USERNAME || 'cassandra';
  const password = process.env.CASSANDRA_PASSWORD || 'cassandra';
  
  console.log('Connection details:', {
    contactPoints,
    localDataCenter,
    keyspace,
    username,
    password: password ? '******' : undefined
  });
  
  // Create client
  const options = {
    contactPoints,
    localDataCenter,
    keyspace,
    protocolOptions: { maxVersion: 4 }
  };
  
  // Add auth provider
  options.authProvider = new auth.PlainTextAuthProvider(username, password);
  
  const client = new Client(options);
  
  try {
    console.log('Connecting to Cassandra...');
    await client.connect();
    console.log('Connected successfully!');
    
    // Check if categories table exists
    console.log('Checking for categories table...');
    const result = await client.execute(`
      SELECT table_name FROM system_schema.tables 
      WHERE keyspace_name = ? AND table_name = ?
    `, [keyspace, 'categories'], { prepare: true });
    
    if (result.rows.length > 0) {
      console.log('Categories table exists');
      
      // Test querying categories
      const categories = await client.execute('SELECT * FROM categories');
      console.log(`Found ${categories.rows.length} categories in the database`);
      
      if (categories.rows.length > 0) {
        console.log('Sample category:', categories.rows[0]);
      }
    } else {
      console.log('Categories table does not exist - creating it...');
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
      console.log('Categories table created');
    }
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await client.shutdown();
  }
}

// Run the test
testConnection()
  .then(() => console.log('Test completed'))
  .catch(err => console.error('Test failed:', err))
  .finally(() => process.exit()); 