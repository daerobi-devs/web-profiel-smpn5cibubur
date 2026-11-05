'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  ChalkboardTeacher,
  X,
  ArrowRight,
  MagnifyingGlass,
  Funnel,
  IdentificationBadge,
  Clock,
  GraduationCap,
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

type CategoryKey = 'SEMUA' | 'PIMPINAN' | 'BAHASA' | 'MIPA' | 'SOSIAL_AGAMA' | 'OLAHRAGA_SENI';

const CATEGORY_TABS: Array<{ key: CategoryKey; label: string }> = [
  { key: 'SEMUA', label: 'Semua Guru' },
  { key: 'PIMPINAN', label: 'Pimpinan' },
  { key: 'BAHASA', label: 'Bahasa & Sastra' },
  { key: 'MIPA', label: 'MIPA & Informatika' },
  { key: 'SOSIAL_AGAMA', label: 'Sosial & Agama' },
  { key: 'OLAHRAGA_SENI', label: 'PJOK & Kesenian' },
];

export function TeacherDirectory({ initialStaff }: TeacherDirectoryProps) {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('SEMUA');

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

  const filteredStaff = useMemo(() => {
    return initialStaff.filter((staff) => {
      // Category filter
      if (selectedCategory !== 'SEMUA') {
        if (staff.category !== selectedCategory) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = staff.name.toLowerCase().includes(q);
        const matchSubject = (staff.subject || '').toLowerCase().includes(q);
        const matchCode = (staff.code || '').toLowerCase().includes(q);
        const matchTask = (staff.additionalTask || '').toLowerCase().includes(q);
        if (!matchName && !matchSubject && !matchCode && !matchTask) return false;
      }

      return true;
    });
  }, [initialStaff, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Tool Pencarian & Filter Bidang Studi */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          {/* Input Pencarian */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama guru atau mata pelajaran..."
              className="w-full pl-9 pr-9 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1E5631] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label="Hapus kata kunci"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto text-xs font-semibold text-slate-500 tabular-nums">
            <span>Menampilkan <strong>{filteredStaff.length}</strong> dari {initialStaff.length} Pendidik</span>
          </div>
        </div>

        {/* Tab Kategori */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 mr-1 font-medium">
            <Funnel size={13} />
            <span>Rumpun:</span>
          </span>
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.key;
            const count =
              tab.key === 'SEMUA'
                ? initialStaff.length
                : initialStaff.filter((s) => s.category === tab.key).length;

            return (
              <button
                type="button"
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#1E5631] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Kartu Tenaga Pendidik */}
      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredStaff.map((staff) => {
            const initials = getInitials(staff.name);
            const isKepsek = staff.level === 1;

            return (
              <button
                type="button"
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className={`group text-left rounded-2xl bg-white border transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-md ${
                  isKepsek
                    ? 'border-[#1E5631]/50 ring-1 ring-[#1E5631]/20'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* 1. Area Potret Pendidik */}
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
                        {staff.code ? `Kode Guru: ${staff.code}` : 'Tenaga Pendidik'}
                      </span>
                    </div>
                  )}

                  {/* Badge Kode Guru / Pimpinan di pojok kanan atas foto */}
                  <div className="absolute top-2.5 right-2.5">
                    {isKepsek ? (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#1E5631] text-white shadow-xs">
                        Pimpinan
                      </span>
                    ) : staff.code ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/90 text-slate-700 shadow-xs border border-slate-200/80">
                        Kode {staff.code}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* 2. Informasi Inti Pendidik */}
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
                    <span className="font-mono text-[11px] text-slate-500 tabular-nums truncate">
                      {staff.nip ? `NIP. ${staff.nip}` : staff.education || 'Tenaga Pendidik'}
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
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200/80 space-y-2.5">
          <ChalkboardTeacher size={36} className="text-slate-300 mx-auto" />
          <h2 className="text-base font-bold text-slate-800">
            Pendidik Tidak Ditemukan
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tidak ada guru yang sesuai dengan kata kunci atau filter rumpun mata pelajaran yang Anda pilih.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('SEMUA');
            }}
            className="px-4 py-2 rounded-xl bg-[#1E5631] text-white text-xs font-bold hover:bg-[#164325] transition-colors cursor-pointer mt-1"
          >
            Tampilkan Seluruh Guru
          </button>
        </div>
      )}

      {/* Drawer Rincian Data Kepegawaian */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setSelectedStaff(null)}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-2xs transition-opacity"
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
                Data Kepegawaian Pendidik
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
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-[#1E5631]">
                      {selectedStaff.position}
                    </p>
                    {selectedStaff.code && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                        Kode {selectedStaff.code}
                      </span>
                    )}
                  </div>
                  <h2
                    id="staff-drawer-title"
                    className="text-lg font-bold text-slate-900 leading-snug"
                  >
                    {selectedStaff.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    SMP Negeri 5 Cibeber, Kab. Lebak
                  </p>
                </div>
              </div>

              {/* Tabel Rincian Kepegawaian */}
              <dl className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80 text-xs">
                {selectedStaff.nip && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium flex items-center gap-1.5">
                      <IdentificationBadge size={15} className="text-[#1E5631]" />
                      <span>NIP Resmi</span>
                    </dt>
                    <dd className="col-span-7 font-mono font-semibold text-slate-900 tabular-nums">
                      {selectedStaff.nip}
                    </dd>
                  </div>
                )}

                {selectedStaff.subject && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium">Mata Pelajaran</dt>
                    <dd className="col-span-7 font-semibold text-slate-900">
                      {selectedStaff.subject}
                    </dd>
                  </div>
                )}

                {selectedStaff.education && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium flex items-center gap-1.5">
                      <GraduationCap size={15} className="text-[#1E5631]" />
                      <span>Kualifikasi</span>
                    </dt>
                    <dd className="col-span-7 font-semibold text-slate-900">
                      {selectedStaff.education}
                    </dd>
                  </div>
                )}

                {selectedStaff.additionalTask && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium flex items-center gap-1.5">
                      <Clock size={15} className="text-[#1E5631]" />
                      <span>Beban KBM &amp; Tugas</span>
                    </dt>
                    <dd className="col-span-7 font-semibold text-slate-900 leading-relaxed">
                      {selectedStaff.additionalTask}
                    </dd>
                  </div>
                )}

                {selectedStaff.email && (
                  <div className="py-3 grid grid-cols-12 gap-2">
                    <dt className="col-span-5 text-slate-500 font-medium">Pos-el (Email)</dt>
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
                className="px-4 py-2 rounded-xl bg-[#1E5631] hover:bg-[#164325] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
