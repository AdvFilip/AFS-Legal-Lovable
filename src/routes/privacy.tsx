import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, Eyebrow, SectionHeading } from "@/components/afs";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AFS Legal" },
      { name: "description", content: "How AFS Legal collects, uses and protects information submitted through this website and through client engagements." },
      { property: "og:title", content: "Privacy Policy — AFS Legal" },
      { property: "og:description", content: "How AFS Legal handles client information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  { h: "Information We Collect", p: "Information you voluntarily provide through enquiry or application forms — name, contact details, brief description of matter — and basic technical information such as browser type and pages visited." },
  { h: "How We Use Information", p: "To respond to enquiries, route matters to a suitable advocate, maintain engagement records, comply with statutory obligations and improve our service. We do not sell or rent personal information." },
  { h: "Confidentiality", p: "All matter-related communication is treated as confidential. Advocate-client privilege applies to engaged matters in accordance with applicable law." },
  { h: "Data Retention", p: "Enquiry data is retained for the duration required to assess and respond, and thereafter as required by professional record-keeping rules." },
  { h: "Cookies", p: "We use only essential cookies required for site functionality. We do not deploy advertising or cross-site tracking cookies." },
  { h: "Your Rights", p: "You may request access, correction or deletion of information you have submitted by writing to support@afslegal.in." },
];

function PrivacyPage() {
  return (
    <Layout>
      <Section tone="paper">
        <Eyebrow>Policy</Eyebrow>
        <SectionHeading em="Policy.">Privacy</SectionHeading>
        <div className="mt-12 max-w-3xl space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="serif-heading text-2xl text-[color:var(--color-text-strong)] mb-3">{s.h}</h2>
              <p className="text-[1rem] text-[color:var(--color-text-muted)] leading-[1.95]">{s.p}</p>
            </div>
          ))}
          <p className="text-[0.7rem] text-[color:var(--color-text-subtle)] pt-8 border-t border-[color:var(--color-hairline-soft)]">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long" })}.</p>
        </div>
      </Section>
    </Layout>
  );
}