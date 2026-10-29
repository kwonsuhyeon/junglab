// 연구 분야 7개 — 분류 기준(criteria)은 US-010에서 Claude가 논문을 분류할 때 그대로 쓴다
import areasJson from "./areas.json"

export interface Area {
  slug: string
  name: string
  description: string
  topics: string[]
  criteria: string
  links: { label: string; href: string }[]
}

export const AREAS = areasJson as Area[]

export const areaName = (slug: string) => AREAS.find((a) => a.slug === slug)?.name ?? slug
