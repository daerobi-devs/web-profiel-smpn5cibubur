'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MagnifyingGlass,
  X,
  CalendarBlank,
  ArrowRight,
  Newspaper,
  Tag,
  Clock,
  CaretRight,
} from '@phosphor-icons/react';
import { formatDateShort } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export type ArticleItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  createdAt: Date | string;
  publishedAt: Date | string | null;
};

type ArticleSearchFilterProps = {
  articles: ArticleItem[];
};

// Helper: Penentuan Kategori Berita Berdasarkan Konten
export function getArticleCategory(title: string, slug: string): string {
  const t = (title + ' ' + slug).toLowerCase();
  if (t.includes('matematika') || t.includes('juara') || t.includes('prestasi') || t.includes('olimpiade') || t.includes('piala') || t.includes('porseni')) {
    return 'Prestasi Siswa';
  }
  if (t.includes('adiwiyata') || t.includes('lingkungan') || t.includes('hijau') || t.includes('sampah') || t.includes('pohon')) {
    return 'Lingkungan & Adiwiyata';
  }
  if (t.includes('guru') || t.includes('kurikulum') || t.includes('workshop') || t.includes('kompetensi') || t.includes('ajar')) {
    return 'Akademik & Guru';
  }
  if (t.includes('mpls') || t.includes('paskibra') || t.includes('osis') || t.includes('pramuka') || t.includes('upacara') || t.includes('seni')) {
    return 'Kesiswaan & Seni';
  }
  if (t.includes('pengumuman') || t.includes('ppdb') || t.includes('edaran') || t.includes('jadwal') || t.includes('rapat')) {
    return 'Pengumuman Resmi';
  }
  return 'Warta Sekolah';
}

// Helper: Fallback Cover Image Tematik yang Relevan
export function getArticleCover(article: ArticleItem): string {
  if (article.imageUrl && article.imageUrl.trim() !== '') {
    return article.imageUrl;
  }
  const cat = getArticleCategory(article.title, article.slug);
  if (cat === 'Prestasi Siswa') return '/assets/prestasi-siswa-smpn5cibeber.jpg';
  if (cat === 'Lingkungan & Adiwiyata') return '/assets/gedung-smpn5cibeber.jpg';
  if (cat === 'Akademik & Guru') return '/assets/dewan-guru-smpn5cibeber.jpg';
  if (cat === 'Kesiswaan & Seni') return '/assets/lapangan-smpn5cibeber.jpg';
  return '/assets/gedung-smpn5cibeber.jpg';
}

const categoryPillColors: Record<string, { bg: string; text: string; border: string }> = {
  'Prestasi Siswa': { bg: 'bg-amber-500/10', text: 'text-amber-800', border: 'border-amber-400/30' },
  'Lingkungan & Adiwiyata': { bg: 'bg-emerald-500/10', text: 'text-emerald-800', border: 'border-emerald-400/30' },
  'Akademik & Guru': { bg: 'bg-blue-500/10', text: 'text-blue-800', border: 'border-blue-400/30' },
  'Kesiswaan & Seni': { bg: 'bg-purple-500/10', text: 'text-purple-800', border: 'border-purple-400/30' },
  'Pengumuman Resmi': { bg: 'bg-rose-500/10', text: 'text-rose-800', border: 'border-rose-400/30' },
  'Warta Sekolah': { bg: 'bg-slate-500/10', text: 'text-slate-800', border: 'border-slate-400/30' },
};

