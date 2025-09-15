import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { requireUser } from '../../../_utils/auth-utils';
import connectDB from '@/lib/mongodb';
import Result from '@/models/Result';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authedUser = requireUser();
    const id = params.id;

    await connectDB();
    const doc: any = await Result.findOne({ predictionId: id }).lean();
    if (!doc) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }
    if (authedUser.role !== 'admin' && String(doc.userId) !== String(authedUser.id || authedUser._id)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const token = jwt.sign(
      { predictionId: id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || '';
    const shareUrl = `${origin}/results/${id}?token=${token}`;

    return NextResponse.json({ token, shareUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create share link' }, { status: 500 });
  }
}


