import { getContentBySlug, getAllContentByCategory, getRelatedContent } from '@/lib/content';
import { VaultMetadata } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ContentCard from '@/components/cards/ContentCard';
import { ArrowLeft, Download, ExternalLink, Tag } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug('vault', slug);
  if (!item) return { title: '찾을 수 없음' };
  return { title: item.metadata.title, description: item.metadata.summary };
}

export async function generateStaticParams() {
  const vault = getAllContentByCategory('vault');
  return vault.map((v) => ({ slug: v.metadata.slug }));
}

const FILE_TYPE_LABELS: Record<string, string> = {
  pdf: 'PDF', link: '링크', image: '이미지', download: '다운로드', reference: '참고문헌', appendix: '부록',
};

export default async function VaultDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getContentBySlug('vault', slug);
  if (!item) notFound();

  const v = item.metadata as VaultMetadata;
  const related = getRelatedContent(item, 3);

  return (
    <div className="aki-fadein">
      {/* 네비게이션 */}
      <div style={{ borderBottom: '1px solid var(--border-light)', padding: '0.75rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="aki-container">
          <Link href="/vault" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <ArrowLeft size={12} />
            Vault
          </Link>
        </div>
      </div>

      {/* 헤더 */}
      <header style={{ padding: '3rem 0 2rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="aki-container">
          <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="aki-badge aki-badge-vault">VAULT</span>
              <span style={{
                fontSize: '0.68rem',
                color: 'var(--deep-green)',
                padding: '0.15rem 0.45rem',
                backgroundColor: 'var(--deep-green-pale)',
                borderRadius: '2px',
              }}>
                {FILE_TYPE_LABELS[v.file_type] || v.file_type}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-light)' }}>
                AKI No.{v.issue}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
              {v.title}
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
              {v.summary}
            </p>

            {/* 액션 버튼 */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {v.download_url && (
                <a
                  href={v.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 1rem',
                    backgroundColor: 'var(--charcoal)',
                    color: 'var(--ivory)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    borderRadius: '2px',
                    textDecoration: 'none',
                  }}
                >
                  <Download size={13} />
                  다운로드
                </a>
              )}
              {v.file_type === 'link' && (
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 1rem',
                    border: '1px solid var(--border-mid)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    borderRadius: '2px',
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={13} />
                  원문 보기
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메타 정보 */}
      <div style={{ borderBottom: '1px solid var(--border-light)', padding: '1rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="aki-container">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {v.credit && (
              <div>
                <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.2rem' }}>출처</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{v.credit}</span>
              </div>
            )}
            {v.origin && (
              <div>
                <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.2rem' }}>원본</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{v.origin}</span>
              </div>
            )}
            {v.usage_note && (
              <div>
                <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.2rem' }}>사용 안내</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{v.usage_note}</span>
              </div>
            )}
            <div>
              <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', display: 'block', marginBottom: '0.2rem' }}>등록일</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{v.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="aki-container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        <div style={{ maxWidth: '700px' }}>
          <div className="aki-prose" dangerouslySetInnerHTML={{ __html: item.htmlContent || '' }} />

          {/* 태그 */}
          {v.tags.length > 0 && (
            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.68rem', color: 'var(--text-light)' }}>
                <Tag size={11} /> 태그
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {v.tags.map((tag) => (
                  <Link key={tag} href={`/search?tag=${tag}`}>
                    <span className="aki-tag">{tag}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 관련 콘텐츠 */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)', padding: '2.5rem 0' }}>
          <div className="aki-container">
            <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1rem' }}>
              관련 자료
            </h2>
            <div className="aki-grid-3">
              {related.map((r) => (
                <ContentCard key={r.metadata.slug} metadata={r.metadata} variant="card" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
