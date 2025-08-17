import Head from 'next/head';
export default function RealistPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Realist Archetype | HUMANITY</title>
        <meta name="description" content="Earth Brown (#6E4B3A): Stability, practicality, caution." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#6E4B3A'}}>Realist</h1>
      <div className="mb-2 text-sm text-gray-500">Type C</div>
      <div className="mb-4 text-gray-700">Stable, practical, and cautious. Grounds decisions in reality and careful judgment.</div>
      <div className="rounded-lg border p-4" style={{background:'#6E4B3A',color:'#fff'}}>Primary Color: #6E4B3A</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Stability, practicality, caution</div>
    </div>
  );
}
