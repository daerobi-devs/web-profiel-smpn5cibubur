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

// Helper visual & metadata kontekstual sekolah
function getAchievementMeta(item: AchievementItem) {
  const combined = `${item.title} ${item.description ?? ''}`.toLowerCase();

  let category = 'Prestasi Siswa';
  let fallbackImage = '/assets/prestasi-siswa-smpn5cibeber.jpg';
  let rankLabel = 'Kejuaraan Resmi';

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
    category = 'Kepramukaan & Karakter';
    fallbackImage = '/assets/gedung-smpn5cibeber.jpg';
  } else if (combined.includes('adiwiyata') || combined.includes('lingkungan') || combined.includes('kebersihan')) {
    category = 'Lingkungan Hidup & Adiwiyata';
    fallbackImage = '/assets/gedung-smpn5cibeber.jpg';
  } else if (
    combined.includes('ilmiah') ||
    combined.includes('matematika') ||
    combined.includes('sains') ||
    combined.includes('lcc') ||
    combined.includes('cerdas cermat') ||
    combined.includes('olimpiade')
  ) {
    category = 'Akademik & Riset Siswa';
    fallbackImage = '/assets/dewan-guru-smpn5cibeber.jpg';
  } else if (combined.includes('tari') || combined.includes('seni') || combined.includes('vokal') || combined.includes('musik')) {
    category = 'Seni & Budaya Pelajar';
    fallbackImage = '/assets/prestasi-siswa-smpn5cibeber.jpg';
  }

  // Label rank piala
  if (combined.includes('juara 1') || combined.includes('juara pertama') || combined.includes('emas')) {
    rankLabel = 'Juara 1 (Emas)';
  } else if (combined.includes('juara 2') || combined.includes('juara kedua') || combined.includes('perak')) {
    rankLabel = 'Juara 2 (Perak)';
  } else if (combined.includes('juara 3') || combined.includes('juara ketiga') || combined.includes('perunggu')) {
    rankLabel = 'Juara 3 (Perunggu)';
  } else if (combined.includes('adiwiyata') || combined.includes('penghargaan')) {
    rankLabel = 'Penghargaan Resmi';
  } else if (combined.includes('harapan')) {
    rankLabel = 'Juara Harapan';
  }

  const levelLabel =
    item.level === 'KOTA'
      ? 'Tingkat Kab/Kota'
      : item.level === 'PROVINSI'
      ? 'Tingkat Provinsi'
      : item.level === 'KECAMATAN'
      ? 'Tingkat Kecamatan'
      : `Tingkat ${item.level}`;

  return {
    category,
    image: item.imageUrl || fallbackImage,
    rankLabel,
    levelLabel,
  };
}

// Helper untuk mengekstrak seluruh foto dokumentasi suatu prestasi
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

