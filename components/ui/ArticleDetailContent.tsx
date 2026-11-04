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

  const plainText = article.content.replace(/<[^>]+>/g, '');
  const wordCount = plainText.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));

  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://smpn5cibeber.sch.id/berita/${article.slug}`;

  const shareText = encodeURIComponent(
    `${article.title} | SMP Negeri 5 Cibeber\n${currentUrl}`
  );

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const proseFontSizeClass =
    fontSize === 'sm'
      ? 'text-sm'
      : fontSize === 'lg'
      ? 'text-lg sm:text-[1.125rem]'
      : 'text-base sm:text-[1.025rem]';

  return (
    <div>
      {/* =========================================================
          1. HEADER ARTIKEL EDITORIAL (KIRI-RATA)
          ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0e2a17] to-[#164325] text-white pt-12 pb-12 sm:pt-16 sm:pb-14 border-b border-slate-900/20">
        <div className="container-site relative z-10 max-w-6xl mx-auto space-y-3.5">
          <nav className="flex items-center gap-2 text-xs font-medium text-white/75">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/berita" className="hover:text-white transition-colors">
              Berita Sekolah
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-amber-300 font-semibold truncate max-w-xs sm:max-w-md">
              {category}
            </span>
          </nav>

          <h1 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight max-w-4xl">
            {article.title}
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/85 font-medium">
            <div className="flex items-center gap-1.5">
              <User size={15} weight="bold" className="text-amber-300" />
              <span>{article.author || 'Humas SMPN 5 Cibeber'}</span>
            </div>
            <span className="hidden sm:inline text-white/35">&middot;</span>
            <div className="flex items-center gap-1.5">
              <CalendarBlank size={15} weight="bold" className="text-amber-300" />
              <time className="tabular-nums">{formatDate(pubDate)}</time>
            </div>
            <span className="hidden sm:inline text-white/35">&middot;</span>
            <div className="flex items-center gap-1.5">
              <Clock size={15} weight="bold" className="text-amber-300" />
              <span className="tabular-nums">{readingTime} menit baca</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. KONTEN DUA KOLOM: ARTIKEL UTAMA (8 COLS) + SIDEBAR (4 COLS)
          ========================================================= */}
      <main className="container-site pt-8 pb-16 sm:pt-10 sm:pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
            {/* Pengatur Ukuran Huruf */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-medium">
                <TextAa size={17} weight="bold" className="text-slate-600" />
                <span>Ukuran Teks Bacaan</span>
              </div>
              <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 font-bold">
                <button
                  type="button"
                  onClick={() => setFontSize('sm')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    fontSize === 'sm'
                      ? 'bg-[#1E5631] text-white'
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
                      ? 'bg-[#1E5631] text-white'
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
                      ? 'bg-[#1E5631] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Ukuran Huruf Besar"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Foto Sampul Utama Artikel (Adaptif: Mendukung 16:9, 4:3, 1:1, maupun 3:4 Portret tanpa terpotong) */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100/90 border border-slate-200/80 flex items-center justify-center p-1.5 sm:p-2.5 shadow-2xs">
              <Image
                src={coverUrl}
                alt={article.title}
                width={1200}
                height={800}
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="w-auto h-auto max-h-[580px] max-w-full rounded-xl object-contain mx-auto shadow-xs"
              />
            </div>

            {/* Teks Isi Konten Artikel */}
            <div
              className={`prose-content max-w-none text-[#1E293B] transition-all ${proseFontSizeClass}`}
              dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content) }}
            />

            {/* Penulis / Dokumentasi */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Penulis: {article.author || 'Humas SMPN 5 Cibeber'}</span>
              <span>Arsip Publikasi Resmi</span>
            </div>

            {/* Bar Bagikan */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <ShareNetwork size={15} weight="bold" className="text-[#1E5631]" />
                <span>Bagikan Artikel:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke WhatsApp"
                  className="w-9 h-9 rounded-lg bg-[#25D366] hover:opacity-90 text-white flex items-center justify-center transition-all"
                >
                  <WhatsappLogo size={18} weight="fill" />
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke Facebook"
                  className="w-9 h-9 rounded-lg bg-[#1877F2] hover:opacity-90 text-white flex items-center justify-center transition-all"
                >
                  <FacebookLogo size={18} weight="fill" />
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke X"
                  className="w-9 h-9 rounded-lg bg-[#0F1419] hover:opacity-90 text-white flex items-center justify-center transition-all"
                >
                  <TwitterLogo size={18} weight="fill" />
                </a>

                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke Telegram"
                  className="w-9 h-9 rounded-lg bg-[#229ED9] hover:opacity-90 text-white flex items-center justify-center transition-all"
                >
                  <TelegramLogo size={18} weight="fill" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Salin Tautan"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} weight="bold" className="text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Tautan Disalin</span>
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

            {/* Rekomendasi Warta Terkait */}
            {relatedArticles.length > 0 && (
              <div className="pt-8 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Warta &amp; Liputan Terkait
                  </h3>
                  <Link
                    href="/berita"
                    className="text-xs font-bold text-[#1E5631] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Indeks Berita</span>
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
                        className="group p-3 rounded-xl border border-slate-200/80 hover:border-[#1E5631]/40 transition-all flex items-center gap-3 bg-slate-50/50"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                          <Image
                            src={relCover}
                            alt={rel.title}
                            fill
                            sizes="70px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors line-clamp-2 leading-snug">
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
