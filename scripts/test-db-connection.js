// Simple test script for Cassandra connection
const { Client } = require('cassandra-driver');
require('dotenv').config();

console.log('Testing Cassandra connection...');
console.log('Environment variables:');
console.log('CASSANDRA_CONTACT_POINTS:', process.env.CASSANDRA_CONTACT_POINTS);
console.log('CASSANDRA_LOCAL_DATACENTER:', process.env.CASSANDRA_LOCAL_DATACENTER);
console.log('CASSANDRA_KEYSPACE:', process.env.CASSANDRA_KEYSPACE);

async function testConnection() {
  const client = new Client({
    contactPoints: process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['127.0.0.1'],
    localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1',
    keyspace: process.env.CASSANDRA_KEYSPACE || 'indiaseller1',
    credentials: {
      username: process.env.CASSANDRA_USERNAME || 'cassandra',
      password: process.env.CASSANDRA_PASSWORD || 'cassandra',
    }
  });

  try {
    console.log('Connecting to Cassandra...');
    await client.connect();
    console.log('Successfully connected to Cassandra!');
    
    console.log('Executing query to test connection...');
    const rs = await client.execute('SELECT * FROM system.local');
    console.log('Query executed successfully');
    console.log('Cassandra version:', rs.first()['release_version']);
    
    await client.shutdown();
    console.log('Connection closed. Test passed!');
  } catch (error) {
    console.error('Error connecting to Cassandra:', error);
  }
}

testConnection(); 