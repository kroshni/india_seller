// Script to initialize only authentication-related tables
import { Client } from 'cassandra-driver';
import bcrypt from 'bcryptjs';

async function initAuthDatabase() {
  let client = null;
  let tempClient = null;
  
  try {
    console.log('Initializing authentication database...');
    
    // Create keyspace if it doesn't exist
    tempClient = new Client({
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
      credentials: {
        username: 'cassandra',
        password: 'cassandra',
      }
    });
    
    await tempClient.connect();
    
    await tempClient.execute(`
      CREATE KEYSPACE IF NOT EXISTS indiaseller1
      WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
    `);
    
    console.log('Keyspace indiaseller1 created or already exists');
    
    await tempClient.shutdown();
    
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
    
    console.log('Users table created successfully');
    
    // Delete existing admin user
    try {
      await client.execute('DELETE FROM users WHERE email = ?', ['admin@example.com'], { prepare: true });
      console.log('Removed existing admin user');
    } catch (err) {
      console.log('No existing admin user to remove');
    }
    
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    // Insert admin user
    const insertQuery = 'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, ?)';
    await client.execute(
      insertQuery, 
      ['admin@example.com', hashedPassword, 'Admin User', 'admin', new Date()],
      { prepare: true }
    );
    console.log('Admin user seeded with hashed password');
    
    console.log('Authentication database initialization complete');
  } catch (error) {
    console.error('Error initializing authentication database:', error);
    throw error;
  } finally {
    if (tempClient) {
      await tempClient.shutdown();
    }
    if (client) {
      await client.shutdown();
    }
  }
}

// Run the initialization function
initAuthDatabase()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to initialize authentication database:', error);
    process.exit(1);
  }); 