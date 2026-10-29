"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_ITEMS, isActivePath } from "@/data/nav"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden gap-8 md:flex" aria-label="주 네비게이션">
      {NAV_ITEMS.map(({ href, label }) => {
        const isActive = isActivePath(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            className={`nav-link pb-1 ${isActive ? "nav-link-active" : "nav-link-inactive"}`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
