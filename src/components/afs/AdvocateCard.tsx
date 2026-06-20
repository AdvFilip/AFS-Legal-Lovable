import type { Advocate } from "@/lib/afs-data";
import { Reveal } from "./primitives";

export function AdvocateCard({ a, index }: { a: Advocate; index: number }) {
  return (
    <Reveal
      delay={(index % 4) * 0.08}
      className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-14 py-14 border-t border-[color:var(--color-hairline-soft)]"
    >
      <div className="relative">
        <div className="aspect-[4/5] bg-[color:var(--color-paper-warm)] border border-[color:var(--color-hairline-soft)] flex items-center justify-center overflow-hidden">
          <span className="font-display text-7xl md:text-8xl text-[color:var(--color-gold-deep)]/80 group-hover:text-[color:var(--color-gold-deep)] transition-colors">
            {a.initials}
          </span>
          <div className="absolute bottom-4 left-4 right-4 h-px bg-[color:var(--color-gold)]" />
        </div>
      </div>
      <div>
        <div className="eyebrow text-[0.6rem] mb-4">{a.designation}</div>
        <h3 className="serif-heading text-3xl md:text-4xl text-[color:var(--color-text-strong)] mb-2">
          {a.honorific} {a.name}
        </h3>
        <div className="text-[0.78rem] tracking-wide text-[color:var(--color-gold-deep)] mb-6">
          {a.quals}
        </div>
        <div className="h-px w-12 bg-[color:var(--color-gold)] mb-6" />
        <p className="text-[0.95rem] leading-[1.95] text-[color:var(--color-text-muted)] max-w-2xl">
          {a.bio}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {a.focus.map((s) => (
            <span
              key={s}
              className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--color-text-muted)] border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-warm)] px-3 py-1.5"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}