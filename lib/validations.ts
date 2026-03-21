import { z } from 'zod';

// Shared enums
export const experienceLevelSchema = z.enum(['beginner', 'intermediate', 'advanced']);
export const budgetSchema = z.enum(['essential', 'intermediate', 'premium']);
export const timeOfDaySchema = z.enum(['morning', 'afternoon', 'evening', 'bedtime']);

// Onboarding
export const onboardingSchema = z.object({
  goals: z.array(z.string()).optional(),
  experienceLevel: experienceLevelSchema.optional(),
  availableTime: z.number().int().min(0).max(480).optional(),
  healthConditions: z.array(z.string()).optional(),
  budget: budgetSchema.optional(),
});

// Profile update
export const profileUpdateSchema = z.object({
  userId: z.string().optional(),
  goals: z.array(z.string()).optional(),
  experienceLevel: experienceLevelSchema.optional(),
  availableTime: z.number().int().min(0).max(480).optional(),
  healthConditions: z.array(z.string()).optional(),
  budget: budgetSchema.optional(),
});

// User PATCH (onboarding flag)
export const userPatchSchema = z.object({
  hasCompletedOnboarding: z.boolean().optional(),
});

// Daily metrics
export const dailyMetricSchema = z.object({
  date: z.string(),
  energy: z.number().int().min(1).max(10).optional().nullable(),
  sleep: z.number().int().min(1).max(10).optional().nullable(),
  mood: z.number().int().min(1).max(10).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
  protocolsCompleted: z.number().int().min(0).optional(),
});

// Completed task
export const completedTaskSchema = z.object({
  taskId: z.string().min(1),
  taskName: z.string().min(1),
  taskCategory: z.string().optional(),
  pointsEarned: z.number().int().min(0).default(10),
});

// Stats update
export const statsUpdateSchema = z.object({
  currentStreak: z.number().int().min(0).optional(),
  longestStreak: z.number().int().min(0).optional(),
  totalPoints: z.number().int().min(0).optional(),
  level: z.number().int().min(1).optional(),
  lastActivityDate: z.string().optional(),
  totalProtocolsCompleted: z.number().int().min(0).optional(),
  totalDaysActive: z.number().int().min(0).optional(),
});

// Profile upsert (PUT /api/user/[userId]/profile)
export const profileUpsertSchema = z.object({
  goals: z.array(z.string()).optional(),
  experienceLevel: experienceLevelSchema.optional(),
  availableTime: z.number().int().min(0).max(480).optional(),
  healthConditions: z.array(z.string()).optional(),
  budget: budgetSchema.optional(),
});
