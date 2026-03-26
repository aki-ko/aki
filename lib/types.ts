// ============================================================
// AKI 웹진 - 전체 타입 정의
// ============================================================

export type Category = 'prompt' | 'text' | 'people' | 'vault';

export type TextSubcategory =
  | 'essay'
  | 'interview'
  | 'review'
  | 'note'
  | 'excerpt'
  | 'critique'
  | 'dispatch';

export type VaultFileType =
  | 'image'
  | 'pdf'
  | 'link'
  | 'reference'
  | 'appendix'
  | 'download';

export type ContentStatus = 'published' | 'draft' | 'archived';

// ============================================================
// 기본 메타데이터 (모든 콘텐츠 공통)
// ============================================================
export interface BaseMetadata {
  title: string;
  slug: string;
  date: string;
  issue: number;
  category: Category;
  summary: string;
  tags: string[];
  status: ContentStatus;
  author: string;
  related: string[];
  featured: boolean;
  reading_time?: number;
  excerpt?: string;
}

// ============================================================
// 프롬프트 (이번 호의 질문/방향)
// ============================================================
export interface PromptMetadata extends BaseMetadata {
  category: 'prompt';
  issue_title: string;
  issue_subtitle?: string;
  question: string;
  direction?: string;
  cover_image?: string;
}

// ============================================================
// 텍스트 (에세이, 인터뷰, 리뷰 등)
// ============================================================
export interface TextMetadata extends BaseMetadata {
  category: 'text';
  subcategory: TextSubcategory;
  source?: string;
  citation?: string;
}

// ============================================================
// 사람 (참여자, 협업자, 편집자)
// ============================================================
export interface PeopleMetadata extends BaseMetadata {
  category: 'people';
  role: string;
  bio: string;
  links?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    email?: string;
    other?: string;
  };
  avatar?: string;
  origin?: string;
}

// ============================================================
// 보관함 (이미지, PDF, 링크, 자료)
// ============================================================
export interface VaultMetadata extends BaseMetadata {
  category: 'vault';
  file_type: VaultFileType;
  download_url?: string;
  credit?: string;
  origin?: string;
  usage_note?: string;
  thumbnail?: string;
}

// ============================================================
// 통합 콘텐츠 타입
// ============================================================
export type AnyMetadata =
  | PromptMetadata
  | TextMetadata
  | PeopleMetadata
  | VaultMetadata;

export interface ContentItem {
  metadata: AnyMetadata;
  content: string;
  htmlContent?: string;
}

// ============================================================
// 이슈 (호) 구조
// ============================================================
export interface Issue {
  number: number;
  title: string;
  subtitle?: string;
  question: string;
  date: string;
  status: 'current' | 'archived';
  cover_image?: string;
  prompt_slug?: string;
}

// ============================================================
// 검색/필터
// ============================================================
export interface SearchResult {
  metadata: AnyMetadata;
  score?: number;
  preview?: string;
}

export interface FilterOptions {
  category?: Category;
  issue?: number;
  tags?: string[];
  author?: string;
  subcategory?: TextSubcategory;
  featured?: boolean;
}
