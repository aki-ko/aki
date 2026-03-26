'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnyMetadata } from '@/lib/types';
import { User } from 'lucide-react';
import FilterBar from '@/components/filters/FilterBar';

interface PeopleData {
  items: AnyMetadata[];
  tags: string[];
  issues: number[];
}

export default function PeoplePage() {
  const [data, setData] = useState<PeopleData>({ items: [], tags: [], issues: [] });
  const [filtered, setFiltered] = useState<AnyMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content?category=people')
      .then((r) => r.json())
      .then((d: PeopleData) => {
        setData(d);
        setFiltered(d.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFilterChange = (filters: { category?: any; tags: string[]; issue?: number }) => {
    let result = [...data.items];
    if (filters.tags.length > 0) {
      result = result.filter((item) =>
        filters.tags.some((t) => item.tags.includes(t))
      );
    }
    if (filters.issue !== undefined) {
      result = result.filter((item) => item.issue === filters.issue);
    }
    setFiltered(result);
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
      <section style={{ padding: '3.5rem 0 2rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="aki-container">
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)' }}>
            SECTION / PEOPLE
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
            People
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            AKI에 참여한 제작자, 필자, 협업자, 편집자 정보가 쌓이는 공간입니다.
          </p>
        </div>
      </section>

      <div className="aki-container" style={{ paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
            {filtered.length}명
          </span>
        </div>

        <FilterBar
          tags={data.tags}
          issues={data.issues}
          onFilterChange={handleFilterChange}
        />

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
            <p style={{ fontSize: '0.85rem' }}>해당 조건의 참여자가 없습니다.</p>
          </div>
        ) : (
          <div className="aki-grid-3" style={{ paddingBottom: '3rem' }}>
            {filtered.map((item) => (
              <PeopleCard key={item.slug} metadata={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PeopleCard({ metadata }: { metadata: AnyMetadata }) {
  const p = metadata as any;
  return (
    <Link href={`/people/${p.slug}`} style={{ textDecoration: 'none' }}>
      <article
        className="aki-card"
        style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
      >
        {/* 아바타 자리 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--ivory-dark)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <User size={18} color="var(--text-light)" />
          </div>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '0.15rem' }}>
              {p.title}
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--deep-green)', fontWeight: 500 }}>
              {p.role}
            </p>
          </div>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>
          {p.bio ? p.bio.slice(0, 100) + (p.bio.length > 100 ? '...' : '') : p.summary}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border-light)',
        }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
            AKI No.{p.issue}
          </span>
          {p.origin && (
            <span style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>
              {p.origin}
            </span>
          )}
        </div>

        {p.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {p.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="aki-tag">{tag}</span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
