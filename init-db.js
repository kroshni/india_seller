// Simple script to initialize the database
import { initializeDatabase } from './src/lib/db/init.ts';

async function main() {
  try {
    await initializeDatabase();
    console.log('Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

main(); 