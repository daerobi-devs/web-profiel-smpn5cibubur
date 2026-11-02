import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { getStaffList, getWebSettings } from '@/lib/supabaseData';
import { TeacherDirectory } from '@/components/ui/TeacherDirectory';

export const metadata: Metadata = {
  title: 'Direktori Dewan Guru & Tenaga Kependidikan | SMP Negeri 5 Cibeber',
  description:
    'Daftar kepala sekolah, wakil kepala sekolah, guru mata pelajaran, dan tenaga kependidikan di SMP Negeri 5 Cibeber, Kabupaten Lebak, Banten.',
};

export default async function GuruPage() {
  const [staffList, settings] = await Promise.all([
    getStaffList(),
    getWebSettings(),
  ]);

  const bannerImage = settings.banner_page_guru || '/assets/dewan-guru-smpn5cibeber.jpg';

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Header Halaman Editorial Rata Kiri (Tanpa Glass Pill Berulang) */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-slate-950">
          <Image
            src={bannerImage}
            alt="Dewan Guru dan Tenaga Kependidikan SMPN 5 Cibeber"
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
            <span className="text-white font-semibold">Dewan Guru &amp; Staf</span>
          </nav>

          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Dewan Guru &amp; Tenaga Kependidikan
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mt-2.5 leading-relaxed">
            Susunan pimpinan sekolah, pendidik mata pelajaran, serta tenaga kependidikan di SMP Negeri 5 Cibeber ({staffList.length} personel terdaftar).
          </p>
        </div>
      </section>

      {/* Konten Direktori Pendidik */}
      <section className="section-padding">
        <div className="container-site max-w-6xl mx-auto space-y-12">
          <TeacherDirectory initialStaff={staffList} />

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
              <Link href="/profil/visi-misi" className="inline-flex items-center gap-1.5 hover:text-[#164325]">
                <span>Visi, Misi &amp; Tujuan</span>
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
