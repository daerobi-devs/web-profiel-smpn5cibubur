'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Images,
  MagnifyingGlassPlus,
  X,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react';

interface EkskulGalleryGridProps {
  photos: string[];
  ekskulName: string;
}

export default function EkskulGalleryGrid({ photos, ekskulName }: EkskulGalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null && photos.length > 0;

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
  }, [lightboxIndex, photos.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, photos.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  if (!photos || photos.length === 0) {
    return (
      <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Images size={24} weight="duotone" />
        </div>
        <p className="text-sm font-bold text-slate-700">Dokumentasi Foto Sedang Disiapkan</p>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Galeri foto kegiatan dan latihan cabang ekskul ini akan segera diperbarui oleh guru pembina.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Grid Thumbnail Foto Pilihan Super Admin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {photos.map((photoUrl, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-2xs cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <Image
              src={photoUrl}
              alt={`Dokumentasi ${ekskulName} ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

            {/* Hover Icon Hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <MagnifyingGlassPlus size={20} weight="bold" />
              </span>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
              <span className="text-[11px] font-semibold drop-shadow-sm truncate max-w-[180px]">
                Dokumentasi #{idx + 1}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs border border-white/20">
                Perbesar
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-400 text-right font-medium">
        Menampilkan {photos.length} foto resmi &bull; Klik untuk melihat resolusi penuh
      </p>

      {/* =========================================================
          FULLSCREEN LIGHTBOX MODAL DIALOG
          ========================================================= */}
      {isOpen && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri Foto ${ekskulName}`}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Header Bar Lightbox */}
          <div
            className="flex items-center justify-between text-white max-w-6xl w-full mx-auto pb-3 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block">
                Galeri Foto Resmi {ekskulName}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">
                Foto {lightboxIndex + 1} dari {photos.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium mr-2">
                Tekan [Esc] untuk menutup &bull; [&larr;] [&rarr;] untuk navigasi
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer active:scale-95"
                title="Tutup (Esc)"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>

          {/* Main Image Stage */}
          <div
            className="relative flex-1 flex items-center justify-center my-3 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {photos.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-1 sm:left-3 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all backdrop-blur-md cursor-pointer active:scale-95"
                title="Foto Sebelumnya (Panah Kiri)"
              >
                <CaretLeft size={22} weight="bold" />
              </button>
            )}

            {/* Display Image */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center">
              <Image
                src={photos[lightboxIndex]}
                alt={`Dokumentasi ${ekskulName} (${lightboxIndex + 1})`}
                fill
                priority
                sizes="90vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Next Button */}
            {photos.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-1 sm:right-3 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all backdrop-blur-md cursor-pointer active:scale-95"
                title="Foto Berikutnya (Panah Kanan)"
              >
                <CaretRight size={22} weight="bold" />
              </button>
            )}
          </div>

          {/* Footer Bar Thumbnails Strip */}
          <div
            className="max-w-6xl w-full mx-auto pt-3 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            {photos.map((thumbUrl, tIdx) => (
              <button
                key={tIdx}
                type="button"
                onClick={() => setLightboxIndex(tIdx)}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  lightboxIndex === tIdx
                    ? 'border-amber-400 scale-105 shadow-md'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`Thumbnail ${tIdx + 1}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
