'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MagnifyingGlass,
  X,
  CalendarBlank,
  User,
  ArrowRight,
  Newspaper,
  Funnel,
} from '@phosphor-icons/react';
import { formatDateShort } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import NewsSidebar, { type CategoryCountItem } from './NewsSidebar';
import { ScrollFadeUp } from './motion';

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

// Helper functions imported from shared lib/articleUtils
export { getArticleCategory, getArticleCover } from '@/lib/articleUtils';
import { getArticleCategory, getArticleCover } from '@/lib/articleUtils';

export default function ArticleSearchFilter({ articles }: ArticleSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');

  // Menghitung jumlah per kategori untuk Sidebar
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

  // Filtered List
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
        {/* Status Filter / Active Indicator Bar */}
        {(selectedCategory !== 'SEMUA' && selectedCategory !== 'Semua Berita') ||
        searchQuery ? (
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Funnel size={14} weight="bold" className="text-[#D97706]" />
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
                    <span className="font-bold text-[#D97706]">
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

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16 px-6 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xs space-y-3">
            <Newspaper size={48} className="mx-auto text-slate-300" />
            <h3 className="font-serif-academic font-bold text-slate-800 text-lg">
              Tidak Ada Warta yang Sesuai
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Tidak ditemukan artikel untuk kata kunci atau kategori yang
              dipilih. Silakan coba kata kunci lain.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('SEMUA');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E5631] text-white text-xs font-bold shadow-xs hover:bg-[#164325] transition-all cursor-pointer"
              >
                Tampilkan Semua Berita
              </button>
            </div>
          </div>
        ) : (
          /* Grid 2 Kolom Kartu Berita (Sesuai Foto Referensi) */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((article) => {
              const coverUrl = getArticleCover(article);
              const category = getArticleCategory(article.title, article.slug);
              const pubDate = article.publishedAt
                ? new Date(article.publishedAt)
                : new Date(article.createdAt);
              const authorName = article.author || 'Administrator';

              return (
                <article
                  key={article.id}
                  className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Foto Sampul dengan Badge Kategori di Pojok Kiri Atas */}
                  <Link
                    href={`/berita/${article.slug}`}
                    className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden block"
                  >
                    <Image
                      src={coverUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                    {/* Badge Kategori Biru/Hijau seperti di Foto */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-[#1E5631] text-white shadow-xs backdrop-blur-xs">
                        {category}
                      </span>
                    </div>
                  </Link>

                  {/* Isi Konten Kartu */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      {/* Baris Metadata: Tanggal | Penulis */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                        <CalendarBlank size={13} className="text-slate-400 shrink-0" />
                        <span>{formatDateShort(pubDate)}</span>
                        <span className="text-slate-300">&bull;</span>
                        <User size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate">{authorName}</span>
                      </div>

                      {/* Judul Berita Tebal & Tegas (Biru/Hijau Tua) */}
                      <h2 className="font-serif-academic text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug line-clamp-2">
                        <Link href={`/berita/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      {/* Ringkasan Singkat (Excerpt) */}
                      {article.excerpt && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Tombol Aksi di Bawah Kartu: Baca Selengkapnya → */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/berita/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#D97706] hover:text-[#B45309] transition-all group-hover:gap-2"
                      >
                        <span>Baca Selengkapnya</span>
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
