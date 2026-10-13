'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export interface DynamicHeroSlide {
  id?: string;
  image_url: string;
  title: string;
  caption?: string | null;
  order_num?: number;
}

interface HeroBackgroundSliderProps {
  slides?: DynamicHeroSlide[];
}

const DEFAULT_SLIDES: DynamicHeroSlide[] = [
  {
    image_url: '/assets/gedung-smpn5cibeber.jpg',
    title: 'Gedung Utama & Teras SMP Negeri 5 Cibeber',
    caption: 'Gedung Utama',
  },
  {
    image_url: '/assets/lapangan-smpn5cibeber.jpg',
    title: 'Lapangan Upacara & Panggung Terbuka SMP Negeri 5 Cibeber',
    caption: 'Lapangan & Panggung',
  },
  {
    image_url: '/assets/prestasi-siswa-smpn5cibeber.jpg',
    title: 'Prestasi Marching Band & Kontingen Siswa SMPN 5 Cibeber',
    caption: 'Kontingen Prestasi Siswa',
  },
];

export default function HeroBackgroundSlider({ slides }: HeroBackgroundSliderProps) {
  const activeSlides = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (activeSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-slate-900">
      {/* 
        Zero-Flash Seamless Crossfade:
        Semua foto tetap terpasang (mounted) di DOM secara permanen.
        Foto aktif berada di layer zIndex 10 dengan transisi opacity 900ms.
        TIDAK ADA jeda kosong, dan TIDAK ADA kedipan putih sama sekali!
      */}
      {activeSlides.map((slide, index) => {
        const isActive = current === index;
        const imgUrl = (slide.image_url || '').toLowerCase();
        const objectPosition = imgUrl.includes('gedung')
          ? 'object-[center_28%]'
          : imgUrl.includes('lapangan')
          ? 'object-[center_35%]'
          : imgUrl.includes('prestasi')
          ? 'object-[center_35%]'
          : 'object-center';

        return (
          <div
            key={slide.image_url + index}
            className={`absolute inset-0 transition-opacity duration-900 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-5'
            }`}
          >
            <Image
              src={slide.image_url}
              alt={slide.title}
              fill
              priority={index === 0}
              className={`object-cover ${objectPosition} transition-transform duration-[4500ms] ease-out ${
                isActive ? 'scale-100' : 'scale-103'
              }`}
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* 
        Siluet & Tint Hijau Khas SMPN 5 Cibeber:
        Memberikan nuansa hijau institusional yang elegan dan adiwiyata,
        menjaga foto tetap tajam & jernih sekaligus memberikan kontras tinggi bagi tipografi putih.
      */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#0b2414]/55 via-[#164325]/38 to-[#071a0e]/70" />
      <div className="absolute inset-0 z-20 pointer-events-none bg-radial from-transparent via-[#1E5631]/20 to-[#06150b]/55" />
    </div>
  );
}
