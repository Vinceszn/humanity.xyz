import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { bodyFont, headingFont, displayFont } from '../lib/fonts';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  // Hide back button on landing page
  const showBack = router.pathname !== '/';
  const isHome = router.pathname === '/';
  return (
  <div className={`min-h-screen ${isHome ? 'bg-white' : 'bg-gray-50'} text-gray-900 flex flex-col ${bodyFont.variable} ${headingFont.variable} ${displayFont.variable} font-sans`}>
      <header className={`${isHome ? 'border-b-0 bg-transparent' : 'border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60'} w-full`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="tracking-tight text-xl font-audiowide font-semibold">HUMANITY</Link>
            {showBack && (
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 text-sm text-gray-700 border border-gray-300"
                aria-label="Go back"
              >
                <span aria-hidden="true">←</span> Back
              </button>
            )}
          </div>
          <nav className="flex items-center gap-8 text-sm text-gray-600 font-medium font-audiowide">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <Link href="/quiz" className="hover:text-gray-900">Quiz</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center text-sm text-gray-500">
          © {new Date().getFullYear()} HUMANITY. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
