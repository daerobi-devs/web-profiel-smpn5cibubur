import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug } from '@/lib/supabaseData';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, CalendarBlank } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Berita tidak ditemukan' };
  return {
    title: article.title,
    description: article.excerpt || undefined,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const publishedDate = article.published_at ? new Date(article.published_at) : new Date(article.created_at);

  return (
    <div className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
      <div className="container-site relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/berita" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#1E5631] active:scale-95 transition-all mb-6 font-medium">
            <ArrowLeft size={16} weight="bold" />
            Kembali ke Berita
          </Link>

          {/* Card / Container — Pure White (#FFFFFF) for Wadah Berita / Artikel */}
          <article className="card p-6 sm:p-10 bg-white border border-slate-200/90 rounded-3xl shadow-xs">
            <header className="mb-6 space-y-4">
              {/* Judul Utama — Academic Green (#1E5631) */}
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E5631] tracking-tight leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarBlank size={15} />
                <time dateTime={publishedDate.toISOString()}>
                  {formatDate(publishedDate)}
                </time>
                <span>&bull;</span>
                <span>{article.author || 'Humas SMPN 5 Cibeber'}</span>
              </div>
            </header>

            {article.image_url && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-slate-100">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {/* Konten Berita / Artikel — Menggunakan prose typography tailwind */}
            <div
              className="prose prose-slate max-w-none text-[#1E293B] leading-relaxed text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
