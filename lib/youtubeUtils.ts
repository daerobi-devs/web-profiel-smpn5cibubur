/**
 * YouTube Universal Parser & Embed Generator
 * Mendukung berbagai format URL: watch?v=, youtu.be/, shorts/, embed/, dan raw ID
 */

export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // 1. Jika pengguna langsung memasukkan ID 11 karakter
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // 2. Regex Universal untuk YouTube URL
  const regExp =
    /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);

  return match && match[1] ? match[1] : null;
}

export function getYouTubeThumbnail(
  videoIdOrUrl: string | null | undefined,
  quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'
): string | null {
  const id = extractYouTubeId(videoIdOrUrl);
  if (!id) return null;
  const qualityMap: Record<string, string> = {
    default: 'default.jpg',
    mq: 'mqdefault.jpg',
    hq: 'hqdefault.jpg',
    sd: 'sddefault.jpg',
    maxres: 'maxresdefault.jpg'
  };
  return `https://img.youtube.com/vi/${id}/${qualityMap[quality] || 'hqdefault.jpg'}`;
}

export function getYouTubeEmbedUrl(
  videoIdOrUrl: string | null | undefined,
  autoPlay: boolean = true
): string | null {
  const id = extractYouTubeId(videoIdOrUrl);
  if (!id) return null;
  const autoplayParam = autoPlay ? 1 : 0;
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplayParam}&rel=0&modestbranding=1&playsinline=1`;
}
