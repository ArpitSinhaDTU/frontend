import { ReactNode, HTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-none p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: "neutral" | "green" | "amber" | "red" | "blue";
}) {
  const variants = {
    neutral: "bg-white/10 text-white border border-white/20",
    green: "bg-green-500/20 text-green-400 border border-green-500/30",
    amber: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    red: "bg-red-500/20 text-red-400 border border-red-500/30",
    blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "danger";
}) {
  const base = "inline-flex items-center justify-center rounded-none px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 focus:ring-blue-500",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20 focus:ring-white/50",
    outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white focus:ring-white/50",
    danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 focus:ring-red-500",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
