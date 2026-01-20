/**
 * Seed Script for Alumina At Home Content
 * 
 * Populates the database with longevity protocols, supplements, equipment,
 * videos, environment data, and achievements.
 * 
 * Run with: npm run db:seed
 */

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables from multiple possible locations
const envPaths = [
  path.resolve(process.cwd(), '.env.local'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../.env.local'),
  path.resolve(__dirname, '../.env')
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`📄 Loaded env from: ${envPath}`);
    break;
  }
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set. Please check your .env.local file.');
  process.exit(1);
}

const sql = neon(databaseUrl);

// Import content data
import { protocols, protocolCategories, dailySchedules } from '../lib/data/protocols';
import { supplements, supplementStacks, supplementCategories } from '../lib/data/supplements';
import { equipment, equipmentCategories, equipmentBundles } from '../lib/data/equipment';
import { videos, videoCategories, videoCollections } from '../lib/data/videos';
import { rooms, environmentAssessment } from '../lib/data/environment';
import { achievements, levels, achievementCategories } from '../lib/data/achievements';

async function seedContent() {
  console.log('🌱 Starting content seeding...\n');

  try {
    // ========================================================================
    // CREATE CONTENT TABLES
    // ========================================================================
    console.log('📦 Creating content tables...');

    // Protocols table
    await sql`
      CREATE TABLE IF NOT EXISTS protocols (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        duration INTEGER NOT NULL,
        time_of_day TEXT NOT NULL,
        frequency TEXT NOT NULL,
        benefits JSONB NOT NULL DEFAULT '[]',
        steps JSONB NOT NULL DEFAULT '[]',
        science_note TEXT,
        equipment JSONB DEFAULT '[]',
        contraindications JSONB DEFAULT '[]',
        points INTEGER NOT NULL DEFAULT 10,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('  ✓ protocols table');

    // Protocol categories table
    await sql`
      CREATE TABLE IF NOT EXISTS protocol_categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        color TEXT
      )
    `;
    console.log('  ✓ protocol_categories table');

    // Daily schedules table
    await sql`
      CREATE TABLE IF NOT EXISTS daily_schedules (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        level TEXT NOT NULL,
        total_time INTEGER NOT NULL,
        protocols JSONB NOT NULL DEFAULT '[]'
      )
    `;
    console.log('  ✓ daily_schedules table');

    // Supplements table
    await sql`
      CREATE TABLE IF NOT EXISTS supplements (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        benefits JSONB NOT NULL DEFAULT '[]',
        dosage JSONB NOT NULL,
        evidence_level TEXT NOT NULL,
        mechanisms JSONB NOT NULL DEFAULT '[]',
        interactions JSONB DEFAULT '[]',
        side_effects JSONB DEFAULT '[]',
        contraindications JSONB DEFAULT '[]',
        stacks_with JSONB DEFAULT '[]',
        monthly_budget TEXT NOT NULL,
        tier TEXT NOT NULL,
        icon TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('  ✓ supplements table');

    // Supplement stacks table
    await sql`
      CREATE TABLE IF NOT EXISTS supplement_stacks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        tier TEXT NOT NULL,
        monthly_budget TEXT,
        supplements JSONB NOT NULL DEFAULT '[]'
      )
    `;
    console.log('  ✓ supplement_stacks table');

    // Equipment table
    await sql`
      CREATE TABLE IF NOT EXISTS equipment (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        brand TEXT,
        category TEXT NOT NULL,
        tier TEXT NOT NULL,
        price_range TEXT NOT NULL,
        description TEXT NOT NULL,
        benefits JSONB NOT NULL DEFAULT '[]',
        features JSONB NOT NULL DEFAULT '[]',
        use_cases JSONB NOT NULL DEFAULT '[]',
        related_protocols JSONB DEFAULT '[]',
        purchase_link TEXT,
        image_url TEXT,
        rating DECIMAL,
        review_count INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('  ✓ equipment table');

    // Equipment bundles table
    await sql`
      CREATE TABLE IF NOT EXISTS equipment_bundles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        tier TEXT NOT NULL,
        total_budget TEXT,
        description TEXT,
        equipment JSONB NOT NULL DEFAULT '[]'
      )
    `;
    console.log('  ✓ equipment_bundles table');

    // Videos table
    await sql`
      CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        duration INTEGER NOT NULL,
        thumbnail_url TEXT,
        video_url TEXT,
        instructor TEXT,
        difficulty TEXT NOT NULL,
        topics JSONB NOT NULL DEFAULT '[]',
        related_protocols JSONB DEFAULT '[]',
        featured BOOLEAN DEFAULT FALSE,
        premium BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('  ✓ videos table');

    // Video collections table
    await sql`
      CREATE TABLE IF NOT EXISTS video_collections (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        video_ids JSONB NOT NULL DEFAULT '[]'
      )
    `;
    console.log('  ✓ video_collections table');

    // Rooms (environment) table
    await sql`
      CREATE TABLE IF NOT EXISTS rooms (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT,
        description TEXT NOT NULL,
        optimizations JSONB NOT NULL DEFAULT '[]',
        metrics JSONB NOT NULL DEFAULT '[]',
        related_equipment JSONB DEFAULT '[]'
      )
    `;
    console.log('  ✓ rooms table');

    // Environment assessment table
    await sql`
      CREATE TABLE IF NOT EXISTS environment_assessment (
        id TEXT PRIMARY KEY,
        room TEXT NOT NULL,
        question TEXT NOT NULL,
        options JSONB NOT NULL DEFAULT '[]'
      )
    `;
    console.log('  ✓ environment_assessment table');

    // Achievements catalog (enhanced) - drop and recreate for schema update
    await sql`DROP TABLE IF EXISTS achievements_catalog CASCADE`;
    await sql`
      CREATE TABLE achievements_catalog (
        achievement_id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        icon TEXT,
        points INTEGER NOT NULL DEFAULT 0,
        tier TEXT NOT NULL,
        criteria JSONB NOT NULL,
        secret BOOLEAN DEFAULT FALSE,
        hint TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('  ✓ achievements_catalog table');

    // Levels table
    await sql`
      CREATE TABLE IF NOT EXISTS levels (
        level INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        points_required INTEGER NOT NULL,
        icon TEXT,
        benefits JSONB NOT NULL DEFAULT '[]'
      )
    `;
    console.log('  ✓ levels table');

    console.log('\n📥 Seeding content data...\n');

    // ========================================================================
    // SEED PROTOCOLS
    // ========================================================================
    console.log('🏃 Seeding protocols...');
    
    // Clear existing
    await sql`DELETE FROM protocols`;
    await sql`DELETE FROM protocol_categories`;
    await sql`DELETE FROM daily_schedules`;

    // Seed protocol categories
    for (const [id, cat] of Object.entries(protocolCategories)) {
      await sql`
        INSERT INTO protocol_categories (id, name, description, icon, color)
        VALUES (${id}, ${cat.name}, ${cat.description}, ${cat.icon}, ${cat.color})
      `;
    }
    console.log(`  ✓ ${Object.keys(protocolCategories).length} protocol categories`);

    // Seed protocols
    for (const p of protocols) {
      await sql`
        INSERT INTO protocols (id, title, description, category, difficulty, duration, time_of_day, frequency, benefits, steps, science_note, equipment, contraindications, points)
        VALUES (
          ${p.id}, ${p.title}, ${p.description}, ${p.category}, ${p.difficulty},
          ${p.duration}, ${p.timeOfDay}, ${p.frequency}, ${JSON.stringify(p.benefits)},
          ${JSON.stringify(p.steps)}, ${p.scienceNote || null}, ${JSON.stringify(p.equipment || [])},
          ${JSON.stringify(p.contraindications || [])}, ${p.points}
        )
      `;
    }
    console.log(`  ✓ ${protocols.length} protocols`);

    // Seed daily schedules
    for (const s of dailySchedules) {
      await sql`
        INSERT INTO daily_schedules (id, name, description, level, total_time, protocols)
        VALUES (${s.id}, ${s.name}, ${s.description}, ${s.level}, ${s.totalTime}, ${JSON.stringify(s.protocols)})
      `;
    }
    console.log(`  ✓ ${dailySchedules.length} daily schedules`);

    // ========================================================================
    // SEED SUPPLEMENTS
    // ========================================================================
    console.log('\n💊 Seeding supplements...');
    
    await sql`DELETE FROM supplements`;
    await sql`DELETE FROM supplement_stacks`;

    for (const s of supplements) {
      await sql`
        INSERT INTO supplements (id, name, category, description, benefits, dosage, evidence_level, mechanisms, interactions, side_effects, contraindications, stacks_with, monthly_budget, tier, icon)
        VALUES (
          ${s.id}, ${s.name}, ${s.category}, ${s.description}, ${JSON.stringify(s.benefits)},
          ${JSON.stringify(s.dosage)}, ${s.evidenceLevel}, ${JSON.stringify(s.mechanisms)},
          ${JSON.stringify(s.interactions || [])}, ${JSON.stringify(s.sideEffects || [])},
          ${JSON.stringify(s.contraindications || [])}, ${JSON.stringify(s.stacksWith || [])},
          ${s.monthlyBudget}, ${s.tier}, ${s.icon}
        )
      `;
    }
    console.log(`  ✓ ${supplements.length} supplements`);

    for (const stack of supplementStacks) {
      await sql`
        INSERT INTO supplement_stacks (id, name, description, tier, monthly_budget, supplements)
        VALUES (${stack.id}, ${stack.name}, ${stack.description}, ${stack.tier}, ${stack.monthlyBudget}, ${JSON.stringify(stack.supplements)})
      `;
    }
    console.log(`  ✓ ${supplementStacks.length} supplement stacks`);

    // ========================================================================
    // SEED EQUIPMENT
    // ========================================================================
    console.log('\n🛠️ Seeding equipment...');
    
    await sql`DELETE FROM equipment`;
    await sql`DELETE FROM equipment_bundles`;

    for (const e of equipment) {
      await sql`
        INSERT INTO equipment (id, name, brand, category, tier, price_range, description, benefits, features, use_cases, related_protocols, purchase_link, image_url, rating, review_count)
        VALUES (
          ${e.id}, ${e.name}, ${e.brand || null}, ${e.category}, ${e.tier}, ${e.priceRange},
          ${e.description}, ${JSON.stringify(e.benefits)}, ${JSON.stringify(e.features)},
          ${JSON.stringify(e.useCases)}, ${JSON.stringify(e.relatedProtocols)},
          ${e.purchaseLink || null}, ${e.imageUrl || null}, ${e.rating || null}, ${e.reviewCount || null}
        )
      `;
    }
    console.log(`  ✓ ${equipment.length} equipment items`);

    for (const bundle of equipmentBundles) {
      await sql`
        INSERT INTO equipment_bundles (id, name, tier, total_budget, description, equipment)
        VALUES (${bundle.id}, ${bundle.name}, ${bundle.tier}, ${bundle.totalBudget}, ${bundle.description}, ${JSON.stringify(bundle.equipment)})
      `;
    }
    console.log(`  ✓ ${equipmentBundles.length} equipment bundles`);

    // ========================================================================
    // SEED VIDEOS
    // ========================================================================
    console.log('\n🎬 Seeding videos...');
    
    await sql`DELETE FROM videos`;
    await sql`DELETE FROM video_collections`;

    for (const v of videos) {
      await sql`
        INSERT INTO videos (id, title, description, category, duration, thumbnail_url, video_url, instructor, difficulty, topics, related_protocols, featured, premium)
        VALUES (
          ${v.id}, ${v.title}, ${v.description}, ${v.category}, ${v.duration},
          ${v.thumbnailUrl}, ${v.videoUrl}, ${v.instructor}, ${v.difficulty},
          ${JSON.stringify(v.topics)}, ${JSON.stringify(v.relatedProtocols)},
          ${v.featured || false}, ${v.premium || false}
        )
      `;
    }
    console.log(`  ✓ ${videos.length} videos`);

    for (const col of videoCollections) {
      await sql`
        INSERT INTO video_collections (id, name, description, video_ids)
        VALUES (${col.id}, ${col.name}, ${col.description}, ${JSON.stringify(col.videoIds)})
      `;
    }
    console.log(`  ✓ ${videoCollections.length} video collections`);

    // ========================================================================
    // SEED ENVIRONMENT
    // ========================================================================
    console.log('\n🏠 Seeding environment data...');
    
    await sql`DELETE FROM rooms`;
    await sql`DELETE FROM environment_assessment`;

    for (const room of rooms) {
      await sql`
        INSERT INTO rooms (id, name, icon, description, optimizations, metrics, related_equipment)
        VALUES (
          ${room.id}, ${room.name}, ${room.icon}, ${room.description},
          ${JSON.stringify(room.optimizations)}, ${JSON.stringify(room.metrics)},
          ${JSON.stringify(room.relatedEquipment)}
        )
      `;
    }
    console.log(`  ✓ ${rooms.length} rooms`);

    for (const q of environmentAssessment) {
      await sql`
        INSERT INTO environment_assessment (id, room, question, options)
        VALUES (${q.id}, ${q.room}, ${q.question}, ${JSON.stringify(q.options)})
      `;
    }
    console.log(`  ✓ ${environmentAssessment.length} assessment questions`);

    // ========================================================================
    // SEED ACHIEVEMENTS
    // ========================================================================
    console.log('\n🏆 Seeding achievements...');
    
    // Clear existing (if table exists with data)
    try {
      await sql`DELETE FROM achievements_catalog`;
    } catch (e) {
      // Table might be empty or not exist yet
    }
    await sql`DELETE FROM levels`;

    for (const a of achievements) {
      await sql`
        INSERT INTO achievements_catalog (achievement_id, title, description, category, icon, points, tier, criteria, secret, hint)
        VALUES (
          ${a.id}, ${a.title}, ${a.description}, ${a.category}, ${a.icon},
          ${a.points}, ${a.tier}, ${JSON.stringify(a.criteria)},
          ${a.secret || false}, ${a.hint || null}
        )
      `;
    }
    console.log(`  ✓ ${achievements.length} achievements`);

    for (const level of levels) {
      await sql`
        INSERT INTO levels (level, name, points_required, icon, benefits)
        VALUES (${level.level}, ${level.name}, ${level.pointsRequired}, ${level.icon}, ${JSON.stringify(level.benefits)})
      `;
    }
    console.log(`  ✓ ${levels.length} levels`);

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('\n' + '='.repeat(50));
    console.log('✅ Content seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   • ${protocols.length} longevity protocols`);
    console.log(`   • ${Object.keys(protocolCategories).length} protocol categories`);
    console.log(`   • ${dailySchedules.length} daily schedules`);
    console.log(`   • ${supplements.length} supplements`);
    console.log(`   • ${supplementStacks.length} supplement stacks`);
    console.log(`   • ${equipment.length} equipment items`);
    console.log(`   • ${equipmentBundles.length} equipment bundles`);
    console.log(`   • ${videos.length} videos (${Math.round(videos.reduce((s, v) => s + v.duration, 0) / 60)} minutes total)`);
    console.log(`   • ${videoCollections.length} video collections`);
    console.log(`   • ${rooms.length} room optimizations`);
    console.log(`   • ${environmentAssessment.length} assessment questions`);
    console.log(`   • ${achievements.length} achievements`);
    console.log(`   • ${levels.length} levels`);
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('\n❌ Content seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed
seedContent();
