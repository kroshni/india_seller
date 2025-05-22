// ESM script to initialize the database
import { Client } from 'cassandra-driver';
import bcrypt from 'bcryptjs';

async function initializeDatabase() {
  let client = null;
  let tempClient = null;
  
  try {
    console.log('Initializing database...');
    
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
    
    // Create tables
    console.log('Creating tables...');
    
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
    
    console.log('Tables created successfully');
    
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
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
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

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log('Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    process.exit(1);
  }); 