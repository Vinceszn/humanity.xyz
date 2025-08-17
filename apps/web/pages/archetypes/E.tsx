import Head from 'next/head';
export default function ArchitectPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Architect Archetype | HUMANITY</title>
        <meta name="description" content="Steel Gray (#7F8C8D): Logic, structure, adaptability." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#7F8C8D'}}>Architect</h1>
      <div className="mb-2 text-sm text-gray-500">Type E</div>
      <div className="mb-4 text-gray-700">Logical, structured, and adaptable. Excels at building systems and solving complex problems.</div>
      <div className="rounded-lg border p-4" style={{background:'#7F8C8D',color:'#fff'}}>Primary Color: #7F8C8D</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Logic, structure, adaptability</div>
    </div>
  );
}
