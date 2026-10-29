"use client"

import { useEffect } from "react"

/** 프로덕션에서만 service worker 등록 (dev에서는 HMR과 충돌 방지) */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return
    navigator.serviceWorker.register("/sw.js").catch(() => {})
  }, [])

  return null
}
