import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";

export type Tone = "paper" | "warm" | "ink";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: PropsWithChildren<{ className?: string; delay?: number }>) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  number,
  invert = false,
}: {
  children: ReactNode;
  number?: string;
  invert?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`h-px w-8 ${invert ? "bg-[color:var(--color-gold-pale)]" : "bg-[color:var(--color-gold-deep)]"}`} />
      <span className={`eyebrow text-[0.55rem] ${invert ? "text-[color:var(--color-gold-pale)]" : ""}`}>
        {number && <span className="opacity-50 mr-3">{number}</span>}
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  children,
  em,
  invert = false,
}: {
  children: ReactNode;
  em?: string;
  invert?: boolean;
}) {
  return (
    <h2
      className={`font-serif font-bold text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] max-w-3xl leading-tight tracking-tight ${
        invert ? "text-[color:var(--color-text-invert)]" : "text-[color:var(--color-text-strong)]"
      }`}
    >
      {children}
      {em && (
        <em
          className={`italic font-serif font-bold ${
            invert ? "text-[color:var(--color-gold-pale)]" : "text-[color:var(--color-gold-deep)]"
          }`}
        >
          {" "}
          {em}
        </em>
      )}
    </h2>
  );
}

export function GoldButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const cls =
    "inline-flex items-center justify-center gap-3 px-8 py-3 min-h-11 bg-[color:var(--color-gold-deep)] text-[color:var(--color-ink-deep)] text-[0.65rem] tracking-[0.34em] uppercase font-semibold transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color:var(--color-gold-pale)] hover:shadow-lg hover:shadow-[rgba(212,175,55,0.2)] active:scale-95 " +
    className;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  href,
  onClick,
  className = "",
  invert = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  invert?: boolean;
}) {
  const base = invert
    ? "border border-[color:var(--color-hairline-invert)] text-[color:var(--color-gold-pale)] hover:border-[color:var(--color-gold-pale)] hover:bg-white/5 hover:shadow-lg hover:shadow-[rgba(212,175,55,0.1)]"
    : "border border-[color:var(--color-hairline)] text-[color:var(--color-gold-deep)] hover:border-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold-dim)] hover:shadow-md hover:shadow-[rgba(212,175,55,0.1)]";
  const cls = `inline-flex items-center justify-center gap-3 px-8 py-3 min-h-11 text-[0.65rem] tracking-[0.34em] uppercase font-semibold transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-95 ${base} ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone = "paper",
}: PropsWithChildren<{ id?: string; className?: string; tone?: Tone }>) {
  const bg =
    tone === "ink"
      ? "bg-[color:var(--color-ink-deep)] text-[color:var(--color-text-invert)]"
      : tone === "warm"
        ? "bg-[color:var(--color-paper-warm)]"
        : "bg-[color:var(--color-paper)]";
  return (
    <section
      id={id}
      className={`relative ${bg} px-6 md:px-12 lg:px-24 py-28 md:py-36 lg:py-48 ${className}`}
    >
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}