import AppHeader from '@/components/AppHeader';

export const metadata = { title: 'プライバシーポリシー | OshiVox' };

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh" style={{ background: '#FFFFFF' }}>
      <AppHeader showBack />
      <main className="w-full max-w-[430px] mx-auto px-5 pt-6 pb-16">
        <h1 className="text-xl font-black mb-1" style={{ color: '#111111' }}>プライバシーポリシー</h1>
        <p className="text-xs mb-8" style={{ color: '#AAAAAA' }}>最終更新：2026年3月3日</p>

        <Section title="1. 基本方針">
          <p>OshiVox（以下「本サービス」）は、ユーザーの個人情報の保護を重要事項と位置づけ、適切に取り扱います。本ポリシーは本サービスにおける個人情報の取り扱いについて説明します。</p>
        </Section>

        <Section title="2. 収集する情報">
          <p>本サービスでは以下の情報を収集します。</p>
          <ul>
            <li><strong>アカウント情報：</strong>X（旧Twitter）認証を通じて取得するユーザーID・表示名・プロフィール画像URL・メールアドレス</li>
            <li><strong>投稿コンテンツ：</strong>Vライバープロフィール・音声ファイル・キャッチコピーなど、ユーザーが任意に投稿した情報</li>
            <li><strong>利用データ：</strong>お気に入り登録・スワイプ操作などのサービス利用状況</li>
            <li><strong>技術情報：</strong>IPアドレス・ブラウザ種別・アクセス日時などのログ情報</li>
          </ul>
        </Section>

        <Section title="3. 情報の利用目的">
          <ul>
            <li>本サービスの提供・運営・改善</li>
            <li>ユーザーサポート・お問い合わせへの対応</li>
            <li>不正利用の検知・防止</li>
            <li>本サービスに関する通知・お知らせの送信</li>
            <li>利用状況の分析（匿名・統計化した形で実施）</li>
          </ul>
        </Section>

        <Section title="4. 第三者への情報提供">
          <p>運営者は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。</p>
          <ul>
            <li>ユーザー本人の同意がある場合</li>
            <li>法令に基づく開示が必要な場合</li>
            <li>人の生命・身体・財産の保護のために緊急に必要な場合</li>
          </ul>
        </Section>

        <Section title="5. 委託先・外部サービス">
          <p>本サービスは以下の外部サービスを利用しており、それぞれのプライバシーポリシーが適用されます。</p>
          <ul>
            <li><strong>Supabase：</strong>データベース・認証・ストレージ（<a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">supabase.com/privacy</a>）</li>
            <li><strong>X（旧Twitter）：</strong>OAuth認証（<a href="https://twitter.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">twitter.com/privacy</a>）</li>
            <li><strong>Vercel：</strong>ホスティング（<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">vercel.com/legal/privacy-policy</a>）</li>
            <li><strong>Google AdSense：</strong>広告配信（<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">policies.google.com/privacy</a>）</li>
          </ul>
        </Section>

        <Section title="6. Cookie・広告について">
          <p>本サービスは Google AdSense を利用した広告を表示します。Google はCookieを使用してユーザーの興味に基づく広告を表示する場合があります。</p>
          <p>Googleによる広告Cookieの使用は、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Googleの広告設定</a>で無効にできます。また、<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">aboutads.info</a> からオプトアウトすることも可能です。</p>
        </Section>

        <Section title="7. 情報の保管・セキュリティ">
          <p>収集した情報はSupabaseのセキュアな環境に保存し、不正アクセス・漏洩・改ざん防止のための適切な対策を講じます。ただし、インターネット上の完全な安全性を保証するものではありません。</p>
        </Section>

        <Section title="8. データの削除">
          <p>アカウントの削除をご希望の場合は、下記お問い合わせ先までご連絡ください。関連するデータを速やかに削除します。</p>
        </Section>

        <Section title="9. 未成年者の個人情報">
          <p>13歳未満の方は本サービスをご利用いただけません。13歳未満の方の個人情報が収集されていることが判明した場合、速やかに削除します。</p>
        </Section>

        <Section title="10. ポリシーの変更">
          <p>本ポリシーは予告なく変更する場合があります。変更後に本サービスを継続利用した場合、変更後のポリシーに同意したとみなします。</p>
        </Section>

        <Section title="11. お問い合わせ">
          <p>個人情報の取り扱いに関するお問い合わせは、X（<a href="https://x.com/oshivox" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">@oshivox</a>）のDMまたはサービス内の通報機能よりご連絡ください。</p>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-sm font-black mb-2" style={{ color: '#111111' }}>{title}</h2>
      <div className="text-sm leading-relaxed space-y-2" style={{ color: '#555555' }}>
        {children}
      </div>
    </section>
  );
}
