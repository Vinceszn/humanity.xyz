import Head from 'next/head';
export default function ConnectorPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Head>
        <title>Connector Archetype | HUMANITY</title>
        <meta name="description" content="Warm Teal (#1ABC9C): Empathy, harmony, diplomacy." />
      </Head>
      <h1 className="text-2xl font-semibold mb-4" style={{color:'#1ABC9C'}}>Connector</h1>
      <div className="mb-2 text-sm text-gray-500">Type S</div>
      <div className="mb-4 text-gray-700">Empathetic, harmonious, and diplomatic. Excels at building relationships and resolving conflict.</div>
      <div className="rounded-lg border p-4" style={{background:'#1ABC9C',color:'#fff'}}>Primary Color: #1ABC9C</div>
      <div className="mt-4 text-xs text-gray-500">Emotion/Meaning: Empathy, harmony, diplomacy</div>
    </div>
  );
}
