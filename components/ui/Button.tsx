import * as React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-horizon text-white border border-horizon hover:bg-horizon/90 hover:border-horizon/90",
  outline:
    "border border-white/70 text-white hover:border-white/90 hover:text-white",
  ghost: "text-white hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[10px]",
  md: "h-11 px-6 text-[11px]",
  lg: "h-12 px-8 text-[12px]",
};

const cx = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-sm font-semibold uppercase tracking-[0.25em] transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
