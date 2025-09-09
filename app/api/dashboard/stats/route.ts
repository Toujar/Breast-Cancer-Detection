import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock dashboard statistics
    const stats = {
      totalPredictions: Math.floor(Math.random() * 50) + 10,
      recentPredictions: Math.floor(Math.random() * 10) + 2,
      accuracy: 97.8,
      lastActive: 'Today'
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}