import { NextRequest, NextResponse } from 'next/server';
import { getSearchIndex } from '@/lib/content';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const tag = searchParams.get('tag') || '';
  const category = searchParams.get('category') || '';
  const issue = searchParams.get('issue') ? parseInt(searchParams.get('issue')!, 10) : null;

  try {
    let results = getSearchIndex();

    // 카테고리 필터
    if (category) {
      results = results.filter((r) => r.category === category);
    }

    // 이슈 필터
    if (issue !== null) {
      results = results.filter((r) => r.issue === issue);
    }

    // 태그 필터
    if (tag) {
      results = results.filter((r) => r.tags.includes(tag));
    }

    // 텍스트 검색 (서버 사이드 단순 검색)
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.content.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      results,
      total: results.length,
      query,
      tag,
      category,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
