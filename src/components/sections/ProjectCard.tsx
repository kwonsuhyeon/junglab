import Link from "next/link"
import type { Area } from "@/data/areas"

// 홈의 연구 분야 카드 — 누르면 /project?area={slug}
export function AreaCard({ area, count }: { area: Area; count: number }) {
  return (
    <Link href={`/project?area=${area.slug}`} className="group block h-full">
      <article className="card-default h-full flex flex-col p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug">
            {area.name}
          </h3>
          <span className="shrink-0 text-xs font-semibold text-emerald-600">{count}건</span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1 break-keep">{area.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {area.topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
            >
              {topic}
            </span>
          ))}
        </div>
      </article>
    </Link>
  )
}
