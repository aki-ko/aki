import { getContentBySlug, getAllContentByCategory, getRelatedContent } from '@/lib/content';
import { TextMetadata } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ContentCard from '@/components/cards/ContentCard';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug('text', slug);
  if (!item) return { title: '찾을 수 없음' };
  return {
    title: item.metadata.title,
    description: item.metadata.summary,
  };
}

export async function generateStaticParams() {
  const texts = getAllContentByCategory('text');
  return texts.map((t) => ({ slug: t.metadata.slug }));
}

const SUBCAT_LABELS: Record<string, string> = {
  essay: '에세이',
  interview: '인터뷰',
  review: '리뷰',
  note: '노트',
  excerpt: '발췌',
  critique: '비평',
  dispatch: '통신',
};

export default async function TextDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getContentBySlug('text', slug);
  if (!item) notFound();

  const t = item.metadata as TextMetadata;
  const related = getRelatedContent(item, 3);

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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            <Link href="/text" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ArrowLeft size={12} />
              Text
            </Link>
            <span style={{ color: 'var(--border-mid)' }}>·</span>
            <span style={{ color: 'var(--text-light)' }}>
              {SUBCAT_LABELS[t.subcategory] || t.subcategory}
            </span>
          </div>
        </div>
      </div>

      {/* 아티클 헤더 */}
      <header
        style={{
          padding: '3.5rem 0 2.5rem',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="aki-container">
          <div style={{ maxWidth: '700px' }}>
            {/* 메타 정보 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              <span className="aki-badge aki-badge-text">TEXT</span>
              <span
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-light)',
                  padding: '0.15rem 0.45rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: '2px',
                }}
              >
                {SUBCAT_LABELS[t.subcategory] || t.subcategory}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-light)',
                }}
              >
                AKI No.{t.issue}
              </span>
            </div>

            {/* 제목 */}
            <h1
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: 'var(--charcoal)',
                marginBottom: '1rem',
              }}
            >
              {t.title}
            </h1>

            {/* 발췌문 */}
            {t.excerpt && (
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '1.25rem',
                  borderLeft: '3px solid var(--deep-green)',
                  paddingLeft: '1rem',
                }}
              >
                {t.excerpt}
              </p>
            )}

            {/* 저자/날짜/읽기시간 */}
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                <User size={13} />
                {t.author}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {t.date}
              </span>
              {t.reading_time && (
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
                  {t.reading_time}분
                </span>
              )}
              {t.source && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-light)',
                    padding: '0.1rem 0.4rem',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px',
                  }}
                >
                  {t.source}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <div className="aki-container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div
          className="text-article-layout"
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}
        >
          {/* 아티클 본문 */}
          <article>
            <div
              className="aki-prose"
              style={{ maxWidth: '680px' }}
              dangerouslySetInnerHTML={{ __html: item.htmlContent || '' }}
            />

            {/* 출처/인용 */}
            {(t.citation || t.source) && (
              <div
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '0.75rem',
                  color: 'var(--text-light)',
                }}
              >
                {t.citation && <p>인용: {t.citation}</p>}
              </div>
            )}

            {/* 태그 */}
            {t.tags.length > 0 && (
              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-light)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.6rem',
                    fontSize: '0.68rem',
                    color: 'var(--text-light)',
                  }}
                >
                  <Tag size={11} />
                  태그
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {t.tags.map((tag) => (
                    <Link key={tag} href={`/search?tag=${tag}`}>
                      <span className="aki-tag">{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* 사이드바 */}
          <aside>
            {/* 이슈 정보 */}
            <div
              style={{
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-light)',
                  marginBottom: '0.5rem',
                }}
              >
                이 글이 실린 호
              </p>
              <Link
                href={`/archive/${t.issue}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--charcoal)',
                  }}
                >
                  AKI No.{t.issue}
                </span>
              </Link>
            </div>
          </aside>
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
              함께 읽기
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
          .text-article-layout {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
