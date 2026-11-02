import Link from 'next/link';
import Image from 'next/image';
import { formatDateShort } from '@/lib/utils';
import {
  ArrowRight,
  Newspaper,
  Buildings,
} from '@phosphor-icons/react/dist/ssr';
import HomeEkskulShowcase from '@/components/ui/HomeEkskulShowcase';
import HomeLocationMap from '@/components/ui/HomeLocationMap';
import AchievementCarousel from '@/components/ui/AchievementCarousel';
import HomeStatsCounter from '@/components/ui/HomeStatsCounter';
import HeroBackgroundSlider from '@/components/ui/HeroBackgroundSlider';
import {
  ScrollFadeUp,
  ScrollStaggerContainer,
  ScrollStaggerItem,
} from '@/components/ui/motion';
import {
  getWebSettings,
  getHeroSlides,
  getPublishedArticles,
  getActiveFacilities,
  getActiveAchievements,
  getActiveEkskul,
} from '@/lib/supabaseData';
import { defaultStaffList } from '@/lib/staffData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMPN 5 Cibeber | Website Resmi Satuan Pendidikan Kab. Lebak',
  description:
    'Website resmi SMP Negeri 5 Cibeber, Kabupaten Lebak, Provinsi Banten. Satuan pendidikan menengah pertama negeri di Desa Warungbanten, Kecamatan Cibeber.',
};

async function getHomeData() {
  const [
    settings,
    heroSlides,
    articles,
    facilities,
    achievements,
    ekskul,
  ] = await Promise.all([
    getWebSettings(),
    getHeroSlides(),
    getPublishedArticles(),
    getActiveFacilities(),
    getActiveAchievements(),
    getActiveEkskul(),
  ]);

  // Normalize articles for component props (support camelCase and snake_case)
  const normalizedArticles = articles.map((a) => ({
    ...a,
    imageUrl: a.image_url,
    publishedAt: a.published_at ? new Date(a.published_at) : null,
    createdAt: new Date(a.created_at),
  }));

  // Normalize facilities
  const normalizedFacilities = facilities.map((f) => ({
    ...f,
    imageUrl: f.image_url,
  }));

  // Normalize achievements
  const normalizedAchievements = achievements.map((ac) => ({
    id: ac.id,
    title: ac.title,
    description: ac.description ?? null,
    level: ac.level,
    year: ac.year,
    imageUrl: ac.image_url ?? null,
  }));

  // Hitung jumlah guru/staf dinamis dari settings.school_staff_data (Zero extra DB query, tidak membebani server)
  let dynamicStaffCount = defaultStaffList.length;
  if (settings.school_staff_data) {
    try {
      const parsed = JSON.parse(settings.school_staff_data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dynamicStaffCount = parsed.length;
      }
    } catch {
      dynamicStaffCount = defaultStaffList.length;
    }
  }

  return {
    settings,
    heroSlides,
    latestArticles: normalizedArticles.slice(0, 4),
    facilities: normalizedFacilities.slice(0, 4),
    achievements: normalizedAchievements.slice(0, 12),
    ekskul,
    staffCount: dynamicStaffCount,
    articleCount: articles.length,
    achievementCount: achievements.length,
  };
}

