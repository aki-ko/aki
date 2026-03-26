'use client';

import { useState } from 'react';
import { Category } from '@/lib/types';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  categories?: Category[];
  tags?: string[];
  issues?: number[];
  onFilterChange?: (filters: {
    category?: Category;
    tags: string[];
    issue?: number;
  }) => void;
  showViewToggle?: boolean;
  onViewChange?: (view: 'card' | 'list') => void;
  currentView?: 'card' | 'list';
}

const CATEGORY_LABELS: Record<Category, string> = {
  prompt: 'Prompt',
  text: 'Text',
  people: 'People',
  vault: 'Vault',
};

export default function FilterBar({
  categories,
  tags = [],
  issues = [],
  onFilterChange,
  showViewToggle = false,
  onViewChange,
  currentView = 'card',
}: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<number | undefined>();
  const [showTagPanel, setShowTagPanel] = useState(false);

  const handleCategoryChange = (cat?: Category) => {
    const next = selectedCategory === cat ? undefined : cat;
    setSelectedCategory(next);
    onFilterChange?.({ category: next, tags: selectedTags, issue: selectedIssue });
  };

  const handleTagToggle = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(next);
    onFilterChange?.({ category: selectedCategory, tags: next, issue: selectedIssue });
  };

  const handleIssueChange = (issue?: number) => {
    const next = selectedIssue === issue ? undefined : issue;
    setSelectedIssue(next);
    onFilterChange?.({ category: selectedCategory, tags: selectedTags, issue: next });
  };

  const clearAll = () => {
    setSelectedCategory(undefined);
    setSelectedTags([]);
    setSelectedIssue(undefined);
    onFilterChange?.({ category: undefined, tags: [], issue: undefined });
  };

  const hasFilters = selectedCategory || selectedTags.length > 0 || selectedIssue;

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
      }}
    >
      {/* 필터 행 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {/* 카테고리 필터 */}
        {categories && categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              fontSize: '0.7rem',
              fontWeight: selectedCategory === cat ? 600 : 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.65rem',
              border: '1px solid',
              borderColor: selectedCategory === cat ? 'var(--deep-green)' : 'var(--border-light)',
              borderRadius: '2px',
              backgroundColor: selectedCategory === cat ? 'var(--deep-green-pale)' : 'transparent',
              color: selectedCategory === cat ? 'var(--deep-green)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}

        {/* 이슈 필터 */}
        {issues.map((issue) => (
          <button
            key={issue}
            onClick={() => handleIssueChange(issue)}
            style={{
              fontSize: '0.7rem',
              fontWeight: selectedIssue === issue ? 600 : 400,
              letterSpacing: '0.06em',
              fontFamily: 'var(--font-mono)',
              padding: '0.3rem 0.65rem',
              border: '1px solid',
              borderColor: selectedIssue === issue ? 'var(--charcoal)' : 'var(--border-light)',
              borderRadius: '2px',
              backgroundColor: selectedIssue === issue ? 'var(--charcoal)' : 'transparent',
              color: selectedIssue === issue ? 'var(--ivory)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            No.{issue}
          </button>
        ))}

        {/* 태그 패널 토글 */}
        {tags.length > 0 && (
          <button
            onClick={() => setShowTagPanel(!showTagPanel)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.7rem',
              letterSpacing: '0.06em',
              padding: '0.3rem 0.65rem',
              border: '1px solid var(--border-light)',
              borderRadius: '2px',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <SlidersHorizontal size={11} />
            태그
            {selectedTags.length > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--deep-green)',
                  color: 'var(--ivory)',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  fontSize: '0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedTags.length}
              </span>
            )}
          </button>
        )}

        {/* 뷰 토글 */}
        {showViewToggle && (
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              border: '1px solid var(--border-light)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {(['card', 'list'] as const).map((view) => (
              <button
                key={view}
                onClick={() => onViewChange?.(view)}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.65rem',
                  fontWeight: currentView === view ? 600 : 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: currentView === view ? 'var(--charcoal)' : 'transparent',
                  color: currentView === view ? 'var(--ivory)' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {view === 'card' ? '카드' : '목록'}
              </button>
            ))}
          </div>
        )}

        {/* 필터 초기화 */}
        {hasFilters && (
          <button
            onClick={clearAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontSize: '0.68rem',
              color: 'var(--text-light)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.3rem',
            }}
          >
            <X size={11} />
            초기화
          </button>
        )}
      </div>

      {/* 태그 패널 */}
      {showTagPanel && tags.length > 0 && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '2px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`aki-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* 활성 태그 표시 */}
      {selectedTags.length > 0 && (
        <div
          style={{
            marginTop: '0.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.3rem',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-light)',
              marginRight: '0.25rem',
            }}
          >
            필터:
          </span>
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.68rem',
                padding: '0.15rem 0.4rem',
                backgroundColor: 'var(--deep-green-pale)',
                color: 'var(--deep-green)',
                border: '1px solid var(--deep-green-light)',
                borderRadius: '2px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {tag}
              <X size={9} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
