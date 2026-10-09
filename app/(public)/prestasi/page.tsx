import Image from 'next/image';
import Link from 'next/link';
import { getActiveAchievements, getWebSettings } from '@/lib/supabaseData';
import { Trophy } from '@phosphor-icons/react/dist/ssr';
import PrestasiArticleList from '@/components/ui/PrestasiArticleList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prestasi & Kejuaraan Siswa — SMPN 5 Cibeber',
  description: 'Daftar raihan juara, liputan penghargaan, dan rekam prestasi akademik serta non-akademik siswa SMPN 5 Cibeber.',
};

export default async function PrestasiPage() {
  const [rawAchievements, settings] = await Promise.all([
    getActiveAchievements(),
    getWebSettings()
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
    <div>
      {/* Hero Banner Prestasi — Background Foto Dinamis dengan Tint Hijau Almamater */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={bannerImage}
            alt="Prestasi Siswa SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
          {/* Lapisan Hijau Diturunkan Opasitasnya agar Foto Siswa Terlihat Nyata & Berwarna */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/78 via-[#1E5631]/65 to-[#143e22]/88" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/55" />
        </div>

        <div className="container-site relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-amber-300 shadow-sm">
            <Trophy size={16} weight="fill" />
            <span>Rekam Jejak Prestasi Siswa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Prestasi &amp; Kejuaraan Siswa
          </h1>

          <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Bukti nyata dedikasi belajar, bakat istimewa, serta bimbingan dewan guru dalam mengantarkan siswa-siswi SMPN 5 Cibeber meraih kejuaraan di berbagai tingkatan.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-2.5 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold shadow-xs">
              {achievements.length} Total Penghargaan
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-amber-300 font-semibold shadow-xs">
              Dokumentasi {years.length} Tahun Terakhir
            </span>
            <Link
              href="/ekstrakurikuler"
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/90 hover:bg-amber-500 text-slate-950 font-bold shadow-xs transition-colors"
            >
              Lihat Ekstrakurikuler Siswa &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Konten Prestasi Siswa — Direct Read Editorial Hall of Fame */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-site">
          <PrestasiArticleList achievements={achievements} years={years} />
        </div>
      </section>
    </div>
  );
}
