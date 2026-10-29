"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_ITEMS, isActivePath } from "@/data/nav"

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div id="mobile-nav-menu" className="absolute left-0 right-0 top-16 z-40 border-b border-slate-700 bg-slate-900 px-4 py-4 shadow-xl">
          <nav className="flex flex-col gap-1" aria-label="모바일 네비게이션">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = isActivePath(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
