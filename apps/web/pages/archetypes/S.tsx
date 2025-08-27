import dynamic from 'next/dynamic';

const ArchetypePage = dynamic(() => import('../../components/archetypes/ArchetypePage'), { ssr: false });

export default function ConnectorPage() {
  return <ArchetypePage letter="S" />;
}
