import { getAllIssues, getContentByIssue } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ContentCard from '@/components/cards/ContentCard';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ issue: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { issue } = await params;
  const issueNum = parseInt(issue, 10);
  const issues = getAllIssues();
  const found = issues.find((i) => i.number === issueNum);
  if (!found) return { title: '찾을 수 없음' };
  return { title: `AKI No.${found.number} — ${found.title}`, description: found.question };
}

export async function generateStaticParams() {
  const issues = getAllIssues();
  return issues.map((i) => ({ issue: String(i.number) }));
}

export default async function IssueDetailPage({ params }: Props) {
  const { issue } = await params;
  const issueNum = parseInt(issue, 10);
  const issues = getAllIssues();
  const currentIssue = issues.find((i) => i.number === issueNum);
  if (!currentIssue) notFound();

  const allContent = getContentByIssue(issueNum);
  const prompts = allContent.filter((c) => c.metadata.category === 'prompt');
  const texts = allContent.filter((c) => c.metadata.category === 'text');
  const people = allContent.filter((c) => c.metadata.category === 'people');
  const vault = allContent.filter((c) => c.metadata.category === 'vault');

  const prevIssue = issues.find((i) => i.number === issueNum - 1);
  const nextIssue = issues.find((i) => i.number === issueNum + 1);

  return (
    <div className="aki-fadein">
      {/* 네비게이션 */}
      <div style={{ borderBottom: '1px solid var(--border-light)', padding: '0.75rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="aki-container">
          <Link href="/archive" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <ArrowLeft size={12} />
            Archive
          </Link>
        </div>
      </div>

      {/* 이슈 헤더 */}
      <section style={{ backgroundColor: 'var(--charcoal)', color: 'var(--ivory)', padding: '4rem 0 3rem' }}>
        <div className="aki-container">
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--text-light)',
                textTransform: 'uppercase',
              }}>
                ISSUE ARCHIVE
              </span>
              {currentIssue.status === 'current' && (
                <span style={{
                  fontSize: '0.58rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--deep-green-light)',
                  padding: '0.15rem 0.45rem',
                  border: '1px solid var(--deep-green-light)',
                  borderRadius: '2px',
                }}>
                  현재 호
                </span>
              )}
            </div>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '4rem', fontWeight: 700, color: 'rgba(247,245,240,0.08)', lineHeight: 1, marginBottom: '-1.5rem', letterSpacing: '0.05em' }}>
              {String(issueNum).padStart(2, '0')}
            </p>

            <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ivory)', marginBottom: '1rem', lineHeight: 1.2 }}>
              {currentIssue.title}
            </h1>

            <blockquote style={{
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'var(--ivory-dark)',
              lineHeight: 1.7,
              borderLeft: '3px solid var(--deep-green)',
              paddingLeft: '1.25rem',
              marginBottom: '1rem',
              opacity: 0.9,
            }}>
              {currentIssue.question}
            </blockquote>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
              {currentIssue.date}
            </p>

            {/* 콘텐츠 요약 */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Text', count: texts.length, href: '/text' },
                { label: 'People', count: people.length, href: '/people' },
                { label: 'Vault', count: vault.length, href: '/vault' },
              ].map(({ label, count, href }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ivory)' }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 콘텐츠 섹션들 */}
      <div className="aki-container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>

        {/* Prompt */}
        {prompts.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              PROMPT
            </h2>
            {prompts.map((item) => (
              <ContentCard key={item.metadata.slug} metadata={item.metadata} variant="list" />
            ))}
          </section>
        )}

        {/* Text */}
        {texts.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              TEXT — {texts.length}편
            </h2>
            <div className="aki-grid-2">
              {texts.map((item) => (
                <ContentCard key={item.metadata.slug} metadata={item.metadata} variant="card" />
              ))}
            </div>
          </section>
        )}

        {/* People */}
        {people.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              PEOPLE — {people.length}명
            </h2>
            <div>
              {people.map((item) => (
                <ContentCard key={item.metadata.slug} metadata={item.metadata} variant="list" />
              ))}
            </div>
          </section>
        )}

        {/* Vault */}
        {vault.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
              VAULT — {vault.length}개
            </h2>
            <div>
              {vault.map((item) => (
                <ContentCard key={item.metadata.slug} metadata={item.metadata} variant="list" />
              ))}
            </div>
          </section>
        )}

        {/* 이전/다음 이슈 네비게이션 */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {prevIssue ? (
            <Link href={`/archive/${prevIssue.number}`} style={{ textDecoration: 'none' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>← 이전 호</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                AKI No.{prevIssue.number} — {prevIssue.title}
              </div>
            </Link>
          ) : <div />}
          {nextIssue && (
            <Link href={`/archive/${nextIssue.number}`} style={{ textDecoration: 'none', textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>다음 호 →</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                AKI No.{nextIssue.number} — {nextIssue.title}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
