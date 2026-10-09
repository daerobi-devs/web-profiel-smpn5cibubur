'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from '@phosphor-icons/react';
import { extractYouTubeId, getYouTubeEmbedUrl } from '@/lib/youtubeUtils';

interface EkskulVideoPlayerProps {
  videoUrl: string;
  title: string;
  coverImage?: string;
  ekskulName: string;
}

export default function EkskulVideoPlayer({
  videoUrl,
  title,
  coverImage,
  ekskulName,
}: EkskulVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState<string | null>(null);

  const youtubeId = extractYouTubeId(videoUrl);

  if (!youtubeId) {
    return null;
  }

  // Thumbnail YouTube HD (maxresdefault) dengan fallback otomatis
  const primaryThumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const fallbackThumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  const activeThumbnail = thumbSrc || primaryThumb;

  const embedUrl = getYouTubeEmbedUrl(youtubeId, true);

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-2xs">
      {isPlaying ? (
        /* Mode 1: Video Aktif Memutar — Bersih Total Tanpa Tombol Mengambang */
        <iframe
          src={`${embedUrl}&autoplay=1`}
          title={title}
          className="w-full h-full border-0 animate-fadeIn"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        /* Mode 2: Poster Bersih Sinematik */
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group/play relative w-full h-full text-left cursor-pointer overflow-hidden block focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          title="Klik untuk memutar video dokumentasi"
        >
          {/* Still-Frame Resolusi Tinggi */}
          <Image
            src={activeThumbnail}
            alt={`Dokumentasi Video ${ekskulName}`}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover group-hover/play:scale-103 transition-transform duration-500 ease-out"
            onError={() => {
              if (activeThumbnail === primaryThumb) {
                setThumbSrc(fallbackThumb);
              } else if (coverImage) {
                setThumbSrc(coverImage);
              }
            }}
          />

          {/* Vignette Gelap Lembut */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent group-hover/play:from-slate-950/80 transition-opacity" />

          {/* Tombol Play Minimalis & Elegan di Tengah */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/90 group-hover/play:bg-[#1E5631] text-slate-900 group-hover/play:text-white backdrop-blur-md border border-white/80 shadow-xl flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 active:scale-95">
              <Play size={24} weight="fill" className="ml-1 transition-colors" />
            </div>
          </div>

          {/* Label Judul Video di Pojok Bawah */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
            <p className="text-xs sm:text-sm font-bold font-serif-academic drop-shadow-sm truncate">
              {title}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
