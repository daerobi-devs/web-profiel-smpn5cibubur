'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Trophy,
  Calendar,
  Funnel,
  MagnifyingGlass,
  ShareNetwork,
  X,
  CheckCircle,
  Images,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';

export interface AchievementItem {
  id: string;
  title: string;
  description: string | null;
  level: string;
  year: number;
  imageUrl: string | null;
  galleryImages?: string[] | null;
  createdAt?: Date | string;
}

interface PrestasiArticleListProps {
  achievements: AchievementItem[];
  years: number[];
}

function getAchievementMeta(item: AchievementItem) {
  const combined = `${item.title} ${item.description ?? ''}`.toLowerCase();

  let category = 'Prestasi Siswa';
  let fallbackImage = '/assets/prestasi-siswa-smpn5cibeber.jpg';

  if (combined.includes('futsal') || combined.includes('sepak') || combined.includes('bola')) {
    category = 'Olahraga Futsal';
    fallbackImage = '/assets/lapangan-smpn5cibeber.jpg';
  } else if (
    combined.includes('voli') ||
    combined.includes('badminton') ||
    combined.includes('atlet') ||
    combined.includes('popda') ||
    combined.includes('catur')
  ) {
    category = 'Olahraga & POPDA';
    fallbackImage = '/assets/lapangan-smpn5cibeber.jpg';
  } else if (combined.includes('pramuka') || combined.includes('jambore') || combined.includes('paskibra')) {
    category = 'Kepanduan & Baris-Berbaris';
    fallbackImage = '/assets/gedung-smpn5cibeber.jpg';
  } else if (combined.includes('adiwiyata') || combined.includes('lingkungan') || combined.includes('kebersihan')) {
    category = 'Lingkungan Sekolah';
    fallbackImage = '/assets/gedung-smpn5cibeber.jpg';
  } else if (
    combined.includes('ilmiah') ||
    combined.includes('matematika') ||
    combined.includes('sains') ||
    combined.includes('lcc') ||
    combined.includes('cerdas cermat') ||
    combined.includes('olimpiade')
  ) {
    category = 'Bidang Akademik';
    fallbackImage = '/assets/dewan-guru-smpn5cibeber.jpg';
  } else if (combined.includes('tari') || combined.includes('seni') || combined.includes('vokal') || combined.includes('musik')) {
    category = 'Seni & Budaya';
    fallbackImage = '/assets/prestasi-siswa-smpn5cibeber.jpg';
  }

  const levelLabel =
    item.level === 'KOTA'
      ? 'Tingkat Kabupaten'
      : item.level === 'PROVINSI'
      ? 'Tingkat Provinsi'
      : item.level === 'KECAMATAN'
      ? 'Tingkat Kecamatan'
      : `Tingkat ${item.level}`;

  return {
    category,
    image: item.imageUrl || fallbackImage,
    levelLabel,
  };
}

function getAchievementPhotos(item: AchievementItem): string[] {
  let list: string[] = [];
  if (Array.isArray(item.galleryImages) && item.galleryImages.length > 0) {
    list = item.galleryImages.filter(Boolean);
  } else if (typeof item.galleryImages === 'string') {
    try {
      const parsed = JSON.parse(item.galleryImages);
      if (Array.isArray(parsed)) list = parsed.filter(Boolean);
    } catch {
      // fallback
    }
  }

  if (list.length === 0 && item.imageUrl) {
    list = [item.imageUrl];
  }

  if (list.length === 0) {
    list = ['/assets/prestasi-siswa-smpn5cibeber.jpg'];
  }

  return list;
}

