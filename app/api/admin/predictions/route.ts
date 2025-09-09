import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const predictions = Array.from({ length: 50 }, (_, index) => ({
      id: `admin-pred-${index + 1}`,
      userName: `Dr. User ${Math.floor(Math.random() * 20) + 1}`,
      type: Math.random() > 0.5 ? 'tabular' : 'image',
      result: Math.random() > 0.3 ? 'benign' : 'malignant',
      confidence: Math.random() * 25 + 70,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }));

    return NextResponse.json(predictions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch admin predictions' },
      { status: 500 }
    );
  }
}