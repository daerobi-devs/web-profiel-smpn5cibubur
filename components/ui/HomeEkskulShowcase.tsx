'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Clock,
  User,
} from '@phosphor-icons/react';
import { ekskulData } from '@/lib/ekskul-data';

interface HomeEkskulShowcaseProps {
  items?: any[];
}

export default function HomeEkskulShowcase({ items }: HomeEkskulShowcaseProps) {
  // Ambil 3 ekskul unggulan dari props Supabase atau fallback lokal
  const sourceData = items && items.length > 0 ? items : ekskulData;
  const featuredEkskul = sourceData.slice(0, 3);

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-t border-slate-200/80">
      <div className="container-site relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1E5631] mb-1">
              <span>Bakat &bull; Karakter &bull; Prestasi Siswa</span>
            </div>
            <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E5631] tracking-tight">
              Ekstrakurikuler &amp; Pembinaan Bakat Siswa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1.5 leading-relaxed">
              Membentuk generasi pembelajar yang berjiwa pemimpin, menjunjung tinggi sportivitas, mencintai seni budaya Sunda, dan berwawasan lingkungan hidup.
            </p>
          </div>
          <Link
            href="/ekstrakurikuler"
            className="shrink-0 text-xs sm:text-sm font-bold text-[#1E5631] hover:text-[#164325] inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>Lihat Seluruh {sourceData.length} Ekstrakurikuler</span>
            <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Grid Card Minimalis & Elegan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredEkskul.map((item) => {
            const imgSrc = item.cover_image || item.image || '/assets/gedung-smpn5cibeber.jpg';
            const catLabel = item.category_label || item.category || 'Ekstrakurikuler';
            const scheduleText = item.schedule || 'Jadwal Rutin Mingguan';
            const coachName = item.coach || 'Dewan Guru Pembina';

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300"
              >
                {/* Visual Cover Bersih */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={imgSrc}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

                  {/* Kategori Badge Minimalis di Pojok Kiri Atas */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 text-slate-800 shadow-sm backdrop-blur-xs">
                      {catLabel}
                    </span>
                  </div>
                </div>

                {/* Konten Teks Tenang & Bernapas */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif-academic text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors line-clamp-1">
                      {item.name}
                    </h3>

                    {item.motto && (
                      <p className="text-xs text-amber-700 italic font-medium mt-1 line-clamp-1">
                        &ldquo;{item.motto}&rdquo;
                      </p>
                    )}

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata Bersih: Jadwal & Pembina */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock size={13} weight="bold" className="text-slate-400 shrink-0" />
                      <span className="truncate">{scheduleText}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={13} weight="bold" className="text-slate-400 shrink-0" />
                      <span className="truncate">Pembina: {coachName}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
