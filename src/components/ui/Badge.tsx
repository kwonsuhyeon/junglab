import { type ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "accent" | "primary" | "dark" | "neutral"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
}: BadgeProps) {
  const variantStyles: Record<string, string> = {
    accent:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
    primary: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    dark:    "bg-slate-700 text-slate-200 border border-slate-600",
    neutral: "bg-slate-100 text-slate-600 border border-slate-200",
  }

  const sizeStyles: Record<string, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  }

  return (
    <span
      className={[
        "inline-flex items-center rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  )
}
