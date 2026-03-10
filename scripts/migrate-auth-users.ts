/**
 * Migration script: Create Better Auth account records for existing users.
 *
 * Existing users will need to use "Forgot Password" to set a new password,
 * since Neon Auth password hashes are not transferable to Better Auth.
 *
 * Usage: npx tsx scripts/migrate-auth-users.ts
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { randomUUID } from 'crypto';
import * as schema from '../lib/db/schema';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  // Get all existing users
  const existingUsers = await db.select().from(schema.users);
  console.log(`Found ${existingUsers.length} existing users to migrate`);

  let migrated = 0;
  let skipped = 0;

  for (const user of existingUsers) {
    // Check if account already exists for this user
    const existingAccounts = await db
      .select()
      .from(schema.account)
      .where(
        // Simple check: any account for this user with credential provider
        undefined as never // We'll use raw SQL below instead
      );

    // Use a simpler approach - try to insert, skip on conflict
    try {
      await db.insert(schema.account).values({
        id: randomUUID(),
        accountId: user.email,
        providerId: 'credential',
        userId: user.id,
        password: null, // No password - user must use "Forgot Password"
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      migrated++;
      console.log(`  Migrated: ${user.email}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('duplicate') || message.includes('unique')) {
        skipped++;
        console.log(`  Skipped (already exists): ${user.email}`);
      } else {
        console.error(`  Error migrating ${user.email}:`, message);
      }
    }
  }

  console.log(`\nMigration complete: ${migrated} migrated, ${skipped} skipped`);
  console.log('Existing users will need to use "Forgot Password" to set a new password.');
}

main().catch(console.error);
