'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface HomeStatsCounterProps {
  accreditation: string;
  staffCount: number;
  achievementCount?: number;
  npsn?: string;
}

function CounterValue({
  target,
  suffix = '',
  duration = 1.1,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || target <= 0 || prefersReducedMotion || hasAnimated.current) {
      setCount(target);
      return;
    }

    hasAnimated.current = true;
    const startTime = performance.now();
    const durationMs = duration * 1000;
    let animId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const nextVal = Math.min(target, Math.round(ease * target));
      setCount(nextVal);

      if (progress < 1) {
        animId = requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    setCount(0);
    animId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animId);
  }, [inView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function HomeStatsCounter({
  accreditation = 'B',
  staffCount = 12,
  achievementCount = 15,
  npsn = '20607865',
}: HomeStatsCounterProps) {
  const resolvedAchievements = achievementCount > 0 ? achievementCount : 15;
  const resolvedStaff = staffCount > 0 ? staffCount : 12;

  return (
    <section
      aria-label="Data Ringkas Satuan Pendidikan"
      className="relative z-10 w-full bg-white border-b border-slate-200"
    >
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x divide-slate-200/90">
          {/* 1. Status Akreditasi & NPSN */}
          <div className="py-6 sm:py-7 pr-4 sm:px-6 first:pl-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Status Kelembagaan
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5 tabular-nums">
              Akreditasi {accreditation}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              BAN-S/M &middot; NPSN {npsn}
            </p>
          </div>

          {/* 2. Tahun Berdiri */}
          <div className="py-6 sm:py-7 pl-4 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Masa Pengabdian
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5 tabular-nums">
              <CounterValue target={20} suffix="+ Tahun" />
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Berdiri sejak tahun 2004
            </p>
          </div>

          {/* 3. Tenaga Pendidik */}
          <div className="py-6 sm:py-7 pr-4 sm:px-6 border-t lg:border-t-0 border-slate-200/90">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Tenaga Pendidik
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5 tabular-nums">
              <CounterValue target={resolvedStaff} suffix=" Pendidik" />
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Guru mata pelajaran &amp; staf TU
            </p>
          </div>

          {/* 4. Capaian Siswa */}
          <div className="py-6 sm:py-7 pl-4 sm:px-6 lg:pr-0 border-t lg:border-t-0 border-slate-200/90">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Rekam Capaian
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#1E5631] tracking-tight mt-1.5 tabular-nums">
              <CounterValue target={resolvedAchievements} suffix="+ Penghargaan" />
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Tingkat kecamatan &amp; kabupaten
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
