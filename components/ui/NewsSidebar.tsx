'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlass,
  CaretRight,
  InstagramLogo,
  CalendarBlank,
  ArrowRight,
  ArrowUpRight,
} from '@phosphor-icons/react';

export interface CategoryCountItem {
  name: string;
  count: number;
}

interface NewsSidebarProps {
  categories?: CategoryCountItem[];
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  isDetailPage?: boolean;
}

const DEFAULT_POPULAR_TAGS = [
  'PPDB 2026',
  'Prestasi Siswa',
  'Adiwiyata',
  'Pramuka',
  'Kurikulum Merdeka',
  'OSIS',
  'Dewan Guru',
  'Marching Band',
  'Karya Inovasi',
];

export default function NewsSidebar({
  categories = [],
  selectedCategory = 'SEMUA',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  isDetailPage = false,
}: NewsSidebarProps) {
  const router = useRouter();
  const [localSearch, setLocalSearch] = React.useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDetailPage) {
      if (localSearch.trim()) {
        router.push(`/berita?q=${encodeURIComponent(localSearch.trim())}`);
      } else {
        router.push('/berita');
      }
    } else if (onSearchChange) {
      onSearchChange(localSearch);
    }
  };

  const handleCategoryClick = (catName: string) => {
    if (isDetailPage) {
      router.push(`/berita?kategori=${encodeURIComponent(catName)}`);
    } else if (onSelectCategory) {
      onSelectCategory(catName);
    }
  };

  const handleTagClick = (tag: string) => {
    if (isDetailPage) {
      router.push(`/berita?q=${encodeURIComponent(tag)}`);
    } else if (onSearchChange) {
      setLocalSearch(tag);
      onSearchChange(tag);
    }
  };

  return (
    <aside className="space-y-6">
      {/* =========================================================
          WIDGET 1: PENCARIAN BERITA
          ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="pb-3 mb-4 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Pencarian Berita
          </h3>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            value={isDetailPage ? localSearch : searchQuery}
            onChange={(e) => {
              if (isDetailPage) {
                setLocalSearch(e.target.value);
              } else if (onSearchChange) {
                onSearchChange(e.target.value);
              }
            }}
            placeholder="Masukkan kata kunci..."
            className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E5631]/20 focus:border-[#1E5631] transition-all"
          />
          <button
            type="submit"
            aria-label="Cari Berita"
            className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-[#1E5631] hover:bg-[#164325] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <MagnifyingGlass size={14} weight="bold" />
          </button>
        </form>
      </div>

      {/* =========================================================
          WIDGET 2: KATEGORI DENGAN JUMLAH ARTIKEL
          ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="pb-3 mb-3 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Indeks Kategori
          </h3>
        </div>

        <ul className="divide-y divide-slate-100 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <li key={cat.name}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`w-full py-2.5 px-2 flex items-center justify-between rounded-lg transition-colors text-left group cursor-pointer ${
                    isSelected
                      ? 'bg-[#eaf4ed] text-[#1E5631] font-bold'
                      : 'text-slate-700 hover:text-[#1E5631] hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate pr-2">
                    <CaretRight
                      size={12}
                      weight="bold"
                      className={`shrink-0 transition-transform ${
                        isSelected
                          ? 'text-[#1E5631] translate-x-0.5'
                          : 'text-slate-400 group-hover:text-[#1E5631] group-hover:translate-x-0.5'
                      }`}
                    />
                    <span className="truncate">{cat.name}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold tabular-nums shrink-0 ${
                      isSelected
                        ? 'bg-[#1E5631] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* =========================================================
          WIDGET 3: TOPIK POPULER
          ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="pb-3 mb-3.5 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Topik Pencarian
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {DEFAULT_POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-[#1E5631] hover:text-white text-slate-600 text-[11px] font-medium transition-all cursor-pointer border border-slate-200/80"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          WIDGET 4: KANAL INSTAGRAM RESMI
          ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Media Sosial Resmi
          </h3>
          <InstagramLogo size={16} weight="bold" className="text-slate-500" />
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-bold text-slate-900 text-sm">
              @smpn5cibeber
            </p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Dokumentasi kegiatan harian dan pengumuman singkat SMP Negeri 5 Cibeber di Instagram.
            </p>
          </div>

          <a
            href="https://instagram.com/smpn5cibeber"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-[#1E5631] text-white text-xs font-bold transition-colors"
          >
            <span>Kunjungi @smpn5cibeber</span>
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      </div>

      {/* =========================================================
          WIDGET 5: KALENDER PENDIDIKAN
          ========================================================= */}
      <div className="p-5 rounded-2xl bg-[#1E5631] text-white space-y-2.5">
        <div className="flex items-center gap-2 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
          <CalendarBlank size={14} weight="bold" />
          <span>Kalender Akademik</span>
        </div>
        <h4 className="font-bold text-sm sm:text-base text-white leading-snug">
          Jadwal Kegiatan &amp; Agenda Sekolah
        </h4>
        <p className="text-xs text-emerald-100/85 leading-relaxed">
          Pantau jadwal asesmen kurikulum, MPLS, rapat wali murid, dan kegiatan kesiswaan.
        </p>
        <Link
          href="/agenda"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white pt-1 group"
        >
          <span>Lihat Agenda Sekolah</span>
          <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
