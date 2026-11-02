'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';
import { ekskulData } from '@/lib/ekskul-data';
import { ScrollFadeUp, ScrollStaggerContainer, ScrollStaggerItem } from '@/components/ui/motion';

interface HomeEkskulShowcaseProps {
  items?: any[];
}

export default function HomeEkskulShowcase({ items }: HomeEkskulShowcaseProps) {
  // Ambil 3 ekskul unggulan dari props Supabase atau fallback lokal (Alur CMS tetap 100% utuh)
  const sourceData = items && items.length > 0 ? items : ekskulData;
  const featuredEkskul = sourceData.slice(0, 3);

  return (
    <section className="relative overflow-hidden section-padding bg-white border-t border-slate-200/80">
      <div className="container-site relative z-10">
        {/* Section Header Tanpa Eyebrow Berulang */}
        <ScrollFadeUp delay={0.05} duration={0.6}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Ekstrakurikuler &amp; Pembinaan Bakat
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-2 leading-relaxed">
                Kegiatan rutin mingguan untuk melatih kemandirian, kepanduan Pramuka, olahraga, dan pelestarian seni tradisi siswa.
              </p>
            </div>
            <Link
              href="/ekstrakurikuler"
              className="shrink-0 text-xs sm:text-sm font-bold text-[#1E5631] hover:text-[#164325] inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>Seluruh {sourceData.length} Kegiatan Ekskul</span>
              <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollFadeUp>

        {/* 3 Kolom Bersih: Tanpa Badge di Atas Foto & Tanpa Quote Motto Buatan AI */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7" stagger={0.08} delay={0.05}>
          {featuredEkskul.map((item) => {
            const imgSrc = item.cover_image || item.image || '/assets/gedung-smpn5cibeber.jpg';
            const catLabel = item.category_label || item.category || 'Ekstrakurikuler';
            const scheduleText = item.schedule || 'Jadwal Rutin Mingguan';
            const coachName = item.coach || 'Dewan Guru Pembina';

            return (
              <ScrollStaggerItem key={item.id} className="flex">
                <Link
                  href={`/ekstrakurikuler/${item.slug || item.id}`}
                  className="group flex flex-col bg-[#F8FAFC] rounded-xl overflow-hidden border border-slate-200/90 hover:border-slate-300 transition-colors duration-200 w-full"
                >
                  {/* Visual Cover Murni Tanpa Overlay Gelap atau Floating Pill */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-200/70">
                    <Image
                      src={imgSrc}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Konten Teks Ringkas & Fungsional */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1.5">
                        <span className="text-[#1E5631] font-bold uppercase tracking-wider">
                          {catLabel}
                        </span>
                        <span>&middot;</span>
                        <span className="truncate">{scheduleText}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug">
                        {item.name}
                      </h3>

                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer Pembina Sebaris */}
                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-500 truncate">
                        Pembina: <strong className="font-semibold text-slate-700">{coachName}</strong>
                      </span>
                      <ArrowRight
                        size={14}
                        weight="bold"
                        className="text-slate-400 group-hover:text-[#1E5631] group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </div>
                  </div>
                </Link>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>
      </div>
    </section>
  );
}
