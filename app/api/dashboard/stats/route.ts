import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Result from '@/models/Result';
import { requireUser } from '../../_utils/auth-utils';

export async function GET() {
  try {
    const authedUser = requireUser();
    await connectDB();

    const userQuery = { userId: authedUser.id || authedUser._id };
    const [totalPredictions, recentPredictionsDoc] = await Promise.all([
      Result.countDocuments(userQuery),
      Result.aggregate([
        { $match: userQuery },
        { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
        { $count: 'count' }
      ]),
    ]);
    const recentPredictions = (recentPredictionsDoc[0]?.count) || 0;

    const stats = {
      totalPredictions,
      recentPredictions,
      accuracy: 97.8,
      lastActive: 'Today',
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}