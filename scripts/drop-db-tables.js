// Script to drop all seller-related tables
import { Client } from 'cassandra-driver';

async function dropTables() {
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
    
    // List of tables to drop
    const tables = [
      'sellers',
      'seller_business',
      'seller_products',
      'seller_documents',
      'seller_addresses'
    ];
    
    // Drop each table
    for (const table of tables) {
      try {
        console.log(`Dropping table ${table}...`);
        await client.execute(`DROP TABLE IF EXISTS ${table}`);
        console.log(`Successfully dropped table ${table}`);
      } catch (error) {
        console.error(`Error dropping table ${table}:`, error);
      }
    }
    
    console.log('All seller-related tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    if (client) {
      await client.shutdown();
      console.log('Database connection closed');
    }
  }
}

// Run the drop tables function
dropTables()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to drop tables:', error);
    process.exit(1);
  }); 