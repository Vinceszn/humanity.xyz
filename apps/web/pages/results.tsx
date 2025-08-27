import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Types used by dynamic components
interface RankedItemUI {
  archetype: string;
  letter: string;
  score: number;
  description: string;
}

interface ResultsProps {
  ranked: RankedItemUI[];
  top3_profile?: { profile: string; class: string; triple: string };
  top2_profile?: { profile: string; class: string; pair: string };
  // Fallback raw shape from core API
  ranking?: Array<{ letter: string; score: number }>;
  report_markdown?: string;
}

// Dynamically import richer ECharts components to avoid SSR issues
const RadarChart = dynamic(
  () => import('@components/BetterRadarChart').then(m => m.default),
  { ssr: false }
) as React.ComponentType<{ data: RankedItemUI[] }>;
const DonutChart = dynamic(
  () => import('@components/BetterDonutChart').then(m => m.default),
  { ssr: false }
) as React.ComponentType<{ overallScore: number; topArchetype: string }>;
const HeatmapChart = dynamic(
  () => import('@components/BetterHeatmapChart').then(m => m.default),
  { ssr: false }
) as React.ComponentType<{ data: RankedItemUI[] }>;
const ResultsTable = dynamic(
  () => import('@components/BetterResultsTable').then(m => m.default),
  { ssr: false }
) as React.ComponentType<{ data: RankedItemUI[] }>;
const BarChart = dynamic(
  () => import('@components/BetterBarChart').then(m => m.default),
  { ssr: false }
) as React.ComponentType<{ data: RankedItemUI[] }>;
const ArchetypeCard = dynamic(() => import('@components/ArchetypeCard'), { ssr: false });

// Lightweight skeleton loader mimicking the final layout to improve perceived performance
function ResultsSkeleton() {
  const shimmer = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:400%_100%]';
  return (
    <div className="min-h-screen flex flex-col">
      <main className="w-full px-4 py-12 flex-1 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className={`h-10 w-72 mx-auto rounded ${shimmer}`} aria-hidden="true" />
          <div className={`h-4 w-96 max-w-full mt-6 mx-auto rounded ${shimmer}`} aria-hidden="true" />
        </div>
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-full border p-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-10 w-40 rounded-full ${shimmer}`} aria-hidden="true" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg border shadow-sm p-8 flex items-center justify-center">
            <div className={`rounded-full h-56 w-56 ${shimmer}`} aria-hidden="true" />
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
              <div className={`h-7 w-48 rounded ${shimmer}`} />
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`h-12 w-full rounded ${shimmer}`} />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
              <div className={`h-7 w-56 rounded ${shimmer}`} />
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`h-12 w-full rounded ${shimmer}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
              <div className={`h-6 w-40 rounded ${shimmer}`} />
              <div className={`h-4 w-full rounded ${shimmer}`} />
              <div className={`h-4 w-5/6 rounded ${shimmer}`} />
              <div className={`h-4 w-2/3 rounded ${shimmer}`} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <div className={`h-12 w-40 mx-auto rounded-md ${shimmer}`} aria-hidden="true" />
        </div>
        <span className="sr-only" role="status">Loading results...</span>
      </main>
    </div>
  );
}

