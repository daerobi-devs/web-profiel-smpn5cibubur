'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ChalkboardTeacher,
  X,
  ArrowRight,
} from '@phosphor-icons/react';
import type { StaffMember } from '@/lib/staffData';

interface TeacherDirectoryProps {
  initialStaff: StaffMember[];
}

function getInitials(name: string): string {
  return name
    .replace(/^(Drs\.|Dra\.|H\.|Hj\.|Ir\.)\s*/i, '')
    .split(',')[0]
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function TeacherDirectory({ initialStaff }: TeacherDirectoryProps) {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

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

  return (
    <div className="space-y-8">
      {initialStaff.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {initialStaff.map((staff) => {
            const initials = getInitials(staff.name);

            return (
              <button
                type="button"
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className="group text-left rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 transition-colors duration-200 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                {/* 1. Area Potret Seragam & Berwibawa (Tanpa Warna Pelangi atau Watermark Raksasa) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-200/70 select-none">
                  {staff.imageUrl ? (
                    <Image
                      src={staff.imageUrl}
                      alt={staff.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F1F5F9] flex flex-col items-center justify-center p-6">
                      <div className="w-16 h-16 rounded-full bg-white border border-slate-200/90 flex items-center justify-center shadow-2xs">
                        <span className="text-lg font-extrabold text-[#1E5631] tracking-tight">
                          {initials}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400 mt-2.5">
                        Tenaga Pendidik
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Informasi Inti Pendidik (Tanpa Kotak Kutipan Puitis AI) */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 w-full">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#1E5631] line-clamp-1">
                      {staff.position}
                    </p>
                    <h2 className="text-base font-bold text-slate-900 group-hover:text-[#1E5631] transition-colors leading-snug line-clamp-1">
                      {staff.name}
                    </h2>
                    {staff.subject && (
                      <p className="text-xs text-slate-600 line-clamp-1 pt-0.5">
                        {staff.subject}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs w-full">
                    <span className="font-mono text-[11px] text-slate-400 tabular-nums truncate">
                      {staff.nip ? `NIP. ${staff.nip}` : staff.education || 'Pendidik SMPN 5 Cibeber'}
                    </span>
                    <ArrowRight
                      size={13}
                      weight="bold"
                      className="text-slate-400 group-hover:text-[#1E5631] group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl bg-white border border-slate-200/80 space-y-2.5">
          <ChalkboardTeacher size={32} className="text-slate-300 mx-auto" />
          <h2 className="text-sm font-bold text-slate-700">
            Data Dewan Guru Belum Tersedia
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Daftar tenaga pendidik sedang dalam proses pembaruan data sekolah.
          </p>
        </div>
      )}

      {/* Drawer Rincian Data Kepegawaian (Tanpa Tombol Gimmick Salin NIP/Profil & Tanpa Quote) */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setSelectedStaff(null)}
            className="fixed inset-0 bg-slate-950/50 transition-opacity"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-drawer-title"
            className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header Drawer */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-20">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Data Tenaga Pendidik
              </span>
              <button
                type="button"
                onClick={() => setSelectedStaff(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup panel"
              >
                <X size={15} weight="bold" />
              </button>
            </div>

            {/* Isi Detail Pendidik */}
            <div className="p-6 space-y-6 flex-1">
              <div className="flex items-start gap-4">
                {selectedStaff.imageUrl ? (
                  <div className="relative w-20 h-26 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                    <Image
                      src={selectedStaff.imageUrl}
                      alt={selectedStaff.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-26 rounded-xl bg-[#F1F5F9] border border-slate-200 flex items-center justify-center shrink-0">
                    <span className="text-xl font-extrabold text-[#1E5631]">
                      {getInitials(selectedStaff.name)}
                    </span>
                  </div>
                )}

                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-bold text-[#1E5631]">
                    {selectedStaff.position}
                  </p>
                  <h2
                    id="staff-drawer-title"
                    className="text-lg font-bold text-slate-900 leading-snug"
                  >
                    {selectedStaff.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    SMP Negeri 5 Cibeber
                  </p>
                </div>
              </div>

              {/* Tabel Rincian Kepegawaian */}
              <dl className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80 text-xs">
                {selectedStaff.nip && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium">NIP</dt>
                    <dd className="col-span-7 font-mono font-semibold text-slate-900 tabular-nums">
                      {selectedStaff.nip}
                    </dd>
                  </div>
                )}

                {selectedStaff.subject && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium">Bidang Studi</dt>
                    <dd className="col-span-7 font-semibold text-slate-900">
                      {selectedStaff.subject}
                    </dd>
                  </div>
                )}

                {selectedStaff.education && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium">Kualifikasi</dt>
                    <dd className="col-span-7 font-semibold text-slate-900">
                      {selectedStaff.education}
                    </dd>
                  </div>
                )}

                {selectedStaff.additionalTask && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium">Tugas Tambahan</dt>
                    <dd className="col-span-7 font-semibold text-slate-900 leading-relaxed">
                      {selectedStaff.additionalTask}
                    </dd>
                  </div>
                )}

                {selectedStaff.email && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium">Email</dt>
                    <dd className="col-span-7 font-mono font-semibold text-[#1E5631] truncate">
                      <a href={`mailto:${selectedStaff.email}`} className="hover:underline">
                        {selectedStaff.email}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Footer Drawer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-[#F8FAFC] flex justify-end sticky bottom-0 z-20">
              <button
                type="button"
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-2 rounded-lg bg-[#1E5631] hover:bg-[#164325] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
