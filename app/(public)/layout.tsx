import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getWebSettings } from '@/lib/supabaseData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMPN 5 Cibeber - The Inspiring School of Cibeber',
  description: 'Website Resmi SMP Negeri 5 Cibeber, Kabupaten Lebak, Provinsi Banten.',
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layoutSettings = await getWebSettings();

  return (
    <>
      <Navbar settings={layoutSettings} />
      <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
      <Footer settings={layoutSettings} />
    </>
  );
}
