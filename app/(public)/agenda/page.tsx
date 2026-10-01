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
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Konten Agenda Interaktif — Langsung ke Filter & Daftar Agenda */}
      <main className="container-site pt-6 pb-16 sm:pt-8 sm:pb-20">
        <AgendaList initialAgendas={initialAgendas} />
      </main>
    </div>
  );
}
