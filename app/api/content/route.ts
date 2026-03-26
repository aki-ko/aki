import { NextRequest, NextResponse } from 'next/server';
import { getAllContentByCategory, getAllTags } from '@/lib/content';
import { Category } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as Category | null;

  try {
    if (category) {
      const items = getAllContentByCategory(category);
      const tags = [...new Set(items.flatMap((i) => i.metadata.tags))];
      const issues = [...new Set(items.map((i) => i.metadata.issue))].sort((a, b) => b - a);

      return NextResponse.json({
        items: items.map((i) => i.metadata),
        tags,
        issues,
      });
    }

    // 전체
    const categories: Category[] = ['prompt', 'text', 'people', 'vault'];
    const allItems = categories.flatMap((cat) =>
      getAllContentByCategory(cat).map((i) => i.metadata)
    );
    const tags = getAllTags();
    const issues = [...new Set(allItems.map((i) => i.issue))].sort((a, b) => b - a);

    return NextResponse.json({ items: allItems, tags, issues });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}
