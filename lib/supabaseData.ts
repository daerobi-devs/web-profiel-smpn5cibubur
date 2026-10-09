/**
 * Supabase Public Data Client for SMPN 5 Cibeber Web Profil
 * Terhubung ke Supabase Cloud PostgreSQL (Single Source of Truth)
 */

import { defaultStaffList, type StaffMember } from '@/lib/staffData';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bgyeqdyguuflljgzilzy.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJneWVxZHlndXVmbGxqZ3ppbHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MjU1MTgsImV4cCI6MjEwNjAwMTUxOH0.P-inKoVotxDNXITp-aaYGpmXq0BCEsbPtwlJ4yHrZc8';

async function fetchFromSupabase<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 30 }, // Next.js ISR cache revalidation (30 seconds)
    });

    if (!res.ok) {
      console.warn(`[Supabase] Fetch failed for ${endpoint}: ${res.statusText}`);
      return fallback;
    }

    const data = await res.json();
    return data as T;
  } catch (err) {
    console.error(`[Supabase] Network/fetch error on ${endpoint}:`, err);
    return fallback;
  }
}

// =============================================================================
// 1. WEB SETTINGS & IDENTITAS SEKOLAH
// =============================================================================
export interface WebSettingItem {
  key: string;
  value: string;
  label?: string | null;
  group_name?: string;
}

export const DEFAULT_SETTINGS: Record<string, string> = {
  school_name: 'SMP Negeri 5 Cibeber',
  school_tagline: 'The Inspiring School of Cibeber',
  school_subdescription: 'Lembaga Pendidikan Menengah Negeri yang Berfokus pada Pembentukan Budi Pekerti, Keunggulan Akademik, dan Kelestarian Lingkungan di Kabupaten Lebak, Provinsi Banten',
  school_address: 'Jl. Raya Cikotok-Pasirkuray Km.05, Warungbanten, Kec. Cibeber, Kabupaten Lebak, Provinsi Banten 42394',
  school_phone: '0852-8145-9726',
  school_whatsapp: '085281459726',
  school_email: 'smpnlimacibeber@yahoo.com',
  school_accreditation: 'B',
  school_npsn: '20607865',
  headmaster_name: 'Adang Restuwardani, S.Pd',
  headmaster_nip: '19680512 199412 1 002',
  headmaster_welcome: 'Selamat datang di portal informasi resmi SMP Negeri 5 Cibeber. Kami meyakini bahwa setiap anak memiliki keunikan dan potensi luar biasa yang siap bertumbuh bila didukung oleh lingkungan sekolah yang kondusif.',
  headmaster_image: '/assets/kepala-sekolah.jpg',
  school_vision: 'Terwujudnya insan pembelajar yang berakhlak mulia, unggul dalam prestasi, terampil dalam teknologi, dan peduli kelestarian lingkungan hidup.',
  tu_hours: 'Senin – Kamis: 07.30 – 15.00 WIB | Jumat: 07.30 – 14.30 WIB',
  show_ppdb_menu: 'true',
  ppdb_open: 'true',
  ppdb_year: '2026/2027',
  maps_embed_url:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.790938640733!2d106.3265556147708!3d-6.833301695061611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e42886c787be401%3A0x446d78d9b1073d6c!2sSMP%20Negeri%205%20Cibeber!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid',
  maps_url: 'https://maps.app.goo.gl/VfLAPVfajTQ4HNCGA',
  // Hero Banners Halaman Web
  banner_page_prestasi: '/assets/prestasi-siswa-smpn5cibeber.jpg',
  banner_page_profil: '/assets/lapangan-smpn5cibeber.jpg',
  banner_page_visimisi: '/assets/visi-misi-banner-bg.jpg',
  banner_page_guru: '/assets/dewan-guru-smpn5cibeber.jpg',
  banner_page_fasilitas: '/assets/lapangan-smpn5cibeber.jpg',
  banner_page_ekskul: '/assets/ekskul-banner-bg.jpg',
  banner_page_galeri: '/assets/galeri-banner-bg.jpg',
  banner_page_berita: '/assets/berita-banner-bg.jpg',
  banner_page_agenda: '/assets/agenda-banner-bg.jpg',
  banner_page_kontak: '/assets/gedung-smpn5cibeber.jpg',
};