export default async function HomePage() {
  const {
    settings,
    heroSlides,
    latestArticles,
    facilities,
    achievements,
    ekskul,
    staffCount,
    achievementCount,
  } = await getHomeData();

  const npsn = settings.school_npsn ?? '20607865';
  const accreditation = settings.school_accreditation ?? 'B';
  const schoolName = settings.school_name ?? 'SMP NEGERI 5 CIBEBER';
  const schoolSubdesc =
    settings.school_subdescription ||
    'Sekolah Menengah Pertama Negeri di bawah naungan Dinas Pendidikan Kabupaten Lebak, berlokasi di Desa Warungbanten, Kecamatan Cibeber, Provinsi Banten.';

  const headmasterWelcome =
    settings.headmaster_welcome ||
    `Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera, Sampurasun.

Selamat datang di portal informasi resmi SMP Negeri 5 Cibeber. Sebagai satuan pendidikan negeri di wilayah Desa Warungbanten, Kecamatan Cibeber, Kabupaten Lebak, kami berkomitmen menyelenggarakan layanan pendidikan yang bermutu, inklusif, dan berakar kuat pada nilai budi pekerti luhur.

Melalui penerapan Kurikulum Merdeka yang didukung suasana alam pedesaan yang asri, tenang, dan sejuk, kami mendampingi setiap peserta didik untuk menumbuhkan potensi terbaiknya, baik dalam capaian akademik, kepanduan Pramuka, pelestarian seni budaya daerah, maupun kepedulian nyata terhadap kelestarian lingkungan hidup.`;

  return (
    <div className="bg-[#F8FAFC] text-[#1E293B]">
      {/* =========================================================
          1. HERO SECTION (IDENTITAS RESMI & DOKUMENTASI SEKOLAH)
          ========================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/80 min-h-[70vh] sm:min-h-[76vh] lg:min-h-[82vh] py-20 sm:py-28 lg:py-36 flex items-center justify-center">
        <HeroBackgroundSlider slides={heroSlides} />

        <div className="container-site relative z-10 text-center max-w-4xl mx-auto">
          <div className="relative w-24 h-28 sm:w-32 sm:h-36 md:w-36 md:h-40 mx-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
            <Image
              src="/assets/logo-smpn5cibeber.png"
              alt="Logo Resmi SMPN 5 Cibeber"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 130px, 160px"
            />
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wider uppercase mt-5 leading-tight drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]">
            {schoolName}
          </h1>

          <p className="text-[13px] sm:text-sm md:text-base text-slate-100/95 max-w-2xl mx-auto mt-4 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] px-2 sm:px-0">
            {schoolSubdesc}
          </p>
        </div>
      </section>

      {/* =========================================================
          2. ARCHITECTURAL DATA LEDGER (FAKTA KELEMBAGAAN)
          ========================================================= */}
      <HomeStatsCounter
        accreditation={accreditation}
        staffCount={staffCount}
        achievementCount={achievementCount}
        npsn={npsn}
      />

      {/* =========================================================
          3. SAMBUTAN KEPALA SEKOLAH (UNIFIED EDITORIAL SPREAD)
          ========================================================= */}
      <section className="relative overflow-hidden section-padding bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="container-site relative z-10">
          <ScrollFadeUp delay={0.05} duration={0.65}>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Kolom Kiri: Potret Resmi Tanpa Teks Menumpuk di Wajah/Badan */}
              <div className="lg:col-span-4 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[400px] bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200/80">
                <Image
                  src={settings.headmaster_image || '/assets/kepala-sekolah.jpg'}
                  alt={settings.headmaster_name || 'Adang Restuwardani, S.Pd'}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 340px"
                />
              </div>

              {/* Kolom Kanan: Pengantar Pimpinan & Identitas Tunggal */}
              <div className="lg:col-span-8 p-6 sm:p-8 lg:p-11 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1E5631]">
                    Sambutan Kepala Sekolah
                  </p>

                  <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                    Selamat Datang di SMP Negeri 5 Cibeber
                  </h2>

                  <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-line pt-1">
                    {headmasterWelcome}
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900 text-sm sm:text-base">
                      {settings.headmaster_name || 'Adang Restuwardani, S.Pd'}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                      Kepala SMP Negeri 5 Cibeber &middot;{' '}
                      {settings.headmaster_nip
                        ? `NIP. ${settings.headmaster_nip}`
                        : 'NIP. 19680512 199412 1 002'}
                    </p>
                  </div>

                  <Link
                    href="/profil"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E5631] hover:text-[#164325] transition-colors shrink-0 group"
                  >
                    <span>Profil Lengkap Sekolah</span>
                    <ArrowRight
                      size={13}
                      weight="bold"
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* =========================================================
          4. KABAR & KEGIATAN TERBARU (TANPA EYEBROW & TANPA PILL DI ATAS FOTO)
          ========================================================= */}
      <section className="relative overflow-hidden section-padding bg-white">
        <div className="container-site relative z-10">
          <ScrollFadeUp delay={0.05} duration={0.6}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Kabar &amp; Kegiatan Terbaru
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                  Dokumentasi kegiatan akademik, kesiswaan, dan pengumuman resmi sekolah.
                </p>
              </div>
              <Link
                href="/berita"
                className="shrink-0 text-xs sm:text-sm font-bold text-[#1E5631] hover:text-[#164325] inline-flex items-center gap-1.5 transition-colors group"
              >
                <span>Arsip Berita Lengkap</span>
                <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollFadeUp>

          {latestArticles.length === 0 ? (
            <div className="text-center py-14 bg-[#F8FAFC] border border-slate-200/80 rounded-xl">
              <Newspaper size={40} className="mx-auto text-slate-300 mb-2.5" />
              <p className="font-bold text-slate-700 text-sm">Belum Ada Warta Diterbitkan</p>
              <p className="text-xs text-slate-500 mt-1">Kunjungi kembali dalam waktu dekat untuk informasi terbaru.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Kolom Kiri: Laporan Utama (7 Kolom) */}
              {latestArticles[0] && (
                <ScrollFadeUp delay={0.08} duration={0.65} className="lg:col-span-7">
                  <Link
                    href={`/berita/${latestArticles[0].slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200/80">
                      {latestArticles[0].imageUrl ? (
                        <Image
                          src={latestArticles[0].imageUrl}
                          alt={latestArticles[0].title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Newspaper size={52} weight="light" />
                        </div>
                      )}
                    </div>

                    <div className="pt-4 sm:pt-5 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 tabular-nums">
                        <span className="text-[#1E5631] font-bold uppercase tracking-wider">
                          {latestArticles[0].category || 'Warta Sekolah'}
                        </span>
                        <span>&middot;</span>
                        <span>{formatDateShort(latestArticles[0].publishedAt ?? latestArticles[0].createdAt)}</span>
                        <span>&middot;</span>
                        <span>{latestArticles[0].author || 'Humas SMPN 5 Cibeber'}</span>
                      </div>

                      <h3 className="text-lg sm:text-2xl font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug">
                        {latestArticles[0].title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {latestArticles[0].excerpt}
                      </p>
                    </div>
                  </Link>
                </ScrollFadeUp>
              )}

              {/* Kolom Kanan: Daftar Berita Terkini Tanpa Header Tabel Palsu (5 Kolom) */}
              <ScrollFadeUp delay={0.14} duration={0.65} className="lg:col-span-5">
                <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                  {latestArticles.slice(1, 4).map((article) => (
                    <Link
                      key={article.id}
                      href={`/berita/${article.slug}`}
                      className="py-4 sm:py-5 first:pt-4 last:pb-4 flex items-start gap-4 group"
                    >
                      <div className="relative w-20 h-20 sm:w-24 sm:h-20 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-200/70">
                        {article.imageUrl ? (
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            sizes="96px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Newspaper size={22} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 tabular-nums">
                          <span className="text-[#1E5631] font-bold uppercase tracking-wider">
                            {article.category || 'Berita'}
                          </span>
                          <span>&middot;</span>
                          <span>{formatDateShort(article.publishedAt ?? article.createdAt)}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                        <p className="hidden sm:block text-xs text-slate-500 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollFadeUp>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          5. PRESTASI SISWA & PENGHARGAAN
          ========================================================= */}
      {achievements.length > 0 && (
        <section className="relative overflow-hidden section-padding border-y border-emerald-950/30">
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/assets/piala-prestasi-smpn5cibeber.jpg"
              alt="Koleksi Piala Kejuaraan dan Piagam Prestasi Siswa SMPN 5 Cibeber"
              fill
              className="object-cover object-[center_50%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#133820]/90 via-[#164325]/85 to-[#0f2e1a]/95" />
          </div>

          <div className="container-site relative z-10">
            <AchievementCarousel achievements={achievements} />
          </div>
        </section>
      )}

      {/* =========================================================
          6. FASILITAS & RUANG BELAJAR (OPEN-CANVAS ARCHITECTURAL PLATES)
          ========================================================= */}
      {facilities.length > 0 && (
        <section className="relative overflow-hidden section-padding bg-[#F8FAFC]">
          <div className="container-site relative z-10">
            <ScrollFadeUp delay={0.05} duration={0.6}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
                <div>
                  <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                    Fasilitas &amp; Ruang Belajar
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                    Sarana prasarana penunjang kegiatan belajar mengajar di lingkungan sekolah.
                  </p>
                </div>
                <Link
                  href="/fasilitas"
                  className="text-xs sm:text-sm font-bold text-[#1E5631] hover:text-[#164325] inline-flex items-center gap-1.5 transition-colors group"
                >
                  <span>Seluruh Fasilitas Sekolah</span>
                  <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </ScrollFadeUp>

            {/* Open-Canvas Architectural Grid: Tanpa Bungkus Kartu Putih & Tanpa Hover Palsu */}
            <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7" stagger={0.08} delay={0.05}>
              {facilities.map((facility, idx) => (
                <ScrollStaggerItem key={facility.id}>
                  <figure className="flex flex-col">
                    <div className="relative aspect-[4/3] w-full bg-slate-200 rounded-xl overflow-hidden border border-slate-200/90">
                      {facility.imageUrl ? (
                        <Image
                          src={facility.imageUrl}
                          alt={facility.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Buildings size={36} weight="light" />
                        </div>
                      )}
                    </div>
                    <figcaption className="pt-3.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[11px] font-mono font-semibold text-slate-400 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-bold text-base text-slate-900 leading-snug">
                          {facility.name}
                        </h3>
                      </div>
                      {facility.description && (
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed pl-5">
                          {facility.description}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                </ScrollStaggerItem>
              ))}
            </ScrollStaggerContainer>
          </div>
        </section>
      )}

      {/* =========================================================
          7. EKSTRAKURIKULER & PEMBINAAN BAKAT SISWA
          ========================================================= */}
      <HomeEkskulShowcase items={ekskul} />

      {/* =========================================================
          8. LOKASI & AKSES SEKOLAH
          ========================================================= */}
      <HomeLocationMap settings={settings} />
    </div>
  );
}
