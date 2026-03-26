import { getAllContentByCategory, getAllIssues } from '@/lib/content';
import { PromptMetadata } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompt — 이번 호의 질문',
  description: 'AKI 매 호의 중심 질문과 읽는 방향을 안내합니다.',
};

export default function PromptPage() {
  const prompts = getAllContentByCategory('prompt');
  const issues = getAllIssues();
  const currentIssue = issues.find((i) => i.status === 'current');

  return (
    <div className="aki-fadein">
      {/* 페이지 헤더 */}
      <section
        style={{
          padding: '3.5rem 0 2rem',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="aki-container">
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              marginBottom: '0.6rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            SECTION / PROMPT
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              marginBottom: '0.75rem',
            }}
          >
            Prompt
          </h1>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              maxWidth: '520px',
              lineHeight: 1.7,
            }}
          >
            AKI는 매 호마다 하나의 질문에서 시작합니다. 프롬프트는 그 질문과 이번 호를 읽는 방향을 안내합니다.
          </p>
        </div>
      </section>

      <div className="aki-container" style={{ paddingTop: '2.5rem' }}>
        {/* 현재 호 하이라이트 */}
        {currentIssue && prompts.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
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
              현재 호
            </h2>
            {prompts
              .filter((p) => (p.metadata as PromptMetadata).issue === currentIssue.number)
              .map((item) => {
                const p = item.metadata as PromptMetadata;
                return (
                  <Link
                    key={p.slug}
                    href={`/prompt/${p.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        padding: '2.5rem',
                        backgroundColor: 'var(--charcoal)',
                        color: 'var(--ivory)',
                        borderRadius: '2px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '1.5rem',
                          right: '1.5rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '3rem',
                          fontWeight: 700,
                          color: 'rgba(247,245,240,0.06)',
                          letterSpacing: '0.1em',
                        }}
                      >
                        No.{p.issue}
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.6rem',
                          fontWeight: 600,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          padding: '0.2rem 0.55rem',
                          border: '1px solid var(--deep-green-light)',
                          color: 'var(--deep-green-light)',
                          borderRadius: '2px',
                          marginBottom: '1.25rem',
                        }}
                      >
                        AKI No.{p.issue} — 현재 호
                      </span>
                      <h3
                        style={{
                          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          marginBottom: '1rem',
                          color: 'var(--ivory)',
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '1rem',
                          fontStyle: 'italic',
                          color: 'var(--ivory-dark)',
                          lineHeight: 1.7,
                          marginBottom: '0.5rem',
                          opacity: 0.9,
                        }}
                      >
                        &ldquo;{p.question}&rdquo;
                      </p>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-light)',
                          marginBottom: '1.5rem',
                        }}
                      >
                        {p.summary}
                      </p>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.78rem',
                          color: 'var(--deep-green-light)',
                          fontWeight: 500,
                        }}
                      >
                        읽기 <ArrowRight size={13} />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}

        {/* 지난 호 프롬프트 목록 */}
        {prompts.filter((p) => (p.metadata as PromptMetadata).issue !== currentIssue?.number).length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '0.75rem',
              }}
            >
              지난 호
            </h2>
            <div className="aki-grid-2">
              {prompts
                .filter((p) => (p.metadata as PromptMetadata).issue !== currentIssue?.number)
                .map((item) => {
                  const p = item.metadata as PromptMetadata;
                  return (
                    <Link
                      key={p.slug}
                      href={`/prompt/${p.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="aki-card"
                        style={{ padding: '1.5rem', height: '100%' }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--text-light)',
                            letterSpacing: '0.1em',
                            display: 'block',
                            marginBottom: '0.5rem',
                          }}
                        >
                          No.{p.issue} · {p.date}
                        </span>
                        <h3
                          style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'var(--charcoal)',
                            marginBottom: '0.6rem',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {p.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            fontStyle: 'italic',
                            lineHeight: 1.6,
                            marginBottom: '0.75rem',
                          }}
                        >
                          &ldquo;{p.question}&rdquo;
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {p.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="aki-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
