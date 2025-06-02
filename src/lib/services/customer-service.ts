import { getClient } from '../db/cassandra';
import { v4 as uuidv4 } from 'uuid';
import { types } from 'cassandra-driver';

// Check if we should use mock data
function shouldUseMockData(): boolean {
  // Always use database, never mock data
  return false;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerAddress {
  id: string;
  customerId: string;
  addressType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerDocument {
  id: string;
  customerId: string;
  documentType: string;
  documentUrl: string;
  uploadedAt: Date;
}

export interface CustomerFilters {
  search?: string;
  status?: 'Active' | 'Inactive' | 'All';
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CustomerBulkUpdateInput {
  customerIds: string[];
  status?: 'Active' | 'Inactive';
}

export interface CreateCustomerInput {
  // Personal details
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  
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
  }[];
  
  // Documents
  documents?: {
    documentType: string;
    documentUrl: string;
  }[];
}

export async function getAllCustomers(
  filters: CustomerFilters = {}
): Promise<{ customers: Customer[]; total: number }> {
  try {
    console.log('Getting all customers from database');
    
    const client = await getClient();
    
    // Build query based on filters
    let query = 'SELECT * FROM customers';
    const queryParams: any[] = [];
    
    // Apply status filter if provided
    if (filters.status && filters.status !== 'All') {
      query += ' WHERE status = ?';
      queryParams.push(filters.status);
      // Add ALLOW FILTERING clause for Cassandra
      query += ' ALLOW FILTERING';
    }
    
    console.log('Executing query:', query, 'with params:', queryParams);
    
    // Execute the query
    const result = await client.execute(query, queryParams, { prepare: true });
    
    // Convert rows to Customer objects
    let customers: Customer[] = result.rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      email: row.email,
      phone: row.phone,
      profilePicture: row.profile_picture,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
    
    // Apply additional filters in memory
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      customers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm)
      );
    }
    
    // Sort customers
    if (filters.sortBy) {
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
      customers.sort((a, b) => {
        let valueA: any = a[filters.sortBy as keyof Customer];
        let valueB: any = b[filters.sortBy as keyof Customer];
        
        // Handle string comparison
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortOrder * valueA.localeCompare(valueB);
        }
        
        // Handle date comparison
        if (valueA instanceof Date && valueB instanceof Date) {
          return sortOrder * (valueA.getTime() - valueB.getTime());
        }
        
        // Handle number comparison
        return sortOrder * ((valueA || 0) - (valueB || 0));
      });
    }
    
    // Get total before pagination
    const total = customers.length;
    
    // Apply pagination
    if (filters.page && filters.limit) {
      const startIndex = (filters.page - 1) * filters.limit;
      customers = customers.slice(startIndex, startIndex + filters.limit);
    }
    
    console.log(`Found ${total} customers in database, returning ${customers.length} after filtering/pagination`);
    
    return {
      customers,
      total
    };
  } catch (error) {
    console.error('Error getting all customers:', error);
    return { customers: [], total: 0 };
  }
}

export async function getCustomerById(id: string): Promise<{
  customer: Customer;
  addresses: CustomerAddress[];
  documents: CustomerDocument[];
} | null> {
  try {
    console.log(`Getting customer details for ID: ${id}`);
    
    const client = await getClient();
    
    // Attempt to convert ID to UUID
    let uuidId;
    try {
      uuidId = types.Uuid.fromString(id);
    } catch (uuidError) {
      console.error(`Invalid UUID format for ID: ${id}`, uuidError);
      return null;
    }
    
    // Get customer personal details
    const customerQuery = 'SELECT * FROM customers WHERE id = ?';
    const customerResult = await client.execute(customerQuery, [uuidId], { prepare: true });
    
    if (customerResult.rowLength === 0) {
      console.log(`No customer found in database with ID: ${id}`);
      return null;
    }
    
    const customerRow = customerResult.first();
    const customer: Customer = {
      id: customerRow.id.toString(),
      name: customerRow.name,
      email: customerRow.email,
      phone: customerRow.phone,
      profilePicture: customerRow.profile_picture,
      status: customerRow.status,
      createdAt: customerRow.created_at,
      updatedAt: customerRow.updated_at
    };
    
    // Get addresses with ALLOW FILTERING since we don't have a secondary index
    const addressesQuery = 'SELECT * FROM customer_addresses WHERE customer_id = ? ALLOW FILTERING';
    const addressesResult = await client.execute(addressesQuery, [uuidId], { prepare: true });
    
    const addresses: CustomerAddress[] = addressesResult.rows.map(row => ({
      id: row.id.toString(),
      customerId: row.customer_id.toString(),
      addressType: row.address_type,
      addressLine1: row.address_line1,
      addressLine2: row.address_line2,
      city: row.city,
      state: row.state,
      postalCode: row.postal_code,
      country: row.country,
      isDefault: row.is_default
    }));
    
    // Get documents
    const documentsQuery = 'SELECT * FROM customer_documents WHERE customer_id = ?';
    const documentsResult = await client.execute(documentsQuery, [uuidId], { prepare: true });
    
    const documents: CustomerDocument[] = documentsResult.rows.map(row => ({
      id: row.id ? row.id.toString() : uuidv4(),
      customerId: row.customer_id.toString(),
      documentType: row.document_type,
      documentUrl: row.document_url,
      uploadedAt: row.uploaded_at
    }));
    
    console.log(`Successfully retrieved customer ${id} from database`);
    
    return {
      customer,
      addresses,
      documents
    };
  } catch (error) {
    console.error('Error getting customer by ID:', error);
    return null;
  }
}

