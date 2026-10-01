'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  MagnifyingGlass,
  X,
  Clock,
  User,
  Trophy,
  ArrowRight,
  Sparkle,
} from '@phosphor-icons/react';
import { EkskulItem, ekskulCategories, ekskulCategoryLabels } from '@/lib/ekskul-data';

type EkskulListProps = {
  items: EkskulItem[];
  schoolWhatsapp?: string;
};

export default function EkskulList({ items, schoolWhatsapp = '6285281459726' }: EkskulListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');

  const cleanWa = schoolWhatsapp.replace(/[^0-9]/g, '');

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
        const matchMotto = item.motto.toLowerCase().includes(q);
        const matchHigh = item.highlights.some((h) => h.toLowerCase().includes(q));
        const matchAch = item.achievements.some((a) => a.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCoach && !matchMotto && !matchHigh && !matchAch) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* 1. Integrated Search & Category Filter Strip — Bersih & Minimalis */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <MagnifyingGlass
            size={16}
            weight="bold"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama kegiatan, guru pembina, atau jenis bakat..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E5631]/40 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Hapus kata kunci pencarian"
            >
              <X size={14} weight="bold" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          {ekskulCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const label = ekskulCategoryLabels[cat] || cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E5631] text-white shadow-2xs'
                    : 'bg-slate-100/80 hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Empty State */}
      {filteredItems.length === 0 && (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <MagnifyingGlass size={22} weight="light" />
          </div>
          <h3 className="font-serif-academic text-base font-bold text-slate-700">
            Ekstrakurikuler Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tidak ada kegiatan yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('SEMUA');
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* 3. Refined Editorial Cards Grid (3 Kolom Elegan) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredItems.map((item) => {
          const waMessage = encodeURIComponent(
            `Halo Pembina/Admin SMPN 5 Cibeber, saya ingin bertanya seputar pendaftaran ekstrakurikuler ${item.name}.`
          );
          const waLink = `https://wa.me/${cleanWa}?text=${waMessage}`;

          return (
            <div
              key={item.id}
              className="card overflow-hidden bg-white border border-slate-200/90 rounded-2xl shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Foto Bersih — Tanpa Teks & Gradient Tebal yang Menutupi */}
                <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle Top-Left Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#1E5631] border border-slate-200/80 shadow-2xs">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Body Content — Tipografi Tenang & Bernapas */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif-academic text-lg font-bold text-[#1E293B] group-hover:text-[#1E5631] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-amber-700 font-medium italic mt-1 line-clamp-1">
                      &ldquo;{item.motto}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Metadata Ringkas & Elegan (Bukan Kotak-Kotak Grid) */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-2 truncate">
                      <Clock size={13} weight="bold" className="text-slate-400 shrink-0" />
                      <span className="truncate">{item.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <User size={13} weight="bold" className="text-slate-400 shrink-0" />
                      <span className="truncate">Pembina: {item.coach}</span>
                    </div>
                  </div>

                  {/* Catatan Prestasi Tunggal yang Ringkas */}
                  {item.achievements.length > 0 && (
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-amber-900 truncate">
                      <Trophy size={13} weight="fill" className="text-amber-500 shrink-0" />
                      <span className="truncate">{item.achievements[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Tindakan Bersih */}
              <div className="px-5 pb-5 pt-1 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  {item.badge}
                </span>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1E5631] hover:text-[#143e22] inline-flex items-center gap-1 transition-colors group/link"
                >
                  <span>Tanya Pembina</span>
                  <ArrowRight size={12} weight="bold" className="group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
