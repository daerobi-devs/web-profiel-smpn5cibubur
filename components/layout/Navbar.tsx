'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  List,
  X,
  GraduationCap,
  House,
  Info,
  Buildings,
  Trophy,
  Newspaper,
  Images,
  PhoneCall,
  LockSimple,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Sparkle,
  CaretDown,
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { href: '/', label: 'Beranda', icon: House },
  { href: '/profil', label: 'Profil', icon: Info },
  { href: '/fasilitas', label: 'Fasilitas', icon: Buildings },
  { href: '/kesiswaan', label: 'Kesiswaan', icon: Trophy },
  { href: '/berita', label: 'Berita', icon: Newspaper },
  { href: '/ppdb', label: 'PPDB', icon: GraduationCap },
  { href: '/kontak', label: 'Kontak', icon: PhoneCall },
];

interface NavbarProps {
  settings?: Record<string, string>;
}

export default function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  // Dropdown Submenu Profil State
  const [profilOpen, setProfilOpen] = useState(false);
  const [mobileProfilExpanded, setMobileProfilExpanded] = useState(false);
  const profilTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dropdown Submenu Kesiswaan State
  const [kesiswaanOpen, setKesiswaanOpen] = useState(false);
  const [mobileKesiswaanExpanded, setMobileKesiswaanExpanded] = useState(false);
  const kesiswaanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dropdown Submenu Berita State
  const [beritaOpen, setBeritaOpen] = useState(false);
  const [mobileBeritaExpanded, setMobileBeritaExpanded] = useState(false);
  const beritaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProfilEnter = () => {
    if (profilTimeoutRef.current) clearTimeout(profilTimeoutRef.current);
    setProfilOpen(true);
  };

  const handleProfilLeave = () => {
    profilTimeoutRef.current = setTimeout(() => {
      setProfilOpen(false);
    }, 180);
  };

  const handleKesiswaanEnter = () => {
    if (kesiswaanTimeoutRef.current) clearTimeout(kesiswaanTimeoutRef.current);
    setKesiswaanOpen(true);
  };

  const handleKesiswaanLeave = () => {
    kesiswaanTimeoutRef.current = setTimeout(() => {
      setKesiswaanOpen(false);
    }, 180);
  };

  const handleBeritaEnter = () => {
    if (beritaTimeoutRef.current) clearTimeout(beritaTimeoutRef.current);
    setBeritaOpen(true);
  };

  const handleBeritaLeave = () => {
    beritaTimeoutRef.current = setTimeout(() => {
      setBeritaOpen(false);
    }, 180);
  };

  const closeAllDropdowns = () => {
    setProfilOpen(false);
    setKesiswaanOpen(false);
    setBeritaOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    return () => {
      if (profilTimeoutRef.current) clearTimeout(profilTimeoutRef.current);
      if (kesiswaanTimeoutRef.current) clearTimeout(kesiswaanTimeoutRef.current);
      if (beritaTimeoutRef.current) clearTimeout(beritaTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setSelectedPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll saat mobile menu terbuka
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const currentPath = selectedPath ?? pathname;
  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    if (href === '/profil') return currentPath.startsWith('/profil');
    if (href === '/kesiswaan') return currentPath.startsWith('/kesiswaan') || currentPath.startsWith('/prestasi') || currentPath.startsWith('/ekstrakurikuler');
    if (href === '/berita') return currentPath.startsWith('/berita') || currentPath.startsWith('/agenda') || currentPath.startsWith('/galeri');
    return currentPath.startsWith(href);
  };

  const showPpdb = settings?.show_ppdb_menu !== 'false';
  const activeNavLinks = showPpdb ? navLinks : navLinks.filter((l) => l.href !== '/ppdb');

  const activeHref = activeNavLinks.find((l) => isActive(l.href))?.href ?? (currentPath === '/' ? '/' : null);

  const phone = settings?.school_phone || '0852-8145-9726';
  const whatsapp = settings?.school_whatsapp || '0852-8145-9726';
  const ppdbYear = settings?.ppdb_year || '2026/2027';
  const accreditation = settings?.school_accreditation || 'B';
  const adminUrl =
    process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://ekosistem.daeroom.my.id';

  return (
    <>
      {/* 1. TOP UTILITY STRIP (SEKOLAH CIPUTRA STYLE) */}
      <div className="bg-[#143d22] text-emerald-100/90 text-[11px] sm:text-xs border-b border-emerald-900/60 hidden md:block">
        <div className="container-site">
          <div className="flex items-center justify-between h-9">
            {/* Left: Lokasi, Jam Belajar, Telepon Resmi */}
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-emerald-200/90">
                <MapPin size={13} weight="fill" className="text-amber-400" />
                <span>Kecamatan Cibeber, Kab. Lebak, Banten</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-200/90">
                <Clock size={13} weight="bold" className="text-emerald-300" />
                <span>Senin – Jumat: 07.00 – 15.30 WIB</span>
              </span>
              <a
                href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors"
              >
                <Phone size={13} weight="fill" className="text-emerald-300" />
                <span>{phone}</span>
              </a>
            </div>

            {/* Right: Akses Pengelola Sekolah */}
            <div className="flex items-center gap-4">
              <a
                href={adminUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-200/90 hover:text-white transition-colors"
                title="Pusat Kendali Portal Akademik & Superadmin"
              >
                <LockSimple size={12} weight="bold" className="text-amber-400" />
                <span>Portal Akademik (Admin)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY NAVIGATION BAR */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1E5631]/95 backdrop-blur-md border-b border-[#164325] shadow-md shadow-emerald-950/20'
            : 'bg-[#1E5631] border-b border-[#164325]'
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-17 sm:h-20">
            {/* Logo & Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group py-1 active:scale-98 transition-transform"
              onClick={() => {
                setMobileOpen(false);
                setSelectedPath('/');
              }}
            >
              {/* Logo Tanpa Background Putih — Berdiri Bebas dengan Siluet Cahaya Halus */}
              <div className="relative w-9 h-11 sm:w-11 sm:h-13 shrink-0 drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)] group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/assets/logo-smpn5cibeber.png"
                  alt="Logo Resmi SMPN 5 Cibeber"
                  fill
                  sizes="48px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight leading-tight whitespace-nowrap">
                  SMP NEGERI 5 CIBEBER
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-emerald-200/90 leading-none mt-1">
                  Cibeber &bull; Lebak, Banten
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links — Apple/iPhone Style Segmented Control (Centered) */}
            <div className="hidden xl:flex flex-1 items-center justify-center px-4">
              <nav className="flex items-center gap-1">
                {activeNavLinks.map((link) => {
                  const isSelected = activeHref === link.href;
                  const isProfil = link.href === '/profil';

                  if (isProfil) {
                    return (
                      <div
                        key={link.href}
                        className="relative"
                        onMouseEnter={handleProfilEnter}
                        onMouseLeave={handleProfilLeave}
                      >
                        <motion.div
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          className="relative shrink-0"
                        >
                          <Link
                            href="/profil"
                            onClick={(e) => {
                              closeAllDropdowns();
                              setSelectedPath('/profil');
                              router.push('/profil');
                              if (pathname === '/profil') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
                            className={`relative flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[13px] font-semibold tracking-wide whitespace-nowrap select-none transition-colors duration-150 z-10 cursor-pointer ${
                              isSelected
                                ? 'text-white font-bold'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {/* iPhone / Apple Liquid Sliding Pill Indicator (Pindah Saat Dipencet) */}
                            {isSelected && (
                              <motion.div
                                layoutId="navbar-active-pill"
                                className="absolute inset-0 rounded-xl -z-10 bg-white/25 border border-white/40 shadow-sm shadow-emerald-950/20 backdrop-blur-md"
                                transition={{
                                  type: 'spring',
                                  stiffness: 420,
                                  damping: 30,
                                  mass: 0.8,
                                }}
                              />
                            )}
                            <span className="relative z-10">{link.label}</span>
                            <CaretDown
                              size={12}
                              weight="bold"
                              className={`relative z-10 transition-transform duration-200 ${
                                profilOpen ? 'rotate-180 text-white' : 'text-emerald-200/80'
                              }`}
                            />
                          </Link>
                        </motion.div>

                        {/* Level 1 Dropdown: Profil */}
                        <AnimatePresence>
                          {profilOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.97 }}
                              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute top-full left-0 pt-2 z-50"
                            >
                              <div className="w-60 p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-950/10 shadow-xl shadow-emerald-950/20 ring-1 ring-black/5 space-y-0.5">
                                {/* Item 1: Sejarah */}
                                <Link
                                  href="/profil/sejarah"
                                  onClick={closeAllDropdowns}
                                  className="flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:text-[#1E5631] hover:bg-emerald-50 transition-colors duration-150"
                                >
                                  Sejarah
                                </Link>

                                {/* Item 2: Visi & Misi */}
                                <Link
                                  href="/profil/visi-misi"
                                  onClick={closeAllDropdowns}
                                  className="flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:text-[#1E5631] hover:bg-emerald-50 transition-colors duration-150"
                                >
                                  Visi &amp; Misi
                                </Link>

                                {/* Item 3: Dewan Guru & Tenaga Pendidik */}
                                <Link
                                  href="/profil/guru"
                                  onClick={closeAllDropdowns}
                                  className="flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:text-[#1E5631] hover:bg-emerald-50 transition-colors duration-150"
                                >
                                  Dewan Guru &amp; Tenaga Pendidik
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  if (link.href === '/kesiswaan') {
                    return (
                      <div
                        key={link.href}
                        className="relative"
                        onMouseEnter={handleKesiswaanEnter}
                        onMouseLeave={handleKesiswaanLeave}
                      >
                        <motion.div
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          className="relative shrink-0"
                        >
                          <Link
                            href="/prestasi"
                            onClick={() => {
                              closeAllDropdowns();
                              setSelectedPath('/kesiswaan');
                              router.push('/prestasi');
                              if (pathname === '/prestasi') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
                            className={`relative flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[13px] font-semibold tracking-wide whitespace-nowrap select-none transition-colors duration-150 z-10 cursor-pointer ${
                              isSelected
                                ? 'text-white font-bold'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {/* iPhone / Apple Liquid Sliding Pill Indicator */}
                            {isSelected && (
                              <motion.div
                                layoutId="navbar-active-pill"
                                className="absolute inset-0 rounded-xl -z-10 bg-white/25 border border-white/40 shadow-sm shadow-emerald-950/20 backdrop-blur-md"
                                transition={{
                                  type: 'spring',
                                  stiffness: 420,
                                  damping: 30,
                                  mass: 0.8,
                                }}
                              />
                            )}
                            <span className="relative z-10">{link.label}</span>
                            <CaretDown
                              size={12}
                              weight="bold"
                              className={`relative z-10 transition-transform duration-200 ${
                                kesiswaanOpen ? 'rotate-180 text-white' : 'text-emerald-200/80'
                              }`}
                            />
                          </Link>
                        </motion.div>

                        {/* Level 1 Dropdown: Kesiswaan */}
                        <AnimatePresence>
                          {kesiswaanOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.97 }}
                              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute top-full left-0 pt-2 z-50"
                            >
                              <div className="w-56 p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-950/10 shadow-xl shadow-emerald-950/20 ring-1 ring-black/5 space-y-0.5">
                                {/* Item 1: Prestasi Siswa */}
                                <Link
                                  href="/prestasi"
                                  onClick={closeAllDropdowns}
                                  className="flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:text-[#1E5631] hover:bg-emerald-50 transition-colors duration-150"
                                >
                                  Prestasi Siswa
                                </Link>

                                {/* Item 2: Ekstrakurikuler */}
                                <Link
                                  href="/ekstrakurikuler"
                                  onClick={closeAllDropdowns}
                                  className="flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:text-[#1E5631] hover:bg-emerald-50 transition-colors duration-150"
                                >
                                  Ekstrakurikuler
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  if (link.href === '/berita') {
                    return (
                      <div
                        key={link.href}
                        className="relative"
                        onMouseEnter={handleBeritaEnter}
                        onMouseLeave={handleBeritaLeave}
                      >
                        <motion.div
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          className="relative shrink-0"
                        >
                          <Link
                            href="/berita"
                            onClick={() => {
                              closeAllDropdowns();
                              setSelectedPath('/berita');
                              router.push('/berita');
                              if (pathname === '/berita') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
                            className={`relative flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[13px] font-semibold tracking-wide whitespace-nowrap select-none transition-colors duration-150 z-10 cursor-pointer ${
                              isSelected
                                ? 'text-white font-bold'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {/* iPhone / Apple Liquid Sliding Pill Indicator */}
                            {isSelected && (
                              <motion.div
                                layoutId="navbar-active-pill"
                                className="absolute inset-0 rounded-xl -z-10 bg-white/25 border border-white/40 shadow-sm shadow-emerald-950/20 backdrop-blur-md"
                                transition={{
                                  type: 'spring',
                                  stiffness: 420,
                                  damping: 30,
                                  mass: 0.8,
                                }}
                              />
                            )}
                            <span className="relative z-10">{link.label}</span>
                            <CaretDown
                              size={12}
                              weight="bold"
                              className={`relative z-10 transition-transform duration-200 ${
                                beritaOpen ? 'rotate-180 text-white' : 'text-emerald-200/80'
                              }`}
                            />
                          </Link>
                        </motion.div>

                        {/* Level 1 Dropdown: Berita & Agenda */}
                        <AnimatePresence>
                          {beritaOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.97 }}
                              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute top-full left-0 pt-2 z-50"
                            >
                              <div className="w-56 p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-950/10 shadow-xl shadow-emerald-950/20 ring-1 ring-black/5 space-y-0.5">
                                {/* Item 1: Berita & Pengumuman */}
                                <Link
                                  href="/berita"
                                  onClick={closeAllDropdowns}
                                  className="flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:text-[#1E5631] hover:bg-emerald-50 transition-colors duration-150"
                                >
                                  Berita &amp; Pengumuman
                                </Link>

                                {/* Item 2: Galeri Kegiatan */}
                                <Link
                                  href="/galeri"
                                  onClick={closeAllDropdowns}
                                  className="flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:text-[#1E5631] hover:bg-emerald-50 transition-colors duration-150"
                                >
                                  Galeri Kegiatan
                                </Link>

                                {/* Item 3: Agenda Sekolah */}
                                <Link
                                  href="/agenda"
                                  onClick={closeAllDropdowns}
                                  className="flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:text-[#1E5631] hover:bg-emerald-50 transition-colors duration-150"
                                >
                                  Agenda Sekolah
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={link.href}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="relative shrink-0"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setSelectedPath(link.href)}
                        className={`relative block px-3.5 py-1.5 rounded-xl text-[13px] font-semibold tracking-wide whitespace-nowrap select-none transition-colors duration-150 z-10 ${
                          isSelected
                            ? 'text-white font-bold'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {/* iPhone / Apple Liquid Sliding Pill Indicator (Pindah Saat Dipencet) */}
                        {isSelected && (
                          <motion.div
                            layoutId="navbar-active-pill"
                            className="absolute inset-0 rounded-xl -z-10 bg-white/25 border border-white/40 shadow-sm shadow-emerald-950/20 backdrop-blur-md"
                            transition={{
                              type: 'spring',
                              stiffness: 420,
                              damping: 30,
                              mass: 0.8,
                            }}
                          />
                        )}
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Elements (Mobile Hamburger Button) */}
            <div className="flex items-center shrink-0">
              {/* Mobile Hamburger Button */}
              <button
                className="xl:hidden p-2 sm:p-2.5 rounded-xl text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu navigasi"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 top-[60px] sm:top-[68px] z-30 bg-[#164325]/45 backdrop-blur-xs xl:hidden"
              />

              {/* Drawer Content */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-2xl xl:hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto"
              >
                <div className="container-site py-4 space-y-4">
                  {/* PPDB Hero Card on Mobile (Kondisional Saklar Supabase) */}
                  {showPpdb && (
                    <Link
                      href="/ppdb"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-[#B45309] text-white font-bold shadow-md shadow-amber-950/20 active:scale-98 transition-transform"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center p-1 shrink-0">
                          <Image
                            src="/assets/logo-smpn5cibeber.png"
                            alt="Logo Resmi SMPN 5 Cibeber"
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold leading-tight">Pendaftaran PPDB {ppdbYear}</p>
                          <p className="text-[11px] text-amber-100 font-medium">Jalur Zonasi, Prestasi, & Afirmasi</p>
                        </div>
                      </div>
                      <ArrowRight size={18} weight="bold" />
                    </Link>
                  )}

                  {/* Nav Links */}
                  <nav className="grid grid-cols-1 gap-1">
                    {activeNavLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      const isProfil = link.href === '/profil';

                      if (isProfil) {
                        return (
                          <div key={link.href} className="space-y-1">
                            <div
                              className={`flex items-center justify-between rounded-xl transition-colors ${
                                active ? 'bg-[#eaf4ed] text-[#1E5631]' : 'hover:bg-slate-50 text-[#1E293B]'
                              }`}
                            >
                              <Link
                                href="/profil"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setSelectedPath('/profil');
                                  router.push('/profil');
                                  if (pathname === '/profil') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                }}
                                className={`flex-1 flex items-center gap-3 px-3.5 py-3 text-sm font-medium ${
                                  active ? 'font-bold text-[#1E5631]' : 'text-[#1E293B]'
                                }`}
                              >
                                <Icon
                                  size={19}
                                  weight={active ? 'fill' : 'regular'}
                                  className={active ? 'text-[#1E5631]' : 'text-slate-400'}
                                />
                                <span>{link.label}</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => setMobileProfilExpanded(!mobileProfilExpanded)}
                                className="p-3 text-slate-500 hover:text-[#1E5631] transition-colors"
                                aria-label="Buka submenu profil"
                              >
                                <CaretDown
                                  size={16}
                                  weight="bold"
                                  className={`transition-transform duration-200 ${
                                    mobileProfilExpanded ? 'rotate-180 text-[#1E5631]' : ''
                                  }`}
                                />
                              </button>
                            </div>

                            {mobileProfilExpanded && (
                              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-emerald-500/30 ml-4">
                                <Link
                                  href="/profil/sejarah"
                                  onClick={() => setMobileOpen(false)}
                                  className="block p-2 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#1E5631]"
                                >
                                  Sejarah
                                </Link>
                                <Link
                                  href="/profil/visi-misi"
                                  onClick={() => setMobileOpen(false)}
                                  className="block p-2 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#1E5631]"
                                >
                                  Visi &amp; Misi
                                </Link>
                                <Link
                                  href="/profil/guru"
                                  onClick={() => setMobileOpen(false)}
                                  className="block p-2 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#1E5631]"
                                >
                                  Dewan Guru &amp; Tenaga Pendidik
                                </Link>
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (link.href === '/kesiswaan') {
                        return (
                          <div key={link.href} className="space-y-1">
                            <div
                              className={`flex items-center justify-between rounded-xl transition-colors ${
                                active ? 'bg-[#eaf4ed] text-[#1E5631]' : 'hover:bg-slate-50 text-[#1E293B]'
                              }`}
                            >
                              <Link
                                href="/prestasi"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setSelectedPath('/kesiswaan');
                                  router.push('/prestasi');
                                  if (pathname === '/prestasi') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                }}
                                className={`flex-1 flex items-center gap-3 px-3.5 py-3 text-sm font-medium ${
                                  active ? 'font-bold text-[#1E5631]' : 'text-[#1E293B]'
                                }`}
                              >
                                <Icon
                                  size={19}
                                  weight={active ? 'fill' : 'regular'}
                                  className={active ? 'text-[#1E5631]' : 'text-slate-400'}
                                />
                                <span>{link.label}</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => setMobileKesiswaanExpanded(!mobileKesiswaanExpanded)}
                                className="p-3 text-slate-500 hover:text-[#1E5631] transition-colors"
                                aria-label="Buka submenu kesiswaan"
                              >
                                <CaretDown
                                  size={16}
                                  weight="bold"
                                  className={`transition-transform duration-200 ${
                                    mobileKesiswaanExpanded ? 'rotate-180 text-[#1E5631]' : ''
                                  }`}
                                />
                              </button>
                            </div>

                            {mobileKesiswaanExpanded && (
                              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-emerald-500/30 ml-4">
                                <Link
                                  href="/prestasi"
                                  onClick={() => setMobileOpen(false)}
                                  className="block p-2 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#1E5631]"
                                >
                                  Prestasi Siswa
                                </Link>
                                <Link
                                  href="/ekstrakurikuler"
                                  onClick={() => setMobileOpen(false)}
                                  className="block p-2 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#1E5631]"
                                >
                                  Ekstrakurikuler
                                </Link>
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (link.href === '/berita') {
                        return (
                          <div key={link.href} className="space-y-1">
                            <div
                              className={`flex items-center justify-between rounded-xl transition-colors ${
                                active ? 'bg-[#eaf4ed] text-[#1E5631]' : 'hover:bg-slate-50 text-[#1E293B]'
                              }`}
                            >
                              <Link
                                href="/berita"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setSelectedPath('/berita');
                                  router.push('/berita');
                                  if (pathname === '/berita') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                }}
                                className={`flex-1 flex items-center gap-3 px-3.5 py-3 text-sm font-medium ${
                                  active ? 'font-bold text-[#1E5631]' : 'text-[#1E293B]'
                                }`}
                              >
                                <Icon
                                  size={19}
                                  weight={active ? 'fill' : 'regular'}
                                  className={active ? 'text-[#1E5631]' : 'text-slate-400'}
                                />
                                <span>{link.label}</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => setMobileBeritaExpanded(!mobileBeritaExpanded)}
                                className="p-3 text-slate-500 hover:text-[#1E5631] transition-colors"
                                aria-label="Buka submenu berita"
                              >
                                <CaretDown
                                  size={16}
                                  weight="bold"
                                  className={`transition-transform duration-200 ${
                                    mobileBeritaExpanded ? 'rotate-180 text-[#1E5631]' : ''
                                  }`}
                                />
                              </button>
                            </div>

                            {mobileBeritaExpanded && (
                              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-emerald-500/30 ml-4">
                                <Link
                                  href="/berita"
                                  onClick={() => setMobileOpen(false)}
                                  className="block p-2 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#1E5631]"
                                >
                                  Berita &amp; Pengumuman
                                </Link>
                                <Link
                                  href="/galeri"
                                  onClick={() => setMobileOpen(false)}
                                  className="block p-2 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#1E5631]"
                                >
                                  Galeri Kegiatan
                                </Link>
                                <Link
                                  href="/agenda"
                                  onClick={() => setMobileOpen(false)}
                                  className="block p-2 rounded-lg hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#1E5631]"
                                >
                                  Agenda Sekolah
                                </Link>
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 active:scale-98 ${
                            active
                              ? 'bg-[#eaf4ed] text-[#1E5631] font-bold'
                              : 'text-[#1E293B] hover:bg-slate-100 hover:text-[#1E5631]'
                          }`}
                        >
                          <Icon
                            size={19}
                            weight={active ? 'fill' : 'regular'}
                            className={active ? 'text-[#1E5631]' : 'text-slate-400'}
                          />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Quick Utility Links on Mobile */}
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <a
                      href={adminUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 font-bold text-[#1E5631]"
                    >
                      <LockSimple size={15} weight="bold" className="text-[#1E5631]" />
                      <span>Portal Akademik (Admin)</span>
                    </a>

                    <Link
                      href="/kontak"
                      onClick={() => setMobileOpen(false)}
                      className="font-semibold text-[#1E5631] hover:underline p-2"
                    >
                      Hubungi Sekolah &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
