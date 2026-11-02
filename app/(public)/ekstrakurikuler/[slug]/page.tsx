import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Clock,
  MapPin,
  User,
  Trophy,
  ChatCircleDots,
  ArrowSquareOut,
  CaretRight,
} from '@phosphor-icons/react/dist/ssr';
import { getEkskulBySlug, getActiveEkskul, getWebSettings } from '@/lib/supabaseData';
import { ekskulData, type EkskulItem } from '@/lib/ekskul-data';
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
      title: 'Ekstrakurikuler Tidak Ditemukan | SMPN 5 Cibeber',
    };
  }

  const title = `${ekskul.name} | SMP Negeri 5 Cibeber`;
  const description =
    ekskul.description?.slice(0, 160) ||
    `Profil kegiatan ekstrakurikuler ${ekskul.name} di SMP Negeri 5 Cibeber.`;
  const anyItem = ekskul as any;
  const rawCover =
    anyItem.coverImage || anyItem.cover_image || anyItem.bannerImage || anyItem.banner_image;
  const fullCoverUrl = rawCover
    ? rawCover.startsWith('http')
      ? rawCover
      : `https://smpn5cibeber.sch.id${rawCover}`
    : 'https://smpn5cibeber.sch.id/assets/logo-smpn5cibeber.png';
  const ekskulUrl = `https://smpn5cibeber.sch.id/ekstrakurikuler/${ekskul.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: ekskulUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'id_ID',
      url: ekskulUrl,
      siteName: 'SMP Negeri 5 Cibeber',
      title: ekskul.name,
      description,
      images: [
        {
          url: fullCoverUrl,
          width: 1200,
          height: 630,
          alt: ekskul.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ekskul.name,
      description,
      images: [fullCoverUrl],
    },
  };
}

export default async function EkskulDetailPage({ params }: Props) {
  const { slug } = await params;

  const [dbItem, rawAllEkskul, settings] = await Promise.all([
    getEkskulBySlug(slug),
    getActiveEkskul(),
    getWebSettings(),
  ]);

  const staticItem = ekskulData.find((e) => e.slug === slug || e.id === slug);
  const rawItem = dbItem || staticItem;

  if (!rawItem) {
    notFound();
  }

  const ekskul: EkskulItem = {
    id: rawItem.id,
    slug: (rawItem as any).slug || slug,
    name: rawItem.name,
    category: (rawItem as any).category || 'KEPANDUAN',
    categoryLabel:
      (rawItem as any).category_label || (rawItem as any).categoryLabel || 'Ekstrakurikuler',
    badge: rawItem.badge || 'Kegiatan Kesiswaan',
    motto: rawItem.motto || '',
    description: rawItem.description || '',
    coach: rawItem.coach || 'Dewan Pembina',
    coachRole: 'Guru Pembina Ekstrakurikuler',
    schedule: rawItem.schedule || 'Sesuai Jadwal Mingguan',
    location: (rawItem as any).place || (rawItem as any).location || 'SMP Negeri 5 Cibeber',
    memberCount: (rawItem as any).memberCount || 'Peserta Didik Aktif',
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
    coverImage:
      (rawItem as any).cover_image ||
      (rawItem as any).coverImage ||
      '/assets/lapangan-smpn5cibeber.jpg',
    bannerImage:
      (rawItem as any).banner_image ||
      (rawItem as any).bannerImage ||
      (rawItem as any).cover_image ||
      (rawItem as any).coverImage ||
      '/assets/prestasi-siswa-smpn5cibeber.jpg',
    videoUrl: (rawItem as any).video_url || (rawItem as any).videoUrl || null,
    galleryImages: (() => {
      const raw = (rawItem as any).gallery_images ?? (rawItem as any).galleryImages;
      if (Array.isArray(raw)) return raw.filter(Boolean);
      if (typeof raw === 'string' && raw.trim()) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed.filter(Boolean);
        } catch {
          return raw
            .split('\n')
            .map((s: string) => s.trim())
            .filter(Boolean);
        }
      }
      return [];
    })(),
    highlights: (rawItem as any).highlights || [],
  };

  const otherEkskuls = (rawAllEkskul.length > 0 ? rawAllEkskul : ekskulData)
    .filter((e) => (e as any).slug !== slug && e.id !== ekskul.id)
    .slice(0, 4);

  const coachPhone = (rawItem as any).coach_phone || settings.school_whatsapp || '085281459726';
  const cleanPhone = coachPhone.replace(/[^0-9]/g, '');
  const waTarget = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone;
  const waMessage = encodeURIComponent(
    `Halo Pembina/Admin SMPN 5 Cibeber, saya ingin bertanya mengenai kegiatan dan jadwal ekstrakurikuler ${ekskul.name}.`
  );
  const waLink = `https://wa.me/${waTarget}?text=${waMessage}`;

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* Header Halaman Editorial Rata Kiri */}
      <section className="relative overflow-hidden text-white py-14 sm:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 pointer-events-none select-none bg-slate-950">
          <Image
            src={ekskul.bannerImage || ekskul.coverImage}
            alt={ekskul.name}
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/50 to-[#091e10]/85" />
        </div>

        <div className="container-site relative z-10 max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-3 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/ekstrakurikuler" className="hover:text-white transition-colors">
              Ekstrakurikuler
            </Link>
            <span>/</span>
            <span className="text-white font-semibold truncate">{ekskul.name}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1">
            {ekskul.categoryLabel}
          </p>

          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {ekskul.name}
          </h1>
        </div>
      </section>

      {/* Konten Detail 2 Kolom */}
      <section className="container-site max-w-6xl mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Utama (8 Kolom) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Uraian Pembinaan & Video */}
            <div className="rounded-xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="font-serif-academic text-xl sm:text-2xl font-bold text-slate-900">
                  Deskripsi Kegiatan &amp; Pembinaan
                </h2>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line">
                {ekskul.description}
              </div>

              {ekskul.videoUrl && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Video Dokumentasi Latihan
                  </h3>
                  <EkskulVideoPlayer
                    videoUrl={ekskul.videoUrl}
                    title={`Dokumentasi Kegiatan ${ekskul.name}`}
                    coverImage={ekskul.coverImage}
                    ekskulName={ekskul.name}
                  />
                </div>
              )}
            </div>

            {/* Rekam Jejak Capaian */}
            {ekskul.achievements && ekskul.achievements.length > 0 && (
              <div className="rounded-xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h2 className="font-serif-academic text-xl sm:text-2xl font-bold text-slate-900">
                    Catatan Partisipasi &amp; Capaian
                  </h2>
                </div>

                <ul className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                  {ekskul.achievements.map((ach, idx) => (
                    <li key={idx} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                      <Trophy size={16} weight="duotone" className="text-[#B45309] shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Galeri Foto Kegiatan */}
            <div className="rounded-xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="font-serif-academic text-xl sm:text-2xl font-bold text-slate-900">
                  Dokumentasi Kegiatan
                </h2>
                {ekskul.galleryImages && ekskul.galleryImages.length > 0 && (
                  <span className="text-xs font-mono text-slate-500 tabular-nums">
                    {ekskul.galleryImages.length} foto
                  </span>
                )}
              </div>

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

          {/* Sidebar (4 Kolom) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-xl bg-white border border-slate-200/90 p-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
                Jadwal &amp; Pembina
              </h3>

              <dl className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Clock size={16} weight="bold" className="text-[#1E5631] shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-slate-400 font-medium">Jadwal Latihan</dt>
                    <dd className="font-bold text-slate-900 mt-0.5">{ekskul.schedule}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} weight="bold" className="text-[#1E5631] shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-slate-400 font-medium">Lokasi Latihan</dt>
                    <dd className="font-bold text-slate-900 mt-0.5">{ekskul.location}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User size={16} weight="bold" className="text-[#1E5631] shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-slate-400 font-medium">Guru Pembina</dt>
                    <dd className="font-bold text-slate-900 mt-0.5">{ekskul.coach}</dd>
                  </div>
                </div>
              </dl>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E5631] hover:bg-[#164325] text-white text-xs font-bold transition-colors"
                >
                  <ChatCircleDots size={15} weight="bold" />
                  <span>Hubungi Pembina via WhatsApp</span>
                  <ArrowSquareOut size={13} weight="bold" />
                </a>
              </div>
            </div>

            {/* Ekskul Lainnya */}
            <div className="rounded-xl bg-white border border-slate-200/90 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Ekstrakurikuler Lainnya
                </h3>
                <Link
                  href="/ekstrakurikuler"
                  className="text-xs font-bold text-[#1E5631] hover:underline"
                >
                  Semua
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {otherEkskuls.map((other) => {
                  const oSlug = (other as any).slug || other.id;
                  return (
                    <Link
                      key={other.id}
                      href={`/ekstrakurikuler/${oSlug}`}
                      className="group py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#1E5631] transition-colors">
                          {other.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {other.schedule}
                        </p>
                      </div>
                      <CaretRight
                        size={13}
                        className="text-slate-400 group-hover:text-[#1E5631] group-hover:translate-x-0.5 transition-all shrink-0"
                      />
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
