// Script to recreate the seller_products table with better structure
const { Client, types } = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');

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

async function fixSellerProductsTable() {
  try {
    console.log('Connecting to Cassandra database...');
    await client.connect();
    console.log('Connected to database');
    
    // 1. Fetch all existing products
    console.log('Fetching existing seller products...');
    const fetchQuery = 'SELECT seller_id, product_name, category FROM seller_products';
    const result = await client.execute(fetchQuery);
    const existingProducts = result.rows;
    console.log(`Found ${existingProducts.length} existing products`);
    
    // 2. Drop the existing table
    console.log('Dropping existing seller_products table...');
    await client.execute('DROP TABLE IF EXISTS seller_products');
    console.log('Seller products table dropped');
    
    // 3. Create a new table with better structure
    console.log('Creating new seller_products table with improved structure...');
    await client.execute(`
      CREATE TABLE IF NOT EXISTS seller_products (
        id uuid,
        seller_id uuid,
        product_name text,
        category text,
        PRIMARY KEY (id, seller_id)
      )
    `);
    console.log('New seller_products table created');
    
    // 4. Create secondary index on seller_id
    console.log('Creating index on seller_id...');
    await client.execute('CREATE INDEX IF NOT EXISTS ON seller_products(seller_id)');
    console.log('Index on seller_id created');
    
    // 5. Reinsert the data
    console.log('Reinserting product data...');
    
    const insertQuery = `
      INSERT INTO seller_products (id, seller_id, product_name, category)
      VALUES (?, ?, ?, ?)
    `;
    
    let insertedCount = 0;
    for (const product of existingProducts) {
      const id = uuidv4();
      await client.execute(
        insertQuery,
        [
          types.Uuid.fromString(id),
          product.seller_id,
          product.product_name,
          product.category
        ],
        { prepare: true }
      );
      insertedCount++;
    }
    
    console.log(`Successfully reinserted ${insertedCount} products`);
    console.log('Seller products table migration completed successfully!');
    
  } catch (error) {
    console.error('Error fixing seller_products table:', error);
  } finally {
    await client.shutdown();
    console.log('Database connection closed');
  }
}

// Run the function
fixSellerProductsTable()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to fix seller_products table:', error);
    process.exit(1);
  }); 