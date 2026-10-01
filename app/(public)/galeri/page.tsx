import { getActiveGalleries } from '@/lib/supabaseData';
import GalleryLightbox, { GalleryItem } from '@/components/ui/GalleryLightbox';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri Sekolah — SMPN 5 Cibeber',
  description: 'Dokumentasi foto kegiatan belajar, ekstrakurikuler, prestasi, dan fasilitas SMPN 5 Cibeber.',
};

export default async function GaleriPage() {
  const rawGalleries = await getActiveGalleries();

  const galleries: GalleryItem[] = rawGalleries.map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description ?? null,
    imageUrl: g.image_url,
    category: g.category,
  }));

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Konten Galeri Interaktif — Langsung ke Filter Album & Grid Foto Lightbox */}
      <main className="container-site pt-6 pb-16 sm:pt-8 sm:pb-20">
        <GalleryLightbox items={galleries} />
      </main>
    </div>
  );
}
