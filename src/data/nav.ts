// 메뉴는 이 배열 하나에서 관리한다 (Navigation, MobileNav, Footer 공용)
export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/people", label: "People" },
  { href: "/project", label: "Project" },
  { href: "/workshop", label: "Workshop" },
]

export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href)
