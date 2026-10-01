export interface BaseArticle {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  author?: string | null;
  category?: string | null;
  [key: string]: any;
}

/**
 * Penentuan Kategori Berita Berdasarkan Konten & Slug
 */
export function getArticleCategory(title: string, slug: string): string {
  const t = (title + ' ' + slug).toLowerCase();
  if (
    t.includes('matematika') ||
    t.includes('juara') ||
    t.includes('prestasi') ||
    t.includes('olimpiade') ||
    t.includes('piala') ||
    t.includes('porseni')
  ) {
    return 'Prestasi Siswa';
  }
  if (
    t.includes('adiwiyata') ||
    t.includes('lingkungan') ||
    t.includes('hijau') ||
    t.includes('sampah') ||
    t.includes('pohon')
  ) {
    return 'Lingkungan & Adiwiyata';
  }
  if (
    t.includes('guru') ||
    t.includes('kurikulum') ||
    t.includes('workshop') ||
    t.includes('kompetensi') ||
    t.includes('ajar')
  ) {
    return 'Akademik & Guru';
  }
  if (
    t.includes('mpls') ||
    t.includes('paskibra') ||
    t.includes('osis') ||
    t.includes('pramuka') ||
    t.includes('upacara') ||
    t.includes('seni') ||
    t.includes('krakatau') ||
    t.includes('kegiatan')
  ) {
    return 'Kesiswaan & Seni';
  }
  if (
    t.includes('pengumuman') ||
    t.includes('ppdb') ||
    t.includes('edaran') ||
    t.includes('jadwal') ||
    t.includes('rapat')
  ) {
    return 'Pengumuman Resmi';
  }
  return 'Warta Sekolah';
}

/**
 * Fallback Cover Image Tematik yang Relevan
 */
export function getArticleCover(article: BaseArticle): string {
  const img = article.imageUrl || article.image_url;
  if (img && img.trim() !== '') {
    return img;
  }
  const cat = getArticleCategory(article.title, article.slug);
  if (cat === 'Prestasi Siswa') return '/assets/prestasi-siswa-smpn5cibeber.jpg';
  if (cat === 'Lingkungan & Adiwiyata') return '/assets/gedung-smpn5cibeber.jpg';
  if (cat === 'Akademik & Guru') return '/assets/dewan-guru-smpn5cibeber.jpg';
  if (cat === 'Kesiswaan & Seni') return '/assets/lapangan-smpn5cibeber.jpg';
  return '/assets/gedung-smpn5cibeber.jpg';
}

/**
 * Smart Formatter Konten Artikel:
 * Mendeteksi secara cerdas apakah konten artikel berupa HTML terstruktur atau teks paragraf biasa.
 * - Jika sudah memiliki tag blok HTML (<p>, <div>, <h3>, <ul>, dsb): dipertahankan apa adanya.
 * - Jika berupa teks biasa dengan tombol Enter (baris baru):
 *   * Memecah jeda 2x Enter (atau lebih) menjadi blok tag <p> terpisah.
 *   * Mengonversi 1x Enter menjadi <br /> untuk baris baru dalam paragraf.
 *   * Mengonversi rentetan <br><br> menjadi paragraf baru.
 */
export function formatArticleContent(rawContent: string | null | undefined): string {
  if (!rawContent || !rawContent.trim()) {
    return '<p class="text-slate-500 italic">Konten artikel belum tersedia.</p>';
  }

  const content = rawContent.trim();

  // Cek apakah konten sudah memuat tag blok HTML umum
  const hasBlockHtml = /<\s*(p|div|h[1-6]|ul|ol|li|blockquote|table|pre|article|section|figure|hr)\b[^>]*>/i.test(
    content
  );

  if (hasBlockHtml) {
    return content;
  }

  // Normalisasi karakter baris baru (\r\n -> \n)
  let normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Jika terdapat <br><br> yang diinput manual, jadikan pemisah paragraf
  normalized = normalized.replace(/(<br\s*\/?>\s*){2,}/gi, '\n\n');

  // Pisahkan berdasarkan 2 baris baru atau lebih sebagai batas paragraf
  const paragraphs = normalized.split(/\n{2,}/);

  // Bungkus setiap potongan paragraf dengan tag <p>
  const formattedHtml = paragraphs
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      // Ubah single newline menjadi <br />
      const withLineBreaks = trimmed.replace(/\n/g, '<br />');
      return `<p>${withLineBreaks}</p>`;
    })
    .filter(Boolean)
    .join('\n');

  return formattedHtml;
}

