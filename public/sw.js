/**
 * lab_site service worker — 1단계 (설치 + 오프라인 폴백)
 *
 * - 오프라인 폴백 페이지(/offline.html, 외부 리소스 없는 단일 파일)만 캐시한다.
 * - 페이지·이미지는 캐시하지 않고 항상 네트워크로 요청한다.
 *   (배포 직후 새 데이터가 바로 보이게)
 * - 페이지 이동(navigate) 요청이 네트워크 오류로 실패할 때만 /offline.html을 보여준다.
 */

const CACHE_VERSION = "lab-site-v1"
const OFFLINE_URL = "/offline.html"

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: "reload" })))
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cache = await caches.open(CACHE_VERSION)
      return (await cache.match(OFFLINE_URL)) || Response.error()
    })
  )
})
