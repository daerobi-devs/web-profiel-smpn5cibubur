export type EkskulItem = {
  id: string;
  slug: string;
  name: string;
  category: 'KEPANDUAN' | 'OLAHRAGA' | 'SENI_BUDAYA' | 'KESEHATAN' | 'LINGKUNGAN' | 'BAHASA_SAINS';
  categoryLabel: string;
  badge: string;
  motto: string;
  description: string;
  coach: string;
  coachRole: string;
  schedule: string;
  location: string;
  memberCount: string;
  achievements: string[];
  coverImage: string;
  bannerImage?: string | null;
  banner_image?: string | null;
  videoUrl?: string | null;
  video_url?: string | null;
  galleryImages?: string[];
  gallery_images?: string[] | null;
  highlights: string[];
};

export const ekskulCategories = [
  'SEMUA',
  'KEPANDUAN',
  'OLAHRAGA',
  'SENI_BUDAYA',
  'KESEHATAN',
  'LINGKUNGAN',
  'BAHASA_SAINS',
] as const;

export const ekskulCategoryLabels: Record<string, string> = {
  SEMUA: 'Semua Kategori',
  KEPANDUAN: 'Kepanduan & Baris-Berbaris',
  OLAHRAGA: 'Olahraga Siswa',
  SENI_BUDAYA: 'Seni & Budaya Daerah',
  KESEHATAN: 'Kesehatan & PMR',
  LINGKUNGAN: 'Lingkungan Sekolah',
  BAHASA_SAINS: 'Bahasa & TIK',
};

