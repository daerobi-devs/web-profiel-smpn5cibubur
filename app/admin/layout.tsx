import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Admin SMPN 5 Cibeber' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'http://localhost:3000';
  redirect(adminUrl);
  return null;
}
