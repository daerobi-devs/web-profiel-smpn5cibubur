'use client';

import { useState, useMemo } from 'react';
import {
  CalendarBlank,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  Tag,
  MagnifyingGlass,
  ArrowRight,
  DownloadSimple,
  CaretRight,
  BookmarkSimple,
  CalendarPlus,
  ShareNetwork,
  Check,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { AgendaItem, sampleAgendas } from '@/lib/agenda-data';

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Akademik: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Kesiswaan: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Lingkungan: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  Keagamaan: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Humas: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

export default function AgendaList({
  initialAgendas
}: {
  initialAgendas?: AgendaItem[] | null;
}) {
  const allAgendas = useMemo(() => {
    return initialAgendas && initialAgendas.length > 0 ? initialAgendas : sampleAgendas;
  }, [initialAgendas]);

  const [selectedFilter, setSelectedFilter] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const createGoogleCalendarUrl = (item: AgendaItem) => {
    const title = encodeURIComponent(`${item.title} — SMPN 5 Cibeber`);
    const details = encodeURIComponent(
      `${item.description}\n\nWaktu: ${item.time}\nSasaran: ${item.participants}\nTempat: ${item.location}\nPenyelenggara: SMP Negeri 5 Cibeber`
    );
    const loc = encodeURIComponent(item.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${loc}`;
  };

  const handleCopyAgenda = (item: AgendaItem) => {
    const text = `[AGENDA RESMI] ${item.title} — SMPN 5 Cibeber\nTanggal: ${item.dateStr} (${item.time})\nLokasi: ${item.location}\nSasaran: ${item.participants}\n\n${item.description}\n\nInfo selengkapnya: https://ekosistem.daeroom.my.id/agenda`;
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const filterButtons = [
    { key: 'SEMUA', label: 'Semua Agenda' },
    { key: 'AKAN_DATANG', label: 'Akan Datang' },
    { key: 'Akademik', label: 'Akademik' },
    { key: 'Kesiswaan', label: 'Kesiswaan & OSIS' },
    { key: 'Lingkungan', label: 'Lingkungan Hidup' },
    { key: 'SELESAI', label: 'Riwayat Selesai' },
  ];

  const filteredAgendas = useMemo(() => {
    return allAgendas.filter((agenda) => {
      // Category / Status Filter
      if (selectedFilter === 'AKAN_DATANG' && agenda.status !== 'AKAN_DATANG') return false;
      if (selectedFilter === 'SELESAI' && agenda.status !== 'SELESAI') return false;
      if (
        selectedFilter !== 'SEMUA' &&
        selectedFilter !== 'AKAN_DATANG' &&
        selectedFilter !== 'SELESAI' &&
        agenda.category !== selectedFilter
      ) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = agenda.title.toLowerCase().includes(q);
        const matchDesc = agenda.description.toLowerCase().includes(q);
        const matchLoc = agenda.location.toLowerCase().includes(q);
        const matchCategory = agenda.category.toLowerCase().includes(q);
        const matchParticipants = agenda.participants.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc && !matchCategory && !matchParticipants) return false;
      }

      return true;
    });
  }, [allAgendas, selectedFilter, searchQuery]);

  // Featured Top Agenda (ketika tidak ada search query & filter SEMUA)
  const isDefaultView = searchQuery.trim() === '' && selectedFilter === 'SEMUA';
  const leadAgenda = isDefaultView && allAgendas.length > 0 ? allAgendas[0] : null;
  const queueAgendas = isDefaultView && allAgendas.length > 1 ? allAgendas.slice(1, 3) : [];
  const remainingAgendas = isDefaultView ? allAgendas.slice(3) : filteredAgendas;

  return (
    <div className="space-y-8">
      {/* =========================================================
          1. HEADER & SEARCH TOOLBAR (SAMA POLA DENGAN BERITA)
          ========================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
        {/* Baris Atas: Judul di Kiri, Kolom Pencarian di Kanan */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706]">
              Pencarian &amp; Filter Jadwal
            </span>
            <h2 className="font-serif-academic text-xl sm:text-2xl lg:text-3xl font-black text-[#1E5631] tracking-tight mt-0.5">
              Daftar Kalender Kegiatan
            </h2>
          </div>

          {/* Kolom Pencarian di Atas Kanan */}
          <div className="relative w-full md:w-80 shrink-0">
            <MagnifyingGlass
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kegiatan, asesmen, atau lokasi..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E5631]/20 focus:border-[#1E5631] focus:bg-white shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                aria-label="Hapus kata kunci"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Baris Bawah: Tabs Kategori Filter Horizontal */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {filterButtons.map((btn) => {
              const isSelected = selectedFilter === btn.key;
              return (
                <button
                  key={btn.key}
                  type="button"
                  onClick={() => setSelectedFilter(btn.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E5631] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500 font-semibold">
              {filteredAgendas.length} Jadwal Terdata
            </span>
            {(selectedFilter !== 'SEMUA' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('SEMUA');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#1E5631] hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          2. FEATURED EVENT SHOWCASE (AGENDA UTAMA & JADWAL MENDATANG)
          Model Mirip Berita Utama tapi Berkarakteristik Kalender
          ========================================================= */}
      {isDefaultView && leadAgenda && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1E5631]">
              Sorotan Agenda &amp; Jadwal Terdekat
            </h2>
            <span className="text-[11px] text-slate-500 font-semibold">
              Kalender Resmi Lembaga
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Lead Event Card (7 Kolom) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-emerald-300/80 ring-1 ring-emerald-500/20 shadow-md p-6 sm:p-7 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  {/* Top Badges & Live Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#1E5631] text-white text-xs font-black uppercase tracking-wider shadow-xs">
                        Agenda Utama
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300/60">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        Akan Datang
                      </span>
                    </div>

                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      Tahun Ajaran 2025/2026
                    </span>
                  </div>

                  {/* Date Block + Title */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
                    {/* Modern Two-Tone Desk Calendar Card */}
                    <div className="shrink-0 w-20 sm:w-24 rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden flex flex-col items-center">
                      <div className="w-full bg-[#1E5631] text-emerald-100 py-1.5 text-center border-b border-[#143e22]">
                        <span className="text-xs font-black uppercase tracking-widest block leading-none">
                          {leadAgenda.monthBadge}
                        </span>
                      </div>
                      <div className="w-full py-2.5 px-2 bg-gradient-to-b from-white to-slate-50/70 text-center">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight block my-0.5 tracking-tight">
                          {leadAgenda.dayBadge}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                          2026
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                        {leadAgenda.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {leadAgenda.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Key Meta Boxes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5">
                    <Clock size={18} weight="duotone" className="text-[#1E5631] shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Waktu</p>
                      <p className="font-bold text-slate-800">{leadAgenda.time}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5">
                    <MapPin size={18} weight="duotone" className="text-[#1E5631] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Tempat / Lokasi</p>
                      <p className="font-bold text-slate-800 truncate">{leadAgenda.location}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5">
                    <Users size={18} weight="duotone" className="text-[#1E5631] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Sasaran Peserta</p>
                      <p className="font-bold text-slate-800 truncate">{leadAgenda.participants}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2.5">
                    <Tag size={18} weight="duotone" className="text-[#1E5631] shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Kategori</p>
                      <p className="font-bold text-slate-800">{leadAgenda.category}</p>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi Agenda Utama: Simpan Kalender & Bagikan */}
                <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-100">
                  <a
                    href={createGoogleCalendarUrl(leadAgenda)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E5631] hover:bg-[#164325] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                  >
                    <CalendarPlus size={15} weight="bold" />
                    <span>Simpan ke Google Calendar</span>
                    <ArrowSquareOut size={13} weight="bold" className="opacity-75" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyAgenda(leadAgenda)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    {copiedId === leadAgenda.id ? (
                      <>
                        <Check size={15} weight="bold" className="text-emerald-600" />
                        <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <ShareNetwork size={15} weight="bold" />
                        <span>Bagikan Rincian</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Queue Card (5 Kolom) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm h-full flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <CalendarBlank size={16} weight="bold" className="text-[#1E5631]" />
                    <span>Jadwal Mendatang Lainnya</span>
                  </h3>

                  <div className="space-y-4">
                    {queueAgendas.map((item) => {
                      const catTheme = categoryColors[item.category] || {
                        bg: 'bg-slate-50',
                        text: 'text-slate-700',
                        border: 'border-slate-200',
                      };

                      return (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex gap-3.5 items-start"
                        >
                          {/* Modern Mini Calendar Widget */}
                          <div className="shrink-0 w-13 rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col items-center">
                            <div className="w-full bg-[#1E5631] text-emerald-100 py-0.5 text-center">
                              <span className="text-[9px] font-black uppercase tracking-wider block leading-none">
                                {item.monthBadge}
                              </span>
                            </div>
                            <div className="w-full py-1 text-center bg-gradient-to-b from-white to-slate-50/70">
                              <span className="text-base font-black text-slate-900 leading-none block tracking-tight">
                                {item.dayBadge}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${catTheme.bg} ${catTheme.text}`}>
                                {item.category}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium truncate">
                                {item.dateStr}
                              </span>
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                              {item.title}
                            </h4>

                            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                              <p className="truncate flex items-center gap-1 max-w-[170px]">
                                <MapPin size={12} className="text-[#1E5631] shrink-0" />
                                <span className="truncate">{item.location}</span>
                              </p>
                              <div className="flex items-center gap-1">
                                <a
                                  href={createGoogleCalendarUrl(item)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Simpan ke Google Calendar"
                                  className="p-1 rounded-md bg-emerald-50 hover:bg-[#1E5631] text-[#1E5631] hover:text-white transition-colors"
                                >
                                  <CalendarPlus size={13} weight="bold" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleCopyAgenda(item)}
                                  title="Salin Rincian Agenda"
                                  className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                                >
                                  {copiedId === item.id ? (
                                    <Check size={13} weight="bold" className="text-emerald-600" />
                                  ) : (
                                    <ShareNetwork size={13} weight="bold" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          3. SELURUH ARSIP JADWAL (GRID KARTU AGENDA)
          ========================================================= */}
      <section className="space-y-4">
        {isDefaultView && (
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1E5631]">
              Seluruh Jadwal &amp; Agenda Sekolah
            </h2>
          </div>
        )}

        {filteredAgendas.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-dashed border-slate-300 space-y-3">
            <CalendarBlank size={44} className="text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              Tidak Ada Agenda Ditemukan
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Tidak ada kegiatan yang sesuai dengan kata kunci atau filter yang Anda pilih. Silakan gunakan kata kunci pencarian yang lain.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFilter('SEMUA');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#1E5631] text-white text-xs font-bold hover:bg-[#164325] transition-colors inline-block mt-2 cursor-pointer"
            >
              Tampilkan Seluruh Agenda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {remainingAgendas.map((agenda, idx) => {
                const catTheme = categoryColors[agenda.category] || {
                  bg: 'bg-slate-50',
                  text: 'text-slate-700',
                  border: 'border-slate-200',
                };
                const isUpcoming = agenda.status === 'AKAN_DATANG';

                return (
                  <motion.div
                    key={agenda.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, delay: idx * 0.03 }}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      {/* Date Box - Modern Two-Tone Desk Calendar Card */}
                      <div className="shrink-0 w-16 sm:w-18 rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col items-center">
                        <div className="w-full bg-[#1E5631] text-emerald-100 py-1 text-center border-b border-[#143e22]">
                          <span className="text-[10px] font-black uppercase tracking-widest block leading-none">
                            {agenda.monthBadge}
                          </span>
                        </div>
                        <div className="w-full py-2 px-1 bg-gradient-to-b from-white to-slate-50/70 text-center">
                          <span className="text-2xl font-black text-slate-900 leading-none block tracking-tight">
                            {agenda.dayBadge}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 mt-1 block">
                            2026
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${catTheme.bg} ${catTheme.text} ${catTheme.border}`}>
                            {agenda.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isUpcoming ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isUpcoming ? 'Akan Datang' : 'Terlaksana'}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug line-clamp-2">
                          {agenda.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {agenda.description}
                        </p>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Clock size={14} className="text-[#1E5631] shrink-0" />
                          <span>{agenda.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] max-w-[150px] truncate">
                          <MapPin size={14} className="text-[#1E5631] shrink-0" />
                          <span className="truncate">{agenda.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={createGoogleCalendarUrl(agenda)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Simpan ke Google Calendar"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-[#1E5631] text-[#1E5631] hover:text-white text-[11px] font-bold transition-colors shadow-2xs"
                        >
                          <CalendarPlus size={13} weight="bold" />
                          <span className="hidden sm:inline">Kalender</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopyAgenda(agenda)}
                          title="Salin Rincian Agenda"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        >
                          {copiedId === agenda.id ? (
                            <Check size={13} weight="bold" className="text-emerald-600" />
                          ) : (
                            <ShareNetwork size={13} weight="bold" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Info Dokumen Kalender Resmi Kurikulum */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#1E5631] to-[#143e22] text-white p-6 sm:p-8 shadow-md border border-emerald-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              <DownloadSimple size={15} weight="bold" />
              <span>Dokumen Resmi Kurikulum</span>
            </span>
            <h4 className="text-lg sm:text-xl font-black">
              Kalender Pendidikan SMPN 5 Cibeber TP 2026/2027
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Jadwal kegiatan dapat mengalami penyesuaian mengikuti arahan Dinas Pendidikan Kabupaten Lebak. Hubungi bagian kurikulum untuk informasi teknis.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-2.5">
            <a
              href="/kontak"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1E5631] text-xs font-extrabold hover:bg-emerald-50 transition-colors shadow-xs"
            >
              <span>Hubungi Humas Sekolah</span>
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
