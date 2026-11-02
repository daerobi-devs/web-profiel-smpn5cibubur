'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MagnifyingGlass,
  X,
  ArrowRight,
  Play,
} from '@phosphor-icons/react';
import { EkskulItem, ekskulCategories, ekskulCategoryLabels } from '@/lib/ekskul-data';

type EkskulListProps = {
  items: EkskulItem[];
  schoolWhatsapp?: string;
};

export default function EkskulList({ items }: EkskulListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== 'SEMUA' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCoach = item.coach.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCoach) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter */}
      <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-3">
        <div className="relative max-w-md">
          <MagnifyingGlass
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama ekstrakurikuler atau guru pembina..."
            className="w-full pl-9 pr-9 py-2 rounded-lg bg-[#F8FAFC] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E5631] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              aria-label="Hapus kata kunci pencarian"
            >
              <X size={14} weight="bold" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          {ekskulCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const label = ekskulCategoryLabels[cat] || cat;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E5631] text-white'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-xl space-y-2.5">
          <MagnifyingGlass size={28} className="text-slate-300 mx-auto" />
          <h2 className="text-sm font-bold text-slate-700">
            Ekstrakurikuler Tidak Ditemukan
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tidak ada kegiatan yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('SEMUA');
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Tampilkan Semua
          </button>
        </div>
      )}

      {/* Grid Kartu Ekstrakurikuler (Serasi dengan Beranda: Tanpa Quote Puitis & Tanpa Pill Kategori di Atas Foto) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const hasVideo = Boolean(item.videoUrl || item.video_url);

          return (
            <Link
              key={item.id}
              href={`/ekstrakurikuler/${item.slug}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200/90 hover:border-slate-300 transition-colors duration-200"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-200/70">
                <Image
                  src={item.coverImage}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />

                {hasVideo && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/75 text-[10px] font-semibold text-white">
                      <Play size={10} weight="fill" className="text-amber-300" />
                      <span>Video</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1.5">
                    <span className="text-[#1E5631] font-bold uppercase tracking-wider">
                      {item.categoryLabel || item.category}
                    </span>
                    <span>&middot;</span>
                    <span className="truncate">{item.schedule}</span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug">
                    {item.name}
                  </h2>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 truncate">
                    Pembina: <strong className="font-semibold text-slate-700">{item.coach}</strong>
                  </span>
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="text-slate-400 group-hover:text-[#1E5631] group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
