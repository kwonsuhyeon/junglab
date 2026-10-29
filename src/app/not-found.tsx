import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 — 페이지를 찾을 수 없습니다",
}

export default function NotFound() {
  return (
    <div className="bg-slate-900 flex items-center justify-center min-h-[70vh]">
      <div className="text-center px-4">
        <p className="text-8xl font-extrabold text-emerald-500 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-slate-400 mb-8 max-w-sm mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary btn-md">
            홈으로 돌아가기
          </Link>
          <Link href="/project" className="btn-dark btn-md">
            연구 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
