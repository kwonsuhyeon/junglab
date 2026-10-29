import Link from "next/link"
import Badge from "@/components/ui/Badge"
import { areaName } from "@/data/areas"
import { TYPE_LABEL, memberHref, type ResearchItem } from "@/lib/data"

// 연구 페이지·홈의 논문·보고서 한 항목
export default function ContentCard({ item, compact = false }: { item: ResearchItem; compact?: boolean }) {
  return (
    <article className="card-default h-full flex flex-col p-6">
      {/* 유형·분야 */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <Badge variant="primary" size="sm">{TYPE_LABEL[item.type]}</Badge>
        {!compact && item.areas.map((slug) => (
          <Badge key={slug} variant="accent" size="sm">{areaName(slug)}</Badge>
        ))}
        <span className="ml-auto text-xs font-semibold text-emerald-600">{item.year}</span>
      </div>

      {/* 제목·출처 */}
      <h3 className={`text-base font-semibold text-slate-900 leading-snug break-keep ${compact ? "line-clamp-2" : ""}`}>
        {item.title}
      </h3>
      {item.venue && <p className="mt-1 text-sm text-slate-500">{item.venue}</p>}
      {!compact && item.note && <p className="mt-0.5 text-xs text-slate-400">{item.note}</p>}

      {/* 요약 */}
      {!compact && item.summary && (
        <p className="mt-3 text-sm text-slate-600 leading-relaxed break-keep">{item.summary}</p>
      )}

      {!compact && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {/* 참여자: 랩 구성원은 About 카드로 연결 */}
          <p className="text-sm text-slate-500">
            {item.participants.map((p, i) => (
              <span key={`${p.name}-${i}`}>
                {i > 0 && ", "}
                {p.memberSlug ? (
                  <Link href={memberHref(p.memberSlug)} className="font-medium text-indigo-600 hover:text-indigo-700">
                    {p.name}
                  </Link>
                ) : (
                  p.name
                )}
              </span>
            ))}
          </p>

          {/* 원문 */}
          {item.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline btn-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  )
}
