// src/data/*.json(npm run intake, npm run kci 산출물)을 타입과 함께 읽는다
import siteJson from "@/data/site.json"
import professorJson from "@/data/professor.json"
import membersJson from "@/data/members.json"
import thesesJson from "@/data/theses.json"
import reportsJson from "@/data/reports.json"
import activitiesJson from "@/data/activities.json"
import publicationsJson from "@/data/publications.json"
import publicationsManualJson from "@/data/publications-manual.json"
import { AREAS } from "@/data/areas"

export interface Site {
  name: string
  nameKo: string
  logoText: string
  affiliation: string
  tagline: string
  taglineSub: string
  email: string
  phone: string
  address: string
}

export interface Professor {
  slug: string
  name: string
  title: string
  dept: string
  email: string
  phone: string
  photo: string
  bio: string
  areas: string[]
  awards: string[]
  education: { degree: string; school: string; major: string; year: string }[]
  career: { period: string; org: string; role: string }[]
}

export interface Member {
  slug: string
  name: string
  status: string
  topic: string
  email: string
  photo: string
}

export interface Participant {
  name: string
  memberSlug: string | null
}

export interface Activity {
  id: string
  type: "workshop" | "consulting"
  title: string
  date: string
  org: string
  desc: string
  link: string
}

// 연구 페이지 목록 한 줄 — 논문·저서·학위논문·보고서를 같은 모양으로 맞춘다
export type ResearchType = "article" | "book" | "thesis" | "report"

export interface ResearchItem {
  id: string
  type: ResearchType
  title: string
  year: string
  venue: string // 학술지·권호, 출판사, 학교, 발주기관
  areas: string[]
  summary: string
  participants: Participant[]
  links: { label: string; href: string }[]
  note: string // 보고서의 역할·상태 등 부가 정보
}

export const site = siteJson as Site
export const professor = professorJson as Professor
export const members = membersJson as Member[]
export const activities = (activitiesJson as Activity[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))

export const TYPE_LABEL: Record<ResearchType, string> = {
  article: "논문",
  book: "저서",
  thesis: "학위논문",
  report: "보고서",
}

// 구성원 과정 묶음 순서 — 졸업생은 맨 아래
export const MEMBER_GROUPS = [
  { label: "박사과정", statuses: ["박사과정"] },
  { label: "석사과정", statuses: ["석사과정"] },
  { label: "연구원", statuses: ["연구원"] },
  { label: "졸업생", statuses: ["박사 졸업", "석사 졸업"] },
]

export const memberHref = (slug: string) => `/people#member-${slug}`

interface PublicationRow {
  id: string
  type: string
  title: string
  journal: string
  volume: string
  year: string
  doi: string
  kciUrl: string
  authors: { name: string; memberSlug: string | null }[]
  areas: string[]
  summary: string
  approved: boolean
  pdf: string
}

function fromPublication(p: PublicationRow): ResearchItem {
  const links = [
    p.pdf && { label: "원문 PDF", href: p.pdf },
    p.kciUrl && { label: "KCI에서 보기", href: p.kciUrl },
    p.doi && { label: "DOI", href: `https://doi.org/${p.doi}` },
  ].filter(Boolean) as ResearchItem["links"]
  return {
    id: p.id,
    type: p.type === "book" ? "book" : "article",
    title: p.title,
    year: p.year,
    venue: [p.journal, p.volume].filter(Boolean).join(" "),
    areas: p.areas,
    summary: p.summary,
    participants: p.authors.map((a) => ({ name: a.name, memberSlug: a.memberSlug })),
    links,
    note: "",
  }
}

interface ReportRow {
  id: string
  title: string
  client: string
  year: string
  period: string
  role: string
  status: string
  participants: Participant[]
  areas: string[]
  pdf: string
  link: string
}

function fromReport(r: ReportRow): ResearchItem {
  const links = [
    r.pdf && { label: "원문 PDF", href: r.pdf },
    r.link && { label: "외부 링크", href: r.link },
  ].filter(Boolean) as ResearchItem["links"]
  return {
    id: r.id,
    type: "report",
    title: r.title,
    year: r.year,
    venue: r.client,
    areas: r.areas,
    summary: "",
    participants: r.participants,
    links,
    note: [r.period, r.role && `교수 ${r.role}`, r.status !== "완료" && r.status].filter(Boolean).join(" · "),
  }
}

export interface ThesisRow {
  id: string
  author: string
  memberSlug: string | null
  title: string
  degree: string
  school: string
  year: string
  link: string
}

function fromThesis(t: ThesisRow): ResearchItem {
  return {
    id: t.id,
    type: "thesis",
    title: t.title,
    year: t.year,
    venue: [t.school, t.degree && `${t.degree}학위논문`].filter(Boolean).join(" "),
    areas: [],
    summary: "",
    participants: [{ name: t.author, memberSlug: t.memberSlug }],
    links: t.link ? [{ label: "외부 링크", href: t.link }] : [],
    note: "",
  }
}

const publications = [
  ...(publicationsJson as PublicationRow[]),
  ...(publicationsManualJson as PublicationRow[]),
].filter((p) => p.approved)

// 제목이 비어 있는 학위논문 행(폼 placeholder)은 싣지 않는다
export const researchItems: ResearchItem[] = [
  ...publications.map(fromPublication),
  ...(reportsJson as ReportRow[]).map(fromReport),
  ...(thesesJson as ThesisRow[]).filter((t) => t.title).map(fromThesis),
].sort((a, b) => b.year.localeCompare(a.year))

export function countByArea(slug: string) {
  return researchItems.filter((item) => item.areas.includes(slug)).length
}

// About 구성원 카드에 보여 줄 학위논문 (박사 → 석사, 최신순)
export function thesesOf(slug: string): ThesisRow[] {
  return (thesesJson as ThesisRow[])
    .filter((t) => t.memberSlug === slug && t.title)
    .sort((a, b) => a.degree.localeCompare(b.degree) || b.year.localeCompare(a.year))
}

export function countByMember(slug: string) {
  return researchItems.filter((item) => item.participants.some((p) => p.memberSlug === slug)).length
}

export { AREAS }
