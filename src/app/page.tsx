import type { Metadata } from "next"
import Link from "next/link"
import HeroSection from "@/components/sections/HeroSection"
import ContentCard from "@/components/sections/ContentCard"
import { AreaCard } from "@/components/sections/ProjectCard"
import { AREAS, countByArea, researchItems, site } from "@/lib/data"

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.affiliation}` },
}

export default function HomePage() {
  const recent = researchItems.filter((item) => item.type === "article").slice(0, 3)

  return (
    <>
      <HeroSection
        badge={site.affiliation}
        title={site.nameKo || site.name}
        subtitle={site.tagline || AREAS.map((a) => a.name).join(" · ")}
        note={site.taglineSub}
        primary={{ href: "/project", label: "연구 둘러보기" }}
        secondary={{ href: "/people", label: "연구실 소개" }}
      />

      {/* 연구 분야 */}
      <section className="bg-white py-20" aria-labelledby="areas-heading">
        <div className="section-container">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
              Research Areas
            </p>
            <h2 id="areas-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              연구 분야
            </h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto break-keep">
              평가와 데이터로 교육·훈련의 질문에 답합니다. 분야를 누르면 관련 논문과 보고서를 모아 볼 수 있어요.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map((area) => (
              <AreaCard key={area.slug} area={area} count={countByArea(area.slug)} />
            ))}
          </div>
        </div>
      </section>

      {/* 최근 논문 */}
      <section className="bg-slate-50 py-20" aria-labelledby="recent-heading">
        <div className="section-container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">
                최근 연구
              </p>
              <h2 id="recent-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
                최근 발표한 논문
              </h2>
            </div>
            <Link
              href="/project"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              전체 보기
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {recent.map((item) => (
              <ContentCard key={item.id} item={item} compact />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/project" className="btn-outline btn-md">
              전체 보기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20" aria-labelledby="cta-heading">
        <div className="section-container text-center">
          <div className="mx-auto max-w-2xl">
            <h2 id="cta-heading" className="text-2xl font-bold text-white sm:text-3xl text-balance">
              함께 연구할 분을 기다립니다
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              공동연구, 워크숍, 대학원 진학 문의는 메일로 보내 주세요.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href={`mailto:${site.email}`} className="btn-primary btn-lg w-full sm:w-auto">
                문의하기
              </a>
              <Link href="/workshop" className="btn-dark btn-lg w-full sm:w-auto">
                워크숍·컨설팅 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
