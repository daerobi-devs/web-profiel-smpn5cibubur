'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  X,
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  Images,
  Play,
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { getCategoryLabel } from '@/lib/utils';
import { getYouTubeEmbedUrl } from '@/lib/youtubeUtils';

export type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  videoUrl?: string | null;
  category: string;
};

type GalleryLightboxProps = {
  items: GalleryItem[];
};

export default function GalleryLightbox({ items }: GalleryLightboxProps) {
  const [activeCategory, setActiveCategory] = useState<string>('SEMUA');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const categories = ['SEMUA', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    activeCategory === 'SEMUA'
      ? items
      : items.filter((i) => i.category === activeCategory);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
    );
  }, [selectedIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
    );
  }, [selectedIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedIndex(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#1E5631] text-white'
                : 'bg-white text-[#1E293B] border border-slate-200 hover:bg-slate-50 hover:text-[#1E5631]'
            }`}
          >
            {getCategoryLabel(cat)}
            <span className="ml-1.5 opacity-65 text-xs tabular-nums">
              (
              {cat === 'SEMUA'
                ? items.length
                : items.filter((i) => i.category === cat).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Grid Photos */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Images size={36} className="text-slate-300 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">Tidak ada dokumentasi di kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
              onClick={() => setSelectedIndex(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-100 border border-slate-200 aspect-square shadow-xs hover:shadow-md transition-shadow"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {item.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-11 h-11 rounded-full bg-slate-950/75 border border-white/40 text-white flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:bg-[#1E5631] transition-all duration-300">
                    <Play size={18} weight="fill" className="ml-0.5 text-white" />
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <div className="self-end p-1.5 rounded-lg bg-black/40 text-white">
                  {item.videoUrl ? (
                    <Play size={16} weight="fill" />
                  ) : (
                    <MagnifyingGlassPlus size={16} weight="bold" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                    {item.videoUrl ? 'Video Dokumentasi' : getCategoryLabel(item.category)}
                  </span>
                  <p className="text-xs font-bold leading-snug line-clamp-1 mt-0.5 text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90">
            <div
              className="absolute inset-0"
              onClick={() => setSelectedIndex(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 max-w-4xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-white border border-slate-800 shadow-2xl overflow-hidden text-[#1E293B]"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E5631]">
                    {getCategoryLabel(selectedItem.category)}
                  </span>
                  <span className="text-slate-300">&middot;</span>
                  <span className="text-xs text-slate-500 font-medium tabular-nums">
                    {selectedIndex !== null ? selectedIndex + 1 : 0} dari {filteredItems.length}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Tutup dokumentasi"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Main Media Area */}
              {selectedItem.videoUrl ? (
                <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedItem.videoUrl, true) || ''}
                    title={selectedItem.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />

                  {filteredItems.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-[#1E5631] text-white border border-white/20 transition-colors shadow-md z-20 cursor-pointer"
                        aria-label="Dokumentasi sebelumnya"
                      >
                        <CaretLeft size={20} weight="bold" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-[#1E5631] text-white border border-white/20 transition-colors shadow-md z-20 cursor-pointer"
                        aria-label="Dokumentasi selanjutnya"
                      >
                        <CaretRight size={20} weight="bold" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="relative flex-1 min-h-[50vh] sm:min-h-[60vh] bg-slate-950 flex items-center justify-center">
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />

                  {filteredItems.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-[#1E5631] text-white border border-white/20 transition-colors shadow-md cursor-pointer"
                        aria-label="Foto sebelumnya"
                      >
                        <CaretLeft size={20} weight="bold" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-[#1E5631] text-white border border-white/20 transition-colors shadow-md cursor-pointer"
                        aria-label="Foto selanjutnya"
                      >
                        <CaretRight size={20} weight="bold" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Caption Footer */}
              <div className="p-4 sm:p-5 bg-white border-t border-slate-100 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {selectedItem.title}
                </h3>
                {selectedItem.description && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedItem.description}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
