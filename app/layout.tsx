import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'AKI — 쌓이는 진',
    template: '%s | AKI',
  },
  description:
    'AKI는 미니멀한 아카이브 진입니다. 매 호마다 하나의 질문을 중심으로 글, 사람, 자료가 축적됩니다.',
  keywords: ['아카이브', '웹진', '에세이', '인터뷰', '기록', 'zine'],
  authors: [{ name: 'AKI 편집부' }],
  creator: 'AKI',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'AKI',
    title: 'AKI — 쌓이는 진',
    description:
      'AKI는 미니멀한 아카이브 진입니다. 매 호마다 하나의 질문을 중심으로 글, 사람, 자료가 축적됩니다.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+KR:wght@300;400;500;600;700&family=Noto+Serif+KR:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 56px)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
