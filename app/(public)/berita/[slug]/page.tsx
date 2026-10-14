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

  const title = `${article.title} — SMP Negeri 5 Cibeber`;
  const cleanDescription = (article.excerpt || article.content || '').replace(/<[^>]*>?/gm, '').slice(0, 160).trim();
  const rawImage = article.image_url;
  const fullImageUrl = rawImage
    ? (rawImage.startsWith('http') ? rawImage : `https://smpn5cibeber.sch.id${rawImage}`)
    : 'https://smpn5cibeber.sch.id/assets/logo-smpn5cibeber.png';
  const articleUrl = `https://smpn5cibeber.sch.id/berita/${article.slug}`;

  return {
    title,
    description: cleanDescription,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'id_ID',
      url: articleUrl,
      siteName: 'SMP Negeri 5 Cibeber',
      title: article.title,
      description: cleanDescription,
      publishedTime: article.published_at || article.created_at,
      authors: [article.author || 'SMP Negeri 5 Cibeber'],
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: cleanDescription,
      images: [fullImageUrl],
    },
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
