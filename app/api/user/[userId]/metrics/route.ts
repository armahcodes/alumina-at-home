import { NextRequest, NextResponse } from 'next/server';
import { verifyUserAccess } from '@/lib/auth/session';
import { getDailyMetrics, addDailyMetric } from '@/lib/db';
import { dailyMetricSchema } from '@/lib/validations';

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

    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '30');

    const { data, error } = await getDailyMetrics(userId, days);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
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
    const parsed = dailyMetricSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten() }, { status: 400 });
    }

    const { data, error } = await addDailyMetric({
      userId,
      ...parsed.data,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to add metric' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
