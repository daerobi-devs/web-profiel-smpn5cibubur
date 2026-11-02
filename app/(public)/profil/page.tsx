import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { getWebSettings } from '@/lib/supabaseData';

export const metadata: Metadata = {
  title: 'Profil Satuan Pendidikan | SMP Negeri 5 Cibeber',
  description:
    'Profil resmi SMP Negeri 5 Cibeber: identitas pokok satuan pendidikan, sejarah pendirian, visi misi, serta direktori dewan guru dan tenaga kependidikan.',
};

export default async function ProfilPage() {
  const settings = await getWebSettings();

  const schoolName = settings.school_name || 'SMP Negeri 5 Cibeber';
  const npsn = settings.school_npsn || '20607865';
  const accreditation = settings.school_accreditation || 'B';
  const address =
    settings.school_address ||
    'Jl. Raya Cikotok-Pasirkuray Km.05, Warungbanten, Kec. Cibeber, Kabupaten Lebak, Provinsi Banten 42394';
  const email = settings.school_email || 'smpnlimacibeber@yahoo.com';
  const phone = settings.school_phone || '0852-8145-9726';
  const headmaster = settings.headmaster_name || 'Adang Restuwardani, S.Pd';

  const portalSections = [
    {
      num: '01',
      title: 'Sejarah Pendirian',
      desc: 'Catatan pendirian sekolah sejak tahun 2004 di Desa Warungbanten hingga perkembangan sarana pembelajaran saat ini.',
      image: '/assets/gedung-smpn5cibeber.jpg',
      href: '/profil/sejarah',
      cta: 'Baca Sejarah Sekolah',
    },
    {
      num: '02',
      title: 'Visi, Misi & Tujuan',
      desc: 'Rumusan visi satuan pendidikan, enam misi penyelenggaraan pembelajaran, dan sasaran pembinaan peserta didik.',
      image: '/assets/lapangan-smpn5cibeber.jpg',
      href: '/profil/visi-misi',
      cta: 'Lihat Visi & Misi',
    },
    {
      num: '03',
      title: 'Dewan Guru & Tenaga Kependidikan',
      desc: 'Daftar kepala sekolah, wakil kepala sekolah, guru mata pelajaran, serta staf tata usaha SMP Negeri 5 Cibeber.',
      image: '/assets/dewan-guru-smpn5cibeber.jpg',
      href: '/profil/guru',
      cta: 'Buka Direktori Guru',
    },
  ];

  const identityRows = [
    { label: 'Nama Satuan Pendidikan', value: schoolName },
    { label: 'Nomor Pokok Sekolah Nasional (NPSN)', value: npsn, mono: true },
    { label: 'Jenjang Pendidikan', value: 'Sekolah Menengah Pertama (SMP)' },
    { label: 'Status Satuan Pendidikan', value: 'Negeri (Pemerintah Kabupaten Lebak)' },
    { label: 'Peringkat Akreditasi', value: `Terakreditasi ${accreditation} (BAN-S/M)` },
    { label: 'Tahun Berdiri / Operasional', value: '2004', mono: true },
    { label: 'Kurikulum yang Digunakan', value: 'Kurikulum Merdeka' },
    { label: 'Kepala Sekolah', value: headmaster },
    { label: 'Alamat Lengkap', value: address },
    { label: 'Kontak Resmi', value: `${phone} · ${email}` },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Header Halaman Editorial Rata Kiri (Tanpa Glass Pill Berulang) */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-slate-950">
          <Image
            src={settings.banner_page_profil || '/assets/lapangan-smpn5cibeber.jpg'}
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
            <span className="text-white font-semibold">Profil Sekolah</span>
          </nav>

          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Profil Satuan Pendidikan
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mt-2.5 leading-relaxed">
            Informasi kelembagaan, data pokok sekolah, sejarah pendirian, visi misi, serta susunan tenaga pendidik di SMP Negeri 5 Cibeber.
          </p>
        </div>
      </section>

      {/* Seksi 1: Ikhtisar Lembaga & Tabel Data Pokok Satuan Pendidikan */}
      <section className="section-padding border-b border-slate-200/80 bg-white">
        <div className="container-site max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Kolom Kiri: Pengantar Kelembagaan (5 Kolom) */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1E5631]">
                Identitas Kelembagaan
              </p>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Satuan Pendidikan Menengah Pertama di Kecamatan Cibeber
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                <p>
                  {schoolName} merupakan sekolah menengah pertama negeri di bawah naungan Dinas Pendidikan Kabupaten Lebak, Provinsi Banten. Berlokasi di jalur utama Jl. Raya Cikotok–Pasirkuray KM 05, Desa Warungbanten, sekolah ini melayani peserta didik dari berbagai desa di wilayah Kecamatan Cibeber.
                </p>
                <p>
                  Sejak beroperasi pada tahun 2004, {schoolName} menyelenggarakan pendidikan formal jenjang SMP yang memadukan penguatan karakter peserta didik, pembinaan akademik melalui Kurikulum Merdeka, serta kegiatan ekstrakurikuler kepanduan, olahraga, dan kesenian daerah.
                </p>
              </div>
            </div>

            {/* Kolom Kanan: Tabel Buku Induk / Data Pokok Sekolah (7 Kolom) */}
            <div className="lg:col-span-7">
              <div className="bg-[#F8FAFC] rounded-xl border border-slate-200/90 overflow-hidden">
                <div className="px-5 py-4 bg-slate-100/80 border-b border-slate-200/90 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Data Pokok Satuan Pendidikan
                  </h3>
                  <span className="text-[11px] font-mono font-semibold text-slate-500 tabular-nums">
                    NPSN {npsn}
                  </span>
                </div>

                <dl className="divide-y divide-slate-200/80 text-xs sm:text-sm">
                  {identityRows.map((row) => (
                    <div
                      key={row.label}
                      className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline"
                    >
                      <dt className="sm:col-span-5 text-xs font-medium text-slate-500">
                        {row.label}
                      </dt>
                      <dd
                        className={`sm:col-span-7 font-semibold text-slate-900 ${
                          row.mono ? 'font-mono tabular-nums' : ''
                        }`}
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seksi 2: Rubrik Profil Lembaga (Open Editorial Columns Tanpa Tombol Blok Penuh) */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-site max-w-6xl mx-auto space-y-8 sm:space-y-10">
          <div className="max-w-xl">
            <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Rubrik Informasi Profil
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Telusuri halaman berikut untuk membaca rincian sejarah sekolah, rumusan visi dan misi, serta daftar tenaga pendidik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {portalSections.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 overflow-hidden transition-colors duration-200"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-200/70">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400 tabular-nums">
                      BAGIAN {item.num}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors mt-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1E5631]">
                    <span>{item.cta}</span>
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
