'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'motion/react';
import {
  ShieldCheck,
  CalendarCheck,
  GraduationCap,
  ChalkboardTeacher,
} from '@phosphor-icons/react';

interface HomeStatsCounterProps {
  accreditation: string;
  staffCount: number;
}

function CounterValue({
  target,
  suffix = '',
  duration = 1.4,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!inView) return;

    const start = 0;
    const end = target;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Easing curve (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * (end - start) + start);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [inView, target, duration]);

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
}: HomeStatsCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative z-10 w-full bg-white border-b border-slate-200/90 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-slate-200"
        >
          {/* Metric 1: Akreditasi B */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="py-2 px-2 sm:px-3 flex flex-col items-center text-center transition-colors group cursor-default"
          >
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#1E5631] border border-emerald-100/80 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} weight="duotone" />
            </div>
            <p className="font-serif-academic text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E5631] tracking-tight whitespace-nowrap">
              Akreditasi {accreditation}
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Predikat Baik (BAN-S/M)
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Standar Kelayakan Nasional
            </p>
          </motion.div>

          {/* Metric 2: 20+ Tahun */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="py-2 px-2 sm:px-3 flex flex-col items-center text-center transition-colors group cursor-default"
          >
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-[#D97706] border border-amber-100/80 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <CalendarCheck size={20} weight="duotone" />
            </div>
            <p className="font-serif-academic text-xl sm:text-2xl lg:text-3xl font-bold text-[#D97706] tracking-tight whitespace-nowrap">
              <CounterValue target={20} suffix="+ Tahun" />
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Dedikasi Pengabdian
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Mendidik Generasi Sejak 2004
            </p>
          </motion.div>

          {/* Metric 3: 100% Kelulusan */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="py-2 px-2 sm:px-3 flex flex-col items-center text-center transition-colors group cursor-default"
          >
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#1E5631] border border-emerald-100/80 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <GraduationCap size={20} weight="duotone" />
            </div>
            <p className="font-serif-academic text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E5631] tracking-tight whitespace-nowrap">
              <CounterValue target={100} suffix="%" />
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Tingkat Kelulusan
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Lanjut ke SMA / SMK Negeri
            </p>
          </motion.div>

          {/* Metric 4: Dewan Guru & Staf */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="py-2 px-2 sm:px-3 flex flex-col items-center text-center transition-colors group cursor-default"
          >
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-[#D97706] border border-amber-100/80 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ChalkboardTeacher size={20} weight="duotone" />
            </div>
            <p className="font-serif-academic text-xl sm:text-2xl lg:text-3xl font-bold text-[#D97706] tracking-tight whitespace-nowrap">
              <CounterValue target={staffCount > 0 ? staffCount : 12} suffix="+" />
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Dewan Guru &amp; Staf
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Pendidik Profesional Berdedikasi
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
