'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  IdentificationCard,
  ChalkboardTeacher,
  X,
  Quotes,
  Check,
  Copy,
  ArrowRight,
  BookOpen,
  EnvelopeSimple,
  Atom,
  Globe,
  Palette,
  Laptop,
  ShieldCheck,
  ShareNetwork,
} from '@phosphor-icons/react';
import type { StaffMember } from '@/lib/staffData';

interface TeacherDirectoryProps {
  initialStaff: StaffMember[];
}

// Helper penentuan tema visual berdasarkan bidang mata pelajaran
function getSubjectTheme(position: string, subject?: string | null) {
  const combined = (position + ' ' + (subject || '')).toLowerCase();
  if (combined.includes('matematika') || combined.includes('ipa') || combined.includes('fisika')) {
    return {
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      pillColor: 'bg-emerald-600',
      icon: Atom,
      label: 'MIPA & Sains',
      gradient: 'from-[#0b381e] via-[#164325] to-[#082413]',
      monogramBg: 'from-emerald-800 to-emerald-950',
      borderRing: 'border-emerald-400/40',
    };
  }
  if (combined.includes('bahasa') || combined.includes('literasi') || combined.includes('inggris')) {
    return {
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      pillColor: 'bg-amber-600',
      icon: BookOpen,
      label: 'Bahasa & Literasi',
      gradient: 'from-[#3a2007] via-[#522d0a] to-[#241303]',
      monogramBg: 'from-amber-800 to-amber-950',
      borderRing: 'border-amber-400/40',
    };
  }
  if (combined.includes('ips') || combined.includes('adiwiyata') || combined.includes('lingkungan')) {
    return {
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
      pillColor: 'bg-teal-600',
      icon: Globe,
      label: 'Sosial & Lingkungan',
      gradient: 'from-[#082f2f] via-[#0f4747] to-[#041c1c]',
      monogramBg: 'from-teal-800 to-teal-950',
      borderRing: 'border-teal-400/40',
    };
  }
  if (combined.includes('seni') || combined.includes('karawitan') || combined.includes('tari')) {
    return {
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      pillColor: 'bg-purple-600',
      icon: Palette,
      label: 'Seni Budaya',
      gradient: 'from-[#2e0e47] via-[#431666] to-[#1c082b]',
      monogramBg: 'from-purple-800 to-purple-950',
      borderRing: 'border-purple-400/40',
    };
  }
  if (combined.includes('informatika') || combined.includes('komputer') || combined.includes('digital')) {
    return {
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      pillColor: 'bg-blue-600',
      icon: Laptop,
      label: 'Teknologi & Digital',
      gradient: 'from-[#09224f] via-[#103273] to-[#04122d]',
      monogramBg: 'from-blue-800 to-blue-950',
      borderRing: 'border-blue-400/40',
    };
  }
  if (combined.includes('jasmani') || combined.includes('olahraga') || combined.includes('pjok')) {
    return {
      badgeBg: 'bg-orange-50 text-orange-800 border-orange-200',
      pillColor: 'bg-orange-600',
      icon: ShieldCheck,
      label: 'Olahraga & Jasmani',
      gradient: 'from-[#421b06] via-[#5c2709] to-[#260f03]',
      monogramBg: 'from-orange-800 to-orange-950',
      borderRing: 'border-orange-400/40',
    };
  }
  // Default untuk Pimpinan & Manajemen
  return {
    badgeBg: 'bg-emerald-50 text-[#1E5631] border-emerald-200',
    pillColor: 'bg-[#1E5631]',
    icon: ChalkboardTeacher,
    label: 'Pimpinan & Manajemen',
    gradient: 'from-[#12361e] via-[#1E5631] to-[#0c2414]',
    monogramBg: 'from-[#1E5631] to-[#0d2816]',
    borderRing: 'border-amber-400/50',
  };
}