export async function createCustomer(input: CreateCustomerInput): Promise<string | null> {
  try {
    const client = await getClient();
    const customerId = uuidv4();
    const now = new Date();
    
    // Insert customer personal details
    const customerQuery = `
      INSERT INTO customers (
        id, name, email, phone, profile_picture, status, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await client.execute(
      customerQuery,
      [
        types.Uuid.fromString(customerId),
        input.name,
        input.email,
        input.phone,
        input.profilePicture || null,
        'Active', // status default
        now,
        now
      ],
      { prepare: true }
    );
    
    console.log(`Created customer record for ${input.name} with ID ${customerId}`);
    
    // Insert addresses
    if (input.addresses && input.addresses.length > 0) {
      try {
        const addressQuery = `
          INSERT INTO customer_addresses (
            id, customer_id, address_type, address_line1, address_line2, 
            city, state, postal_code, country, is_default
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        for (const address of input.addresses) {
          const addressId = uuidv4();
          await client.execute(
            addressQuery,
            [
              types.Uuid.fromString(addressId),
              types.Uuid.fromString(customerId),
              address.addressType,
              address.addressLine1,
              address.addressLine2 || null,
              address.city,
              address.state,
              address.postalCode,
              address.country,
              address.isDefault
            ],
            { prepare: true }
          );
        }
        console.log(`Created ${input.addresses.length} addresses for customer ${customerId}`);
      } catch (error) {
        console.error(`Error creating addresses for customer ${customerId}:`, error);
        // Continue execution - don't fail the entire operation if addresses fail
      }
    }
    
    // Insert documents
    if (input.documents && input.documents.length > 0) {
      try {
        const documentQuery = `
          INSERT INTO customer_documents (
            id, customer_id, document_type, document_url, uploaded_at
          )
          VALUES (?, ?, ?, ?, ?)
        `;
        
        // Track document types to avoid duplicates which would cause primary key conflicts
        const processedDocTypes = new Set();
        
        for (const document of input.documents) {
          // Skip duplicate document types to avoid primary key conflicts
          if (processedDocTypes.has(document.documentType)) {
            console.warn(`Skipping duplicate document type: ${document.documentType} for customer ${customerId}`);
            continue;
          }
          
          processedDocTypes.add(document.documentType);
          const documentId = uuidv4();
          
          await client.execute(
            documentQuery,
            [
              types.Uuid.fromString(documentId),
              types.Uuid.fromString(customerId),
              document.documentType,
              document.documentUrl,
              now
            ],
            { prepare: true }
          );
        }
        console.log(`Created ${processedDocTypes.size} documents for customer ${customerId}`);
      } catch (error) {
        console.error(`Error creating documents for customer ${customerId}:`, error);
        // Continue execution - don't fail the entire operation if documents fail
      }
    }
    
    return customerId;
  } catch (error) {
    console.error('Error creating customer:', error);
    return null;
  }
}

