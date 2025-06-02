import { getClient } from '../db/cassandra';
import { createCustomerUser } from '../auth';
import { createCustomer } from './customer-service';
import { types } from 'cassandra-driver';

/**
 * Creates a new customer with an associated user account
 * This function combines the customer creation with user account creation
 */
export async function registerCustomer({
  name,
  email,
  phone,
  password,
  profilePicture,
  addresses = [],
  documents = []
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
  profilePicture?: string;
  addresses?: Array<{
    addressType: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
  documents?: Array<{
    documentType: string;
    documentUrl: string;
  }>;
}) {
  try {
    // First check if a user with this email already exists
    const client = await getClient();
    const checkQuery = 'SELECT email FROM users WHERE email = ?';
    const checkResult = await client.execute(checkQuery, [email], { prepare: true });
    
    if (checkResult.rowLength > 0) {
      throw new Error('User already exists');
    }
    
    // Create the customer record
    const customerId = await createCustomer({
      name,
      email,
      phone,
      profilePicture,
      addresses,
      documents
    });
    
    if (!customerId) {
      throw new Error('Failed to create customer record');
    }
    
    // Create the user account
    const customerUser = await createCustomerUser(
      email,
      password,
      name,
      customerId
    );
    
    if (!customerUser) {
      // If user creation fails, we should ideally roll back the customer creation
      // but for simplicity, we'll just log an error
      console.error(`Created customer ${customerId} but failed to create user account`);
      throw new Error('Failed to create user account');
    }
    
    return {
      customerId,
      email,
      name,
      role: 'customer'
    };
  } catch (error) {
    console.error('Error in registerCustomer:', error);
    throw error;
  }
}

/**
 * Gets a customer profile by user email
 */
export async function getCustomerProfileByEmail(email: string) {
  try {
    const client = await getClient();
    
    // Find the customer ID associated with this email
    const customerQuery = 'SELECT id FROM customers WHERE email = ? ALLOW FILTERING';
    const customerResult = await client.execute(customerQuery, [email], { prepare: true });
    
    if (customerResult.rowLength === 0) {
      return null;
    }
    
    const customerId = customerResult.first().id.toString();
    
    // Get the full customer details
    const detailsQuery = 'SELECT * FROM customers WHERE id = ?';
    const detailsResult = await client.execute(
      detailsQuery, 
      [types.Uuid.fromString(customerId)], 
      { prepare: true }
    );
    
    if (detailsResult.rowLength === 0) {
      return null;
    }
    
    const customer = detailsResult.first();
    
    // Get addresses
    const addressesQuery = 'SELECT * FROM customer_addresses WHERE customer_id = ? ALLOW FILTERING';
    const addressesResult = await client.execute(
      addressesQuery,
      [types.Uuid.fromString(customerId)],
      { prepare: true }
    );
    
    // Get documents
    const documentsQuery = 'SELECT * FROM customer_documents WHERE customer_id = ? ALLOW FILTERING';
    const documentsResult = await client.execute(
      documentsQuery,
      [types.Uuid.fromString(customerId)],
      { prepare: true }
    );
    
    return {
      customer: {
        id: customer.id.toString(),
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        profilePicture: customer.profile_picture,
        status: customer.status,
        createdAt: customer.created_at,
        updatedAt: customer.updated_at
      },
      addresses: addressesResult.rows.map(row => ({
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
      })),
      documents: documentsResult.rows.map(row => ({
        id: row.id.toString(),
        customerId: row.customer_id.toString(),
        documentType: row.document_type,
        documentUrl: row.document_url,
        uploadedAt: row.uploaded_at
      }))
    };
  } catch (error) {
    console.error('Error getting customer profile by email:', error);
    return null;
  }
}