
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 메뉴 이름에 맞춰 바꾼 주소 — 예전 주소(공유된 링크)로 들어와도 새 주소로 보낸다
  async redirects() {
    return [
      { source: "/about", destination: "/people", permanent: true },
      { source: "/research", destination: "/project", permanent: true },
      { source: "/activities", destination: "/workshop", permanent: true },
    ]
  },
  // service worker는 항상 최신본을 받도록 캐시 금지
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        ],
      },
    ]
  },
}

export default nextConfig
