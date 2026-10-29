"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ContentCard from "@/components/sections/ContentCard"
import type { Area } from "@/data/areas"
import { TYPE_LABEL, type ResearchItem, type ResearchType } from "@/lib/data"

interface Props {
  items: ResearchItem[]
  areas: Area[]
  people: { slug: string; name: string }[]
}

const TYPE_ORDER: ResearchType[] = ["article", "report", "book", "thesis"]

export default function ResearchList({ items, areas, people }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const areaSlug = params.get("area") ?? ""
  const memberSlug = params.get("member") ?? ""
  const type = (params.get("type") ?? "") as ResearchType | ""

  const area = areas.find((a) => a.slug === areaSlug)
  const person = people.find((p) => p.slug === memberSlug)

  // 탭 건수는 구성원·유형 필터를 적용한 뒤의 수
  const base = items.filter(
    (item) =>
      (!person || item.participants.some((p) => p.memberSlug === person.slug)) &&
      (!type || item.type === type),
  )
  const visible = area ? base.filter((item) => item.areas.includes(area.slug)) : base

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    const qs = next.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const tabs = [{ slug: "", name: "전체", count: base.length }, ...areas.map((a) => ({
    slug: a.slug,
    name: a.name,
    count: base.filter((item) => item.areas.includes(a.slug)).length,
  }))]

  return (
    <div>
      {/* 분야 탭 */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="연구 분야">
        {tabs.map((tab) => (
          <button
            key={tab.slug || "all"}
            type="button"
            role="tab"
            aria-selected={tab.slug === (area?.slug ?? "")}
            onClick={() => setParam("area", tab.slug)}
            className={`filter-tab ${tab.slug === (area?.slug ?? "") ? "filter-tab-active" : "filter-tab-inactive"}`}
          >
            {tab.name} <span className="opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* 유형 필터 */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-400">유형</span>
        {[{ key: "", label: "전체" }, ...TYPE_ORDER.map((t) => ({ key: t, label: TYPE_LABEL[t] }))].map((t) => (
          <button
            key={t.key || "all"}
            type="button"
            onClick={() => setParam("type", t.key)}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              type === t.key ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 분야 소개 */}
      {area && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-slate-900">{area.name}</h2>
          <p className="mt-1 text-sm text-slate-600 break-keep">{area.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {area.topics.map((topic) => (
              <span key={topic} className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                {topic}
              </span>
            ))}
            {area.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-xs font-medium text-indigo-600 hover:text-indigo-700"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 구성원 필터 안내 */}
      {person && (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span>
            <Link href={`/people#member-${person.slug}`} className="font-semibold hover:underline">{person.name}</Link> 참여 연구 {base.length}건
          </span>
          <button type="button" onClick={() => setParam("member", "")} className="font-medium text-emerald-700 hover:underline">
            필터 해제
          </button>
        </div>
      )}

      {/* 목록 */}
      <div className="mt-8">
        {visible.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {visible.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 py-20 text-center">
            <p className="text-slate-400">이 분야의 연구는 준비 중이에요.</p>
          </div>
        )}
      </div>
    </div>
  )
}
