import Image from 'next/image';
import Link from 'next/link';
import { Images } from '@phosphor-icons/react/dist/ssr';
import { getActiveGalleries } from '@/lib/supabaseData';
import GalleryLightbox, { GalleryItem } from '@/components/ui/GalleryLightbox';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri Sekolah — SMPN 5 Cibeber',
  description: 'Dokumentasi foto kegiatan belajar, ekstrakurikuler, prestasi, dan fasilitas SMPN 5 Cibeber.',
};

export default async function GaleriPage() {
  const rawGalleries = await getActiveGalleries();

  const galleries: GalleryItem[] = rawGalleries.map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description ?? null,
    imageUrl: g.image_url,
    category: g.category,
  }));

  const categoriesCount = new Set(galleries.map((g) => g.category)).size;

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* =========================================================
          HERO BANNER INSTITUSIONAL BER-BACKGROUND PHOTO ARCHIVIST
          ========================================================= */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/30">
        {/* Background Foto Meja Arsip Dokumentasi dengan Dark Forest Green Tint */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/assets/galeri-banner-bg.jpg"
            alt="Galeri & Dokumentasi Visual SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
          {/* Overlay Gradasi Hijau Hutan Lembut Agar Teks 100% Kontras & Nyaman Dibaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/82 via-[#164325]/75 to-[#12361e]/92" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/60" />
        </div>

        <div className="container-site relative z-10 space-y-3.5 max-w-3xl mx-auto text-center">
          {/* Badge Pill Emas Berikon */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-amber-300 shadow-xs">
            <Images size={15} weight="fill" />
            <span>Dokumentasi Visual &amp; Arsip Kegiatan</span>
          </div>

          {/* Judul Utama Megah */}
          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Galeri &amp; Dokumentasi Sekolah
          </h1>

          {/* Deskripsi Pengantar Berwibawa */}
          <p className="text-xs sm:text-sm md:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Potret ragam dinamika belajar, pembinaan budi pekerti, gelaran ekstrakurikuler, dan sarana prasarana di lingkungan SMP Negeri 5 Cibeber, Lebak.
          </p>

          {/* Breadcrumb Navigasi */}
          <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-emerald-200/90 pt-1">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-emerald-400/60">/</span>
            <span className="text-amber-400 font-bold">Galeri Sekolah</span>
          </nav>

          {/* Quick Info Badges */}
          <div className="pt-2 flex flex-wrap justify-center gap-2.5 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold shadow-2xs">
              {galleries.length} Foto Dokumentasi
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-amber-300 font-semibold shadow-2xs">
              {categoriesCount} Album Kategori
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-emerald-200 font-semibold shadow-2xs">
              Lightbox Full HD
            </span>
          </div>
        </div>
      </section>

      {/* Konten Galeri Interaktif */}
      <main className="container-site pt-8 pb-16 sm:pt-10 sm:pb-24">
        <GalleryLightbox items={galleries} />
      </main>
    </div>
  );
}
