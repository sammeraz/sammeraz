import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "dark" | "light" | "outline-light" | "outline-dark";

const variantClasses: Record<Variant, string> = {
  dark: "bg-ink text-cream hover:bg-accent",
  light: "bg-cream text-ink hover:bg-white",
  "outline-light": "border border-cream/35 text-cream hover:bg-cream/10",
  "outline-dark": "border border-ink/25 text-ink hover:bg-ink/5",
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
}

interface NativeButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({ variant = "dark", className = "", children, ...rest }: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (rest.href) {
    return (
      <Link href={rest.href} target={rest.target} rel={rest.rel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
