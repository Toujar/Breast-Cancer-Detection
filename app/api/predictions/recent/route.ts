import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock recent predictions
    const predictions = [
      {
        id: 'pred-1',
        type: 'tabular',
        result: 'benign',
        confidence: 94.2,
        date: '2 hours ago'
      },
      {
        id: 'pred-2',
        type: 'image',
        result: 'malignant',
        confidence: 87.6,
        date: '1 day ago'
      },
      {
        id: 'pred-3',
        type: 'tabular',
        result: 'benign',
        confidence: 91.3,
        date: '3 days ago'
      }
    ];

    return NextResponse.json(predictions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recent predictions' },
      { status: 500 }
    );
  }
}