import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { users, userProfiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { onboardingSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const raw = await request.json().catch(() => ({}));
    const parsed = onboardingSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten() }, { status: 400 });
    }

    const body = parsed.data;
    const userId = session.user.id;

    // Mark onboarding as complete on the user record
    await db
      .update(users)
      .set({ hasCompletedOnboarding: true, updatedAt: new Date() })
      .where(eq(users.id, userId));

    // If profile data was sent, persist it to user_profiles table
    if (body.goals || body.experienceLevel || body.availableTime || body.budget) {
      await db
        .insert(userProfiles)
        .values({
          userId,
          goals: body.goals || [],
          experienceLevel: body.experienceLevel || 'beginner',
          availableTime: body.availableTime || 30,
          healthConditions: body.healthConditions || [],
          budget: body.budget || 'essential',
        })
        .onConflictDoUpdate({
          target: userProfiles.userId,
          set: {
            goals: body.goals || [],
            experienceLevel: body.experienceLevel || 'beginner',
            availableTime: body.availableTime || 30,
            healthConditions: body.healthConditions || [],
            budget: body.budget || 'essential',
            updatedAt: new Date(),
          },
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}
