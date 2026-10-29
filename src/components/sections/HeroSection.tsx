import Link from "next/link"

interface HeroSectionProps {
  badge: string
  title: string
  subtitle?: string
  note?: string
  primary: { href: string; label: string }
  secondary?: { href: string; label: string }
}

export default function HeroSection({ badge, title, subtitle, note, primary, secondary }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/30 px-4 py-1.5 text-sm text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance break-keep">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl text-balance break-keep">
              {subtitle}
            </p>
          )}

          {note && <p className="mt-3 text-base text-slate-500 break-keep">{note}</p>}

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={primary.href} className="btn-primary btn-lg w-full sm:w-auto">
              {primary.label}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn-dark btn-lg w-full sm:w-auto">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
