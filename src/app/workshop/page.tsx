import type { Metadata } from "next"
import { activities, type Activity } from "@/lib/data"

export const metadata: Metadata = {
  title: "Workshop",
  description: "연구실이 진행한 워크숍과 컨설팅",
}

const SECTIONS: { type: Activity["type"]; label: string; eyebrow: string }[] = [
  { type: "workshop", label: "워크숍·특강", eyebrow: "Workshop" },
  { type: "consulting", label: "컨설팅", eyebrow: "Consulting" },
]

export default function ActivitiesPage() {
  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            워크숍·컨설팅
          </span>
          <h1 className="page-hero-title">Workshop</h1>
          <p className="page-hero-subtitle">연구 방법과 데이터 분석을 현장에 나눈 기록이에요.</p>
        </div>
      </section>

      <div className="section-container py-16 space-y-16">
        {SECTIONS.map((section) => {
          const list = activities.filter((a) => a.type === section.type)
          return (
            <section key={section.type} aria-labelledby={`${section.type}-heading`}>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">{section.eyebrow}</p>
                <h2 id={`${section.type}-heading`} className="text-2xl font-bold text-slate-900">{section.label}</h2>
              </div>

              {list.length > 0 ? (
                <div className="space-y-0">
                  {list.map((item) => (
                    <div key={item.id} className="relative pl-8 pb-10 last:pb-0 border-l-2 border-slate-200">
                      <span className="absolute -left-[9px] top-0.5 h-4 w-4 rounded-full border-2 border-emerald-500 bg-white" />
                      <p className="text-xs text-slate-400 mb-1.5">{item.date}</p>
                      <h3 className="font-semibold text-slate-900 leading-snug mb-1 break-keep">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
                            {item.title} ↗
                          </a>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2">{item.org}</p>
                      {item.desc && <p className="text-sm text-slate-500 leading-relaxed break-keep">{item.desc}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center">
                  <p className="text-slate-400">준비 중이에요.</p>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
