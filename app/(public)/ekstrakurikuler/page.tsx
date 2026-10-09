import Image from 'next/image';
import Link from 'next/link';
import { getWebSettings, getActiveEkskul } from '@/lib/supabaseData';
import EkskulList from '@/components/ui/EkskulList';
import { ekskulData, type EkskulItem } from '@/lib/ekskul-data';
import type { Metadata } from 'next';
import { Trophy, CaretRight, Sparkle } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Ekstrakurikuler & Pembinaan Bakat Siswa — SMPN 5 Cibeber',
  description:
    'Daftar lengkap kegiatan ekstrakurikuler di SMP Negeri 5 Cibeber: Pramuka, Marching Band, Paskibra, PMR, Futsal, Voli, Karawitan Sunda, Pencak Silat, dan Rohis.',
};

export default async function EkstrakurikulerPage() {
  const [settings, rawEkskul] = await Promise.all([
    getWebSettings(),
    getActiveEkskul(),
  ]);

  const items: EkskulItem[] = rawEkskul.length > 0 ? rawEkskul.map((e) => ({
    id: e.id,
    slug: e.slug || e.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
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
    videoUrl: e.video_url || null,
    galleryImages: Array.isArray(e.gallery_images) ? e.gallery_images : [],
    highlights: ['Aktif Berprestasi', 'Pembinaan Rutin'],
  })) : ekskulData;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Banner Ekstrakurikuler — Selaras dengan Halaman Prestasi & Dewan Guru */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={settings.banner_page_ekskul || '/assets/ekskul-banner-bg.jpg'}
            alt="Ekstrakurikuler dan Pembinaan Siswa SMPN 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          {/* Emerald Gradient Overlay dengan saturasi foto tetap hidup */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/80 via-[#1E5631]/68 to-[#143e22]/90" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/55" />
        </div>

        <div className="container-site relative z-10 text-center space-y-4 max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-emerald-200">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <CaretRight size={12} weight="bold" />
            <Link href="/prestasi" className="hover:text-white transition-colors">
              Kesiswaan
            </Link>
            <CaretRight size={12} weight="bold" />
            <span className="text-white font-semibold">Ekstrakurikuler</span>
          </nav>

          {/* Badge Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-amber-300 shadow-sm">
            <Sparkle size={16} weight="fill" />
            <span>Kesiswaan &bull; Pembinaan Karakter &bull; Prestasi Bakat</span>
          </div>

          {/* Big Bold Academic Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Ekstrakurikuler &amp; Pembinaan Siswa
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Mewadahi minat, bakat, ketangkasan fisik, dan daya cipta seni seluruh siswa SMPN 5 Cibeber menuju generasi unggul berkarakter luhur.
          </p>

          {/* Quick Action Badges */}
          <div className="pt-2 flex flex-wrap justify-center gap-2.5 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold shadow-xs">
              {items.length} Pilihan Ekskul Aktif
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-amber-300 font-semibold shadow-xs">
              Pembinaan Rutin Mingguan
            </span>
            <Link
              href="/prestasi"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xs transition-colors"
            >
              <Trophy size={14} weight="fill" />
              <span>Lihat Prestasi Siswa &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container-site py-10 sm:py-16">
        {/* Interactive List & Filter Component */}
        <EkskulList items={items} schoolWhatsapp={settings.school_whatsapp} />
      </main>
    </div>
  );
}
