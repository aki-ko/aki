import { getAllIssues, getContentByIssue } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive — 이슈 아카이브',
  description: 'AKI의 모든 호가 축적되는 아카이브.',
};

export default function ArchivePage() {
  const issues = getAllIssues();

  return (
    <div className="aki-fadein">
      {/* 헤더 */}
      <section style={{ padding: '3.5rem 0 2rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="aki-container">
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)' }}>
            SECTION / ARCHIVE
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
            Issue Archive
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            AKI의 모든 호가 이곳에 쌓입니다. 각 호는 하나의 질문을 중심으로 구성됩니다.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--deep-green)' }}>
              총 {issues.length}호
            </span>
          </div>
        </div>
      </section>

      <div className="aki-container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        {issues.map((issue) => {
          const contents = getContentByIssue(issue.number);
          const textCount = contents.filter((c) => c.metadata.category === 'text').length;
          const peopleCount = contents.filter((c) => c.metadata.category === 'people').length;
          const vaultCount = contents.filter((c) => c.metadata.category === 'vault').length;

          return (
            <Link
              key={issue.number}
              href={`/archive/${issue.number}`}
              style={{ textDecoration: 'none' }}
            >
              <article
                style={{
                  borderBottom: '1px solid var(--border-light)',
                  padding: '2rem 0',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1rem',
                  transition: 'background-color 0.15s',
                }}
                className="archive-row"
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                  {/* 번호 */}
                  <div style={{ flexShrink: 0, textAlign: 'center', width: '60px' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: issue.status === 'current' ? 'var(--deep-green)' : 'var(--border-mid)',
                      lineHeight: 1,
                      marginBottom: '0.25rem',
                    }}>
                      {String(issue.number).padStart(2, '0')}
                    </div>
                    {issue.status === 'current' && (
                      <span style={{
                        fontSize: '0.55rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--deep-green)',
                        backgroundColor: 'var(--deep-green-pale)',
                        padding: '0.1rem 0.3rem',
                        borderRadius: '2px',
                      }}>
                        현재
                      </span>
                    )}
                  </div>

                  {/* 정보 */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem', letterSpacing: '0.08em' }}>
                      {issue.date}
                    </p>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--charcoal)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                      {issue.title}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1rem' }}>
                      &ldquo;{issue.question}&rdquo;
                    </p>
                    {/* 콘텐츠 통계 */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Text', count: textCount },
                        { label: 'People', count: peopleCount },
                        { label: 'Vault', count: vaultCount },
                      ].map(({ label, count }) => count > 0 ? (
                        <span key={label} style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{count}</span> {label}
                        </span>
                      ) : null)}
                    </div>
                  </div>

                  {/* 화살표 */}
                  <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-light)' }}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <style>{`
        .archive-row:hover { background-color: var(--ivory-mid); padding-left: 0.5rem; padding-right: 0.5rem; margin: 0 -0.5rem; }
      `}</style>
    </div>
  );
}
