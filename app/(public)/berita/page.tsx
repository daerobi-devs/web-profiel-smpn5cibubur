import { getPublishedArticles } from '@/lib/supabaseData';
import ArticleSearchFilter, { ArticleItem } from '@/components/ui/ArticleSearchFilter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal Berita & Pengumuman Resmi — SMPN 5 Cibeber',
  description:
    'Kabar terverifikasi, liputan prestasi siswa, jurnalistik sekolah, rilis pengumuman resmi, dan dinamika pembelajaran di SMP Negeri 5 Cibeber, Lebak.',
};

export default async function BeritaPage() {
  const rawArticles = await getPublishedArticles();

  const articles: ArticleItem[] = rawArticles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt || '',
    imageUrl: a.image_url ?? null,
    createdAt: new Date(a.created_at),
    publishedAt: a.published_at ? new Date(a.published_at) : null,
  }));

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Konten Newsroom Interaktif — Langsung ke Warta & Sorotan Redaksi */}
      <main className="container-site pt-6 pb-16 sm:pt-8 sm:pb-20">
        <ArticleSearchFilter articles={articles} />
      </main>
    </div>
  );
}
