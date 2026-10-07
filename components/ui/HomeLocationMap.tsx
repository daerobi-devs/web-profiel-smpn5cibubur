'use client';

import Link from 'next/link';
import {
  MapPin,
  Clock,
  WhatsappLogo,
  NavigationArrow,
  Compass,
} from '@phosphor-icons/react';
import { ScrollFadeUp, ScrollFadeScale } from '@/components/ui/motion';

interface HomeLocationMapProps {
  settings?: Record<string, string>;
}

export default function HomeLocationMap({ settings = {} }: HomeLocationMapProps) {
  const address =
    settings.school_address ||
    'Jl. Raya Cikotok-Pasirkuray Km.05, Warungbanten, Kec. Cibeber, Kabupaten Lebak, Provinsi Banten 42394';
  const whatsapp = settings.school_whatsapp || '085281459726';
  const cleanWa = whatsapp.replace(/[^0-9]/g, '');

  const mapsEmbed =
    settings.maps_embed_url ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.790938640733!2d106.3265556147708!3d-6.833301695061611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e42886c787be401%3A0x446d78d9b1073d6c!2sSMP%20Negeri%205%20Cibeber!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid';

  const mapsLink = settings.maps_url || 'https://maps.app.goo.gl/VfLAPVfajTQ4HNCGA';

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/60 to-[#F8FAFC] border-t border-slate-200/80">
      <div className="container-site relative z-10">
        {/* Section Header */}
        <ScrollFadeUp delay={0.05} duration={0.7}>
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D97706] mb-1 flex items-center gap-1.5">
              <Compass size={14} weight="bold" />
              <span>Aksesibilitas &bull; Kunjungan Sekolah &bull; Navigasi</span>
            </div>
            <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E5631] tracking-tight">
              Lokasi &amp; Peta Sekolah
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Terletak di kawasan asri Warungbanten, Kecamatan Cibeber, Kabupaten Lebak yang sejuk, tenang, dan kondusif untuk mendukung fokus belajar putra-putri Anda.
            </p>
          </div>
        </ScrollFadeUp>

        {/* 2-Column Grid: Map Embed + School Info Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Kolom Kiri: Peta Google Maps Interaktif (7 Kolom) */}
          <ScrollFadeScale delay={0.1} duration={0.75} className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-full min-h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Resmi SMPN 5 Cibeber"
                className="w-full h-full min-h-[320px]"
              />

              {/* Badge Mengambang di Sudut Peta */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md text-xs font-bold text-slate-800 flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SMPN 5 Cibeber &bull; Warungbanten</span>
              </div>
            </div>
          </ScrollFadeScale>

          {/* Kolom Kanan: Panduan Kunjungan & Informasi Akses (5 Kolom) */}
          <ScrollFadeUp delay={0.18} duration={0.75} className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Card Informasi Alamat & Akses */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="font-serif-academic font-bold text-base text-[#1E5631] pb-2.5 border-b border-slate-100 flex items-center gap-2">
                <MapPin size={18} weight="fill" className="text-[#D97706]" />
                <span>Alamat &amp; Akses Sekolah</span>
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                {/* Alamat Fisik */}
                <div>
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] text-slate-400 mb-0.5">
                    Alamat Lengkap
                  </p>
                  <p className="leading-relaxed font-medium text-slate-700">
                    {address}
                  </p>
                </div>

                {/* Akses Transportasi */}
                <div>
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] text-slate-400 mb-0.5">
                    Konektivitas &amp; Akses
                  </p>
                  <p className="leading-relaxed">
                    Terletak di jalur utama Jl. Raya Cikotok-Pasirkuray KM 05. Dapat diakses dengan mudah oleh kendaraan roda dua maupun roda empat dengan area parkir sekolah yang aman.
                  </p>
                </div>

                {/* Jam Kerja TU */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Clock size={13} weight="bold" className="text-emerald-700" />
                    <span>Jam Layanan Tamu &amp; Tata Usaha:</span>
                  </p>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Senin – Kamis</span>
                    <span className="font-semibold text-slate-900">07.30 – 15.00 WIB</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Jumat</span>
                    <span className="font-semibold text-slate-900">07.30 – 11.30 WIB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Kunjungan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E5631] hover:bg-[#164325] text-white text-xs font-bold shadow-xs active:scale-95 transition-all text-center"
              >
                <NavigationArrow size={15} weight="bold" />
                <span>Buka Rute Maps</span>
              </a>

              {whatsapp && (
                <a
                  href={`https://wa.me/${cleanWa}?text=Halo%20SMPN%205%20Cibeber,%20saya%20ingin%20menanyakan%20arah%20dan%20informasi%20kunjungan%20ke%20sekolah.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold shadow-xs active:scale-95 transition-all text-center"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  <span>Chat Info Sekolah</span>
                </a>
              )}
            </div>
          </ScrollFadeUp>
        </div>
      </div>
    </section>
  );
}
