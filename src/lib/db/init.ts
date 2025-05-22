import { createKeyspaceIfNotExists, initializeSchema, shutdownClient } from './cassandra';
import { seedAdminUser } from '../auth';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Create keyspace if it doesn't exist
    await createKeyspaceIfNotExists();
    console.log('Keyspace indiaseller1 created or already exists');
    
    // Create tables if they don't exist
    await initializeSchema();
    console.log('Schema initialized');
    
    // Seed admin user if no admin exists
    await seedAdminUser();
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await shutdownClient();
  }
}

// Export function to run from a script or on app initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
} 