export async function updateCustomer(id: string, input: Partial<CreateCustomerInput>): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    // Update customer personal details if provided
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
      
      // Always update the updated_at timestamp
      updateFields.push('updated_at = ?');
      updateValues.push(now);
      
      // Add the ID to the values array
      updateValues.push(types.Uuid.fromString(id));
      
      const updateQuery = `
        UPDATE customers 
        SET ${updateFields.join(', ')} 
        WHERE id = ?
      `;
      
      await client.execute(updateQuery, updateValues, { prepare: true });
      console.log(`Updated customer personal details for ID ${id}`);
    }
    
    // Update addresses if provided
    if (input.addresses && input.addresses.length > 0) {
      try {
        // First, get existing addresses with ALLOW FILTERING since we don't have a secondary index
        const existingAddressesQuery = 'SELECT id FROM customer_addresses WHERE customer_id = ? ALLOW FILTERING';
        const existingAddressesResult = await client.execute(
          existingAddressesQuery, 
          [types.Uuid.fromString(id)], 
          { prepare: true }
        );
        
        const existingAddressIds = new Set(
          existingAddressesResult.rows.map(row => row.id.toString())
        );
        
        // Delete all existing addresses for this customer
        if (existingAddressIds.size > 0) {
          // Delete each address individually by ID since we can't filter by customer_id in DELETE
          for (const addressId of existingAddressIds) {
            await client.execute(
              'DELETE FROM customer_addresses WHERE id = ?',
              [types.Uuid.fromString(addressId)],
              { prepare: true }
            );
          }
          console.log(`Deleted ${existingAddressIds.size} existing addresses for customer ${id}`);
        }
        
        // Insert new addresses
        const insertAddressPromises = input.addresses.map(async (address) => {
          const addressId = address.id && !address.id.startsWith('temp-')
            ? address.id
            : types.Uuid.random().toString();
          
          const insertAddressQuery = `
            INSERT INTO customer_addresses (
              id, customer_id, address_type, address_line1, address_line2,
              city, state, postal_code, country, is_default
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          
          await client.execute(
            insertAddressQuery,
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
              address.isDefault
            ],
            { prepare: true }
          );
          
          console.log(`Inserted address ${addressId} for customer ${id}`);
          return addressId;
        });
        
        await Promise.all(insertAddressPromises);
        console.log(`Created ${input.addresses.length} new addresses for customer ${id}`);
      } catch (error) {
        console.error(`Error updating addresses for customer ${id}:`, error);
        // Continue execution - don't fail the entire operation if addresses fail
      }
    }
    
    // Update documents if provided
    if (input.documents && input.documents.length > 0) {
      try {
        // First, get existing documents to determine which ones to update vs. insert
        const existingDocumentsQuery = 'SELECT document_type FROM customer_documents WHERE customer_id = ?';
        const existingDocumentsResult = await client.execute(
          existingDocumentsQuery, 
          [types.Uuid.fromString(id)], 
          { prepare: true }
        );
        
        const existingDocTypes = new Set(
          existingDocumentsResult.rows.map(row => row.document_type)
        );
        
        // Track document types to avoid duplicates which would cause primary key conflicts
        const processedDocTypes = new Set();
        
        for (const document of input.documents) {
          // Skip duplicate document types to avoid primary key conflicts
          if (processedDocTypes.has(document.documentType)) {
            console.warn(`Skipping duplicate document type: ${document.documentType} for customer ${id}`);
            continue;
          }
          
          processedDocTypes.add(document.documentType);
          
          // Check if this document type already exists
          if (existingDocTypes.has(document.documentType)) {
            // Update existing document
            const updateDocumentQuery = `
              UPDATE customer_documents 
              SET document_url = ?, uploaded_at = ? 
              WHERE customer_id = ? AND document_type = ?
            `;
            
            await client.execute(
              updateDocumentQuery,
              [
                document.documentUrl,
                now,
                types.Uuid.fromString(id),
                document.documentType
              ],
              { prepare: true }
            );
          } else {
            // Insert new document
            const documentId = uuidv4();
            const insertDocumentQuery = `
              INSERT INTO customer_documents (
                id, customer_id, document_type, document_url, uploaded_at
              )
              VALUES (?, ?, ?, ?, ?)
            `;
            
            await client.execute(
              insertDocumentQuery,
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
        
        console.log(`Updated ${processedDocTypes.size} documents for customer ${id}`);
      } catch (error) {
        console.error(`Error updating documents for customer ${id}:`, error);
        // Continue execution - don't fail the entire operation if documents fail
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error updating customer:', error);
    return false;
  }
}

export async function deleteCustomer(id: string): Promise<boolean> {
  try {
    const client = await getClient();
    
    // First get all addresses for this customer
    const addressesQuery = 'SELECT id FROM customer_addresses WHERE customer_id = ? ALLOW FILTERING';
    const addressesResult = await client.execute(
      addressesQuery,
      [types.Uuid.fromString(id)],
      { prepare: true }
    );
    
    // Delete each address individually
    for (const row of addressesResult.rows) {
      await client.execute(
        'DELETE FROM customer_addresses WHERE id = ?',
        [row.id],
        { prepare: true }
      );
    }
    
    // Delete customer documents
    await client.execute(
      'DELETE FROM customer_documents WHERE customer_id = ?',
      [types.Uuid.fromString(id)],
      { prepare: true }
    );
    
    // Delete customer record
    await client.execute(
      'DELETE FROM customers WHERE id = ?',
      [types.Uuid.fromString(id)],
      { prepare: true }
    );
    
    console.log(`Successfully deleted customer with ID ${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting customer:', error);
    return false;
  }
}

export async function updateCustomerStatus(
  id: string,
  status: 'Active' | 'Inactive'
): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    await client.execute(
      'UPDATE customers SET status = ?, updated_at = ? WHERE id = ?',
      [status, now, types.Uuid.fromString(id)],
      { prepare: true }
    );
    
    console.log(`Updated status to ${status} for customer ${id}`);
    return true;
  } catch (error) {
    console.error('Error updating customer status:', error);
    return false;
  }
}

export async function bulkUpdateCustomers(
  input: CustomerBulkUpdateInput
): Promise<boolean> {
  try {
    const client = await getClient();
    const now = new Date();
    
    // Update status if provided
    if (input.status) {
      for (const customerId of input.customerIds) {
        await client.execute(
          'UPDATE customers SET status = ?, updated_at = ? WHERE id = ?',
          [input.status, now, types.Uuid.fromString(customerId)],
          { prepare: true }
        );
      }
      
      console.log(`Updated status to ${input.status} for ${input.customerIds.length} customers`);
    }
    
    return true;
  } catch (error) {
    console.error('Error bulk updating customers:', error);
    return false;
  }
}