export async function getWebSettings(): Promise<Record<string, string>> {
  const rows = await fetchFromSupabase<WebSettingItem[]>('web_settings?select=*', []);
  if (!rows || rows.length === 0) return DEFAULT_SETTINGS;

  const map = { ...DEFAULT_SETTINGS };
  for (const r of rows) {
    map[r.key] = r.value;
  }
  return map;
}

// =============================================================================
// 2. HERO SLIDES (SLIDER FOTO BERANDA)
// =============================================================================
export interface HeroSlideItem {
  id: string;
  title: string;
  caption?: string | null;
  image_url: string;
  order_num: number;
  active: boolean;
}

export const FALLBACK_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-1',
    title: 'Gedung Utama SMPN 5 Cibeber',
    caption: 'Gerbang Utama dan Pintu Masuk SMP Negeri 5 Cibeber yang Bersih dan Asri',
    image_url: '/assets/gedung-smpn5cibeber.jpg',
    order_num: 1,
    active: true,
  },
  {
    id: 'slide-2',
    title: 'Lapangan Olahraga dan Upacara',
    caption: 'Sarana Upacara Bendera, Olahraga Siswa, dan Panggung Kegiatan Ekstrakurikuler',
    image_url: '/assets/lapangan-smpn5cibeber.jpg',
    order_num: 2,
    active: true,
  },
  {
    id: 'slide-3',
    title: 'Prestasi Marching Band & Kontingen Siswa',
    caption: 'Dokumentasi Kebanggaan Siswa Berprestasi SMP Negeri 5 Cibeber',
    image_url: '/assets/prestasi-siswa-smpn5cibeber.jpg',
    order_num: 3,
    active: true,
  },
];

export async function getHeroSlides(): Promise<HeroSlideItem[]> {
  const slides = await fetchFromSupabase<HeroSlideItem[]>(
    'hero_slides?active=eq.true&order=order_num.asc,created_at.asc&select=*',
    FALLBACK_HERO_SLIDES
  );
  return slides.length > 0 ? slides : FALLBACK_HERO_SLIDES;
}

// =============================================================================
// 3. ARTICLES (BERITA & ARTIKEL)
// =============================================================================
export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  image_url?: string | null;
  author: string;
  category: string;
  published: boolean;
  published_at?: string | null;
  created_at: string;
}

export async function getPublishedArticles(): Promise<ArticleItem[]> {
  return fetchFromSupabase<ArticleItem[]>(
    'articles?published=eq.true&order=published_at.desc,created_at.desc&select=id,title,slug,excerpt,image_url,author,category,published,published_at,created_at',
    []
  );
}

export async function getArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const list = await fetchFromSupabase<ArticleItem[]>(
    `articles?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*`,
    []
  );
  return list[0] || null;
}

// =============================================================================
// 4. ACHIEVEMENTS (PRESTASI SISWA / HALL OF FAME)
// =============================================================================
export interface AchievementItem {
  id: string;
  title: string;
  description?: string | null;
  level: string;
  year: number;
  image_url?: string | null;
  gallery_images?: string[] | null;
  order_num: number;
  active: boolean;
}

