import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Lazy-initialize database client
let _db: NeonHttpDatabase<typeof schema> | null = null;

function getDb() {
  if (_db) return _db;

  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set in environment variables. Please check your .env.local file.');
  }

  // Create Neon SQL client
  const sql = neon(databaseUrl);

  // Create Drizzle database instance with schema
  _db = drizzle(sql, { schema });
  return _db;
}

// Export database client with lazy initialization
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    const dbInstance = getDb();
    return (dbInstance as unknown as Record<string, unknown>)[prop as string];
  }
});

// Export schema, types, and operations
export * from './schema';
export * from './operations';
export type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

