import Image from 'next/image';
import Link from 'next/link';
import { getPublishedArticles, getWebSettings } from '@/lib/supabaseData';
import ArticleSearchFilter, { ArticleItem } from '@/components/ui/ArticleSearchFilter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warta & Artikel Resmi | SMP Negeri 5 Cibeber',
  description:
    'Kabar resmi, liputan prestasi siswa, jurnalistik sekolah, rilis pengumuman resmi, dan dinamika pembelajaran di SMP Negeri 5 Cibeber, Kabupaten Lebak.',
};

export default async function BeritaPage() {
  const [rawArticles, settings] = await Promise.all([
    getPublishedArticles(),
    getWebSettings(),
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
          1. HEADER HALAMAN EDITORIAL (KIRI-RATA)
          ========================================================= */}
      <section className="relative overflow-hidden text-white pt-16 pb-14 md:pt-20 md:pb-16 border-b border-slate-900/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={bannerImage}
            alt="Meja Redaksi & Warta SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_42%]"
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
              <span className="text-amber-300 font-semibold">Berita Sekolah</span>
            </nav>

            <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Warta &amp; Publikasi Sekolah
            </h1>

            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
              Liputan kegiatan akademik, pengumuman resmi, dan dokumentasi dinamika belajar di lingkungan SMP Negeri 5 Cibeber ({articles.length} arsip terbit).
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. KONTEN UTAMA: DUA KOLOM (GRID BERITA + SIDEBAR)
          ========================================================= */}
      <main className="container-site pt-8 pb-16 sm:pt-10 sm:pb-24">
        <ArticleSearchFilter articles={articles} />
      </main>
    </div>
  );
}
