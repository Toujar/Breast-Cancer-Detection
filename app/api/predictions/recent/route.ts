import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Result from '@/models/Result';
import { requireUser } from '../../_utils/auth-utils';

export async function GET() {
  try {
    const authedUser = requireUser();
    await connectDB();
    const query = authedUser.role === 'admin' ? {} : { userId: authedUser.id || authedUser._id };
    const docs = await Result.find(query, null, { sort: { createdAt: -1 }, limit: 10 }).lean();
    const predictions = docs.map((d) => ({
      id: d.predictionId,
      type: d.type,
      result: d.prediction,
      confidence: d.confidence,
      date: new Date(d.createdAt as Date).toISOString(),
    }));
    return NextResponse.json(predictions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recent predictions' },
      { status: 500 }
    );
  }
}