import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  CaretRight,
  ArrowLeft,
  Clock,
  MapPin,
  User,
  Trophy,
  Info,
  Images,
  VideoCamera,
  ChatCircleDots,
  Compass,
  ArrowSquareOut,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';
import { getEkskulBySlug, getActiveEkskul, getWebSettings } from '@/lib/supabaseData';
import { ekskulData, type EkskulItem } from '@/lib/ekskul-data';
import { extractYouTubeId, getYouTubeEmbedUrl } from '@/lib/youtubeUtils';
import EkskulGalleryGrid from '@/components/ui/EkskulGalleryGrid';
import EkskulVideoPlayer from '@/components/ui/EkskulVideoPlayer';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dbItem = await getEkskulBySlug(slug);
  const staticItem = ekskulData.find((e) => e.slug === slug || e.id === slug);
  const ekskul = dbItem || staticItem;

  if (!ekskul) {
    return {
      title: 'Ekstrakurikuler Tidak Ditemukan — SMPN 5 Cibeber',
    };
  }

  return {
    title: `${ekskul.name} — Profil Ekstrakurikuler SMPN 5 Cibeber`,
    description: ekskul.description?.slice(0, 160) || `Profil lengkap kegiatan ekstrakurikuler ${ekskul.name} di SMP Negeri 5 Cibeber.`,
  };
}

