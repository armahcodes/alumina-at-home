/**
 * Database Setup Script for Alumina At Home
 * 
 * This script handles:
 * - Database connection verification
 * - Schema migration (creating tables if they don't exist)
 * - Seeding initial data
 * 
 * Usage: npx tsx scripts/setup-database.ts
 */

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in .env.local');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testConnection(): Promise<boolean> {
  log('\n🔌 Testing database connection...', 'cyan');
  try {
    const result = await sql`SELECT NOW() as current_time, current_database() as db_name`;
    log(`✅ Connected to database: ${result[0].db_name}`, 'green');
    log(`   Server time: ${result[0].current_time}`, 'green');
    return true;
  } catch (error) {
    log(`❌ Connection failed: ${error}`, 'red');
    return false;
  }
}

async function createEnums(): Promise<void> {
  log('\n📦 Creating enum types...', 'cyan');
  
  const enums = [
    {
      name: 'experience_level',
      values: ['beginner', 'intermediate', 'advanced']
    },
    {
      name: 'budget',
      values: ['essential', 'intermediate', 'premium']
    },
    {
      name: 'time_of_day',
      values: ['morning', 'afternoon', 'evening', 'bedtime']
    },
    {
      name: 'equipment_tier',
      values: ['essential', 'intermediate', 'premium']
    }
  ];

  for (const enumDef of enums) {
    try {
      // Check if enum exists
      const exists = await sql`
        SELECT 1 FROM pg_type WHERE typname = ${enumDef.name}
      `;
      
      if (exists.length === 0) {
        const valuesStr = enumDef.values.map(v => `'${v}'`).join(', ');
        await sql.unsafe(`CREATE TYPE ${enumDef.name} AS ENUM (${valuesStr})`);
        log(`   ✅ Created enum: ${enumDef.name}`, 'green');
      } else {
        log(`   ⏭️  Enum already exists: ${enumDef.name}`, 'yellow');
      }
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        log(`   ⏭️  Enum already exists: ${enumDef.name}`, 'yellow');
      } else {
        throw error;
      }
    }
  }
}

