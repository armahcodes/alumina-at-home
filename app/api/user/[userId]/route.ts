import { NextRequest, NextResponse } from 'next/server';
import { verifyUserAccess } from '@/lib/auth/session';
import { getUser, updateUserOnboarding } from '@/lib/db';
import { userPatchSchema } from '@/lib/validations';

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

    const { data, error } = await getUser(userId);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
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
    const parsed = userPatchSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten() }, { status: 400 });
    }

    const body = parsed.data;

    if (body.hasCompletedOnboarding !== undefined) {
      const { data, error } = await updateUserOnboarding(userId, body.hasCompletedOnboarding);

      if (error) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
      }

      return NextResponse.json({ data });
    }

    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
