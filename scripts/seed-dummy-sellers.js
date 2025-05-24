// Script to add 15 dummy sellers to the database
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

// Profile picture URLs for random assignment
const profilePictures = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/women/6.jpg',
  'https://randomuser.me/api/portraits/men/7.jpg',
  'https://randomuser.me/api/portraits/women/8.jpg',
];

// Location images for addresses
const locationImages = [
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&auto=format&fit=crop',
];

// Document URLs
const documentUrls = [
  'https://example.com/documents/gst_certificate.pdf',
  'https://example.com/documents/pan_card.pdf',
  'https://example.com/documents/shop_license.pdf',
  'https://example.com/documents/business_registration.pdf',
];

// Gallery image URLs
const galleryImages = [
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1588588026043-316a08dcaffc?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615642286389-e7aeda23ae47?w=800&auto=format&fit=crop',
];

// Dummy seller data
const dummySellers = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '9876543210',
    business: {
      companyName: 'Kumar Enterprises',
      gstin: '22AAAAA0000A1Z5',
      pan: 'ABCPK1234D',
      bankName: 'HDFC Bank',
      accountNumber: '12345678901234',
      ifscCode: 'HDFC0001234'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 87
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9876543211',
    business: {
      companyName: 'Sharma Textiles',
      gstin: '27BBBBB1111B1Z5',
      pan: 'BCDPK2345E',
      bankName: 'State Bank of India',
      accountNumber: '98765432109876',
      ifscCode: 'SBIN0002345'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 92
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '9876543212',
    business: {
      companyName: 'Patel Handicrafts',
      gstin: '24CCCCC2222C1Z5',
      pan: 'CDEFG3456F',
      bankName: 'ICICI Bank',
      accountNumber: '45678901234567',
      ifscCode: 'ICIC0003456'
    },
    status: 'Active',
    kycStatus: 'Pending',
    isTopScorer: 65
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    phone: '9876543213',
    business: {
      companyName: 'Reddy Electronics',
      gstin: '36DDDDD3333D1Z5',
      pan: 'DEFGH4567G',
      bankName: 'Axis Bank',
      accountNumber: '78901234567890',
      ifscCode: 'UTIB0004567'
    },
    status: 'Inactive',
    kycStatus: 'Pending',
    isTopScorer: 45
  },
  {
    name: 'Mohammed Ali',
    email: 'mohammed.ali@example.com',
    phone: '9876543214',
    business: {
      companyName: 'Ali Leather Works',
      gstin: '33EEEEE4444E1Z5',
      pan: 'EFGHI5678H',
      bankName: 'Kotak Mahindra Bank',
      accountNumber: '23456789012345',
      ifscCode: 'KKBK0005678'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 78
  },
  {
    name: 'Anjali Gupta',
    email: 'anjali.gupta@example.com',
    phone: '9876543215',
    business: {
      companyName: 'Gupta Jewellers',
      gstin: '07FFFFF5555F1Z5',
      pan: 'FGHIJ6789I',
      bankName: 'Punjab National Bank',
      accountNumber: '56789012345678',
      ifscCode: 'PUNB0006789'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 95
  },
  {
    name: 'Vijay Malhotra',
    email: 'vijay.malhotra@example.com',
    phone: '9876543216',
    business: {
      companyName: 'Malhotra Fashions',
      gstin: '09GGGGG6666G1Z5',
      pan: 'GHIJK7890J',
      bankName: 'Bank of Baroda',
      accountNumber: '89012345678901',
      ifscCode: 'BARB0007890'
    },
    status: 'Inactive',
    kycStatus: 'Pending',
    isTopScorer: 30
  },
  {
    name: 'Lakshmi Nair',
    email: 'lakshmi.nair@example.com',
    phone: '9876543217',
    business: {
      companyName: 'Nair Home Decor',
      gstin: '32HHHHH7777H1Z5',
      pan: 'HIJKL8901K',
      bankName: 'Canara Bank',
      accountNumber: '34567890123456',
      ifscCode: 'CNRB0008901'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 82
  },
  {
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '9876543218',
    business: {
      companyName: 'Verma Auto Parts',
      gstin: '20IIIII8888I1Z5',
      pan: 'IJKLM9012L',
      bankName: 'Union Bank of India',
      accountNumber: '67890123456789',
      ifscCode: 'UBIN0009012'
    },
    status: 'Active',
    kycStatus: 'Pending',
    isTopScorer: 55
  },
  {
    name: 'Pooja Desai',
    email: 'pooja.desai@example.com',
    phone: '9876543219',
    business: {
      companyName: 'Desai Organic Foods',
      gstin: '25JJJJJ9999J1Z5',
      pan: 'JKLMN0123M',
      bankName: 'Yes Bank',
      accountNumber: '90123456789012',
      ifscCode: 'YESB0000123'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 75
  },
  {
    name: 'Karthik Iyer',
    email: 'karthik.iyer@example.com',
    phone: '9876543220',
    business: {
      companyName: 'Iyer Spice Trading',
      gstin: '29KKKKK0000K1Z5',
      pan: 'KLMNO1234N',
      bankName: 'IndusInd Bank',
      accountNumber: '12345678901235',
      ifscCode: 'INDB0001234'
    },
    status: 'Inactive',
    kycStatus: 'Pending',
    isTopScorer: 25
  },
  {
    name: 'Divya Chauhan',
    email: 'divya.chauhan@example.com',
    phone: '9876543221',
    business: {
      companyName: 'Chauhan Boutique',
      gstin: '06LLLLL1111L1Z5',
      pan: 'LMNOP2345O',
      bankName: 'IDFC First Bank',
      accountNumber: '45678901234568',
      ifscCode: 'IDFB0002345'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 88
  },
  {
    name: 'Suresh Menon',
    email: 'suresh.menon@example.com',
    phone: '9876543222',
    business: {
      companyName: 'Menon Furniture',
      gstin: '32MMMMM2222M1Z5',
      pan: 'MNOPQ3456P',
      bankName: 'Federal Bank',
      accountNumber: '78901234567891',
      ifscCode: 'FDRL0003456'
    },
    status: 'Active',
    kycStatus: 'Pending',
    isTopScorer: 60
  },
  {
    name: 'Neha Singh',
    email: 'neha.singh@example.com',
    phone: '9876543223',
    business: {
      companyName: 'Singh Cosmetics',
      gstin: '10NNNNN3333N1Z5',
      pan: 'NOPQR4567Q',
      bankName: 'South Indian Bank',
      accountNumber: '23456789012346',
      ifscCode: 'SIBL0004567'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 90
  },
  {
    name: 'Ramesh Joshi',
    email: 'ramesh.joshi@example.com',
    phone: '9876543224',
    business: {
      companyName: 'Joshi Ayurvedic Products',
      gstin: '21OOOOO4444O1Z5',
      pan: 'OPQRS5678R',
      bankName: 'Bank of Maharashtra',
      accountNumber: '56789012345679',
      ifscCode: 'MAHB0005678'
    },
    status: 'Active',
    kycStatus: 'Verified',
    isTopScorer: 70
  }
];

// Product categories
const productCategories = [
  ['Men\'s Clothing', 'Apparel'],
  ['Women\'s Clothing', 'Apparel'],
  ['Smartphones', 'Electronics'],
  ['Laptops', 'Electronics'],
  ['Kitchenware', 'Home & Kitchen'],
  ['Furniture', 'Home & Decor'],
  ['Toys', 'Kids & Baby'],
  ['Skincare', 'Beauty'],
  ['Groceries', 'Food & Beverage'],
  ['Shoes', 'Footwear'],
  ['Watches', 'Accessories'],
  ['Books', 'Media'],
  ['Sports Equipment', 'Sports & Outdoors'],
  ['Art Supplies', 'Crafts'],
  ['Jewelry', 'Accessories']
];

// Address types
const addressTypes = ['Business', 'Warehouse', 'Factory', 'Shop', 'Office'];

// Document types
const documentTypes = ['GST Certificate', 'PAN Card', 'Shop License', 'Business Registration'];

// Function to create a random date within the last year
function randomDate() {
  const now = new Date();
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  return new Date(pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime()));
}

// Function to get random items from an array
function getRandomItems(array, min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to seed sellers
async function seedSellers() {
  try {
    console.log('Connecting to Cassandra database...');
    await client.connect();
    console.log('Connected to database');
    
    console.log('Starting to seed 15 dummy sellers...');
    
    for (const sellerData of dummySellers) {
      const sellerId = uuidv4();
      const now = new Date();
      const createdAt = randomDate();
      const updatedAt = new Date(createdAt.getTime() + Math.random() * (now.getTime() - createdAt.getTime()));
      
      // Random profile picture (or none)
      const profilePicture = Math.random() > 0.2 ? getRandomElement(profilePictures) : null;
      
      // Insert seller personal details
      console.log(`Creating seller: ${sellerData.name}`);
      await client.execute(
        `INSERT INTO sellers (
          id, name, email, phone, profile_picture, is_top_scorer, kyc_status, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          types.Uuid.fromString(sellerId),
          sellerData.name,
          sellerData.email,
          sellerData.phone,
          profilePicture,
          sellerData.isTopScorer,
          sellerData.kycStatus,
          sellerData.status,
          createdAt,
          updatedAt
        ],
        { prepare: true }
      );
      
      // Insert business details
      await client.execute(
        `INSERT INTO seller_business (
          seller_id, company_name, gstin, pan, bank_name, account_number, ifsc_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          types.Uuid.fromString(sellerId),
          sellerData.business.companyName,
          sellerData.business.gstin,
          sellerData.business.pan,
          sellerData.business.bankName,
          sellerData.business.accountNumber,
          sellerData.business.ifscCode
        ],
        { prepare: true }
      );
      
      // Create 1-3 addresses
      const addressCount = Math.floor(Math.random() * 3) + 1;
      console.log(`Creating ${addressCount} addresses for ${sellerData.name}`);
      
      for (let i = 0; i < addressCount; i++) {
        const addressId = uuidv4();
        const addressType = getRandomElement(addressTypes);
        const isDefault = i === 0; // First address is default
        const image = Math.random() > 0.5 ? getRandomElement(locationImages) : null;
        
        await client.execute(
          `INSERT INTO seller_addresses (
            id, seller_id, address_type, address_line1, address_line2, 
            city, state, postal_code, country, is_default, image
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            types.Uuid.fromString(addressId),
            types.Uuid.fromString(sellerId),
            addressType,
            `${Math.floor(Math.random() * 999) + 1}, ${['Main Street', 'Park Avenue', 'Industrial Area', 'Commercial Complex'][Math.floor(Math.random() * 4)]}`,
            Math.random() > 0.5 ? `Phase ${Math.floor(Math.random() * 5) + 1}` : null,
            ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'][Math.floor(Math.random() * 8)],
            ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'West Bengal', 'Gujarat'][Math.floor(Math.random() * 7)],
            `${Math.floor(Math.random() * 900000) + 100000}`,
            'India',
            isDefault,
            image
          ],
          { prepare: true }
        );
      }
      
      // Create 2-5 products
      const selectedProducts = getRandomItems(productCategories, 2, 5);
      console.log(`Creating ${selectedProducts.length} products for ${sellerData.name}`);
      
      for (const product of selectedProducts) {
        await client.execute(
          `INSERT INTO seller_products (
            seller_id, product_name, category
          ) VALUES (?, ?, ?)`,
          [
            types.Uuid.fromString(sellerId),
            product[0],
            product[1]
          ],
          { prepare: true }
        );
      }
      
      // Create 1-4 documents
      const selectedDocTypes = getRandomItems(documentTypes, 1, 4);
      console.log(`Creating ${selectedDocTypes.length} documents for ${sellerData.name}`);
      
      for (const docType of selectedDocTypes) {
        const documentId = uuidv4();
        const docUrl = getRandomElement(documentUrls);
        
        await client.execute(
          `INSERT INTO seller_documents (
            id, seller_id, document_type, document_url, uploaded_at
          ) VALUES (?, ?, ?, ?, ?)`,
          [
            types.Uuid.fromString(documentId),
            types.Uuid.fromString(sellerId),
            docType,
            docUrl,
            randomDate()
          ],
          { prepare: true }
        );
      }
      
      // Create 0-5 gallery images
      if (Math.random() > 0.3) {
        const galleryCount = Math.floor(Math.random() * 6);
        console.log(`Creating ${galleryCount} gallery images for ${sellerData.name}`);
        
        for (let i = 0; i < galleryCount; i++) {
          const imageId = uuidv4();
          const imageUrl = getRandomElement(galleryImages);
          const caption = Math.random() > 0.5 ? `${sellerData.business.companyName} - Image ${i+1}` : null;
          
          await client.execute(
            `INSERT INTO seller_gallery (
              id, seller_id, image_url, caption, uploaded_at
            ) VALUES (?, ?, ?, ?, ?)`,
            [
              types.Uuid.fromString(imageId),
              types.Uuid.fromString(sellerId),
              imageUrl,
              caption,
              randomDate()
            ],
            { prepare: true }
          );
        }
      }
      
      console.log(`Successfully created seller: ${sellerData.name} with ID: ${sellerId}`);
    }
    
    console.log('Successfully seeded 15 dummy sellers!');
  } catch (error) {
    console.error('Error seeding sellers:', error);
  } finally {
    await client.shutdown();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedSellers()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Seeding failed:', error);
    process.exit(1);
  }); 