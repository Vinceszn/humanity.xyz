import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import D3 components to avoid SSR issues
const RadarChart = dynamic(() => import('../components/RadarChart'), { ssr: false });
const DonutChart = dynamic(() => import('../components/DonutChart'), { ssr: false });
const HeatmapChart = dynamic(() => import('../components/HeatmapChart'), { ssr: false });
const ArchetypeCard = dynamic(() => import('../components/ArchetypeCard'), { ssr: false });

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
        if (!resultId || !sig) {
          setError('No result reference found. Redirecting to quiz...');
          setTimeout(() => router.replace('/quiz'), 1500);
          return;
        }
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';
        const resp = await fetch(`${API_BASE}/results/${resultId}?token=${encodeURIComponent(sig)}`);
        if (!resp.ok) {
          setError('Failed to fetch results. Please retake the quiz.');
          setTimeout(() => router.replace('/quiz'), 2000);
          return;
        }
  const serverData = await resp.json();
        // Enrich ranking -> ranked
        let ranked: RankedItemUI[] = [];
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
    { id: 'overview', label: '🎯 Overview', icon: '🎯' },
    { id: 'radar', label: '📊 Personality Map', icon: '📊' },
    { id: 'heatmap', label: '🔥 Contextual Analysis', icon: '🔥' },
  { id: 'details', label: '📋 Detailed Breakdown', icon: '📋' },
  ...(results.report_markdown ? [{ id: 'report', label: '📝 Full Report', icon: '📝' }] : [])
  ];

  return (
  <div className="min-h-screen flex flex-col">
      <Head children={
        <>
          <title>Your HUMANITY Results</title>
          <meta name="description" content="Your personality archetype results" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </>
      } />

  <main className="w-full px-4 py-12 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Your HUMANITY Results</h1>
          <p className="text-lg text-gray-600 mx-auto">
            Discover your unique personality archetype combination and explore how you interact with the world.
          </p>
        </div>

        {/* Tab Navigation */}
  <div className="flex flex-wrap justify-center mb-8 bg-white rounded-full border p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 mx-1 ${
                activeTab === tab.id
          ? 'bg-gray-900 text-white shadow-sm'
          : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
        {tab.label}
            </button>
          ))}
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
                onClick={() => { sessionStorage.removeItem('quizResults'); router.replace('/quiz'); }}
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

        {activeTab === 'details' && (
          <div className="space-y-8">
            {/* Detailed Rankings */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-semibold">Complete Archetype Breakdown</h2>
                <p className="mt-2 opacity-80">Your complete personality profile ranked from strongest to weakest</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {results.ranked.map((archetype, index) => {
                    const { letter, ...props } = archetype;
                    return (
                      <div key={letter}>
                        <ArchetypeCard
                          archetype={props.archetype}
                          letter={letter}
                          score={props.score}
                          description={props.description}
                          isPrimary={index === 0}
                          className="h-full"
                        />
                      </div>
                    );
                  })}
                </div>
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

        {activeTab === 'report' && results.report_markdown && (
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h2 className="text-2xl font-semibold">Full Markdown Report</h2>
              <button
                onClick={() => {
                  try { navigator.clipboard.writeText(results.report_markdown || ''); } catch {}
                }}
                className="px-4 py-2 text-sm rounded-md border font-medium bg-gray-50 hover:bg-gray-100"
              >Copy Markdown</button>
            </div>
            <div className="prose max-w-none prose-sm sm:prose" style={{whiteSpace: 'pre-wrap'}}>
              {results.report_markdown.split(/\n\n+/).map((block, i) => (
                <p key={i} className="leading-relaxed">{block}</p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
