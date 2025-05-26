import { initializeDatabase } from './cassandra';

// Use a safe way to check for browser environment
const isBrowser = typeof window !== 'undefined';

export async function initDB() {
  // Skip initialization in browser
  if (isBrowser) {
    console.log('Running in browser environment, skipping database initialization');
    return;
  }
  
  try {
    console.log('Initializing database connection and tables...');
    
    // Force connection attempt
    const success = await initializeDatabase();
    
    if (success) {
      console.log('Database initialization completed successfully');
    } else {
      console.warn('Database initialization failed - this will cause categories to be stored in memory only');
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data for development - restart the server with proper database configuration');
      }
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
    
    // In production, we might want to throw, but in development just continue
    if (process.env.NODE_ENV === 'production') {
      throw error;
    } else {
      console.log('Using mock data for development since database connection failed');
    }
  }
} 