export default function Results() {
  const router = useRouter();
  const [results, setResults] = useState<ResultsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Hooks must be declared unconditionally at the top level (before any early returns)
  const [activeTab, setActiveTab] = useState('overview');
  
  // Lightweight insight generator for deeper content
  const getDeepInsights = (name: string, score: number) => {
    const level = score >= 80 ? 'very strong' : score >= 60 ? 'strong' : 'emerging';
    return {
      why: `You show ${level} alignment with the ${name} archetype, indicating this is a natural lens you use to interpret and shape situations.`,
      best: `${name}s are at their best when they can lean into their core strengths without overextending. Look for contexts where this style is valued and visible.`,
      watch: `Be mindful of over-indexing on ${name} tendencies. Balance them with complementary archetypes in your top 3 to avoid blind spots.`,
      try: `Pick one decision this week and deliberately apply your ${name} strengths. Then, invite feedback from someone who embodies a different style to round it out.`,
    };
  };
  
  // Simple actions
  const handleShare = () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : '';
      if ((navigator as any).share) {
        (navigator as any).share({ title: 'My HUMANITY Results', url });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        // Optional: lightweight confirmation; avoid blocking alert in some browsers
      }
    } catch {}
  };
  const handleCopyLink = () => {
    try { const url = typeof window !== 'undefined' ? window.location.href : ''; navigator.clipboard?.writeText(url); } catch {}
  };
  const handleDownload = () => {
    try {
      const data = results || {};
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `humanity-results-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {}
  };
  const handlePrint = () => { try { window.print(); } catch {} };

  useEffect(() => {
    const load = async () => {
      try {
        const { rid, token } = router.query as { rid?: string; token?: string };
        let resultId = rid;
        let sig = token;
        if (!resultId || !sig) {
          // Try reading from stored meta (user refreshed without query params?)
            if (typeof window !== 'undefined') {
              try {
                const metaRaw = sessionStorage.getItem('resultMeta');
                if (metaRaw) {
                  const meta = JSON.parse(metaRaw);
                  resultId = resultId || meta.result_id;
                  sig = sig || meta.token;
                }
              } catch {}
            }
        }
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';
        // Path A: if we have resultId+token and a live API supports it
        let serverData: any = null;
        if (resultId && sig) {
          try {
            const resp = await fetch(`${API_BASE}/results/${resultId}?token=${encodeURIComponent(sig)}`);
            if (resp.ok) {
              serverData = await resp.json();
            }
          } catch {}
        }
        // Path B: fall back to stateless stored payload
        if (!serverData) {
          try {
            const localRaw = typeof window !== 'undefined' ? sessionStorage.getItem('resultsPayload') : null;
            if (localRaw) serverData = JSON.parse(localRaw);
          } catch {}
        }
        if (!serverData) {
          setError('No result reference found. Redirecting to quiz...');
          setTimeout(() => router.replace('/quiz'), 1500);
          return;
        }
        // Build ranked list from either enriched 'ranked' (preferred) or raw 'ranking' + archetype lookup
        let ranked: RankedItemUI[] = [];
        if (Array.isArray(serverData.ranked) && serverData.ranked.length) {
          ranked = serverData.ranked.map((r: any) => ({
            letter: r.letter,
            score: typeof r.score === 'number' ? r.score : Number(r.score) || 0,
            archetype: r.archetype || r.letter,
            description: r.description || '',
          }));
        } else {
          try {
            const arcsResp = await fetch(`${API_BASE}/data/archetypes`).then(r => r.ok ? r.json() : Promise.reject(r.statusText));
            const archetypes = (arcsResp.archetypes || []) as Array<{ letter?: string; code?: string; name?: string; archetype?: string; description?: string }>;
            const byLetter: Record<string, { name: string; description: string }> = {};
            archetypes.forEach(a => {
              const letter = (a.letter || a.code || a.archetype || '').toString();
              if (letter) byLetter[letter] = { name: (a.name || a.archetype || letter), description: a.description || '' };
            });
            ranked = (serverData.ranking || []).map((r: any) => ({
              letter: r.letter,
              score: r.score,
              archetype: byLetter[r.letter]?.name || r.letter,
              description: byLetter[r.letter]?.description || ''
            }));
          } catch {
            ranked = (serverData.ranking || []).map((r: any) => ({ letter: r.letter, score: r.score, archetype: r.letter, description: '' }));
          }
        }
        if (!ranked.length) {
          setError('Results data incomplete. Please retake the quiz.');
          setTimeout(() => router.replace('/quiz'), 1500);
          return;
        }
        const merged: ResultsProps = { 
          ranked, 
          ranking: serverData.ranking,
          report_markdown: serverData.report_markdown,
          top2_profile: serverData.top2_profile,
          top3_profile: serverData.top3_profile,
        };
        setResults(merged);
        try {
          if (typeof window !== 'undefined' && sessionStorage.getItem('quizPendingReset')) {
            sessionStorage.removeItem('quizProgress');
            sessionStorage.removeItem('quizPendingReset');
          }
        } catch {}
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router, router.query]);

  if (loading) {
  return <ResultsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center" aria-live="assertive">
          <h2 className="text-red-500 text-xl font-semibold mb-2">Notice</h2>
          <p className="text-gray-700">{error}</p>
          <p className="text-xs text-gray-400 mt-4">If you are not redirected automatically, <button onClick={() => router.replace('/quiz')} className="underline">go to the quiz</button>.</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  // Calculate overall score (average of top 3 archetypes)
  const overallScore = results.ranked && results.ranked.length
    ? (results.ranked.slice(0, 3).reduce((sum, item) => sum + item.score, 0) / Math.min(3, results.ranked.length))
    : 0;

  const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'radar', label: 'Personality Map' },
  { id: 'heatmap', label: 'Contextual Analysis' },
  { id: 'bars', label: 'Score Bars' },
  { id: 'details', label: 'Detailed Breakdown' },
  ];

  return (
  <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Subtle animated background like quiz */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="bg-loop h-full w-full">
          <span className="blob blob-a"></span>
          <span className="blob blob-b"></span>
          <span className="blob blob-c"></span>
        </div>
      </div>
      <Head children={
        <>
          <title>Your HUMANITY Results</title>
          <meta name="description" content="Your personality archetype results" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </>
      } />

  <main className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex-1 max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-3 sm:mb-4">Your HUMANITY Results</h1>
          <p className="text-base sm:text-lg text-gray-700 mx-auto">
            Discover your unique personality archetype combination and explore how you interact with the world.
          </p>
          {/* Action bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button onClick={handleShare} className="px-4 py-2 rounded-full text-sm font-medium border bg-white/80 backdrop-blur hover:bg-white">Share</button>
            <button onClick={handleCopyLink} className="px-4 py-2 rounded-full text-sm font-medium border bg-white/80 backdrop-blur hover:bg-white">Copy Link</button>
            <button onClick={handleDownload} className="px-4 py-2 rounded-full text-sm font-medium border bg-white/80 backdrop-blur hover:bg-white">Download JSON</button>
            <button onClick={handlePrint} className="px-4 py-2 rounded-full text-sm font-medium border bg-white/80 backdrop-blur hover:bg-white">Print</button>
          </div>
        </div>

        {/* Tab Navigation */}
  <div className="sticky top-0 z-40 mb-8 -mx-2 sm:mx-0">
          <div className="bg-white/80 backdrop-blur border rounded-full p-2 flex items-center gap-1 overflow-x-auto whitespace-nowrap justify-start sm:justify-center px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 mx-1 ${
                activeTab === tab.id
          ? 'bg-gray-900 text-white shadow-sm'
          : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
        {tab.label}
            </button>
          ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Overall Score & Primary Archetype */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
                <DonutChart 
                  overallScore={overallScore}
                  topArchetype={results.ranked[0].archetype}
                />
              </div>
              
              <div className="space-y-6">
                {/* Profile Cards */}
                {results.top2_profile && (
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <h3 className="text-2xl font-semibold mb-4">{results.top2_profile.profile}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Archetype Pair:</span>
                        <p className="text-gray-700">{results.top2_profile.pair}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Compatibility:</span>
                        <p className="text-gray-700">{results.top2_profile.class}</p>
                      </div>
                    </div>
                  </div>
                )}

                {results.top3_profile && (
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <h3 className="text-2xl font-semibold mb-4">{results.top3_profile.profile}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Archetype Triple:</span>
                        <p className="text-gray-700">{results.top3_profile.triple}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Compatibility:</span>
                        <p className="text-gray-700">{results.top3_profile.class}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Archetype Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.ranked.slice(0, 3).map((archetype, index) => {
                const { letter, ...props } = archetype;
                return (
      <div key={letter}>
                    <ArchetypeCard
                      archetype={props.archetype}
                      letter={letter}
                      score={props.score}
                      description={props.description}
                      isPrimary={index === 0}
                    />
                  </div>
                );
              })}
            </div>
    <div className="text-center mt-8">
              <button
                onClick={() => {
                  try {
                    sessionStorage.removeItem('quizResults');
                    sessionStorage.removeItem('quizProgress');
                    sessionStorage.removeItem('resultsPayload');
                    sessionStorage.removeItem('resultMeta');
                    sessionStorage.removeItem('quizPendingReset');
                  } catch {}
                  router.replace('/quiz');
                }}
        className="px-6 py-3 rounded-md font-medium border border-gray-300 hover:bg-gray-50"
              >
        Retake Quiz
              </button>
            </div>
          </div>
        )}

        {activeTab === 'radar' && (
          <div className="bg-white rounded-lg border shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-center mb-8">Personality Dimensions Map</h2>
            <p className="text-center text-gray-600 mb-8 mx-auto">
              This radar chart shows your scores across all 10 personality archetypes. 
              The larger the area, the more balanced your personality profile.
            </p>
            <RadarChart data={results.ranked} />
          </div>
        )}

        {activeTab === 'heatmap' && (
          <div className="bg-white rounded-lg border shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-center mb-8">Contextual Personality Expression</h2>
            <p className="text-center text-gray-600 mb-8 mx-auto">
              See how your different archetypes might express themselves in various situations. 
              Warmer colors indicate stronger expression in that context.
            </p>
            <HeatmapChart data={results.ranked} />
          </div>
        )}

        {activeTab === 'bars' && (
          <div className="bg-white rounded-lg border shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-center mb-8">Scores by Archetype</h2>
            <p className="text-center text-gray-600 mb-8 mx-auto">
              A straightforward bar chart of your archetype scores for quick comparisons.
            </p>
            <BarChart data={results.ranked} />
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-8">
            {/* Deep Dive for Top 3 */}
            <div className="bg-white rounded-lg border shadow-sm p-8">
              <h3 className="text-2xl font-semibold mb-2">Deep Dive: Your Top Archetypes</h3>
              <p className="text-gray-600 mb-6">Practical insight on how your leading styles show up day-to-day.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.ranked.slice(0, 3).map((r) => {
                  const insight = getDeepInsights(r.archetype, r.score);
                  return (
                    <div key={r.letter} className="rounded-lg border bg-white/80 p-6">
                      <h4 className="text-xl font-semibold mb-1">{r.archetype}</h4>
                      <p className="text-sm text-gray-500 mb-4">Score: {Math.round(r.score)}</p>
                      <ul className="space-y-3 text-gray-700 text-sm">
                        <li>
                          <span className="font-medium">Why this resonates:</span> {insight.why}
                        </li>
                        <li>
                          <span className="font-medium">When it&apos;s at your best:</span> {insight.best}
                        </li>
                        <li>
                          <span className="font-medium">Watch-outs:</span> {insight.watch}
                        </li>
                        <li>
                          <span className="font-medium">Try this:</span> {insight.try}
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Rankings (interactive table) */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-semibold">Complete Archetype Breakdown</h2>
                <p className="mt-2 opacity-80">Sortable table with visual scores</p>
              </div>
              <div className="p-2 sm:p-4">
                <ResultsTable data={results.ranked} />
              </div>
            </div>

            {/* Action Items & Insights */}
    <div className="bg-white rounded-lg border shadow-sm p-8">
      <h3 className="text-2xl font-semibold mb-6">Key Insights & Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
      <h4 className="font-semibold mb-3">Your Strengths</h4>
      <ul className="space-y-2 text-gray-700">
                    {results.ranked.slice(0, 3).map((archetype, index) => (
                      <li key={index} className="flex items-center">
        <span className="w-2 h-2 bg-gray-900 rounded-full mr-3"></span>
                        Strong {archetype.archetype} traits (Score: {Math.round(archetype.score)})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
      <h4 className="font-semibold mb-3">Growth Opportunities</h4>
      <ul className="space-y-2 text-gray-700">
                    {results.ranked.slice(-3).reverse().map((archetype, index) => (
                      <li key={index} className="flex items-center">
        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        Develop {archetype.archetype} skills (Score: {Math.round(archetype.score)})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

  {/* Full report section removed per request */}
      </main>
    </div>
  );
}