export const ekskulData: EkskulItem[] = [
  {
    id: 'pramuka',
    slug: 'pramuka-penggalang',
    name: 'Pramuka Penggalang (Gudep 05)',
    category: 'KEPANDUAN',
    categoryLabel: 'Kepanduan',
    badge: 'Ekstrakurikuler Wajib',
    motto: 'Satyaku Kudarmakan, Darmaku Kubaktikan',
    description:
      'Pembinaan karakter, kemandirian, kedisiplinan, kepemimpinan regu, serta keterampilan kepramukaan (pionering, tali-temali, sandi, kompas, dan perkemahan penggalang).',
    coach: 'Asep Kurniawan, S.Pd.',
    coachRole: 'Pembina Gugus Depan Pramuka',
    schedule: 'Jumat, 14.00 – 16.30 WIB',
    location: 'Lapangan Utama SMPN 5 Cibeber',
    memberCount: 'Seluruh Siswa Kelas VII & VIII',
    achievements: [
      'Juara 1 Lomba Tingkat (LT) II Pramuka Penggalang se-Kecamatan Cibeber',
      'Peserta Jambore Cabang Kwartir Cabang Kabupaten Lebak',
    ],
    coverImage: '/assets/lapangan-smpn5cibeber.jpg',
    highlights: ['Pionering & Tali-Temali', 'Perkemahan Penggalang', 'Keterampilan Baris-Berbaris'],
  },
  {
    id: 'paskibra',
    slug: 'paskibra-satria-cibeber',
    name: 'Paskibra (Pasukan Pengibar Bendera)',
    category: 'KEPANDUAN',
    categoryLabel: 'Baris-Berbaris',
    badge: 'Pasukan Upacara',
    motto: 'Disiplin, Tangguh, dan Bertanggung Jawab',
    description:
      'Pelatihan Peraturan Baris-Berbaris (PBB), tata upacara bendera di sekolah maupun tingkat kecamatan, serta pembinaan kedisiplinan peserta didik.',
    coach: 'Drs. Bambang Susilo',
    coachRole: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    schedule: 'Selasa & Kamis, 15.30 – 17.00 WIB',
    location: 'Lapangan Upacara SMPN 5 Cibeber',
    memberCount: '42 Siswa',
    achievements: [
      'Petugas Upacara Peringatan HUT Kemerdekaan RI Tingkat Kecamatan Cibeber',
      'Juara Harapan 1 Lomba Ketangkasan Baris-Berbaris (LKBB) Tingkat Kabupaten Lebak',
    ],
    coverImage: '/assets/lapangan-smpn5cibeber.jpg',
    highlights: ['Peraturan Baris-Berbaris', 'Tata Upacara Bendera', 'Kedisiplinan Siswa'],
  },
  {
    id: 'futsal',
    slug: 'klub-futsal-cibeber-junior',
    name: 'Ekstrakurikuler Futsal & Sepak Bola',
    category: 'OLAHRAGA',
    categoryLabel: 'Olahraga',
    badge: 'Cabang Olahraga',
    motto: 'Junjung Tinggi Sportivitas dan Kerja Sama Tim',
    description:
      'Latihan rutin teknik dasar permainan futsal dan sepak bola, pembinaan kebugaran jasmani, serta persiapan mengikuti turnamen olahraga antarpelajar tingkat SMP.',
    coach: 'Endang Supriatna, S.Pd.',
    coachRole: 'Guru Pembina Olahraga',
    schedule: 'Senin & Kamis, 15.30 – 17.15 WIB',
    location: 'Lapangan Olahraga SMPN 5 Cibeber',
    memberCount: '36 Siswa',
    achievements: [
      'Juara 1 Turnamen Futsal Pelajar Lebak Selatan Cup',
      'Peserta Pekan Olahraga Pelajar Tingkat Kecamatan Cibeber',
    ],
    coverImage: '/assets/prestasi-siswa-smpn5cibeber.jpg',
    highlights: ['Teknik Dasar Permainan', 'Latihan Kebugaran Fisik', 'Pertandingan Persahabatan'],
  },
  {
    id: 'voli',
    slug: 'klub-bola-voli-putra-putri',
    name: 'Ekstrakurikuler Bola Voli Putra & Putri',
    category: 'OLAHRAGA',
    categoryLabel: 'Olahraga',
    badge: 'Cabang Olahraga',
    motto: 'Latihan Terukur dan Kerja Sama Regu',
    description:
      'Pembinaan teknik dasar bola voli (servis, passing, umpan, smash, dan bendungan) bagi regu putra dan putri untuk ajang O2SN dan POPDA Kabupaten Lebak.',
    coach: 'Drs. Bambang Susilo',
    coachRole: 'Pembina Olahraga',
    schedule: 'Rabu & Sabtu, 15.30 – 17.15 WIB',
    location: 'Lapangan Voli SMPN 5 Cibeber',
    memberCount: '32 Siswa',
    achievements: [
      'Juara 2 Turnamen Voli Putra POPDA Kabupaten Lebak',
      'Juara 1 Kejuaraan Bola Voli Antar-SMP Wilayah Lebak Selatan',
    ],
    coverImage: '/assets/lapangan-smpn5cibeber.jpg',
    highlights: ['Regu Putra & Putri', 'Persiapan O2SN & POPDA', 'Pembinaan Teknik Dasar'],
  },
  {
    id: 'pmr',
    slug: 'palang-merah-remaja-madya',
    name: 'Palang Merah Remaja (PMR Madya)',
    category: 'KESEHATAN',
    categoryLabel: 'Kesehatan & UKS',
    badge: 'Kepalangmerahan',
    motto: 'Kemanusiaan dan Kepedulian Sesama',
    description:
      'Pelatihan Pertolongan Pertama Pada Kecelakaan (P3K), pengelolaan Usaha Kesehatan Sekolah (UKS), edukasi Perilaku Hidup Bersih dan Sehat (PHBS), serta kesiapsiagaan bencana.',
    coach: 'Rudi Hermawan, S.Pd.',
    coachRole: 'Pembina UKS & PMR',
    schedule: 'Rabu, 15.00 – 16.45 WIB',
    location: 'Ruang UKS SMPN 5 Cibeber',
    memberCount: '40 Siswa',
    achievements: [
      'Peserta Jumbara PMR Tingkat Kabupaten Lebak',
      'Tim Petugas Kesehatan Upacara Bendera & Kegiatan Sekolah',
    ],
    coverImage: '/assets/gedung-smpn5cibeber.jpg',
    highlights: ['Pertolongan Pertama (P3K)', 'Piket Layanan UKS', 'Perilaku Hidup Bersih & Sehat'],
  },
  {
    id: 'seni-sunda',
    slug: 'seni-musik-sunda-marawis',
    name: 'Seni Karawitan Sunda & Marawis',
    category: 'SENI_BUDAYA',
    categoryLabel: 'Seni & Budaya',
    badge: 'Kesenian Daerah',
    motto: 'Melestarikan Seni Budaya Daerah',
    description:
      'Kegiatan latihan alat musik tradisional Sunda (degung, calung, kendang, suling), olah vokal pupuh, serta kesenian marawis untuk acara sekolah dan perlombaan FLS2N.',
    coach: 'Leni Marlina, S.Pd.',
    coachRole: 'Guru Seni Budaya',
    schedule: 'Sabtu, 08.00 – 10.30 WIB',
    location: 'Ruang Kesenian SMPN 5 Cibeber',
    memberCount: '34 Siswa',
    achievements: [
      'Peserta Festival dan Lomba Seni Siswa Nasional (FLS2N) Tingkat Sub-Rayon',
      'Pengisi Acara Pelepasan Siswa & Peringatan Hari Besar di Sekolah',
    ],
    coverImage: '/assets/gedung-smpn5cibeber.jpg',
    highlights: ['Karawitan & Degung Sunda', 'Seni Marawis', 'Persiapan FLS2N'],
  },
  {
    id: 'adiwiyata',
    slug: 'kader-hijau-adiwiyata',
    name: 'Kader Lingkungan & Kebersihan Sekolah',
    category: 'LINGKUNGAN',
    categoryLabel: 'Lingkungan Hidup',
    badge: 'Peduli Lingkungan',
    motto: 'Menjaga Kebersihan dan Keasrian Sekolah',
    description:
      'Kegiatan pemeliharaan taman kelas, penghijauan area sekolah, pemilahan sampah organik dan anorganik, serta pembiasaan lingkungan belajar yang bersih dan sehat.',
    coach: 'Hj. Siti Rahayu, S.Pd.',
    coachRole: 'Koordinator Program Lingkungan',
    schedule: 'Jumat, 07.00 – 08.00 WIB & Selasa, 15.00 WIB',
    location: 'Lingkungan Taman SMPN 5 Cibeber',
    memberCount: '48 Siswa',
    achievements: [
      'Program Penghijauan & Taman Kelas Asri SMPN 5 Cibeber',
    ],
    coverImage: '/assets/gedung-smpn5cibeber.jpg',
    highlights: ['Penghijauan Area Sekolah', 'Pemilahan Sampah', 'Perawatan Taman Kelas'],
  },
  {
    id: 'english-club',
    slug: 'english-club-literasi-digital',
    name: 'English Club & Literasi Komputer',
    category: 'BAHASA_SAINS',
    categoryLabel: 'Bahasa & TIK',
    badge: 'Akademik & Literasi',
    motto: 'Berlatih Bahasa Asing dan Keterampilan Komputer',
    description:
      'Latihan percakapan bahasa Inggris dasar, membaca cerita (storytelling), serta pengenalan pengoperasian perangkat lunak komputer untuk menunjang tugas belajar siswa.',
    coach: 'Agus Pratama, S.Pd. & Hendra Gunawan, S.Kom.',
    coachRole: 'Guru Bahasa Inggris & Guru Informatika',
    schedule: 'Selasa, 14.30 – 16.00 WIB',
    location: 'Laboratorium Komputer SMPN 5 Cibeber',
    memberCount: '28 Siswa',
    achievements: [
      'Juara 2 Lomba Storytelling Bahasa Inggris Tingkat Pelajar Kabupaten Lebak',
    ],
    coverImage: '/assets/dewan-guru-smpn5cibeber.jpg',
    highlights: ['Percakapan Bahasa Inggris', 'Storytelling', 'Praktik Komputer Dasar'],
  },
];
