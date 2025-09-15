import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '../../_utils/auth-utils';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt: any = require('jsonwebtoken');
import connectDB from '@/lib/mongodb';
import Result from '@/models/Result';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const token = request.nextUrl.searchParams.get('token');
    const authedUser = token ? null : requireUser();

    await connectDB();
    const doc = await Result.findOne({ predictionId: id }).lean();
    if (!doc) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }
    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        if (decoded.predictionId !== id) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
      }
    } else if (authedUser) {
      if (authedUser.role !== 'admin' && String(doc.userId) !== String(authedUser.id || authedUser._id)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    return NextResponse.json({
      id: doc.predictionId,
      type: doc.type,
      prediction: doc.prediction,
      confidence: doc.confidence,
      inputData: doc.inputData,
      modelMetrics: doc.modelMetrics,
      timestamp: doc.timestamp,
      userId: doc.userId,
    });
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error fetching result:', error);
    return NextResponse.json(
      { error: 'Failed to fetch result' },
      { status: 500 }
    );
  }
}