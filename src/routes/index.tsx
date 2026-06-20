import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Layout,
  Section,
  Eyebrow,
  SectionHeading,
  GoldButton,
  OutlineButton,
  Reveal,
  PracticeCard,
  AdvocateCard,
} from "@/components/afs";
import {
  EXPERTISE,
  LEADERSHIP,
  INDUSTRIES,
  INSIGHTS,
  STATS,
  PILLARS,
  FIRM,
} from "@/lib/afs-data";
import logo from "@/assets/afs-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AFS Legal — Advocates & Legal Consultants | Tiruchirappalli" },
      {
        name: "description",
        content:
          "AFS Legal is a multidisciplinary law firm in Tiruchirappalli providing litigation, dispute resolution and advisory services to individuals, businesses and institutions across Tamil Nadu.",
      },
      { property: "og:title", content: "AFS Legal — Advocates & Legal Consultants" },
      {
        property: "og:description",
        content:
          "Strategic legal counsel, trusted representation and practical solutions from a multidisciplinary firm in Tiruchirappalli.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const sections = [
    { label: "Thought Leadership", id: "leadership" },
    { label: "Practice Areas", id: "practice" },
    { label: "About", id: "about" },
  ];
  const [activeSection, setActiveSection] = useState(0);

  return (
    <Layout>
      {/* PREMIUM HERO — SPLIT SCREEN (Khaitan & Co inspired) */}
      <section className="relative min-h-screen flex items-stretch overflow-hidden">
        {/* LEFT: Content on Deep Navy */}
        <div className="flex-1 bg-[color:var(--color-ink-deep)] flex flex-col justify-center px-8 md:px-12 lg:px-16 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow text-[0.6rem] text-[color:var(--color-accent)]">
              Thought Leadership
            </span>
            <h1 className="font-serif font-bold text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] text-white leading-[1.1] tracking-tight mt-6 max-w-lg">
              Strategic Legal Counsel for India's Business.
            </h1>
            <p className="mt-10 text-[1rem] leading-[1.8] text-[color:var(--color-text-muted)] max-w-md">
              We combine century-old legal tradition with pragmatic commercial solutions. Counsel you can trust.
            </p>
            <div className="mt-14 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 border border-white text-white font-semibold tracking-widest uppercase text-[0.75rem] hover:bg-white hover:text-[color:var(--color-ink-deep)] transition-all duration-300">
                Explore Expertise →
              </button>
              <button className="px-8 py-3 bg-white text-[color:var(--color-ink-deep)] font-semibold tracking-widest uppercase text-[0.75rem] hover:bg-[color:var(--color-gold-pale)] transition-all duration-300">
                Book Consultation →
              </button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-8 flex flex-col items-center gap-3"
          >
            <span className="eyebrow text-[0.5rem] text-white/50">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-8 w-px bg-gradient-to-b from-white to-transparent"
            />
          </motion.div>
        </div>

        {/* RIGHT: Full-screen Premium Image */}
        <div className="hidden md:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[color:var(--color-paper-warm)] via-[color:var(--color-ink)] to-[color:var(--color-ink-deep)]">
          {/* Placeholder for dramatic image — use Unsplash: judge gavel, legal documents, office, architecture */}
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(0,31,63,0.4) 0%, rgba(10,25,41,0.6) 100%), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=900&fit=crop')",
            }}
          />

          {/* Overlay accent lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 border border-white/20 rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 border border-white/10 rounded-full" />
          </div>
        </div>

        {/* RIGHT-SIDE NAVIGATION DOTS */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
          {sections.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => {
                setActiveSection(i);
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative group"
              whileHover={{ scale: 1.3 }}
            >
              <div
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  activeSection === i ? "bg-white border-white" : "border-white/40 group-hover:border-white"
                }`}
              />
              <span className="absolute right-8 text-white text-[0.7rem] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {s.label}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-warm)]">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`p-10 md:p-12 text-center border-[color:var(--color-hairline-soft)] ${
                i !== STATS.length - 1 ? "md:border-r" : ""
              } ${i < 2 ? "border-b md:border-b-0" : ""} ${i === 0 ? "border-r" : ""} ${
                i === 2 ? "border-r md:border-r" : ""
              }`}
            >
              <div className="font-display text-[2.25rem] md:text-[3rem] font-normal text-[color:var(--color-gold-deep)] leading-none tracking-[-0.03em]">
                {s.num}
              </div>
              <div className="eyebrow text-[0.5rem] mt-5">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECONDARY: BUILT ON EXPERIENCE */}
      <Section tone="paper">
        <Eyebrow number="01">The Practice</Eyebrow>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-7">
            <SectionHeading em="Strengthened by Collaboration.">
              Built on Experience.
            </SectionHeading>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[0.9rem] text-[color:var(--color-text-muted)] leading-[2]">
              AFS Legal combines legal practice, business understanding and a
              collaborative network of legal professionals to deliver practical
              and strategic solutions tailored to each client's objectives.
            </p>
            <div className="mt-10 grid sm:grid-cols-3 gap-px bg-[color:var(--color-hairline-soft)]">
              {PILLARS.map((p) => (
                <div
                  key={p.num}
                  className="bg-[color:var(--color-paper)] p-6"
                >
                  <div className="font-display italic text-xl text-[color:var(--color-gold-deep)] mb-3">
                    {p.num}
                  </div>
                  <div className="text-[0.78rem] tracking-[0.04em] font-normal text-[color:var(--color-text-strong)] mb-3 uppercase">
                    {p.title}
                  </div>
                  <div className="text-[0.78rem] leading-[1.9] text-[color:var(--color-text-muted)]">
                    {p.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* LEADERSHIP */}
      <Section tone="warm">
        <Eyebrow number="02">Leadership</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
          <SectionHeading em="the Practice.">The Counsel Behind</SectionHeading>
          <OutlineButton href="/team">Full Leadership →</OutlineButton>
        </div>
        <p className="text-[0.88rem] text-[color:var(--color-text-muted)] leading-[2] max-w-xl mb-14">
          AFS Legal is led by professionals who bring depth across law, business
          and dispute resolution to every engagement.
        </p>

        <div>
          {LEADERSHIP.map((a, i) => (
            <AdvocateCard key={a.name} a={a} index={i} />
          ))}
        </div>
      </Section>

      {/* EXPERTISE */}
      <Section id="expertise" tone="paper">
        <Eyebrow number="03">Expertise</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
          <SectionHeading em="Pillars of Practice.">Four</SectionHeading>
          <OutlineButton href="/practice-areas">All Practice Areas →</OutlineButton>
        </div>
        <p className="text-[0.88rem] text-[color:var(--color-text-muted)] leading-[2] max-w-xl mb-16">
          A focused, multidisciplinary practice — organised around the questions
          our clients most often ask us to answer.
        </p>

        <div className="grid sm:grid-cols-2 border-t border-l border-[color:var(--color-hairline-soft)]">
          {EXPERTISE.map((p, i) => (
            <PracticeCard key={p.num} p={p} index={i} />
          ))}
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section tone="warm">
        <Eyebrow number="04">Industries</Eyebrow>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeading em="we Serve.">The Clients</SectionHeading>
            <p className="mt-10 text-[0.88rem] text-[color:var(--color-text-muted)] leading-[2] max-w-md">
              From individuals to institutions, our practice is built around the
              communities and enterprises that define Tamil Nadu.
            </p>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 border-t border-l border-[color:var(--color-hairline-soft)]">
            {INDUSTRIES.map((label, i) => (
              <Reveal
                key={label}
                delay={(i % 4) * 0.06}
                className="border-r border-b border-[color:var(--color-hairline-soft)]"
              >
                <li className="flex items-baseline gap-6 p-8 bg-[color:var(--color-paper)] hover:bg-[color:var(--color-paper-card)] transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <span className="font-display italic text-[color:var(--color-gold-deep)] text-sm w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="serif-heading text-base text-[color:var(--color-text-strong)]">
                    {label}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* INSIGHTS PREVIEW */}
      <Section tone="paper">
        <Eyebrow number="05">Insights</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeading em="& Analysis.">Thought Leadership</SectionHeading>
          <OutlineButton href="/insights">All Insights →</OutlineButton>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-[color:var(--color-hairline-soft)]">
          {INSIGHTS.slice(0, 3).map((p, i) => (
            <Reveal
              key={p.num}
              delay={i * 0.08}
              className="bg-[color:var(--color-paper-card)] p-8 md:p-10 flex flex-col"
            >
              <div className="eyebrow text-[0.5rem] mb-6">{p.category}</div>
              <h3 className="serif-heading text-[1.15rem] text-[color:var(--color-text-strong)] mb-5 leading-[1.4]">
                {p.title}
              </h3>
              <p className="text-[0.82rem] leading-[1.95] text-[color:var(--color-text-muted)] mb-8">
                {p.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between text-[0.6rem] text-[color:var(--color-text-subtle)] tracking-[0.18em] uppercase border-t border-[color:var(--color-hairline-soft)] pt-5">
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CONTACT CTA */}
      <Section tone="ink" className="monogram-bg blueprint-grid">
        <span aria-hidden className="monogram-bg-mark">AFS</span>
        <div className="relative corner-frame corner-frame-x border border-[color:var(--color-hairline-invert)] p-10 md:p-20 text-center bg-[color:var(--color-ink-deep)]/40">
          <Eyebrow invert>Begin</Eyebrow>
          <h2 className="serif-heading text-[1.85rem] md:text-[3rem] text-[color:var(--color-text-invert)] max-w-3xl mx-auto">
            Request a{" "}
            <em className="italic font-normal text-[color:var(--color-gold-pale)]">
              confidential
            </em>{" "}
            consultation.
          </h2>
          <p className="mt-10 max-w-lg mx-auto text-[0.88rem] text-[color:var(--color-text-invert-muted)] leading-[2.05]">
            Reach out to discuss your matter in confidence. We respond to every
            enquiry within one working day.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-9 py-[14px] min-h-11 bg-[color:var(--color-gold)] text-[color:var(--color-ink-deep)] text-[0.62rem] tracking-[0.32em] uppercase font-normal hover:bg-[color:var(--color-gold-pale)] transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              Book Consultation
            </a>
            <Link
              to="/team"
              className="text-[0.62rem] tracking-[0.32em] uppercase text-[color:var(--color-gold-pale)] hover:text-white border-b border-[color:var(--color-gold-pale)]/40 hover:border-[color:var(--color-gold-pale)] pb-1 transition-colors duration-[600ms]"
            >
              Meet the Counsel →
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
