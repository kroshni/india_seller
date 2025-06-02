const { Client } = require('cassandra-driver');
const fs = require('fs');
const path = require('path');

// Read environment variables from .env.local file
require('dotenv').config({ path: '.env.local' });

const client = new Client({
  cloud: {
    secureConnectBundle: path.resolve(process.env.CASSANDRA_SECURE_CONNECT_BUNDLE),
  },
  credentials: {
    username: process.env.CASSANDRA_CLIENT_ID,
    password: process.env.CASSANDRA_CLIENT_SECRET,
  },
  keyspace: process.env.CASSANDRA_KEYSPACE,
});

async function initRequirementsTable() {
  try {
    await client.connect();
    console.log('Connected to Cassandra');

    // Create customer_requirements table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS customer_requirements (
        id uuid,
        customer_id uuid,
        customer_name text,
        product_name text,
        details text,
        email text,
        status text,
        created_at timestamp,
        updated_at timestamp,
        PRIMARY KEY (id)
      )
    `;

    await client.execute(createTableQuery);
    console.log('customer_requirements table created or already exists');

    // Create index on customer_id for faster lookups
    const createCustomerIdIndexQuery = `
      CREATE INDEX IF NOT EXISTS ON customer_requirements (customer_id)
    `;
    await client.execute(createCustomerIdIndexQuery);
    console.log('Index on customer_id created or already exists');

    // Create index on status for filtering
    const createStatusIndexQuery = `
      CREATE INDEX IF NOT EXISTS ON customer_requirements (status)
    `;
    await client.execute(createStatusIndexQuery);
    console.log('Index on status created or already exists');

    console.log('Requirements table initialization completed successfully');
  } catch (error) {
    console.error('Error initializing requirements table:', error);
  } finally {
    await client.shutdown();
    console.log('Disconnected from Cassandra');
  }
}

initRequirementsTable();