'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Trophy,
  Laptop,
  Plant,
  CheckCircle,
  ArrowRight,
  Target,
  Sparkle,
} from '@phosphor-icons/react';
import { ScrollFadeUp } from './motion';

interface VisiMisiContentProps {
  settings: Record<string, string>;
}

export default function VisiMisiContent({ settings }: VisiMisiContentProps) {
  const visionText =
    settings.school_vision ||
    'Terwujudnya insan pembelajar yang berakhlak mulia, unggul dalam prestasi, terampil dalam teknologi, dan peduli kelestarian lingkungan hidup.';

  // 4 Pilar Nilai Karakter (Clean, refined, monochromatic/emerald)
  const corePillars = [
    {
      icon: Heart,
      title: 'Berakhlak Mulia',
      desc: 'Menanamkan ketakwaan kepada Tuhan YME, kejujuran, sopan santun 5S, dan integritas moral dalam keseharian warga sekolah.',
    },
    {
      icon: Trophy,
      title: 'Unggul Prestasi',
      desc: 'Mendorong daya saing sehat dalam bidang akademik sains, kompetisi olahraga, serta pelestarian seni budaya daerah.',
    },
    {
      icon: Laptop,
      title: 'Terampil Digital',
      desc: 'Membekali peserta didik dengan literasi digital, penguasaan perangkat TIK dasar, dan pemanfaatan teknologi yang cerdas dan beretika.',
    },
    {
      icon: Plant,
      title: 'Peduli Lingkungan',
      desc: 'Membudayakan kepedulian kelestarian alam, pemilahan sampah, penghijauan kampus, dan komitmen Sekolah Adiwiyata berkelanjutan.',
    },
  ];

  // 6 Misi Satuan Pendidikan (Clean Editorial Numbered List)
  const missions = [
    {
      num: '01',
      title: 'Penguatan Keimanan & Budi Pekerti',
      desc: 'Menanamkan keimanan, ketaqwaan, dan budi pekerti luhur melalui pembiasaan ibadah rutin, doa bersama, dan pembentukan karakter saling menghormati.',
    },
    {
      num: '02',
      title: 'Pembelajaran Kurikulum Merdeka yang Aktif & Inovatif',
      desc: 'Menyelenggarakan proses pembelajaran aktif, kreatif, inovatif, dan menyenangkan yang berpusat pada minat dan keunikan potensi setiap peserta didik.',
    },
    {
      num: '03',
      title: 'Pengembangan Bakat Akademik & Non-Akademik',
      desc: 'Menumbuhkembangkan bakat dan minat siswa dalam bidang sains, olahraga, dan seni guna meraih prestasi membanggakan di tingkat rayon hingga kabupaten.',
    },
    {
      num: '04',
      title: 'Tata Kelola Partisipatif & Akuntabel',
      desc: 'Mewujudkan manajemen sekolah yang transparan, akuntabel, dan kolaboratif dengan pelibatan aktif dewan guru, komite sekolah, wali murid, dan masyarakat.',
    },
    {
      num: '05',
      title: 'Kecakapan Literasi & Teknologi Digital',
      desc: 'Membekali peserta didik dengan kemampuan literasi numerasi, kecakapan digital, serta pemanfaatan sarana TIK secara bertanggung jawab.',
    },
    {
      num: '06',
      title: 'Kelestarian Lingkungan Hidup (Adiwiyata)',
      desc: 'Menciptakan lingkungan sekolah yang bersih, hijau, asri, aman, bebas perundungan (anti-bullying), serta berwawasan pelestarian lingkungan hidup.',
    },
  ];

  // 4 Sasaran Mutu / Tujuan Pendidikan
  const objectives = [
    {
      title: 'Karakter & Religiusitas',
      desc: 'Lulusan taat beribadah, memiliki sopan santun, bertoleransi, dan menjunjung tinggi Profil Pelajar Pancasila.',
    },
    {
      title: 'Standar Akademik',
      desc: 'Peningkatan rata-rata capaian kompetensi belajar dan nilai asesmen peserta didik secara berkelanjutan.',
    },
    {
      title: 'Kecakapan Digital',
      desc: 'Lulusan menguasai operasional komputer dasar, internet sehat, dan platform pembelajaran digital modern.',
    },
    {
      title: 'Ekosistem Sekolah Aman',
      desc: 'Suasana kampus sekolah yang hijau, teduh, ramah anak, dan bebas dari segala bentuk perundungan (zero bullying).',
    },
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-[#1E293B]">
      {/* =========================================================
          1. HEADER EDITORIAL (CLEAN, MINIMALIS & BERKELAS)
          ========================================================= */}
      {/* =========================================================
          1. HERO BANNER INSTITUSIONAL BER-BACKGROUND FAJAR PEGUNUNGAN
          ========================================================= */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/30">
        {/* Background Foto Lembah Cibeber Saat Fajar dengan Dark Forest Green Tint (Super Ringan: 189KB) */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/assets/visi-misi-banner-bg.jpg"
            alt="Panorama Kampus SMP Negeri 5 Cibeber di Pagi Hari"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          {/* Overlay Gradasi Hijau Hutan Lembut Agar Teks 100% Kontras & Nyaman Dibaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/82 via-[#164325]/75 to-[#12361e]/92" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/60" />
        </div>

        <div className="container-site relative z-10 space-y-3.5 max-w-3xl mx-auto text-center">
          {/* Badge Pill Emas Berikon */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-amber-300 shadow-xs">
            <Target size={15} weight="fill" />
            <span>Landasan Filosofis &amp; Arah Perjuangan</span>
          </div>

          {/* Judul Utama Megah */}
          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Visi, Misi &amp; Tujuan
          </h1>

          {/* Deskripsi Pengantar Berwibawa */}
          <p className="text-xs sm:text-sm md:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Cita-cita luhur dan komitmen penyelenggaraan pendidikan bermutu di lingkungan SMP Negeri 5 Cibeber, Kabupaten Lebak.
          </p>

          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-emerald-200/90 pt-1">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-emerald-400/60">/</span>
            <Link href="/profil" className="hover:text-white transition-colors">
              Profil
            </Link>
            <span className="text-emerald-400/60">/</span>
            <span className="text-amber-400 font-bold">Visi &amp; Misi</span>
          </nav>

          {/* Quick Info Badges */}
          <div className="pt-2 flex flex-wrap justify-center gap-2.5 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold shadow-2xs">
              4 Pilar Karakter
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-amber-300 font-semibold shadow-2xs">
              6 Misi Strategis
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-emerald-200 font-semibold shadow-2xs">
              Profil Pelajar Pancasila
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. KONTEN UTAMA: EDITORIAL MINIMALIS
          ========================================================= */}
      <main className="container-site pt-12 pb-24 sm:pt-16 sm:pb-32 max-w-4xl mx-auto space-y-20 sm:space-y-28">
        {/* =========================================================
            SEKSI I: VISI UTAMA (EDITORIAL STATEMENT BESAR & BERSIH)
            ========================================================= */}
        <ScrollFadeUp distance={24}>
          <section className="text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-bold text-[#1E5631]">
              <Target size={14} weight="bold" />
              <span>Visi Resmi Sekolah</span>
            </div>

            {/* Visi Text Besar Elegan */}
            <blockquote className="font-serif-academic text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-snug sm:leading-relaxed max-w-3xl mx-auto">
              &ldquo;{visionText}&rdquo;
            </blockquote>

            {/* Garis Aksen Halus */}
            <div className="w-12 h-1 bg-[#1E5631] mx-auto rounded-full mt-4" />

            <p className="text-xs text-slate-400 font-medium">
              SMP Negeri 5 Cibeber &bull; Kecamatan Cibeber, Kabupaten Lebak
            </p>
          </section>
        </ScrollFadeUp>

        {/* =========================================================
            SEKSI II: 4 PILAR NILAI (KARTU BERSIH & SERAGAM)
            ========================================================= */}
        <section className="space-y-8">
          <ScrollFadeUp distance={20}>
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E5631]">
                Empat Dimensi Nilai
              </span>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-black text-slate-900">
                Pilar Pembentukan Karakter
              </h2>
            </div>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollFadeUp key={idx} delay={idx * 0.06} distance={18}>
                  <div className="h-full p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[#1E5631]/40 hover:shadow-sm transition-all duration-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1E5631] flex items-center justify-center border border-emerald-100">
                      <Icon size={22} weight="duotone" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </ScrollFadeUp>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            SEKSI III: 6 MISI SEKOLAH (EDITORIAL NUMBERED LIST)
            ========================================================= */}
        <section className="space-y-8">
          <ScrollFadeUp distance={20}>
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E5631]">
                Langkah Strategis Nyata
              </span>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-black text-slate-900">
                Enam Misi Satuan Pendidikan
              </h2>
            </div>
          </ScrollFadeUp>

          {/* Clean Numbered Divider List */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs divide-y divide-slate-100">
            {missions.map((mission, idx) => (
              <ScrollFadeUp key={idx} delay={idx * 0.05} distance={14}>
                <div className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  {/* Clean Monospace Number */}
                  <span className="font-mono text-base font-black text-[#1E5631] shrink-0 pt-0.5">
                    {mission.num}.
                  </span>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {mission.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {mission.desc}
                    </p>
                  </div>
                </div>
              </ScrollFadeUp>
            ))}
          </div>
        </section>

        {/* =========================================================
            SEKSI IV: TUJUAN PENDIDIKAN (SASARAN MUTU LULUSAN)
            ========================================================= */}
        <section className="space-y-8">
          <ScrollFadeUp distance={20}>
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E5631]">
                Sasaran Capaian
              </span>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-black text-slate-900">
                Tujuan Pendidikan Sekolah
              </h2>
            </div>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {objectives.map((obj, idx) => (
              <ScrollFadeUp key={idx} delay={idx * 0.05} distance={16}>
                <div className="h-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <CheckCircle size={20} weight="fill" className="text-[#1E5631] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      {obj.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {obj.desc}
                    </p>
                  </div>
                </div>
              </ScrollFadeUp>
            ))}
          </div>
        </section>

        {/* =========================================================
            SEKSI V: FOOTER NAVIGASI BERSIH
            ========================================================= */}
        <ScrollFadeUp distance={16}>
          <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>SMP Negeri 5 Cibeber &bull; Terakreditasi B</span>
            <div className="flex items-center gap-4 font-semibold text-[#1E5631]">
              <Link href="/profil/sejarah" className="hover:underline flex items-center gap-1">
                <span>Baca Sejarah Sekolah</span>
                <ArrowRight size={13} weight="bold" />
              </Link>
              <span>&bull;</span>
              <Link href="/profil/guru" className="hover:underline flex items-center gap-1">
                <span>Direktori Dewan Guru</span>
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </div>
        </ScrollFadeUp>
      </main>
    </div>
  );
}
