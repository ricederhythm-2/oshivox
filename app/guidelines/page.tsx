import AppHeader from '@/components/AppHeader';

export const metadata = { title: 'コンテンツガイドライン | OshiVox' };

export default function GuidelinesPage() {
  return (
    <div className="min-h-dvh" style={{ background: '#FFFFFF' }}>
      <AppHeader showBack />
      <main className="w-full max-w-[430px] mx-auto px-5 pt-6 pb-16">
        <h1 className="text-xl font-black mb-1" style={{ color: '#111111' }}>コンテンツガイドライン</h1>
        <p className="text-xs mb-8" style={{ color: '#AAAAAA' }}>最終更新：2026年3月3日</p>

        <p className="text-sm leading-relaxed mb-8" style={{ color: '#555555' }}>
          OshiVoxはVライバー・VTuberとリスナーが安心して交流できる場所を目指しています。以下のガイドラインを守ってご利用ください。
        </p>

        <Section title="✅ 投稿できる音声">
          <ul>
            <li>ご自身の声によるボイスサンプル（最大15秒）</li>
            <li>著作権をご自身または所属事務所が保有する楽曲・BGMを含む音声</li>
            <li>権利者から使用許諾を得た音声素材を含む音声</li>
          </ul>
        </Section>

        <Section title="❌ 投稿できない音声">
          <ul>
            <li>無断使用のBGM・SE・効果音を含む音声</li>
            <li>第三者の声を無断で含む音声</li>
            <li>誹謗中傷・差別的・脅迫的な内容</li>
            <li>過度に性的・暴力的な内容</li>
            <li>電話番号・住所などの個人情報を含む音声</li>
            <li>広告・宣伝目的のスパムコンテンツ</li>
          </ul>
        </Section>

        <Section title="🖼️ プロフィール画像">
          <ul>
            <li>ご自身のイラスト・写真、または使用許諾を得た画像</li>
            <li>第三者の権利を侵害しないもの</li>
            <li>公序良俗に反しないもの</li>
          </ul>
        </Section>

        <Section title="📝 キャッチコピー・プロフィール">
          <ul>
            <li>他者への誹謗中傷を含まないこと</li>
            <li>虚偽の情報を含まないこと</li>
            <li>第三者の著作物を無断引用しないこと</li>
          </ul>
        </Section>

        <Section title="⚠️ 違反した場合">
          <p>ガイドラインに違反するコンテンツは、予告なく削除する場合があります。悪質な場合はアカウントを停止することがあります。</p>
          <p className="mt-2">違反コンテンツを見かけた場合はご報告ください。コミュニティを守るためにご協力をお願いします。</p>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-sm font-black mb-2" style={{ color: '#111111' }}>{title}</h2>
      <div className="text-sm leading-relaxed space-y-1" style={{ color: '#555555' }}>
        {children}
      </div>
    </section>
  );
}
