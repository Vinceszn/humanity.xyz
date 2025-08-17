import Head from 'next/head';
import Link from 'next/link';

const archetypes = [
  { key: 'V', name: 'Visionary', color: '#2A4D69' },
  { key: 'I', name: 'Dreamer', color: '#9B59B6' },
  { key: 'E', name: 'Architect', color: '#7F8C8D' },
  { key: 'P', name: 'Catalyst', color: '#E67E22' },
  { key: 'C', name: 'Realist', color: '#6E4B3A' },
  { key: 'R', name: 'Maverick', color: '#E74C3C' },
  { key: 'S', name: 'Connector', color: '#1ABC9C' },
  { key: 'M', name: 'Sage', color: '#16A085' },
  { key: 'L', name: 'Builder', color: '#27AE60' },
  { key: 'A', name: 'Harmonizer', color: '#F1948A' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>About HUMANITY</title>
        <meta name="description" content="Overview of the HUMANITY assessment and archetypes." />
      </Head>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <header>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">About HUMANITY</h1>
          <p className="mt-3 text-gray-600 text-lg">A concise, research-informed framework to understand natural tendencies and strengths across ten core archetypes.</p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[{
            title: 'Efficient', desc: 'Complete in minutes. High signal, low noise.'
          }, {
            title: 'Insightful', desc: 'Clear language, practical guidance.'
          }, {
            title: 'Applicable', desc: 'Use in hiring, teaming, and growth.'
          }].map((c) => (
            <div key={c.title} className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900">{c.title}</h3>
              <p className="mt-2 text-gray-600">{c.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">The 10 Archetypes</h2>
              <p className="mt-1 text-gray-600">Click an archetype to explore a short description and color-coded meaning.</p>
            </div>
            <Link href="/archetypes" className="text-sm text-gray-700 hover:underline">View all</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {archetypes.map((a) => (
              <Link key={a.key} href={`/archetypes/${a.key}`} className="group rounded-lg border bg-white p-4 shadow-sm hover:shadow transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md text-white flex items-center justify-center font-semibold" style={{ background: a.color }}>{a.key}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover:underline">{a.name}</div>
                    <div className="text-xs text-gray-500">Type {a.key}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-lg border bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold tracking-tight">How scoring works</h3>
          <p className="mt-2 text-gray-600 max-w-3xl">Your answers are mapped to weighted archetype dimensions and normalized to reveal your primary profile. Doubles and triples indicate strong blends. Scores guide reflection; they do not define you.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/quiz" className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-white text-sm font-medium hover:bg-black">Take the assessment</Link>
            <Link href="/archetypes" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">Explore archetypes</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
