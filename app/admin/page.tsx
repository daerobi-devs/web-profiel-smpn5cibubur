import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default function AdminDashboardPage() {
  const adminUrl =
    process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://ekosistem.daeroom.my.id';
  redirect(adminUrl);
  return null;
}


