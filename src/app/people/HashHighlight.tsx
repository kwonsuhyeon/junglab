"use client"

import { useEffect } from "react"

// /people#member-{slug}로 들어오면 그 카드로 스크롤한다 (클라이언트 이동 시 기본 해시 스크롤이 안 될 때 대비)
export default function HashHighlight() {
  useEffect(() => {
    function scrollToHash() {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id.startsWith("member-")) return
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    scrollToHash()
    window.addEventListener("hashchange", scrollToHash)
    return () => window.removeEventListener("hashchange", scrollToHash)
  }, [])

  return null
}
