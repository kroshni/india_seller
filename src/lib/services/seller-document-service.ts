import { v4 as uuidv4 } from 'uuid';
import { executeQuery } from '../db';
import { uploadToStorage } from '../storage';

export interface SellerDocument {
  id: string;
  sellerId: string;
  documentType: string;
  documentUrl: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Upload a document for a seller
 * @param sellerId The ID of the seller
 * @param documentType The type of document being uploaded
 * @param file The file to upload
 * @returns The ID of the newly created document
 */
export async function uploadSellerDocument(
  sellerId: string,
  documentType: string,
  file: File
): Promise<string> {
  // Generate a unique ID for the document
  const documentId = uuidv4();
  
  // Upload the file to storage and get the URL
  const fileName = `${sellerId}/${documentType}_${Date.now()}_${file.name}`;
  const documentUrl = await uploadToStorage(file, fileName, 'seller-documents');
  
  // Check if a document of this type already exists for this seller
  const existingDocQuery = `
    SELECT id FROM seller_documents 
    WHERE seller_id = ? AND document_type = ?
  `;
  
  const existingDocs = await executeQuery(existingDocQuery, [sellerId, documentType]);
  
  if (existingDocs.length > 0) {
    // Update the existing document
    const updateQuery = `
      UPDATE seller_documents 
      SET document_url = ?, status = 'Pending', comments = NULL, updated_at = NOW() 
      WHERE seller_id = ? AND document_type = ?
    `;
    
    await executeQuery(updateQuery, [documentUrl, sellerId, documentType]);
    return existingDocs[0].id;
  } else {
    // Insert a new document record
    const insertQuery = `
      INSERT INTO seller_documents (
        id, seller_id, document_type, document_url, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, 'Pending', NOW(), NOW())
    `;
    
    await executeQuery(insertQuery, [documentId, sellerId, documentType, documentUrl]);
    return documentId;
  }
}

/**
 * Get all documents for a seller
 * @param sellerId The ID of the seller
 * @returns Array of seller documents
 */
export async function getSellerDocuments(sellerId: string): Promise<SellerDocument[]> {
  const query = `
    SELECT 
      id, seller_id as sellerId, document_type as documentType, 
      document_url as documentUrl, status, comments, 
      created_at as createdAt, updated_at as updatedAt 
    FROM seller_documents 
    WHERE seller_id = ? 
    ORDER BY updated_at DESC
  `;
  
  const documents = await executeQuery(query, [sellerId]);
  return documents as SellerDocument[];
}

/**
 * Get a specific document by ID
 * @param documentId The ID of the document
 * @returns The document or null if not found
 */
export async function getDocumentById(documentId: string): Promise<SellerDocument | null> {
  const query = `
    SELECT 
      id, seller_id as sellerId, document_type as documentType, 
      document_url as documentUrl, status, comments, 
      created_at as createdAt, updated_at as updatedAt 
    FROM seller_documents 
    WHERE id = ?
  `;
  
  const documents = await executeQuery(query, [documentId]);
  
  if (documents.length === 0) {
    return null;
  }
  
  return documents[0] as SellerDocument;
}

/**
 * Update the status of a document
 * @param documentId The ID of the document
 * @param status The new status
 * @param comments Optional comments about the status change
 */
export async function updateDocumentStatus(
  documentId: string,
  status: 'Pending' | 'Verified' | 'Rejected',
  comments?: string
): Promise<void> {
  const query = `
    UPDATE seller_documents 
    SET status = ?, comments = ?, updated_at = NOW() 
    WHERE id = ?
  `;
  
  await executeQuery(query, [status, comments || null, documentId]);
}

/**
 * Delete a document
 * @param documentId The ID of the document to delete
 */
export async function deleteDocument(documentId: string): Promise<void> {
  const query = `DELETE FROM seller_documents WHERE id = ?`;
  await executeQuery(query, [documentId]);
}