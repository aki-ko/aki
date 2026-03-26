'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnyMetadata, VaultMetadata } from '@/lib/types';
import FilterBar from '@/components/filters/FilterBar';
import { FileText, Link2, Image, Download, BookOpen, Archive } from 'lucide-react';

interface VaultData {
  items: AnyMetadata[];
  tags: string[];
  issues: number[];
}

const FILE_TYPE_ICONS: Record<string, React.ReactNode> = {
  pdf:       <FileText size={16} />,
  link:      <Link2 size={16} />,
  image:     <Image size={16} />,
  download:  <Download size={16} />,
  reference: <BookOpen size={16} />,
  appendix:  <Archive size={16} />,
};

const FILE_TYPE_LABELS: Record<string, string> = {
  pdf:       'PDF',
  link:      '링크',
  image:     '이미지',
  download:  '다운로드',
  reference: '참고문헌',
  appendix:  '부록',
};

const FILE_TYPES = ['', 'reference', 'link', 'pdf', 'download', 'image', 'appendix'];

export default function VaultPage() {
  const [data, setData] = useState<VaultData>({ items: [], tags: [], issues: [] });
  const [filtered, setFiltered] = useState<AnyMetadata[]>([]);
  const [activeType, setActiveType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content?category=vault')
      .then((r) => r.json())
      .then((d: VaultData) => {
        setData(d);
        setFiltered(d.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleTypeFilter = (type: string) => {
    setActiveType(type);
    let result = [...data.items];
    if (type) {
      result = result.filter((item) => (item as VaultMetadata).file_type === type);
    }
    setFiltered(result);
  };

  const handleFilterChange = (filters: { category?: any; tags: string[]; issue?: number }) => {
    let result = [...data.items];
    if (activeType) {
      result = result.filter((item) => (item as VaultMetadata).file_type === activeType);
    }
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
            SECTION / VAULT
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
            Vault
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            이미지, PDF, 링크, 참고자료, 부록, 다운로드 파일. AKI의 자료가 보관되는 공간입니다.
          </p>
        </div>
      </section>

      <div className="aki-container" style={{ paddingTop: '2rem' }}>
        {/* 파일 타입 탭 */}
        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
          {FILE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: activeType === type ? 600 : 400,
                border: '1px solid',
                borderColor: activeType === type ? 'var(--deep-green)' : 'var(--border-light)',
                borderRadius: '2px',
                backgroundColor: activeType === type ? 'var(--deep-green)' : 'transparent',
                color: activeType === type ? 'var(--ivory)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {type && FILE_TYPE_ICONS[type]}
              {type ? FILE_TYPE_LABELS[type] : '전체'}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-light)', alignSelf: 'center', fontFamily: 'var(--font-mono)' }}>
            {filtered.length}개
          </span>
        </div>

        <FilterBar
          tags={data.tags}
          issues={data.issues}
          onFilterChange={handleFilterChange}
        />

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
            <p style={{ fontSize: '0.85rem' }}>해당 조건의 자료가 없습니다.</p>
          </div>
        ) : (
          <div style={{ paddingBottom: '3rem' }}>
            {filtered.map((item) => (
              <VaultItem key={item.slug} metadata={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VaultItem({ metadata }: { metadata: AnyMetadata }) {
  const v = metadata as VaultMetadata;
  return (
    <Link href={`/vault/${v.slug}`} style={{ textDecoration: 'none' }}>
      <article
        className="aki-list-item"
        style={{ padding: '1rem 0', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'start', gap: '1rem' }}
      >
        {/* 아이콘 */}
        <div style={{
          width: '36px',
          height: '36px',
          border: '1px solid var(--border-light)',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-light)',
          flexShrink: 0,
          backgroundColor: 'var(--bg-secondary)',
        }}>
          {FILE_TYPE_ICONS[v.file_type] || <Archive size={16} />}
        </div>

        {/* 내용 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--deep-green)',
                padding: '0.1rem 0.35rem',
                backgroundColor: 'var(--deep-green-pale)',
                borderRadius: '2px',
              }}
            >
              {FILE_TYPE_LABELS[v.file_type] || v.file_type}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-light)' }}>
              No.{v.issue}
            </span>
          </div>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '0.25rem' }}>
            {v.title}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {v.summary}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.4rem' }}>
            {v.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="aki-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* 날짜 */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
            {v.date}
          </span>
        </div>
      </article>
    </Link>
  );
}
