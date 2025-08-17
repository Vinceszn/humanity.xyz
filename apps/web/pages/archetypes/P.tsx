import Head from 'next/head';
export default function CatalystPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Catalyst Archetype | HUMANITY</title>
        <meta name="description" content="Vibrant Orange (#E67E22): Energy, sociability, motivation." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#E67E22'}}>Catalyst</h1>
      <div className="mb-2 text-sm text-gray-500">Type P</div>
      <div className="mb-4 text-gray-700">Energetic, sociable, and motivating. Drives action and brings people together.</div>
      <div className="rounded-lg border p-4" style={{background:'#E67E22',color:'#fff'}}>Primary Color: #E67E22</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Energy, sociability, motivation</div>
    </div>
  );
}
