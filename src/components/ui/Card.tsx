import { type ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  dark?: boolean
}

export function Card({ children, className = "", hoverable = false, dark = false }: CardProps) {
  const base = dark
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-200"

  return (
    <div
      className={[
        "rounded-xl border overflow-hidden transition-all duration-200",
        base,
        hoverable ? "shadow-card hover:shadow-cardHover hover:-translate-y-0.5" : "shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

interface CardBodyProps {
  children: ReactNode
  className?: string
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={className}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`mt-4 border-t border-slate-100 pt-4 ${className}`}>
      {children}
    </div>
  )
}
