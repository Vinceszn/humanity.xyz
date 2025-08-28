import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

type Sections = {
  overview?: string;
  coreTraits?: string;
  strengths?: string;
  shadow?: string;
  work?: string;
  growth?: string;
  careers?: string;
  communication?: string;
  compatibility?: string;
  values?: string;
};

const COLOR_MAP: Record<string, string> = {
  V: '#2A4D69',
  I: '#7c3aed',
  E: '#0ea5e9',
  P: '#f97316',
  C: '#64748b',
  R: '#dc2626',
  S: '#16a34a',
  M: '#6b7280',
  L: '#0d9488',
  A: '#2563eb',
};

export default function ArchetypePage({ letter }: { letter: string }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [markdown, setMarkdown] = useState<string>('');
  const [tagline, setTagline] = useState<string>('');
  const [color, setColor] = useState<string>(COLOR_MAP[letter] || '#1f2937');
  const [name, setName] = useState<string>('');

  // Load basic name from API (use relative '/api' in prod so Vercel rewrite proxies)
  useEffect(() => {
    let mounted = true;
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || (process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8000');
    fetch(`${API_BASE}/api/data/archetypes`)
      .then(r => (r.ok ? r.json() : null))
      .then((data) => {
        if (!mounted || !data) return;
        const found = (data.archetypes || []).find((a: any) => (a.letter || a.code) === letter);
        if (found?.name) setName(found.name);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [letter]);

  // Fetch markdown for this archetype from public folder
  useEffect(() => {
    let cancelled = false;
    const url = `/archetypes/${letter}.md`;
    fetch(url)
      .then(r => (r.ok ? r.text() : ''))
      .then(text => {
        if (cancelled) return;
        setMarkdown(text || '');
        // Extract Color and Tagline metadata if present
        const colorMatch = text.match(/\*\*Color:\*\*\s*([^\n]+)/i);
        if (colorMatch && colorMatch[1]) {
          const hex = colorMatch[1].match(/#([0-9a-fA-F]{6})/);
          if (hex) setColor(`#${hex[1]}`);
        }
        const taglineMatch = text.match(/\*\*Tagline:\*\*\s*([^\n]+)/i);
        if (taglineMatch && taglineMatch[1]) setTagline(taglineMatch[1].trim());
        const titleMatch = text.match(/^#\s*The\s+([^\n]+?)\s+Archetype/i);
        if (titleMatch && titleMatch[1]) setName(titleMatch[1].trim());
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [letter]);

  const sections: Sections = useMemo(() => {
    if (!markdown) return {};
    // Split on third-level headings to capture main sections
    const lines = markdown.split(/\r?\n/);
    const map: Sections = {};
    let currentKey: keyof Sections | null = null;
    let buffer: string[] = [];

    const commit = () => {
      if (currentKey) {
        (map as any)[currentKey] = buffer.join('\n').trim();
      }
      buffer = [];
    };

    const titleToKey = (title: string): keyof Sections | null => {
      const t = title.toLowerCase();
      if (t.includes('overview')) return 'overview';
      if (t.includes('core traits')) return 'coreTraits';
      if (t.startsWith('strength')) return 'strengths';
      if (t.includes('weak') || t.includes('shadow')) return 'shadow';
      if (t.includes('work') || t.includes('relationship')) return 'work';
      if (t.includes('growth')) return 'growth';
      if (t.includes('career')) return 'careers';
      if (t.includes('communication')) return 'communication';
      if (t.includes('compatibility')) return 'compatibility';
      if (t.includes('philosophy') || t.includes('values')) return 'values';
      return null;
    };

    for (const line of lines) {
      const m = line.match(/^#{2,3}\s+(.+)/);
      if (m) {
        // New section
        commit();
        const key = titleToKey(m[1]);
        currentKey = key;
        continue;
      }
      if (currentKey) buffer.push(line);
    }
    commit();
    return map;
  }, [markdown]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'traits', label: 'Core Traits' },
    { id: 'strengths', label: 'Strengths & Shadow' },
    { id: 'work', label: 'Work & Relationships' },
    { id: 'growth', label: 'Growth & Career' },
    { id: 'communication', label: 'Communication' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'values', label: 'Values & Philosophy' }
  ];

  const themeBg = {
    background: `linear-gradient(90deg, ${color} 0%, ${color}cc 50%, ${color} 100%)`
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 archetype-page">
      <Head>
        <title>{name || letter} Archetype | HUMANITY</title>
        <meta name="description" content={`${name || letter} archetype profile`} />
      </Head>

      {/* Hero */}
      <div className="relative overflow-hidden text-white" style={themeBg}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 font-serif">{letter}</div>
                <h1 className="text-4xl font-bold mb-2">{name || 'Archetype'}</h1>
                <div className="text-lg opacity-90 mb-1">Type {letter}</div>
                {tagline && <div className="text-xl font-medium opacity-80">{tagline}</div>}
              </div>

              {sections.coreTraits && (
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <div className="text-sm font-semibold mb-2">ARCHETYPE ESSENCE</div>
                  <div className="text-sm opacity-90">{tagline || 'Distinct style and strengths summarized below'}</div>
                </div>
              )}

              {/* Traits as bullets (no numeric bars by default) */}
              {sections.coreTraits && (
                <div className="space-y-2 text-left">
                  <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                    {sections.coreTraits}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Quick Insights from strengths/shadow if available */}
            {(sections.strengths || sections.shadow) && (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4">Quick Insights</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {sections.strengths && (
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <div className="text-xs uppercase tracking-wide opacity-70 mb-1">Strength</div>
                        <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                          {sections.strengths.split('\n').slice(0, 2).join('\n')}
                        </div>
                      </div>
                    )}
                    {sections.shadow && (
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <div className="text-xs uppercase tracking-wide opacity-70 mb-1">Growth Edge</div>
                        <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                          {sections.shadow.split('\n').slice(0, 2).join('\n')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6" style={{ color }}>{name} Overview</h2>
            {sections.overview ? (
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {sections.overview}
              </div>
            ) : (
              <p className="text-gray-600">Overview coming soon.</p>
            )}
          </section>
        )}

        {activeTab === 'traits' && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6" style={{ color }}>Core Traits</h2>
            {sections.coreTraits ? (
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {sections.coreTraits}
              </div>
            ) : (
              <p className="text-gray-600">Traits available soon.</p>
            )}
          </section>
        )}

        {activeTab === 'strengths' && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8" style={{ color }}>Strengths & Shadow Aspects</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4 text-green-700">Core Strengths</h3>
                {sections.strengths ? (
                  <div className="prose max-w-none text-green-800 whitespace-pre-wrap">
                    {sections.strengths}
                  </div>
                ) : (
                  <p className="text-green-800">No strengths listed.</p>
                )}
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4 text-red-700">Shadow Aspects</h3>
                {sections.shadow ? (
                  <div className="prose max-w-none text-red-800 whitespace-pre-wrap">
                    {sections.shadow}
                  </div>
                ) : (
                  <p className="text-red-800">No shadow aspects listed.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'work' && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8" style={{ color }}>Work & Relationships</h2>
            {sections.work ? (
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {sections.work}
              </div>
            ) : (
              <p className="text-gray-600">Work and relationship notes coming soon.</p>
            )}
          </section>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8" style={{ color }}>Growth & Development</h2>
              {sections.growth ? (
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                  {sections.growth}
                </div>
              ) : (
                <p className="text-gray-600">Growth tips coming soon.</p>
              )}
            </section>
            {sections.careers && (
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color }}>Ideal Career Paths</h3>
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                  {sections.careers}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'communication' && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8" style={{ color }}>Communication</h2>
            {sections.communication ? (
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {sections.communication}
              </div>
            ) : (
              <p className="text-gray-600">Communication guidance coming soon.</p>
            )}
          </section>
        )}

        {activeTab === 'compatibility' && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8" style={{ color }}>Compatibility</h2>
            {sections.compatibility ? (
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {sections.compatibility}
              </div>
            ) : (
              <p className="text-gray-600">Compatibility notes coming soon.</p>
            )}
          </section>
        )}

        {activeTab === 'values' && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8" style={{ color }}>Core Philosophy & Values</h2>
            {sections.values ? (
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {sections.values}
              </div>
            ) : (
              <p className="text-gray-600">Values and philosophy coming soon.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
