import { notFound } from 'next/navigation';
import { getArticleBySlug, getPublishedArticles } from '@/lib/supabaseData';
import ArticleDetailContent from '@/components/ui/ArticleDetailContent';
import { getArticleCategory } from '@/lib/articleUtils';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Berita Tidak Ditemukan — SMPN 5 Cibeber' };
  return {
    title: `${article.title} — SMPN 5 Cibeber`,
    description: article.excerpt || undefined,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getPublishedArticles(),
  ]);

  if (!article) notFound();

  // Rekomendasi Warta Terkait (selain artikel yang sedang dibaca)
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 4)
    .map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      image_url: a.image_url,
      published_at: a.published_at,
      created_at: a.created_at,
    }));

  // Hitung jumlah artikel per kategori untuk sidebar
  const counts: Record<string, number> = {
    'Semua Berita': allArticles.length,
    'Prestasi Siswa': 0,
    'Akademik & Guru': 0,
    'Kesiswaan & Seni': 0,
    'Lingkungan & Adiwiyata': 0,
    'Pengumuman Resmi': 0,
    'Warta Sekolah': 0,
  };

  allArticles.forEach((a) => {
    const cat = getArticleCategory(a.title, a.slug);
    if (counts[cat] !== undefined) {
      counts[cat]++;
    } else {
      counts['Warta Sekolah']++;
    }
  });

  const categoriesList = Object.entries(counts)
    .filter(([name, cnt]) => cnt > 0 || name === 'Semua Berita')
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      <ArticleDetailContent
        article={article}
        relatedArticles={relatedArticles}
        categoriesList={categoriesList}
      />
    </div>
  );
}
