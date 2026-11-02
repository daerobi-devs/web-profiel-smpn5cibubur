import Image from 'next/image';
import Link from 'next/link';
import { getWebSettings, getActiveEkskul } from '@/lib/supabaseData';
import EkskulList from '@/components/ui/EkskulList';
import { ekskulData, type EkskulItem } from '@/lib/ekskul-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ekstrakurikuler & Pembinaan Bakat Siswa | SMP Negeri 5 Cibeber',
  description:
    'Daftar kegiatan ekstrakurikuler di SMP Negeri 5 Cibeber: Pramuka, Paskibra, Futsal, Bola Voli, PMR, Seni Karawitan Sunda, Lingkungan, dan Bahasa.',
};

export default async function EkstrakurikulerPage() {
  const [settings, rawEkskul] = await Promise.all([
    getWebSettings(),
    getActiveEkskul(),
  ]);

  const items: EkskulItem[] =
    rawEkskul.length > 0
      ? rawEkskul.map((e) => ({
          id: e.id,
          slug: e.slug || e.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: e.name,
          category: (e.category || 'KEPANDUAN') as any,
          categoryLabel: e.category_label || 'Ekstrakurikuler',
          badge: e.badge || 'Kegiatan Rutin',
          motto: e.motto || '',
          description: e.description,
          coach: e.coach,
          coachRole: 'Pembina Ekstrakurikuler',
          schedule: e.schedule,
          location: e.place,
          memberCount: 'Peserta Didik Aktif',
          achievements: Array.isArray(e.achievements) ? e.achievements : [],
          coverImage: e.cover_image || '/assets/gedung-smpn5cibeber.jpg',
          videoUrl: e.video_url || null,
          galleryImages: Array.isArray(e.gallery_images) ? e.gallery_images : [],
          highlights: ['Pembinaan Rutin'],
        }))
      : ekskulData;

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Header Halaman Editorial Rata Kiri */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-slate-950">
          <Image
            src={settings.banner_page_ekskul || '/assets/ekskul-banner-bg.jpg'}
            alt="Ekstrakurikuler dan Pembinaan Siswa SMPN 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/50 to-[#091e10]/85" />
        </div>

        <div className="container-site relative z-10 max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Ekstrakurikuler</span>
          </nav>

          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Ekstrakurikuler &amp; Pembinaan Bakat
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mt-2.5 leading-relaxed">
            Wadah kegiatan latihan rutin mingguan untuk mengembangkan kemandirian, kepanduan, olahraga, dan kesenian daerah peserta didik SMP Negeri 5 Cibeber.
          </p>
        </div>
      </section>

      <main className="container-site max-w-6xl mx-auto py-10 sm:py-16">
        <EkskulList items={items} schoolWhatsapp={settings.school_whatsapp} />
      </main>
    </div>
  );
}
