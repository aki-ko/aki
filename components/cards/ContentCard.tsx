import Link from 'next/link';
import { AnyMetadata, Category } from '@/lib/types';
import { Clock, User } from 'lucide-react';

interface ContentCardProps {
  metadata: AnyMetadata;
  variant?: 'card' | 'list' | 'featured';
}

const CATEGORY_LABELS: Record<Category, string> = {
  prompt: 'PROMPT',
  text: 'TEXT',
  people: 'PEOPLE',
  vault: 'VAULT',
};

const CATEGORY_PATHS: Record<Category, string> = {
  prompt: '/prompt',
  text: '/text',
  people: '/people',
  vault: '/vault',
};

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={`aki-badge aki-badge-${category}`}>
      {CATEGORY_LABELS[category]}
    </span>
  );
}

// ============================================================
// 카드 형태 (탐색용)
// ============================================================
function CardVariant({ metadata }: { metadata: AnyMetadata }) {
  const href = `${CATEGORY_PATHS[metadata.category]}/${metadata.slug}`;

  return (
    <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
      <article
        className="aki-card"
        style={{
          padding: '1.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {/* 상단: 배지 + 날짜 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CategoryBadge category={metadata.category} />
          <span
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-light)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {metadata.date}
          </span>
        </div>

        {/* 제목 */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.4,
            color: 'var(--charcoal)',
            letterSpacing: '-0.01em',
          }}
        >
          {metadata.title}
        </h3>

        {/* 요약 */}
        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {metadata.summary}
        </p>

        {/* 하단: 저자 + 읽기 시간 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.7rem',
              color: 'var(--text-light)',
            }}
          >
            <User size={11} />
            {metadata.author}
          </span>
          {metadata.reading_time && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.7rem',
                color: 'var(--text-light)',
              }}
            >
              <Clock size={11} />
              {metadata.reading_time}분
            </span>
          )}
        </div>

        {/* 태그 */}
        {metadata.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {metadata.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="aki-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}

// ============================================================
// 리스트 형태 (검색/정리용)
// ============================================================
function ListVariant({ metadata }: { metadata: AnyMetadata }) {
  const href = `${CATEGORY_PATHS[metadata.category]}/${metadata.slug}`;

  return (
    <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
      <article
        className="aki-list-item"
        style={{
          padding: '1rem 0',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'start',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CategoryBadge category={metadata.category} />
            <span
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-light)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              No.{metadata.issue}
            </span>
          </div>
          <h3
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--charcoal)',
              lineHeight: 1.4,
            }}
          >
            {metadata.title}
          </h3>
          <p
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            {metadata.summary}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.25rem' }}>
            {metadata.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="aki-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.3rem',
            minWidth: '80px',
          }}
        >
          <span
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-light)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {metadata.date}
          </span>
          <span
            style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}
          >
            {metadata.author}
          </span>
        </div>
      </article>
    </Link>
  );
}

// ============================================================
// 피처드 형태 (홈 히어로용)
// ============================================================
function FeaturedVariant({ metadata }: { metadata: AnyMetadata }) {
  const href = `${CATEGORY_PATHS[metadata.category]}/${metadata.slug}`;

  return (
    <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
      <article
        style={{
          padding: '2rem',
          borderLeft: '3px solid var(--deep-green)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderLeftWidth: '3px',
          borderLeftColor: 'var(--deep-green)',
          transition: 'box-shadow 0.2s',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <CategoryBadge category={metadata.category} />
          <span
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-light)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            AKI No.{metadata.issue} · {metadata.date}
          </span>
        </div>
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--charcoal)',
            letterSpacing: '-0.02em',
            lineHeight: 1.35,
            marginBottom: '0.75rem',
          }}
        >
          {metadata.title}
        </h3>
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '1rem',
          }}
        >
          {metadata.excerpt || metadata.summary}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {metadata.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="aki-tag">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}

// ============================================================
// 메인 컴포넌트
// ============================================================
export default function ContentCard({
  metadata,
  variant = 'card',
}: ContentCardProps) {
  if (variant === 'list') return <ListVariant metadata={metadata} />;
  if (variant === 'featured') return <FeaturedVariant metadata={metadata} />;
  return <CardVariant metadata={metadata} />;
}
