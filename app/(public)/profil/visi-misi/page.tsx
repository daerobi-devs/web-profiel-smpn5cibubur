import { getWebSettings } from '@/lib/supabaseData';
import VisiMisiContent from '@/components/ui/VisiMisiContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visi, Misi & Tujuan Pendidikan | SMPN 5 Cibeber',
  description:
    'Visi resmi, 6 misi strategis, dan tujuan pendidikan SMP Negeri 5 Cibeber dalam membentuk insan pembelajar yang berakhlak mulia, unggul prestasi, terampil teknologi, dan berwawasan lingkungan.',
};

export default async function VisiMisiPage() {
  const settings = await getWebSettings();
  return <VisiMisiContent settings={settings} />;
}
