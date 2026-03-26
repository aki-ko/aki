---
title: "AKI 글 추가 가이드"
slug: "aki-archive-guide"
date: "2025-01-01"
issue: 1
category: "vault"
file_type: "download"
summary: "AKI 웹진에 새 글을 추가하는 방법. Markdown 파일 작성 규칙, Front Matter 예시, 폴더 구조 안내."
tags: ["가이드", "운영", "마크다운", "아카이브", "편집"]
status: "published"
author: "AKI 편집부"
related: ["issue-01-what-remains"]
featured: false
credit: "AKI 편집부"
usage_note: "자유롭게 사용 가능."
reading_time: 10
excerpt: "AKI에 새 글 하나를 추가하는 일은 Markdown 파일 하나를 만드는 것에서 시작합니다."
---

# AKI 글 추가 가이드

AKI에 새 글 하나를 추가하는 일은 Markdown 파일 하나를 만드는 것에서 시작합니다.

## 폴더 구조

```
content/
├── prompt/          ← 이번 호의 질문과 방향
├── text/            ← 에세이, 인터뷰, 리뷰, 노트
├── people/          ← 참여자, 협업자 프로필
└── vault/           ← 이미지, PDF, 링크, 참고자료
```

## 파일명 규칙

- 영소문자와 하이픈(-)만 사용
- `slug`와 동일하게 작성
- 예: `on-archiving-and-forgetting.md`

## Front Matter 필수 항목

```yaml
---
title: "글 제목"
slug: "url-friendly-slug"
date: "YYYY-MM-DD"
issue: 1
category: "text"          # prompt / text / people / vault
summary: "한 줄 요약 (60~120자)"
tags: ["태그1", "태그2"]
status: "published"        # published / draft / archived
author: "저자명"
related: ["관련-글-slug"]
featured: false
---
```

## 카테고리별 추가 항목

### text
```yaml
subcategory: "essay"   # essay / interview / review / note / excerpt
reading_time: 8        # 읽기 예상 시간 (분)
excerpt: "미리보기 문장"
source: "AKI No.1"
```

### people
```yaml
role: "역할"
bio: "소개글"
links:
  website: "https://..."
  instagram: "@..."
origin: "서울"
```

### vault
```yaml
file_type: "reference"  # image / pdf / link / reference / download
credit: "출처"
usage_note: "사용 안내"
download_url: "/assets/..."
```

## 새 글 추가 단계

1. 카테고리에 맞는 폴더 선택 (`content/text/`)
2. `slug.md` 파일 생성
3. Front Matter 작성 (필수 항목 누락 없이)
4. 본문 작성
5. 이미지는 `public/images/`에 저장
6. `related`에 연결할 글의 slug 입력
7. GitHub에 커밋 & 푸시

## 본문 작성 원칙

- 도입 1문단 (맥락 설정)
- 소제목 2~4개 (`## 소제목`)
- 핵심 문장은 인용구 형식 (`> 문장`)
- 관련 글/인물 연결 (마지막 섹션)
- 마무리 1문장

## 주의사항

- `slug`는 한번 정하면 변경하지 않는다 (URL 깨짐)
- `date`는 발행일 기준 YYYY-MM-DD
- `tags`는 기존 태그와 일관성 유지
- `status: "draft"` 상태는 사이트에 노출되지 않는다