export const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'futsal-2022',
    title: 'Juara 1 Futsal Putra & Putri',
    description: 'Grand Final Futsal Putri SMPN 5 Cibeber vs SMPN INK 2 Cisolok berakhir dengan kemenangan adu penalti, serta kemenangan Futsal Putra atas MTs Cisolok skor 9-2.',
    level: 'KOTA',
    year: 2022,
    image_url: '/assets/lapangan-smpn5cibeber.jpg',
    gallery_images: [
      '/assets/lapangan-smpn5cibeber.jpg',
      '/assets/prestasi-siswa-smpn5cibeber.jpg',
      '/assets/dewan-guru-smpn5cibeber.jpg'
    ],
    order_num: 1,
    active: true,
  },
  {
    id: 'lcc-2024',
    title: 'Juara 2 LCC PKn Tingkat Kabupaten',
    description: 'Juara 2 Lomba Cerdas Cermat PKn tingkat Kabupaten Lebak yang menguji wawasan kebangsaan dan konstitusi.',
    level: 'KOTA',
    year: 2024,
    image_url: '/assets/dewan-guru-smpn5cibeber.jpg',
    gallery_images: [
      '/assets/dewan-guru-smpn5cibeber.jpg',
      '/assets/gedung-smpn5cibeber.jpg'
    ],
    order_num: 2,
    active: true,
  },
  {
    id: 'adiwiyata-2024',
    title: 'Sekolah Adiwiyata Tingkat Kabupaten',
    description: 'Penghargaan Sekolah Adiwiyata dari Dinas Lingkungan Hidup Kabupaten Lebak atas komitmen tata kelola sekolah hijau ramah lingkungan.',
    level: 'KOTA',
    year: 2024,
    image_url: '/assets/gedung-smpn5cibeber.jpg',
    gallery_images: [
      '/assets/gedung-smpn5cibeber.jpg',
      '/assets/lapangan-smpn5cibeber.jpg'
    ],
    order_num: 3,
    active: true,
  },
  {
    id: 'kir-2024',
    title: 'Juara 3 Lomba Karya Ilmiah Remaja',
    description: 'Juara 3 Lomba Karya Ilmiah Remaja (KIR) tingkat Provinsi Banten dengan inovasi penelitian ilmiah pelajar.',
    level: 'PROVINSI',
    year: 2024,
    image_url: '/assets/dewan-guru-smpn5cibeber.jpg',
    gallery_images: [
      '/assets/dewan-guru-smpn5cibeber.jpg',
      '/assets/prestasi-siswa-smpn5cibeber.jpg'
    ],
    order_num: 4,
    active: true,
  },
  {
    id: 'pramuka-2025',
    title: 'Juara 1 Pramuka Jambore Kecamatan',
    description: 'Juara 1 Jambore Pramuka Penggalang tingkat Kecamatan Cibeber dengan keunggulan ketangkasan, kepemimpinan, dan gotong royong.',
    level: 'KECAMATAN',
    year: 2025,
    image_url: '/assets/gedung-smpn5cibeber.jpg',
    gallery_images: [
      '/assets/gedung-smpn5cibeber.jpg',
      '/assets/lapangan-smpn5cibeber.jpg',
      '/assets/prestasi-siswa-smpn5cibeber.jpg'
    ],
    order_num: 5,
    active: true,
  },
  {
    id: 'voli-2025',
    title: 'Juara 2 Voli Putra POPDA Kabupaten',
    description: 'Juara 2 Turnamen Bola Voli Putra ajang Pekan Olahraga Pelajar Daerah (POPDA) Kabupaten Lebak.',
    level: 'KOTA',
    year: 2025,
    image_url: '/assets/lapangan-smpn5cibeber.jpg',
    gallery_images: [
      '/assets/lapangan-smpn5cibeber.jpg',
      '/assets/dewan-guru-smpn5cibeber.jpg'
    ],
    order_num: 6,
    active: true,
  }
];

export async function getActiveAchievements(): Promise<AchievementItem[]> {
  try {
    const [items, galleryRows] = await Promise.all([
      fetchFromSupabase<AchievementItem[]>(
        'achievements?active=eq.true&order=order_num.asc,year.desc&select=*',
        DEFAULT_ACHIEVEMENTS
      ),
      fetchFromSupabase<{ value?: string }[]>(
        'web_settings?key=eq.achievement_galleries&select=value',
        []
      )
    ]);

    let galleryMap: Record<string, string[]> = {};
    if (galleryRows && galleryRows.length > 0 && galleryRows[0].value) {
      try {
        galleryMap = JSON.parse(galleryRows[0].value) || {};
      } catch {}
    }

    const list = items && items.length > 0 ? items : DEFAULT_ACHIEVEMENTS;
    return list.map((item) => {
      let gImages = item.gallery_images;
      if (!gImages || (Array.isArray(gImages) && gImages.length === 0)) {
        if (galleryMap[item.id] && Array.isArray(galleryMap[item.id]) && galleryMap[item.id].length > 0) {
          gImages = galleryMap[item.id];
        } else if (item.image_url) {
          gImages = [item.image_url];
        }
      }
      return {
        ...item,
        gallery_images: gImages
      };
    });
  } catch {
    return DEFAULT_ACHIEVEMENTS;
  }
}

// =============================================================================
// 5. FACILITIES (SARANA & PRASARANA)
// =============================================================================
export interface FacilityItem {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  image_url?: string | null;
  order_num: number;
  active: boolean;
}

export async function getActiveFacilities(): Promise<FacilityItem[]> {
  return fetchFromSupabase<FacilityItem[]>(
    'facilities?active=eq.true&order=order_num.asc&select=*',
    []
  );
}

