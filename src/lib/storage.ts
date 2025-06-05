/**
 * Storage service for handling file uploads
 * This implementation provides a simple interface for uploading files to different storage providers
 * Currently supports local file system storage, but can be extended to support cloud storage providers
 */

import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Base directory for file storage
const STORAGE_BASE_DIR = process.env.STORAGE_BASE_DIR || './public/uploads';

/**
 * Upload a file to storage
 * @param file The file to upload
 * @param fileName The name to save the file as (can include subdirectories)
 * @param directory The directory within the storage to save the file
 * @returns The URL of the uploaded file
 */
export async function uploadToStorage(
  file: File,
  fileName: string,
  directory: string = 'uploads'
): Promise<string> {
  try {
    // Create a buffer from the file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Ensure the directory exists
    const fullDir = path.join(STORAGE_BASE_DIR, directory);
    await fs.mkdir(fullDir, { recursive: true });
    
    // Save the file
    const fullPath = path.join(fullDir, fileName);
    await fs.writeFile(fullPath, buffer);
    
    // Return the URL (relative to the public directory)
    return `/uploads/${directory}/${fileName}`;
  } catch (error) {
    console.error('Error uploading file to storage:', error);
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`); 
  }
}

/**
 * Delete a file from storage
 * @param fileUrl The URL of the file to delete
 * @returns A boolean indicating whether the deletion was successful
 */
export async function deleteFromStorage(fileUrl: string): Promise<boolean> {
  try {
    // Extract the file path from the URL
    const filePath = fileUrl.replace('/uploads/', '');
    const fullPath = path.join(STORAGE_BASE_DIR, filePath);
    
    // Check if the file exists
    try {
      await fs.access(fullPath);
    } catch {
      console.warn(`File not found: ${fullPath}`);
      return false;
    }
    
    // Delete the file
    await fs.unlink(fullPath);
    return true;
  } catch (error) {
    console.error('Error deleting file from storage:', error);
    return false;
  }
}

/**
 * Generate a unique filename for a file
 * @param originalName The original name of the file
 * @returns A unique filename
 */
export function generateUniqueFileName(originalName: string): string {
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  const timestamp = Date.now();
  const uuid = uuidv4().substring(0, 8);
  
  return `${baseName}_${timestamp}_${uuid}${extension}`;
}