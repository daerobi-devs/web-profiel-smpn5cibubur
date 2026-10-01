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
  title: {
    default: 'SMPN 5 Cibeber — Sekolah Menengah Pertama Negeri 5 Cibeber',
    template: '%s | SMPN 5 Cibeber',
  },
  description:
    'Website resmi SMPN 5 Cibeber, Kabupaten Lebak, Provinsi Banten. Informasi sekolah, berita, profil, fasilitas, galeri, prestasi, dan PPDB.',
  keywords: ['SMPN 5 Cibeber', 'SMP Negeri 5 Cibeber', 'Lebak', 'Banten', 'sekolah', 'pendidikan'],
  icons: {
    icon: '/assets/logo-smpn5cibeber.png',
    shortcut: '/assets/logo-smpn5cibeber.png',
    apple: '/assets/logo-smpn5cibeber.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'SMPN 5 Cibeber',
  },
  referrer: 'strict-origin-when-cross-origin',
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
        {children}
      </body>
    </html>
  );
}
