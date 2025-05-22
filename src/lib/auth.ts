import { getClient } from './db/cassandra';
import { compare, hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  email: string;
  name: string;
  role: string;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const client = await getClient();
    const query = 'SELECT email, password, name, role FROM users WHERE email = ?';
    const result = await client.execute(query, [email], { prepare: true });
    
    const user = result.first();
    if (!user) return null;

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) return null;

    return {
      email: user.email,
      name: user.name,
      role: user.role
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function createUser(email: string, password: string, name: string, role: string = 'admin'): Promise<User | null> {
  try {
    const client = await getClient();
    
    // Check if user already exists
    const checkQuery = 'SELECT email FROM users WHERE email = ?';
    const checkResult = await client.execute(checkQuery, [email], { prepare: true });
    
    if (checkResult.rowLength > 0) {
      throw new Error('User already exists');
    }
    
    const hashedPassword = await hash(password, 10);
    const timestamp = new Date();
    
    const insertQuery = 'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, ?)';
    await client.execute(insertQuery, [email, hashedPassword, name, role, timestamp], { prepare: true });
    
    return { email, name, role };
  } catch (error) {
    console.error('Create user error:', error);
    return null;
  }
}

// Seed an initial admin user if none exists
export async function seedAdminUser() {
  try {
    const client = await getClient();
    const query = 'SELECT count(*) as count FROM users WHERE role = ? ALLOW FILTERING';
    const result = await client.execute(query, ['admin'], { prepare: true });
    
    const count = result.first()?.count?.low || 0;
    
    if (count === 0) {
      await createUser(
        'admin@example.com',
        'Admin@123',
        'Admin User',
        'admin'
      );
      console.log('Admin user seeded');
    }
  } catch (error) {
    console.error('Seed admin error:', error);
  }
} 