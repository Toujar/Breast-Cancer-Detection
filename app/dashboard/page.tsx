// app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) redirect('/auth');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === 'object' && decoded?.role === 'admin') {
      redirect('/admin');
    }
  } catch (err) {
    redirect('/auth');
  }

  return <DashboardClient />;
}
