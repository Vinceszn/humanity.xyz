import Link from 'next/link';
import Head from 'next/head';

const ARCHETYPES = [
  { letter: 'V', name: 'Visionary' },
  { letter: 'I', name: 'Dreamer' },
  { letter: 'E', name: 'Architect' },
  { letter: 'P', name: 'Catalyst' },
  { letter: 'C', name: 'Realist' },
  { letter: 'R', name: 'Maverick' },
  { letter: 'S', name: 'Connector' },
  { letter: 'M', name: 'Sage' },
  { letter: 'L', name: 'Builder' },
  { letter: 'A', name: 'Harmonizer' },
];

export default function ArchetypesHub() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Head>
        <title>Archetypes | HUMANITY</title>
        <meta name="description" content="Explore the core archetypes, doubles, and triples." />
      </Head>
      <h1 className="text-3xl font-semibold mb-8">Core Archetypes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {ARCHETYPES.map(a => (
          <Link key={a.letter} href={`/archetypes/${a.letter}`} className="block rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="text-lg font-medium mb-1">{a.name}</div>
            <div className="text-xs text-gray-500">Type {a.letter}</div>
          </Link>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4">Combinations</h2>
      <div className="flex gap-4">
        <Link href="/archetypes/doubles" className="rounded border px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm">Doubles</Link>
        <Link href="/archetypes/triples" className="rounded border px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm">Triples</Link>
      </div>
    </div>
  );
}
