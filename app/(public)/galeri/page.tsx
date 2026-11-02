import Image from 'next/image';
import Link from 'next/link';
import { getActiveGalleries, getWebSettings } from '@/lib/supabaseData';
import GalleryLightbox, { GalleryItem } from '@/components/ui/GalleryLightbox';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri & Dokumentasi Sekolah | SMP Negeri 5 Cibeber',
  description:
    'Dokumentasi foto kegiatan belajar, ekstrakurikuler, prestasi, dan fasilitas di lingkungan SMP Negeri 5 Cibeber.',
};

export default async function GaleriPage() {
  const [rawGalleries, settings] = await Promise.all([
    getActiveGalleries(),
    getWebSettings(),
  ]);

  const bannerImage = settings.banner_page_galeri || '/assets/galeri-banner-bg.jpg';

  const galleries: GalleryItem[] = rawGalleries.map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description ?? null,
    imageUrl: g.image_url,
    videoUrl: g.video_url ?? null,
    category: g.category,
  }));

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* =========================================================
          1. HEADER HALAMAN EDITORIAL (KIRI-RATA)
          ========================================================= */}
      <section className="relative overflow-hidden text-white pt-16 pb-14 md:pt-20 md:pb-16 border-b border-slate-900/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={bannerImage}
            alt="Galeri & Dokumentasi Visual SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/50 to-[#091e10]/85" />
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-3xl space-y-3">
            <nav className="flex items-center gap-2 text-xs font-medium text-white/75">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-amber-300 font-semibold">Galeri Sekolah</span>
            </nav>

            <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Galeri &amp; Dokumentasi Sekolah
            </h1>

            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
              Arsip dokumentasi visual kegiatan belajar mengajar, pembinaan kesiswaan, dan sarana prasarana di SMP Negeri 5 Cibeber ({galleries.length} dokumentasi).
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. KONTEN GALERI INTERAKTIF
          ========================================================= */}
      <main className="container-site pt-8 pb-16 sm:pt-10 sm:pb-24">
        <GalleryLightbox items={galleries} />
      </main>
    </div>
  );
}
