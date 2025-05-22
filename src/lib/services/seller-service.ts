import { getClient } from '../db/cassandra';
import { v4 as uuidv4 } from 'uuid';
import { types } from 'cassandra-driver';

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  isTopScorer: boolean;
  kycStatus: 'Verified' | 'Pending';
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface SellerBusiness {
  sellerId: string;
  companyName: string;
  address: string;
  gstin: string;
  pan: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface SellerProduct {
  sellerId: string;
  productName: string;
  category: string;
}

export interface SellerDocument {
  sellerId: string;
  documentType: string;
  documentUrl: string;
  uploadedAt: Date;
}

export interface CreateSellerInput {
  // Personal details
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  
  // Business details
  business: {
    companyName: string;
    address: string;
    gstin: string;
    pan: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
  
  // Product details
  products: {
    productName: string;
    category: string;
  }[];
  
  // Documents
  documents: {
    documentType: string;
    documentUrl: string;
  }[];
}

export async function getAllSellers(): Promise<Seller[]> {
  try {
    const client = await getClient();
    const query = 'SELECT * FROM sellers';
    const result = await client.execute(query);
    
    return result.rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      email: row.email,
      phone: row.phone,
      profilePicture: row.profile_picture,
      isTopScorer: row.is_top_scorer,
      kycStatus: row.kyc_status,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  } catch (error) {
    console.error('Error getting sellers:', error);
    return [];
  }
}

export async function getSellerById(id: string): Promise<{
  seller: Seller;
  business: SellerBusiness;
  products: SellerProduct[];
  documents: SellerDocument[];
} | null> {
  try {
    const client = await getClient();
    
    // Get seller personal details
    const sellerQuery = 'SELECT * FROM sellers WHERE id = ?';
    const sellerResult = await client.execute(sellerQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    if (sellerResult.rowLength === 0) {
      return null;
    }
    
    const sellerRow = sellerResult.first();
    const seller: Seller = {
      id: sellerRow.id.toString(),
      name: sellerRow.name,
      email: sellerRow.email,
      phone: sellerRow.phone,
      profilePicture: sellerRow.profile_picture,
      isTopScorer: sellerRow.is_top_scorer,
      kycStatus: sellerRow.kyc_status,
      status: sellerRow.status,
      createdAt: sellerRow.created_at,
      updatedAt: sellerRow.updated_at
    };
    
    // Get business details
    const businessQuery = 'SELECT * FROM seller_business WHERE seller_id = ?';
    const businessResult = await client.execute(businessQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    let business: SellerBusiness | null = null;
    if (businessResult.rowLength > 0) {
      const businessRow = businessResult.first();
      business = {
        sellerId: businessRow.seller_id.toString(),
        companyName: businessRow.company_name,
        address: businessRow.address,
        gstin: businessRow.gstin,
        pan: businessRow.pan,
        bankName: businessRow.bank_name,
        accountNumber: businessRow.account_number,
        ifscCode: businessRow.ifsc_code
      };
    }
    
    // Get products
    const productsQuery = 'SELECT * FROM seller_products WHERE seller_id = ?';
    const productsResult = await client.execute(productsQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    const products: SellerProduct[] = productsResult.rows.map(row => ({
      sellerId: row.seller_id.toString(),
      productName: row.product_name,
      category: row.category
    }));
    
    // Get documents
    const documentsQuery = 'SELECT * FROM seller_documents WHERE seller_id = ?';
    const documentsResult = await client.execute(documentsQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    const documents: SellerDocument[] = documentsResult.rows.map(row => ({
      sellerId: row.seller_id.toString(),
      documentType: row.document_type,
      documentUrl: row.document_url,
      uploadedAt: row.uploaded_at
    }));
    
    return {
      seller,
      business: business!,
      products,
      documents
    };
  } catch (error) {
    console.error('Error getting seller by ID:', error);
    return null;
  }
}

export async function createSeller(input: CreateSellerInput): Promise<string | null> {
  try {
    const client = await getClient();
    const sellerId = uuidv4();
    const now = new Date();
    
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
        types.Uuid.fromString(sellerId),
        input.name,
        input.email,
        input.phone,
        input.profilePicture || null,
        false, // isTopScorer default
        'Pending', // kycStatus default
        'Active', // status default
        now,
        now
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
        types.Uuid.fromString(sellerId),
        input.business.companyName,
        input.business.address,
        input.business.gstin,
        input.business.pan,
        input.business.bankName,
        input.business.accountNumber,
        input.business.ifscCode
      ],
      { prepare: true }
    );
    
    // Insert products
    const productQuery = `
      INSERT INTO seller_products (
        seller_id, product_name, category
      )
      VALUES (?, ?, ?)
    `;
    
    for (const product of input.products) {
      await client.execute(
        productQuery,
        [
          types.Uuid.fromString(sellerId),
          product.productName,
          product.category
        ],
        { prepare: true }
      );
    }
    
    // Insert documents
    const documentQuery = `
      INSERT INTO seller_documents (
        seller_id, document_type, document_url, uploaded_at
      )
      VALUES (?, ?, ?, ?)
    `;
    
    for (const document of input.documents) {
      await client.execute(
        documentQuery,
        [
          types.Uuid.fromString(sellerId),
          document.documentType,
          document.documentUrl,
          now
        ],
        { prepare: true }
      );
    }
    
    return sellerId;
  } catch (error) {
    console.error('Error creating seller:', error);
    return null;
  }
}

export async function updateSeller(id: string, input: Partial<CreateSellerInput>): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    // Update seller personal details if provided
    if (input.name || input.email || input.phone || input.profilePicture !== undefined) {
      const updateFields = [];
      const updateValues = [];
      
      if (input.name) {
        updateFields.push('name = ?');
        updateValues.push(input.name);
      }
      
      if (input.email) {
        updateFields.push('email = ?');
        updateValues.push(input.email);
      }
      
      if (input.phone) {
        updateFields.push('phone = ?');
        updateValues.push(input.phone);
      }
      
      if (input.profilePicture !== undefined) {
        updateFields.push('profile_picture = ?');
        updateValues.push(input.profilePicture);
      }
      
      updateFields.push('updated_at = ?');
      updateValues.push(now);
      
      const sellerQuery = `UPDATE sellers SET ${updateFields.join(', ')} WHERE id = ?`;
      updateValues.push(types.Uuid.fromString(id));
      
      await client.execute(sellerQuery, updateValues, { prepare: true });
    }
    
    // Update business details if provided
    if (input.business) {
      const updateFields = [];
      const updateValues = [];
      
      if (input.business.companyName) {
        updateFields.push('company_name = ?');
        updateValues.push(input.business.companyName);
      }
      
      if (input.business.address) {
        updateFields.push('address = ?');
        updateValues.push(input.business.address);
      }
      
      if (input.business.gstin) {
        updateFields.push('gstin = ?');
        updateValues.push(input.business.gstin);
      }
      
      if (input.business.pan) {
        updateFields.push('pan = ?');
        updateValues.push(input.business.pan);
      }
      
      if (input.business.bankName) {
        updateFields.push('bank_name = ?');
        updateValues.push(input.business.bankName);
      }
      
      if (input.business.accountNumber) {
        updateFields.push('account_number = ?');
        updateValues.push(input.business.accountNumber);
      }
      
      if (input.business.ifscCode) {
        updateFields.push('ifsc_code = ?');
        updateValues.push(input.business.ifscCode);
      }
      
      if (updateFields.length > 0) {
        const businessQuery = `UPDATE seller_business SET ${updateFields.join(', ')} WHERE seller_id = ?`;
        updateValues.push(types.Uuid.fromString(id));
        
        await client.execute(businessQuery, updateValues, { prepare: true });
      }
    }
    
    // Update products if provided
    if (input.products && input.products.length > 0) {
      // Delete existing products
      const deleteProductsQuery = 'DELETE FROM seller_products WHERE seller_id = ?';
      await client.execute(deleteProductsQuery, [types.Uuid.fromString(id)], { prepare: true });
      
      // Insert new products
      const productQuery = 'INSERT INTO seller_products (seller_id, product_name, category) VALUES (?, ?, ?)';
      
      for (const product of input.products) {
        await client.execute(
          productQuery,
          [
            types.Uuid.fromString(id),
            product.productName,
            product.category
          ],
          { prepare: true }
        );
      }
    }
    
    // Update documents if provided
    if (input.documents && input.documents.length > 0) {
      const documentQuery = 'INSERT INTO seller_documents (seller_id, document_type, document_url, uploaded_at) VALUES (?, ?, ?, ?)';
      
      for (const document of input.documents) {
        // Check if document of this type already exists
        const checkQuery = 'SELECT document_type FROM seller_documents WHERE seller_id = ? AND document_type = ?';
        const checkResult = await client.execute(
          checkQuery,
          [types.Uuid.fromString(id), document.documentType],
          { prepare: true }
        );
        
        if (checkResult.rowLength > 0) {
          // Update existing document
          const updateDocQuery = 'UPDATE seller_documents SET document_url = ?, uploaded_at = ? WHERE seller_id = ? AND document_type = ?';
          await client.execute(
            updateDocQuery,
            [document.documentUrl, now, types.Uuid.fromString(id), document.documentType],
            { prepare: true }
          );
        } else {
          // Insert new document
          await client.execute(
            documentQuery,
            [types.Uuid.fromString(id), document.documentType, document.documentUrl, now],
            { prepare: true }
          );
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error updating seller:', error);
    return false;
  }
}

export async function deleteSeller(id: string): Promise<boolean> {
  try {
    const client = await getClient();
    
    // Delete from seller_documents
    await client.execute('DELETE FROM seller_documents WHERE seller_id = ?', [types.Uuid.fromString(id)], { prepare: true });
    
    // Delete from seller_products
    await client.execute('DELETE FROM seller_products WHERE seller_id = ?', [types.Uuid.fromString(id)], { prepare: true });
    
    // Delete from seller_business
    await client.execute('DELETE FROM seller_business WHERE seller_id = ?', [types.Uuid.fromString(id)], { prepare: true });
    
    // Delete from sellers
    await client.execute('DELETE FROM sellers WHERE id = ?', [types.Uuid.fromString(id)], { prepare: true });
    
    return true;
  } catch (error) {
    console.error('Error deleting seller:', error);
    return false;
  }
}

export async function updateSellerStatus(id: string, status: 'Active' | 'Inactive'): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    const query = 'UPDATE sellers SET status = ?, updated_at = ? WHERE id = ?';
    await client.execute(query, [status, now, types.Uuid.fromString(id)], { prepare: true });
    
    return true;
  } catch (error) {
    console.error('Error updating seller status:', error);
    return false;
  }
}

export async function updateSellerKycStatus(id: string, kycStatus: 'Verified' | 'Pending'): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    const query = 'UPDATE sellers SET kyc_status = ?, updated_at = ? WHERE id = ?';
    await client.execute(query, [kycStatus, now, types.Uuid.fromString(id)], { prepare: true });
    
    return true;
  } catch (error) {
    console.error('Error updating seller KYC status:', error);
    return false;
  }
}

export async function updateSellerTopScorer(id: string, isTopScorer: boolean): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    const query = 'UPDATE sellers SET is_top_scorer = ?, updated_at = ? WHERE id = ?';
    await client.execute(query, [isTopScorer, now, types.Uuid.fromString(id)], { prepare: true });
    
    return true;
  } catch (error) {
    console.error('Error updating seller top scorer status:', error);
    return false;
  }
} 