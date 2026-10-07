export interface AgendaItem {
  id: string;
  title: string;
  category: 'Akademik' | 'Kesiswaan' | 'Lingkungan' | 'Keagamaan' | 'Humas';
  dateStr: string; // e.g. "18 - 23 Mei 2026"
  monthBadge: string; // e.g. "MEI"
  dayBadge: string; // e.g. "18"
  time: string; // e.g. "07.30 - 12.30 WIB"
  location: string;
  participants: string;
  description: string;
  status: 'AKAN_DATANG' | 'BERLANGSUNG' | 'SELESAI';
  featured?: boolean;
}

export const sampleAgendas: AgendaItem[] = [
  {
    id: 'ag-1',
    title: 'Asesmen Akhir Jenjang (AAJ) Kelas IX TP 2025/2026',
    category: 'Akademik',
    dateStr: '18 - 23 Mei 2026',
    monthBadge: 'MEI',
    dayBadge: '18',
    time: '07.30 - 12.30 WIB',
    location: 'Ruang Kelas IX-A s.d IX-C SMPN 5 Cibeber',
    participants: 'Peserta Didik Kelas IX',
    description:
      'Evaluasi sumatif akhir masa pembelajaran jenjang SMP bagi siswa-siswi kelas IX untuk penentuan kelulusan dan pemetaan capaian kurikulum merdeka.',
    status: 'AKAN_DATANG',
    featured: true,
  },
  {
    id: 'ag-2',
    title: 'Pekan Olahraga & Seni (Porseni) Antar Kelas Semester Genap',
    category: 'Kesiswaan',
    dateStr: '08 - 12 Juni 2026',
    monthBadge: 'JUN',
    dayBadge: '08',
    time: '08.00 - 14.00 WIB',
    location: 'Lapangan Olahraga & Panggung Kesenian',
    participants: 'Seluruh Siswa Kelas VII - IX',
    description:
      'Ajang kreativitas dan sportivitas siswa meliputi turnamen futsal, bola voli, catur, baca puisi bahasa Sunda, dan pentas solo vocal antar kelas.',
    status: 'AKAN_DATANG',
    featured: true,
  },
  {
    id: 'ag-3',
    title: 'Pembagian Rapor Semester Genap & Wisuda Pelepasan Siswa Kelas IX',
    category: 'Akademik',
    dateStr: '20 Juni 2026',
    monthBadge: 'JUN',
    dayBadge: '20',
    time: '08.30 - 13.00 WIB',
    location: 'Aula & Lapangan Utama SMPN 5 Cibeber',
    participants: 'Siswa, Orang Tua / Wali Murid & Dewan Guru',
    description:
      'Penyerahan buku laporan hasil belajar siswa semester genap sekaligus upacara khidmat pelepasan alumni angkatan tahun 2025/2026.',
    status: 'AKAN_DATANG',
  },
  {
    id: 'ag-4',
    title: 'Masa Pengenalan Lingkungan Sekolah (MPLS) Siswa Baru TP 2026/2027',
    category: 'Kesiswaan',
    dateStr: '13 - 16 Juli 2026',
    monthBadge: 'JUL',
    dayBadge: '13',
    time: '07.00 - 13.00 WIB',
    location: 'SMPN 5 Cibeber',
    participants: 'Peserta Didik Baru Kelas VII',
    description:
      'Pengenalan wawasan wiyata mandala, tata krama, metode belajar Kurikulum Merdeka, perkenalan ekstrakurikuler, dan penanaman pohon angkatan.',
    status: 'AKAN_DATANG',
  },
  {
    id: 'ag-5',
    title: 'Aksi Peduli Lingkungan: Penanaman Pohon & Konservasi Sumber Air',
    category: 'Lingkungan',
    dateStr: '08 Agustus 2026',
    monthBadge: 'AGT',
    dayBadge: '08',
    time: '07.30 - 11.30 WIB',
    location: 'Kawasan Tangkapan Air Warungbanten & Cibeber',
    participants: 'Kader Adiwiyata & Pramuka Inti',
    description:
      'Gerakan aksi nyata penanaman 100 bibit tanaman keras dan buah-buahan lokal bersama tokoh masyarakat adat Kasepuhan untuk menjaga kelestarian hulu sungai.',
    status: 'AKAN_DATANG',
  },
  {
    id: 'ag-6',
    title: 'Peringatan Hari Pramuka Ke-65 & Kemah Bakti Gugus Depan',
    category: 'Kesiswaan',
    dateStr: '14 - 15 Agustus 2026',
    monthBadge: 'AGT',
    dayBadge: '14',
    time: '14.00 WIB - Selesai',
    location: 'Bumi Perkemahan Pasirkuray',
    participants: 'Gugus Depan SMPN 5 Cibeber',
    description:
      'Upacara peringatan hari pramuka, bakti sosial pembersihan fasilitas umum desa, uji tanda kecakapan umum, dan api unggun kebersamaan.',
    status: 'AKAN_DATANG',
  },
  {
    id: 'ag-7',
    title: 'Asesmen Sumatif Tengah Semester (STS) Ganjil TP 2026/2027',
    category: 'Akademik',
    dateStr: '21 - 26 September 2026',
    monthBadge: 'SEP',
    dayBadge: '21',
    time: '07.30 - 12.00 WIB',
    location: 'Seluruh Ruang Kelas',
    participants: 'Peserta Didik Kelas VII, VIII, & IX',
    description:
      'Uji pemahaman materi pembelajaran tengah semester ganjil guna mengevaluasi efektivitas modul ajar dan diferensiasi pembelajaran.',
    status: 'AKAN_DATANG',
  },
  {
    id: 'ag-8',
    title: 'Peringatan Maulid Nabi Muhammad SAW 1448 H & Tabligh Akbar',
    category: 'Keagamaan',
    dateStr: '10 Oktober 2026',
    monthBadge: 'OKT',
    dayBadge: '10',
    time: '08.00 - 12.00 WIB',
    location: 'Panggung Kesenian SMPN 5 Cibeber',
    participants: 'Keluarga Besar SMPN 5 Cibeber & Tokoh Agama',
    description:
      'Penguatan keteladanan akhlak mulia Nabi Muhammad SAW melalui tausiyah, santunan yatim piatu sekitar sekolah, dan penampilan hadrah rohis.',
    status: 'AKAN_DATANG',
  },
  {
    id: 'ag-9',
    title: 'Rapat Pleno Komite Sekolah & Sosialisasi Program Pembelajaran',
    category: 'Humas',
    dateStr: '15 Maret 2026',
    monthBadge: 'MAR',
    dayBadge: '15',
    time: '09.00 - 12.00 WIB',
    location: 'Ruang Rapat Guru',
    participants: 'Pengurus Komite & Perwakilan Orang Tua Murid',
    description:
      'Pemaparan evaluasi program sekolah tahun anggaran berjalan serta koordinasi rencana penguatan sarana sanitasi dan literasi digital sekolah.',
    status: 'SELESAI',
  },
  {
    id: 'ag-10',
    title: 'Peringatan Hari Peduli Sampah Nasional: Gerakan Pilah Sampah Organik',
    category: 'Lingkungan',
    dateStr: '21 Februari 2026',
    monthBadge: 'FEB',
    dayBadge: '21',
    time: '08.00 - 11.00 WIB',
    location: 'Area TPS 3R & Kebun Sekolah',
    participants: 'Seluruh Guru, Staf, & Peserta Didik',
    description:
      'Edukasi pembuatan pupuk kompos cair dari sisa dedaunan sekolah dan penyuluhan pengurangan kemasan plastik sekali pakai di kantin sekolah.',
    status: 'SELESAI',
  },
];
