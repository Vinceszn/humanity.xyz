import dynamic from 'next/dynamic';

const ArchetypePage = dynamic(() => import('../../components/archetypes/ArchetypePage'), { ssr: false });

export default function RealistPage() {
  return <ArchetypePage letter="C" />;
}
