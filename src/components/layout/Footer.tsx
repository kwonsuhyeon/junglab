import Link from "next/link"
import TextLogo from "./TextLogo"
import { NAV_ITEMS } from "@/data/nav"
import { site } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-3">
              <TextLogo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {site.affiliation}
              {site.address && <><br />{site.address}</>}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            >
              {site.email}
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="푸터 네비게이션">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              페이지
            </p>
            <ul className="space-y-2">
              {NAV_ITEMS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
