import AppHeader from '@/components/AppHeader';

export const metadata = { title: '利用規約 | OshiVox' };

export default function TermsPage() {
  return (
    <div className="min-h-dvh" style={{ background: '#FFFFFF' }}>
      <AppHeader showBack />
      <main className="w-full max-w-[430px] mx-auto px-5 pt-6 pb-16">
        <h1 className="text-xl font-black mb-1" style={{ color: '#111111' }}>利用規約</h1>
        <p className="text-xs mb-8" style={{ color: '#AAAAAA' }}>最終更新：2026年3月3日</p>

        <Section title="第1条　サービスの概要">
          <p>OshiVox（以下「本サービス」）は、Vライバー・VTuberとリスナーが声を通じてつながるファンマッチングサービスです。本規約に同意のうえご利用ください。</p>
        </Section>

        <Section title="第2条　利用資格">
          <p>本サービスは13歳以上を対象とします。未成年の方は保護者の同意を得たうえでご利用ください。</p>
        </Section>

        <Section title="第3条　アカウント">
          <p>本サービスの利用にはXアカウントによる認証が必要です。アカウントの管理はご自身の責任で行ってください。第三者への譲渡・貸与は禁止します。</p>
        </Section>

        <Section title="第4条　禁止事項">
          <ul>
            <li>他者へのなりすまし</li>
            <li>誹謗中傷・ハラスメント・差別的表現</li>
            <li>著作権・肖像権など第三者の権利を侵害するコンテンツの投稿</li>
            <li>無断使用のBGM・SE・第三者の声を含む音声の投稿</li>
            <li>性的・暴力的・反社会的なコンテンツの投稿</li>
            <li>スパム・フィッシング・不正アクセス行為</li>
            <li>本サービスの運営を妨げる行為</li>
          </ul>
        </Section>

        <Section title="第5条　コンテンツの権利">
          <p>投稿したコンテンツの著作権は投稿者に帰属します。投稿者は運営者に対し、サービスの運営・改善・プロモーションを目的としたコンテンツの利用を無償で許諾するものとします。</p>
        </Section>

        <Section title="第6条　免責事項">
          <p>運営者は、本サービスの利用により生じた損害について、運営者の故意または重過失がある場合を除き、責任を負いません。ユーザー間のトラブルについては当事者間で解決してください。</p>
        </Section>

        <Section title="第7条　サービスの変更・中断・終了">
          <p>運営者は、事前の通知なく本サービスの内容変更、一時中断、または終了を行う場合があります。これにより生じた損害について責任を負いません。</p>
        </Section>

        <Section title="第8条　規約の変更">
          <p>運営者は本規約を随時変更できるものとします。変更後に本サービスを継続利用した場合、変更後の規約に同意したとみなします。</p>
        </Section>

        <Section title="第9条　準拠法・管轄">
          <p>本規約は日本法に準拠します。紛争が生じた場合は東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
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
