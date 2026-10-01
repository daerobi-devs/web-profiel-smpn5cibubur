import Image from 'next/image';
import Link from 'next/link';
import {
  CaretRight,
  Target,
  Compass,
  Heart,
  Trophy,
  Laptop,
  Plant,
  CheckCircle,
  HourglassHigh,
  Users,
  ShieldCheck,
  GraduationCap,
} from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { getWebSettings } from '@/lib/supabaseData';

export const metadata: Metadata = {
  title: 'Visi, Misi & Tujuan Pendidikan | SMPN 5 Cibeber',
  description:
    'Visi resmi, 6 misi strategis, dan tujuan pendidikan SMP Negeri 5 Cibeber dalam membentuk insan pembelajar yang berakhlak mulia, unggul prestasi, terampil teknologi, dan berwawasan lingkungan.',
};

export default async function VisiMisiPage() {
  const settings = await getWebSettings();

  const corePillars = [
    {
      icon: Heart,
      title: 'Berakhlak Mulia',
      desc: 'Menanamkan nilai keimanan, ketaqwaan, tata krama, kejujuran, dan budi pekerti luhur dalam seluruh ekosistem sekolah.',
      color: 'bg-rose-50 text-rose-700 border-rose-200/80',
    },
    {
      icon: Trophy,
      title: 'Unggul Prestasi',
      desc: 'Mendorong peserta didik berkompetisi secara sehat serta berprestasi dalam bidang akademik, sains, seni budaya, dan olahraga.',
      color: 'bg-amber-50 text-amber-800 border-amber-200/80',
    },
    {
      icon: Laptop,
      title: 'Terampil Digital',
      desc: 'Membekali peserta didik dengan kecakapan literasi digital, penguasaan TIK, dan etika pemanfaatan teknologi informasi.',
      color: 'bg-blue-50 text-blue-700 border-blue-200/80',
    },
    {
      icon: Plant,
      title: 'Peduli Lingkungan',
      desc: 'Menumbuhkan budaya sadar lingkungan hidup, kebersihan kampus, pengelolaan sampah bijak, dan pelestarian alam Adiwiyata.',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    },
  ];

  const missions = [
    {
      no: 1,
      title: 'Penguatan Keimanan & Budi Pekerti',
      desc: 'Menanamkan keimanan, ketaqwaan, dan budi pekerti luhur melalui pembiasaan ibadah rutin, doa bersama, dan budaya saling menghormati di lingkungan sekolah.',
    },
    {
      no: 2,
      title: 'Pembelajaran Kurikulum Merdeka yang Aktif & Inovatif',
      desc: 'Menyelenggarakan proses pembelajaran aktif, kreatif, inovatif, dan menyenangkan yang berpusat pada potensi unik peserta didik berbasis Kurikulum Merdeka.',
    },
    {
      no: 3,
      title: 'Pengembangan Bakat Akademik & Non-Akademik',
      desc: 'Menumbuhkembangkan bakat, minat, dan potensi siswa dalam bidang akademik, sains, seni budaya, dan olahraga guna mengukir prestasi membanggakan di tingkat rayon hingga kabupaten.',
    },
    {
      no: 4,
      title: 'Tata Kelola Partisipatif & Akuntabel',
      desc: 'Mewujudkan tata kelola satuan pendidikan yang transparan, akuntabel, dan partisipatif dengan pelibatan aktif dewan guru, komite sekolah, wali murid, dan tokoh masyarakat.',
    },
    {
      no: 5,
      title: 'Kecakapan Literasi & Teknologi Digital',
      desc: 'Membekali peserta didik dengan kecakapan literasi numerasi, literasi digital, serta pemanfaatan sarana TIK secara bertanggung jawab dan adaptif terhadap perkembangan zaman.',
    },
    {
      no: 6,
      title: 'Kelestarian Lingkungan Hidup (Adiwiyata)',
      desc: 'Menciptakan lingkungan belajar yang bersih, hijau, asri, aman, nyaman, bebas perundungan, serta berwawasan pelestarian lingkungan hidup berkelanjutan.',
    },
  ];

  const objectives = [
    'Terwujudnya lulusan yang taat beribadah, memiliki sopan santun, dan menjunjung tinggi Profil Pelajar Pancasila.',
    'Pencapaian rata-rata nilai asesmen dan kompetensi akademik peserta didik yang terus meningkat secara konsisten.',
    'Tersedianya lulusan yang menguasai operasional komputer dasar, internet sehat, dan aplikasi pembelajaran daring.',
    'Terciptanya suasana kampus sekolah yang hijau, teduh, ramah anak, dan kondusif untuk mendukung konsentrasi belajar optimal.',
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner Visi Misi */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/assets/gedung-smpn5cibeber.jpg"
            alt="Gedung SMP Negeri 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/82 via-[#1E5631]/70 to-[#143e22]/90" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/55" />
        </div>

        <div className="container-site relative z-10 max-w-4xl mx-auto text-center space-y-4">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-emerald-200">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <CaretRight size={12} weight="bold" />
            <Link href="/profil" className="hover:text-white transition-colors">
              Profil
            </Link>
            <CaretRight size={12} weight="bold" />
            <span className="text-white font-semibold">Visi &amp; Misi</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-amber-300 shadow-xs">
            <Target size={16} weight="fill" />
            <span>Landasan Filosofis &amp; Arah Perjuangan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Visi, Misi &amp; Tujuan
          </h1>

          <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto font-medium drop-shadow-xs leading-relaxed">
            Arah kebijakan, cita-cita luhur, dan langkah nyata penyelenggaraan pendidikan bermutu di SMP Negeri 5 Cibeber, Kabupaten Lebak.
          </p>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="section-padding">
        <div className="container-site max-w-5xl mx-auto space-y-12">
          {/* Seksi Visi Utama */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-slate-200/70 pb-6">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-[#1E5631] flex items-center justify-center shrink-0 shadow-xs">
                <Target size={28} weight="duotone" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1E5631]">
                  Cita-Cita Luhur Satuan Pendidikan
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
                  Visi Resmi SMPN 5 Cibeber
                </h2>
              </div>
            </div>

            {/* Quote Visi Besar */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-emerald-50/40 to-slate-50 border-l-4 border-[#1E5631] shadow-xs">
              <blockquote className="text-lg sm:text-2xl font-bold text-[#1E5631] leading-relaxed italic text-center sm:text-left">
                &ldquo;{settings.school_vision || 'Terwujudnya insan pembelajar yang berakhlak mulia, unggul dalam prestasi, terampil dalam teknologi, dan peduli kelestarian lingkungan hidup.'}&rdquo;
              </blockquote>
            </div>

            {/* 4 Pilar Inti Visi */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
                4 Pilar Nilai Utama:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {corePillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border ${pillar.color} space-y-2 flex flex-col justify-between`}
                    >
                      <div className="space-y-2">
                        <div className="h-9 w-9 rounded-xl bg-white/90 flex items-center justify-center shadow-xs">
                          <Icon size={20} weight="duotone" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Seksi Misi Sekolah */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-slate-200/70 pb-6">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-[#1E5631] flex items-center justify-center shrink-0 shadow-xs">
                <Compass size={28} weight="duotone" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1E5631]">
                  Langkah Strategis Nyata
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
                  Misi Satuan Pendidikan
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              Untuk mewujudkan visi di atas, SMP Negeri 5 Cibeber menetapkan langkah-langkah strategis operasional berikut yang dijalankan secara konsisten oleh seluruh warga sekolah:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {missions.map((m) => (
                <div
                  key={m.no}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex items-start gap-4"
                >
                  <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-[#1E5631] text-white text-xs font-extrabold shadow-xs">
                    {m.no}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seksi Tujuan Satuan Pendidikan */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap size={24} weight="duotone" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Sasaran Hasil Pendidikan
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] tracking-tight">
                  Tujuan Pendidikan Sekolah
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                >
                  <CheckCircle size={20} weight="fill" className="text-[#1E5631] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigasi Cepat ke Halaman Terkait */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E5631] to-[#143e22] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-950/20">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-extrabold">
                Ingin Mengetahui Sejarah &amp; Dewan Guru?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Jelajahi jejak langkah pendirian sekolah atau temui jajaran guru berdedikasi kami.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/profil/sejarah"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1E5631] hover:bg-emerald-50 text-xs font-bold transition-all shadow-xs"
              >
                <HourglassHigh size={16} weight="bold" />
                <span>Sejarah Sekolah</span>
              </Link>
              <Link
                href="/profil/guru"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold border border-white/20 transition-all shadow-xs"
              >
                <Users size={16} weight="bold" />
                <span>Dewan Guru</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
