import Image from 'next/image';
import Link from 'next/link';
import { getActiveAchievements, getWebSettings } from '@/lib/supabaseData';
import PrestasiArticleList from '@/components/ui/PrestasiArticleList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prestasi & Penghargaan Siswa | SMP Negeri 5 Cibeber',
  description:
    'Daftar capaian kejuaraan dan penghargaan akademik maupun non-akademik peserta didik SMP Negeri 5 Cibeber.',
};

export default async function PrestasiPage() {
  const [rawAchievements, settings] = await Promise.all([
    getActiveAchievements(),
    getWebSettings(),
  ]);

  const bannerImage = settings.banner_page_prestasi || '/assets/prestasi-siswa-smpn5cibeber.jpg';

  const achievements = rawAchievements.map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description ?? null,
    level: a.level,
    year: a.year,
    imageUrl: a.image_url ?? null,
    galleryImages: a.gallery_images ?? null,
  }));

  const years = Array.from(new Set(achievements.map((a) => a.year))).sort((a, b) => b - a);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Header Halaman Editorial Rata Kiri */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-slate-950">
          <Image
            src={bannerImage}
            alt="Prestasi Siswa SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_40%]"
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
            <span className="text-white font-semibold">Prestasi Siswa</span>
          </nav>

          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Prestasi &amp; Penghargaan Siswa
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mt-2.5 leading-relaxed">
            Catatan capaian kejuaraan dan partisipasi peserta didik SMP Negeri 5 Cibeber pada ajang perlombaan akademik, olahraga, kepanduan, dan kesenian.
          </p>
        </div>
      </section>

      {/* Konten Arsip Prestasi */}
      <section className="section-padding">
        <div className="container-site max-w-6xl mx-auto">
          <PrestasiArticleList achievements={achievements} years={years} />
        </div>
      </section>
    </div>
  );
}
