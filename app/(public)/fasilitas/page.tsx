import Image from 'next/image';
import Link from 'next/link';
import { getActiveFacilities, getWebSettings } from '@/lib/supabaseData';
import { Buildings } from '@phosphor-icons/react/dist/ssr';
import { getCategoryLabel } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fasilitas & Sarana Prasarana | SMP Negeri 5 Cibeber',
  description:
    'Daftar ruang kelas, perpustakaan, laboratorium komputer, lapangan olahraga, dan sarana penunjang pembelajaran di SMP Negeri 5 Cibeber.',
};

export default async function FasilitasPage() {
  const [rawFacilities, settings] = await Promise.all([
    getActiveFacilities(),
    getWebSettings(),
  ]);

  const bannerImage = settings.banner_page_fasilitas || '/assets/lapangan-smpn5cibeber.jpg';

  const facilities = rawFacilities.map((f) => ({
    ...f,
    imageUrl: f.image_url,
  }));

  const categories = Array.from(new Set(facilities.map((f) => f.category)));

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Header Halaman Editorial Rata Kiri */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-slate-950">
          <Image
            src={bannerImage}
            alt="Sarana dan Prasarana SMP Negeri 5 Cibeber"
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
            <span className="text-white font-semibold">Fasilitas Sekolah</span>
          </nav>

          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Fasilitas &amp; Sarana Pembelajaran
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mt-2.5 leading-relaxed">
            Sarana ruang belajar, laboratorium, perpustakaan, serta fasilitas olahraga dan ibadah di lingkungan SMP Negeri 5 Cibeber.
          </p>
        </div>
      </section>

      {/* Katalog Sarana Sekolah (Tanpa Hover Palsu pada Elemen Non-Klik) */}
      <section className="section-padding">
        <div className="container-site max-w-6xl mx-auto">
          {facilities.length === 0 ? (
            <div className="p-14 text-center space-y-2 bg-white border border-slate-200/90 rounded-xl">
              <Buildings size={36} className="text-slate-300 mx-auto" />
              <p className="text-slate-600 text-sm font-semibold">Belum ada data fasilitas tercatat.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map((category) => {
                const items = facilities.filter((f) => f.category === category);
                return (
                  <div key={category} className="space-y-5">
                    <div className="flex items-baseline justify-between pb-3 border-b border-slate-200">
                      <h2 className="font-serif-academic text-xl sm:text-2xl font-bold text-slate-900">
                        {getCategoryLabel(category)}
                      </h2>
                      <span className="text-xs font-mono text-slate-500 tabular-nums">
                        {items.length} sarana
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((facility) => (
                        <figure
                          key={facility.id}
                          className="overflow-hidden bg-white border border-slate-200/90 rounded-xl flex flex-col"
                        >
                          {facility.imageUrl ? (
                            <div className="aspect-[16/10] relative bg-slate-100 overflow-hidden border-b border-slate-200/70">
                              <Image
                                src={facility.imageUrl}
                                alt={facility.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>
                          ) : (
                            <div className="aspect-[16/10] bg-slate-100 flex items-center justify-center text-slate-400 border-b border-slate-200/70">
                              <Buildings size={36} weight="light" />
                            </div>
                          )}
                          <figcaption className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-base text-slate-900 leading-snug">
                                {facility.name}
                              </h3>
                              {facility.description && (
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                                  {facility.description}
                                </p>
                              )}
                            </div>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
