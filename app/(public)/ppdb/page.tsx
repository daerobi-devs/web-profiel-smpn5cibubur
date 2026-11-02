import Link from 'next/link';
import { getActivePpdbSteps, getWebSettings } from '@/lib/supabaseData';
import {
  UserPlus,
  FileText,
  UploadSimple,
  CheckCircle,
  Megaphone,
  CheckSquare,
  WhatsappLogo,
  CalendarCheck,
  UsersThree,
  Info,
  ShieldCheck,
  FilePdf,
} from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Penerimaan Peserta Didik Baru (PPDB) | SMP Negeri 5 Cibeber',
  description:
    'Informasi resmi PPDB SMP Negeri 5 Cibeber: jadwal pendaftaran, kuota, persyaratan berkas, jalur seleksi, dan panduan alur pendaftaran.',
};

const iconMap: Record<string, React.ElementType> = {
  'user-plus': UserPlus,
  'file-text': FileText,
  'upload-simple': UploadSimple,
  'check-circle': CheckCircle,
  megaphone: Megaphone,
  'check-square': CheckSquare,
};

async function getPpdbData() {
  const [rawSteps, settings] = await Promise.all([
    getActivePpdbSteps(),
    getWebSettings(),
  ]);

  const steps = rawSteps.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    icon: s.icon,
    stepOrder: s.step_order,
  }));

  return { steps, settings };
}

