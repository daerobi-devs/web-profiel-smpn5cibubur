import Link from 'next/link';
import MegaMendungPattern from '@/components/ui/MegaMendungPattern';
import {
  GraduationCap,
  Phone,
  Envelope,
  MapPin,
  WhatsappLogo,
  Clock,
  ShieldCheck,
  LockSimple,
} from '@phosphor-icons/react/dist/ssr';

type FooterProps = {
  settings?: Record<string, string>;
};

export default function Footer({ settings = {} }: FooterProps) {
  const schoolName = settings.school_name ?? 'SMPN 5 Cibeber';
  const address =
    settings.school_address ?? 'Jl. Raya Cikotok-Pasirkuray Km.05, Warungbanten, Kec. Cibeber, Kabupaten Lebak, Provinsi Banten 42394';
  const shortAddress = address.includes('Warungbanten')
    ? 'Warungbanten, Kec. Cibeber, Kab. Lebak, Banten 42394'
    : address;
  const phone = settings.school_phone ?? '0852-8145-9726';
  const email = settings.school_email ?? 'smpnlimacibeber@yahoo.com';
  const whatsapp = settings.school_whatsapp ?? '085281459726';
  const accreditation = settings.school_accreditation ?? 'B';
  const npsn = settings.school_npsn ?? '20607865';
  const year = new Date().getFullYear();

  const cleanWa = whatsapp.replace(/[^0-9]/g, '');
  const adminUrl =
    process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://ekosistem.daeroom.my.id';

  return (
    <footer className="relative overflow-hidden bg-[#1E5631] text-emerald-100/90 border-t border-[#164325]">
      {/* Siluet Batik Mega Mendung Warna Putih Khas Jawa Barat */}
      <MegaMendungPattern variant="white" opacity="opacity-[0.16]" />

      {/* Top Banner / Trust bar */}
      <div className="relative z-10 border-b border-[#164325] bg-[#164325]/70 py-2.5 sm:py-3">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 text-[11px] font-semibold">
              <ShieldCheck size={14} weight="fill" className="text-amber-300" />
              Terakreditasi {accreditation} (BAN-S/M)
            </span>
            <span className="text-emerald-200/90 font-mono text-[11px]">NPSN: {npsn}</span>
          </div>

          <p className="text-emerald-100/80 text-center sm:text-right text-[11px] font-medium">
            Mendidik Generasi Beriman, Berprestasi, dan Berkarakter Mulia
          </p>
        </div>
      </div>

      <div className="container-site relative z-10 py-7 sm:py-8 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-3 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0">
                <GraduationCap size={20} weight="fill" className="text-[#1E5631]" />
              </div>
              <div>
                <p className="font-extrabold text-white text-sm tracking-tight">{schoolName}</p>
                <p className="text-[11px] text-emerald-200/90">Kab. Lebak, Banten</p>
              </div>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Lembaga pendidikan tingkat menengah pertama negeri di Cibeber yang berfokus pada budi pekerti, keunggulan akademik, dan cinta kelestarian lingkungan.
            </p>
            {whatsapp && (
              <a
                href={`https://wa.me/${cleanWa}?text=Halo%20SMPN%205%20Cibeber,%20saya%20ingin%20bertanya%20informasi%20sekolah.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold active:scale-95 transition-all shadow-sm"
              >
                <WhatsappLogo size={16} weight="fill" />
                <span>Chat WhatsApp Resmi</span>
              </a>
            )}
          </div>

          {/* Col 2: Navigation Links (2 Kolom Sejajar agar Ramping) */}
          <div className="lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-1.5">
              <span>Navigasi Cepat</span>
            </p>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/profil', label: 'Profil' },
                { href: '/profil/visi-misi', label: 'Visi & Misi' },
                { href: '/profil/guru', label: 'Guru & Staf' },
                { href: '/fasilitas', label: 'Fasilitas' },
                { href: '/prestasi', label: 'Prestasi' },
                { href: '/ekstrakurikuler', label: 'Ekskul' },
                { href: '/berita', label: 'Berita' },
                { href: '/agenda', label: 'Agenda' },
                { href: '/galeri', label: 'Galeri Foto' },
                { href: '/ppdb', label: 'PPDB Online' },
                { href: '/kontak', label: 'Kontak' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-100/80 hover:text-white transition-colors flex items-center gap-1 py-0.5 truncate"
                    title={link.label}
                  >
                    <span className="text-amber-400 text-[10px]">&rsaquo;</span>
                    <span className="truncate">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Layanan & Jam Operasional */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-1.5">
              <Clock size={14} weight="bold" />
              <span>Jam Operasional</span>
            </p>
            <div className="space-y-2 text-xs text-emerald-100/90">
              <div className="p-2.5 rounded-xl bg-[#164325]/80 border border-white/10 space-y-1 text-[11px]">
                <p className="text-white font-semibold text-xs mb-1">Pelayanan Tata Usaha (TU):</p>
                <div className="flex justify-between text-emerald-200/90">
                  <span>Senin – Kamis</span>
                  <span className="font-mono text-white">07.30 – 15.00</span>
                </div>
                <div className="flex justify-between text-emerald-200/90">
                  <span>Jumat</span>
                  <span className="font-mono text-white">07.30 – 11.30</span>
                </div>
                <div className="flex justify-between text-emerald-300/80 pt-0.5 border-t border-white/10">
                  <span>Sabtu – Minggu</span>
                  <span>Libur / Tutup</span>
                </div>
              </div>
              <p className="text-[10px] text-emerald-200/70 leading-tight">
                Pertanyaan di luar jam kerja dapat dikirim via WhatsApp sekolah.
              </p>
            </div>
          </div>

          {/* Col 4: Informasi Kontak & Lokasi */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">Kontak & Lokasi</p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2 text-emerald-100/90">
                <MapPin size={15} className="shrink-0 mt-0.5 text-amber-300" />
                <span className="leading-snug text-[11px]">{shortAddress}</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-100/90">
                <Phone size={15} className="shrink-0 text-emerald-300" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors text-[11px]">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-emerald-100/90">
                <Envelope size={15} className="shrink-0 text-amber-300" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors text-[11px] truncate">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & admin access */}
        <div className="border-t border-[#164325] mt-6 pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200/80">
          <p className="text-center sm:text-left text-[11px]">
            &copy; {year} {schoolName}. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={adminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#164325] border border-white/15 hover:border-white/30 text-emerald-100 hover:text-white transition-all text-[11px] active:scale-95"
            >
              <LockSimple size={12} weight="bold" />
              <span>Portal Administrator</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
