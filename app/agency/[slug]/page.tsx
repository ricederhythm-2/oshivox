import AppHeader from '@/components/AppHeader';
import AgencyContent from '@/components/AgencyContent';

export const dynamic = 'force-dynamic';

export default async function AgencyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="min-h-dvh" style={{ background: '#FFFFFF' }}>
      <AppHeader showBack />
      <main>
        <AgencyContent slug={slug} />
      </main>
    </div>
  );
}
