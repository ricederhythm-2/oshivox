'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLog } from '@/context/ActionLoggerContext';

/** ルート変更のたびに page_view ログを記録するサイレントコンポーネント */
export default function PageViewLogger() {
  const pathname = usePathname();
  const log      = useLog();

  useEffect(() => {
    log('page_view', { pagePath: pathname });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