export default function PrestasiArticleList({
  achievements,
  years,
}: PrestasiArticleListProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const [lightboxData, setLightboxData] = useState<{
    item: AchievementItem;
    photoIndex: number;
  } | null>(null);

  // Deteksi hash URL (#id) ketika diklik dari kotak Prestasi di Beranda
  useEffect(() => {
    const syncFromHash = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) return;
      setHighlightedId(hash);
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const filteredAchievements = useMemo(() => {
    return achievements.filter((item) => {
      const matchLevel = selectedLevel === 'ALL' || item.level === selectedLevel;
      const matchYear = selectedYear === 'ALL' || item.year.toString() === selectedYear;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.year.toString().includes(q);

      return matchLevel && matchYear && matchSearch;
    });
  }, [achievements, selectedLevel, selectedYear, searchQuery]);

  const handleShare = (item: AchievementItem) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/prestasi#${item.id}`;
      navigator.clipboard.writeText(
        `Prestasi Siswa SMPN 5 Cibeber: ${item.title} (${item.year}) - ${shareUrl}`
      );
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const resetFilters = () => {
    setSelectedLevel('ALL');
    setSelectedYear('ALL');
    setSearchQuery('');
  };

  const openLightbox = (item: AchievementItem, photoIndex: number = 0) => {
    setLightboxData({ item, photoIndex });
  };

  const closeLightbox = useCallback(() => {
    setLightboxData(null);
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxData((prev) => {
      if (!prev) return null;
      const photos = getAchievementPhotos(prev.item);
      return {
        item: prev.item,
        photoIndex: (prev.photoIndex + 1) % photos.length,
      };
    });
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxData((prev) => {
      if (!prev) return null;
      const photos = getAchievementPhotos(prev.item);
      return {
        item: prev.item,
        photoIndex: (prev.photoIndex - 1 + photos.length) % photos.length,
      };
    });
  }, []);

  useEffect(() => {
    if (!lightboxData) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxData, closeLightbox, nextPhoto, prevPhoto]);

  return (
    <div className="space-y-8">
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1E5631] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold">
          <CheckCircle size={16} weight="fill" className="text-amber-300" />
          <span>Tautan berhasil disalin</span>
        </div>
      )}

      {/* Filter & Pencarian */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 space-y-3.5">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama kejuaraan atau bidang lomba..."
              className="w-full pl-9 pr-9 py-2 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1E5631] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label="Hapus pencarian"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar size={14} className="text-slate-400" />
              <span>Tahun:</span>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-[#F8FAFC] border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E5631] cursor-pointer tabular-nums"
            >
              <option value="ALL">Semua Tahun</option>
              {years.map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>

            <span className="text-xs font-mono font-semibold text-slate-500 tabular-nums">
              {filteredAchievements.length} data
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 mr-1 font-medium">
            <Funnel size={13} />
            <span>Tingkat:</span>
          </span>
          {[
            { id: 'ALL', label: 'Semua Tingkat' },
            { id: 'PROVINSI', label: 'Provinsi' },
            { id: 'KOTA', label: 'Kabupaten' },
            { id: 'KECAMATAN', label: 'Kecamatan' },
          ].map((tab) => {
            const isActive = selectedLevel === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E5631] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daftar Prestasi */}
      {filteredAchievements.length === 0 ? (
        <div className="p-12 text-center space-y-3 bg-white border border-slate-200 rounded-xl">
          <Trophy size={36} className="text-slate-300 mx-auto" />
          <h2 className="text-sm font-bold text-slate-700">Tidak ada data prestasi yang sesuai</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Silakan ubah kata kunci pencarian atau pilih tahun dan tingkat kejuaraan lainnya.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E5631] text-white text-xs font-bold hover:bg-[#164325] transition-colors cursor-pointer"
          >
            <span>Tampilkan Semua</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => {
            const meta = getAchievementMeta(item);
            const photos = getAchievementPhotos(item);
            const coverPhoto = photos[0] || meta.image;
            const isHighlighted = highlightedId === item.id;

            return (
              <article
                key={item.id}
                id={item.id}
                className={`scroll-mt-28 bg-white rounded-xl overflow-hidden border transition-all flex flex-col justify-between group ${
                  isHighlighted
                    ? 'border-[#1E5631] ring-2 ring-[#1E5631]/25 shadow-md'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Dokumentasi Foto Statis & Tenang */}
                  <div
                    onClick={() => openLightbox(item, 0)}
                    className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden border-b border-slate-200/70 cursor-pointer"
                  >
                    <Image
                      src={coverPhoto}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  {/* Isi Konten Kartu */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 tabular-nums">
                      <span className="text-[#B45309] font-bold uppercase tracking-wider">
                        {meta.levelLabel}
                      </span>
                      <span>&middot;</span>
                      <span>Tahun {item.year}</span>
                    </div>

                    <h2
                      onClick={() => openLightbox(item, 0)}
                      className="text-base font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug cursor-pointer"
                    >
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 pt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Kartu */}
                <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => openLightbox(item, 0)}
                    className="inline-flex items-center gap-1.5 font-bold text-[#1E5631] hover:text-[#164325] cursor-pointer"
                  >
                    <Images size={14} weight="bold" />
                    <span>
                      {photos.length > 1
                        ? `Lihat Dokumentasi (${photos.length} Foto)`
                        : 'Lihat Foto'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShare(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Salin tautan prestasi"
                    aria-label="Salin tautan prestasi"
                  >
                    <ShareNetwork size={14} weight="bold" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal Dokumentasi */}
      {lightboxData && (() => {
        const { item, photoIndex } = lightboxData;
        const photos = getAchievementPhotos(item);
        const currentPhoto = photos[photoIndex] || photos[0];
        const meta = getAchievementMeta(item);

        return (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 flex flex-col justify-between p-4 sm:p-6 text-white"
            onClick={closeLightbox}
          >
            <div
              className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 max-w-5xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0">
                <p className="text-xs text-amber-300 font-semibold tabular-nums">
                  {meta.levelLabel} &middot; Tahun {item.year}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white truncate mt-0.5">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {photos.length > 1 && (
                  <span className="text-xs font-mono text-slate-300 tabular-nums">
                    {photoIndex + 1} / {photos.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Tutup dokumentasi"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
            </div>

            <div
              className="relative flex-1 flex items-center justify-center my-4 min-h-0 max-w-5xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.length > 1 && (
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-2 sm:left-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer"
                  aria-label="Foto sebelumnya"
                >
                  <CaretLeft size={20} weight="bold" />
                </button>
              )}

              <div className="relative w-full h-full max-h-[70vh]">
                <Image
                  src={currentPhoto}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {photos.length > 1 && (
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-2 sm:right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer"
                  aria-label="Foto berikutnya"
                >
                  <CaretRight size={20} weight="bold" />
                </button>
              )}
            </div>

            {item.description && (
              <div
                className="max-w-3xl mx-auto w-full text-center pt-2 border-t border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
