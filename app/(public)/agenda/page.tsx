import Image from 'next/image';
import Link from 'next/link';
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr';
import AgendaList from '@/components/ui/AgendaList';
import { getWebSettings } from '@/lib/supabaseData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda & Kalender Kegiatan Sekolah — SMPN 5 Cibeber',
  description:
    'Jadwal resmi kegiatan akademik, asesmen kurikulum, peringatan hari besar, kesiswaan, dan agenda penting di SMP Negeri 5 Cibeber.',
};

export default async function AgendaPage() {
  const settings = await getWebSettings();
  let initialAgendas = null;

  if (settings.school_agendas_data) {
    try {
      const parsed = JSON.parse(settings.school_agendas_data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        initialAgendas = parsed;
      }
    } catch {
      // fallback to sampleAgendas
    }
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* =========================================================
          HERO BANNER INSTITUSIONAL BER-BACKGROUND ACADEMIC PLANNER
          ========================================================= */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/30">
        {/* Background Foto Dinamis dengan Dark Forest Green Tint */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={settings.banner_page_agenda || '/assets/agenda-banner-bg.jpg'}
            alt="Kalender Akademik & Agenda Kegiatan SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          {/* Overlay Gradasi Hijau Hutan Lembut Agar Teks 100% Kontras & Nyaman Dibaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/82 via-[#164325]/75 to-[#12361e]/92" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/60" />
        </div>

        <div className="container-site relative z-10 space-y-3.5 max-w-3xl mx-auto text-center">
          {/* Badge Pill Emas Berikon */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-amber-300 shadow-xs">
            <CalendarBlank size={15} weight="fill" />
            <span>Kalender Akademik &amp; Kegiatan Resmi</span>
          </div>

          {/* Judul Utama Megah */}
          <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            Agenda Kegiatan Sekolah
          </h1>

          {/* Deskripsi Pengantar Berwibawa */}
          <p className="text-xs sm:text-sm md:text-base text-emerald-50 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Informasi terkini jadwal asesmen kurikulum, perhelatan kesiswaan, peringatan hari besar, dan agenda penting di lingkungan SMP Negeri 5 Cibeber, Lebak.
          </p>

          {/* Breadcrumb Navigasi */}
          <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-emerald-200/90 pt-1">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-emerald-400/60">/</span>
            <span className="text-amber-400 font-bold">Agenda Sekolah</span>
          </nav>

          {/* Quick Info Badges */}
          <div className="pt-2 flex flex-wrap justify-center gap-2.5 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold shadow-2xs">
              Kalender TP 2026/2027
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-amber-300 font-semibold shadow-2xs">
              Sinkronisasi Google Calendar
            </span>
          </div>
        </div>
      </section>

      {/* Konten Agenda Interaktif */}
      <main className="container-site pt-8 pb-16 sm:pt-10 sm:pb-24">
        <AgendaList initialAgendas={initialAgendas} />
      </main>
    </div>
  );
}
