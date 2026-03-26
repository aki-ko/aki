// ============================================================
// AKI 웹진 - 콘텐츠 로딩 및 파싱 라이브러리
// ============================================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import {
  AnyMetadata,
  Category,
  ContentItem,
  FilterOptions,
  Issue,
  PromptMetadata,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

// ============================================================
// 파일 읽기 유틸리티
// ============================================================

function getCategoryDir(category: Category): string {
  return path.join(CONTENT_DIR, category);
}

function readMarkdownFile(filePath: string): ContentItem | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return {
      metadata: data as AnyMetadata,
      content,
    };
  } catch {
    return null;
  }
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(markdown);
  return result.toString();
}

// ============================================================
// 카테고리별 전체 콘텐츠 가져오기
// ============================================================

export function getAllContentByCategory(category: Category): ContentItem[] {
  const dir = getCategoryDir(category);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  const items = files
    .map((file) => {
      const filePath = path.join(dir, file);
      const item = readMarkdownFile(filePath);
      return item;
    })
    .filter((item): item is ContentItem => item !== null)
    .filter((item) => item.metadata.status === 'published');

  // 날짜 내림차순 정렬
  return items.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

// ============================================================
// 전체 카테고리 콘텐츠 통합 가져오기
// ============================================================

export function getAllContent(): ContentItem[] {
  const categories: Category[] = ['prompt', 'text', 'people', 'vault'];
  return categories.flatMap((cat) => getAllContentByCategory(cat));
}

// ============================================================
// slug로 단일 콘텐츠 가져오기 (HTML 변환 포함)
// ============================================================

export async function getContentBySlug(
  category: Category,
  slug: string
): Promise<ContentItem | null> {
  const dir = getCategoryDir(category);
  const filePath = path.join(dir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const item = readMarkdownFile(filePath);
  if (!item) return null;

  const htmlContent = await markdownToHtml(item.content);
  return { ...item, htmlContent };
}

// ============================================================
// 이슈(호)별 콘텐츠 가져오기
// ============================================================

export function getContentByIssue(issueNumber: number): ContentItem[] {
  return getAllContent().filter(
    (item) => item.metadata.issue === issueNumber
  );
}

// ============================================================
// 필터링
// ============================================================

export function filterContent(
  items: ContentItem[],
  options: FilterOptions
): ContentItem[] {
  return items.filter((item) => {
    if (options.category && item.metadata.category !== options.category) return false;
    if (options.issue !== undefined && item.metadata.issue !== options.issue) return false;
    if (options.featured !== undefined && item.metadata.featured !== options.featured) return false;
    if (options.author && item.metadata.author !== options.author) return false;
    if (options.tags && options.tags.length > 0) {
      const hasTag = options.tags.some((tag) =>
        item.metadata.tags.includes(tag)
      );
      if (!hasTag) return false;
    }
    return true;
  });
}

// ============================================================
// 이슈 목록 생성
// ============================================================

export function getAllIssues(): Issue[] {
  const prompts = getAllContentByCategory('prompt');
  const issueMap = new Map<number, Issue>();

  prompts.forEach((item) => {
    const p = item.metadata as PromptMetadata;
    if (!issueMap.has(p.issue)) {
      issueMap.set(p.issue, {
        number: p.issue,
        title: p.issue_title || p.title,
        subtitle: p.issue_subtitle,
        question: p.question || '',
        date: p.date,
        status: 'archived',
        cover_image: p.cover_image,
        prompt_slug: p.slug,
      });
    }
  });

  // 가장 최신 이슈를 'current'로 마킹
  const issues = Array.from(issueMap.values()).sort(
    (a, b) => b.number - a.number
  );
  if (issues.length > 0) {
    issues[0].status = 'current';
  }

  return issues;
}

// ============================================================
// 관련 콘텐츠 가져오기
// ============================================================

export function getRelatedContent(
  currentItem: ContentItem,
  limit = 3
): ContentItem[] {
  const allItems = getAllContent().filter(
    (item) => item.metadata.slug !== currentItem.metadata.slug
  );

  const relatedSlugs = currentItem.metadata.related || [];
  const currentTags = currentItem.metadata.tags || [];

  // related slug로 명시된 것 먼저
  const explicitRelated = allItems.filter((item) =>
    relatedSlugs.includes(item.metadata.slug)
  );

  // 태그가 겹치는 것
  const tagRelated = allItems
    .filter((item) => !relatedSlugs.includes(item.metadata.slug))
    .map((item) => ({
      item,
      score: item.metadata.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);

  return [...explicitRelated, ...tagRelated].slice(0, limit);
}

// ============================================================
// 전체 태그 목록
// ============================================================

export function getAllTags(): { tag: string; count: number }[] {
  const allItems = getAllContent();
  const tagMap = new Map<string, number>();

  allItems.forEach((item) => {
    (item.metadata.tags || []).forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// ============================================================
// 검색용 인덱스 데이터
// ============================================================

export function getSearchIndex() {
  return getAllContent().map((item) => ({
    slug: item.metadata.slug,
    title: item.metadata.title,
    summary: item.metadata.summary,
    tags: item.metadata.tags,
    category: item.metadata.category,
    author: item.metadata.author,
    issue: item.metadata.issue,
    date: item.metadata.date,
    content: item.content.slice(0, 500),
  }));
}
