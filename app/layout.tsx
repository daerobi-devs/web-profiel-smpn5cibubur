import type { Metadata, Viewport } from 'next';
import { Outfit, Geist_Mono, Newsreader } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const newsreader = Newsreader({
  variable: '--font-serif-academic',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E5631',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://smpn5cibeber.sch.id'),
  title: {
    default: 'SMP Negeri 5 Cibeber — Sekolah Berkarakter & Unggul di Lebak Banten',
    template: '%s | SMP Negeri 5 Cibeber',
  },
  description:
    'Website resmi SMP Negeri 5 Cibeber (NPSN: 20607865, Akreditasi B), Kabupaten Lebak, Provinsi Banten. Informasi profil sekolah, dewan guru, fasilitas, prestasi, kegiatan ekstrakurikuler, berita, agenda, dan pendaftaran PPDB.',
  keywords: [
    'SMPN 5 Cibeber',
    'SMP Negeri 5 Cibeber',
    'SMP 5 Cibeber',
    'SMPN 5 Cibeber Lebak',
    'Sekolah Menengah Pertama Negeri 5 Cibeber',
    'SMP Terbaik di Cibeber',
    'PPDB SMPN 5 Cibeber',
    'NPSN 20607865',
    'Pendidikan Kabupaten Lebak Banten',
    'Warungbanten Cibeber',
  ],
  alternates: {
    canonical: 'https://smpn5cibeber.sch.id',
  },
  authors: [{ name: 'SMP Negeri 5 Cibeber' }],
  creator: 'SMP Negeri 5 Cibeber',
  publisher: 'SMP Negeri 5 Cibeber',
  icons: {
    icon: '/assets/logo-smpn5cibeber.png',
    shortcut: '/assets/logo-smpn5cibeber.png',
    apple: '/assets/logo-smpn5cibeber.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://smpn5cibeber.sch.id',
    siteName: 'SMP Negeri 5 Cibeber',
    title: 'SMP Negeri 5 Cibeber — Sekolah Berkarakter & Unggul di Lebak Banten',
    description:
      'Portal informasi resmi SMP Negeri 5 Cibeber, Kab. Lebak, Banten. Membina budi pekerti, keunggulan akademik, kelestarian lingkungan hidup, dan penguasaan teknologi.',
    images: [
      {
        url: 'https://smpn5cibeber.sch.id/assets/logo-smpn5cibeber.png',
        width: 512,
        height: 512,
        alt: 'Logo Resmi SMP Negeri 5 Cibeber',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'SMP Negeri 5 Cibeber — The Inspiring School of Cibeber',
    description:
      'Portal informasi resmi SMP Negeri 5 Cibeber, Kab. Lebak, Banten. Membina budi pekerti, keunggulan akademik, kelestarian lingkungan hidup, dan penguasaan teknologi.',
    images: ['https://smpn5cibeber.sch.id/assets/logo-smpn5cibeber.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  referrer: 'strict-origin-when-cross-origin',
};

const schoolSchema = {
  '@context': 'https://schema.org',
  '@type': 'MiddleSchool',
  name: 'SMP Negeri 5 Cibeber',
  alternateName: ['SMPN 5 Cibeber', 'SMP 5 Cibeber', 'SMPN5Cibeber'],
  url: 'https://smpn5cibeber.sch.id',
  logo: 'https://smpn5cibeber.sch.id/assets/logo-smpn5cibeber.png',
  image: 'https://smpn5cibeber.sch.id/assets/gedung-smpn5cibeber.jpg',
  description:
    'Lembaga Pendidikan Menengah Negeri yang berfokus pada pembentukan budi pekerti, keunggulan akademik, keterampilan teknologi, dan kelestarian lingkungan di Kabupaten Lebak, Banten.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Raya Cikotok-Pasirkuray Km.05, Warungbanten',
    addressLocality: 'Kecamatan Cibeber',
    addressRegion: 'Kabupaten Lebak, Banten',
    postalCode: '42394',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.833301695061611,
    longitude: 106.3265556147708,
  },
  telephone: '+6285281459726',
  email: 'smpnlimacibeber@yahoo.com',
  identifier: {
    '@type': 'PropertyValue',
    name: 'NPSN',
    value: '20607865',
  },
  sameAs: [
    'https://www.youtube.com/@SMPNegeri5Cibeber',
    'https://instagram.com/smpn5cibeber',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light" style={{ colorScheme: 'light' }}>
      <body
        className={`${outfit.variable} ${newsreader.variable} ${geistMono.variable} antialiased bg-[#F8FAFC] text-[#1E293B]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
