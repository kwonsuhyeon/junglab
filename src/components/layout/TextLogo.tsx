import { site } from "@/lib/data"

// 로고 이미지가 생기기 전까지 쓰는 텍스트 로고 — 기존 이미지 로고와 같은 h-8(32px) 안에 맞춘다
export default function TextLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-8 items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-extrabold text-white">
        {site.logoText.charAt(0)}
      </span>
      <span className="text-base font-bold tracking-tight text-white sm:text-lg">{site.logoText}</span>
    </span>
  )
}
