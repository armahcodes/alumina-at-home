import { NextRequest, NextResponse } from 'next/server';
import { verifyUserAccess } from '@/lib/auth/session';
import {
  getTodayCompletedTasks,
  addCompletedTaskIfNew,
  removeTodayCompletedTask,
} from '@/lib/db';
import { completedTaskSchema } from '@/lib/validations';

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

    const { data, error } = await getTodayCompletedTasks(userId);

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
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
    const parsed = completedTaskSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten() }, { status: 400 });
    }

    const { data, error } = await addCompletedTaskIfNew({
      userId,
      taskId: parsed.data.taskId,
      taskName: parsed.data.taskName,
      taskCategory: parsed.data.taskCategory,
      pointsEarned: parsed.data.pointsEarned,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { error: authError } = await verifyUserAccess(userId);
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: authError.status });
    }

    const taskId = request.nextUrl.searchParams.get('taskId');
    if (!taskId?.trim()) {
      return NextResponse.json({ error: 'taskId is required' }, { status: 400 });
    }

    const { data, error } = await removeTodayCompletedTask(userId, taskId.trim());

    if (error) {
      return NextResponse.json({ error: 'Failed to remove task' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