export default async function PpdbPage() {
  const { steps, settings } = await getPpdbData();
  const year = settings.ppdb_year ?? '2026/2027';
  const cleanWa = (settings.school_whatsapp ?? '6285281459726').replace(/[^0-9]/g, '');

  const waPpdbLink = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    `Halo Panitia PPDB SMPN 5 Cibeber, saya ingin berkonsultasi mengenai pendaftaran siswa baru tahun ajaran ${year}.`
  )}`;

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      {/* =========================================================
          1. HEADER HALAMAN EDITORIAL (KIRI-RATA)
          ========================================================= */}
      <section className="bg-gradient-to-b from-slate-950 via-[#0e2a17] to-[#164325] text-white pt-16 pb-14 md:pt-20 md:pb-16 relative overflow-hidden border-b border-slate-900/20">
        <div className="container-site relative z-10">
          <div className="max-w-3xl space-y-3.5">
            <nav className="flex items-center gap-2 text-xs font-medium text-white/75">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-amber-300 font-semibold">PPDB {year}</span>
            </nav>

            <h1 className="font-serif-academic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Penerimaan Peserta Didik Baru (TP {year})
            </h1>

            <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
              Panduan resmi jadwal pendaftaran, kuota daya tampung, persyaratan dokumen, serta jalur penerimaan siswa baru SMP Negeri 5 Cibeber.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={waPpdbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold transition-colors"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>Konsultasi Panitia PPDB</span>
              </a>
              <a
                href="#alur"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Info size={18} />
                <span>Lihat Alur &amp; Syarat</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. INFO JADWAL & KUOTA HIGHLIGHT
          ========================================================= */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            {[
              {
                label: 'Kuota Siswa Baru',
                value: settings.ppdb_quota ? `${settings.ppdb_quota} Siswa` : '240 Siswa',
                sub: 'Daya Tampung Tahunan',
                icon: UsersThree,
                highlight: true,
              },
              {
                label: 'Pendaftaran Dibuka',
                value: settings.ppdb_open_date ?? '1 Juni 2026',
                sub: 'Pukul 08.00 WIB',
                icon: CalendarCheck,
                highlight: false,
              },
              {
                label: 'Pendaftaran Ditutup',
                value: settings.ppdb_close_date ?? '30 Juni 2026',
                sub: 'Pukul 14.00 WIB',
                icon: CalendarCheck,
                highlight: false,
              },
              {
                label: 'Pengumuman Seleksi',
                value: settings.ppdb_announcement_date ?? '5 Juli 2026',
                sub: 'Daring & Papan Sekolah',
                icon: Megaphone,
                highlight: false,
              },
              {
                label: 'Daftar Ulang',
                value: settings.ppdb_registration_date ?? '7 – 10 Juli 2026',
                sub: 'Verifikasi Berkas Fisik',
                icon: CheckSquare,
                highlight: false,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-xl border transition-all ${
                    item.highlight
                      ? 'bg-[#eaf4ed] border-[#1E5631]/30 col-span-2 md:col-span-1'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <Icon
                    size={20}
                    weight="duotone"
                    className={item.highlight ? 'text-[#1E5631] mb-2' : 'text-slate-500 mb-2'}
                  />
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#1E293B] mt-0.5 leading-snug tabular-nums">
                    {item.value}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">{item.sub}</p>
                </div>
              );
            })}
          </div>

          {settings.ppdb_info && (
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#eaf4ed] border border-[#1E5631]/20 flex items-start gap-3">
              <ShieldCheck size={22} weight="fill" className="text-[#1E5631] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-[#1E293B] leading-relaxed font-medium">
                <span className="font-bold text-[#1E5631]">Ketentuan Resmi PPDB:</span>{' '}
                {settings.ppdb_info}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          3. EMPAT JALUR PENDAFTARAN RESMI
          ========================================================= */}
      <section className="py-14 sm:py-16 bg-[#F8FAFC]">
        <div className="container-site">
          <div className="max-w-2xl mb-8 space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1E5631]">
              Regulasi Dinas Pendidikan
            </p>
            <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Empat Jalur Pendaftaran Resmi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pembagian proporsi daya tampung calon peserta didik baru berdasarkan jalur seleksi:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Jalur Zonasi',
                quota: 'Kuota 50%',
                desc: 'Diperuntukkan bagi calon siswa dengan jarak domisili tempat tinggal terdekat ke lingkungan sekolah berdasarkan alamat Kartu Keluarga.',
              },
              {
                title: 'Jalur Prestasi',
                quota: 'Kuota 30%',
                desc: 'Berdasarkan akumulasi nilai rapor semester 1–5 SD/MI atau piagam kejuaraan akademik, olahraga, sains, maupun seni.',
              },
              {
                title: 'Jalur Afirmasi',
                quota: 'Kuota 15%',
                desc: 'Khusus bagi calon peserta didik dari keluarga ekonomi tidak mampu (pemegang KIP, PKH, KKS) serta penyandang disabilitas.',
              },
              {
                title: 'Perpindahan Tugas',
                quota: 'Kuota 5%',
                desc: 'Bagi calon siswa yang orang tua/walinya mengalami perpindahan tugas dinas resmi yang dibuktikan dengan surat penugasan.',
              },
            ].map((jalur, i) => (
              <div
                key={i}
                className="p-6 flex flex-col justify-between bg-white border border-slate-200/90 rounded-2xl shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E5631] tabular-nums">
                      {jalur.quota}
                    </span>
                    <span className="text-xs font-mono text-slate-400 tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{jalur.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{jalur.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. PERSYARATAN BERKAS DOKUMEN
          ========================================================= */}
      <section className="py-14 sm:py-16 bg-white border-y border-slate-200">
        <div className="container-site">
          <div className="max-w-4xl">
            <div className="space-y-1.5 mb-8">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1E5631]">
                Kelengkapan Administrasi
              </p>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Persyaratan Berkas Pendaftaran
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Pastikan dokumen berikut telah disiapkan dalam bentuk berkas fisik saat verifikasi:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Syarat Umum */}
              <div className="p-6 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-slate-900 pb-2.5 border-b border-slate-200 flex items-center gap-2">
                  <CheckCircle size={18} weight="fill" className="text-[#1E5631]" />
                  <span>Persyaratan Umum (Semua Jalur)</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E5631] font-bold mt-0.5">&bull;</span>
                    <span>Surat Keterangan Lulus (SKL) / Ijazah SD/MI asli &amp; fotokopi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E5631] font-bold mt-0.5">&bull;</span>
                    <span>Fotokopi Akta Kelahiran calon peserta didik.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E5631] font-bold mt-0.5">&bull;</span>
                    <span>Fotokopi Kartu Keluarga (KK) yang diterbitkan minimal 1 tahun.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E5631] font-bold mt-0.5">&bull;</span>
                    <span>Fotokopi KTP kedua orang tua / wali murid.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E5631] font-bold mt-0.5">&bull;</span>
                    <span>Pas foto formal ukuran 3x4 (3 lembar, latar biru/merah).</span>
                  </li>
                </ul>
              </div>

              {/* Syarat Khusus */}
              <div className="p-6 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-slate-900 pb-2.5 border-b border-slate-200 flex items-center gap-2">
                  <FilePdf size={18} weight="fill" className="text-[#B45309]" />
                  <span>Persyaratan Khusus (Sesuai Jalur)</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-bold mt-0.5">&bull;</span>
                    <span>
                      <strong>Jalur Prestasi:</strong> Sertifikat/Piagam Kejuaraan asli &amp; fotokopi yang telah dilegalisasi, atau fotokopi nilai rapor semester 1–5.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-bold mt-0.5">&bull;</span>
                    <span>
                      <strong>Jalur Afirmasi:</strong> Kartu KIP, PKH, atau KKS yang masih aktif terdaftar di DTKS Kementerian Sosial.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B45309] font-bold mt-0.5">&bull;</span>
                    <span>
                      <strong>Jalur Perpindahan:</strong> Surat Keputusan / Surat Tugas Mutasi dari pimpinan lembaga/instansi resmi.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. ALUR LENGKAP PENDAFTARAN
          ========================================================= */}
      {steps.length > 0 && (
        <section id="alur" className="py-14 sm:py-16 bg-[#F8FAFC]">
          <div className="container-site max-w-4xl">
            <div className="space-y-1.5 mb-8">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1E5631]">
                Tahapan Seleksi
              </p>
              <h2 className="font-serif-academic text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Alur Lengkap Pendaftaran
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Panduan tahapan dari pengisian formulir hingga pengumuman dan daftar ulang:
              </p>
            </div>

            <div className="space-y-3.5">
              {steps.map((step, idx) => {
                const IconComponent =
                  step.icon && iconMap[step.icon] ? iconMap[step.icon] : FileText;
                return (
                  <div
                    key={step.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4 sm:gap-5"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#1E5631] text-white flex items-center justify-center shrink-0 font-bold text-sm tabular-nums">
                      0{idx + 1}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <IconComponent size={17} weight="bold" className="text-[#1E5631]" />
                        <h3 className="text-base font-bold text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout */}
            <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#1E5631] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="font-serif-academic text-lg sm:text-xl font-bold">
                  Butuh Bantuan Pendaftaran?
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100/90">
                  Panitia PPDB SMP Negeri 5 Cibeber siap membantu proses verifikasi dan konsultasi pendaftaran Anda.
                </p>
              </div>
              <a
                href={waPpdbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold shrink-0 transition-colors"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>Hubungi Panitia</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
