'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Trophy,
  Calendar,
  Funnel,
  MagnifyingGlass,
  Sparkle,
  ShareNetwork,
  X,
  CheckCircle,
  Medal,
} from '@phosphor-icons/react';

export interface AchievementItem {
  id: string;
  title: string;
  description: string | null;
  level: string;
  year: number;
  imageUrl: string | null;
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

export default function PrestasiArticleList({
  achievements,
  years,
}: PrestasiArticleListProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

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
        `🏆 Prestasi Siswa SMPN 5 Cibeber: ${item.title} (${item.year}) - Info: ${shareUrl}`
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
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-3.5">
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

          {/* Filter Dropdown Tahun & Penghitung Hasil */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar size={15} className="text-[#1E5631]" />
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
                    ? 'bg-[#1E5631] text-white shadow-sm'
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
        <div className="p-12 text-center space-y-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
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
          {featuredItem && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1E5631]">
                <Sparkle size={15} weight="fill" className="text-amber-500" />
                <span>Sorotan Prestasi Utama</span>
              </div>

              {(() => {
                const meta = getAchievementMeta(featuredItem);
                return (
                  <article
                    id={featuredItem.id}
                    className="relative overflow-hidden bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group"
                  >
                    {/* Visual Cover Feature */}
                    <div className="relative lg:col-span-5 min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] bg-slate-900 overflow-hidden">
                      <Image
                        src={meta.image}
                        alt={featuredItem.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Pill Status Bersih di Foto */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
                          {meta.rankLabel}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                        <span className="text-xs text-slate-300 font-medium">
                          {meta.levelLabel} • Tahun {featuredItem.year}
                        </span>
                      </div>
                    </div>

                    {/* Konten Terbaca Langsung (Direct Read - Tanpa Pop-up) */}
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

                        <h2 className="text-2xl sm:text-3xl font-serif-academic font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug">
                          {featuredItem.title}
                        </h2>

                        {/* Uraian Lengkap Langsung Terbaca Elegan */}
                        <div className="text-sm text-slate-600 leading-relaxed space-y-2.5">
                          {featuredItem.description ? (
                            featuredItem.description.split(/\r?\n/).map((par, idx) => (
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
                      </div>

                      {/* Bar Informasi & Validasi Sederhana */}
                      <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100 text-xs">
                        <div className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                          <CheckCircle size={15} weight="fill" className="text-emerald-600" />
                          <span>Dokumentasi Resmi Sekolah • {featuredItem.year}</span>
                        </div>

                        <button
                          onClick={() => handleShare(featuredItem)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
                          title="Bagikan kabar prestasi ini"
                        >
                          <ShareNetwork size={15} />
                          <span>Bagikan</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })()}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. KATALOG PRESTASI SISWA (GRID KARTU ELEGAN - LANGSUNG TERBACA)           */}
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
                {remainingArticles.map((item) => {
                  const meta = getAchievementMeta(item);
                  return (
                    <article
                      key={item.id}
                      id={item.id}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col group"
                    >
                      {/* Thumbnail Foto Sinematik */}
                      <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                        <Image
                          src={meta.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                        {/* Badge Tahun & Tingkat */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                            {item.year} • {meta.levelLabel}
                          </span>
                        </div>

                        {/* Rank di Bawah Foto */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                          <span className="text-xs font-bold text-amber-300 drop-shadow-xs flex items-center gap-1">
                            <Medal size={14} weight="fill" className="text-amber-400" />
                            <span>{meta.rankLabel}</span>
                          </span>
                          <span className="text-[10px] text-slate-300 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                            {meta.category}
                          </span>
                        </div>
                      </div>

                      {/* Konten Kartu - Langsung Terbaca Tanpa Perlu Klik Pop-up */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug">
                            {item.title}
                          </h4>

                          <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
                            {item.description ? (
                              item.description.split(/\r?\n/).map((par, idx) => (
                                <p key={idx} className="text-slate-600 leading-relaxed">
                                  {par}
                                </p>
                              ))
                            ) : (
                              <p className="text-slate-400 italic">
                                Prestasi resmi yang diraih dalam kejuaraan {meta.levelLabel.toLowerCase()}.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Footer Card Bersih */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-400">
                          <span className="font-medium text-emerald-800">
                            SMPN 5 Cibeber
                          </span>
                          <span>Tahun {item.year}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
