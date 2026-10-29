import type { Metadata } from "next"
import { Suspense } from "react"
import ResearchList from "./ResearchList"
import { AREAS, members, professor, researchItems } from "@/lib/data"

export const metadata: Metadata = {
  title: "Project",
  description: "연구 분야별 논문·보고서·학위논문",
}

export default function ResearchPage() {
  // ?member= 필터에서 이름을 보여 주려고 교수까지 포함한 사람 목록을 넘긴다
  const people = [{ slug: professor.slug, name: professor.name }, ...members.map((m) => ({ slug: m.slug, name: m.name }))]

  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            연구
          </span>
          <h1 className="page-hero-title">Project</h1>
          <p className="page-hero-subtitle">분야별 논문과 연구보고서를 한곳에 모았어요.</p>
        </div>
      </section>

      <div className="section-container py-12">
        <Suspense fallback={<div className="skeleton h-96 w-full" />}>
          <ResearchList items={researchItems} areas={AREAS} people={people} />
        </Suspense>
      </div>
    </div>
  )
}
