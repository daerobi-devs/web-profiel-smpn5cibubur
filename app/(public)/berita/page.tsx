import Image from 'next/image';
import Link from 'next/link';
import { NewspaperClipping } from '@phosphor-icons/react/dist/ssr';
import { getPublishedArticles, getWebSettings } from '@/lib/supabaseData';
import ArticleSearchFilter, { ArticleItem } from '@/components/ui/ArticleSearchFilter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal Berita & Artikel Resmi — SMPN 5 Cibeber',
  description:
    'Kabar terverifikasi, liputan prestasi siswa, jurnalistik sekolah, rilis pengumuman resmi, dan dinamika pembelajaran di SMP Negeri 5 Cibeber, Lebak.',
};

export default async function BeritaPage() {
  const [rawArticles, settings] = await Promise.all([
    getPublishedArticles(),
    getWebSettings()
  ]);

  const bannerImage = settings.banner_page_berita || '/assets/berita-banner-bg.jpg';

  const articles: ArticleItem[] = rawArticles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt || '',
    imageUrl: a.image_url ?? null,
    author: a.author,
    createdAt: new Date(a.created_at),
    publishedAt: a.published_at ? new Date(a.published_at) : null,
  }));

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* =========================================================
          HERO BANNER INSTITUSIONAL BER-BACKGROUND EDITORIAL DESK
          ========================================================= */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/30">
        {/* Background Foto Dinamis dengan Dark Forest Green Tint */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={bannerImage}
            alt="Meja Redaksi & Portal Berita SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_42%]"
            sizes="100vw"
          />
          {/* Overlay Gradasi Hijau Hutan Lembut Agar Teks 100% Kontras & Nyaman Dibaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/82 via-[#164325]/75 to-[#12361e]/92" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/60" />
        </div>

        <div className="container-site relative z-10 space-y-3.5 max-w-3xl mx-auto text-center">
          {/* Badge Pill Emas Berikon */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-amber-300 shadow-xs">
            <NewspaperClipping size={15} weight="fill" />
            <span>Warta Resmi &amp; Publikasi Sekolah</span>
          </div>

          {/* Judul Utama Megah */}
          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Portal Berita &amp; Artikel
          </h1>

          {/* Deskripsi Pengantar Berwibawa */}
          <p className="text-xs sm:text-sm md:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Kabar terverifikasi, liputan prestasi siswa, rilis pengumuman resmi, dan dinamika pembelajaran di lingkungan SMP Negeri 5 Cibeber, Lebak.
          </p>

          {/* Breadcrumb Navigasi */}
          <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-emerald-200/90 pt-1">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-emerald-400/60">/</span>
            <span className="text-amber-400 font-bold">Portal Berita</span>
          </nav>

          {/* Quick Counter Badges */}
          <div className="pt-2 flex flex-wrap justify-center gap-2.5 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold shadow-2xs">
              {articles.length} Warta Terbit
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-amber-300 font-semibold shadow-2xs">
              Kabar Terverifikasi
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          KONTEN UTAMA: DUA KOLOM (GRID BERITA + SIDEBAR)
          ========================================================= */}
      <main className="container-site pt-8 pb-16 sm:pt-10 sm:pb-24">
        <ArticleSearchFilter articles={articles} />
      </main>
    </div>
  );
}
