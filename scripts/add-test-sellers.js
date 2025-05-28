// Script to add test sellers to the database
const { v4: uuidv4 } = require('uuid');
const { Client, types } = require('cassandra-driver');

// Create a Cassandra client
const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'indiaseller1',
  credentials: {
    username: 'cassandra',
    password: 'cassandra',
  }
});

async function addTestSellers() {
  console.log('Connecting to Cassandra...');
  await client.connect();
  console.log('Connected to Cassandra');

  const testSellers = [
    {
      id: uuidv4(),
      name: 'TechGadgets India',
      email: 'contact@techgadgets.in',
      phone: '+91 98765 43210',
      profilePicture: 'https://picsum.photos/id/3/300/300',
      isTopScorer: 95,
      kycStatus: 'Verified',
      status: 'Active',
    },
    {
      id: uuidv4(),
      name: 'FashionHub',
      email: 'info@fashionhub.com',
      phone: '+91 98765 43211',
      profilePicture: 'https://picsum.photos/id/20/300/300',
      isTopScorer: 90,
      kycStatus: 'Verified',
      status: 'Active',
    },
    {
      id: uuidv4(),
      name: 'HomeDécor Plus',
      email: 'support@homedecor.in',
      phone: '+91 98765 43212',
      profilePicture: 'https://picsum.photos/id/42/300/300',
      isTopScorer: 85,
      kycStatus: 'Verified',
      status: 'Active',
    },
    {
      id: uuidv4(),
      name: 'Wellness Store',
      email: 'care@wellness.co.in',
      phone: '+91 98765 43213',
      profilePicture: 'https://picsum.photos/id/63/300/300',
      isTopScorer: 80,
      kycStatus: 'Verified',
      status: 'Active',
    },
    {
      id: uuidv4(),
      name: 'BookWorld',
      email: 'books@bookworld.in',
      phone: '+91 98765 43214',
      profilePicture: 'https://picsum.photos/id/76/300/300',
      isTopScorer: 75,
      kycStatus: 'Verified',
      status: 'Active',
    }
  ];

  console.log(`Adding ${testSellers.length} test sellers to the database...`);

  const insertQuery = `
    INSERT INTO sellers (
      id, name, email, phone, profile_picture, 
      is_top_scorer, kyc_status, status, created_at, updated_at
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const now = new Date();

  for (const seller of testSellers) {
    try {
      await client.execute(
        insertQuery,
        [
          types.Uuid.fromString(seller.id),
          seller.name,
          seller.email,
          seller.phone,
          seller.profilePicture,
          seller.isTopScorer,
          seller.kycStatus,
          seller.status,
          now,
          now
        ],
        { prepare: true }
      );
      console.log(`Added seller: ${seller.name} (${seller.id})`);
    } catch (error) {
      console.error(`Error adding seller ${seller.name}:`, error);
    }
  }

  console.log('Finished adding test sellers');
  await client.shutdown();
  console.log('Disconnected from Cassandra');
}

// Run the function
addTestSellers()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 