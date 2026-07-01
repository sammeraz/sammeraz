"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";

type Variant = "dark" | "light" | "outline-light" | "outline-dark";

const variantClasses: Record<Variant, string> = {
  dark: "bg-ink text-cream hover:bg-accent",
  light: "bg-cream text-ink hover:bg-white",
  "outline-light": "border border-cream/35 text-cream hover:bg-cream/10",
  "outline-dark": "border border-ink/25 text-ink hover:bg-ink/5",
};

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50";

const MAGNETIC_STRENGTH = 0.3;
const MAGNETIC_MAX = 14;

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Set false to omit the trailing sliding arrow. */
  arrow?: boolean;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

interface NativeButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({
  variant = "dark",
  className = "",
  children,
  arrow = true,
  ...rest
}: ButtonProps) {
  const isFinePointer = useIsFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (!isFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relX * MAGNETIC_STRENGTH)));
    y.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relY * MAGNETIC_STRENGTH)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = `${base} ${variantClasses[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      ) : null}
    </>
  );

  return (
    <motion.span
      className="inline-block"
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.94 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {rest.href ? (
        <Link
          href={rest.href}
          target={rest.target}
          rel={rest.rel}
          onClick={rest.onClick}
          className={classes}
        >
          {content}
        </Link>
      ) : (
        <button className={classes} {...rest}>
          {content}
        </button>
      )}
    </motion.span>
  );
}
