import Head from 'next/head';
export default function BuilderPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Builder Archetype | HUMANITY</title>
        <meta name="description" content="Strong Green (#27AE60): Growth, drive, creation." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#27AE60'}}>Builder</h1>
      <div className="mb-2 text-sm text-gray-500">Type L</div>
      <div className="mb-4 text-gray-700">Growth-oriented, driven, and creative. Turns plans into reality and builds lasting value.</div>
      <div className="rounded-lg border p-4" style={{background:'#27AE60',color:'#fff'}}>Primary Color: #27AE60</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Growth, drive, creation</div>
    </div>
  );
}
