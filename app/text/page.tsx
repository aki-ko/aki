'use client';

import { useState, useEffect } from 'react';
import ContentCard from '@/components/cards/ContentCard';
import FilterBar from '@/components/filters/FilterBar';
import { AnyMetadata } from '@/lib/types';

interface TextPageData {
  items: AnyMetadata[];
  tags: string[];
  issues: number[];
}

export default function TextPage() {
  const [data, setData] = useState<TextPageData>({ items: [], tags: [], issues: [] });
  const [filtered, setFiltered] = useState<AnyMetadata[]>([]);
  const [view, setView] = useState<'card' | 'list'>('card');
  const [activeSubcat, setActiveSubcat] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content?category=text')
      .then((r) => r.json())
      .then((d: TextPageData) => {
        setData(d);
        setFiltered(d.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const SUBCATEGORIES = [
    { key: '', label: '전체' },
    { key: 'essay', label: '에세이' },
    { key: 'interview', label: '인터뷰' },
    { key: 'review', label: '리뷰' },
    { key: 'note', label: '노트' },
    { key: 'excerpt', label: '발췌' },
  ];

  const handleSubcat = (key: string) => {
    setActiveSubcat(key);
    applyFilters(key, {});
  };

  const applyFilters = (
    subcat: string,
    opts: { tags?: string[]; issue?: number }
  ) => {
    let result = [...data.items];
    if (subcat) {
      result = result.filter((item) => (item as any).subcategory === subcat);
    }
    if (opts.tags && opts.tags.length > 0) {
      result = result.filter((item) =>
        opts.tags!.some((t) => item.tags.includes(t))
      );
    }
    if (opts.issue !== undefined) {
      result = result.filter((item) => item.issue === opts.issue);
    }
    setFiltered(result);
  };

  const handleFilterChange = (filters: {
    category?: any;
    tags: string[];
    issue?: number;
  }) => {
    applyFilters(activeSubcat, { tags: filters.tags, issue: filters.issue });
  };

  if (loading) {
    return (
      <div className="aki-container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>불러오는 중...</p>
      </div>
    );
  }

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
            SECTION / TEXT
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
            Text
          </h1>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            에세이, 인터뷰, 리뷰, 노트, 발췌. AKI의 모든 텍스트가 축적되는 공간입니다.
          </p>
        </div>
      </section>

      <div className="aki-container" style={{ paddingTop: '2rem' }}>
        {/* 서브카테고리 탭 */}
        <div
          style={{
            display: 'flex',
            gap: '0.25rem',
            flexWrap: 'wrap',
            marginBottom: '1.25rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          {SUBCATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSubcat(key)}
              style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: activeSubcat === key ? 600 : 400,
                letterSpacing: '0.04em',
                border: '1px solid',
                borderColor: activeSubcat === key ? 'var(--deep-green)' : 'var(--border-light)',
                borderRadius: '2px',
                backgroundColor: activeSubcat === key ? 'var(--deep-green)' : 'transparent',
                color: activeSubcat === key ? 'var(--ivory)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {label}
            </button>
          ))}
          {/* 카운터 */}
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '0.7rem',
              color: 'var(--text-light)',
              alignSelf: 'center',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {filtered.length}편
          </span>
        </div>

        {/* 필터 바 */}
        <FilterBar
          tags={data.tags}
          issues={data.issues}
          showViewToggle
          onViewChange={setView}
          currentView={view}
          onFilterChange={handleFilterChange}
        />

        {/* 콘텐츠 */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 0',
              color: 'var(--text-light)',
            }}
          >
            <p style={{ fontSize: '0.85rem' }}>해당 조건의 글이 없습니다.</p>
          </div>
        ) : view === 'card' ? (
          <div className="aki-grid-3" style={{ paddingBottom: '3rem' }}>
            {filtered.map((item) => (
              <ContentCard key={item.slug} metadata={item} variant="card" />
            ))}
          </div>
        ) : (
          <div style={{ paddingBottom: '3rem' }}>
            {filtered.map((item) => (
              <ContentCard key={item.slug} metadata={item} variant="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