// =============================================================================
// 6. GALLERIES (GALERI FOTO DOKUMENTASI)
// =============================================================================
export interface GalleryItem {
  id: string;
  title: string;
  description?: string | null;
  image_url: string;
  video_url?: string | null;
  category: string;
  order_num: number;
  active: boolean;
}

export async function getActiveGalleries(): Promise<GalleryItem[]> {
  try {
    const [items, videoRows] = await Promise.all([
      fetchFromSupabase<GalleryItem[]>(
        'galleries?active=eq.true&order=order_num.asc,created_at.desc&select=*',
        []
      ),
      fetchFromSupabase<{ value?: string }[]>(
        'web_settings?key=eq.gallery_videos&select=value',
        []
      )
    ]);

    let videoMap: Record<string, string> = {};
    if (videoRows && videoRows.length > 0 && videoRows[0].value) {
      try {
        videoMap = JSON.parse(videoRows[0].value) || {};
      } catch {}
    }

    return (items || []).map((item) => ({
      ...item,
      video_url: videoMap[item.id] || item.video_url || null
    }));
  } catch {
    return [];
  }
}

// =============================================================================
// 7. EKSTRAKURIKULER
// =============================================================================
export interface EkskulItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  category_label: string;
  motto?: string | null;
  description: string;
  schedule: string;
  place: string;
  coach: string;
  coach_phone?: string | null;
  badge?: string;
  cover_image?: string | null;
  banner_image?: string | null;
  bannerImage?: string | null;
  video_url?: string | null;
  gallery_images?: string[] | null;
  achievements?: string[] | any;
  order_num: number;
  active: boolean;
}

export async function getActiveEkskul(): Promise<EkskulItem[]> {
  try {
    const [items, bannerRows] = await Promise.all([
      fetchFromSupabase<EkskulItem[]>(
        'ekskul?active=eq.true&order=order_num.asc,id.asc&select=*',
        []
      ),
      fetchFromSupabase<{ value?: string }[]>(
        'web_settings?key=eq.ekskul_banners&select=value',
        []
      )
    ]);

    let bannerMap: Record<string, string> = {};
    if (bannerRows && bannerRows.length > 0 && bannerRows[0].value) {
      try {
        bannerMap = JSON.parse(bannerRows[0].value) || {};
      } catch {}
    }

    return items.map((item) => {
      const banner = bannerMap[item.id] || item.cover_image;
      return {
        ...item,
        banner_image: banner,
        bannerImage: banner
      };
    });
  } catch {
    return [];
  }
}

export async function getEkskulBySlug(slug: string): Promise<EkskulItem | null> {
  try {
    const [items, bannerRows] = await Promise.all([
      fetchFromSupabase<EkskulItem[]>(
        `ekskul?slug=eq.${encodeURIComponent(slug)}&active=eq.true&select=*`,
        []
      ),
      fetchFromSupabase<{ value?: string }[]>(
        'web_settings?key=eq.ekskul_banners&select=value',
        []
      )
    ]);

    if (!items || items.length === 0) return null;
    const item = items[0];

    let bannerMap: Record<string, string> = {};
    if (bannerRows && bannerRows.length > 0 && bannerRows[0].value) {
      try {
        bannerMap = JSON.parse(bannerRows[0].value) || {};
      } catch {}
    }

    const banner = bannerMap[item.id] || item.cover_image;
    return {
      ...item,
      banner_image: banner,
      bannerImage: banner
    };
  } catch {
    return null;
  }
}

// =============================================================================
// 8. PPDB STEPS (TAHAPAN ALUR PPDB)
// =============================================================================
export interface PpdbStepItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  step_order: number;
  active: boolean;
}

export async function getActivePpdbSteps(): Promise<PpdbStepItem[]> {
  return fetchFromSupabase<PpdbStepItem[]>(
    'ppdb_steps?active=eq.true&order=step_order.asc&select=*',
    []
  );
}

// =============================================================================
// 9. DEWAN GURU & TENAGA KEPENDIDIKAN (STAFF & FACULTY)
// =============================================================================
export async function getStaffList(): Promise<StaffMember[]> {
  try {
    const settings = await getWebSettings();
    if (settings.school_staff_data) {
      const parsed = JSON.parse(settings.school_staff_data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[Staff] Gagal membaca data staf dinamis, menggunakan fallback data lokal', e);
  }
  return defaultStaffList;
}

