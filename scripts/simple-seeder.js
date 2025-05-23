// Simple script to generate seed data for 15 dummy sellers
const fs = require('fs');
const path = require('path');

// Generate 15 sellers with business details, products, and documents
function generateDummySellers() {
  const sellers = [];
  
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
  
  // Generate random ID (mimicking UUID)
  const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  for (let i = 0; i < 15; i++) {
    const id = generateId();
    const now = new Date().toISOString();
    const isTopScorer = Math.random() > 0.7;
    const kycStatus = Math.random() > 0.3 ? 'Verified' : 'Pending';
    const status = Math.random() > 0.2 ? 'Active' : 'Inactive';
    
    const seller = {
      id,
      name: `Seller ${i + 1}`,
      email: `seller${i + 1}@example.com`,
      phone: `98765${String(i).padStart(5, '0')}`,
      profilePicture: i % 3 === 0 ? `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i % 10 + 1}.jpg` : null,
      isTopScorer,
      kycStatus,
      status,
      createdAt: now,
      updatedAt: now,
      business: {
        sellerId: id,
        companyName: `Company ${i + 1}`,
        address: `Address ${i + 1}, New Delhi, India`,
        gstin: `GST${String(i).padStart(10, '0')}`,
        pan: `PAN${String(i).padStart(8, '0')}`,
        bankName: bankNames[Math.floor(Math.random() * bankNames.length)],
        accountNumber: `ACC${String(Math.floor(Math.random() * 1000000000)).padStart(10, '0')}`,
        ifscCode: `IFSC${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
      },
      products: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, j) => ({
        sellerId: id,
        productName: `Product ${j + 1} of Seller ${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
      })),
      documents: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
        sellerId: id,
        documentType: documentTypes[Math.floor(Math.random() * documentTypes.length)],
        documentUrl: `https://example.com/documents/seller${i + 1}/doc${j + 1}.pdf`,
        uploadedAt: now,
      })),
    };
    
    sellers.push(seller);
  }
  
  return sellers;
}

// Save data to a JSON file that can be used later
function saveSeedData() {
  const sellers = generateDummySellers();
  const outputPath = path.join(__dirname, 'seed-data.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(sellers, null, 2));
  
  console.log(`Generated 15 dummy sellers data and saved to ${outputPath}`);
  console.log('These sellers can be imported into the database.');
}

// Generate and save the seed data
saveSeedData(); 