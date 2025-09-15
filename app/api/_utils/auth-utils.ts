import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export function getUserFromCookie(): any | null {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return typeof decoded === 'object' ? decoded : null;
  } catch {
    return null;
  }
}

export function requireUser(): any {
  const user = getUserFromCookie();
  if (!user) {
    const err = new Error('UNAUTHORIZED');
    throw err;
  }
  return user;
}

export function requireAdmin(): any {
  const user = requireUser();
  if (user.role !== 'admin') {
    const err = new Error('FORBIDDEN');
    throw err;
  }
  return user;
}


