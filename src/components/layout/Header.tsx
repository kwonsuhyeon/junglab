import Link from "next/link"
import Navigation from "./Navigation"
import MobileNav from "./MobileNav"
import TextLogo from "./TextLogo"
import { site } from "@/lib/data"

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-700/50"
      style={{ background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
          aria-label={`${site.name} 홈으로`}
        >
          <TextLogo className="transition-opacity duration-200 group-hover:opacity-80" />
        </Link>

        {/* Desktop Navigation */}
        <Navigation />

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  )
}
