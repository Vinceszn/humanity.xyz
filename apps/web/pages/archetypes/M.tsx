import Head from 'next/head';
export default function SagePage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Sage Archetype | HUMANITY</title>
        <meta name="description" content="Cool Teal (#16A085): Knowledge, logic, detachment." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#16A085'}}>Sage</h1>
      <div className="mb-2 text-sm text-gray-500">Type M</div>
      <div className="mb-4 text-gray-700">Knowledgeable, logical, and detached. Provides insight and wisdom to guide others.</div>
      <div className="rounded-lg border p-4" style={{background:'#16A085',color:'#fff'}}>Primary Color: #16A085</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Knowledge, logic, detachment</div>
    </div>
  );
}
