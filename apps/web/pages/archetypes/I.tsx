import Head from 'next/head';
export default function DreamerPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Dreamer Archetype | HUMANITY</title>
        <meta name="description" content="Soft Purple (#9B59B6): Imagination, empathy, idealism." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#9B59B6'}}>Dreamer</h1>
      <div className="mb-2 text-sm text-gray-500">Type I</div>
      <div className="mb-4 text-gray-700">Imaginative, empathetic, and idealistic. Brings creativity and hope to any situation.</div>
      <div className="rounded-lg border p-4" style={{background:'#9B59B6',color:'#fff'}}>Primary Color: #9B59B6</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Imagination, empathy, idealism</div>
    </div>
  );
}
