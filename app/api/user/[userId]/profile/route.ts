import { NextRequest, NextResponse } from 'next/server';
import { verifyUserAccess } from '@/lib/auth/session';
import { getUserProfile, upsertUserProfile } from '@/lib/db';
import { profileUpsertSchema } from '@/lib/validations';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { error: authError } = await verifyUserAccess(userId);
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: authError.status });
    }

    const { data, error } = await getUserProfile(userId);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { error: authError } = await verifyUserAccess(userId);
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: authError.status });
    }

    const raw = await request.json();
    const parsed = profileUpsertSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten() }, { status: 400 });
    }

    const { data, error } = await upsertUserProfile(userId, parsed.data);

    if (error) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
