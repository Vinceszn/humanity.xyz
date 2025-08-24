import { Inter, Playfair_Display, Audiowide } from 'next/font/google';

export const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

// Reintroduced original display font for branding / headers
export const displayFont = Audiowide({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-audiowide',
  display: 'swap'
});
