// CommonJS version for easier execution
const { Client, types } = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Set up client directly 
async function getClient() {
  const client = new Client({
    contactPoints: process.env.CASSANDRA_CONTACT_POINTS?.split(',') || ['127.0.0.1'],
    localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1',
    keyspace: process.env.CASSANDRA_KEYSPACE || 'indiaseller1',
    credentials: {
      username: process.env.CASSANDRA_USERNAME || 'cassandra',
      password: process.env.CASSANDRA_PASSWORD || 'cassandra',
    }
  });

  await client.connect();
  console.log('Connected to Cassandra');
  return client;
}

const categories = [
  'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Personal Care', 
  'Books', 'Toys & Games', 'Grocery', 'Sports & Outdoors', 'Automotive',
  'Health & Wellness', 'Jewelry', 'Office Products'
];

const documentTypes = [
  'ID Proof', 'Address Proof', 'Business Registration', 'GST Certificate',
  'PAN Card', 'Bank Statement', 'Utility Bill', 'Incorporation Certificate'
];

const bankNames = [
  'SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak Mahindra Bank',
  'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Yes Bank', 'IDBI Bank'
];

function generateRandomSeller(index) {
  const id = uuidv4();
  const now = new Date();
  const isTopScorer = Math.random() > 0.7;
  const kycStatus = Math.random() > 0.3 ? 'Verified' : 'Pending';
  const status = Math.random() > 0.2 ? 'Active' : 'Inactive';
  
  return {
    id,
    name: `Seller ${index + 1}`,
    email: `seller${index + 1}@example.com`,
    phone: `98765${String(index).padStart(5, '0')}`,
    profilePicture: index % 3 === 0 ? `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index % 20}.jpg` : null,
    isTopScorer,
    kycStatus,
    status,
    createdAt: now,
    updatedAt: now,
    business: {
      companyName: `Company ${index + 1}`,
      address: `Address ${index + 1}, New Delhi, India`,
      gstin: `GST${String(index).padStart(10, '0')}`,
      pan: `PAN${String(index).padStart(8, '0')}`,
      bankName: bankNames[Math.floor(Math.random() * bankNames.length)],
      accountNumber: `ACC${String(Math.floor(Math.random() * 1000000000)).padStart(10, '0')}`,
      ifscCode: `IFSC${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
    },
    products: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, i) => ({
      productName: `Product ${i + 1} of Seller ${index + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
    })),
    documents: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
      documentType: documentTypes[Math.floor(Math.random() * documentTypes.length)],
      documentUrl: `https://example.com/documents/seller${index + 1}/doc${i + 1}.pdf`,
      uploadedAt: now,
    })),
  };
}

async function insertSeller(client, seller) {
  try {
    // Insert seller personal details
    const sellerQuery = `
      INSERT INTO sellers (
        id, name, email, phone, profile_picture, is_top_scorer, kyc_status, status, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await client.execute(
      sellerQuery,
      [
        types.Uuid.fromString(seller.id),
        seller.name,
        seller.email,
        seller.phone,
        seller.profilePicture,
        seller.isTopScorer,
        seller.kycStatus,
        seller.status,
        seller.createdAt,
        seller.updatedAt
      ],
      { prepare: true }
    );
    
    // Insert business details
    const businessQuery = `
      INSERT INTO seller_business (
        seller_id, company_name, address, gstin, pan, bank_name, account_number, ifsc_code
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await client.execute(
      businessQuery,
      [
        types.Uuid.fromString(seller.id),
        seller.business.companyName,
        seller.business.address,
        seller.business.gstin,
        seller.business.pan,
        seller.business.bankName,
        seller.business.accountNumber,
        seller.business.ifscCode
      ],
      { prepare: true }
    );
    
    // Insert products
    for (const product of seller.products) {
      const productQuery = `
        INSERT INTO seller_products (
          seller_id, product_name, category
        )
        VALUES (?, ?, ?)
      `;
      
      await client.execute(
        productQuery,
        [
          types.Uuid.fromString(seller.id),
          product.productName,
          product.category
        ],
        { prepare: true }
      );
    }
    
    // Insert documents
    for (const document of seller.documents) {
      const documentQuery = `
        INSERT INTO seller_documents (
          seller_id, document_type, document_url, uploaded_at
        )
        VALUES (?, ?, ?, ?)
      `;
      
      await client.execute(
        documentQuery,
        [
          types.Uuid.fromString(seller.id),
          document.documentType,
          document.documentUrl,
          document.uploadedAt
        ],
        { prepare: true }
      );
    }
    
    console.log(`Inserted seller: ${seller.name} (${seller.id})`);
    return true;
  } catch (error) {
    console.error(`Error inserting seller ${seller.name}:`, error);
    return false;
  }
}

async function main() {
  let client;
  try {
    client = await getClient();
    
    console.log('Connected to Cassandra database');
    console.log('Adding 15 dummy sellers...');
    
    const sellers = Array.from({ length: 15 }, (_, i) => generateRandomSeller(i));
    
    for (const seller of sellers) {
      await insertSeller(client, seller);
    }
    
    console.log('Successfully added 15 dummy sellers');
    await client.shutdown();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    if (client) await client.shutdown();
    process.exit(1);
  }
}

main(); 