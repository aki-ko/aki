'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ContentCard from '@/components/cards/ContentCard';
import { AnyMetadata, Category } from '@/lib/types';
import { Search, X } from 'lucide-react';

const CATEGORIES = [
  { key: '', label: '전체' },
  { key: 'prompt', label: 'Prompt' },
  { key: 'text', label: 'Text' },
  { key: 'people', label: 'People' },
  { key: 'vault', label: 'Vault' },
];

interface SearchResult {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  category: string;
  author: string;
  issue: number;
  date: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [view, setView] = useState<'card' | 'list'>('list');

  // 전체 태그 로드
  useEffect(() => {
    fetch('/api/search?q=')
      .then((r) => r.json())
      .then((d) => {
        const tags = [...new Set<string>(d.results.flatMap((r: SearchResult) => r.tags))].sort();
        setAllTags(tags);
      });
  }, []);

  const doSearch = useCallback(async (q: string, cat: string, tag: string) => {
    setLoading(true);
    setSearched(true);

    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat) params.set('category', cat);
    if (tag) params.set('tag', tag);

    try {
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // URL 파라미터로 초기 검색
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';
    setQuery(q);
    setSelectedCategory(cat);
    setSelectedTag(tag);
    if (q || cat || tag) {
      doSearch(q, cat, tag);
    }
  }, [searchParams, doSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    router.push(`/search?${params.toString()}`);
    doSearch(query, selectedCategory, selectedTag);
  };

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? '' : tag;
    setSelectedTag(newTag);
    doSearch(query, selectedCategory, newTag);
  };

  const clearAll = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    setResults([]);
    setSearched(false);
    router.push('/search');
  };

  // 결과를 AnyMetadata 형태로 변환
  const resultsAsMetadata = results.map((r) => ({
    ...r,
    featured: false,
    status: 'published' as const,
    related: [],
    tags: r.tags || [],
  })) as unknown as AnyMetadata[];

  return (
    <div className="aki-fadein">
      {/* 헤더 */}
      <section style={{ padding: '3.5rem 0 2rem', borderBottom: '1px solid var(--border-light)' }}>
        <div className="aki-container">
          <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)' }}>
            SEARCH
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
            Search
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            제목, 저자, 요약, 태그로 AKI의 모든 콘텐츠를 검색하세요.
          </p>
        </div>
      </section>

      <div className="aki-container" style={{ paddingTop: '2rem' }}>
        {/* 검색 폼 */}
        <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div
              style={{
                flex: 1,
                minWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-mid)',
                borderRadius: '2px',
                backgroundColor: 'var(--bg-card)',
                padding: '0 0.75rem',
                gap: '0.5rem',
              }}
            >
              <Search size={15} color="var(--text-light)" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색어 입력..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '0.88rem',
                  color: 'var(--text-primary)',
                  padding: '0.65rem 0',
                  fontFamily: 'inherit',
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '0.2rem', display: 'flex' }}
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <button
              type="submit"
              style={{
                padding: '0 1.25rem',
                backgroundColor: 'var(--charcoal)',
                color: 'var(--ivory)',
                border: 'none',
                borderRadius: '2px',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              검색
            </button>
          </div>
        </form>

        {/* 카테고리 필터 */}
        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setSelectedCategory(key);
                doSearch(query, key, selectedTag);
              }}
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.72rem',
                fontWeight: selectedCategory === key ? 600 : 400,
                letterSpacing: '0.06em',
                border: '1px solid',
                borderColor: selectedCategory === key ? 'var(--charcoal)' : 'var(--border-light)',
                borderRadius: '2px',
                backgroundColor: selectedCategory === key ? 'var(--charcoal)' : 'transparent',
                color: selectedCategory === key ? 'var(--ivory)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 태그 필터 */}
        {allTags.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
              태그로 탐색
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {allTags.slice(0, 30).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`aki-tag ${selectedTag === tag ? 'active' : ''}`}
                  style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 활성 필터 표시 */}
        {(query || selectedCategory || selectedTag) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', padding: '0.6rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '2px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>필터:</span>
            {query && <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem', backgroundColor: 'var(--charcoal)', color: 'var(--ivory)', borderRadius: '2px' }}>&ldquo;{query}&rdquo;</span>}
            {selectedCategory && <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem', backgroundColor: 'var(--deep-green)', color: 'var(--ivory)', borderRadius: '2px' }}>{selectedCategory}</span>}
            {selectedTag && <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem', backgroundColor: 'var(--deep-green-pale)', color: 'var(--deep-green)', border: '1px solid var(--deep-green-light)', borderRadius: '2px' }}>#{selectedTag}</span>}
            <button onClick={clearAll} style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-light)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <X size={11} /> 초기화
            </button>
          </div>
        )}

        {/* 뷰 토글 */}
        {searched && results.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: 600, color: 'var(--charcoal)', fontFamily: 'var(--font-mono)' }}>{results.length}</span>개의 결과
            </span>
            <div style={{ display: 'flex', border: '1px solid var(--border-light)', borderRadius: '2px', overflow: 'hidden' }}>
              {(['list', 'card'] as const).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    backgroundColor: view === v ? 'var(--charcoal)' : 'transparent',
                    color: view === v ? 'var(--ivory)' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}>
                  {v === 'card' ? '카드' : '목록'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 결과 */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
            <p style={{ fontSize: '0.8rem' }}>검색 중...</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>결과가 없습니다.</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>다른 검색어나 태그를 시도해보세요.</p>
          </div>
        )}

        {!loading && searched && results.length > 0 && (
          <div style={{ paddingBottom: '3rem' }}>
            {view === 'card' ? (
              <div className="aki-grid-3">
                {resultsAsMetadata.map((item) => (
                  <ContentCard key={item.slug} metadata={item} variant="card" />
                ))}
              </div>
            ) : (
              <div>
                {resultsAsMetadata.map((item) => (
                  <ContentCard key={item.slug} metadata={item} variant="list" />
                ))}
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
            <Search size={32} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <p style={{ fontSize: '0.85rem', marginBottom: '0.35rem' }}>검색어를 입력하거나 태그를 선택하세요.</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>제목, 저자, 요약, 태그 전체를 검색합니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="aki-container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>불러오는 중...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
