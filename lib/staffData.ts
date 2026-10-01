export interface StaffMember {
  id: string;
  name: string;
  position: string;
  level: number; // 1=Pimpinan, 2=Wakil/Staff, 3=Guru
  order: number;
  nip?: string | null;
  education?: string | null;
  email?: string | null;
  imageUrl?: string | null;
  active: boolean;
}

export const defaultStaffList: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Drs. H. Ahmad Fauzi, M.Pd.',
    position: 'Kepala Sekolah',
    level: 1,
    order: 1,
    nip: '19680512 199412 1 002',
    education: 'S2 Manajemen Pendidikan',
    imageUrl: '/assets/kepala-sekolah.jpg',
    active: true,
  },
  {
    id: 'staff-2',
    name: 'Hj. Siti Rahayu, S.Pd.',
    position: 'Wakil Kepala Sekolah Bidang Kurikulum',
    level: 2,
    order: 2,
    nip: '197002151995122001',
    education: 'S1 Pendidikan Bahasa Indonesia',
    active: true,
  },
  {
    id: 'staff-3',
    name: 'Drs. Bambang Susilo',
    position: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    level: 2,
    order: 3,
    nip: '196905201994031002',
    education: 'S1 Pendidikan Jasmani',
    active: true,
  },
  {
    id: 'staff-4',
    name: 'Endang Supriatna, S.Pd.',
    position: 'Wakil Kepala Sekolah Bidang Sarana & Prasarana',
    level: 2,
    order: 4,
    nip: '197103101995031001',
    education: 'S1 Pendidikan Matematika',
    active: true,
  },
  {
    id: 'staff-5',
    name: 'Yayah Nurhayati, S.Pd.',
    position: 'Wakil Kepala Sekolah Bidang Humas',
    level: 2,
    order: 5,
    nip: '197204251996022001',
    education: 'S1 Pendidikan IPS',
    active: true,
  },
  {
    id: 'staff-6',
    name: 'Asep Kurniawan, S.Pd.',
    position: 'Guru Matematika & Pembina OSIS',
    level: 3,
    order: 6,
    nip: '197801022003011001',
    education: 'S1 Pendidikan Matematika',
    active: true,
  },
  {
    id: 'staff-7',
    name: 'Dewi Lestari, S.Pd.',
    position: 'Guru Bahasa Indonesia & Literasi',
    level: 3,
    order: 7,
    nip: '197902142004012001',
    education: 'S1 Pendidikan Bahasa Indonesia',
    active: true,
  },
  {
    id: 'staff-8',
    name: 'Rudi Hermawan, S.Pd.',
    position: 'Guru IPA & Kepala Lab IPA',
    level: 3,
    order: 8,
    nip: '198003202004011001',
    education: 'S1 Pendidikan IPA',
    active: true,
  },
  {
    id: 'staff-9',
    name: 'Nia Sari, S.Pd.',
    position: 'Guru IPS & Koordinator Adiwiyata',
    level: 3,
    order: 9,
    nip: '198105052005012001',
    education: 'S1 Pendidikan IPS',
    active: true,
  },
  {
    id: 'staff-10',
    name: 'Agus Pratama, S.Pd.',
    position: 'Guru Bahasa Inggris',
    level: 3,
    order: 10,
    nip: '197906152003011002',
    education: 'S1 Pendidikan Bahasa Inggris',
    active: true,
  },
  {
    id: 'staff-11',
    name: 'Leni Marlina, S.Pd.',
    position: 'Guru Seni Budaya & Pembina Karawitan',
    level: 3,
    order: 11,
    nip: '198207302006012001',
    education: 'S1 Pendidikan Seni',
    active: true,
  },
  {
    id: 'staff-12',
    name: 'Hendra Gunawan, S.Kom.',
    position: 'Guru Informatika & Teknisi Lab Komputer',
    level: 3,
    order: 12,
    nip: '198409152007011001',
    education: 'S1 Teknik Informatika',
    active: true,
  },
];
