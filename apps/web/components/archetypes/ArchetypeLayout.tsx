import React from 'react';
import Head from 'next/head';

interface ArchetypeLayoutProps {
  title: string;
  type: string;
  subtitle: string;
  color: string; // primary brand color per archetype
  essenceTitle?: string;
  essenceText?: string;
  traits?: { name: string; value: number; color?: string }[];
  quickInsights?: { title: string; value: string }[];
  children?: React.ReactNode;
}

export const ArchetypeLayout: React.FC<ArchetypeLayoutProps> = ({
  title,
  type,
  subtitle,
  color,
  essenceTitle = 'ARCHETYPE ESSENCE',
  essenceText,
  traits = [],
  quickInsights = [],
  children
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 archetype-page">
      <Head>
        <title>{title} Archetype | HUMANITY</title>
        <meta name="description" content={`${title} Archetype Profile`} />
      </Head>
      {/* Hero section */}
      <div className="relative overflow-hidden" style={{background: `linear-gradient(to right, ${color}, ${color}CC)`}}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 font-serif">{type}</div>
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <div className="text-lg opacity-90 mb-1">Type {type}</div>
                <div className="text-xl font-medium opacity-80">{subtitle}</div>
              </div>
              {(essenceText) && (
                <div className="bg-white/10 rounded-lg p-4 mb-2">
                  <div className="text-sm font-semibold mb-1">{essenceTitle}</div>
                  <div className="text-sm opacity-90 leading-relaxed">{essenceText}</div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              {children /* Hero-adjacent summary cards can be passed in via composition */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeLayout;
