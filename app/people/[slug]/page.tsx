import { getContentBySlug, getAllContentByCategory, filterContent } from '@/lib/content';
import { PeopleMetadata } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ContentCard from '@/components/cards/ContentCard';
import { ArrowLeft, Globe, AtSign, Mail, ExternalLink, User } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug('people', slug);
  if (!item) return { title: '찾을 수 없음' };
  const p = item.metadata as PeopleMetadata;
  return { title: p.title, description: p.bio };
}

export async function generateStaticParams() {
  const people = getAllContentByCategory('people');
  return people.map((p) => ({ slug: p.metadata.slug }));
}

export default async function PeopleDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getContentBySlug('people', slug);
  if (!item) notFound();

  const p = item.metadata as PeopleMetadata;

  // 이 사람의 관련 글
  const relatedTexts = filterContent(getAllContentByCategory('text'), {
    author: p.title,
  });

  // 같은 이슈의 다른 사람들
  const sameIssue = getAllContentByCategory('people').filter(
    (i) => i.metadata.issue === p.issue && i.metadata.slug !== p.slug
  );

  return (
    <div className="aki-fadein">
      {/* 네비게이션 */}
      <div style={{ borderBottom: '1px solid var(--border-light)', padding: '0.75rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="aki-container">
          <Link href="/people" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <ArrowLeft size={12} />
            People
          </Link>
        </div>
      </div>

      {/* 프로필 헤더 */}
      <header style={{ padding: '3.5rem 0 2.5rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="aki-container">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
            {/* 아바타 */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--ivory-dark)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <User size={32} color="var(--text-light)" />
            </div>

            {/* 정보 */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <span className="aki-badge aki-badge-people">PEOPLE</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-light)' }}>
                  AKI No.{p.issue}
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '0.4rem' }}>
                {p.title}
              </h1>

              <p style={{ fontSize: '0.85rem', color: 'var(--deep-green)', fontWeight: 500, marginBottom: '0.75rem' }}>
                {p.role}
              </p>

              {p.origin && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                  {p.origin} 기반
                </p>
              )}

              {/* 링크 */}
              {p.links && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {p.links.website && (
                    <a href={p.links.website} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.3rem 0.6rem', border: '1px solid var(--border-light)', borderRadius: '2px' }}>
                      <Globe size={12} /> 웹사이트
                    </a>
                  )}
                  {p.links.instagram && (
                    <a href={`https://instagram.com/${p.links.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.3rem 0.6rem', border: '1px solid var(--border-light)', borderRadius: '2px' }}>
                      <AtSign size={12} /> {p.links.instagram}
                    </a>
                  )}
                  {p.links.email && (
                    <a href={`mailto:${p.links.email}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.3rem 0.6rem', border: '1px solid var(--border-light)', borderRadius: '2px' }}>
                      <Mail size={12} /> 이메일
                    </a>
                  )}
                  {p.links.other && (
                    <a href={p.links.other} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.3rem 0.6rem', border: '1px solid var(--border-light)', borderRadius: '2px' }}>
                      <ExternalLink size={12} /> 기타
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <div className="aki-container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        <div className="people-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* 소개 본문 */}
          <div>
            {/* 약력 */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.75rem' }}>
                소개
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {p.bio}
              </p>
            </div>

            {/* 마크다운 본문 */}
            {item.htmlContent && (
              <div className="aki-prose" dangerouslySetInnerHTML={{ __html: item.htmlContent }} />
            )}

            {/* 태그 */}
            {p.tags.length > 0 && (
              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {p.tags.map((tag) => (
                  <Link key={tag} href={`/search?tag=${tag}`}>
                    <span className="aki-tag">{tag}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 사이드 */}
          <div>
            {/* 이 사람의 글 */}
            {relatedTexts.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  기고 글
                </h3>
                {relatedTexts.map((t) => (
                  <ContentCard key={t.metadata.slug} metadata={t.metadata} variant="list" />
                ))}
              </div>
            )}

            {/* 같은 호의 사람들 */}
            {sameIssue.length > 0 && (
              <div>
                <h3 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  같은 호 참여자
                </h3>
                {sameIssue.map((i) => (
                  <ContentCard key={i.metadata.slug} metadata={i.metadata} variant="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .people-layout { grid-template-columns: 2fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
