'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',          label: 'Home',    en: 'HOME' },
  { href: '/prompt',   label: 'Prompt',  en: 'PROMPT' },
  { href: '/text',     label: 'Text',    en: 'TEXT' },
  { href: '/people',   label: 'People',  en: 'PEOPLE' },
  { href: '/vault',    label: 'Vault',   en: 'VAULT' },
  { href: '/archive',  label: 'Archive', en: 'ARCHIVE' },
  { href: '/about',    label: 'About',   en: 'ABOUT' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        borderBottom: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-primary)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="aki-container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '56px',
          }}
        >
          {/* 로고 */}
          <Link
            href="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.35rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'var(--charcoal)',
              }}
            >
              AKI
            </span>
            <span
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'var(--text-light)',
                textTransform: 'uppercase',
              }}
            >
              Archive & Knowledge Index
            </span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.1rem',
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.12em',
                    color: isActive ? 'var(--deep-green)' : 'var(--text-muted)',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    transition: 'color 0.15s',
                    borderBottom: isActive
                      ? '2px solid var(--deep-green)'
                      : '2px solid transparent',
                  }}
                >
                  {item.en}
                </Link>
              );
            })}
          </nav>

          {/* 우측 액션 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link
              href="/search"
              style={{
                padding: '0.4rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="검색"
            >
              <Search size={16} />
            </Link>

            {/* 모바일 메뉴 토글 */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              style={{
                padding: '0.4rem',
                color: 'var(--text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="메뉴"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-primary)',
            padding: '0.5rem 0',
          }}
          className="mobile-menu"
        >
          <div className="aki-container">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.65rem 0',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.1em',
                    color: isActive ? 'var(--deep-green)' : 'var(--text-secondary)',
                    borderBottom: '1px solid var(--border-light)',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.en}
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.7rem',
                      color: 'var(--text-light)',
                      fontWeight: 400,
                      textTransform: 'none',
                      letterSpacing: 0,
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}
