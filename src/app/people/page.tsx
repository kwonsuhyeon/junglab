import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import HashHighlight from "./HashHighlight"
import { MEMBER_GROUPS, countByMember, members, professor, site, thesesOf, type Member } from "@/lib/data"

export const metadata: Metadata = {
  title: "People",
  description: `${site.name} 지도교수와 구성원 소개`,
}

function Avatar({ name, photo, size }: { name: string; photo: string; size: "lg" | "md" }) {
  const box = size === "lg" ? "h-40 w-32" : "h-16 w-16"
  if (photo) {
    return (
      <div className={`relative ${box} shrink-0 overflow-hidden rounded-2xl bg-slate-100`}>
        <Image src={`/people/${photo}`} alt={name} fill className="object-cover" sizes="128px" />
      </div>
    )
  }
  return (
    <div className={`flex ${box} shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white`}>
      {name.charAt(0)}
    </div>
  )
}

function MemberCard({ member }: { member: Member }) {
  const count = countByMember(member.slug)
  const theses = thesesOf(member.slug)
  return (
    <article id={`member-${member.slug}`} className="member-card card-default flex h-full flex-col p-6">
      <div className="flex items-center gap-4">
        <Avatar name={member.name} photo={member.photo} size="md" />
        <div>
          <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
          <p className="text-sm text-slate-500">{member.status}</p>
        </div>
      </div>
      <div className="mt-4 flex-1 space-y-3">
        {member.topic && <p className="text-sm text-slate-600 leading-relaxed break-keep">{member.topic}</p>}
        {theses.map((t) => (
          <div key={t.id}>
            <p className="text-xs font-semibold text-emerald-600">
              {t.degree}학위논문{t.year && ` · ${t.year}`}
            </p>
            <p className="mt-0.5 text-sm text-slate-700 leading-snug break-keep">
              {t.link ? (
                <a href={t.link} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                  {t.title} ↗
                </a>
              ) : (
                t.title
              )}
            </p>
          </div>
        ))}
        {!member.topic && theses.length === 0 && <p className="text-sm text-slate-400">연구 주제 준비 중</p>}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-sm">
        <Link href={`/project?member=${member.slug}`} className="font-medium text-indigo-600 hover:text-indigo-700">
          참여 연구 {count}건
        </Link>
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-slate-600">
            {member.email}
          </a>
        )}
      </div>
    </article>
  )
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <HashHighlight />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="page-hero-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            구성원
          </span>
          <h1 className="page-hero-title">People</h1>
          <p className="page-hero-subtitle">지도교수와 연구실 구성원을 소개해요.</p>
        </div>
      </section>

      <div className="section-container py-16 space-y-20">
        {/* 지도교수 */}
        <section id="member-professor" className="member-card scroll-mt-24" aria-labelledby="professor-heading">
          <h2 id="professor-heading" className="text-2xl font-bold text-slate-900 mb-8">
            지도교수
          </h2>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start mb-10">
            <Avatar name={professor.name} photo={professor.photo} size="lg" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{professor.name}</h3>
              <p className="text-slate-500 text-sm mt-0.5">
                {professor.dept} {professor.title}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                <a href={`mailto:${professor.email}`} className="text-emerald-600 hover:text-emerald-700">
                  {professor.email}
                </a>
                {professor.phone && <span className="ml-3">{professor.phone}</span>}
              </p>
              {professor.bio && <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed break-keep">{professor.bio}</p>}
              {professor.areas.length > 0 && (
                <ul className="mt-4 space-y-1 list-disc pl-4 text-sm text-slate-600">
                  {professor.areas.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* 경력 */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-5">경력</h4>
              <div className="timeline">
                {professor.career.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="timeline-dot" style={{ top: "4px" }} />
                    <p className="timeline-date">{item.period}</p>
                    <p className="timeline-title">{item.role}</p>
                    <p className="timeline-sub">{item.org}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 학력·수상 */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-5">학력</h4>
              <div className="timeline">
                {professor.education.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="timeline-dot" style={{ top: "4px" }} />
                    <p className="timeline-date">{item.year || " "}</p>
                    <p className="timeline-title">{item.school} {item.degree}</p>
                    <p className="timeline-sub">{item.major}</p>
                  </div>
                ))}
              </div>

              {professor.awards.length > 0 && (
                <>
                  <h4 className="mt-10 text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">수상</h4>
                  <ul className="space-y-1 list-disc pl-4 text-sm text-slate-600">
                    {professor.awards.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 구성원 */}
        <section aria-labelledby="members-heading">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500 mb-2">People</p>
            <h2 id="members-heading" className="text-2xl font-bold text-slate-900">구성원</h2>
          </div>

          <div className="space-y-12">
            {MEMBER_GROUPS.map((group) => {
              const list = members.filter((m) => group.statuses.includes(m.status))
              if (list.length === 0) return null
              return (
                <div key={group.label}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    {group.label} · {list.length}명
                  </h3>
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((member) => (
                      <MemberCard key={member.slug} member={member} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
