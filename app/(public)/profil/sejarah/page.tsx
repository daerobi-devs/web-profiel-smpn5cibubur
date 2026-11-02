import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { getWebSettings } from '@/lib/supabaseData';

export const metadata: Metadata = {
  title: 'Sejarah Satuan Pendidikan | SMP Negeri 5 Cibeber',
  description:
    'Catatan sejarah pendirian dan tahapan perkembangan SMP Negeri 5 Cibeber di Desa Warungbanten, Kecamatan Cibeber, Kabupaten Lebak sejak tahun 2004.',
};

export default async function SejarahPage() {
  const settings = await getWebSettings();

  const schoolName = settings.school_name || 'SMP Negeri 5 Cibeber';
  const npsn = settings.school_npsn || '20607865';
  const accreditation = settings.school_accreditation || 'B';
  const customHistory = settings.school_history || '';

  const periods = [
    {
      period: '2004',
      title: 'Pendirian & Pembukaan Layanan Pendidikan',
      desc: 'SMP Negeri 5 Cibeber mulai beroperasi di Desa Warungbanten untuk menjawab kebutuhan akses pendidikan menengah pertama negeri bagi lulusan sekolah dasar di wilayah Kecamatan Cibeber yang sebelumnya harus menempuh jarak jauh.',
    },
    {
      period: '2005 – 2014',
      title: 'Penguatan Kelembagaan & Penataan Ruang Belajar',
      desc: 'Penetapan kelembagaan resmi di bawah Dinas Pendidikan Kabupaten Lebak (NPSN 20607865) disertai pembangunan ruang kelas permanen, ruang guru, serta penataan lapangan upacara.',
    },
    {
      period: '2015 – 2021',
      title: 'Peningkatan Sarana Penunjang & Akreditasi B',
      desc: 'Pemenuhan fasilitas perpustakaan, sarana praktikum, ruang komputer, serta pencapaian peringkat Akreditasi B (Baik) dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M).',
    },
    {
      period: '2022 – Sekarang',
      title: 'Pelaksanaan Kurikulum Merdeka & Pembinaan Bakat',
      desc: 'Penerapan Kurikulum Merdeka secara bertahap, penguatan kegiatan ekstrakurikuler kepanduan Pramuka, olahraga, dan kesenian daerah, serta penataan lingkungan belajar yang bersih dan asri.',
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Header Halaman Editorial Rata Kiri */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-slate-950">
          <Image
            src="/assets/gedung-smpn5cibeber.jpg"
            alt="Gedung Utama SMP Negeri 5 Cibeber"
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
            <span className="text-white font-semibold">Sejarah Sekolah</span>
          </nav>

          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Sejarah {schoolName}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mt-2.5 leading-relaxed">
            Latar belakang pendirian sekolah pada tahun 2004 di Desa Warungbanten serta tahapan perkembangan kelembagaan hingga saat ini.
          </p>
        </div>
      </section>

      {/* Seksi 1: Narasi Sejarah & Konteks Wilayah (2-Column Editorial Split) */}
      <section className="section-padding bg-white border-b border-slate-200/80">
        <div className="container-site max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Kolom Kiri: Narasi Sejarah (7 Kolom) */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1E5631]">
                Latar Belakang Pendirian
              </p>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Memperluas Akses Pendidikan Menengah di Wilayah Cibeber
              </h2>

              {customHistory ? (
                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line pt-1">
                  {customHistory}
                </div>
              ) : (
                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4 pt-1">
                  <p>
                    {schoolName} didirikan pada tahun 2004 sebagai bagian dari upaya Pemerintah Kabupaten Lebak bersama masyarakat Desa Warungbanten untuk menghadirkan layanan pendidikan menengah pertama negeri yang lebih dekat bagi warga di wilayah Kecamatan Cibeber, Provinsi Banten.
                  </p>
                  <p>
                    Kondisi geografis Kecamatan Cibeber yang berbukit membuat lulusan sekolah dasar di sekitar Desa Warungbanten dan jalur Jl. Raya Cikotok–Pasirkuray sebelumnya harus menempuh jarak cukup jauh menuju sekolah lanjutan. Dukungan masyarakat setempat bersama pemerintah daerah kemudian mewujudkan berdirinya satuan pendidikan ini di KM 05 Warungbanten.
                  </p>
                  <p>
                    Sejak masa awal operasionalnya, {schoolName} secara bertahap melengkapi sarana ruang belajar, ruang perpustakaan, laboratorium komputer, serta lapangan olahraga dan upacara. Dengan nomor pokok sekolah nasional (NPSN) {npsn} dan peringkat Akreditasi {accreditation} dari BAN-S/M, sekolah ini terus menjalankan perannya mendampingi peserta didik di wilayah Lebak Selatan.
                  </p>
                </div>
              )}
            </div>

            {/* Kolom Kanan: Dokumentasi Gedung & Ringkasan Fakta Historis (5 Kolom) */}
            <div className="lg:col-span-5 space-y-5">
              <figure className="bg-[#F8FAFC] rounded-xl border border-slate-200/90 overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  <Image
                    src="/assets/gedung-smpn5cibeber.jpg"
                    alt="Gedung Utama SMP Negeri 5 Cibeber"
                    fill
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 border-t border-slate-200/80 text-xs text-slate-600">
                  <strong className="font-bold text-slate-900 block">
                    Lingkungan Gedung Utama {schoolName}
                  </strong>
                  <span className="text-slate-500">
                    Jl. Raya Cikotok–Pasirkuray KM 05, Desa Warungbanten, Kec. Cibeber
                  </span>
                </figcaption>
              </figure>

              <dl className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                  <dt className="text-slate-500 font-medium">Tahun Berdiri</dt>
                  <dd className="text-lg font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">
                    2004
                  </dd>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                  <dt className="text-slate-500 font-medium">NPSN Resmi</dt>
                  <dd className="text-lg font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">
                    {npsn}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Seksi 2: Periodisasi Perkembangan Lembaga (Chronological Ledger dengan Tahun Asli) */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-site max-w-6xl mx-auto space-y-8 sm:space-y-10">
          <div className="max-w-xl">
            <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Periodisasi Perkembangan Sekolah
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Tahapan pertumbuhan kelembagaan dan pemenuhan sarana pendidikan sejak awal berdiri hingga saat ini.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 divide-y divide-slate-200/80">
            {periods.map((item) => (
              <div
                key={item.period}
                className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-sm sm:text-base font-extrabold text-[#1E5631] tabular-nums">
                    {item.period}
                  </span>
                </div>
                <div className="md:col-span-9 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
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
              <Link href="/profil/visi-misi" className="inline-flex items-center gap-1.5 hover:text-[#164325]">
                <span>Visi, Misi &amp; Tujuan</span>
                <ArrowRight size={13} weight="bold" />
              </Link>
              <Link href="/profil/guru" className="inline-flex items-center gap-1.5 hover:text-[#164325]">
                <span>Direktori Dewan Guru</span>
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
