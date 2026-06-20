import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { Layout, Section, Eyebrow, SectionHeading, GoldButton, Reveal } from "@/components/afs";
import { FIRM, EXPERTISE } from "@/lib/afs-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AFS Legal — Book a Consultation in Tiruchirappalli" },
      {
        name: "description",
        content:
          "Reach AFS Legal in Tiruchirappalli for a confidential consultation. Phone, email, office address and enquiry form for clients across Tamil Nadu.",
      },
      { property: "og:title", content: "Contact AFS Legal" },
      { property: "og:description", content: "Book a confidential consultation with AFS Legal." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const inputCls =
  "w-full bg-[color:var(--color-paper)] border border-[color:var(--color-hairline-soft)] text-[color:var(--color-text-strong)] placeholder:text-[color:var(--color-text-subtle)] px-4 py-3 text-sm focus:border-[color:var(--color-gold-deep)] focus:outline-none transition-colors";

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <Section tone="paper">
        <Eyebrow number="01">Get In Touch</Eyebrow>
        <SectionHeading em="Consultation.">Book a Confidential</SectionHeading>
        <p className="mt-8 max-w-2xl text-[1.05rem] text-[color:var(--color-text-muted)] leading-[1.95]">
          Reach out to discuss your matter in confidence. Our team responds to
          every enquiry within one working day.
        </p>
      </Section>

      <Section tone="warm" className="!pt-0">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-[color:var(--color-hairline-soft)]">
              {[
                { icon: Phone, label: "Phone / WhatsApp", val: FIRM.phone, href: FIRM.phoneHref },
                { icon: Mail, label: "Email", val: FIRM.email, href: FIRM.emailHref },
                { icon: MapPin, label: "Office Address", val: FIRM.address },
                { icon: Globe, label: "Website", val: FIRM.website, href: `https://${FIRM.website}` },
              ].map((c) => (
                <li key={c.label} className="flex items-start gap-5 py-6">
                  <c.icon className="text-[color:var(--color-gold-deep)] shrink-0 mt-1" size={18} aria-hidden />
                  <div>
                    <div className="eyebrow text-[0.55rem] mb-1">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-[0.95rem] text-[color:var(--color-text-strong)] hover:text-[color:var(--color-gold-deep)] transition-colors leading-relaxed">{c.val}</a>
                    ) : (
                      <div className="text-[0.95rem] text-[color:var(--color-text-strong)] leading-relaxed">{c.val}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <div className="eyebrow text-[0.55rem] mb-4">Our Location</div>
              <div className="relative h-48 border border-[color:var(--color-hairline-soft)] flex items-center justify-center overflow-hidden bg-[color:var(--color-paper)]">
                <div aria-hidden className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(46,46,46,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(46,46,46,0.4) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="relative text-center">
                  <div className="mx-auto h-4 w-4 rounded-full bg-[color:var(--color-gold-deep)] mb-3" style={{ boxShadow: "0 0 0 6px rgba(200,162,74,0.20), 0 0 0 14px rgba(200,162,74,0.10)" }} />
                  <p className="text-xs text-[color:var(--color-text-muted)]">No. 11, Madurai Road, Palakarai</p>
                  <p className="text-[0.6rem] text-[color:var(--color-gold-deep)] mt-1 tracking-wider uppercase">Tiruchirappalli – 620 008</p>
                </div>
              </div>
              <a href="https://www.google.com/maps/search/No.+11+Madurai+Road+Palakarai+Tiruchirappalli" target="_blank" rel="noreferrer" className="mt-3 block text-center py-3 border border-[color:var(--color-hairline)] text-[color:var(--color-gold-deep)] text-[0.65rem] tracking-[0.2em] uppercase hover:bg-[color:var(--color-gold-dim)] transition-colors">
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal className="border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-card)] p-8 md:p-12">
              {sent ? (
                <div className="py-16 text-center">
                  <div className="eyebrow mb-4">Received</div>
                  <h3 className="serif-heading text-3xl text-[color:var(--color-text-strong)] mb-4">Thank you.</h3>
                  <p className="text-sm text-[color:var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
                    We have received your enquiry and will respond within one
                    working day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-6"
                  aria-label="Case enquiry form"
                >
                  <div>
                    <h3 className="serif-heading text-3xl text-[color:var(--color-text-strong)]">Case Enquiry</h3>
                    <p className="text-[0.85rem] text-[color:var(--color-text-muted)] mt-2 leading-relaxed">Confidential. No obligation. Response within one working day.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Full Name" name="name" required />
                    <Field label="Phone" name="phone" type="tel" required />
                  </div>
                  <Field label="Email" name="email" type="email" required />
                  <div>
                    <label className="block eyebrow text-[0.55rem] mb-2" htmlFor="domain">Practice Area</label>
                    <select id="domain" name="domain" required className={inputCls}>
                      <option value="">Select a practice area</option>
                      {EXPERTISE.map((p) => (<option key={p.title} value={p.title}>{p.title}</option>))}
                      <option value="other">Multiple / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block eyebrow text-[0.55rem] mb-2" htmlFor="brief">Brief Description</label>
                    <textarea id="brief" name="brief" rows={5} className={`${inputCls} resize-none`} placeholder="Briefly describe your matter. Please avoid sharing privileged details until engagement." />
                  </div>
                  <GoldButton type="submit" className="w-full md:w-auto">Submit Enquiry</GoldButton>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block eyebrow text-[0.55rem] mb-2" htmlFor={name}>{label}{required && <span className="text-[color:var(--color-gold-deep)] ml-1">*</span>}</label>
      <input id={name} name={name} type={type} required={required} className={inputCls} />
    </div>
  );
}