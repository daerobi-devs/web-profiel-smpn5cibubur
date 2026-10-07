import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  HourglassHigh,
  Target,
  Users,
  ArrowRight,
  Sparkle,
  CheckCircle,
  Building,
  GraduationCap,
  MapPin,
  Clock,
  Phone,
  Envelope,
} from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { getWebSettings } from '@/lib/supabaseData';

export const metadata: Metadata = {
  title: 'Profil Lengkap Lembaga | SMPN 5 Cibeber',
  description:
    'Profil resmi SMP Negeri 5 Cibeber: sejarah pendirian, visi misi, arah kebijakan pendidikan, direktori dewan guru, dan data pokok satuan pendidikan.',
};

export default async function ProfilPage() {
  const settings = await getWebSettings();

  const portalCards = [
    {
      title: 'Sejarah Sekolah',
      subtitle: 'Jejak Langkah & Kiprah',
      desc: 'Mengenal perjalanan dedikasi para tokoh masyarakat dan pemerintah mendirikan sarana belajar mandiri di Warungbanten hingga era modern.',
      image: '/assets/gedung-smpn5cibeber.jpg',
      href: '/profil/sejarah',
      cta: 'Baca Sejarah Lengkap',
      badge: 'Jejak Langkah',
      icon: HourglassHigh,
    },
    {
      title: 'Visi & Misi',
      subtitle: 'Cita-Cita & Arah Kebijakan',
      desc: 'Landasan filosofis, 4 pilar insan pembelajar unggul, serta 6 misi strategis pembentukan karakter berakhlak mulia dan terampil digital.',
      image: '/assets/lapangan-smpn5cibeber.jpg',
      href: '/profil/visi-misi',
      cta: 'Pelajari Visi & Misi',
      badge: 'Landasan Resmi',
      icon: Target,
    },
    {
      title: 'Dewan Guru & Staf',
      subtitle: 'Pendidik Profesional',
      desc: 'Direktori lengkap 12+ pendidik dan tenaga kependidikan berkualifikasi S1/S2 yang membimbing dan mendampingi potensi siswa.',
      image: '/assets/dewan-guru-smpn5cibeber.jpg',
      href: '/profil/guru',
      cta: 'Lihat Direktori Guru',
      badge: 'Tenaga Pendidik',
      icon: Users,
    },
  ];

  const highlights = [
    {
      title: 'Akreditasi B (Baik)',
      desc: 'Diakui resmi oleh Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) dengan standar mutu pendidikan teruji.',
    },
    {
      title: 'Kurikulum Merdeka',
      desc: 'Pembelajaran aktif yang berpusat pada minat bakat anak dan penguatan karakter Profil Pelajar Pancasila.',
    },
    {
      title: 'Berwawasan Adiwiyata',
      desc: 'Lingkungan sekolah asri, bersih, hijau, dan menanamkan kepedulian kelestarian alam pegunungan Banten Selatan.',
    },
    {
      title: 'Literasi & TIK Digital',
      desc: 'Dilengkapi laboratorium komputer dan sistem absensi serta e-learning terpadu untuk kesiapan era teknologi.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner Profil — Background Foto Lapangan & Panggung Sekolah */}
      <section className="relative overflow-hidden text-white py-16 md:py-22 border-b border-emerald-950/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/assets/lapangan-smpn5cibeber.jpg"
            alt="Lapangan Upacara dan Panggung SMPN 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/78 via-[#1E5631]/68 to-[#143e22]/88" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/25 to-emerald-950/50" />
        </div>

        <div className="container-site relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-amber-300 shadow-sm">
            <ShieldCheck size={16} weight="fill" />
            <span>Pusat Informasi Lembaga</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Profil SMPN 5 Cibeber
          </h1>

          <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto font-medium drop-shadow-sm leading-relaxed">
            Mengenal lebih dekat sejarah pendirian, visi misi, arah pendidikan, serta jajaran pendidik berdedikasi di SMP Negeri 5 Cibeber, Kabupaten Lebak, Banten.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 font-mono text-white font-semibold shadow-xs">
              NPSN: {settings.school_npsn ?? '20607865'}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/25 backdrop-blur-md text-white border border-white/35 font-bold shadow-xs">
              Akreditasi: {settings.school_accreditation ?? 'B'} (BAN-S/M)
            </span>
          </div>
        </div>
      </section>

      {/* 3 Portal Halaman Utama (Sejarah, Visi Misi, Dewan Guru) */}
      <section className="section-padding">
        <div className="container-site max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1E5631]">
              Pilar Informasi Lembaga
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
              Eksplorasi Profil Sekolah
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pilih rubrik informasi di bawah untuk melihat rincian mendalam mengenai sejarah, visi misi, maupun direktori dewan guru kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portalCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Gambar Banner Kartu */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1E5631] text-[11px] font-bold shadow-xs">
                          {card.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-xs text-emerald-200 font-semibold">
                          {card.subtitle}
                        </p>
                        <h3 className="text-lg font-extrabold leading-tight">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    {/* Deskripsi */}
                    <div className="p-6 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="p-6 pt-0">
                    <Link
                      href={card.href}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1E5631] text-white hover:bg-emerald-800 text-xs font-bold transition-all shadow-xs group-hover:shadow-md"
                    >
                      <span>{card.cta}</span>
                      <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sekilas 4 Nilai Keunggulan Sekolah */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1E5631] text-xs font-bold">
                <Sparkle size={14} weight="fill" />
                Standar &amp; Keunggulan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E5631] tracking-tight">
                Komitmen Mutu Pembelajaran
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all space-y-2"
                >
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-[#1E5631] flex items-center justify-center font-bold text-sm shadow-xs">
                    0{i + 1}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {h.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Pokok Satuan Pendidikan (Tabel Identitas Resmi) */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200/70 pb-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-[#1E5631] flex items-center justify-center shrink-0 shadow-xs">
                <Building size={22} weight="duotone" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1E5631]">
                  Identitas Legalitas Resmi
                </p>
                <h3 className="text-xl font-extrabold text-[#1E293B]">
                  Data Pokok Satuan Pendidikan
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Nama Resmi Sekolah</span>
                <span className="font-bold text-slate-800">{settings.school_name || 'SMP Negeri 5 Cibeber'}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Nomor Pokok Sekolah Nasional (NPSN)</span>
                <span className="font-mono font-bold text-slate-800">{settings.school_npsn || '20607865'}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Bentuk Pendidikan</span>
                <span className="font-bold text-slate-800">Sekolah Menengah Pertama (SMP)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Status Sekolah</span>
                <span className="font-bold text-emerald-800">Negeri (Pemerintah Daerah)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Status Akreditasi</span>
                <span className="font-bold text-emerald-800">{settings.school_accreditation || 'B'} (BAN-S/M)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Kurikulum Operasional</span>
                <span className="font-bold text-slate-800">Kurikulum Merdeka</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 md:col-span-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="text-slate-500 font-medium">Alamat Sekolah</span>
                <span className="font-medium text-slate-800 sm:text-right">
                  {settings.school_address || 'Jl. Raya Cikotok-Pasirkuray Km.05, Warungbanten, Cibeber, Lebak, Banten 42394'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
