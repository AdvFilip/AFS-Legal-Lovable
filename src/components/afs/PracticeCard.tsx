import type { ExpertisePillar } from "@/lib/afs-data";
import { Reveal } from "./primitives";

export function PracticeCard({
  p,
  index,
}: {
  p: ExpertisePillar;
  index: number;
}) {
  return (
    <Reveal
      delay={(index % 4) * 0.08}
      className="group relative border-b border-r border-[color:var(--color-hairline-soft)] p-10 md:p-14 bg-[color:var(--color-paper-card)] hover:bg-[color:var(--color-surface-subtle)] transition-all duration-400 overflow-hidden card-hover"
    >
      {/* Premium background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-gold)]/0 to-[color:var(--color-gold)]/0 group-hover:from-[color:var(--color-gold)]/3 group-hover:to-[color:var(--color-gold)]/0 transition-all duration-500 pointer-events-none" />

      {/* Enhanced background number */}
      <div className="absolute top-4 right-6 font-display italic text-7xl text-[color:var(--color-gold)]/8 leading-none select-none pointer-events-none group-hover:text-[color:var(--color-gold)]/12 transition-colors duration-500">
        {p.num}
      </div>

      <div className="relative">
        <div className="eyebrow text-[0.58rem] mb-5 group-hover:text-[color:var(--color-gold-pale)] transition-colors duration-400">
          Pillar {p.num}
        </div>

        <h3 className="font-serif font-bold text-[1.75rem] md:text-[2rem] text-[color:var(--color-text-strong)] mb-5 group-hover:text-[color:var(--color-gold-pale)] transition-colors duration-400 relative max-w-md leading-tight">
          {p.title}
        </h3>

        <p className="text-base leading-relaxed text-[color:var(--color-text-muted)] mb-8 relative max-w-md group-hover:text-[color:var(--color-text)] transition-colors duration-400">
          {p.blurb}
        </p>

        <ul className="space-y-3 relative">
          {p.areas.map((t, i) => (
            <li
              key={t}
              className="flex items-center gap-3 text-base text-[color:var(--color-text)] font-medium transition-all duration-400 group-hover:translate-x-1"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="h-px w-5 bg-[color:var(--color-gold-deep)] group-hover:w-8 group-hover:bg-[color:var(--color-gold-pale)] transition-all duration-400" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Premium bottom accent line */}
      <span className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[color:var(--color-gold-deep)] to-[color:var(--color-gold-pale)] w-0 transition-all duration-700 group-hover:w-full" />
    </Reveal>
  );
}