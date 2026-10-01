import Link from 'next/link';
import Image from 'next/image';
import { formatDateShort } from '@/lib/utils';
import {
  ArrowRight,
  Newspaper,
  Buildings,
  Trophy,
  GraduationCap,
  Sparkle,
  CalendarBlank,
  Quotes,
} from '@phosphor-icons/react/dist/ssr';
import HomeEkskulShowcase from '@/components/ui/HomeEkskulShowcase';
import HomeLocationMap from '@/components/ui/HomeLocationMap';
import AchievementCarousel from '@/components/ui/AchievementCarousel';
import HomeStatsCounter from '@/components/ui/HomeStatsCounter';
import HeroBackgroundSlider from '@/components/ui/HeroBackgroundSlider';
import {
  ScrollFadeUp,
  ScrollFadeScale,
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
  title: 'SMPN 5 Cibeber — The Inspiring School of Cibeber',
  description:
    'Website resmi SMP Negeri 5 Cibeber, Kabupaten Lebak, Provinsi Banten. Sekolah berkarakter, asri, berwawasan lingkungan, dan berprestasi dengan Kurikulum Merdeka.',
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
  const schoolTagline = settings.school_tagline ?? 'The Inspiring School of Cibeber';
  const schoolSubdesc = settings.school_subdescription ?? 'Lembaga Pendidikan Menengah Negeri yang Berfokus pada Pembentukan Budi Pekerti, Keunggulan Akademik, dan Kelestarian Lingkungan di Kabupaten Lebak, Provinsi Banten';
  const address = settings.school_address ?? 'Jl. Raya Cikotok-Pasirkuray Km.05, Warungbanten, Kec. Cibeber, Kabupaten Lebak, Provinsi Banten 42394';
  const mapsQuery = encodeURIComponent(`${schoolName}, ${address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="bg-[#F8FAFC] text-[#1E293B]">
      {/* =========================================================
          1. HERO SECTION (INSTITUTIONAL PRESTIGE & FOTO ASLI KAMPUS)
          ========================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/80 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36 flex items-center justify-center">
        {/* Hero Background Slider Dinamis dari Supabase */}
        <HeroBackgroundSlider slides={heroSlides} />

        <div className="container-site relative z-10 text-center max-w-4xl mx-auto">
          {/* Centered School Logo */}
          <ScrollFadeScale delay={0.1} duration={0.8}>
            <div className="relative w-24 h-28 sm:w-32 sm:h-36 md:w-36 md:h-40 mx-auto drop-shadow-[0_4px_16px_rgba(255,255,255,0.95)] transition-transform hover:scale-105 duration-300">
              <Image
                src="/assets/logo-smpn5cibeber.png"
                alt="Logo Resmi SMPN 5 Cibeber"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 130px, 160px"
              />
            </div>
          </ScrollFadeScale>

          <ScrollFadeUp delay={0.2} duration={0.8} distance={20}>
            {/* Big Bold Institutional Typography — Tebal & Tegas dengan Halo Putih Murni Anti-Samar */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-wider uppercase mt-4 leading-tight [text-shadow:0_0_3px_#fff,0_0_10px_#fff,0_0_20px_#fff,0_2px_8px_rgba(255,255,255,0.95)]">
              {schoolName}
            </h1>

            {/* Golden Academic Serif Tagline */}
            <p className="font-serif-academic text-base sm:text-xl md:text-2xl font-black text-[#B45309] italic tracking-wide mt-1.5 sm:mt-2 [text-shadow:0_0_3px_#fff,0_0_10px_#fff,0_0_18px_#fff,0_2px_6px_rgba(255,255,255,0.95)]">
              &ldquo;{schoolTagline}&rdquo;
            </p>

            {/* Institutional Sub-description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-950 max-w-2xl mx-auto mt-3 leading-relaxed font-bold [text-shadow:0_0_3px_#fff,0_0_8px_#fff,0_0_14px_#fff,0_1px_6px_rgba(255,255,255,0.95)]">
              {schoolSubdesc}
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* =========================================================
          2. FLOATING METRIC COUNTER BAR (ANIMATED STATS - BSJ STYLE)
          ========================================================= */}
      <HomeStatsCounter
        accreditation={accreditation}
        staffCount={staffCount}
        achievementCount={achievementCount}
      />

      {/* =========================================================
          3. KEPALA SEKOLAH WELCOME NOTE (PREMIUM EDITORIAL PULL-QUOTE CARD)
          ========================================================= */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-[#F1F5F9] border-b border-slate-200/80">
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto">
            {/* Foto Kepala Sekolah dengan Gradient Overlay & Badge */}
            <ScrollFadeScale delay={0.08} duration={0.8} className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60">
                <Image
                  src={settings.headmaster_image || '/assets/kepala-sekolah.jpg'}
                  alt={settings.headmaster_name || 'Drs. H. Ahmad Fauzi, M.Pd.'}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 280px, 340px"
                />
                {/* Dark Gradient Overlay & Identitas */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-5 sm:p-6">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider inline-block mb-1.5 w-fit shadow-xs">
                    Pimpinan Sekolah
                  </span>
                  <h4 className="text-white font-bold text-base sm:text-lg leading-tight drop-shadow-sm">
                    {settings.headmaster_name || 'Drs. H. Ahmad Fauzi, M.Pd.'}
                  </h4>
                  <p className="text-emerald-300 text-xs font-medium mt-0.5">
                    Kepala SMPN 5 Cibeber
                  </p>
                  <p className="text-slate-300 text-[10px] font-mono mt-0.5">
                    NIP. {settings.headmaster_nip || '196805121994031001'}
                  </p>
                </div>
              </div>
            </ScrollFadeScale>

            {/* Pure White Card: Pesan Kepemimpinan */}
            <ScrollFadeUp delay={0.18} duration={0.8} className="lg:col-span-7 flex flex-col">
              <div className="card p-6 sm:p-8 lg:p-10 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex-1 flex flex-col justify-between">
                <div>
                  {/* Eyebrow Label */}
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D97706] mb-3">
                    <Quotes size={15} weight="fill" className="text-[#D97706]" />
                    <span>Pesan Kepemimpinan</span>
                  </div>

                  {/* Serif Academic Pull Quote */}
                  <blockquote className="font-serif-academic text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-[#1E5631] italic leading-relaxed">
                    &ldquo;Pendidikan sejati bukan sekadar menorehkan angka di atas kertas, melainkan bagaimana menumbuhkan budi pekerti, kejujuran pikiran, serta rasa hormat pada sesama dan kelestarian alam.&rdquo;
                  </blockquote>
                </div>

                {/* Footer Identitas Kepala Sekolah */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-sm sm:text-base">
                      {settings.headmaster_name || 'Drs. H. Ahmad Fauzi, M.Pd.'}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      Kepala SMP Negeri 5 Cibeber &bull; Kab. Lebak, Banten
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. BERITA & WARTA RESMI (ACADEMIC JOURNAL - BENTLEY STYLE)
          ========================================================= */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
        <div className="container-site relative z-10">
          <ScrollFadeUp delay={0.05} duration={0.7}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#D97706] mb-1">
                  <span>Warta &bull; Risalah &bull; Publikasi</span>
                </div>
                <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E5631] tracking-tight">
                  Kabar &amp; Warta Resmi Sekolah
                </h2>
              </div>
              <Link
                href="/berita"
                className="shrink-0 text-xs sm:text-sm font-bold text-[#1E5631] hover:text-[#164325] inline-flex items-center gap-1.5 transition-colors group"
              >
                <span>Arsip Berita &amp; Artikel Lengkap</span>
                <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollFadeUp>

          {latestArticles.length === 0 ? (
            <div className="card text-center py-16 bg-white border border-slate-200/80 rounded-2xl">
              <Newspaper size={44} className="mx-auto text-slate-300 mb-3" />
              <p className="font-serif-academic font-bold text-slate-700 text-base">Belum Ada Warta Diterbitkan</p>
              <p className="text-xs text-slate-500 mt-1">Kunjungi kembali dalam waktu dekat untuk informasi terkini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Kolom Kiri: Berita Utama Unggulan (7 Kolom) */}
              {latestArticles[0] && (
                <ScrollFadeUp delay={0.12} duration={0.75} className="lg:col-span-7">
                  <Link
                    href={`/berita/${latestArticles[0].slug}`}
                    className="group block card overflow-hidden bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                      {latestArticles[0].imageUrl ? (
                        <Image
                          src={latestArticles[0].imageUrl}
                          alt={latestArticles[0].title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Newspaper size={56} weight="light" />
                        </div>
                      )}
                      <div className="absolute top-3.5 left-3.5">
                        <span className="badge-academic px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#1E5631] text-white shadow-sm">
                          {latestArticles[0].category || 'BERITA UTAMA'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-7 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <CalendarBlank size={14} />
                        <span>{formatDateShort(latestArticles[0].publishedAt ?? latestArticles[0].createdAt)}</span>
                        <span>&bull;</span>
                        <span>{latestArticles[0].author || 'Humas SMPN 5 Cibeber'}</span>
                      </div>
                      <h3 className="font-serif-academic text-lg sm:text-2xl font-bold text-[#1E293B] group-hover:text-[#1E5631] transition-colors leading-snug">
                        {latestArticles[0].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {latestArticles[0].excerpt}
                      </p>
                      <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#1E5631] group-hover:gap-2.5 transition-all">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight size={13} weight="bold" />
                      </div>
                    </div>
                  </Link>
                </ScrollFadeUp>
              )}

              {/* Kolom Kanan: Berita Kronologis Bertingkat (5 Kolom) */}
              <ScrollFadeUp delay={0.2} duration={0.75} className="lg:col-span-5 space-y-3 sm:space-y-4">
                <div className="px-1 pb-1 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Rilis Terkini</span>
                  <span>Kronologi</span>
                </div>

                <div className="divide-y divide-slate-200/80 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                  {latestArticles.slice(1, 4).map((article) => (
                    <Link
                      key={article.id}
                      href={`/berita/${article.slug}`}
                      className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-slate-50/80 transition-colors group"
                    >
                      <div className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-xl sm:rounded-2xl bg-slate-100 shrink-0 overflow-hidden border border-slate-100">
                        {article.imageUrl ? (
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            sizes="90px"
                            className="object-cover group-hover:scale-108 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Newspaper size={24} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                          <CalendarBlank size={12} />
                          <span>{formatDateShort(article.publishedAt ?? article.createdAt)}</span>
                        </div>
                        <h4 className="font-serif-academic text-sm sm:text-base font-bold text-[#1E293B] group-hover:text-[#1E5631] transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                        <p className="hidden sm:block text-[11px] text-slate-500 line-clamp-1">
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
          5. PRESTASI SISWA & PENGHARGAAN (HORIZONTAL SCROLL STREAM)
          ========================================================= */}
      {achievements.length > 0 && (
        <section className="relative overflow-hidden section-padding border-y border-emerald-950/30">
          {/* Background Foto Asli Tim Marching Band SMPN 5 Cibeber */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/assets/prestasi-siswa-smpn5cibeber.jpg"
              alt="Tim Marching Band dan Siswa Berprestasi SMPN 5 Cibeber"
              fill
              className="object-cover object-[center_40%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/78 via-[#1E5631]/65 to-[#143e22]/88" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/55" />
          </div>

          <div className="container-site relative z-10">
            <AchievementCarousel achievements={achievements} />
          </div>
        </section>
      )}

      {/* =========================================================
          6. FASILITAS KAMPUS LENGKAP
          ========================================================= */}
      {facilities.length > 0 && (
        <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
          <div className="container-site relative z-10">
            <ScrollFadeUp delay={0.05} duration={0.7}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                    Sarana &bull; Prasarana &bull; Laboratorium
                  </span>
                  <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E5631] tracking-tight mt-1">
                    Lingkungan &amp; Fasilitas Pembelajaran
                  </h2>
                </div>
                <Link
                  href="/fasilitas"
                  className="text-xs sm:text-sm font-bold text-[#1E5631] hover:text-[#164325] inline-flex items-center gap-1.5 transition-colors group"
                >
                  <span>Jelajahi Seluruh Fasilitas Kampus</span>
                  <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollFadeUp>

            <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" stagger={0.12} delay={0.1}>
              {facilities.map((facility) => (
                <ScrollStaggerItem key={facility.id} className="flex">
                  <div
                    className="card overflow-hidden bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group w-full"
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                      {facility.imageUrl ? (
                        <Image
                          src={facility.imageUrl}
                          alt={facility.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Buildings size={40} weight="light" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif-academic font-bold text-base text-[#1E293B] group-hover:text-[#1E5631] transition-colors leading-snug">
                          {facility.name}
                        </h3>
                        {facility.description && (
                          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {facility.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
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
          8. LOKASI & PETA KAMPUS SEKOLAH (GOOGLE MAPS & AKSESIBILITAS)
          ========================================================= */}
      <HomeLocationMap settings={settings} />
    </div>
  );
}
