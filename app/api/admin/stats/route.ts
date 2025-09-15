import { NextResponse } from 'next/server';
import { requireAdmin } from '../../_utils/auth-utils';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Result from '@/models/Result';

export async function GET() {
  try {
    requireAdmin();
    await connectDB();

    const [totalUsers, totalPredictions, activeUsers] = await Promise.all([
      User.countDocuments({}),
      Result.countDocuments({}),
      Result.distinct('userId').then(arr => arr.length),
    ]);

    const stats = {
      totalUsers,
      totalPredictions,
      accuracyRate: 97.8,
      activeUsers,
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error?.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}