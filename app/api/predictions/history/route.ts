import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock prediction history
    const history = Array.from({ length: 15 }, (_, index) => ({
      id: `pred-history-${index + 1}`,
      type: Math.random() > 0.5 ? 'tabular' : 'image',
      prediction: Math.random() > 0.3 ? 'benign' : 'malignant',
      confidence: Math.random() * 25 + 70,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed'
    }));

    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}