export function TeacherDirectory({ initialStaff }: TeacherDirectoryProps) {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [copiedNip, setCopiedNip] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);

  // Kunci scroll halaman ketika drawer terbuka
  useEffect(() => {
    if (selectedStaff) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedStaff(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedStaff]);

  // Handler salin NIP
  const handleCopyNip = (nip: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(nip.replace(/\s+/g, ''));
      setCopiedNip(true);
      setTimeout(() => setCopiedNip(false), 2000);
    }
  };

  // Handler salin profil ringkas
  const handleCopyProfile = (staff: StaffMember) => {
    if (typeof navigator !== 'undefined') {
      const summary = `${staff.name}\nJabatan: ${staff.position}\nNIP: ${staff.nip || '-'}\nKualifikasi: ${staff.education || '-'}\nSatuan Pendidikan: SMP Negeri 5 Cibeber, Kab. Lebak`;
      navigator.clipboard.writeText(summary);
      setCopiedProfile(true);
      setTimeout(() => setCopiedProfile(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      {/* =========================================================
          GRID KARTU POTRET BERGAYA MAJALAH (PORTRAIT SHOWCASE)
          ========================================================= */}
      {initialStaff.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {initialStaff.map((staff) => {
            const theme = getSubjectTheme(staff.position, staff.subject);
            const DisciplineIcon = theme.icon;

            return (
              <div
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                {/* 1. Header Visual Potret */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900 select-none">
                  {staff.imageUrl ? (
                    <>
                      <Image
                        src={staff.imageUrl}
                        alt={staff.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    </>
                  ) : (
                    /* Monogram Potret Akademik Karismatik (Bukan inisial kotak polos) */
                    <div className={`w-full h-full bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center relative p-6`}>
                      {/* Watermark Ikon Disiplin di Belakang */}
                      <DisciplineIcon
                        size={120}
                        weight="duotone"
                        className="absolute -right-4 -bottom-6 text-white/5 pointer-events-none"
                      />

                      {/* Monogram Seal Mewah */}
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-b ${theme.monogramBg} border-2 ${theme.borderRing} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}>
                        <span className="font-serif-academic text-2xl font-black text-amber-300 tracking-wider">
                          {staff.name
                            .replace(/^(Drs\.|Dra\.|H\.|Hj\.|Ir\.)\s*/i, '')
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </span>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs border border-white">
                          <DisciplineIcon size={12} weight="bold" />
                        </div>
                      </div>

                      <div className="mt-3 text-center z-10">
                        <span className="text-[11px] font-semibold text-emerald-200/90 tracking-wide uppercase">
                          {theme.label}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tag Mata Pelajaran di Kiri Bawah Foto (Jika ada gambar) */}
                  {staff.imageUrl && (
                    <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold truncate max-w-full">
                        {staff.subject || staff.position}
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Body Informasi Kartu */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-1.5">
                    <h3 className="font-serif-academic text-base font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-tight line-clamp-1">
                      {staff.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800 line-clamp-1">
                      {staff.position}
                    </p>
                    {staff.education && (
                      <p className="text-[11px] text-slate-500 flex items-center gap-1.5 line-clamp-1">
                        <GraduationCap size={14} weight="duotone" className="text-slate-400 shrink-0" />
                        <span>{staff.education}</span>
                      </p>
                    )}
                  </div>

                  {/* Kutipan Filosofi Mengajar - Terbuka, Elegan, dan Proporsional */}
                  {staff.quote && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11.5px] text-slate-600 italic leading-relaxed min-h-[64px] flex items-center">
                      <p className="line-clamp-3">
                        &ldquo;{staff.quote}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Footer Kartu / Tombol CTA */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs font-bold text-[#1E5631] group-hover:bg-emerald-50/50 transition-colors">
                  <span className="text-[11px]">Lihat Profil Lengkap</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 group-hover:bg-[#1E5631] text-[#1E5631] group-hover:text-white flex items-center justify-center transition-all duration-200">
                    <ArrowRight size={12} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ChalkboardTeacher size={24} />
          </div>
          <h4 className="text-base font-bold text-slate-700">
            Data Dewan Guru Belum Tersedia
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Daftar profil tenaga pendidik sedang dalam proses pembaruan data resmi sekolah.
          </p>
        </div>
      )}

      {/* =========================================================
          3. SLIDE-OVER DRAWER INTERAKTIF (PANEL SAMPING ELEGAN)
          ========================================================= */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Gelap */}
          <div
            onClick={() => setSelectedStaff(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Panel Konten Drawer */}
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header Drawer */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                  SMPN 5 CIBEBER • PROFIL PENDIDIK
                </span>
              </div>
              <button
                onClick={() => setSelectedStaff(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup (ESC)"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* Isi Konten Detail Pendidik */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              {/* Foto Profil Utama & Identitas */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {selectedStaff.imageUrl ? (
                  <div className="relative w-28 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-600 shrink-0">
                    <Image
                      src={selectedStaff.imageUrl}
                      alt={selectedStaff.name}
                      fill
                      sizes="112px"
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-28 h-36 rounded-2xl bg-gradient-to-br from-[#1E5631] via-[#164325] to-[#12361e] text-white flex flex-col items-center justify-center p-3 shrink-0 shadow-md border border-emerald-400/30">
                    <span className="font-serif-academic text-3xl font-black text-amber-300">
                      {selectedStaff.name
                        .replace(/^(Drs\.|Dra\.|H\.|Hj\.|Ir\.)\s*/i, '')
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <span className="text-[10px] text-emerald-200 mt-2 font-semibold text-center leading-tight">
                      Pendidik Resmi
                    </span>
                  </div>
                )}

                <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
                  <h2 className="font-serif-academic text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    {selectedStaff.name}
                  </h2>

                  <p className="text-xs sm:text-sm font-semibold text-[#1E5631]">
                    {selectedStaff.position}
                  </p>
                </div>
              </div>

              {/* Kutipan Filosofi Mengajar (Pull-Quote Elegan) */}
              {selectedStaff.quote && (
                <div className="relative p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-50/50 to-slate-50 border border-amber-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                    <Quotes size={20} weight="fill" className="text-amber-500" />
                    <span>MOTO &amp; FILOSOFI MENDIDIK</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-serif-academic italic leading-relaxed">
                    &ldquo;{selectedStaff.quote}&rdquo;
                  </p>
                </div>
              )}

              {/* Data Administrasi & Rincian Tugas */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Informasi Akademik &amp; Kepegawaian
                </h4>

                <div className="space-y-2.5 text-xs">
                  {/* NIP Resmi */}
                  {selectedStaff.nip && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <IdentificationCard size={18} weight="duotone" className="text-slate-500 shrink-0" />
                        <div>
                          <p className="text-[10px] font-semibold text-slate-400 uppercase">Nomor Induk Pegawai (NIP)</p>
                          <p className="font-mono text-xs font-bold text-slate-800">{selectedStaff.nip}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyNip(selectedStaff.nip!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-semibold text-slate-600 transition-colors cursor-pointer"
                        title="Salin NIP"
                      >
                        {copiedNip ? (
                          <>
                            <Check size={14} weight="bold" className="text-emerald-600" />
                            <span className="text-emerald-700">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} weight="bold" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Kualifikasi Pendidikan */}
                  {selectedStaff.education && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                      <GraduationCap size={18} weight="duotone" className="text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase">Kualifikasi Akademik</p>
                        <p className="font-semibold text-slate-800">{selectedStaff.education}</p>
                        {selectedStaff.alumni && (
                          <p className="text-[11px] text-slate-500 mt-0.5">Almamater: {selectedStaff.alumni}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mata Pelajaran yang Diampu */}
                  {selectedStaff.subject && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                      <BookOpen size={18} weight="duotone" className="text-[#1E5631] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase">Mata Pelajaran Utama</p>
                        <p className="font-semibold text-slate-800">{selectedStaff.subject}</p>
                      </div>
                    </div>
                  )}

                  {/* Tugas Tambahan Sekolah */}
                  {selectedStaff.additionalTask && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                      <ShieldCheck size={18} weight="duotone" className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase">Tugas Tambahan &amp; Pembinaan</p>
                        <p className="font-semibold text-slate-800">{selectedStaff.additionalTask}</p>
                      </div>
                    </div>
                  )}

                  {/* Email Institusi */}
                  {selectedStaff.email && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                      <EnvelopeSimple size={18} weight="duotone" className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase">Email Kontak Resmi</p>
                        <a
                          href={`mailto:${selectedStaff.email}`}
                          className="font-mono text-xs font-semibold text-[#1E5631] hover:underline"
                        >
                          {selectedStaff.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Drawer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 sticky bottom-0 z-20">
              <button
                onClick={() => handleCopyProfile(selectedStaff)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                {copiedProfile ? (
                  <>
                    <Check size={16} weight="bold" className="text-emerald-600" />
                    <span className="text-emerald-700">Profil Tersalin!</span>
                  </>
                ) : (
                  <>
                    <ShareNetwork size={16} weight="bold" />
                    <span>Salin Info Guru</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedStaff(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1E5631] hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Tutup Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
