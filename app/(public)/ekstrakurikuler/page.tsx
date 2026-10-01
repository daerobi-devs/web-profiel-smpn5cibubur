import { getWebSettings, getActiveEkskul } from '@/lib/supabaseData';
import EkskulList from '@/components/ui/EkskulList';
import { ekskulData, type EkskulItem } from '@/lib/ekskul-data';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Trophy } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Ekstrakurikuler & Pembinaan Bakat Siswa — SMPN 5 Cibeber',
  description:
    'Daftar lengkap kegiatan ekstrakurikuler di SMP Negeri 5 Cibeber: Pramuka, Paskibra, PMR, Futsal, Voli, Karawitan Sunda, Pencak Silat, dan Rohis.',
};

export default async function EkstrakurikulerPage() {
  const [settings, rawEkskul] = await Promise.all([
    getWebSettings(),
    getActiveEkskul(),
  ]);

  const items: EkskulItem[] = rawEkskul.length > 0 ? rawEkskul.map((e) => ({
    id: e.id,
    slug: e.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: e.name,
    category: (e.category || 'KEPANDUAN') as any,
    categoryLabel: e.category_label || 'Ekskul',
    badge: e.badge || 'Ekskul Unggulan',
    motto: e.motto || 'Maju Bersama SMPN 5 Cibeber',
    description: e.description,
    coach: e.coach,
    coachRole: 'Pembina / Pelatih',
    schedule: e.schedule,
    location: e.place,
    memberCount: '30+ Siswa',
    achievements: Array.isArray(e.achievements) ? e.achievements : [],
    coverImage: e.cover_image || '/assets/gedung-smpn5cibeber.jpg',
    highlights: ['Aktif Berprestasi', 'Pembinaan Rutin'],
  })) : ekskulData;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <main className="container-site pt-6 pb-16 sm:pt-8 sm:pb-24">
        {/* Clean Editorial Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200/90 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
              <Link href="/" className="hover:text-[#1E5631] transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/prestasi" className="hover:text-[#1E5631] transition-colors">
                Kesiswaan
              </Link>
              <span>/</span>
              <span className="text-[#1E5631] font-bold">Ekstrakurikuler</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706] block">
              Kesiswaan &bull; Pembinaan Karakter &bull; Prestasi Bakat
            </span>
            <h1 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E5631] tracking-tight mt-0.5">
              Ekstrakurikuler &amp; Pembinaan Siswa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1.5 leading-relaxed">
              Mewadahi minat, bakat, ketangkasan fisik, dan daya cipta seni seluruh siswa SMPN 5 Cibeber menuju generasi unggul berkarakter luhur.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold shadow-2xs">
              {items.length} Kegiatan Aktif
            </span>
            <Link
              href="/prestasi"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition-all shadow-xs active:scale-95"
            >
              <Trophy size={13} weight="fill" />
              <span>Lihat Prestasi Siswa</span>
            </Link>
          </div>
        </div>

        {/* Interactive List & Filter Component */}
        <EkskulList items={items} schoolWhatsapp={settings.school_whatsapp} />
      </main>
    </div>
  );
}
