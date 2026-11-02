'use client';

import { useState } from 'react';
import {
  WhatsappLogo,
  NavigationArrow,
  Compass,
} from '@phosphor-icons/react';
import { ScrollFadeUp, ScrollFadeScale } from '@/components/ui/motion';

interface HomeLocationMapProps {
  settings?: Record<string, string>;
}

export default function HomeLocationMap({ settings = {} }: HomeLocationMapProps) {
  const [mapInteractive, setMapInteractive] = useState(false);
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
    <section className="relative overflow-hidden section-padding bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="container-site relative z-10">
        {/* Section Header Tanpa Eyebrow Berulang */}
        <ScrollFadeUp delay={0.05} duration={0.6}>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <h2 className="font-serif-academic text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Lokasi &amp; Akses Sekolah
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Terletak di jalur utama Desa Warungbanten, Kecamatan Cibeber, Kabupaten Lebak.
            </p>
          </div>
        </ScrollFadeUp>

        {/* 2-Column Architectural Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Kolom Kiri: Peta Google Maps Interaktif Tanpa Floating Badge Berkedip (7 Kolom) */}
          <ScrollFadeScale delay={0.08} duration={0.65} className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[320px] sm:h-[360px] lg:h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Resmi SMPN 5 Cibeber"
                className={`w-full h-full min-h-[320px] ${
                  mapInteractive ? 'pointer-events-auto' : 'pointer-events-none lg:pointer-events-auto'
                }`}
              />

              {/* Mobile Gesture Guard Overlay (Cegah Scroll Trap di Layar Sentuh) */}
              {!mapInteractive && (
                <div className="lg:hidden absolute inset-0 z-10 flex items-center justify-center bg-slate-900/10">
                  <button
                    type="button"
                    onClick={() => setMapInteractive(true)}
                    className="px-4 py-2 rounded-lg bg-white text-slate-800 text-xs font-bold shadow-md border border-slate-200 flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Compass size={15} weight="bold" className="text-[#1E5631]" />
                    <span>Ketuk untuk Geser Peta</span>
                  </button>
                </div>
              )}
            </div>
          </ScrollFadeScale>

          {/* Kolom Kanan: Informasi Alamat & Rute Tanpa Mengulang Kotak Jam TU Footer (5 Kolom) */}
          <ScrollFadeUp delay={0.14} duration={0.65} className="lg:col-span-5 flex flex-col justify-between bg-white rounded-xl border border-slate-200 p-6 sm:p-7">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Alamat Satuan Pendidikan
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-900 mt-1 leading-snug">
                  {address}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <div>
                  <p className="font-semibold text-slate-800">Patokan &amp; Akses Jalan</p>
                  <p className="mt-0.5 leading-relaxed text-slate-600">
                    Berada di poros Jl. Raya Cikotok–Pasirkuray KM 05, Desa Warungbanten. Dapat dijangkau kendaraan roda dua maupun roda empat.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-800">Wilayah Administratif</p>
                  <p className="mt-0.5 leading-relaxed text-slate-600">
                    Desa Warungbanten, Kecamatan Cibeber, Kabupaten Lebak, Provinsi Banten (Kode Pos 42394).
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Kunjungan */}
            <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E5631] hover:bg-[#164325] text-white text-xs font-bold active:scale-[0.99] transition-colors text-center"
              >
                <NavigationArrow size={14} weight="bold" />
                <span>Petunjuk Arah Maps</span>
              </a>

              {whatsapp && (
                <a
                  href={`https://wa.me/${cleanWa}?text=Halo%20SMPN%205%20Cibeber,%20saya%20ingin%20menanyakan%20arah%20dan%20informasi%20kunjungan%20ke%20sekolah.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold active:scale-[0.99] transition-colors text-center"
                >
                  <WhatsappLogo size={15} weight="fill" className="text-[#1E5631]" />
                  <span>Hubungi Tata Usaha</span>
                </a>
              )}
            </div>
          </ScrollFadeUp>
        </div>
      </div>
    </section>
  );
}
