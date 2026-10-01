import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default function AdminDashboardPage() {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'http://localhost:3000';
  redirect(adminUrl);
  return null;
}


