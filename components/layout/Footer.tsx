import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '3rem 0 2rem',
        marginTop: '6rem',
      }}
    >
      <div className="aki-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* 브랜드 */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
                color: 'var(--charcoal)',
              }}
            >
              AKI
            </div>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '200px',
              }}
            >
              쌓이는 진. 글, 사람, 자료가
              호마다 축적되는 아카이브 웹진.
            </p>
          </div>

          {/* 섹션 링크 */}
          <div>
            <h4
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: '0.75rem',
              }}
            >
              섹션
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { href: '/prompt', label: 'Prompt' },
                { href: '/text', label: 'Text' },
                { href: '/people', label: 'People' },
                { href: '/vault', label: 'Vault' },
              ].map((item) => (
                <li key={item.href} style={{ marginBottom: '0.35rem' }}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      transition: 'color 0.15s',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 아카이브 */}
          <div>
            <h4
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: '0.75rem',
              }}
            >
              탐색
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { href: '/archive', label: 'Issue Archive' },
                { href: '/search', label: 'Search' },
                { href: '/about', label: 'About' },
              ].map((item) => (
                <li key={item.href} style={{ marginBottom: '0.35rem' }}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      transition: 'color 0.15s',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 가이드 */}
          <div>
            <h4
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: '0.75rem',
              }}
            >
              참여
            </h4>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}
            >
              AKI는 Markdown 기반으로
              운영됩니다. 글을 추가하려면
              GitHub을 통해 기여할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 하단 */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-light)',
              letterSpacing: '0.05em',
            }}
          >
            © {currentYear} AKI — Archive & Knowledge Index
          </p>
          <p
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-light)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            쌓이는 진 / ACCUMULATING ZINE
          </p>
        </div>
      </div>
    </footer>
  );
}
