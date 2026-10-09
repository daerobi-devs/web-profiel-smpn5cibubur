'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, X, VideoCamera } from '@phosphor-icons/react';
import { extractYouTubeId, getYouTubeEmbedUrl } from '@/lib/youtubeUtils';

interface InlineVideoPlayerProps {
  videoUrl?: string | null;
  coverImage?: string | null;
  title: string;
  aspectRatioClassName?: string;
  categoryBadge?: string;
}

export default function InlineVideoPlayer({
  videoUrl,
  coverImage,
  title,
  aspectRatioClassName = 'aspect-16/10',
  categoryBadge,
}: InlineVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeId = extractYouTubeId(videoUrl);
  const effectiveCover = coverImage || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '/assets/gedung-smpn5cibeber.jpg');

  // Jika tidak ada video atau URL tidak valid, tampilkan foto cover biasa
  if (!youtubeId) {
    return (
      <div className={`relative ${aspectRatioClassName} w-full bg-slate-100 overflow-hidden`}>
        <Image
          src={effectiveCover}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {categoryBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#1E5631] border border-slate-200/80 shadow-2xs">
              {categoryBadge}
            </span>
          </div>
        )}
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(youtubeId, true);

  return (
    <div className={`relative ${aspectRatioClassName} w-full bg-slate-950 overflow-hidden rounded-2xl`}>
      {isPlaying ? (
        // Mode 1: Video YouTube Sedang Berputar In-Place di Dalam Kartu
        <div className="relative w-full h-full bg-black">
          <iframe
            src={embedUrl || ''}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {/* Tombol Tutup Video untuk Kembali ke Foto Cover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(false);
            }}
            className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 hover:bg-black text-white text-[11px] font-bold border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer"
            title="Tutup pemutar video dan kembali ke foto"
          >
            <X size={13} weight="bold" />
            <span>Tutup Video</span>
          </button>
        </div>
      ) : (
        // Mode 2: Cover Foto + Tombol Play Estetik
        <div className="relative w-full h-full group/player">
          <Image
            src={effectiveCover}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover/player:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Overlay Tipis Gradasi Hitam */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity group-hover/player:opacity-80" />

          {/* Badge Kategori di Pojok Kiri Atas */}
          {categoryBadge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#1E5631] border border-slate-200/80 shadow-2xs">
                {categoryBadge}
              </span>
            </div>
          )}

          {/* Badge Video Indikator di Pojok Kanan Atas */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/30 shadow-xs">
              <VideoCamera size={12} weight="fill" />
              <span>Video Dokumentasi</span>
            </span>
          </div>

          {/* Tombol Play Besar di Tengah Kartu */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(true);
              }}
              className="group/btn inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 hover:bg-[#1E5631] text-[#1E293B] hover:text-white backdrop-blur-md border border-white/80 shadow-xl transition-all duration-200 active:scale-95 cursor-pointer hover:shadow-emerald-900/40"
              title="Klik untuk memutar video dokumentasi langsung di sini"
            >
              <div className="w-6 h-6 rounded-full bg-[#1E5631] group-hover/btn:bg-white text-white group-hover/btn:text-[#1E5631] flex items-center justify-center transition-colors">
                <Play size={12} weight="fill" className="ml-0.5" />
              </div>
              <span className="text-xs font-extrabold tracking-wide">
                Putar Video
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