export default function ArticleSearchFilter({ articles }: ArticleSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');

  const categories = [
    'SEMUA',
    'Prestasi Siswa',
    'Akademik & Guru',
    'Kesiswaan & Seni',
    'Lingkungan & Adiwiyata',
    'Pengumuman Resmi',
  ];

  // Filtered List
  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const cat = getArticleCategory(a.title, a.slug);
      if (selectedCategory !== 'SEMUA' && cat !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = a.title.toLowerCase().includes(q);
        const matchExcerpt = a.excerpt.toLowerCase().includes(q);
        const matchSlug = a.slug.toLowerCase().includes(q);
        const matchCat = cat.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt && !matchSlug && !matchCat) return false;
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Editorial Top Stories (ketika tidak ada search query & kategori SEMUA)
  const isDefaultView = searchQuery.trim() === '' && selectedCategory === 'SEMUA';
  const headlineStory = isDefaultView && articles.length > 0 ? articles[0] : null;
  const sideStories = isDefaultView && articles.length > 1 ? articles.slice(1, 3) : [];
  const remainingArticles = isDefaultView ? articles.slice(3) : filtered;

  return (
    <div className="space-y-8">
      {/* =========================================================
          1. EDITORIAL HEADER & TOOLBAR (PENCARIAN & KATEGORI DI ATAS)
          ========================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
        {/* Baris Atas: Judul di Kiri, Kolom Pencarian di Kanan */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706]">
              Warta, Risalah &amp; Majalah Digital Sekolah
            </span>
            <h1 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E5631] tracking-tight mt-0.5">
              Berita &amp; Pengumuman Resmi
            </h1>
          </div>

          {/* Kolom Pencarian di Atas Kanan */}
          <div className="relative w-full md:w-80 shrink-0">
            <MagnifyingGlass
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita atau pengumuman..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E5631]/20 focus:border-[#1E5631] focus:bg-white shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                aria-label="Hapus kata kunci"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Baris Bawah: Tabs Kategori Horizontal Rapi */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E5631] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {cat === 'SEMUA' ? 'Semua Berita' : cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500 font-semibold">
              {filtered.length} Warta Tersedia
            </span>
            {(selectedCategory !== 'SEMUA' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('SEMUA');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#1E5631] hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          2. EDITORIAL HEADLINE SHOWCASE (BERITA UTAMA & WARTA PILIHAN)
          Tanpa Emoji Bintang, Bersih & Elegan
          ========================================================= */}
      {isDefaultView && headlineStory && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1E5631]">
              Sorotan Redaksi &amp; Berita Utama
            </h2>
            <span className="text-[11px] text-slate-500 font-semibold">
              Edisi Publikasi Resmi
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Lead Story: Big Hero Article (7 Cols) */}
            <div className="lg:col-span-7">
              <Link
                href={`/berita/${headlineStory.slug}`}
                className="group block h-full bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <Image
                    src={getArticleCover(headlineStory)}
                    alt={headlineStory.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  {/* Badges on Cover */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-emerald-950 text-xs font-black uppercase tracking-wider shadow-md">
                      Berita Utama
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                      {getArticleCategory(headlineStory.title, headlineStory.slug)}
                    </span>
                  </div>

                  {/* Headline Overlay Text */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-3 text-xs text-emerald-200/90 font-medium mb-1.5">
                      <span className="flex items-center gap-1">
                        <CalendarBlank size={14} />
                        {formatDateShort(headlineStory.publishedAt ?? headlineStory.createdAt)}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        3 menit baca
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
                      {headlineStory.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {headlineStory.excerpt}
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1E5631]">
                    <span className="text-slate-400 font-normal">Oleh Tim Redaksi SMPN 5 Cibeber</span>
                    <span className="inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <span>Baca Liputan Lengkap</span>
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Stories: Editorial Top Picks (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <Newspaper size={16} weight="bold" className="text-[#1E5631]" />
                    <span>Warta Pilihan &amp; Populer</span>
                  </h3>

                  <div className="space-y-4">
                    {sideStories.map((story) => {
                      const cat = getArticleCategory(story.title, story.slug);
                      const pill = categoryPillColors[cat] || categoryPillColors['Warta Sekolah'];

                      return (
                        <Link
                          key={story.id}
                          href={`/berita/${story.slug}`}
                          className="group flex gap-3.5 items-start p-2.5 -mx-2.5 rounded-2xl hover:bg-slate-50 transition-colors"
                        >
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                            <Image
                              src={getArticleCover(story)}
                              alt={story.title}
                              fill
                              sizes="80px"
                              className="object-cover group-hover:scale-108 transition-transform duration-300"
                            />
                          </div>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2 text-[10px]">
                              <span className={`font-bold uppercase tracking-wider ${pill.text}`}>
                                {cat}
                              </span>
                              <span className="text-slate-300">&bull;</span>
                              <span className="text-slate-400">
                                {formatDateShort(story.publishedAt ?? story.createdAt)}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug line-clamp-2">
                              {story.title}
                            </h4>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E5631]">
                              <span>Baca</span>
                              <CaretRight size={10} weight="bold" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          3. ARSIP WARTA & LIPUTAN SEKOLAH (GRID BERITA)
          ========================================================= */}
      <section className="space-y-4">
        {isDefaultView && (
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1E5631]">
              Arsip Berita &amp; Liputan Sekolah
            </h2>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-dashed border-slate-300 space-y-3">
            <Newspaper size={44} className="text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              Tidak Ada Berita yang Sesuai
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Tidak ditemukan artikel untuk kata kunci atau kategori yang Anda tentukan. Silakan gunakan kata kunci pencarian yang lain.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('SEMUA');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#1E5631] text-white text-xs font-bold hover:bg-[#164325] transition-colors inline-block mt-2 cursor-pointer"
            >
              Tampilkan Seluruh Berita
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {remainingArticles.map((article, idx) => {
                const cat = getArticleCategory(article.title, article.slug);
                const pillColor = categoryPillColors[cat] || categoryPillColors['Warta Sekolah'];

                return (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, delay: idx * 0.04 }}
                  >
                    <Link
                      href={`/berita/${article.slug}`}
                      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 active:scale-98"
                    >
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                        <Image
                          src={getArticleCover(article)}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Floating Category Tag */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold backdrop-blur-md border shadow-xs ${pillColor.bg} ${pillColor.text} ${pillColor.border} bg-white/90`}
                          >
                            <Tag size={11} weight="bold" />
                            <span>{cat}</span>
                          </span>
                        </div>

                        {/* Date on image */}
                        <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-medium flex items-center gap-1">
                          <CalendarBlank size={13} />
                          <span>{formatDateShort(article.publishedAt ?? article.createdAt)}</span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1E5631]">
                          <span className="text-slate-400 font-normal">Humas SMPN 5</span>
                          <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            <span>Baca Berita</span>
                            <ArrowRight size={13} weight="bold" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
