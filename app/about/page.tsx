import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — AKI란 무엇인가',
  description: 'AKI는 미니멀한 아카이브 진입니다. 쌓이는 진.',
};

const SECTIONS = [
  {
    title: 'Prompt',
    desc: '이번 호의 중심 질문과 읽는 방향. 매 호는 하나의 질문에서 시작합니다.',
    href: '/prompt',
    badge: 'PROMPT',
  },
  {
    title: 'Text',
    desc: '에세이, 인터뷰, 리뷰, 노트, 발췌. AKI에 축적되는 모든 텍스트.',
    href: '/text',
    badge: 'TEXT',
  },
  {
    title: 'People',
    desc: '제작자, 필자, 협업자, 편집자. 이 진을 만드는 사람들.',
    href: '/people',
    badge: 'PEOPLE',
  },
  {
    title: 'Vault',
    desc: '이미지, PDF, 링크, 참고자료, 부록. 자료가 보관되는 공간.',
    href: '/vault',
    badge: 'VAULT',
  },
];

const PRINCIPLES = [
  { num: '01', title: '쌓이는 구조', desc: '한 번 발행하고 끝나는 것이 아닙니다. 글, 자료, 사람, 태그가 계속 연결되고 확장됩니다.' },
  { num: '02', title: '하나의 질문', desc: '매 호는 하나의 질문에서 시작합니다. 답을 제시하는 것이 아니라, 질문을 오래 붙들 수 있도록 합니다.' },
  { num: '03', title: 'Markdown 기반', desc: 'GitHub 저장소에서 Markdown 파일로 운영됩니다. 새 글 추가는 파일 하나를 만드는 것에서 시작합니다.' },
  { num: '04', title: '교차 탐색', desc: '태그, 이슈, 사람, 카테고리로 콘텐츠를 교차 탐색할 수 있습니다. 모든 것은 연결됩니다.' },
];

export default function AboutPage() {
  return (
    <div className="aki-fadein">
      {/* 헤더 */}
      <section style={{ padding: '3.5rem 0 2rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="aki-container">
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)' }}>
            ABOUT
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
            AKI란 무엇인가
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '560px', lineHeight: 1.75, fontStyle: 'italic' }}>
            AKI는 미니멀한 아카이브 진입니다.<br />
            읽는 진이 아니라, 쌓이는 진입니다.
          </p>
        </div>
      </section>

      <div className="aki-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>

        {/* 정체성 */}
        <section style={{ marginBottom: '4rem', maxWidth: '680px' }}>
          <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            정체성
          </h2>
          <div className="aki-prose">
            <p>
              AKI는 Archive & Knowledge Index의 약자입니다. 단순히 읽는 웹진이 아니라, 시간이 지날수록 글, 사람, 자료가 축적되는 구조를 가진 아카이브 진입니다.
            </p>
            <p>
              매 호마다 하나의 질문을 중심으로 구성됩니다. 에세이, 인터뷰, 리뷰, 노트가 그 질문을 여러 각도에서 탐색합니다. 참여자들의 프로필, 자료, 참고문헌이 함께 보관됩니다.
            </p>
            <p>
              한 번 발행하고 끝나는 것이 아닙니다. 이전 호의 글이 새 호와 태그로 연결됩니다. 자료가 누적됩니다. 사람이 쌓입니다. AKI는 이 축적의 과정 자체가 콘텐츠입니다.
            </p>
          </div>
        </section>

        {/* 원칙 */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            운영 원칙
          </h2>
          <div className="aki-grid-2">
            {PRINCIPLES.map(({ num, title, desc }) => (
              <div
                key={num}
                style={{ padding: '1.5rem', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-card)' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-light)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                  {num}
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '0.5rem' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4개 섹션 안내 */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            구조
          </h2>
          <div className="aki-grid-2">
            {SECTIONS.map(({ title, desc, href, badge }) => (
              <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                <div
                  className="aki-card"
                  style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                >
                  <span className={`aki-badge aki-badge-${badge.toLowerCase()}`} style={{ alignSelf: 'flex-start' }}>
                    {badge}
                  </span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
                    {desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--deep-green)', marginTop: '0.25rem' }}>
                    보기 <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 기술 구조 */}
        <section style={{ marginBottom: '4rem', maxWidth: '680px' }}>
          <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            기술 구조
          </h2>
          <div className="aki-prose">
            <p>
              AKI는 GitHub 저장소 기반으로 운영됩니다. 모든 콘텐츠는 Markdown 파일로 관리되며, Front Matter 메타데이터로 구조화됩니다.
            </p>
            <ul>
              <li><strong>프레임워크:</strong> Next.js (App Router, TypeScript)</li>
              <li><strong>스타일:</strong> Tailwind CSS + CSS 변수</li>
              <li><strong>콘텐츠:</strong> Markdown + gray-matter</li>
              <li><strong>검색:</strong> Fuse.js (클라이언트 사이드)</li>
              <li><strong>배포:</strong> Vercel / GitHub Pages</li>
            </ul>
            <p>
              새 글을 추가하는 방법은 간단합니다. <code>content/text/</code> 폴더에 Markdown 파일을 하나 만들고, Front Matter 메타데이터를 채우면 됩니다. 자세한 방법은 보관함의 「AKI 글 추가 가이드」를 참고하세요.
            </p>
          </div>
          <Link
            href="/vault/aki-archive-guide"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1rem',
              marginTop: '1rem',
              border: '1px solid var(--border-mid)',
              borderRadius: '2px',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            글 추가 가이드 보기
            <ArrowRight size={13} />
          </Link>
        </section>

        {/* 디자인 원칙 */}
        <section style={{ maxWidth: '680px' }}>
          <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
            디자인 원칙
          </h2>
          <div className="aki-prose">
            <p>
              AKI의 디자인은 절제되어 있습니다. 아이보리 배경, 차콜 텍스트, 딥 그린 포인트. 타이포그래피와 여백, 구분선, 태그, 메타데이터로 구조감을 만듭니다.
            </p>
            <p>
              예쁘기보다 읽기 쉽고 정리되어 있어야 합니다. 편집된 자료집처럼. 정보성이 강하되, 건조하지 않게.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
