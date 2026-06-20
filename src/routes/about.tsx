import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, Eyebrow, SectionHeading, GoldButton, OutlineButton, Reveal } from "@/components/afs";
import { PILLARS, INDUSTRIES } from "@/lib/afs-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AFS Legal — A Multidisciplinary Law Firm in Tiruchirappalli" },
      {
        name: "description",
        content:
          "AFS Legal combines legal expertise with real business and operating experience — counsel grounded in entrepreneurship, agriculture and the disciplines of running an enterprise.",
      },
      { property: "og:title", content: "About AFS Legal" },
      {
        property: "og:description",
        content: "Legal advice informed by real business and operating experience.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "Legal Expertise",
    body: "A practice grounded in courtroom rigour, careful pleading and a disciplined respect for procedure and precedent.",
  },
  {
    title: "Entrepreneurial Judgement",
    body: "Advice that recognises commercial trade-offs — because the right legal answer is rarely the only consideration our clients face.",
  },
  {
    title: "Sector Understanding",
    body: "Lived experience across agriculture, MSME operations and organisational leadership shapes how we read facts and frame strategy.",
  },
  {
    title: "Practical Problem-Solving",
    body: "We prefer measured, workable solutions to elaborate ones — outcomes our clients can actually execute and live with.",
  },
];

function AboutPage() {
  return (
    <Layout>
      <Section tone="paper">
        <Eyebrow number="01">About the Firm</Eyebrow>
        <SectionHeading em="real business and operating experience.">
          Legal advice informed by
        </SectionHeading>
        <div className="mt-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7 space-y-6 text-[1.05rem] text-[color:var(--color-text-muted)] leading-[1.95]">
            <p>
              AFS Legal is a multidisciplinary legal practice based in
              Tiruchirappalli, Tamil Nadu, providing strategic legal
              representation, dispute resolution and advisory services to
              individuals, businesses and institutions.
            </p>
            <p>
              The firm combines courtroom experience, practical business
              understanding and a collaborative network of legal professionals
              to deliver solutions that are legally sound and commercially
              sensible.
            </p>
            <p>
              Our counsel is shaped by years of work outside the courtroom as
              well as within it — across enterprise operations, agriculture and
              organisational leadership. We bring that perspective to every
              engagement, large or small.
            </p>
          </div>
          <aside className="lg:col-span-5">
            <div className="border-l-2 border-[color:var(--color-gold-deep)] pl-8 py-2">
              <div className="eyebrow text-[0.55rem] mb-3">Our Conviction</div>
              <p className="font-display italic text-2xl text-[color:var(--color-text-strong)] leading-[1.4]">
                "Considered counsel, trusted representation, and solutions our
                clients can actually execute."
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="warm">
        <Eyebrow number="02">Our Values</Eyebrow>
        <SectionHeading em="our practice.">The principles that guide</SectionHeading>
        <div className="mt-16 grid sm:grid-cols-2 border-t border-l border-[color:var(--color-hairline-soft)]">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.title}
              delay={(i % 4) * 0.06}
              className="border-r border-b border-[color:var(--color-hairline-soft)] p-10 bg-[color:var(--color-paper)]"
            >
              <div className="font-display italic text-[color:var(--color-gold-deep)] text-2xl mb-4">
                0{i + 1}
              </div>
              <h3 className="serif-heading text-2xl text-[color:var(--color-text-strong)] mb-3">
                {v.title}
              </h3>
              <p className="text-[0.95rem] text-[color:var(--color-text-muted)] leading-[1.9]">
                {v.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow number="03">How We Work</Eyebrow>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeading em="never templated.">Considered,</SectionHeading>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-px bg-[color:var(--color-hairline-soft)]">
            {PILLARS.map((p) => (
              <div key={p.num} className="bg-[color:var(--color-paper-card)] p-8">
                <div className="font-display italic text-3xl text-[color:var(--color-gold-deep)] mb-4">
                  {p.num}
                </div>
                <h3 className="serif-heading text-xl text-[color:var(--color-text-strong)] mb-3">
                  {p.title}
                </h3>
                <p className="text-[0.85rem] text-[color:var(--color-text-muted)] leading-[1.8]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <Eyebrow number="04">Industries Served</Eyebrow>
        <SectionHeading em="institutions.">From individuals to</SectionHeading>
        <div className="mt-12 flex flex-wrap gap-3">
          {INDUSTRIES.map((label) => (
            <span
              key={label}
              className="text-[0.85rem] tracking-wide text-[color:var(--color-text-strong)] border border-[color:var(--color-hairline)] bg-[color:var(--color-paper)] px-5 py-3"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap gap-4">
          <GoldButton href="/contact">Book Consultation</GoldButton>
          <OutlineButton href="/team">Meet the Counsel →</OutlineButton>
        </div>
      </Section>
    </Layout>
  );
}