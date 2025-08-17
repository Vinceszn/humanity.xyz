import Head from 'next/head';
export default function HarmonizerPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Harmonizer Archetype | HUMANITY</title>
        <meta name="description" content="Pastel Pink (#F1948A): Peace, cooperation, sensitivity." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#F1948A'}}>Harmonizer</h1>
      <div className="mb-2 text-sm text-gray-500">Type A</div>
      <div className="mb-4 text-gray-700">Peaceful, cooperative, and sensitive. Creates harmony and adapts to different situations.</div>
      <div className="rounded-lg border p-4" style={{background:'#F1948A',color:'#fff'}}>Primary Color: #F1948A</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Peace, cooperation, sensitivity</div>
    </div>
  );
}
