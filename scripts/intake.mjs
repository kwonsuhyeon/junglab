// _intake/의 입력 폼 산출물을 src/data/*.json으로 바꾼다 (US-003)
// - lab-intake.html → lab-content.md, members.csv, activities.csv
// - public/edit/research.html(온라인 공개) → publications.csv, reports.csv, theses.csv
// 파일이 아직 없으면 각 폼의 DEFAULTS를 쓴다 — 기본값은 폼 한 곳에만 둔다
// 변환이 끝나면 research.html의 DEFAULTS를 방금 읽은 연구 목록으로 갈아 끼워, 온라인 폼이 최신 목록을 보여 주게 한다
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const INTAKE_DIR = "_intake"
const LAB_FORM = join(INTAKE_DIR, "lab-intake.html")
const RESEARCH_FORM = join("public", "edit", "research.html")
const RESEARCH_TABLES = ["publications", "reports", "theses"]
const OUT_DIR = join("src", "data")
const SLUG_RE = /^[a-z]+(-[a-z]+)+$/
const PROFESSOR_SLUG = "professor"

const areas = JSON.parse(readFileSync(join(OUT_DIR, "areas.json"), "utf8"))
const errors = []
const fail = (where, msg) => errors.push(`${where}: ${msg}`)

// ---------- 폼 기본값 ----------
function defaultsRange(html, file) {
  const start = html.indexOf("const DEFAULTS = {")
  const end = html.indexOf("\n}\n", start)
  if (start < 0 || end < 0) throw new Error(`${file}에서 DEFAULTS를 찾지 못함`)
  return [start + "const DEFAULTS = ".length, end + 2]
}

function readFormDefaults(file) {
  const html = readFileSync(file, "utf8")
  const [start, end] = defaultsRange(html, file)
  return new Function(`return (${html.slice(start, end)})`)()
}

function writeFormDefaults(file, data) {
  const html = readFileSync(file, "utf8")
  const [start, end] = defaultsRange(html, file)
  writeFileSync(file, html.slice(0, start) + JSON.stringify(data, null, 2) + html.slice(end), "utf8")
}

// ---------- 파서 (lab-intake.html의 parseCsv·parseMd와 같은 규칙) ----------
function parseCsv(text) {
  text = text.replace(/^﻿/, "")
  const rows = []
  let row = [], cur = "", q = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++ }
      else if (c === '"') q = false
      else cur += c
    } else if (c === '"') q = true
    else if (c === ",") { row.push(cur); cur = "" }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++
      row.push(cur); rows.push(row); row = []; cur = ""
    } else cur += c
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row) }
  const [head, ...body] = rows.filter((r) => r.some((v) => v !== ""))
  if (!head) return []
  // __line: 원본 파일의 줄 번호(머리글이 1줄) — 오류 위치 안내용
  return body.map((r, i) => ({ ...Object.fromEntries(head.map((k, j) => [k, (r[j] ?? "").trim()])), __line: i + 2 }))
}

