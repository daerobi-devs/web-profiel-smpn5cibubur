'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Trophy,
  CaretLeft,
  CaretRight,
  ArrowRight,
} from '@phosphor-icons/react';
import { ScrollFadeUp } from '@/components/ui/motion';

export interface AchievementItem {
  id: string;
  title: string;
  description: string | null;
  level: string;
  year: number;
  imageUrl: string | null;
}

interface AchievementCarouselProps {
  achievements: AchievementItem[];
}

export default function AchievementCarousel({
  achievements,
}: AchievementCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-7">
      {/* Header bar dengan Judul & Kontrol Geser */}
      <ScrollFadeUp delay={0.05} duration={0.6}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300/95">
              Catatan Capaian Siswa
            </p>
            <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mt-1">
              Prestasi &amp; Penghargaan
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Geser ke kiri"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/25 bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Geser ke kanan"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/25 bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>

            <Link
              href="/prestasi"
              className="h-9 px-4 rounded-full text-xs font-bold text-white hover:text-amber-200 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/25 transition-colors duration-200 active:scale-95"
            >
              <span>Arsip Prestasi</span>
              <ArrowRight size={13} weight="bold" />
            </Link>
          </div>
        </div>
      </ScrollFadeUp>

      {/* Horizontal Scroll Container */}
      <ScrollFadeUp delay={0.1} duration={0.65}>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-0.5 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {achievements.map((ach) => (
              <Link
                key={ach.id}
                href={`/prestasi#${ach.id}`}
                aria-label={`Lihat prestasi ${ach.title}`}
                className="w-[270px] sm:w-[320px] shrink-0 snap-start overflow-hidden bg-white border border-slate-200/90 shadow-lg shadow-black/20 hover:border-amber-300/90 hover:-translate-y-0.5 transition-all duration-200 flex flex-col group rounded-xl cursor-pointer"
              >
                {/* Foto Dokumentasi Tanpa Pill Menumpuk */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  {ach.imageUrl ? (
                    <Image
                      src={ach.imageUrl}
                      alt={ach.title}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400">
                      <Trophy
                        size={36}
                        weight="duotone"
                        className="text-amber-600/70 mb-1"
                      />
                      <span className="text-[11px] font-medium text-slate-400">
                        Dokumentasi Prestasi
                      </span>
                    </div>
                  )}
                </div>

                {/* Konten Teks Bersih & Terstruktur + Indikator Tautan ke Halaman Prestasi */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1.5 tabular-nums">
                      <span className="text-[#B45309] font-bold uppercase tracking-wider">
                        Tingkat {ach.level}
                      </span>
                      <span>&middot;</span>
                      <span>Tahun {ach.year}</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#1E5631] transition-colors line-clamp-2 leading-snug">
                      {ach.title}
                    </h3>
                    {ach.description && (
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {ach.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1E5631] group-hover:text-[#164325]">
                    <span>Lihat Detail Prestasi</span>
                    <ArrowRight
                      size={13}
                      weight="bold"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ScrollFadeUp>
    </div>
  );
}
