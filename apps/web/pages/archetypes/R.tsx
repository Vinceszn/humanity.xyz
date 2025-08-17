import Head from 'next/head';
export default function MaverickPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Maverick Archetype | HUMANITY</title>
        <meta name="description" content="Fiery Red (#E74C3C): Boldness, risk, independence." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#E74C3C'}}>Maverick</h1>
      <div className="mb-2 text-sm text-gray-500">Type R</div>
      <div className="mb-4 text-gray-700">Bold, risk-taking, and independent. Challenges norms and pursues innovation.</div>
      <div className="rounded-lg border p-4" style={{background:'#E74C3C',color:'#fff'}}>Primary Color: #E74C3C</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Boldness, risk, independence</div>
    </div>
  );
}
