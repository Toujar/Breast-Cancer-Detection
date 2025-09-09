import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = {
      totalUsers: 342,
      totalPredictions: 1247,
      accuracyRate: 97.8,
      activeUsers: 89
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}