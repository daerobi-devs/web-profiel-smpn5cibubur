'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarBlank,
  User,
  Clock,
  WhatsappLogo,
  FacebookLogo,
  TwitterLogo,
  TelegramLogo,
  LinkSimple,
  Check,
  TextAa,
  ArrowLeft,
  ArrowRight,
  ShareNetwork,
} from '@phosphor-icons/react';
import { formatDate } from '@/lib/utils';
import NewsSidebar, { type CategoryCountItem } from './NewsSidebar';
import { getArticleCategory, getArticleCover, formatArticleContent } from '@/lib/articleUtils';

interface ArticleDetailContentProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    image_url?: string | null;
    author: string;
    category?: string;
    published_at?: string | null;
    created_at: string;
  };
  relatedArticles: Array<{
    id: string;
    title: string;
    slug: string;
    image_url?: string | null;
    published_at?: string | null;
    created_at: string;
  }>;
  categoriesList: CategoryCountItem[];
}

export default function ArticleDetailContent({
  article,
  relatedArticles = [],
  categoriesList = [],
}: ArticleDetailContentProps) {
  // Font Size Resizer State: 'sm' | 'base' | 'lg'
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [copied, setCopied] = useState(false);

  const category = getArticleCategory(article.title, article.slug);
  const coverUrl = getArticleCover({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || '',
    imageUrl: article.image_url ?? null,
    createdAt: article.created_at,
    publishedAt: article.published_at ?? null,
  });

  const pubDate = article.published_at
    ? new Date(article.published_at)
    : new Date(article.created_at);

  // Estimasi kata dan waktu baca (asumsi 180 kata per menit)
  const plainText = article.content.replace(/<[^>]+>/g, '');
  const wordCount = plainText.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));


  // Share Handlers
  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://ekosistem.daeroom.my.id/berita/${article.slug}`;

  const shareText = encodeURIComponent(
    `${article.title} — SMP Negeri 5 Cibeber\n${currentUrl}`
  );

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Font Size Classes
  const proseFontSizeClass =
    fontSize === 'sm'
      ? 'text-sm'
      : fontSize === 'lg'
      ? 'text-lg sm:text-[1.125rem]'
      : 'text-base sm:text-[1.025rem]';

  return (
    <div>
      {/* =========================================================
          1. HERO HEADER ARTIKEL (PERSIS SEPERTI FOTO REFERENSI)
          ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1E5631] via-[#164325] to-[#12361e] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-emerald-950/40">
        <div className="container-site relative z-10 max-w-6xl mx-auto space-y-4">
          {/* Breadcrumb Navigasi */}
          <nav className="flex items-center gap-2 text-xs font-medium text-emerald-200/90 mb-1">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-emerald-400/60">/</span>
            <Link href="/berita" className="hover:text-white transition-colors">
              Berita
            </Link>
            <span className="text-emerald-400/60">/</span>
            <span className="text-amber-400 font-semibold truncate max-w-xs sm:max-w-md">
              {article.title}
            </span>
          </nav>

          {/* Badge Kategori Kuning/Emas di Atas Judul */}
          <div>
            <span className="inline-block px-3 py-1 rounded bg-[#D97706] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
              KATEGORI: {category.toUpperCase()}
            </span>
          </div>

          {/* Judul Artikel Besar & Megah */}
          <h1 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl xl:text-[2.65rem] font-black tracking-tight text-white leading-tight drop-shadow-sm max-w-5xl">
            {article.title}
          </h1>

          {/* Metadata Row Lengkap: Penulis | Tanggal | Dilihat | Waktu Baca */}
          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-emerald-100/90 font-medium">
            <div className="flex items-center gap-1.5">
              <User size={15} weight="bold" className="text-amber-400" />
              <span>Penulis: {article.author || 'Administrator'}</span>
            </div>
            <span className="hidden sm:inline text-emerald-400/50">&bull;</span>
            <div className="flex items-center gap-1.5">
              <CalendarBlank size={15} weight="bold" className="text-amber-400" />
              <span>{formatDate(pubDate)}</span>
            </div>

            <span className="hidden sm:inline text-emerald-400/50">&bull;</span>
            <div className="flex items-center gap-1.5">
              <Clock size={15} weight="bold" className="text-amber-400" />
              <span>{readingTime} Menit Baca</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. KONTEN DUA KOLOM: ARTIKEL UTAMA (8 COLS) + SIDEBAR (4 COLS)
          ========================================================= */}
      <main className="container-site pt-8 pb-16 sm:pt-10 sm:pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Wadah Artikel Utama */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
            {/* Tool Pengatur Ukuran Huruf (A- / Normal / A+) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-medium">
                <TextAa size={18} weight="bold" className="text-slate-600" />
                <span>Ukuran Teks:</span>
              </div>
              <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 font-bold">
                <button
                  type="button"
                  onClick={() => setFontSize('sm')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    fontSize === 'sm'
                      ? 'bg-[#1E5631] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Ukuran Huruf Kecil"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('base')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    fontSize === 'base'
                      ? 'bg-[#1E5631] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Ukuran Huruf Normal"
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('lg')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    fontSize === 'lg'
                      ? 'bg-[#1E5631] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Ukuran Huruf Besar"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Foto Sampul Utama Artikel */}
            <div className="relative aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
              <Image
                src={coverUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-cover"
              />
            </div>

            {/* Teks Isi Konten Artikel (Mendukung Paragraf Otomatis & HTML) */}
            <div
              className={`prose-content max-w-none text-[#1E293B] transition-all ${proseFontSizeClass}`}
              dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content) }}
            />

            {/* Penulis / Dokumentasi */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 italic">
              <span>Penulis: {article.author || 'Humas SMPN 5 Cibeber'}</span>
              <span>Dokumentasi Resmi Sekolah</span>
            </div>

            {/* =====================================================
                BAR BAGIKAN SOSIAL MEDIA (PERSIS SEPERTI FOTO)
                ===================================================== */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <ShareNetwork size={16} weight="bold" className="text-[#1E5631]" />
                <span>Bagikan Ke:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#25D366] hover:opacity-90 text-white flex items-center justify-center shadow-xs active:scale-95 transition-all"
                >
                  <WhatsappLogo size={18} weight="fill" />
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke Facebook"
                  className="w-9 h-9 rounded-full bg-[#1877F2] hover:opacity-90 text-white flex items-center justify-center shadow-xs active:scale-95 transition-all"
                >
                  <FacebookLogo size={18} weight="fill" />
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke Twitter / X"
                  className="w-9 h-9 rounded-full bg-[#0F1419] hover:opacity-90 text-white flex items-center justify-center shadow-xs active:scale-95 transition-all"
                >
                  <TwitterLogo size={18} weight="fill" />
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke Telegram"
                  className="w-9 h-9 rounded-full bg-[#229ED9] hover:opacity-90 text-white flex items-center justify-center shadow-xs active:scale-95 transition-all"
                >
                  <TelegramLogo size={18} weight="fill" />
                </a>

                {/* Salin Tautan (Copy Link) */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Salin Tautan"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} weight="bold" className="text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Tautan Disalin!</span>
                    </>
                  ) : (
                    <>
                      <LinkSimple size={14} weight="bold" />
                      <span>Salin Tautan</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Rekomendasi Warta Terkait di Bagian Bawah */}
            {relatedArticles.length > 0 && (
              <div className="pt-8 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-academic font-bold text-base text-[#1E5631]">
                    Warta &amp; Liputan Terkait Lainnya
                  </h3>
                  <Link
                    href="/berita"
                    className="text-xs font-bold text-[#D97706] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight size={12} weight="bold" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArticles.slice(0, 2).map((rel) => {
                    const relCover = rel.image_url || '/assets/gedung-smpn5cibeber.jpg';
                    return (
                      <Link
                        key={rel.id}
                        href={`/berita/${rel.slug}`}
                        className="group p-3 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex items-center gap-3 bg-slate-50/50"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                          <Image
                            src={relCover}
                            alt={rel.title}
                            fill
                            sizes="70px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-serif-academic text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </article>

          {/* Kolom Kanan: Sidebar Modular Konsisten */}
          <div className="lg:col-span-4 sticky top-24">
            <NewsSidebar
              categories={categoriesList}
              selectedCategory=""
              isDetailPage={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
