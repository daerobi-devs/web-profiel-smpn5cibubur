'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { ScrollFadeUp } from './motion';

interface VisiMisiContentProps {
  settings: Record<string, string>;
}

export default function VisiMisiContent({ settings }: VisiMisiContentProps) {
  const visionText =
    settings.school_vision ||
    'Terwujudnya insan pembelajar yang berakhlak mulia, unggul dalam prestasi, terampil dalam teknologi, dan peduli kelestarian lingkungan hidup.';

  const visionIndicators = [
    {
      num: '01',
      title: 'Berakhlak Mulia',
      desc: 'Pembiasaan ibadah, kejujuran, sopan santun, dan sikap saling menghormati dalam keseharian di sekolah.',
    },
    {
      num: '02',
      title: 'Unggul dalam Prestasi',
      desc: 'Peningkatan capaian belajar akademik serta partisipasi aktif dalam kompetisi olahraga, sains, dan seni.',
    },
    {
      num: '03',
      title: 'Terampil dalam Teknologi',
      desc: 'Penguasaan perangkat komputer dasar dan pemanfaatan media digital untuk mendukung pembelajaran.',
    },
    {
      num: '04',
      title: 'Peduli Lingkungan Hidup',
      desc: 'Penataan lingkungan sekolah yang bersih, hijau, sehat, dan bebas dari perundungan.',
    },
  ];

  const missions = [
    {
      num: '01',
      title: 'Pembinaan Keimanan & Budi Pekerti',
      desc: 'Menanamkan keimanan, ketakwaan, dan akhlak mulia melalui pembiasaan ibadah rutin serta keteladanan sikap warga sekolah.',
    },
    {
      num: '02',
      title: 'Pelaksanaan Pembelajaran Kurikulum Merdeka',
      desc: 'Menyelenggarakan kegiatan belajar mengajar yang aktif, terstruktur, dan memperhatikan perkembangan kompetensi setiap peserta didik.',
    },
    {
      num: '03',
      title: 'Pengembangan Minat & Bakat Siswa',
      desc: 'Memfasilitasi latihan rutin ekstrakurikuler kepanduan Pramuka, olahraga, kesenian tradisional, dan kegiatan kesiswaan.',
    },
    {
      num: '04',
      title: 'Peningkatan Literasi, Numerasi & Kecakapan TIK',
      desc: 'Mendayagunakan perpustakaan sekolah dan laboratorium komputer untuk menunjang kecakapan literasi serta teknologi informasi.',
    },
    {
      num: '05',
      title: 'Tata Kelola Sekolah yang Transparan & Kolaboratif',
      desc: 'Membangun kerja sama yang erat antara dewan guru, tenaga kependidikan, komite sekolah, orang tua wali murid, dan masyarakat.',
    },
    {
      num: '06',
      title: 'Pemeliharaan Lingkungan Belajar yang Asri & Aman',
      desc: 'Menjaga kebersihan, keteduhan, dan keamanan lingkungan sekolah agar kondusif bagi tumbuh kembang siswa.',
    },
  ];

  const goals = [
    'Meningkatnya disiplin kehadiran, ketertiban belajar, dan perilaku santun peserta didik di dalam maupun di luar lingkungan sekolah.',
    'Tercapainya ketuntasan belajar seluruh mata pelajaran sesuai standar kompetensi lulusan jenjang Sekolah Menengah Pertama.',
    'Terlaksananya Asesmen Nasional Berbasis Komputer (ANBK) dan pembelajaran berbasis TIK secara mandiri di laboratorium sekolah.',
    'Terwujudnya prestasi siswa pada ajang perlombaan tingkat Kecamatan Cibeber maupun tingkat Kabupaten Lebak.',
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Header Halaman Editorial Rata Kiri (Tanpa Glass Pill Berulang) */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-slate-950">
          <Image
            src={settings.banner_page_visimisi || '/assets/visi-misi-banner-bg.jpg'}
            alt="Lingkungan SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/50 to-[#091e10]/85" />
        </div>

        <div className="container-site relative z-10 max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/profil" className="hover:text-white transition-colors">
              Profil Sekolah
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Visi, Misi &amp; Tujuan</span>
          </nav>

          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Visi, Misi &amp; Tujuan
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mt-2.5 leading-relaxed">
            Arah penyelenggaraan pendidikan dan sasaran pembinaan peserta didik di SMP Negeri 5 Cibeber, Kabupaten Lebak.
          </p>
        </div>
      </section>

      <main className="container-site py-12 sm:py-16 max-w-6xl mx-auto space-y-14 sm:space-y-16">
        {/* Seksi 1: Rumusan Visi & Indikator Visi Terpadu (Tanpa Duplikasi Seksi) */}
        <ScrollFadeUp distance={18}>
          <section className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden">
            <div className="p-6 sm:p-10 lg:p-12 border-b border-slate-200/80">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1E5631]">
                Rumusan Visi Satuan Pendidikan
              </p>
              <blockquote className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug mt-3 max-w-4xl">
                &ldquo;{visionText}&rdquo;
              </blockquote>
            </div>

            {/* 4 Indikator Visi sebagai Grid Horizontal Terintegrasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 bg-[#F8FAFC]">
              {visionIndicators.map((ind) => (
                <div key={ind.num} className="p-5 sm:p-6 space-y-1.5">
                  <span className="text-[11px] font-mono font-semibold text-slate-400 tabular-nums">
                    INDIKATOR {ind.num}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    {ind.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </ScrollFadeUp>

        {/* Seksi 2: Misi & Tujuan Satuan Pendidikan (2-Column Editorial Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Kolom Kiri: 6 Misi Satuan Pendidikan (7 Kolom) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Misi Satuan Pendidikan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Langkah penyelenggaraan pendidikan untuk mewujudkan visi sekolah.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 divide-y divide-slate-200/80">
              {missions.map((mission) => (
                <div
                  key={mission.num}
                  className="p-5 sm:p-6 flex items-start gap-4"
                >
                  <span className="font-mono text-sm font-extrabold text-[#1E5631] shrink-0 pt-0.5 tabular-nums">
                    {mission.num}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {mission.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {mission.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Tujuan Satuan Pendidikan (5 Kolom) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Tujuan Sekolah
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Capaian nyata yang ditargetkan dalam penyelenggaraan kurikulum.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6">
              <ol className="space-y-4 text-xs sm:text-sm text-slate-600">
                {goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-relaxed">
                    <span className="font-mono text-xs font-bold text-slate-400 shrink-0 pt-0.5 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <Link
            href="/profil"
            className="text-slate-500 hover:text-slate-900 font-semibold transition-colors"
          >
            &larr; Kembali ke Profil Satuan Pendidikan
          </Link>
          <div className="flex flex-wrap items-center gap-5 font-bold text-[#1E5631]">
            <Link href="/profil/sejarah" className="inline-flex items-center gap-1.5 hover:text-[#164325]">
              <span>Sejarah Sekolah</span>
              <ArrowRight size={13} weight="bold" />
            </Link>
            <Link href="/profil/guru" className="inline-flex items-center gap-1.5 hover:text-[#164325]">
              <span>Direktori Dewan Guru</span>
              <ArrowRight size={13} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
