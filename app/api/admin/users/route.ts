import { NextResponse } from 'next/server';
import { requireAdmin } from '../../_utils/auth-utils';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Result from '@/models/Result';

export async function GET() {
  try {
    requireAdmin();
    await connectDB();

    const [users, counts] = await Promise.all([
      User.find({}, { username: 1, email: 1, role: 1, updatedAt: 1 }).lean(),
      Result.aggregate([
        { $group: { _id: "$userId", predictionsCount: { $sum: 1 }, lastActive: { $max: "$createdAt" } } }
      ])
    ]);

    const userIdToCounts: Record<string, { predictionsCount: number; lastActive?: Date }> = {};
    counts.forEach((c: any) => { userIdToCounts[String(c._id)] = { predictionsCount: c.predictionsCount, lastActive: c.lastActive }; });

    const response = users.map((u: any) => ({
      id: String(u._id),
      name: u.username || 'N/A',
      email: u.email,
      role: u.role || 'user',
      predictionsCount: userIdToCounts[String(u._id)]?.predictionsCount || 0,
      lastActive: new Date(userIdToCounts[String(u._id)]?.lastActive || u.updatedAt || Date.now()).toISOString(),
    }));

    return NextResponse.json(response);
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error?.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}