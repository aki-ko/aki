import Link from 'next/link';
import { getAllIssues, getAllContentByCategory, filterContent } from '@/lib/content';
import ContentCard from '@/components/cards/ContentCard';
import { ArrowRight, Archive } from 'lucide-react';

export default async function HomePage() {
  const issues = getAllIssues();
  const currentIssue = issues.find((i) => i.status === 'current') || issues[0];

  // 카테고리별 최신 콘텐츠
  const featuredTexts = filterContent(getAllContentByCategory('text'), { featured: true }).slice(0, 3);
  const recentTexts = getAllContentByCategory('text').slice(0, 6);
  const featuredPeople = getAllContentByCategory('people').slice(0, 3);
  const recentVault = getAllContentByCategory('vault').slice(0, 3);

  return (
    <div className="aki-fadein">
      {/* ========================================================
          히어로: 현재 호 프롬프트
          ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--charcoal)',
          color: 'var(--ivory)',
          padding: '5rem 0 4rem',
        }}
      >
        <div className="aki-container">
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: 'var(--text-light)',
                  textTransform: 'uppercase',
                }}
              >
                현재 호
              </span>
              {currentIssue && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    color: 'var(--deep-green-light)',
                    padding: '0.15rem 0.5rem',
                    border: '1px solid var(--deep-green-light)',
                    borderRadius: '2px',
                  }}
                >
                  AKI No.{currentIssue.number}
                </span>
              )}
            </div>

            {currentIssue ? (
              <>
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
                  {currentIssue.title}
                </h1>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--ivory-dark)',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem',
                    fontStyle: 'italic',
                    opacity: 0.9,
                  }}
                >
                  &ldquo;{currentIssue.question}&rdquo;
                </p>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-light)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '2.5rem',
                  }}
                >
                  {currentIssue.date}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {currentIssue.prompt_slug && (
                    <Link
                      href={`/prompt/${currentIssue.prompt_slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.65rem 1.25rem',
                        backgroundColor: 'var(--deep-green)',
                        color: 'var(--ivory)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        borderRadius: '2px',
                        textDecoration: 'none',
                        transition: 'background-color 0.15s',
                      }}
                    >
                      이번 호 읽기
                      <ArrowRight size={14} />
                    </Link>
                  )}
                  <Link
                    href="/archive"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.65rem 1.25rem',
                      border: '1px solid rgba(247,245,240,0.3)',
                      color: 'var(--ivory)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.05em',
                      borderRadius: '2px',
                      textDecoration: 'none',
                    }}
                  >
                    <Archive size={14} />
                    아카이브 보기
                  </Link>
                </div>
              </>
            ) : (
              <h1
                style={{
                  fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--ivory)',
                }}
              >
                AKI — 쌓이는 진
              </h1>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          AKI 소개 스트립
          ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--deep-green-pale)',
          borderBottom: '1px solid var(--border-light)',
          padding: '1rem 0',
        }}
      >
        <div className="aki-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontSize: '0.78rem',
                color: 'var(--deep-green)',
                letterSpacing: '0.03em',
              }}
            >
              AKI는 <strong>읽는 진</strong>이 아니라 <strong>쌓이는 진</strong>입니다. 매 호마다 하나의 질문을 중심으로 글, 사람, 자료가 축적됩니다.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: '총 호수', value: `${issues.length}호` },
                { label: '총 글', value: `${recentTexts.length}편` },
                { label: '참여자', value: `${featuredPeople.length}명` },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--deep-green)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          주요 텍스트 (피처드)
          ======================================================== */}
      {featuredTexts.length > 0 && (
        <section style={{ padding: '4rem 0 2rem' }}>
          <div className="aki-container">
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '0.75rem',
              }}
            >
              <h2
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                주요 글
              </h2>
              <Link
                href="/text"
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--deep-green)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                전체 보기 <ArrowRight size={11} />
              </Link>
            </div>
            <div className="aki-grid-3">
              {featuredTexts.map((item) => (
                <ContentCard
                  key={item.metadata.slug}
                  metadata={item.metadata}
                  variant="card"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          최신 글 리스트
          ======================================================== */}
      <section style={{ padding: '2rem 0' }}>
        <div className="aki-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '0.75rem',
            }}
          >
            <h2
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              최신 글
            </h2>
            <Link
              href="/text"
              style={{
                fontSize: '0.7rem',
                color: 'var(--deep-green)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              전체 보기 <ArrowRight size={11} />
            </Link>
          </div>
          <div>
            {recentTexts.map((item) => (
              <ContentCard
                key={item.metadata.slug}
                metadata={item.metadata}
                variant="list"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          People + Vault 2단 구성
          ======================================================== */}
      <section
        style={{
          padding: '3rem 0',
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="aki-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
            }}
            className="home-two-col"
          >
            {/* 사람 */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '0.75rem',
                }}
              >
                <h2
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  사람
                </h2>
                <Link
                  href="/people"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--deep-green)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  전체 보기 <ArrowRight size={11} />
                </Link>
              </div>
              {featuredPeople.map((item) => (
                <ContentCard
                  key={item.metadata.slug}
                  metadata={item.metadata}
                  variant="list"
                />
              ))}
            </div>

            {/* 보관함 */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '0.75rem',
                }}
              >
                <h2
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  보관함
                </h2>
                <Link
                  href="/vault"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--deep-green)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  전체 보기 <ArrowRight size={11} />
                </Link>
              </div>
              {recentVault.map((item) => (
                <ContentCard
                  key={item.metadata.slug}
                  metadata={item.metadata}
                  variant="list"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          이슈 아카이브 미리보기
          ======================================================== */}
      {issues.length > 1 && (
        <section style={{ padding: '3rem 0' }}>
          <div className="aki-container">
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '0.75rem',
              }}
            >
              <h2
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                이슈 아카이브
              </h2>
              <Link
                href="/archive"
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--deep-green)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                전체 보기 <ArrowRight size={11} />
              </Link>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1rem',
              }}
            >
              {issues.map((issue) => (
                <Link
                  key={issue.number}
                  href={`/archive/${issue.number}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="aki-card"
                    style={{
                      padding: '1.25rem',
                      borderLeft: issue.status === 'current' ? '3px solid var(--deep-green)' : '1px solid var(--border-light)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--text-light)',
                          letterSpacing: '0.1em',
                        }}
                      >
                        No.{issue.number}
                      </span>
                      {issue.status === 'current' && (
                        <span
                          style={{
                            fontSize: '0.58rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--deep-green)',
                            backgroundColor: 'var(--deep-green-pale)',
                            padding: '0.1rem 0.35rem',
                            borderRadius: '2px',
                          }}
                        >
                          현재
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--charcoal)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {issue.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                      }}
                    >
                      &ldquo;{issue.question.slice(0, 50)}...&rdquo;
                    </p>
                    <p
                      style={{
                        fontSize: '0.65rem',
                        color: 'var(--text-light)',
                        fontFamily: 'var(--font-mono)',
                        marginTop: '0.75rem',
                      }}
                    >
                      {issue.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (min-width: 768px) {
          .home-two-col {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
