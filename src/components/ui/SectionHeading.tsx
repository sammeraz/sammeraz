import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "ink",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const toneClasses = tone === "ink" ? "text-ink" : "text-cream";
  const subToneClasses = tone === "ink" ? "text-ink/65" : "text-cream/70";

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignClasses}`}>
      {eyebrow ? (
        <span
          className={`text-xs font-medium uppercase tracking-[0.2em] ${
            tone === "ink" ? "text-accent" : "text-accent-soft"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] ${toneClasses}`}>
        {title}
      </h2>
      {description ? (
        <p className={`font-body text-base leading-relaxed ${subToneClasses}`}>{description}</p>
      ) : null}
    </Reveal>
  );
}
