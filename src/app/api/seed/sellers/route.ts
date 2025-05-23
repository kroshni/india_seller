import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../../../lib/db/cassandra';
import { types } from 'cassandra-driver';
import { v4 as uuidv4 } from 'uuid';

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

function generateDummySellers(count = 15) {
  const sellers = [];
  
  for (let i = 0; i < count; i++) {
    const id = uuidv4();
    const now = new Date();
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

async function insertSeller(client: any, seller: any) {
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
    
    return true;
  } catch (error) {
    console.error(`Error inserting seller ${seller.name}:`, error);
    return false;
  }
}

export async function GET() {
  try {
    const client = await getClient();
    
    // Generate dummy sellers
    const sellers = generateDummySellers(15);
    const results = [];
    
    // Insert each seller
    for (const seller of sellers) {
      try {
        await insertSeller(client, seller);
        results.push({
          id: seller.id,
          name: seller.name,
          success: true,
        });
      } catch (error) {
        console.error(`Failed to insert seller ${seller.name}:`, error);
        results.push({
          id: seller.id,
          name: seller.name,
          success: false,
          error: error.message,
        });
      }
    }
    
    return NextResponse.json({
      message: 'Seed data generation completed',
      count: results.length,
      results,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { message: 'Failed to seed data', error: error.message },
      { status: 500 }
    );
  }
} 