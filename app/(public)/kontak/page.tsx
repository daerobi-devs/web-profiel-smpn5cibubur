import Image from 'next/image';
import Link from 'next/link';
import { getWebSettings } from '@/lib/supabaseData';
import {
  Phone,
  Envelope,
  MapPin,
  WhatsappLogo,
  Clock,
  ArrowSquareOut,
} from '@phosphor-icons/react/dist/ssr';
import ContactForm from '@/components/ui/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak & Lokasi Sekolah | SMP Negeri 5 Cibeber',
  description:
    'Alamat lengkap, peta lokasi Google Maps, kontak WhatsApp, email, dan formulir layanan informasi SMP Negeri 5 Cibeber.',
};

export default async function KontakPage() {
  const settings = await getWebSettings();

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* =========================================================
          1. HEADER HALAMAN EDITORIAL (KIRI-RATA)
          ========================================================= */}
      <section className="relative overflow-hidden text-white pt-16 pb-14 md:pt-20 md:pb-16 border-b border-slate-900/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={settings.banner_page_kontak || '/assets/gedung-smpn5cibeber.jpg'}
            alt="Gedung SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/50 to-[#091e10]/85" />
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-3xl space-y-3">
            <nav className="flex items-center gap-2 text-xs font-medium text-white/75">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-amber-300 font-semibold">Kontak &amp; Lokasi</span>
            </nav>

            <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Kontak &amp; Lokasi Sekolah
            </h1>

            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
              Layanan informasi pendaftaran siswa baru, administrasi tata usaha, dan kunjungan resmi di SMP Negeri 5 Cibeber, Kabupaten Lebak.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. FORMULIR KONTAK & INFORMASI LAYANAN
          ========================================================= */}
      <section className="py-12 sm:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
            {/* Kolom Kiri: Form Kirim Pesan (7 Kolom) */}
            <div className="lg:col-span-7">
              <ContactForm whatsappNumber={settings.school_whatsapp} />
            </div>

            {/* Kolom Kanan: Info Kontak Detail (5 Kolom) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 sm:p-7 space-y-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
                <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Informasi Layanan &amp; Kontak Resmi
                </h2>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Alamat */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#eaf4ed] text-[#1E5631] flex items-center justify-center shrink-0">
                      <MapPin size={18} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                        Alamat Sekolah
                      </p>
                      <p className="text-[#1E293B] leading-relaxed font-medium">
                        {settings.school_address ??
                          'Jl. Cikotok – Warungbanten, Desa Warungbanten, Kec. Cibeber, Kab. Lebak, Banten 42394'}
                      </p>
                    </div>
                  </div>

                  {/* Telepon */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#eaf4ed] text-[#1E5631] flex items-center justify-center shrink-0">
                      <Phone size={18} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                        Telepon / WhatsApp Tata Usaha
                      </p>
                      <a
                        href={`tel:${settings.school_phone}`}
                        className="text-[#1E293B] hover:text-[#1E5631] font-semibold transition-colors tabular-nums"
                      >
                        {settings.school_phone ?? '-'}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#eaf4ed] text-[#1E5631] flex items-center justify-center shrink-0">
                      <Envelope size={18} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                        Pos Elektronik (Email)
                      </p>
                      <a
                        href={`mailto:${settings.school_email}`}
                        className="text-[#1E293B] hover:text-[#1E5631] font-semibold break-all transition-colors"
                      >
                        {settings.school_email ?? 'smpnlimacibeber@yahoo.com'}
                      </a>
                    </div>
                  </div>

                  {/* Jam Pelayanan */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#eaf4ed] text-[#1E5631] flex items-center justify-center shrink-0">
                      <Clock size={18} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                        Jam Kerja Pelayanan TU
                      </p>
                      <p className="text-[#1E293B] leading-snug tabular-nums">
                        Senin – Kamis: 07.30 – 15.00 WIB
                        <br />
                        Jumat: 07.30 – 11.30 WIB
                      </p>
                    </div>
                  </div>
                </div>

                {settings.school_whatsapp && (
                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href={`https://wa.me/${settings.school_whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20SMPN%205%20Cibeber,%20saya%20ingin%20bertanya%20informasi%20sekolah.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-[#1E5631] hover:bg-[#164325] text-white text-xs sm:text-sm font-bold transition-colors"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      <span>Hubungi via WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Peta Google Maps Interaktif */}
          {(() => {
            const mapsEmbed =
              settings.maps_embed_url ||
              'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.790938640733!2d106.3265556147708!3d-6.833301695061611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e42886c787be401%3A0x446d78d9b1073d6c!2sSMP%20Negeri%205%20Cibeber!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid';
            const mapsLink = settings.maps_url || 'https://maps.app.goo.gl/VfLAPVfajTQ4HNCGA';

            return (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif-academic text-xl sm:text-2xl font-bold text-slate-900">
                      Peta Lokasi Sekolah
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Petunjuk navigasi menuju kampus SMP Negeri 5 Cibeber di Desa Warungbanten
                    </p>
                  </div>
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#1E5631] border border-slate-200 text-xs font-bold transition-all w-fit"
                  >
                    <span>Buka di Google Maps</span>
                    <ArrowSquareOut size={14} weight="bold" />
                  </a>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-xs bg-white">
                  <iframe
                    src={mapsEmbed}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Lokasi Resmi SMPN 5 Cibeber"
                    className="w-full"
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}
