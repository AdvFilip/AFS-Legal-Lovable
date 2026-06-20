import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, Eyebrow, SectionHeading, AdvocateCard, GoldButton } from "@/components/afs";
import { LEADERSHIP } from "@/lib/afs-data";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Leadership — AFS Legal | Counsel & Advocates" },
      {
        name: "description",
        content:
          "Meet the counsel of AFS Legal — multidisciplinary professionals combining courtroom rigour with operating-business judgement to serve clients across Tamil Nadu.",
      },
      { property: "og:title", content: "Leadership — AFS Legal" },
      {
        property: "og:description",
        content: "The counsel behind AFS Legal's multidisciplinary practice.",
      },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <Layout>
      <Section tone="paper">
        <Eyebrow number="01">Leadership</Eyebrow>
        <SectionHeading em="the Practice.">The Counsel Behind</SectionHeading>
        <p className="mt-8 max-w-2xl text-[1.05rem] text-[color:var(--color-text-muted)] leading-[1.95]">
          AFS Legal is led by professionals whose careers combine courtroom
          practice with operating-business experience — bringing measured
          judgement and practical solutions to every engagement.
        </p>
      </Section>

      <Section tone="warm" className="!pt-0">
        <div>
          {LEADERSHIP.map((a, i) => (
            <AdvocateCard key={a.name} a={a} index={i} />
          ))}
        </div>

        <div className="mt-20 border border-[color:var(--color-hairline)] bg-[color:var(--color-paper-card)] p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h3 className="serif-heading text-3xl text-[color:var(--color-text-strong)] mb-3">
              Practising at AFS Legal
            </h3>
            <p className="text-[0.95rem] text-[color:var(--color-text-muted)] leading-[1.9] max-w-xl">
              We work alongside a discreet, collaborative network of legal
              professionals who share our standards of care, discretion and
              client commitment.
            </p>
          </div>
          <GoldButton href="/careers">Explore Careers</GoldButton>
        </div>
      </Section>
    </Layout>
  );
}