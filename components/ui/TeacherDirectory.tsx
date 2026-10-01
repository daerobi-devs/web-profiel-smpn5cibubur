'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  MagnifyingGlass,
  GraduationCap,
  IdentificationCard,
  UserCheck,
  ChalkboardTeacher,
} from '@phosphor-icons/react';
import type { StaffMember } from '@/lib/staffData';

interface TeacherDirectoryProps {
  initialStaff: StaffMember[];
}

export function TeacherDirectory({ initialStaff }: TeacherDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | '1' | '2' | '3' | 'tu'>('all');

  // Filter staff by category and search
  const filteredStaff = useMemo(() => {
    return initialStaff.filter((staff) => {
      // Category filter
      if (selectedCategory === '1' && staff.level !== 1) return false;
      if (selectedCategory === '2' && (staff.level !== 2 || staff.position.toLowerCase().includes('tata usaha'))) return false;
      if (selectedCategory === '3' && staff.level !== 3) return false;
      if (selectedCategory === 'tu' && !staff.position.toLowerCase().includes('tata usaha') && !staff.position.toLowerCase().includes('operator')) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = staff.name.toLowerCase().includes(query);
        const matchPos = staff.position.toLowerCase().includes(query);
        const matchNip = staff.nip ? staff.nip.toLowerCase().includes(query) : false;
        const matchEdu = staff.education ? staff.education.toLowerCase().includes(query) : false;
        return matchName || matchPos || matchNip || matchEdu;
      }

      return true;
    });
  }, [initialStaff, selectedCategory, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: initialStaff.length,
      pimpinan: initialStaff.filter((s) => s.level === 1).length,
      wakasek: initialStaff.filter((s) => s.level === 2 && !s.position.toLowerCase().includes('tata usaha')).length,
      guru: initialStaff.filter((s) => s.level === 3).length,
      tu: initialStaff.filter((s) => s.position.toLowerCase().includes('tata usaha') || s.position.toLowerCase().includes('operator')).length,
    };
  }, [initialStaff]);

  return (
    <div className="space-y-8">
      {/* Bar Filter & Pencarian Interaktif */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs Kategori */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#1E5631] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Semua ({counts.all})
            </button>
            <button
              onClick={() => setSelectedCategory('1')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === '1'
                  ? 'bg-[#1E5631] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Pimpinan ({counts.pimpinan})
            </button>
            <button
              onClick={() => setSelectedCategory('2')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === '2'
                  ? 'bg-[#1E5631] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Wakil Kepala ({counts.wakasek})
            </button>
            <button
              onClick={() => setSelectedCategory('3')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === '3'
                  ? 'bg-[#1E5631] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Dewan Guru ({counts.guru})
            </button>
            <button
              onClick={() => setSelectedCategory('tu')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'tu'
                  ? 'bg-[#1E5631] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tata Usaha ({counts.tu})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, mata pelajaran, NIP..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E5631]/20 focus:border-[#1E5631] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid Kartu Dewan Guru & Tenaga Kependidikan */}
      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-300 shadow-md shadow-slate-900/5 hover:shadow-lg transition-all p-6 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                {/* Header Foto / Avatar Guru */}
                <div className="flex items-center gap-4">
                  {staff.imageUrl ? (
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm border-2 border-emerald-600 shrink-0">
                      <Image
                        src={staff.imageUrl}
                        alt={staff.name}
                        fill
                        sizes="64px"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-[#1E5631] flex items-center justify-center font-extrabold text-xl shrink-0 shadow-xs border border-emerald-300/40">
                      {staff.name
                        .replace(/^(Drs\.|Dra\.|H\.|Hj\.|Ir\.)\s*/i, '')
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                  )}

                  <div className="space-y-1 min-w-0">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                        staff.level === 1
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : staff.level === 2
                          ? 'bg-blue-100 text-blue-900 border border-blue-200'
                          : 'bg-emerald-100 text-[#1E5631] border border-emerald-200'
                      }`}
                    >
                      {staff.level === 1
                        ? 'Pimpinan Sekolah'
                        : staff.level === 2
                        ? 'Pimpinan & Manajemen'
                        : 'Tenaga Pendidik'}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight truncate">
                      {staff.name}
                    </h3>
                  </div>
                </div>

                {/* Jabatan / Mata Pelajaran */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <div className="flex items-start gap-2">
                    <ChalkboardTeacher size={16} weight="duotone" className="text-[#1E5631] shrink-0 mt-0.5" />
                    <p className="text-xs font-bold text-slate-700 leading-snug">
                      {staff.position}
                    </p>
                  </div>
                </div>

                {/* Informasi NIP & Kualifikasi */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  {staff.nip && (
                    <div className="flex items-center gap-2">
                      <IdentificationCard size={15} weight="duotone" className="text-slate-400 shrink-0" />
                      <span className="font-mono text-[11px] text-slate-700">
                        NIP: {staff.nip}
                      </span>
                    </div>
                  )}
                  {staff.education && (
                    <div className="flex items-center gap-2">
                      <GraduationCap size={15} weight="duotone" className="text-slate-400 shrink-0" />
                      <span className="text-[11px] text-slate-600">
                        {staff.education}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Aktif Mengajar
                </span>
                <span className="text-slate-400 font-mono text-[10px]">
                  SMPN 5 Cibeber
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <MagnifyingGlass size={24} />
          </div>
          <h4 className="text-base font-bold text-slate-700">
            Guru atau Staf Tidak Ditemukan
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tidak ada data guru yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Silakan periksa kembali ejaan atau pilih kategori &ldquo;Semua&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#1E5631] text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}
