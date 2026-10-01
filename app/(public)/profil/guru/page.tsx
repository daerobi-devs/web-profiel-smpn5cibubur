import Image from 'next/image';
import Link from 'next/link';
import {
  CaretRight,
  ShieldCheck,
  Users,
  Target,
  HourglassHigh,
  GraduationCap,
  Sparkle,
  BookOpen,
} from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { getStaffList } from '@/lib/supabaseData';
import { TeacherDirectory } from '@/components/ui/TeacherDirectory';

export const metadata: Metadata = {
  title: 'Direktori Dewan Guru & Tenaga Kependidikan | SMPN 5 Cibeber',
  description:
    'Daftar lengkap pendidik profesional dan tenaga kependidikan berdedikasi di SMP Negeri 5 Cibeber, Kabupaten Lebak, Banten.',
};

export default async function GuruPage() {
  const staffList = await getStaffList();
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner Dewan Guru */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/assets/dewan-guru-smpn5cibeber.jpg"
            alt="Dewan Guru dan Tenaga Kependidikan SMPN 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/82 via-[#1E5631]/72 to-[#143e22]/90" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/55" />
        </div>

        <div className="container-site relative z-10 max-w-4xl mx-auto text-center space-y-4">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-emerald-200">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <CaretRight size={12} weight="bold" />
            <Link href="/profil" className="hover:text-white transition-colors">
              Profil
            </Link>
            <CaretRight size={12} weight="bold" />
            <span className="text-white font-semibold">Dewan Guru</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-amber-300 shadow-xs">
            <Users size={16} weight="fill" />
            <span>Pendidik Profesional Berdedikasi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Dewan Guru &amp; Tenaga Pendidik
          </h1>

          <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto font-medium drop-shadow-xs leading-relaxed">
            Mengenal lebih dekat para guru inspiratif dan tenaga kependidikan yang mendampingi tumbuh kembang serta prestasi generasi penerus di SMPN 5 Cibeber.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold shadow-xs">
              Total: {staffList.length} Pendidik &amp; Staf
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/25 backdrop-blur-md text-white border border-white/35 font-bold shadow-xs">
              100% Kualifikasi S1/S2
            </span>
          </div>
        </div>
      </section>

      {/* Konten Direktori Interaktif */}
      <section className="section-padding">
        <div className="container-site max-w-6xl mx-auto space-y-12">
          {/* Komponen Interaktif Teacher Directory */}
          <TeacherDirectory initialStaff={staffList} />

          {/* Navigasi Cepat ke Halaman Terkait */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E5631] to-[#143e22] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-950/20">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-extrabold">
                Jelajahi Sejarah &amp; Visi Misi Sekolah
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Pahami landasan nilai, cita-cita, serta rekam jejak perjuangan SMPN 5 Cibeber.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/profil/sejarah"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1E5631] hover:bg-emerald-50 text-xs font-bold transition-all shadow-xs"
              >
                <HourglassHigh size={16} weight="bold" />
                <span>Sejarah Sekolah</span>
              </Link>
              <Link
                href="/profil/visi-misi"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold border border-white/20 transition-all shadow-xs"
              >
                <Target size={16} weight="bold" />
                <span>Visi &amp; Misi</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
