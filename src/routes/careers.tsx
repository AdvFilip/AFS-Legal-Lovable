import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, Section, Eyebrow, SectionHeading, GoldButton, Reveal } from "@/components/afs";
import { EXPERTISE } from "@/lib/afs-data";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Join the AFS Legal Network" },
      { name: "description", content: "Open advocate and intake-team roles at AFS Legal — apply to join a structured, outcome-driven legal coordination platform based in Trichy." },
      { property: "og:title", content: "Careers — AFS Legal" },
      { property: "og:description", content: "Join a structured legal coordination platform." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const ROLES = [
  { type: "Associate", title: "Associate Advocate", body: "Practising advocates with demonstrated courtroom commitment and a measured, evidence-first posture. Engagements span dispute resolution, property, commercial and emerging practice areas.", perks: ["Quality of Work", "Mentorship", "Long-Term Path"] },
  { type: "Full Time", title: "Junior Counsel", body: "A career role for law graduates seeking depth across litigation, advisory and documentation. Sustained mentorship from senior counsel and exposure to substantive matters from day one.", perks: ["Trichy Office", "Structured Training", "Career Path"] },
  { type: "Internship", title: "Legal Research Intern", body: "Support active matters through case-law research, evidence indexing and brief preparation. Open to final-year and recent law graduates.", perks: ["Mentorship", "Live Matters", "Certificate"] },
  { type: "Part Time", title: "Court Liaison", body: "Court-side coordination, filings and procedural follow-up across Tiruchirappalli courts. Suited to early-career advocates and experienced paralegals.", perks: ["Flexible", "Court Exposure", "Per-Hearing"] },
];

function CareersPage() {
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <Section tone="paper">
        <Eyebrow number="01">Careers</Eyebrow>
        <SectionHeading em="at AFS Legal.">Build a Career</SectionHeading>
        <p className="mt-8 max-w-2xl text-[1.05rem] text-[color:var(--color-text-muted)] leading-[1.95]">
          We are a multidisciplinary practice that values depth, discretion and
          long-term commitment. If those qualities describe how you wish to
          work, we would like to hear from you.
        </p>
      </Section>

      <Section tone="warm" className="!pt-0">
        <div className="grid md:grid-cols-2 gap-px bg-[color:var(--color-hairline-soft)]">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06} className="bg-[color:var(--color-paper-card)] hover:bg-[color:var(--color-paper)] p-10 transition-colors duration-500">
              <div className="eyebrow text-[0.55rem] mb-4">{r.type}</div>
              <h3 className="serif-heading text-2xl text-[color:var(--color-text-strong)] mb-4">{r.title}</h3>
              <p className="text-[0.9rem] text-[color:var(--color-text-muted)] leading-[1.9] mb-6">{r.body}</p>
              <div className="flex flex-wrap gap-2">
                {r.perks.map((p) => (
                  <span key={p} className="text-[0.55rem] tracking-[0.18em] uppercase border border-[color:var(--color-hairline)] text-[color:var(--color-gold-deep)] bg-[color:var(--color-gold-dim)] px-2 py-1">{p}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-card)] p-10 md:p-14">
          {sent ? (
            <div className="py-12 text-center">
              <div className="eyebrow mb-4">Application Received</div>
              <h3 className="serif-heading text-3xl text-[color:var(--color-text-strong)] mb-3">Thank you.</h3>
              <p className="text-sm text-[color:var(--color-text-muted)]">We will respond within two working days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6" aria-label="Application form">
              <div>
                <h3 className="serif-heading text-3xl text-[color:var(--color-text-strong)]">Apply to Join</h3>
                <p className="text-[0.85rem] text-[color:var(--color-text-muted)] mt-2">Tell us about yourself. We respond to every application within two working days.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <CField label="Full Name" name="name" required />
                <CField label="Phone" name="phone" type="tel" required />
              </div>
              <CField label="Email" name="email" type="email" required />
              <div>
                <label htmlFor="role" className="block eyebrow text-[0.55rem] mb-2">Role of Interest</label>
                <select id="role" name="role" required className={selectCls}>
                  <option value="">Select a role</option>
                  {ROLES.map((r) => <option key={r.title} value={r.title}>{r.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="domain" className="block eyebrow text-[0.55rem] mb-2">Primary Practice Area</label>
                <select id="domain" name="domain" className={selectCls}>
                  <option value="">Select a practice area</option>
                  {EXPERTISE.map((p) => <option key={p.title} value={p.title}>{p.title}</option>)}
                  <option value="other">Multiple / Other</option>
                </select>
              </div>
              <CField label="Qualifications & Experience" name="quals" placeholder="e.g. LLB (Hons), LLM, 12 years practice — Tiruchirappalli Bar" />
              <div>
                <label htmlFor="statement" className="block eyebrow text-[0.55rem] mb-2">Brief Statement</label>
                <textarea id="statement" name="statement" rows={5} className={`${selectCls} resize-none`} placeholder="Why AFS Legal? What do you bring to the practice?" />
              </div>
              <GoldButton type="submit">Submit Application</GoldButton>
            </form>
          )}
        </Reveal>
      </Section>
    </Layout>
  );
}

const selectCls =
  "w-full bg-[color:var(--color-paper)] border border-[color:var(--color-hairline-soft)] text-[color:var(--color-text-strong)] placeholder:text-[color:var(--color-text-subtle)] px-4 py-3 text-sm focus:border-[color:var(--color-gold-deep)] focus:outline-none";

function CField({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block eyebrow text-[0.55rem] mb-2">{label}{required && <span className="text-[color:var(--color-gold-deep)] ml-1">*</span>}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} className={selectCls} />
    </div>
  );
}