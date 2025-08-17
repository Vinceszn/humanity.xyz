import Head from 'next/head';
export default function VisionaryPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Visionary Archetype | HUMANITY</title>
        <meta name="description" content="Deep Blue (#2A4D69): Wisdom, ambition, authority." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#2A4D69'}}>Visionary</h1>
      <div className="mb-2 text-sm text-gray-500">Type V</div>
      <div className="mb-4 text-gray-700">Big-picture thinkers who inspire with vision and ambition. Wisdom, authority, and strategic leadership.</div>
      <div className="rounded-lg border p-4" style={{background:'#2A4D69',color:'#fff'}}>Primary Color: #2A4D69</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Wisdom, ambition, authority</div>
    </div>
  );
}
