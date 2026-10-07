import Image from 'next/image';
import Link from 'next/link';
import {
  CaretRight,
  ShieldCheck,
  CalendarCheck,
  Target,
  Users,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { getWebSettings } from '@/lib/supabaseData';

export const metadata: Metadata = {
  title: 'Sejarah Singkat & Linimasa Perkembangan | SMPN 5 Cibeber',
  description:
    'Sejarah pendirian SMP Negeri 5 Cibeber di Warungbanten, Kabupaten Lebak, dari inisiatif perintisan para tokoh masyarakat hingga era Kurikulum Merdeka berakreditasi B.',
};

export default async function SejarahPage() {
  const settings = await getWebSettings();

  const milestones = [
    {
      year: 'Fase Perintisan',
      title: 'Aspirasi & Gotong Royong Warga Banten Selatan',
      desc: 'Berawal dari keprihatinan tokoh masyarakat, pemuka adat, dan aparatur desa Warungbanten terhadap tingginya jarak tempuh anak-anak usia sekolah untuk mengenyam pendidikan menengah pertama. Masyarakat bersepakat menghibahkan lahan dan memprakarsai ruang belajar perintis.',
      badge: 'Awal Perjuangan',
    },
    {
      year: 'Fase Kelembagaan',
      title: 'Pengesahan Kelembagaan Resmi Pemkab Lebak',
      desc: 'Pemerintah Kabupaten Lebak melalui Dinas Pendidikan secara resmi menerbitkan surat keputusan kelembagaan SMP Negeri 5 Cibeber (NPSN: 20607865) guna menjamin kepastian operasional belajar mengajar serta legalitas ijazah kelulusan putra-putri daerah.',
      badge: 'Legalitas Formal',
    },
    {
      year: 'Fase Pembangunan',
      title: 'Pengembangan Sarana Sekolah Terpadu',
      desc: 'Pembangunan ruang kelas representatif secara bertahap, disusul pembangunan Laboratorium IPA, Laboratorium Komputer, Perpustakaan sekolah, lapangan upacara/olahraga serbaguna, hingga panggung ekspresi seni dan sanitasi ramah lingkungan.',
      badge: 'Fasilitas Terpadu',
    },
    {
      year: 'Era Sekarang',
      title: 'Akreditasi B & Kurikulum Merdeka Berwawasan Adiwiyata',
      desc: 'Meraih akreditasi B (Baik) dari BAN-S/M, konsisten menerapkan Kurikulum Merdeka yang berfokus pada Penguatan Profil Pelajar Pancasila, penguasaan literasi teknologi digital, serta pembinaan generasi peduli kelestarian alam dan kearifan lokal Sunda Banten.',
      badge: 'Kurikulum Merdeka',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner Sejarah */}
      <section className="relative overflow-hidden text-white py-16 md:py-20 border-b border-emerald-950/20">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/assets/gedung-smpn5cibeber.jpg"
            alt="Gedung SMPN 5 Cibeber"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E5631]/78 via-[#1E5631]/68 to-[#143e22]/88" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E5631]/20 to-emerald-950/50" />
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
            <span className="text-white font-semibold">Sejarah Sekolah</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-amber-300 shadow-xs">
            <ShieldCheck size={16} weight="fill" />
            <span>Jejak Langkah &amp; Kiprah Lembaga</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Sejarah SMPN 5 Cibeber
          </h1>

          <p className="text-sm sm:text-base text-emerald-50 max-w-2xl mx-auto font-medium drop-shadow-xs leading-relaxed">
            Perjalanan dedikasi dan semangat gotong royong mendirikan pusat pendidikan menengah pertama negeri di bumi Cibeber, Kabupaten Lebak, Provinsi Banten.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs">
            <span className="px-3.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 font-mono text-white font-semibold shadow-xs">
              NPSN: {settings.school_npsn ?? '20607865'}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-white/25 backdrop-blur-md text-white border border-white/35 font-bold shadow-xs">
              Akreditasi: {settings.school_accreditation ?? 'B'} (BAN-S/M)
            </span>
          </div>
        </div>
      </section>

      {/* Konten Utama Sejarah — Magazine Editorial Layout */}
      <section className="section-padding">
        <div className="container-site max-w-5xl mx-auto space-y-12">
          {/* Card Sejarah Utama */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5">
            {/* Header Seksi Sejarah (Bersih tanpa ikon jam pasir) */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1E5631] mb-1">
                Jejak Langkah &amp; Kiprah Lembaga
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E5631] tracking-tight">
                Sejarah Singkat Pendirian
              </h2>
            </div>

            {/* Foto Gedung di Agak Atas Kiri (Float Left di Tablet/Desktop, Teks Mengalir di Samping Kanan & Bawah) */}
            <div className="sm:float-left sm:mr-8 sm:mb-6 mb-6 w-full sm:w-[360px] lg:w-[420px] clear-left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 ring-1 ring-slate-900/10 group">
                <Image
                  src="/assets/gedung-smpn5cibeber.jpg"
                  alt="Gedung SMP Negeri 5 Cibeber"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-xs sm:text-sm font-extrabold drop-shadow-sm leading-tight">
                    Gedung SMP Negeri 5 Cibeber
                  </p>
                  <p className="text-[11px] text-emerald-200 font-medium drop-shadow-xs mt-0.5">
                    Warungbanten, Kec. Cibeber, Kab. Lebak, Banten
                  </p>
                </div>
              </div>
            </div>

            {/* Narasi Sejarah Komprehensif Mengalir Alami */}
            <div className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify space-y-4">
              <p>
                SMP Negeri 5 Cibeber didirikan sebagai wujud nyata komitmen pemerintah daerah bersama para tokoh masyarakat, pemuka adat, dan pemerhati pendidikan dalam memperluas pemerataan akses layanan pendidikan menengah pertama bagi putra-putri di wilayah Banten Selatan, khususnya masyarakat perdesaan di sekitar Desa Warungbanten dan sekitarnya di lereng pegunungan Cibeber.
              </p>
              <p>
                Sebelum satuan pendidikan ini resmi beroperasi, generasi muda usia sekolah di perbukitan Cibeber harus menempuh jarak tempuh yang sangat jauh serta medan perjalanan berbukit yang menantang untuk dapat mengenyam pendidikan lanjutan di pusat kecamatan atau kota terdekat. Terdorong oleh rasa kepedulian yang mendalam dan semangat gotong royong luhur demi masa depan anak-anak bangsa, masyarakat bersama aparatur desa dan dinas terkait bersepakat memprakarsai pendirian satuan pendidikan negeri yang mandiri dan berintegritas.
              </p>
              <p>
                Melalui pengesahan kelembagaan resmi oleh Pemerintah Kabupaten Lebak, SMP Negeri 5 Cibeber mulai menyelenggarakan kegiatan belajar mengajar dengan dedikasi penuh para tenaga pendidik perintis. Dimulai dari sarana ruang kelas sederhana, sekolah terus berbenah dan bertransformasi melengkapi sarana penunjang mutu pendidikan, hingga kini telah memiliki gedung representatif, laboratorium IPA dan komputer, perpustakaan sarat literasi, lapangan olahraga serbaguna, hingga panggung apresiasi bakat seni dan budaya siswa.
              </p>
              <p>
                Kini, dengan Akreditasi B (Baik) yang diraih dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M), SMP Negeri 5 Cibeber teguh mengimplementasikan Kurikulum Merdeka yang menekankan penguatan karakter Profil Pelajar Pancasila, pemanfaatan teknologi digital terpadu, pembinaan bakat akademik dan non-akademik berprestasi, serta pelestarian nilai-nilai kearifan lokal Sunda Banten dan kepedulian kelestarian lingkungan hidup.
              </p>
            </div>

            {/* Clearfix layout */}
            <div className="clear-both" />
          </div>

          {/* Linimasa Tonggak Perkembangan (Milestones Timeline) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E5631] tracking-tight">
                Linimasa Perjalanan Sekolah
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Tahapan bersejarah transformasi SMPN 5 Cibeber dari masa perintisan hingga era keunggulan digital dan budi pekerti.
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/30 space-y-8 ml-2 sm:ml-4">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative group">
                  {/* Pin Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-[#1E5631] shadow-xs group-hover:scale-110 transition-transform" />
                  
                  <div className="space-y-1.5 bg-slate-50 p-5 rounded-2xl border border-slate-200/70 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1E5631] text-white text-[11px] font-bold">
                        {m.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-[#1E5631] text-[11px] font-semibold">
                        {m.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800">
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

          {/* Navigasi Cepat ke Halaman Terkait */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E5631] to-[#143e22] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-950/20">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-extrabold">
                Ingin Mengenal Lebih Dekat?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Kunjungi halaman visi misi atau lihat profil dewan guru dan tenaga kependidikan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/profil/visi-misi"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1E5631] hover:bg-emerald-50 text-xs font-bold transition-all shadow-xs"
              >
                <Target size={16} weight="bold" />
                <span>Visi &amp; Misi</span>
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
