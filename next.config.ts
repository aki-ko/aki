import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 외부 이미지 허용 (필요 시 추가)
  images: {
    remotePatterns: [],
  },
  // 빌드 타임 타입 에러 무시 (개발 편의)
  typescript: {
    ignoreBuildErrors: false,
  },
  // 샌드박스 환경 HMR 허용
  allowedDevOrigins: [
    '3000-i3ubueeerj1pg6g70t4t1-de59bda9.sandbox.novita.ai',
    '*.sandbox.novita.ai',
  ],
};

export default nextConfig;