// =============================================================================
// SUB-KOMPONEN: FEATURED ACHIEVEMENT CARD (DENGAN LIVE ROTATING IMAGE)
// =============================================================================
function FeaturedAchievementCard({
  item,
  onOpenLightbox,
  onShare,
}: {
  item: AchievementItem;
  onOpenLightbox: (item: AchievementItem, photoIndex: number) => void;
  onShare: (item: AchievementItem) => void;
}) {
  const meta = getAchievementMeta(item);
  const photos = getAchievementPhotos(item);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate live image tiap 3.6 detik jika foto >= 2 dan tidak sedang di-hover
  useEffect(() => {
    if (photos.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [photos.length, isHovered]);

  return (
    <article
      id={item.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-white border border-slate-200/90 rounded-3xl shadow-2xs hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group"
    >
      {/* Visual Cover Feature (Live Rotating Image) */}
      <div
        onClick={() => onOpenLightbox(item, activePhotoIndex)}
        className="relative lg:col-span-5 min-h-[240px] sm:min-h-[300px] lg:min-h-[360px] bg-slate-900 overflow-hidden cursor-pointer"
        title="Klik untuk membuka galeri foto dokumentasi"
      >
        {photos.map((src, idx) => (
          <Image
            key={`${src}-${idx}`}
            src={src}
            alt={`${item.title} - Foto ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="(max-width: 1024px) 100vw, 42vw"
            className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${
              idx === activePhotoIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          />
        ))}
        {/* Info Tahun & Tingkat di Bawah */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
            {meta.levelLabel} • Tahun {item.year}
          </span>
          <span className="text-[11px] text-amber-300 font-semibold group-hover:underline flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-xs">
            <span>Buka Foto</span>
            <CaretRight size={12} weight="bold" />
          </span>
        </div>
      </div>

      {/* Konten Terbaca Langsung */}
      <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800">
              {meta.category}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#1E5631] border border-emerald-100">
              {meta.levelLabel}
            </span>
          </div>

          <h2
            onClick={() => onOpenLightbox(item, activePhotoIndex)}
            className="text-2xl sm:text-3xl font-serif-academic font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug cursor-pointer"
          >
            {item.title}
          </h2>

          {/* Uraian Lengkap */}
          <div className="text-sm text-slate-600 leading-relaxed space-y-2.5">
            {item.description ? (
              item.description.split(/\r?\n/).map((par, idx) => (
                <p key={idx} className="text-slate-600 leading-relaxed">
                  {par}
                </p>
              ))
            ) : (
              <p className="text-slate-600 leading-relaxed">
                Raihan prestasi membanggakan yang diraih oleh siswa-siswi SMPN 5 Cibeber melalui dedikasi belajar, sportivitas, dan bimbingan terarah dewan guru.
              </p>
            )}
          </div>

          {/* Thumbnail Strip Koleksi Foto (Jika > 1 Foto) */}
          {photos.length > 1 && (
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Koleksi Piagam &amp; Dokumentasi ({photos.length} Foto):
              </p>
              <div className="flex flex-wrap gap-2">
                {photos.map((pUrl, pIdx) => {
                  const isActive = pIdx === activePhotoIndex;
                  return (
                    <button
                      key={`${pUrl}-${pIdx}`}
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          onOpenLightbox(item, pIdx);
                        } else {
                          setActivePhotoIndex(pIdx);
                        }
                      }}
                      className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden border-2 transition-all shadow-2xs group/thumb cursor-pointer ${
                        isActive
                          ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                          : 'border-slate-200 hover:border-[#1E5631] opacity-75 hover:opacity-100'
                      }`}
                      title={isActive ? `Buka foto ${pIdx + 1} layar penuh` : `Tampilkan foto ${pIdx + 1}`}
                    >
                      <Image
                        src={pUrl}
                        alt={`Foto ${pIdx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-transparent transition-colors" />
                      <span
                        className={`absolute bottom-1 right-1 text-[9px] font-bold px-1 rounded ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 font-extrabold'
                            : 'bg-black/70 text-white'
                        }`}
                      >
                        #{pIdx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bar Informasi & Validasi Sederhana */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs">
          <div className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
            <CheckCircle size={15} weight="fill" className="text-emerald-600" />
            <span>Dokumentasi Resmi Sekolah • {item.year}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLightbox(item, activePhotoIndex)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-[#1E5631] text-[#1E5631] hover:text-white text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Images size={14} weight="bold" />
              <span>Lihat Semua Foto ({photos.length})</span>
            </button>

            <button
              onClick={() => onShare(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              title="Bagikan kabar prestasi ini"
            >
              <ShareNetwork size={15} />
              <span>Bagikan</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// =============================================================================
// SUB-KOMPONEN: GRID CARD PRESTASI (DENGAN LIVE ROTATING IMAGE)
// =============================================================================
function AchievementGridCard({
  item,
  index,
  onOpenLightbox,
}: {
  item: AchievementItem;
  index: number;
  onOpenLightbox: (item: AchievementItem, photoIndex: number) => void;
}) {
  const meta = getAchievementMeta(item);
  const photos = getAchievementPhotos(item);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate live image dengan timing berjenjang (3.2s, 3.8s, 4.4s) agar organik
  useEffect(() => {
    if (photos.length <= 1 || isHovered) return;
    const interval = 3200 + ((index % 3) * 600);
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % photos.length);
    }, interval);
    return () => clearInterval(timer);
  }, [photos.length, isHovered, index]);

  return (
    <article
      id={item.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Thumbnail Foto Sinematik (Live Rotating Image) */}
        <div
          onClick={() => onOpenLightbox(item, activePhotoIndex)}
          className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden cursor-pointer"
          title="Klik untuk melihat foto dokumentasi layar penuh"
        >
          {photos.map((src, idx) => (
            <Image
              key={`${src}-${idx}`}
              src={src}
              alt={`${item.title} - Foto ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${
                idx === activePhotoIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            />
          ))}
          {/* Badge Tahun & Tingkat */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
              {item.year} • {meta.levelLabel}
            </span>
          </div>
        </div>

        {/* Konten Kartu */}
        <div className="p-5 space-y-3">
          <div className="space-y-1.5">
            <h4
              onClick={() => onOpenLightbox(item, activePhotoIndex)}
              className="text-base font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug cursor-pointer"
            >
              {item.title}
            </h4>

            <div className="text-xs text-slate-600 leading-relaxed line-clamp-3">
              {item.description ? (
                <p>{item.description}</p>
              ) : (
                <p className="text-slate-400 italic">
                  Prestasi resmi yang diraih dalam kejuaraan {meta.levelLabel.toLowerCase()}.
                </p>
              )}
            </div>
          </div>

          {/* Mini Thumbnail Strip (Jika > 1 Foto) */}
          {photos.length > 1 && (
            <div className="pt-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Dokumentasi ({photos.length} Foto):
              </p>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {photos.map((pUrl, pIdx) => {
                  const isActive = pIdx === activePhotoIndex;
                  return (
                    <button
                      key={`${pUrl}-${pIdx}`}
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          onOpenLightbox(item, pIdx);
                        } else {
                          setActivePhotoIndex(pIdx);
                        }
                      }}
                      className={`relative h-9 w-12 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                          : 'border-slate-200 hover:border-[#1E5631] opacity-70 hover:opacity-100'
                      }`}
                      title={isActive ? `Buka foto ${pIdx + 1} layar penuh` : `Tampilkan foto ${pIdx + 1}`}
                    >
                      <Image
                        src={pUrl}
                        alt={`Mini ${pIdx + 1}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                      {isActive && (
                        <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Card Bersih */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
        <span className="text-slate-400 font-medium">
          SMPN 5 Cibeber • {item.year}
        </span>

        <button
          onClick={() => onOpenLightbox(item, activePhotoIndex)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-[#1E5631] text-[#1E5631] hover:text-white font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
        >
          <Images size={12} weight="bold" />
          <span>{photos.length > 1 ? `${photos.length} Foto` : 'Lihat'}</span>
        </button>
      </div>
    </article>
  );
}

export default function PrestasiArticleList({
  achievements,
  years,
}: PrestasiArticleListProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Lightbox Modal State
  const [lightboxData, setLightboxData] = useState<{
    item: AchievementItem;
    photoIndex: number;
  } | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Filter Prestasi
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

  // Sorotan Utama (Headline Feature)
  const featuredItem = useMemo(() => {
    if (filteredAchievements.length === 0) return null;
    const provinsiItem = filteredAchievements.find((item) => item.level === 'PROVINSI');
    return provinsiItem || filteredAchievements[0];
  }, [filteredAchievements]);

  // Sisa item untuk grid kartu
  const remainingArticles = useMemo(() => {
    if (!featuredItem) return [];
    return filteredAchievements.filter((item) => item.id !== featuredItem.id);
  }, [filteredAchievements, featuredItem]);

  const handleShare = (item: AchievementItem) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/prestasi#${item.id}`;
      navigator.clipboard.writeText(
        `Prestasi Siswa SMPN 5 Cibeber: ${item.title} (${item.year}) - Info: ${shareUrl}`
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

  // Lightbox Controls
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

  // Keyboard Navigation for Lightbox & Body Scroll Lock
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
    <div className="space-y-10">
      {/* Toast Notifikasi Salin Tautan */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1E5631] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-emerald-600 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle size={18} weight="fill" className="text-amber-300" />
          <span>Tautan prestasi berhasil disalin ke clipboard!</span>
        </div>
      )}

      {/* Kontrol & Filter Toolbar Bersih */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          {/* Kolom Pencarian */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari prestasi, kejuaraan, atau cabang lomba..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5631]/20 focus:border-[#1E5631] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label="Hapus pencarian"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          {/* Filter Dropdown Tahun & Counter */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar size={14} className="text-slate-400" />
              <span>Tahun:</span>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#1E5631] transition-all cursor-pointer"
            >
              <option value="ALL">Semua Tahun</option>
              {years.map((y) => (
                <option key={y} value={y.toString()}>
                  Tahun {y}
                </option>
              ))}
            </select>

            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-[#1E5631] border border-emerald-100">
              {filteredAchievements.length} Penghargaan
            </span>
          </div>
        </div>

        {/* Tab Pill Tingkat Kejuaraan */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 mr-1 font-medium">
            <Funnel size={14} />
            <span>Tingkat:</span>
          </span>
          {[
            { id: 'ALL', label: 'Semua Tingkat' },
            { id: 'PROVINSI', label: 'Tingkat Provinsi' },
            { id: 'KOTA', label: 'Tingkat Kab/Kota' },
            { id: 'KECAMATAN', label: 'Tingkat Kecamatan' },
          ].map((tab) => {
            const isActive = selectedLevel === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E5631] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Jika Hasil Pencarian / Filter Kosong */}
      {filteredAchievements.length === 0 ? (
        <div className="p-12 text-center space-y-3 bg-white border border-slate-200 rounded-2xl shadow-2xs">
          <Trophy size={44} className="text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">Tidak ada arsip prestasi yang cocok</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Coba sesuaikan kata kunci pencarian atau ganti filter tingkat dan tahun untuk menemukan dokumentasi prestasi siswa.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E5631] text-white text-xs font-bold hover:bg-[#1E5631]/90 transition-all cursor-pointer"
          >
            <span>Reset Semua Filter</span>
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* ========================================================================= */}
          {/* 1. SOROTAN PRESTASI UTAMA (FEATURED SHOWCASE - LANGSUNG TERBACA UTUH)     */}
          {/* ========================================================================= */}
          {/* ========================================================================= */}
          {/* 1. SOROTAN PRESTASI UTAMA (FEATURED SHOWCASE DENGAN LIVE IMAGE)           */}
          {/* ========================================================================= */}
          {featuredItem && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1E5631]">
                <Trophy size={16} weight="duotone" className="text-amber-500" />
                <span>Sorotan Prestasi Utama</span>
              </div>
              <FeaturedAchievementCard
                item={featuredItem}
                onOpenLightbox={openLightbox}
                onShare={handleShare}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. KATALOG PRESTASI SISWA (GRID KARTU DENGAN LIVE ROTATING IMAGE)          */}
          {/* ========================================================================= */}
          {remainingArticles.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/90 pb-3">
                <div className="flex items-center gap-2">
                  <Trophy size={18} weight="duotone" className="text-[#1E5631]" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Galeri Rekam Jejak Prestasi
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {remainingArticles.length} penghargaan
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingArticles.map((item, idx) => (
                  <AchievementGridCard
                    key={item.id}
                    item={item}
                    index={idx}
                    onOpenLightbox={openLightbox}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LIGHTBOX MODAL FULLSCREEN UNTUK KOLEKSI FOTO PRESTASI                  */}
      {/* ========================================================================= */}
      {lightboxData && (() => {
        const { item, photoIndex } = lightboxData;
        const photos = getAchievementPhotos(item);
        const currentPhoto = photos[photoIndex] || photos[0];
        const meta = getAchievementMeta(item);

        return (
          <div
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 text-white animate-in fade-in duration-200"
            onClick={closeLightbox}
          >
            {/* Header Lightbox */}
            <div
              className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 max-w-6xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    {meta.rankLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    {meta.levelLabel}
                  </span>
                  <span className="text-slate-400 font-medium">Tahun {item.year}</span>
                </div>
                <h3 className="font-serif-academic text-base sm:text-xl font-bold text-white line-clamp-1">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/15">
                  Foto {photoIndex + 1} dari {photos.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  aria-label="Tutup galeri"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>
            </div>

            {/* Central High-Res Photo Stage */}
            <div
              className="relative flex-1 flex items-center justify-center my-3 min-h-0 max-w-6xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStartX === null) return;
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                if (diff > 50) nextPhoto();
                else if (diff < -50) prevPhoto();
                setTouchStartX(null);
              }}
            >
              {photos.length > 1 && (
                <button
                  onClick={prevPhoto}
                  className="absolute left-1 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
                  aria-label="Foto sebelumnya"
                >
                  <CaretLeft size={22} weight="bold" />
                </button>
              )}

              <div className="relative w-full h-full max-h-[66vh] flex items-center justify-center">
                <Image
                  src={currentPhoto}
                  alt={`${item.title} - Foto ${photoIndex + 1}`}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-contain"
                  priority
                />
              </div>

              {photos.length > 1 && (
                <button
                  onClick={nextPhoto}
                  className="absolute right-1 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
                  aria-label="Foto berikutnya"
                >
                  <CaretRight size={22} weight="bold" />
                </button>
              )}
            </div>

            {/* Bottom Bar: Thumbnails & Description */}
            <div
              className="pt-3 border-t border-white/10 space-y-2.5 max-w-4xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Thumbnail Strip */}
              {photos.length > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                  {photos.map((pUrl, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setLightboxData({ item, photoIndex: pIdx })}
                      className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        pIdx === photoIndex
                          ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={pUrl}
                        alt={`Thumbnail ${pIdx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              {item.description && (
                <p className="text-xs text-slate-300 text-center max-w-2xl mx-auto line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
