import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ArchetypePage = dynamic(() => import('../../components/archetypes/ArchetypePage'), { ssr: false });

export default function ArchetypeDynamic() {
  const router = useRouter();
  const { letter } = router.query as { letter?: string };
  if (!letter || typeof letter !== 'string') return null;
  const L = letter.toUpperCase();
  return <ArchetypePage letter={L} />;
}
