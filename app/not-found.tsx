import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '5rem',
          fontWeight: 700,
          color: 'var(--border-light)',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--charcoal)',
          marginBottom: '0.5rem',
        }}
      >
        페이지를 찾을 수 없습니다
      </h1>
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
          lineHeight: 1.7,
        }}
      >
        요청한 페이지가 없거나 이동되었습니다.
        <br />
        기록은 남지만, 이 주소는 남지 않았습니다.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.6rem 1.25rem',
          backgroundColor: 'var(--charcoal)',
          color: 'var(--ivory)',
          fontSize: '0.78rem',
          fontWeight: 500,
          borderRadius: '2px',
          textDecoration: 'none',
        }}
      >
        <ArrowLeft size={13} />
        홈으로 돌아가기
      </Link>
    </div>
  );
}
