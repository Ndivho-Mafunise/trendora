import { cn } from "@/lib/utils";

const variantClasses = {
  primary:
    "bg-ink text-paper hover:bg-clay-deep shadow-sm",
  secondary:
    "bg-clay-tint text-clay hover:bg-clay hover:text-paper",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink-soft hover:text-ink hover:bg-ink/[0.04]",
  destructive: "bg-danger-tint text-danger hover:bg-danger hover:text-paper",
};

const sizeClasses = {
  sm: "h-9 px-4 text-xs tracking-wide rounded-md",
  md: "h-11 px-6 text-sm rounded-md",
  lg: "h-13 px-8 text-sm tracking-wide rounded-md",
  icon: "h-10 w-10 rounded-md",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
