import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, Eyebrow, SectionHeading, GoldButton, PracticeCard } from "@/components/afs";
import { EXPERTISE } from "@/lib/afs-data";

export const Route = createFileRoute("/practice-areas")({
  head: () => ({
    meta: [
      { title: "Expertise — AFS Legal | Dispute Resolution, Property, Commercial, Cyber" },
      {
        name: "description",
        content:
          "Four pillars of practice: Dispute Resolution & Litigation, Property & Real Estate, Business & Commercial Advisory, and Emerging Practice Areas including Cyber Law.",
      },
      { property: "og:title", content: "Expertise — AFS Legal" },
      {
        property: "og:description",
        content: "Four pillars of practice across litigation, property, commercial and emerging areas.",
      },
      { property: "og:url", content: "/practice-areas" },
    ],
    links: [{ rel: "canonical", href: "/practice-areas" }],
  }),
  component: PracticePage,
});

function PracticePage() {
  return (
    <Layout>
      <Section tone="paper">
        <Eyebrow number="01">Expertise</Eyebrow>
        <SectionHeading em="of Practice.">Four Pillars</SectionHeading>
        <p className="mt-8 max-w-2xl text-[1.05rem] text-[color:var(--color-text-muted)] leading-[1.95]">
          A multidisciplinary firm organised around the legal questions our
          clients most often face — from courtroom advocacy to property
          documentation, commercial advisory and emerging digital risk.
        </p>
      </Section>

      <Section tone="warm" className="!pt-0">
        <div className="grid sm:grid-cols-2 border-t border-l border-[color:var(--color-hairline-soft)]">
          {EXPERTISE.map((p, i) => (
            <PracticeCard key={p.num} p={p} index={i} />
          ))}
        </div>
        <div className="mt-20 text-center">
          <GoldButton href="/contact">Request a Consultation</GoldButton>
        </div>
      </Section>
    </Layout>
  );
}