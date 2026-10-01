'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlass,
  CaretRight,
  InstagramLogo,
  Tag,
  CalendarBlank,
  ArrowRight,
  FolderSimple,
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
        <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-serif-academic font-bold text-base text-[#1E5631] tracking-tight">
            Pencarian Berita
          </h3>
          <span className="w-8 h-1 bg-[#D97706] rounded-full" />
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
            className="w-full pl-3.5 pr-12 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E5631]/20 focus:border-[#1E5631] transition-all"
          />
          <button
            type="submit"
            aria-label="Cari Berita"
            className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <MagnifyingGlass size={15} weight="bold" />
          </button>
        </form>
      </div>

      {/* =========================================================
          WIDGET 2: KATEGORI DENGAN JUMLAH ARTIKEL
          ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-serif-academic font-bold text-base text-[#1E5631] tracking-tight">
            Kategori
          </h3>
          <span className="w-8 h-1 bg-[#D97706] rounded-full" />
        </div>

        <ul className="divide-y divide-slate-100 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <li key={cat.name}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`w-full py-2.5 px-1.5 flex items-center justify-between rounded-lg transition-colors text-left group cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-[#1E5631] font-bold'
                      : 'text-slate-700 hover:text-[#1E5631] hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate pr-2">
                    <CaretRight
                      size={13}
                      weight="bold"
                      className={`shrink-0 transition-transform ${
                        isSelected
                          ? 'text-[#D97706] translate-x-0.5'
                          : 'text-slate-400 group-hover:text-[#D97706] group-hover:translate-x-0.5'
                      }`}
                    />
                    <span className="truncate">{cat.name}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums shrink-0 ${
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
          WIDGET 3: TAGS POPULER
          ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-serif-academic font-bold text-base text-[#1E5631] tracking-tight">
            Tags Populer
          </h3>
          <span className="w-8 h-1 bg-[#D97706] rounded-full" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {DEFAULT_POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#1E5631] hover:text-white text-slate-600 text-[11px] font-medium transition-all active:scale-95 cursor-pointer border border-slate-200/60"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          WIDGET 4: INSTAGRAM UTAMA (KANAL RESMI SEKOLAH)
          ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-center space-y-3">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between text-left">
          <h3 className="font-serif-academic font-bold text-base text-[#1E5631] tracking-tight flex items-center gap-2">
            <InstagramLogo size={18} weight="fill" className="text-pink-600" />
            <span>Instagram Utama</span>
          </h3>
          <span className="w-8 h-1 bg-[#D97706] rounded-full" />
        </div>

        <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2.5">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <InstagramLogo size={24} weight="bold" />
          </div>

          <div>
            <p className="font-bold text-slate-900 text-xs sm:text-sm">
              @smpn5cibeber_official
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Ikuti galeri aktivitas instan &amp; kabar terkini di Instagram
            </p>
          </div>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#e1306c] to-[#fd1d1d] hover:opacity-95 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <span>Ikuti Kami</span>
          </a>
        </div>
      </div>

      {/* =========================================================
          WIDGET 5: AGENDA SEKOLAH TERDEKAT (PELENGKAP)
          ========================================================= */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E5631] to-[#164325] text-white shadow-md space-y-3">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <CalendarBlank size={15} weight="bold" />
          <span>Kalender Pendidikan</span>
        </div>
        <h4 className="font-serif-academic font-bold text-base text-white leading-snug">
          Jadwal Kegiatan &amp; Agenda Resmi Sekolah
        </h4>
        <p className="text-xs text-emerald-100/80 leading-relaxed">
          Pantau seluruh agenda ujian, MPLS, porseni, dan peringatan hari besar di SMPN 5 Cibeber.
        </p>
        <Link
          href="/agenda"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white pt-1 group"
        >
          <span>Lihat Agenda Lengkap</span>
          <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
