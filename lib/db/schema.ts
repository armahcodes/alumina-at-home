import { pgTable, varchar, text, integer, boolean, timestamp, serial, date, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// ============================================================================
// ENUMS
// ============================================================================

export const experienceLevelEnum = pgEnum('experience_level', ['beginner', 'intermediate', 'advanced']);
export const budgetEnum = pgEnum('budget', ['essential', 'intermediate', 'premium']);
export const timeOfDayEnum = pgEnum('time_of_day', ['morning', 'afternoon', 'evening', 'bedtime']);
export const equipmentTierEnum = pgEnum('equipment_tier', ['essential', 'intermediate', 'premium']);

// ============================================================================
// TABLES
// ============================================================================

// Users table - Core user information (also serves as Better Auth user table)
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  emailVerified: boolean('email_verified').default(false),
  image: text('image'),
  hasCompletedOnboarding: boolean('has_completed_onboarding').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true })
});

// Better Auth: Session table
export const session = pgTable('session', {
  id: varchar('id', { length: 255 }).primaryKey(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  ipAddress: varchar('ip_address', { length: 255 }),
  userAgent: text('user_agent'),
  userId: varchar('user_id', { length: 255 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
});

// Better Auth: Account table
export const account = pgTable('account', {
  id: varchar('id', { length: 255 }).primaryKey(),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  userId: varchar('user_id', { length: 255 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true }),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true }),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Better Auth: Verification table
export const verification = pgTable('verification', {
  id: varchar('id', { length: 255 }).primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// User profiles table - Onboarding data and preferences
export const userProfiles = pgTable('user_profiles', {
  userId: varchar('user_id', { length: 255 }).primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  goals: text('goals').array().default([]),
  experienceLevel: experienceLevelEnum('experience_level').default('beginner'),
  availableTime: integer('available_time').default(0), // minutes per day
  healthConditions: text('health_conditions').array().default([]),
  budget: budgetEnum('budget').default('essential'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

// User stats table - Gamification
export const userStats = pgTable('user_stats', {
  userId: varchar('user_id', { length: 255 }).primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  totalPoints: integer('total_points').default(0),
  level: integer('level').default(1),
  lastActivityDate: date('last_activity_date'),
  totalProtocolsCompleted: integer('total_protocols_completed').default(0),
  totalDaysActive: integer('total_days_active').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

// Daily metrics table - Daily health tracking
export const dailyMetrics = pgTable('daily_metrics', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  date: date('date').notNull(),
  energy: integer('energy'), // 1-10
  sleep: integer('sleep'), // 1-10
  mood: integer('mood'), // 1-10
  notes: text('notes'),
  protocolsCompleted: integer('protocols_completed').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
});

// Completed tasks table - Protocol completion tracking
export const completedTasks = pgTable('completed_tasks', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  taskId: varchar('task_id', { length: 255 }).notNull(),
  taskName: varchar('task_name', { length: 255 }).notNull(),
  taskCategory: varchar('task_category', { length: 100 }),
  pointsEarned: integer('points_earned').default(10),
  completedAt: timestamp('completed_at', { withTimezone: true }).defaultNow(),
  date: date('date').defaultNow()
});

// Achievements table - Unlocked achievements
export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  achievementId: varchar('achievement_id', { length: 255 }).notNull(),
  achievementTitle: varchar('achievement_title', { length: 255 }).notNull(),
  achievementDescription: text('achievement_description'),
  pointsEarned: integer('points_earned').default(0),
  unlockedAt: timestamp('unlocked_at', { withTimezone: true }).defaultNow()
});

// Achievements catalog - Achievement definitions
export const achievementsCatalog = pgTable('achievements_catalog', {
  achievementId: varchar('achievement_id', { length: 255 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  icon: varchar('icon', { length: 10 }),
  points: integer('points').default(0),
  unlockCriteria: jsonb('unlock_criteria'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
});

// Supplements tracking table
export const supplementsTracking = pgTable('supplements_tracking', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  supplementName: varchar('supplement_name', { length: 255 }).notNull(),
  dosage: varchar('dosage', { length: 100 }),
  timeOfDay: timeOfDayEnum('time_of_day'),
  takenAt: timestamp('taken_at', { withTimezone: true }).defaultNow(),
  date: date('date').defaultNow()
});

// Protocol timers table
export const protocolTimers = pgTable('protocol_timers', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  protocolId: varchar('protocol_id', { length: 255 }).notNull(),
  protocolName: varchar('protocol_name', { length: 255 }).notNull(),
  durationSeconds: integer('duration_seconds').notNull(),
  completed: boolean('completed').default(false),
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true })
});

// User equipment table
export const userEquipment = pgTable('user_equipment', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  equipmentId: varchar('equipment_id', { length: 255 }).notNull(),
  equipmentName: varchar('equipment_name', { length: 255 }).notNull(),
  tier: equipmentTierEnum('tier'),
  markedOwnedAt: timestamp('marked_owned_at', { withTimezone: true }).defaultNow()
});

// Video progress table
export const videoProgress = pgTable('video_progress', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  videoId: varchar('video_id', { length: 255 }).notNull(),
  videoTitle: varchar('video_title', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }),
  watchedAt: timestamp('watched_at', { withTimezone: true }).defaultNow()
});

// Legacy profiles table (for backwards compatibility)
export const profiles = pgTable('profiles', {
  id: varchar('id', { length: 255 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  goals: text('goals').array().default([]),
  experienceLevel: varchar('experience_level', { length: 50 }).default('beginner'),
  availableTime: integer('available_time').default(0),
  healthConditions: text('health_conditions').array().default([]),
  budget: varchar('budget', { length: 50 }).default('essential'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

// ============================================================================
// TYPE INFERENCE
// ============================================================================

// Select types (when reading from DB)
export type User = InferSelectModel<typeof users>;
export type UserProfile = InferSelectModel<typeof userProfiles>;
export type UserStats = InferSelectModel<typeof userStats>;
export type DailyMetric = InferSelectModel<typeof dailyMetrics>;
export type CompletedTask = InferSelectModel<typeof completedTasks>;
export type Achievement = InferSelectModel<typeof achievements>;
export type AchievementCatalog = InferSelectModel<typeof achievementsCatalog>;
export type SupplementTracking = InferSelectModel<typeof supplementsTracking>;
export type ProtocolTimer = InferSelectModel<typeof protocolTimers>;
export type UserEquipment = InferSelectModel<typeof userEquipment>;
export type VideoProgress = InferSelectModel<typeof videoProgress>;
export type Profile = InferSelectModel<typeof profiles>;
export type Session = InferSelectModel<typeof session>;
export type Account = InferSelectModel<typeof account>;
export type Verification = InferSelectModel<typeof verification>;

// Insert types (when writing to DB)
export type NewUser = InferInsertModel<typeof users>;
export type NewUserProfile = InferInsertModel<typeof userProfiles>;
export type NewUserStats = InferInsertModel<typeof userStats>;
export type NewDailyMetric = InferInsertModel<typeof dailyMetrics>;
export type NewCompletedTask = InferInsertModel<typeof completedTasks>;
export type NewAchievement = InferInsertModel<typeof achievements>;
export type NewSupplementTracking = InferInsertModel<typeof supplementsTracking>;
export type NewProtocolTimer = InferInsertModel<typeof protocolTimers>;
export type NewUserEquipment = InferInsertModel<typeof userEquipment>;
export type NewVideoProgress = InferInsertModel<typeof videoProgress>;
export type NewProfile = InferInsertModel<typeof profiles>;

