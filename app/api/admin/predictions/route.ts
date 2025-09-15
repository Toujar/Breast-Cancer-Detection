import { NextResponse } from 'next/server';
import { requireAdmin } from '../../_utils/auth-utils';
import connectDB from '@/lib/mongodb';
import Result from '@/models/Result';

export async function GET() {
  try {
    requireAdmin();
    await connectDB();
    const docs = await Result.find({}, null, { sort: { createdAt: -1 }, limit: 100 }).lean();
    const predictions = docs.map((d) => ({
      id: d.predictionId,
      userName: d.userId,
      type: d.type,
      result: d.prediction,
      confidence: d.confidence,
      timestamp: new Date(d.createdAt as Date).toISOString(),
    }));
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