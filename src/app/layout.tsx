import type { Metadata, Viewport } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ScrollToTop from "@/components/ui/ScrollToTop"
import ServiceWorkerRegister from "@/components/layout/ServiceWorkerRegister"
import { site } from "@/lib/data"
import "./globals.css"

const description = site.tagline || `${site.affiliation} ${site.name}`

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    title: site.name,
    description,
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
}

export const viewport: Viewport = {
  themeColor: "#0F172A",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* Pretendard font via CDN */}
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col bg-white">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
          <ServiceWorkerRegister />
        </div>
      </body>
    </html>
  )
}
