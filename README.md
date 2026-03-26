# AKI — 쌓이는 진

> Archive & Knowledge Index  
> 읽는 진이 아니라, 쌓이는 진

AKI는 매 호마다 하나의 질문을 중심으로 글, 사람, 자료가 축적되는 미니멀 아카이브 웹진입니다.

---

## 구조

```
content/
├── prompt/     ← 이번 호의 질문과 읽는 방향
├── text/       ← 에세이, 인터뷰, 리뷰, 노트, 발췌
├── people/     ← 참여자, 협업자, 편집자 프로필
└── vault/      ← 이미지, PDF, 링크, 참고자료

public/
├── images/     ← 이미지 파일
└── assets/     ← 기타 정적 파일
```

---

## 새 글 추가하기

### 1. 파일 생성

카테고리에 맞는 폴더에 `slug.md` 파일을 생성합니다.

```bash
# 예시
touch content/text/my-new-essay.md
```

### 2. Front Matter 작성

```yaml
---
title: "글 제목"
slug: "my-new-essay"
date: "2025-06-01"
issue: 3
category: "text"
subcategory: "essay"
summary: "한 줄 요약 (60-120자)"
tags: ["태그1", "태그2", "태그3"]
status: "published"
author: "저자 이름"
related: ["관련-글-slug", "다른-글-slug"]
featured: false
reading_time: 8
excerpt: "미리보기 문장 (선택)"
---
```

### 3. 본문 작성

```markdown
도입 단락. 왜 이 글을 쓰는지, 무엇을 탐색하는지.

## 소제목 1

본문 내용. 1문단은 3-5문장.

## 소제목 2

> "강조하고 싶은 핵심 문장은 인용구 형식으로."

## 마무리

관련 글이나 인물을 연결하는 문장으로 마무리.
```

### 4. 커밋 & 배포

```bash
git add content/text/my-new-essay.md
git commit -m "text: 새 에세이 추가 — 글 제목"
git push
```

---

## 카테고리별 Front Matter 규칙

### text (에세이, 인터뷰 등)

| 필드 | 설명 | 예시 |
|------|------|------|
| subcategory | 글의 유형 | essay / interview / review / note / excerpt |
| reading_time | 읽기 예상 시간(분) | 8 |
| excerpt | 미리보기 문장 | "핵심 문장..." |
| source | 출처 | "AKI No.1" |
| citation | 인용 정보 | "저자, 책명, 연도" |

### people (참여자 프로필)

| 필드 | 설명 | 예시 |
|------|------|------|
| role | 역할 | "에세이스트, 번역가" |
| bio | 소개글 | "약력 2-3문장" |
| links | 링크 | website / instagram / email |
| origin | 활동 기반 | "서울" |

### vault (자료 보관함)

| 필드 | 설명 | 예시 |
|------|------|------|
| file_type | 자료 유형 | pdf / link / image / reference / download / appendix |
| download_url | 다운로드 URL | "/assets/file.pdf" |
| credit | 출처 | "AKI 편집부" |
| usage_note | 사용 안내 | "학술 참고용" |

---

## 태그 가이드

- 기존 태그와 일관성을 유지합니다
- 태그는 3-6개를 권장합니다
- 개념 태그 + 형식 태그 + 이슈 태그를 조합합니다
- 예: `["기억", "아카이브", "에세이", "기록학"]`

---

## 이슈(호) 추가하기

1. `content/prompt/` 폴더에 새 프롬프트 파일 생성
2. `issue` 번호를 기존 최대값 + 1로 설정
3. `issue_title`, `question`, `direction` 필수 입력
4. 이 호에 속하는 text/people/vault 파일에 같은 `issue` 번호 부여

---

## 기술 스택

- **프레임워크**: Next.js 16 (App Router, TypeScript)
- **스타일**: Tailwind CSS + CSS 변수
- **콘텐츠**: Markdown + gray-matter + remark
- **검색**: API 라우트 (서버 사이드)
- **배포**: Vercel 권장

---

## 배포

### Vercel (권장)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포
vercel

# 3. 환경변수 설정 (필요 시)
```

### GitHub Pages

`next.config.ts`에 `output: 'export'` 추가 후 GitHub Actions로 배포.

---

## 디자인 시스템

| 요소 | 값 |
|------|----|
| 배경 | `#F7F5F0` (아이보리) |
| 텍스트 | `#2C2C2C` (차콜) |
| 포인트 | `#2D5016` (딥 그린) |
| 폰트 | Noto Sans KR / IBM Plex Mono |

---

## 라이선스

AKI 콘텐츠의 저작권은 각 저자에게 있습니다.  
코드 구조는 MIT 라이선스입니다.