function parseMd(text) {
  const out = {}
  let section = null, tableKeys = null
  const unescape = (v) => v.replace(/ ⏎ /g, "\n").trim()
  text.split(/\r?\n/).forEach((line) => {
    const h = line.match(/^## (\w+)/)
    if (h) { section = h[1]; tableKeys = null; return }
    if (!section) return
    const kv = line.match(/^- (\w+): ?(.*)$/)
    if (kv) { (out[section] ??= {})[kv[1]] = unescape(kv[2]); return }
    if (line.startsWith("|")) {
      const cells = line.slice(1, -1).split(/(?<!\\)\|/).map((c) => unescape(c.replace(/\\\|/g, "|")))
      if (!tableKeys) { tableKeys = cells; out[section] = []; return }
      if (cells.every((c) => /^-+$/.test(c))) return
      out[section].push(Object.fromEntries(tableKeys.map((k, i) => [k, cells[i] ?? ""])))
    }
  })
  return out
}

// ---------- 입력 읽기 ----------
const defaults = {
  ...readFormDefaults(LAB_FORM),
  ...readFormDefaults(RESEARCH_FORM),
}
const sources = {}

function readTable(name) {
  const file = join(INTAKE_DIR, `${name}.csv`)
  if (existsSync(file)) {
    sources[name] = file
    return parseCsv(readFileSync(file, "utf8"))
  }
  sources[name] = "폼 기본값"
  return (defaults[name] ?? []).map((r, i) => ({ ...r, __line: i + 1 }))
}

const mdFile = join(INTAKE_DIR, "lab-content.md")
const md = existsSync(mdFile) ? parseMd(readFileSync(mdFile, "utf8")) : {}
sources.content = existsSync(mdFile) ? mdFile : "폼 기본값"
const lab = { ...defaults.lab, ...md.lab }
const prof = { ...defaults.professor, ...md.professor }
const education = md.education ?? defaults.education
const career = md.career ?? defaults.career
const kci = { ...defaults.kci, ...md.kci }
const affiliations = md.affiliations ?? defaults.affiliations

const memberRows = readTable("members")
const publicationRows = readTable("publications")
const thesisRows = readTable("theses")
const reportRows = readTable("reports")
const activityRows = readTable("activities")

// ---------- 공통 변환 ----------
const lines = (v) => String(v ?? "").split("\n").map((s) => s.trim()).filter(Boolean)
const AREA_BY_NAME = new Map(areas.flatMap((a) => [[a.name, a.slug], [a.slug, a.slug]]))

function toAreaSlugs(value, where) {
  return String(value ?? "")
    .split(/[\/,·]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => {
      const slug = AREA_BY_NAME.get(name)
      if (!slug) fail(where, `알 수 없는 분야 "${name}" (가능: ${areas.map((a) => a.name).join(", ")})`)
      return slug
    })
    .filter(Boolean)
}

// ---------- 검증 + 변환 ----------
if (!lab.name) fail(`${sources.content} [lab]`, "랩 이름(name)이 비어 있음")
if (!prof.name) fail(`${sources.content} [professor]`, "교수 이름(name)이 비어 있음")

const seenSlugs = new Map()
const members = memberRows.map((r) => {
  const where = `${sources.members} ${r.__line}째 줄`
  if (!r.name) fail(where, "이름이 비어 있음")
  if (!r.status) fail(where, "과정이 비어 있음")
  if (!SLUG_RE.test(r.slug ?? "")) fail(where, `slug "${r.slug ?? ""}" 형식 오류 (소문자 성-이름, 예: kwon-suhyeon)`)
  if (seenSlugs.has(r.slug)) fail(where, `slug "${r.slug}" 중복 (먼저 나온 곳: ${seenSlugs.get(r.slug)})`)
  seenSlugs.set(r.slug, where)
  return {
    slug: r.slug,
    name: r.name,
    status: r.status,
    topic: r.topic || "",
    email: r.email || "",
    photo: r.photo || "",
    kciName: r.kciName || r.name,
  }
})

// 참여자 이름 → slug (교수 + 구성원). 랩 밖 사람은 null
const people = new Map([[prof.name, PROFESSOR_SLUG], ...members.flatMap((m) => [[m.name, m.slug], [m.kciName, m.slug]])])
const toParticipants = (value) =>
  String(value ?? "").split(/[,·\/]/).map((s) => s.trim()).filter(Boolean)
    .map((name) => ({ name, memberSlug: people.get(name) ?? null }))

const theses = thesisRows.map((r, i) => ({
  id: `thesis-${String(i + 1).padStart(2, "0")}`,
  type: "thesis",
  author: r.author,
  memberSlug: people.get(r.author) ?? null,
  title: r.title,
  degree: r.degree,
  school: r.school,
  year: r.year,
  link: r.link,
}))

// 논문 원문 칸: .pdf면 원문 PDF, 그 밖의 URL은 "KCI에서 보기"(kciUrl) 자리에 건다
const seenIds = new Map()
const publications = publicationRows.map((r) => {
  const where = `${sources.publications} ${r.__line}째 줄`
  if (!r.id) fail(where, "id가 비어 있음 (research.html의 '+ 논문 추가'로 만들면 자동으로 붙음)")
  if (!r.title) fail(where, "제목이 비어 있음")
  if (seenIds.has(r.id)) fail(where, `id "${r.id}" 중복 (먼저 나온 곳: ${seenIds.get(r.id)})`)
  seenIds.set(r.id, where)
  const link = r.link || ""
  const isFile = /\.pdf$/i.test(link)
  return {
    id: r.id,
    type: r.type === "저서" ? "book" : "article",
    title: r.title,
    journal: r.journal || "",
    volume: r.volume || "",
    year: String(r.date || "").slice(0, 4),
    date: r.date || "",
    doi: r.doi || "",
    kciUrl: isFile ? "" : link,
    authors: toParticipants(r.authors || prof.name).map((a) => ({
      ...a,
      role: a.memberSlug === PROFESSOR_SLUG ? r.role || "" : "",
    })),
    areas: toAreaSlugs(r.areas, where),
    summary: r.summary || "",
    approved: r.show !== "N",
    pdf: isFile ? link : "",
  }
})

const reports = reportRows.map((r, i) => {
  const where = `${sources.reports} ${r.__line}째 줄`
  if (!r.title) fail(where, "제목이 비어 있음")
  const isFile = /\.pdf$/i.test(r.link ?? "")
  return {
    id: `report-${String(i + 1).padStart(2, "0")}`,
    type: "report",
    title: r.title,
    client: r.client,
    year: r.year,
    period: r.period || "",
    role: r.role || "",
    status: r.status || "완료",
    participants: toParticipants(r.participants),
    areas: toAreaSlugs(r.areas, where),
    pdf: isFile ? r.link : "",
    link: isFile ? "" : r.link || "",
  }
})

const activities = activityRows.map((r, i) => ({
  id: `activity-${String(i + 1).padStart(2, "0")}`,
  type: r.type === "컨설팅" ? "consulting" : "workshop",
  title: r.title,
  date: r.date,
  org: r.org,
  desc: r.desc,
  link: r.link,
}))

const site = {
  name: lab.name,
  nameKo: lab.nameKo || "",
  logoText: lab.logoText || lab.name,
  affiliation: lab.affiliation,
  tagline: lab.tagline || "",
  taglineSub: lab.taglineSub || "",
  email: lab.email,
  phone: lab.phone,
  address: lab.address || "",
  kci: {
    authorName: kci.authorName || prof.name,
    startYear: kci.startYear || "",
    affiliations: affiliations.map((a) => a.name).filter(Boolean),
  },
}

const professor = {
  slug: PROFESSOR_SLUG,
  name: prof.name,
  romanSlug: prof.slug,
  title: prof.title,
  dept: prof.dept,
  email: prof.email,
  phone: prof.phone,
  photo: prof.photo,
  bio: prof.bio || "",
  areas: lines(prof.areas),
  awards: lines(prof.awards),
  education: education.map((e) => ({ degree: e.degree, school: e.school, major: e.major, year: e.year })),
  career: career.map((c) => ({ period: c.period, org: c.org, role: c.role })),
}

if (errors.length) {
  console.error(`입력 오류 ${errors.length}건 — src/data는 바꾸지 않았음\n`)
  errors.forEach((e) => console.error("  - " + e))
  process.exit(1)
}

// ---------- 쓰기 ----------
mkdirSync(OUT_DIR, { recursive: true })
const outputs = { site, professor, members, publications, theses, reports, activities }
for (const [name, data] of Object.entries(outputs)) {
  writeFileSync(join(OUT_DIR, `${name}.json`), JSON.stringify(data, null, 2) + "\n", "utf8")
}

// 온라인 연구 목록 폼의 기본값을 방금 반영한 목록으로 맞춘다 (csv를 넣었을 때만)
const rowsByTable = { publications: publicationRows, reports: reportRows, theses: thesisRows }
const formData = readFormDefaults(RESEARCH_FORM)
let formUpdated = false
for (const name of RESEARCH_TABLES) {
  if (sources[name] === "폼 기본값") continue
  formData[name] = rowsByTable[name].map(({ __line, ...row }) => row)
  formUpdated = true
}
if (formUpdated) writeFormDefaults(RESEARCH_FORM, formData)

console.log("src/data 생성 완료")
console.log(`  기본 정보·교수: ${sources.content}`)
for (const name of ["members", "publications", "theses", "reports", "activities"]) {
  console.log(`  ${name}.json ${outputs[name].length}건 ← ${sources[name]}`)
}
if (formUpdated) console.log(`  ${RESEARCH_FORM} 기본 목록도 갱신함 → 커밋·푸시하면 온라인 폼에 반영`)
