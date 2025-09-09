import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = Array.from({ length: 20 }, (_, index) => ({
      id: `user-${index + 1}`,
      name: `Dr. User ${index + 1}`,
      email: `user${index + 1}@hospital.com`,
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      predictionsCount: Math.floor(Math.random() * 50) + 1,
      role: 'admin'
    }));

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}