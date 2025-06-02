import { getClient } from '../db/cassandra';
import { v4 as uuidv4 } from 'uuid';
import { types } from 'cassandra-driver';

export interface CustomerRequirement {
  id: string;
  customerId: string;
  customerName: string;
  productName: string;
  details: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequirementFilters {
  search?: string;
  customerId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateRequirementInput {
  customerId: string;
  customerName: string;
  productName: string;
  details: string;
  email: string;
}

export interface UpdateRequirementInput {
  productName?: string;
  details?: string;
  email?: string;
}

// Get all requirements with optional filtering
export async function getAllRequirements(
  filters: RequirementFilters = {}
): Promise<{ requirements: CustomerRequirement[]; total: number }> {
  try {
    console.log('Getting all requirements from database');
    
    const client = await getClient();
    
    // Build query based on filters
    let query = 'SELECT * FROM customer_requirements';
    const queryParams: any[] = [];
    
    // Apply customerId filter if provided
    if (filters.customerId) {
      query += ' WHERE customer_id = ?';
      queryParams.push(filters.customerId);
      // Add ALLOW FILTERING clause for Cassandra
      query += ' ALLOW FILTERING';
    }
    
    console.log('Executing query:', query, 'with params:', queryParams);
    
    // Execute the query
    const result = await client.execute(query, queryParams, { prepare: true });
    
    // Convert rows to CustomerRequirement objects
    let requirements: CustomerRequirement[] = result.rows.map(row => ({
      id: row.id.toString(),
      customerId: row.customer_id,
      customerName: row.customer_name,
      productName: row.product_name,
      details: row.details,
      email: row.email,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
    
    // Apply additional filters in memory
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      requirements = requirements.filter(requirement => 
        requirement.productName.toLowerCase().includes(searchTerm) ||
        requirement.details.toLowerCase().includes(searchTerm) ||
        requirement.email.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort requirements
    if (filters.sortBy) {
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
      requirements.sort((a, b) => {
        let valueA: any = a[filters.sortBy as keyof CustomerRequirement];
        let valueB: any = b[filters.sortBy as keyof CustomerRequirement];
        
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
    const total = requirements.length;
    
    // Apply pagination
    if (filters.page && filters.limit) {
      const startIndex = (filters.page - 1) * filters.limit;
      requirements = requirements.slice(startIndex, startIndex + filters.limit);
    }
    
    console.log(`Found ${total} requirements in database, returning ${requirements.length} after filtering/pagination`);
    
    return {
      requirements,
      total
    };
  } catch (error) {
    console.error('Error getting all requirements:', error);
    return { requirements: [], total: 0 };
  }
}

// Get a requirement by ID
export async function getRequirementById(id: string): Promise<CustomerRequirement | null> {
  try {
    console.log(`Getting requirement details for ID: ${id}`);
    
    const client = await getClient();
    
    // Attempt to convert ID to UUID
    let uuidId;
    try {
      uuidId = types.Uuid.fromString(id);
    } catch (uuidError) {
      console.error(`Invalid UUID format for ID: ${id}`, uuidError);
      return null;
    }
    
    // Get requirement details
    const query = 'SELECT * FROM customer_requirements WHERE id = ?';
    const result = await client.execute(query, [uuidId], { prepare: true });
    
    if (result.rowLength === 0) {
      console.log(`No requirement found in database with ID: ${id}`);
      return null;
    }
    
    const row = result.first();
    
    return {
      id: row.id.toString(),
      customerId: row.customer_id,
      customerName: row.customer_name,
      productName: row.product_name,
      details: row.details,
      email: row.email,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  } catch (error) {
    console.error(`Error getting requirement by ID ${id}:`, error);
    return null;
  }
}

// Create a new requirement
export async function createRequirement(data: CreateRequirementInput): Promise<CustomerRequirement | null> {
  try {
    console.log('Creating new requirement:', data);
    
    const client = await getClient();
    
    const id = uuidv4();
    const timestamp = new Date();
    
    const query = `
      INSERT INTO customer_requirements (
        id, customer_id, customer_name, product_name, details, email, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      types.Uuid.fromString(id),
      data.customerId,
      data.customerName,
      data.productName,
      data.details,
      data.email,
      timestamp,
      timestamp
    ];
    
    await client.execute(query, params, { prepare: true });
    
    return {
      id,
      customerId: data.customerId,
      customerName: data.customerName,
      productName: data.productName,
      details: data.details,
      email: data.email,
      createdAt: timestamp,
      updatedAt: timestamp
    };
  } catch (error) {
    console.error('Error creating requirement:', error);
    return null;
  }
}

// Update an existing requirement
export async function updateRequirement(id: string, data: UpdateRequirementInput): Promise<boolean> {
  try {
    console.log(`Updating requirement ${id}:`, data);
    
    const client = await getClient();
    
    // Check if requirement exists
    const existingRequirement = await getRequirementById(id);
    if (!existingRequirement) {
      console.log(`Requirement with ID ${id} not found`);
      return false;
    }
    
    // Build update query
    const updateFields: string[] = [];
    const updateParams: any[] = [];
    
    if (data.productName !== undefined) {
      updateFields.push('product_name = ?');
      updateParams.push(data.productName);
    }
    
    if (data.details !== undefined) {
      updateFields.push('details = ?');
      updateParams.push(data.details);
    }
    
    if (data.email !== undefined) {
      updateFields.push('email = ?');
      updateParams.push(data.email);
    }
    
    // Always update the updated_at timestamp
    updateFields.push('updated_at = ?');
    const timestamp = new Date();
    updateParams.push(timestamp);
    
    // Add the ID to the params
    updateParams.push(types.Uuid.fromString(id));
    
    // Execute the update query
    const query = `UPDATE customer_requirements SET ${updateFields.join(', ')} WHERE id = ?`;
    await client.execute(query, updateParams, { prepare: true });
    
    return true;
  } catch (error) {
    console.error(`Error updating requirement ${id}:`, error);
    return false;
  }
}

// Delete a requirement
export async function deleteRequirement(id: string): Promise<boolean> {
  try {
    console.log(`Deleting requirement with ID: ${id}`);
    
    const client = await getClient();
    
    // Check if requirement exists
    const existingRequirement = await getRequirementById(id);
    if (!existingRequirement) {
      console.log(`Requirement with ID ${id} not found`);
      return false;
    }
    
    // Delete the requirement
    const query = 'DELETE FROM customer_requirements WHERE id = ?';
    await client.execute(query, [types.Uuid.fromString(id)], { prepare: true });
    
    return true;
  } catch (error) {
    console.error(`Error deleting requirement ${id}:`, error);
    return false;
  }
}

// Initialize the customer_requirements table in the database
export async function initializeRequirementsTable() {
  try {
    const client = await getClient();
    
    // Create customer_requirements table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS customer_requirements (
        id uuid PRIMARY KEY,
        customer_id text,
        customer_name text,
        product_name text,
        details text,
        email text,
        created_at timestamp,
        updated_at timestamp
      )
    `);
    
    console.log('Customer requirements table initialized');
    return true;
  } catch (error) {
    console.error('Error initializing customer requirements table:', error);
    return false;
  }
}