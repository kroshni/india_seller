const { Client } = require('cassandra-driver');

// Create a client with local configuration
const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'indiaseller1',
  credentials: {
    username: 'cassandra',
    password: 'cassandra',
  }
});

async function initRequirementsTable() {
  try {
    await client.connect();
    console.log('Connected to Cassandra');

    // Create customer_requirements table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS customer_requirements (
        id uuid,
        customer_id text,
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