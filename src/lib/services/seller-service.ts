import { getClient } from '../db/cassandra';
import { v4 as uuidv4 } from 'uuid';
import { types } from 'cassandra-driver';

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  isTopScorer: number; // Changed from boolean to number (0-100)
  kycStatus: 'Verified' | 'Pending';
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface SellerBusiness {
  sellerId: string;
  companyName: string;
  gstin: string;
  pan: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface SellerAddress {
  id: string;
  sellerId: string;
  addressType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  image?: string;
}

export interface SellerProduct {
  id: string;
  sellerId: string;
  productName: string;
  category: string;
}

export interface SellerDocument {
  id: string;
  sellerId: string;
  documentType: string;
  documentUrl: string;
  uploadedAt: Date;
}

export interface SellerGallery {
  id: string;
  sellerId: string;
  imageUrl: string;
  caption?: string;
  uploadedAt: Date;
}

export interface SellerFilters {
  search?: string;
  status?: 'Active' | 'Inactive' | 'All';
  kycStatus?: 'Verified' | 'Pending' | 'All';
  minTopScorer?: number;
  maxTopScorer?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SellerBulkUpdateInput {
  sellerIds: string[];
  status?: 'Active' | 'Inactive';
  kycStatus?: 'Verified' | 'Pending';
  isTopScorer?: number;
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
    gstin: string;
    pan: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
  
  // Addresses
  addresses: {
    addressType: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
    image?: string;
  }[];
  
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
  
  // Gallery images
  gallery?: {
    imageUrl: string;
    caption?: string;
  }[];
}

export async function getAllSellers(filters: SellerFilters = {}): Promise<{ sellers: Seller[], total: number }> {
  try {
    const client = await getClient();
    const limit = filters.limit || 10;
    const page = filters.page || 1;
    const offset = (page - 1) * limit;
    
    // Build query based on filters
    let query = 'SELECT * FROM sellers';
    const countQuery = 'SELECT COUNT(*) FROM sellers';
    
    // In Cassandra, filtering requires a secondary index or ALLOW FILTERING
    // For simplicity, we'll fetch all and filter in-memory, but in production
    // you'd want to use a secondary index or a search service
    const result = await client.execute(query);
    const countResult = await client.execute(countQuery);
    
    let sellers = result.rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      email: row.email,
      phone: row.phone,
      profilePicture: row.profile_picture,
      isTopScorer: row.is_top_scorer !== null ? row.is_top_scorer : 0,
      kycStatus: row.kyc_status,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
    
    // Apply filters in memory
    if (filters.search) {
      const search = filters.search.toLowerCase();
      sellers = sellers.filter(seller => 
        seller.name.toLowerCase().includes(search) || 
        seller.email.toLowerCase().includes(search) || 
        seller.phone.toLowerCase().includes(search)
      );
    }
    
    if (filters.status && filters.status !== 'All') {
      sellers = sellers.filter(seller => seller.status === filters.status);
    }
    
    if (filters.kycStatus && filters.kycStatus !== 'All') {
      sellers = sellers.filter(seller => seller.kycStatus === filters.kycStatus);
    }
    
    if (filters.minTopScorer !== undefined) {
      sellers = sellers.filter(seller => seller.isTopScorer >= filters.minTopScorer!);
    }
    
    if (filters.maxTopScorer !== undefined) {
      sellers = sellers.filter(seller => seller.isTopScorer <= filters.maxTopScorer!);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
      
      sellers.sort((a: any, b: any) => {
        if (a[filters.sortBy!] < b[filters.sortBy!]) return -1 * sortOrder;
        if (a[filters.sortBy!] > b[filters.sortBy!]) return 1 * sortOrder;
        return 0;
      });
    }
    
    const total = sellers.length;
    
    // Apply pagination
    sellers = sellers.slice(offset, offset + limit);
    
    return { sellers, total };
  } catch (error) {
    console.error('Error getting sellers:', error);
    return { sellers: [], total: 0 };
  }
}

export async function getSellerById(id: string): Promise<{
  seller: Seller;
  business: SellerBusiness;
  addresses: SellerAddress[];
  products: SellerProduct[];
  documents: SellerDocument[];
  gallery: SellerGallery[];
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
      isTopScorer: sellerRow.is_top_scorer !== null ? sellerRow.is_top_scorer : 0,
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
        gstin: businessRow.gstin,
        pan: businessRow.pan,
        bankName: businessRow.bank_name,
        accountNumber: businessRow.account_number,
        ifscCode: businessRow.ifsc_code
      };
    }
    
    // Get addresses - We have an index, so no need for ALLOW FILTERING
    const addressesQuery = 'SELECT * FROM seller_addresses WHERE seller_id = ?';
    const addressesResult = await client.execute(addressesQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    const addresses: SellerAddress[] = addressesResult.rows.map(row => ({
      id: row.id.toString(),
      sellerId: row.seller_id.toString(),
      addressType: row.address_type,
      addressLine1: row.address_line1,
      addressLine2: row.address_line2,
      city: row.city,
      state: row.state,
      postalCode: row.postal_code,
      country: row.country,
      isDefault: row.is_default,
      image: row.image
    }));
    
    // Get products - now using the secondary index, so no need for ALLOW FILTERING
    const productsQuery = 'SELECT * FROM seller_products WHERE seller_id = ?';
    const productsResult = await client.execute(productsQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    const products: SellerProduct[] = productsResult.rows.map(row => ({
      id: row.id.toString(),
      sellerId: row.seller_id.toString(),
      productName: row.product_name,
      category: row.category
    }));
    
    // Get documents - We have an index, so no need for ALLOW FILTERING
    const documentsQuery = 'SELECT * FROM seller_documents WHERE seller_id = ?';
    const documentsResult = await client.execute(documentsQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    const documents: SellerDocument[] = documentsResult.rows.map(row => ({
      id: row.id ? row.id.toString() : uuidv4(),
      sellerId: row.seller_id.toString(),
      documentType: row.document_type,
      documentUrl: row.document_url,
      uploadedAt: row.uploaded_at
    }));
    
    // Get gallery images - We have an index, so no need for ALLOW FILTERING
    const galleryQuery = 'SELECT * FROM seller_gallery WHERE seller_id = ?';
    const galleryResult = await client.execute(galleryQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    const gallery: SellerGallery[] = galleryResult.rows.map(row => ({
      id: row.id.toString(),
      sellerId: row.seller_id.toString(),
      imageUrl: row.image_url,
      caption: row.caption,
      uploadedAt: row.uploaded_at
    }));
    
    return {
      seller,
      business: business!,
      addresses,
      products,
      documents,
      gallery
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
        0, // isTopScorer default as 0%
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
        seller_id, company_name, gstin, pan, bank_name, account_number, ifsc_code
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await client.execute(
      businessQuery,
      [
        types.Uuid.fromString(sellerId),
        input.business.companyName,
        input.business.gstin,
        input.business.pan,
        input.business.bankName,
        input.business.accountNumber,
        input.business.ifscCode
      ],
      { prepare: true }
    );
    
    // Insert addresses
    if (input.addresses && input.addresses.length > 0) {
      const addressQuery = `
        INSERT INTO seller_addresses (
          id, seller_id, address_type, address_line1, address_line2, 
          city, state, postal_code, country, is_default, image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      for (const address of input.addresses) {
        const addressId = uuidv4();
        await client.execute(
          addressQuery,
          [
            types.Uuid.fromString(addressId),
            types.Uuid.fromString(sellerId),
            address.addressType,
            address.addressLine1,
            address.addressLine2 || null,
            address.city,
            address.state,
            address.postalCode,
            address.country,
            address.isDefault,
            address.image || null
          ],
          { prepare: true }
        );
      }
    }
    
    // Insert products
    const productQuery = `
      INSERT INTO seller_products (
        id, seller_id, product_name, category
      )
      VALUES (?, ?, ?, ?)
    `;
    
    for (const product of input.products) {
      const productId = uuidv4();
      await client.execute(
        productQuery,
        [
          types.Uuid.fromString(productId),
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
        id, seller_id, document_type, document_url, uploaded_at
      )
      VALUES (?, ?, ?, ?, ?)
    `;
    
    for (const document of input.documents) {
      const documentId = uuidv4();
      await client.execute(
        documentQuery,
        [
          types.Uuid.fromString(documentId),
          types.Uuid.fromString(sellerId),
          document.documentType,
          document.documentUrl,
          now
        ],
        { prepare: true }
      );
    }
    
    // Insert gallery images
    if (input.gallery && input.gallery.length > 0) {
      const galleryQuery = `
        INSERT INTO seller_gallery (
          id, seller_id, image_url, caption, uploaded_at
        )
        VALUES (?, ?, ?, ?, ?)
      `;
      
      for (const image of input.gallery) {
        const imageId = uuidv4();
        await client.execute(
          galleryQuery,
          [
            types.Uuid.fromString(imageId),
            types.Uuid.fromString(sellerId),
            image.imageUrl,
            image.caption || null,
            now
          ],
          { prepare: true }
        );
      }
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
    
    // Update addresses if provided
    if (input.addresses && input.addresses.length > 0) {
      // First retrieve existing addresses to get their IDs
      const getAddressesQuery = 'SELECT id FROM seller_addresses WHERE seller_id = ?';
      const addressesResult = await client.execute(getAddressesQuery, [types.Uuid.fromString(id)], { prepare: true });
      
      // Delete existing addresses one by one using their IDs
      for (const row of addressesResult.rows) {
        const addressId = row.id;
        const deleteAddressQuery = 'DELETE FROM seller_addresses WHERE id = ? AND seller_id = ?';
        await client.execute(deleteAddressQuery, [addressId, types.Uuid.fromString(id)], { prepare: true });
      }
      
      // Insert new addresses
      const addressQuery = `
        INSERT INTO seller_addresses (
          id, seller_id, address_type, address_line1, address_line2, 
          city, state, postal_code, country, is_default, image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      for (const address of input.addresses) {
        const addressId = uuidv4();
        await client.execute(
          addressQuery,
          [
            types.Uuid.fromString(addressId),
            types.Uuid.fromString(id),
            address.addressType,
            address.addressLine1,
            address.addressLine2 || null,
            address.city,
            address.state,
            address.postalCode,
            address.country,
            address.isDefault,
            address.image || null
          ],
          { prepare: true }
        );
      }
    }
    
    // Update products if provided
    if (input.products && input.products.length > 0) {
      // First retrieve existing products to get their IDs
      const getProductsQuery = 'SELECT id FROM seller_products WHERE seller_id = ?';
      const productsResult = await client.execute(getProductsQuery, [types.Uuid.fromString(id)], { prepare: true });
      
      // Delete existing products one by one using their IDs
      for (const row of productsResult.rows) {
        const productId = row.id;
        const deleteProductQuery = 'DELETE FROM seller_products WHERE id = ? AND seller_id = ?';
        await client.execute(deleteProductQuery, [productId, types.Uuid.fromString(id)], { prepare: true });
      }
      
      // Insert new products
      const productQuery = 'INSERT INTO seller_products (id, seller_id, product_name, category) VALUES (?, ?, ?, ?)';
      
      for (const product of input.products) {
        const productId = uuidv4();
        await client.execute(
          productQuery,
          [
            types.Uuid.fromString(productId),
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
      const documentQuery = 'INSERT INTO seller_documents (id, seller_id, document_type, document_url, uploaded_at) VALUES (?, ?, ?, ?, ?)';
      
      for (const document of input.documents) {
        // Check if document of this type already exists
        const checkQuery = 'SELECT id, document_type FROM seller_documents WHERE seller_id = ? AND document_type = ? ALLOW FILTERING';
        const checkResult = await client.execute(
          checkQuery,
          [types.Uuid.fromString(id), document.documentType],
          { prepare: true }
        );
        
        if (checkResult.rowLength > 0) {
          // Update existing document
          const existingDoc = checkResult.first();
          const updateDocQuery = 'UPDATE seller_documents SET document_url = ?, uploaded_at = ? WHERE id = ? AND seller_id = ? AND document_type = ?';
          await client.execute(
            updateDocQuery,
            [
              document.documentUrl, 
              now, 
              existingDoc.id, 
              types.Uuid.fromString(id), 
              document.documentType
            ],
            { prepare: true }
          );
        } else {
          // Insert new document
          const documentId = uuidv4();
          await client.execute(
            documentQuery,
            [
              types.Uuid.fromString(documentId),
              types.Uuid.fromString(id), 
              document.documentType, 
              document.documentUrl, 
              now
            ],
            { prepare: true }
          );
        }
      }
    }
    
    // Update gallery if provided
    if (input.gallery && input.gallery.length > 0) {
      // First retrieve existing gallery items to get their IDs
      const getGalleryQuery = 'SELECT id FROM seller_gallery WHERE seller_id = ?';
      const galleryResult = await client.execute(getGalleryQuery, [types.Uuid.fromString(id)], { prepare: true });
      
      // Delete existing gallery items one by one using their IDs
      for (const row of galleryResult.rows) {
        const imageId = row.id;
        const deleteGalleryQuery = 'DELETE FROM seller_gallery WHERE id = ? AND seller_id = ?';
        await client.execute(deleteGalleryQuery, [imageId, types.Uuid.fromString(id)], { prepare: true });
      }
      
      // Insert new gallery images
      const galleryQuery = `
        INSERT INTO seller_gallery (
          id, seller_id, image_url, caption, uploaded_at
        )
        VALUES (?, ?, ?, ?, ?)
      `;
      
      for (const image of input.gallery) {
        const imageId = uuidv4();
        await client.execute(
          galleryQuery,
          [
            types.Uuid.fromString(imageId),
            types.Uuid.fromString(id),
            image.imageUrl,
            image.caption || null,
            now
          ],
          { prepare: true }
        );
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error updating seller:', error);
    return false;
  }
}

export async function updateSellerBusiness(id: string, businessData: Partial<SellerBusiness>): Promise<boolean> {
  try {
    const client = await getClient();
    
    const updateFields = [];
    const updateValues = [];
    
    Object.entries(businessData).forEach(([key, value]) => {
      if (key !== 'sellerId' && value !== undefined) {
        // Convert camelCase to snake_case for DB field names
        const fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        updateFields.push(`${fieldName} = ?`);
        updateValues.push(value);
      }
    });
    
    if (updateFields.length > 0) {
      const businessQuery = `UPDATE seller_business SET ${updateFields.join(', ')} WHERE seller_id = ?`;
      updateValues.push(types.Uuid.fromString(id));
      
      await client.execute(businessQuery, updateValues, { prepare: true });
    }
    
    return true;
  } catch (error) {
    console.error('Error updating seller business:', error);
    return false;
  }
}

export async function deleteSeller(id: string): Promise<boolean> {
  try {
    const client = await getClient();
    
    // Get IDs of documents to delete them properly
    const documentIdsQuery = 'SELECT id FROM seller_documents WHERE seller_id = ?';
    const documentsResult = await client.execute(documentIdsQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    // Delete documents one by one
    for (const row of documentsResult.rows) {
      await client.execute(
        'DELETE FROM seller_documents WHERE id = ? AND seller_id = ?', 
        [row.id, types.Uuid.fromString(id)], 
        { prepare: true }
      );
    }
    
    // Get IDs of products to delete them properly
    const productIdsQuery = 'SELECT id FROM seller_products WHERE seller_id = ?';
    const productsResult = await client.execute(productIdsQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    // Delete products one by one
    for (const row of productsResult.rows) {
      await client.execute(
        'DELETE FROM seller_products WHERE id = ? AND seller_id = ?', 
        [row.id, types.Uuid.fromString(id)], 
        { prepare: true }
      );
    }
    
    // Get IDs of addresses to delete them properly
    const addressIdsQuery = 'SELECT id FROM seller_addresses WHERE seller_id = ?';
    const addressesResult = await client.execute(addressIdsQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    // Delete addresses one by one
    for (const row of addressesResult.rows) {
      await client.execute(
        'DELETE FROM seller_addresses WHERE id = ? AND seller_id = ?', 
        [row.id, types.Uuid.fromString(id)], 
        { prepare: true }
      );
    }
    
    // Get IDs of gallery items to delete them properly
    const galleryIdsQuery = 'SELECT id FROM seller_gallery WHERE seller_id = ?';
    const galleryResult = await client.execute(galleryIdsQuery, [types.Uuid.fromString(id)], { prepare: true });
    
    // Delete gallery items one by one
    for (const row of galleryResult.rows) {
      await client.execute(
        'DELETE FROM seller_gallery WHERE id = ? AND seller_id = ?', 
        [row.id, types.Uuid.fromString(id)], 
        { prepare: true }
      );
    }
    
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

export async function updateSellerTopScorer(id: string, topScorerPercentage: number): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    // Ensure percentage is between 0 and 100
    const normalizedPercentage = Math.max(0, Math.min(100, topScorerPercentage));
    
    const query = 'UPDATE sellers SET is_top_scorer = ?, updated_at = ? WHERE id = ?';
    await client.execute(query, [normalizedPercentage, now, types.Uuid.fromString(id)], { prepare: true });
    
    return true;
  } catch (error) {
    console.error('Error updating seller top scorer percentage:', error);
    return false;
  }
}

export async function bulkUpdateSellers(input: SellerBulkUpdateInput): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    for (const id of input.sellerIds) {
      // Update status if provided
      if (input.status) {
        await client.execute(
          'UPDATE sellers SET status = ?, updated_at = ? WHERE id = ?',
          [input.status, now, types.Uuid.fromString(id)],
          { prepare: true }
        );
      }
      
      // Update KYC status if provided
      if (input.kycStatus) {
        await client.execute(
          'UPDATE sellers SET kyc_status = ?, updated_at = ? WHERE id = ?',
          [input.kycStatus, now, types.Uuid.fromString(id)],
          { prepare: true }
        );
      }
      
      // Update top scorer percentage if provided
      if (input.isTopScorer !== undefined) {
        // Ensure percentage is between 0 and 100
        const normalizedPercentage = Math.max(0, Math.min(100, input.isTopScorer));
        
        await client.execute(
          'UPDATE sellers SET is_top_scorer = ?, updated_at = ? WHERE id = ?',
          [normalizedPercentage, now, types.Uuid.fromString(id)],
          { prepare: true }
        );
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error performing bulk update on sellers:', error);
    return false;
  }
}

export async function bulkDeleteSellers(sellerIds: string[]): Promise<boolean> {
  try {
    const client = await getClient();
    
    for (const id of sellerIds) {
      await deleteSeller(id);
    }
    
    return true;
  } catch (error) {
    console.error('Error performing bulk delete on sellers:', error);
    return false;
  }
} 