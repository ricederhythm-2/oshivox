export const dynamic = 'force-dynamic';

import Link from 'next/link';
import SwipeFeed from '@/components/SwipeFeed';

export default function HomePage() {
  return (
    <>
      <SwipeFeed />
      {/* debug link — remove before production */}
      <Link
        href="/map"
        className="fixed bottom-4 left-4 z-50 rounded-full text-xs font-bold"
        style={{
          padding: '6px 12px',
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
        }}
      >
        🗺 マップ版
      </Link>
    </>
  );
}

