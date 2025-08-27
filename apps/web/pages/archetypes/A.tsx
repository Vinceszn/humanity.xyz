import dynamic from 'next/dynamic';

const ArchetypePage = dynamic(() => import('../../components/archetypes/ArchetypePage'), { ssr: false });

export default function HarmonizerPage() {
  return <ArchetypePage letter="A" />;
}
