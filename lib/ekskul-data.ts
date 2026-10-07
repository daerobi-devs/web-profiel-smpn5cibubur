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
  KEPANDUAN: 'Kepanduan & Bela Negara',
  OLAHRAGA: 'Olahraga Prestasi',
  SENI_BUDAYA: 'Seni & Budaya Sunda',
  KESEHATAN: 'Kesehatan & Sosial (PMR)',
  LINGKUNGAN: 'Adiwiyata & Lingkungan Hidup',
  BAHASA_SAINS: 'Bahasa & Literasi Digital',
};

export const ekskulData: EkskulItem[] = [
  {
    id: 'pramuka',
    slug: 'pramuka-penggalang',
    name: 'Pramuka Penggalang (Gudep 05)',
    category: 'KEPANDUAN',
    categoryLabel: 'Kepanduan & Karakter',
    badge: 'Wajib Jenjang SMP',
    motto: 'Satyaku Kudarmakan, Darmaku Kubaktikan',
    description:
      'Wadah utama pembinaan karakter tangguh, kemandirian, kedisiplinan, kepemimpinan, gotong royong, dan keterampilan survival kepanduan (pionering tali-temali, sandi, kompas medan, serta perkemahan berkala).',
    coach: 'Asep Kurniawan, S.Pd.',
    coachRole: 'Pembina Gugus Depan Pramuka',
    schedule: 'Setiap Jumat, 14.00 – 16.30 WIB',
    location: 'Lapangan Utama & Panggung Sekolah',
    memberCount: '180+ Siswa (Kelas VII & VIII)',
    achievements: [
      'Juara 1 Lomba Tingkat (LT) II Pramuka Penggalang se-Kecamatan Cibeber',
      'Kontingen Perkemahan Jambore Cabang Kwartir Cabang Lebak',
      'Pionering Terbaik & Regu Terdisiplin Hari Pramuka 2025',
    ],
    coverImage: '/assets/lapangan-smpn5cibeber.jpg',
    highlights: ['Pionering Aplikatif', 'Survival Alam Bebas', 'Kemah Bakti Wiyata', 'Karakter Tri Satya'],
  },
  {
    id: 'paskibra',
    slug: 'paskibra-satria-cibeber',
    name: 'Paskibra (Pasukan Pengibar Bendera)',
    category: 'KEPANDUAN',
    categoryLabel: 'Bela Negara & Kedisiplinan',
    badge: 'Unggulan Resmi',
    motto: 'Tegas Berbaris, Berjiwa Kesatria, Setia Merah Putih',
    description:
      'Membina peraturan baris-berbaris (PBB) bertaraf kedinasan militer, ketahanan mental, tata upacara resmi kenegaraan, serta keteladanan sikap disiplin dan integritas moral peserta didik.',
    coach: 'Drs. Bambang Susilo',
    coachRole: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    schedule: 'Setiap Selasa & Kamis, 15.30 – 17.15 WIB',
    location: 'Plataran Lapangan Semen SMPN 5 Cibeber',
    memberCount: '42 Siswa Terpilih (Hasil Seleksi)',
    achievements: [
      'Petugas Pasukan Inti Upacara Peringatan HUT Kemerdekaan RI Tingkat Kecamatan Cibeber',
      'Juara Harapan 1 Lomba Ketangkasan Baris-Berbaris (LKBB) Tingkat Kabupaten Lebak',
    ],
    coverImage: '/assets/lapangan-smpn5cibeber.jpg',
    highlights: ['PBB Baku Kedinasan', 'Tata Upacara Bendera', 'Formasi Kreatif', 'Mental Kepemimpinan'],
  },
  {
    id: 'futsal',
    slug: 'klub-futsal-cibeber-junior',
    name: 'Klub Futsal & Sepak Bola Pelajar',
    category: 'OLAHRAGA',
    categoryLabel: 'Olahraga Prestasi',
    badge: 'Juara Turnamen 2025',
    motto: 'Sportivitas Tinggi, Kerjasama Tim, Raih Prestasi',
    description:
      'Pengembangan bakat atletik sepak bola dan futsal yang memfokuskan pada pemantapan teknik dasar (dribbling, passing, shooting), skema taktik lapangan modern, fisik atletik, dan uji tanding antarpelajar.',
    coach: 'Endang Supriatna, S.Pd.',
    coachRole: 'Pelatih & Guru Olahraga',
    schedule: 'Setiap Senin & Kamis, 15.30 – 17.30 WIB',
    location: 'Lapangan Olahraga Multifungsi Sekolah',
    memberCount: '36 Siswa (Regu A & B)',
    achievements: [
      'Juara 1 Turnamen Futsal Pelajar Lebak Selatan Cup 2025',
      'Pencetak Gol Terbanyak (Top Scorer) Pekan Olahraga Pelajar Cibeber',
    ],
    coverImage: '/assets/prestasi-siswa-smpn5cibeber.jpg',
    highlights: ['Taktik Pertandingan', 'Latihan Fisik & Stamina', 'Liga Pelajar Antar-SMP', 'Sportivitas Lapangan'],
  },
  {
    id: 'voli',
    slug: 'klub-bola-voli-putra-putri',
    name: 'Klub Bola Voli (Volley Squad 5)',
    category: 'OLAHRAGA',
    categoryLabel: 'Olahraga Prestasi',
    badge: 'Juara 2 POPDA Lebak',
    motto: 'Satu Hati Melompat, Bersama Menembus Kemenangan',
    description:
      'Wadah latihan bola voli intensif bagi siswa putra dan putri, meliputi pembinaan receive, toser set-up, blocking kokoh, serta variasi smash tajam dalam menghadapi ajang Olimpiade Olahraga Siswa Nasional (O2SN).',
    coach: 'Drs. Bambang Susilo',
    coachRole: 'Pembina Prestasi Olahraga',
    schedule: 'Setiap Rabu & Sabtu, 15.30 – 17.15 WIB',
    location: 'Lapangan Voli Outdoor SMPN 5 Cibeber',
    memberCount: '32 Siswa (Regu Putra & Putri)',
    achievements: [
      'Juara 2 Turnamen Voli Putra POPDA Kabupaten Lebak 2025',
      'Juara 1 Kejuaraan Bola Voli Antar-Gugus Sekolah Lebak Selatan',
    ],
    coverImage: '/assets/lapangan-smpn5cibeber.jpg',
    highlights: ['Kombinasi Smash Tajam', 'Latihan Pertahanan Kokoh', 'Regu Putra & Putri', 'Target Emas O2SN'],
  },
  {
    id: 'pmr',
    slug: 'palang-merah-remaja-madya',
    name: 'Palang Merah Remaja (PMR Madya)',
    category: 'KESEHATAN',
    categoryLabel: 'Kesehatan & Kemanusiaan',
    badge: 'Aksi Kemanusiaan',
    motto: 'Siamo Tutti Fratelli — Kita Semua Bersaudara',
    description:
      'Pembinaan kepalangmerahan yang membekali siswa dengan keahlian Pertolongan Pertama Pada Kecelakaan (P3K), tandu darurat, kesiapsiagaan bencana gempa, perilaku hidup bersih dan sehat (PHBS), serta bakti sosial.',
    coach: 'Rudi Hermawan, S.Pd.',
    coachRole: 'Guru Pembina UKS & PMR',
    schedule: 'Setiap Rabu, 15.00 – 16.45 WIB',
    location: 'Ruang UKS Terpadu & Laboratorium IPA',
    memberCount: '40 Siswa',
    achievements: [
      'Peringkat Terbaik Uji Pertolongan Pertama Gawat Darurat Jumbara PMI Kab. Lebak',
      'Tim Medis Siaga Utama Setiap Upacara & Ajang Olahraga Sekolah',
    ],
    coverImage: '/assets/gedung-smpn5cibeber.jpg',
    highlights: ['Pertolongan Pertama (P3K)', 'Evakuasi Tandu Cepat', 'Edukasi Gizi & PHBS', 'Piket Medis Upacara'],
  },
  {
    id: 'seni-sunda',
    slug: 'seni-musik-sunda-marawis',
    name: 'Seni Karawitan Sunda & Marawis',
    category: 'SENI_BUDAYA',
    categoryLabel: 'Seni & Budaya Sunda',
    badge: 'Kearifan Lokal',
    motto: 'Ngamumule Seni Sunda, Ngarawat Karakter Mulia Bangsa',
    description:
      'Pembelajaran estetika seni musik tradisional Sunda (Degung, Calung, Suling, Kendang) yang dipadukan dengan kesenian marawis dan hadroh islami untuk melestarikan khazanah kebudayaan luhur tatar Banten.',
    coach: 'Leni Marlina, S.Pd.',
    coachRole: 'Guru Seni Budaya & Pembina Sanggar',
    schedule: 'Setiap Sabtu Pagi, 08.00 – 10.30 WIB',
    location: 'Ruang Sanggar Seni Budaya & Aula Sekolah',
    memberCount: '34 Siswa',
    achievements: [
      'Penyaji Terbaik Festival Lomba Seni Siswa Nasional (FLS2N) Sub-Rayon Cibeber',
      'Pengisi Acara Utama Upacara Adat Mapag Paturay Tineung & Maulid Nabi',
    ],
    coverImage: '/assets/gedung-smpn5cibeber.jpg',
    highlights: ['Gamelan Degung Sunda', 'Kombinasi Seni Marawis', 'Tari Kreasi Daerah', 'Tampil Pentas Dinas'],
  },
  {
    id: 'adiwiyata',
    slug: 'kader-hijau-adiwiyata',
    name: 'Kader Hijau Sekolah Adiwiyata',
    category: 'LINGKUNGAN',
    categoryLabel: 'Adiwiyata & Konservasi',
    badge: 'Sekolah Hijau DLH',
    motto: 'Sekolah Asri, Lingkungan Lestari, Insan Berbudi',
    description:
      'Gerakan aksi nyata penyelamatan lingkungan hidup: pengelolaan bank sampah mandiri, komposting pupuk organik, kebun hidroponik ramah anak, konservasi mata air sekolah, dan edukasi pengurangan emisi plastik.',
    coach: 'Hj. Siti Rahayu, S.Pd.',
    coachRole: 'Koordinator Gerakan Adiwiyata Sekolah',
    schedule: 'Setiap Jumat Bersih & Selasa Sore, 06.30 & 15.00 WIB',
    location: 'Taman Konservasi Hijau & Rumah Kompos',
    memberCount: '48 Siswa Duta Lingkungan',
    achievements: [
      'Penghargaan Sekolah Adiwiyata Tingkat Kabupaten Lebak (2024 & 2025)',
      'Penggagas Program Zero Waste & Bank Sampah Berkah SMPN 5 Cibeber',
    ],
    coverImage: '/assets/gedung-smpn5cibeber.jpg',
    highlights: ['Pengolahan Kompos Organik', 'Taman Botani Sekolah', 'Bank Sampah Pilah', 'Duta Sekolah Hijau'],
  },
  {
    id: 'english-club',
    slug: 'english-club-literasi-digital',
    name: 'English Club & Literasi Digital',
    category: 'BAHASA_SAINS',
    categoryLabel: 'Bahasa & Literasi Digital',
    badge: 'Kompetensi Global',
    motto: 'Expanding Horizons, Communicating with Confidence',
    description:
      'Pembelajaran bahasa Inggris interaktif yang menyenangkan (Public Speaking, Storytelling, English Debate) dikombinasikan dengan keterampilan literasi digital, desain grafis kanvas Canva, dan pemanfaatan perpustakaan digital.',
    coach: 'Agus Pratama, S.Pd. & Hendra Gunawan, S.Kom.',
    coachRole: 'Guru Bahasa Inggris & Guru TIK',
    schedule: 'Setiap Selasa, 14.30 – 16.15 WIB',
    location: 'Laboratorium Komputer & Pojok Baca Digital',
    memberCount: '28 Siswa',
    achievements: [
      'Juara 2 Lomba Storytelling Bahasa Inggris Tingkat Pelajar se-Kabupaten Lebak',
      'Tim Kontributor Majalah Dinding Digital Sekolah',
    ],
    coverImage: '/assets/dewan-guru-smpn5cibeber.jpg',
    highlights: ['Speaking & Storytelling', 'Literasi Majalah Digital', 'Praktik Lab Komputer', 'Debat Bahasa Inggris'],
  },
];
