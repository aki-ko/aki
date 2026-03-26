import { getContentBySlug, getAllContentByCategory, getRelatedContent } from '@/lib/content';
import { PromptMetadata } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ContentCard from '@/components/cards/ContentCard';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug('prompt', slug);
  if (!item) return { title: '찾을 수 없음' };
  const p = item.metadata as PromptMetadata;
  return {
    title: p.title,
    description: p.summary,
  };
}

export async function generateStaticParams() {
  const prompts = getAllContentByCategory('prompt');
  return prompts.map((p) => ({ slug: p.metadata.slug }));
}

export default async function PromptDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getContentBySlug('prompt', slug);
  if (!item) notFound();

  const p = item.metadata as PromptMetadata;
  const related = getRelatedContent(item, 4);

  // 이 호의 텍스트 글
  const issueTexts = getAllContentByCategory('text').filter(
    (t) => t.metadata.issue === p.issue
  );
  const issuePeople = getAllContentByCategory('people').filter(
    (t) => t.metadata.issue === p.issue
  );

  return (
    <div className="aki-fadein">
      {/* 네비게이션 */}
      <div
        style={{
          borderBottom: '1px solid var(--border-light)',
          padding: '0.75rem 0',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div className="aki-container">
          <Link
            href="/prompt"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            <ArrowLeft size={12} />
            Prompt
          </Link>
        </div>
      </div>

      {/* 히어로 */}
      <section
        style={{
          backgroundColor: 'var(--charcoal)',
          color: 'var(--ivory)',
          padding: '4rem 0',
        }}
      >
        <div className="aki-container">
          <div style={{ maxWidth: '680px' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--text-light)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              AKI No.{p.issue} — PROMPT
            </span>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
                color: 'var(--ivory)',
              }}
            >
              {p.title}
            </h1>
            <blockquote
              style={{
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: 'var(--ivory-dark)',
                lineHeight: 1.7,
                borderLeft: '3px solid var(--deep-green)',
                paddingLeft: '1.25rem',
                marginBottom: '1.25rem',
                opacity: 0.95,
              }}
            >
              {p.question}
            </blockquote>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {p.date}
              </span>
              {p.reading_time && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.72rem',
                    color: 'var(--text-light)',
                  }}
                >
                  <Clock size={12} />
                  {p.reading_time}분
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <div className="aki-container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
          }}
          className="prompt-layout"
        >
          {/* 메인 본문 */}
          <div style={{ maxWidth: '680px' }}>
            {/* 방향 소개 */}
            {p.direction && (
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--deep-green-pale)',
                  borderLeft: '3px solid var(--deep-green)',
                  marginBottom: '2rem',
                }}
              >
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                  }}
                >
                  {p.direction}
                </p>
              </div>
            )}

            {/* 마크다운 본문 */}
            <div
              className="aki-prose"
              dangerouslySetInnerHTML={{ __html: item.htmlContent || '' }}
            />

            {/* 태그 */}
            {p.tags.length > 0 && (
              <div
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                }}
              >
                {p.tags.map((tag) => (
                  <Link key={tag} href={`/search?tag=${tag}`}>
                    <span className="aki-tag">{tag}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 사이드바: 이 호의 콘텐츠 */}
          <div>
            {issueTexts.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-light)',
                    marginBottom: '0.75rem',
                    borderBottom: '1px solid var(--border-light)',
                    paddingBottom: '0.5rem',
                  }}
                >
                  이번 호의 글
                </h3>
                {issueTexts.map((t) => (
                  <ContentCard key={t.metadata.slug} metadata={t.metadata} variant="list" />
                ))}
                <Link
                  href="/text"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.72rem',
                    color: 'var(--deep-green)',
                    marginTop: '0.75rem',
                  }}
                >
                  전체 글 보기 <ArrowRight size={11} />
                </Link>
              </div>
            )}

            {issuePeople.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-light)',
                    marginBottom: '0.75rem',
                    borderBottom: '1px solid var(--border-light)',
                    paddingBottom: '0.5rem',
                  }}
                >
                  이번 호의 사람
                </h3>
                {issuePeople.map((t) => (
                  <ContentCard key={t.metadata.slug} metadata={t.metadata} variant="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 관련 콘텐츠 */}
      {related.length > 0 && (
        <section
          style={{
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-secondary)',
            padding: '2.5rem 0',
          }}
        >
          <div className="aki-container">
            <h2
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: '1rem',
              }}
            >
              관련 콘텐츠
            </h2>
            <div className="aki-grid-3">
              {related.map((r) => (
                <ContentCard key={r.metadata.slug} metadata={r.metadata} variant="card" />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .prompt-layout {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
