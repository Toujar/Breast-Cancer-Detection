import { NextResponse } from 'next/server';
import { requireAdmin } from '../../_utils/auth-utils';
import connectDB from '@/lib/mongodb';
import Result from '@/models/Result';
import User from '@/models/User';

export async function GET() {
  try {
    requireAdmin();
    await connectDB();
    const docs = await Result.find({}, null, { sort: { createdAt: -1 }, limit: 100 }).lean();

    // Fetch related users in one go
    const userIds = Array.from(new Set(docs.map((d: any) => String(d.userId)).filter(Boolean)));
    const users = await User.find({ _id: { $in: userIds } }, { username: 1, email: 1 }).lean();
    const userMap: Record<string, { name: string; email: string }> = {};
    users.forEach((u: any) => {
      userMap[String(u._id)] = { name: u.username || 'N/A', email: u.email || 'N/A' };
    });

    const predictions = docs.map((d: any) => {
      const uid = String(d.userId || '');
      const user = userMap[uid];
      return {
        id: d.predictionId,
        userId: uid,
        userName: user?.name || uid || 'Unknown',
        userEmail: user?.email || undefined,
        type: d.type,
        result: d.prediction,
        confidence: d.confidence,
        timestamp: new Date(d.createdAt as Date).toISOString(),
      };
    });

    return NextResponse.json(predictions);
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error?.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch admin predictions' },
      { status: 500 }
    );
  }
}