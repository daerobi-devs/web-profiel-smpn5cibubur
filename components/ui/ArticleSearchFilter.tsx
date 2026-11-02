'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  ArrowRight,
  Newspaper,
  Funnel,
} from '@phosphor-icons/react';
import { formatDateShort } from '@/lib/utils';
import NewsSidebar, { type CategoryCountItem } from './NewsSidebar';
import { getArticleCategory, getArticleCover } from '@/lib/articleUtils';

export { getArticleCategory, getArticleCover } from '@/lib/articleUtils';

export type ArticleItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  author?: string;
  category?: string;
  createdAt: Date | string;
  publishedAt: Date | string | null;
};

type ArticleSearchFilterProps = {
  articles: ArticleItem[];
};

export default function ArticleSearchFilter({ articles }: ArticleSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');

  const categoriesList: CategoryCountItem[] = useMemo(() => {
    const counts: Record<string, number> = {
      'Semua Berita': articles.length,
      'Prestasi Siswa': 0,
      'Akademik & Guru': 0,
      'Kesiswaan & Seni': 0,
      'Lingkungan & Adiwiyata': 0,
      'Pengumuman Resmi': 0,
      'Warta Sekolah': 0,
    };

    articles.forEach((a) => {
      const cat = getArticleCategory(a.title, a.slug);
      if (counts[cat] !== undefined) {
        counts[cat]++;
      } else {
        counts['Warta Sekolah']++;
      }
    });

    return Object.entries(counts)
      .filter(([name, cnt]) => cnt > 0 || name === 'Semua Berita')
      .map(([name, count]) => ({ name, count }));
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const cat = getArticleCategory(a.title, a.slug);
      if (
        selectedCategory !== 'SEMUA' &&
        selectedCategory !== 'Semua Berita' &&
        cat !== selectedCategory
      ) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = a.title.toLowerCase().includes(q);
        const matchExcerpt = (a.excerpt || '').toLowerCase().includes(q);
        const matchSlug = a.slug.toLowerCase().includes(q);
        const matchCat = cat.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt && !matchSlug && !matchCat) return false;
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  const activeCategoryLabel =
    selectedCategory === 'SEMUA' || selectedCategory === 'Semua Berita'
      ? 'Semua Berita'
      : selectedCategory;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* =========================================================
          KOLOM KIRI: GRID 2-KOLOM KARTU BERITA (8 KOLOM)
          ========================================================= */}
      <section className="lg:col-span-8 space-y-6">
        {(selectedCategory !== 'SEMUA' && selectedCategory !== 'Semua Berita') ||
        searchQuery ? (
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Funnel size={14} weight="bold" className="text-[#1E5631]" />
              <span className="text-slate-600">
                Menampilkan{' '}
                <strong className="text-slate-900">{filtered.length}</strong>{' '}
                artikel
                {selectedCategory !== 'SEMUA' &&
                  selectedCategory !== 'Semua Berita' && (
                    <span>
                      {' '}
                      kategori{' '}
                      <span className="font-bold text-[#1E5631]">
                        &quot;{selectedCategory}&quot;
                      </span>
                    </span>
                  )}
                {searchQuery && (
                  <span>
                    {' '}
                    dengan kata kunci{' '}
                    <span className="font-bold text-[#B45309]">
                      &quot;{searchQuery}&quot;
                    </span>
                  </span>
                )}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('SEMUA');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <X size={12} weight="bold" />
              <span>Reset Filter</span>
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white border border-slate-200/90 rounded-2xl space-y-3">
            <Newspaper size={44} className="mx-auto text-slate-300" />
            <h3 className="font-bold text-slate-800 text-base">
              Tidak Ada Warta yang Sesuai
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Tidak ditemukan artikel untuk kata kunci atau kategori yang dipilih. Silakan coba kata kunci lain.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('SEMUA');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E5631] text-white text-xs font-bold hover:bg-[#164325] transition-all cursor-pointer"
              >
                Tampilkan Semua Berita
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((article) => {
              const coverUrl = getArticleCover(article);
              const category = getArticleCategory(article.title, article.slug);
              const pubDate = article.publishedAt
                ? new Date(article.publishedAt)
                : new Date(article.createdAt);
              const authorName = article.author || 'Humas SMPN 5 Cibeber';

              return (
                <article
                  key={article.id}
                  className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-[#1E5631]/40 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                >
                  {/* Foto Sampul Bersih Tanpa Floating Pill di Atas Foto */}
                  <Link
                    href={`/berita/${article.slug}`}
                    className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden block border-b border-slate-100"
                  >
                    <Image
                      src={coverUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  {/* Isi Konten Kartu */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      {/* Baris Metadata Terstruktur: Kategori · Tanggal · Penulis */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-500">
                        <span className="font-bold uppercase tracking-wider text-[#1E5631]">
                          {category}
                        </span>
                        <span className="text-slate-300">&middot;</span>
                        <time className="tabular-nums">{formatDateShort(pubDate)}</time>
                        <span className="text-slate-300">&middot;</span>
                        <span className="truncate">{authorName}</span>
                      </div>

                      {/* Judul Berita Sans-Serif Bold */}
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug line-clamp-2">
                        <Link href={`/berita/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      {/* Ringkasan Singkat (Excerpt) */}
                      {article.excerpt && (
                        <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Tombol Aksi di Bawah Kartu */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/berita/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E5631] hover:text-[#164325] transition-all group-hover:gap-2"
                      >
                        <span>Baca Artikel</span>
                        <ArrowRight size={13} weight="bold" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================================
          KOLOM KANAN: SIDEBAR MODULAR (4 KOLOM)
          ========================================================= */}
      <div className="lg:col-span-4 sticky top-24">
        <NewsSidebar
          categories={categoriesList}
          selectedCategory={activeCategoryLabel}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          isDetailPage={false}
        />
      </div>
    </div>
  );
}
