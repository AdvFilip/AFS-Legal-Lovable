import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, Eyebrow, SectionHeading, OutlineButton, Reveal } from "@/components/afs";
import { INSIGHTS } from "@/lib/afs-data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — AFS Legal | Legal Updates, Case Analysis & Commentary" },
      {
        name: "description",
        content:
          "Considered writing from AFS Legal — legal updates, case analysis and practical commentary across property, consumer, cyber and MSME advisory.",
      },
      { property: "og:title", content: "Insights — AFS Legal" },
      { property: "og:description", content: "Legal updates, case analysis and practical commentary from AFS Legal." },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsPage,
});

const CATEGORIES = [
  "All",
  "Legal Updates",
  "Case Analysis",
  "Consumer Rights",
  "Property Law",
  "Cyber Law",
  "Startup Advisory",
];

function InsightsPage() {
  return (
    <Layout>
      <Section tone="paper">
        <Eyebrow number="01">Insights</Eyebrow>
        <SectionHeading em="& Commentary.">Thought Leadership</SectionHeading>
        <p className="mt-8 max-w-2xl text-[1.05rem] text-[color:var(--color-text-muted)] leading-[1.95]">
          Considered writing from the firm — legal updates, case analysis and
          practical commentary intended to inform clients, practitioners and
          interested readers.
        </p>
        <div className="mt-12 flex flex-wrap gap-2">
          {CATEGORIES.map((c, i) => (
            <span
              key={c}
              className={`text-[0.65rem] tracking-[0.2em] uppercase px-4 py-2 border ${
                i === 0
                  ? "border-[color:var(--color-gold-deep)] bg-[color:var(--color-gold-dim)] text-[color:var(--color-gold-deep)]"
                  : "border-[color:var(--color-hairline-soft)] text-[color:var(--color-text-muted)] hover:border-[color:var(--color-gold-deep)] hover:text-[color:var(--color-gold-deep)] transition-colors cursor-pointer"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="warm" className="!pt-0">
        <div className="grid md:grid-cols-2 gap-px bg-[color:var(--color-hairline-soft)] border-t border-l border-[color:var(--color-hairline-soft)]">
          {INSIGHTS.map((p, i) => (
            <Reveal
              key={p.num}
              delay={(i % 2) * 0.08}
              className="bg-[color:var(--color-paper-card)] p-10 md:p-12 flex flex-col group cursor-pointer hover:bg-[color:var(--color-paper)] transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="eyebrow text-[0.55rem]">{p.category}</div>
                <div className="font-display italic text-[color:var(--color-gold-deep)]/40 text-3xl">
                  {p.num}
                </div>
              </div>
              <h2 className="serif-heading text-3xl text-[color:var(--color-text-strong)] mb-5 group-hover:text-[color:var(--color-gold-deep)] transition-colors">
                {p.title}
              </h2>
              <p className="text-[0.95rem] text-[color:var(--color-text-muted)] leading-[1.9] mb-8">
                {p.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between text-[0.7rem] text-[color:var(--color-text-subtle)] tracking-wider uppercase border-t border-[color:var(--color-hairline-soft)] pt-5">
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 text-center">
          <OutlineButton href="/contact">Request Topic Coverage →</OutlineButton>
        </div>
      </Section>
    </Layout>
  );
}