async function createTables(): Promise<void> {
  log('\n🗃️  Creating tables...', 'cyan');

  // Users table
  await createTable('users', `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      has_completed_onboarding BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      last_login_at TIMESTAMPTZ
    )
  `);

  // User profiles table
  await createTable('user_profiles', `
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      goals TEXT[] DEFAULT '{}',
      experience_level experience_level DEFAULT 'beginner',
      available_time INTEGER DEFAULT 0,
      health_conditions TEXT[] DEFAULT '{}',
      budget budget DEFAULT 'essential',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // User stats table
  await createTable('user_stats', `
    CREATE TABLE IF NOT EXISTS user_stats (
      user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      total_points INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      last_activity_date DATE,
      total_protocols_completed INTEGER DEFAULT 0,
      total_days_active INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Daily metrics table
  await createTable('daily_metrics', `
    CREATE TABLE IF NOT EXISTS daily_metrics (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      date DATE NOT NULL,
      energy INTEGER,
      sleep INTEGER,
      mood INTEGER,
      notes TEXT,
      protocols_completed INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Completed tasks table
  await createTable('completed_tasks', `
    CREATE TABLE IF NOT EXISTS completed_tasks (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      task_id VARCHAR(255) NOT NULL,
      task_name VARCHAR(255) NOT NULL,
      task_category VARCHAR(100),
      points_earned INTEGER DEFAULT 10,
      completed_at TIMESTAMPTZ DEFAULT NOW(),
      date DATE DEFAULT CURRENT_DATE
    )
  `);

  // Achievements catalog table
  await createTable('achievements_catalog', `
    CREATE TABLE IF NOT EXISTS achievements_catalog (
      achievement_id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      icon VARCHAR(10),
      points INTEGER DEFAULT 0,
      unlock_criteria JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Achievements table
  await createTable('achievements', `
    CREATE TABLE IF NOT EXISTS achievements (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      achievement_id VARCHAR(255) NOT NULL,
      achievement_title VARCHAR(255) NOT NULL,
      achievement_description TEXT,
      points_earned INTEGER DEFAULT 0,
      unlocked_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Supplements tracking table
  await createTable('supplements_tracking', `
    CREATE TABLE IF NOT EXISTS supplements_tracking (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      supplement_name VARCHAR(255) NOT NULL,
      dosage VARCHAR(100),
      time_of_day time_of_day,
      taken_at TIMESTAMPTZ DEFAULT NOW(),
      date DATE DEFAULT CURRENT_DATE
    )
  `);

  // Protocol timers table
  await createTable('protocol_timers', `
    CREATE TABLE IF NOT EXISTS protocol_timers (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      protocol_id VARCHAR(255) NOT NULL,
      protocol_name VARCHAR(255) NOT NULL,
      duration_seconds INTEGER NOT NULL,
      completed BOOLEAN DEFAULT false,
      started_at TIMESTAMPTZ DEFAULT NOW(),
      completed_at TIMESTAMPTZ
    )
  `);

  // User equipment table
  await createTable('user_equipment', `
    CREATE TABLE IF NOT EXISTS user_equipment (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      equipment_id VARCHAR(255) NOT NULL,
      equipment_name VARCHAR(255) NOT NULL,
      tier equipment_tier,
      marked_owned_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Video progress table
  await createTable('video_progress', `
    CREATE TABLE IF NOT EXISTS video_progress (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      video_id VARCHAR(255) NOT NULL,
      video_title VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      watched_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Legacy profiles table (for backwards compatibility)
  await createTable('profiles', `
    CREATE TABLE IF NOT EXISTS profiles (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      goals TEXT[] DEFAULT '{}',
      experience_level VARCHAR(50) DEFAULT 'beginner',
      available_time INTEGER DEFAULT 0,
      health_conditions TEXT[] DEFAULT '{}',
      budget VARCHAR(50) DEFAULT 'essential',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

async function createTable(name: string, createSql: string): Promise<void> {
  try {
    await sql.unsafe(createSql);
    log(`   ✅ Table ready: ${name}`, 'green');
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      log(`   ⏭️  Table already exists: ${name}`, 'yellow');
    } else {
      log(`   ❌ Error creating ${name}: ${error.message}`, 'red');
      throw error;
    }
  }
}

async function createIndexes(): Promise<void> {
  log('\n📇 Creating indexes...', 'cyan');

  const indexes = [
    { name: 'idx_daily_metrics_user_date', sql: 'CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_date ON daily_metrics(user_id, date)' },
    { name: 'idx_completed_tasks_user_date', sql: 'CREATE INDEX IF NOT EXISTS idx_completed_tasks_user_date ON completed_tasks(user_id, date)' },
    { name: 'idx_achievements_user', sql: 'CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id)' },
    { name: 'idx_supplements_user_date', sql: 'CREATE INDEX IF NOT EXISTS idx_supplements_user_date ON supplements_tracking(user_id, date)' },
    { name: 'idx_protocol_timers_user', sql: 'CREATE INDEX IF NOT EXISTS idx_protocol_timers_user ON protocol_timers(user_id)' },
    { name: 'idx_user_equipment_user', sql: 'CREATE INDEX IF NOT EXISTS idx_user_equipment_user ON user_equipment(user_id)' },
    { name: 'idx_video_progress_user', sql: 'CREATE INDEX IF NOT EXISTS idx_video_progress_user ON video_progress(user_id)' },
  ];

  for (const index of indexes) {
    try {
      await sql.unsafe(index.sql);
      log(`   ✅ Index ready: ${index.name}`, 'green');
    } catch (error: any) {
      log(`   ⚠️  Index ${index.name}: ${error.message}`, 'yellow');
    }
  }
}

async function seedAchievements(): Promise<void> {
  log('\n🏆 Seeding achievements catalog...', 'cyan');

  const achievements = [
    { id: 'first-day', title: 'First Steps', description: 'Complete your first day of protocols', icon: '1ST', points: 50 },
    { id: 'streak-7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '7D', points: 100 },
    { id: 'streak-30', title: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '30D', points: 300 },
    { id: 'streak-90', title: 'Quarterly Champion', description: 'Maintain a 90-day streak', icon: '90D', points: 1000 },
    { id: 'all-protocols', title: 'Protocol Perfectionist', description: 'Complete all daily protocols in one day', icon: '100', points: 150 },
    { id: 'early-bird', title: 'Early Bird', description: 'Complete morning protocol before 7 AM', icon: 'AM', points: 75 },
    { id: 'cold-plunge-10', title: 'Ice Warrior', description: 'Complete 10 cold exposure sessions', icon: 'ICE', points: 200 },
    { id: 'community-engage', title: 'Community Champion', description: 'Help 5 members in the community', icon: 'COM', points: 250 },
    { id: 'bio-age-reverse', title: 'Time Traveler', description: 'Reverse your biological age by 5+ years', icon: 'AGE', points: 500 },
  ];

  for (const achievement of achievements) {
    try {
      await sql`
        INSERT INTO achievements_catalog (achievement_id, title, description, icon, points)
        VALUES (${achievement.id}, ${achievement.title}, ${achievement.description}, ${achievement.icon}, ${achievement.points})
        ON CONFLICT (achievement_id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          icon = EXCLUDED.icon,
          points = EXCLUDED.points
      `;
    } catch (error: any) {
      log(`   ⚠️  Achievement ${achievement.id}: ${error.message}`, 'yellow');
    }
  }
  
  log(`   ✅ Seeded ${achievements.length} achievements`, 'green');
}

async function verifySetup(): Promise<void> {
  log('\n🔍 Verifying setup...', 'cyan');

  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name
  `;

  log(`   Found ${tables.length} tables:`, 'green');
  tables.forEach(t => log(`     - ${t.table_name}`, 'green'));

  // Check user count
  try {
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    log(`   Users in database: ${userCount[0].count}`, 'blue');
  } catch {
    log(`   Users table not accessible`, 'yellow');
  }

  // Check achievements catalog
  try {
    const achievementCount = await sql`SELECT COUNT(*) as count FROM achievements_catalog`;
    log(`   Achievements in catalog: ${achievementCount[0].count}`, 'blue');
  } catch {
    log(`   Achievements catalog not accessible`, 'yellow');
  }
}

async function main() {
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log('       🚀 ALUMINA AT HOME - DATABASE SETUP SCRIPT', 'cyan');
  log('═══════════════════════════════════════════════════════════', 'cyan');

  try {
    // Step 1: Test connection
    const connected = await testConnection();
    if (!connected) {
      process.exit(1);
    }

    // Step 2: Create enums
    await createEnums();

    // Step 3: Create tables
    await createTables();

    // Step 4: Create indexes
    await createIndexes();

    // Step 5: Seed data
    await seedAchievements();

    // Step 6: Verify
    await verifySetup();

    log('\n═══════════════════════════════════════════════════════════', 'green');
    log('       ✅ DATABASE SETUP COMPLETED SUCCESSFULLY!', 'green');
    log('═══════════════════════════════════════════════════════════', 'green');
    log('\nYou can now run: npm run dev', 'cyan');

  } catch (error) {
    log(`\n❌ Setup failed: ${error}`, 'red');
    process.exit(1);
  }
}

main();
