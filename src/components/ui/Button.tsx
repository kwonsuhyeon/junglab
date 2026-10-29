import { type ButtonHTMLAttributes, type ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const variantStyles: Record<string, string> = {
    primary:
      "bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500 shadow-md hover:shadow-lg",
    secondary:
      "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white focus:ring-emerald-500",
    ghost:
      "text-slate-300 hover:text-white hover:bg-slate-700 focus:ring-slate-500",
    dark:
      "bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 focus:ring-slate-500",
  }

  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3.5 text-lg",
  }

  return (
    <button
      className={[
        "inline-flex items-center justify-center font-medium rounded-lg",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  )
}
