import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Result from '@/models/Result';
// @ts-ignore - jsonwebtoken has no bundled types in this project
import jwt from 'jsonwebtoken';
import { requireUser } from '../../../_utils/auth-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Auth: allow either owner/admin or a valid share token
    const token = request.nextUrl.searchParams.get('token');
    let authedUser: any | null = null;
    if (!token) {
      authedUser = requireUser();
    }

    await connectDB();
    const doc: any = await Result.findOne({ predictionId: id }).lean();
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

    // Simple text-based PDF content (placeholder). For production, render an actual PDF.
    const lines = [
      'BREAST CANCER AI DETECTION REPORT',
      '=================================',
      '',
      `Prediction ID: ${doc.predictionId}`,
      `Generated: ${new Date(doc.timestamp || doc.createdAt).toLocaleString()}`,
      '',
      'ANALYSIS RESULTS:',
      `- Classification: ${doc.prediction}`,
      `- Confidence Score: ${doc.confidence}%`,
      `- Analysis Type: ${doc.type === 'tabular' ? 'Data Analysis' : 'Image Analysis'}`,
      '',
      'MODEL METRICS:',
      `- Accuracy: ${doc?.modelMetrics?.accuracy ?? 'N/A'}%`,
      `- Precision: ${doc?.modelMetrics?.precision ?? 'N/A'}%`,
      `- Recall: ${doc?.modelMetrics?.recall ?? 'N/A'}%`,
      `- F1-Score: ${doc?.modelMetrics?.f1Score ?? 'N/A'}%`,
      '',
      'CLINICAL INTERPRETATION:',
      'This AI analysis is intended as a screening tool to assist healthcare professionals.',
      'It should not be used as the sole basis for diagnosis or treatment.',
    ];

    const reportContent = lines.join('\n');
    return new NextResponse(reportContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="breast-cancer-analysis-${id}.pdf"`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}