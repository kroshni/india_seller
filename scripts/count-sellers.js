// Script to count sellers in the database
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

async function countSellers() {
  try {
    console.log('Connecting to Cassandra database...');
    await client.connect();
    console.log('Connected to database');
    
    // Count sellers
    const result = await client.execute('SELECT COUNT(*) FROM sellers');
    console.log('Total number of sellers:', result.rows[0].count);
    
    // Get some sample seller names
    const sellerResult = await client.execute('SELECT name, status, kyc_status, is_top_scorer FROM sellers LIMIT 5');
    console.log('\nSample sellers:');
    sellerResult.rows.forEach(row => {
      console.log(`- ${row.name} (Status: ${row.status}, KYC: ${row.kyc_status}, Top Scorer: ${row.is_top_scorer}%)`);
    });
    
  } catch (error) {
    console.error('Error counting sellers:', error);
  } finally {
    await client.shutdown();
    console.log('Database connection closed');
  }
}

// Run the counting function
countSellers()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to count sellers:', error);
    process.exit(1);
  }); 