export default async function EkskulDetailPage({ params }: Props) {
  const { slug } = await params;

  const [dbItem, rawAllEkskul, settings] = await Promise.all([
    getEkskulBySlug(slug),
    getActiveEkskul(),
    getWebSettings(),
  ]);

  // Cari di database atau fallback ke data statis
  const staticItem = ekskulData.find((e) => e.slug === slug || e.id === slug);
  const rawItem = dbItem || staticItem;

  if (!rawItem) {
    notFound();
  }

  // Normalisasi data item
  const ekskul: EkskulItem = {
    id: rawItem.id,
    slug: (rawItem as any).slug || slug,
    name: rawItem.name,
    category: (rawItem as any).category || 'KEPANDUAN',
    categoryLabel: (rawItem as any).category_label || (rawItem as any).categoryLabel || 'Ekstrakurikuler',
    badge: rawItem.badge || 'Ekskul Resmi',
    motto: rawItem.motto || 'Berprestasi dan Berakhlak Mulia',
    description: rawItem.description || '',
    coach: rawItem.coach || 'Dewan Pembina',
    coachRole: 'Pembina & Pelatih Utama',
    schedule: rawItem.schedule || 'Sesuai Jadwal Mingguan',
    location: (rawItem as any).place || (rawItem as any).location || 'Kampus SMPN 5 Cibeber',
    memberCount: (rawItem as any).memberCount || '30+ Siswa',
    achievements: Array.isArray(rawItem.achievements)
      ? rawItem.achievements
      : typeof rawItem.achievements === 'string'
      ? (() => {
          try {
            const parsed = JSON.parse(rawItem.achievements);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })()
      : [],
    coverImage: (rawItem as any).cover_image || (rawItem as any).coverImage || '/assets/lapangan-smpn5cibeber.jpg',
    bannerImage: (rawItem as any).banner_image || (rawItem as any).bannerImage || (rawItem as any).cover_image || (rawItem as any).coverImage || '/assets/prestasi-siswa-smpn5cibeber.jpg',
    videoUrl: (rawItem as any).video_url || (rawItem as any).videoUrl || null,
    galleryImages: (() => {
      const raw = (rawItem as any).gallery_images ?? (rawItem as any).galleryImages;
      if (Array.isArray(raw)) return raw.filter(Boolean);
      if (typeof raw === 'string' && raw.trim()) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed.filter(Boolean);
        } catch {
          return raw.split('\n').map((s: string) => s.trim()).filter(Boolean);
        }
      }
      return [];
    })(),
    highlights: (rawItem as any).highlights || ['Pembinaan Karakter', 'Latihan Terstruktur'],
  };

  // Video YouTube
  const youtubeId = extractYouTubeId(ekskul.videoUrl);
  const embedUrl = youtubeId ? getYouTubeEmbedUrl(youtubeId, false) : null;

  // Ekskul lain untuk rekomendasi di sidebar
  const otherEkskuls = (rawAllEkskul.length > 0 ? rawAllEkskul : ekskulData)
    .filter((e) => (e as any).slug !== slug && e.id !== ekskul.id)
    .slice(0, 4);

  // WhatsApp Link Pembina
  const coachPhone = (rawItem as any).coach_phone || settings.school_whatsapp || '085281459726';
  const cleanPhone = coachPhone.replace(/[^0-9]/g, '');
  const waTarget = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone;
  const waMessage = encodeURIComponent(
    `Halo Pembina/Admin SMPN 5 Cibeber, saya ingin bertanya seputar pendaftaran dan jadwal ekstrakurikuler ${ekskul.name}.`
  );
  const waLink = `https://wa.me/${waTarget}?text=${waMessage}`;

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Hero Banner Ekstrakurikuler — Konsisten 100% dengan Halaman Induk & Prestasi */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/20">
        {/* Latar Belakang Foto Dinamis & Overlay Hijau Khas SMPN 5 Cibeber */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={ekskul.bannerImage || ekskul.coverImage}
            alt={`Banner Latar ${ekskul.name} SMPN 5 Cibeber`}
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          {/* Emerald Gradient Overlay Selaras */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/80 via-[#1E5631]/68 to-[#143e22]/90" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/55" />
        </div>

        <div className="container-site relative z-10 text-center space-y-4 max-w-4xl mx-auto">
          {/* Breadcrumb Navigation — Format Baku Konsisten */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-emerald-200 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <CaretRight size={12} weight="bold" />
            <Link href="/prestasi" className="hover:text-white transition-colors">
              Kesiswaan
            </Link>
            <CaretRight size={12} weight="bold" />
            <Link href="/ekstrakurikuler" className="hover:text-white transition-colors">
              Ekstrakurikuler
            </Link>
            <CaretRight size={12} weight="bold" />
            <span className="text-white font-semibold truncate max-w-[240px] sm:max-w-none">
              {ekskul.name}
            </span>
          </nav>

          {/* Badge Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-amber-300 shadow-sm">
            <span>{ekskul.categoryLabel} &bull; {ekskul.badge}</span>
          </div>

          {/* Big Bold Academic Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {ekskul.name}
          </h1>

          {/* Subtitle / Motto */}
          {ekskul.motto && (
            <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium italic">
              &ldquo;{ekskul.motto}&rdquo;
            </p>
          )}

          {/* Quick Action Badges & Info Pills */}
          <div className="pt-2 flex flex-wrap justify-center gap-2.5 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold shadow-xs inline-flex items-center gap-1.5">
              <Clock size={14} weight="bold" className="text-amber-300" />
              <span>{ekskul.schedule}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold shadow-xs inline-flex items-center gap-1.5">
              <MapPin size={14} weight="bold" className="text-amber-300" />
              <span>{ekskul.location}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-amber-300 font-semibold shadow-xs inline-flex items-center gap-1.5">
              <User size={14} weight="bold" />
              <span>{ekskul.coach}</span>
            </span>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/90 hover:bg-amber-500 text-slate-950 font-bold shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ChatCircleDots size={14} weight="bold" />
              <span>Tanya Pembina &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. KONTEN DETAIL 2 KOLOM (KIRI: KONTEN & VIDEO, KANAN: SIDEBAR)
          ========================================================= */}
      <section className="container-site pt-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =====================================================
              KOLOM UTAMA (8 KOLOM)
              ===================================================== */}
          <div className="lg:col-span-8 space-y-8">
            {/* Card 1: Visi Pembinaan, Uraian Kegiatan & Video Dokumentasi (Menyatu Mulus) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-300 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1E5631] flex items-center justify-center">
                  <Info size={18} weight="duotone" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Tentang &amp; Uraian Pembinaan
                  </h2>
                  <p className="text-xs text-slate-500">
                    Arah dan fokus pengembangan potensi peserta didik
                  </p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p className="whitespace-pre-line">
                  {ekskul.description}
                </p>
              </div>

              {/* Box Kutipan Slogan / Motto */}
              {ekskul.motto && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-amber-900">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                    Semboyan &amp; Nilai Dasar
                  </p>
                  <p className="font-serif-academic text-base sm:text-lg font-bold italic text-amber-950">
                    &ldquo;{ekskul.motto}&rdquo;
                  </p>
                </div>
              )}

              {/* Video Dokumentasi Terintegrasi Mulus di Dalam Card */}
              {ekskul.videoUrl && (
                <div className="pt-2 border-t border-slate-100/90 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Dokumentasi Video Aktivitas</span>
                    <span className="text-slate-400">SMPN 5 Cibeber</span>
                  </div>
                  <EkskulVideoPlayer
                    videoUrl={ekskul.videoUrl}
                    title={`Dokumentasi Kegiatan ${ekskul.name}`}
                    coverImage={ekskul.coverImage}
                    ekskulName={ekskul.name}
                  />
                </div>
              )}
            </div>

            {/* Card 2: Catatan Prestasi & Rekam Jejak (Hall of Fame) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-300 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy size={18} weight="fill" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Rekam Jejak Prestasi &amp; Penghargaan
                  </h2>
                  <p className="text-xs text-slate-500">
                    Capaian kejuaraan dan partisipasi tingkat kecamatan, kabupaten, dan provinsi
                  </p>
                </div>
              </div>

              {ekskul.achievements && ekskul.achievements.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {ekskul.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-amber-300 hover:bg-amber-50/20 transition-all flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Trophy size={15} weight="fill" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-extrabold uppercase text-amber-700 block">
                          Prestasi Terdata
                        </span>
                        <p className="text-xs font-bold text-slate-800 leading-snug mt-0.5">
                          {ach}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-1.5">
                  <p className="text-xs font-bold text-slate-700">Pembinaan Aktif Berkelanjutan</p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Program pelatihan rutin sedang difokuskan untuk persiapan delegasi kompetisi dan agenda festival tahun ajaran berjalan.
                  </p>
                </div>
              )}
            </div>

            {/* Card 3: Galeri Foto Dokumentasi Kegiatan (Kurasi Admin + Fullscreen Lightbox) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-300 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Images size={18} weight="fill" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Galeri Foto Kegiatan &amp; Latihan
                    </h2>
                    <p className="text-xs text-slate-500">
                      Dokumentasi visual pilihan resmi kegiatan {ekskul.name}
                    </p>
                  </div>
                </div>
                {ekskul.galleryImages && ekskul.galleryImages.length > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                    {ekskul.galleryImages.length} Foto Terpilih
                  </span>
                )}
              </div>

              {/* Grid Interaktif dengan Lightbox Zoom */}
              <EkskulGalleryGrid
                photos={
                  ekskul.galleryImages && ekskul.galleryImages.length > 0
                    ? ekskul.galleryImages
                    : [ekskul.coverImage]
                }
                ekskulName={ekskul.name}
              />
            </div>
          </div>

          {/* =====================================================
              SIDEBAR (4 KOLOM)
              ===================================================== */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Card Info Pelaksanaan & Kontak Pembina */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-300 space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
                  Informasi Operasional
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  Jadwal &amp; Pembina
                </h3>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                  <Clock size={18} weight="duotone" className="text-[#1E5631] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Waktu Latihan</p>
                    <p className="font-bold text-slate-900 mt-0.5">{ekskul.schedule}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                  <MapPin size={18} weight="duotone" className="text-[#1E5631] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Tempat / Fasilitas</p>
                    <p className="font-bold text-slate-900 mt-0.5">{ekskul.location}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                  <User size={18} weight="duotone" className="text-[#1E5631] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Guru Pembina / Pelatih</p>
                    <p className="font-bold text-slate-900 mt-0.5">{ekskul.coach}</p>
                    <p className="text-[11px] text-slate-500">{ekskul.coachRole}</p>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi Kontak WhatsApp Pembina */}
              <div className="pt-2 border-t border-slate-100 space-y-2.5">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1E5631] hover:bg-[#164325] text-white text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <ChatCircleDots size={16} weight="bold" />
                  <span>Daftar / Tanya Pembina via WA</span>
                  <ArrowSquareOut size={13} weight="bold" />
                </a>

                <p className="text-[11px] text-center text-slate-400 leading-tight">
                  Pendaftaran ekskul dapat dilakukan setiap awal semester atau melalui OSIS.
                </p>
              </div>
            </div>

            {/* Card Ekskul Lainnya (Explore Rekomendasi) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Compass size={15} weight="bold" className="text-[#1E5631]" />
                  <span>Ekskul Lainnya</span>
                </h3>
                <Link
                  href="/ekstrakurikuler"
                  className="text-[11px] font-bold text-[#1E5631] hover:underline"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="space-y-3">
                {otherEkskuls.map((other) => {
                  const oSlug = (other as any).slug || other.id;
                  const oImage = (other as any).cover_image || (other as any).coverImage || '/assets/lapangan-smpn5cibeber.jpg';
                  return (
                    <Link
                      key={other.id}
                      href={`/ekstrakurikuler/${oSlug}`}
                      className="group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200/70"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                        <Image
                          src={oImage}
                          alt={other.name}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-[#1E5631] block">
                          {(other as any).category_label || (other as any).categoryLabel || 'Ekskul'}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#1E5631] transition-colors">
                          {other.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {other.schedule}
                        </p>
                      </div>
                      <CaretRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
