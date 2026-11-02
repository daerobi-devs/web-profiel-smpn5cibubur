import Image from 'next/image';
import Link from 'next/link';
import AgendaList from '@/components/ui/AgendaList';
import { getWebSettings } from '@/lib/supabaseData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda & Kalender Kegiatan | SMP Negeri 5 Cibeber',
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
          1. HEADER HALAMAN EDITORIAL (KIRI-RATA)
          ========================================================= */}
      <section className="relative overflow-hidden text-white pt-16 pb-14 md:pt-20 md:pb-16 border-b border-slate-900/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={settings.banner_page_agenda || '/assets/agenda-banner-bg.jpg'}
            alt="Kalender Akademik & Agenda Kegiatan SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/50 to-[#091e10]/85" />
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-3xl space-y-3">
            <nav className="flex items-center gap-2 text-xs font-medium text-white/75">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-amber-300 font-semibold">Agenda Sekolah</span>
            </nav>

            <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Agenda &amp; Kalender Akademik
            </h1>

            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
              Jadwal resmi kegiatan akademik, pelaksanaan asesmen kurikulum, perhelatan kesiswaan, dan agenda kelembagaan di SMP Negeri 5 Cibeber.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. KONTEN AGENDA INTERAKTIF
          ========================================================= */}
      <main className="container-site pt-8 pb-16 sm:pt-10 sm:pb-24">
        <AgendaList initialAgendas={initialAgendas} />
      </main>
    </div>
  );
}
