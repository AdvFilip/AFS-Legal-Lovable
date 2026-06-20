import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section, Eyebrow, SectionHeading } from "@/components/afs";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Legal Disclaimer — AFS Legal" },
      { name: "description", content: "Bar Council of India compliance disclaimer for the AFS Legal website. Informational use only; not legal advice or solicitation." },
      { property: "og:title", content: "Legal Disclaimer — AFS Legal" },
      { property: "og:description", content: "Bar Council of India compliance disclaimer." },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <Layout>
      <Section tone="paper">
        <Eyebrow>Compliance</Eyebrow>
        <SectionHeading em="Disclaimer.">Legal</SectionHeading>
        <div className="mt-12 max-w-3xl space-y-6 text-[1rem] text-[color:var(--color-text-muted)] leading-[1.95]">
          <p>The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website, you acknowledge that you are seeking information relating to AFS Legal of your own accord and that there has been no solicitation by AFS Legal or its members.</p>
          <p>The content of this website is for informational purposes only and should not be interpreted as legal advice. Transmission of information from this website does not create an attorney-client relationship.</p>
          <p>AFS Legal disclaims all liability for any consequences arising from any action taken or not taken by relying on material or information on this website. The user should always seek independent legal counsel before acting on any information presented here.</p>
          <p>Use of this website is governed by our privacy policy. Any reference to past matters is illustrative only and does not guarantee similar outcomes in future matters.</p>
        </div>
      </Section>
    </Layout>
  );
}