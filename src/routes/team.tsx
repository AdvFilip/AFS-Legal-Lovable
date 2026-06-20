import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout, Section, Eyebrow, SectionHeading, GoldButton } from "@/components/afs";
import { Reveal } from "@/components/afs/primitives";
import { supabase } from "@/integrations/supabase/client";

type Advocate = {
  id: string;
  full_name: string | null;
  slug: string | null;
  designation: string | null;
  location: string | null;
  enrollment_no: string | null;
  languages: string[] | null;
  primary_practice: string | null;
  secondary_practices: string[] | null;
  industries: string[] | null;
  years_practice: number | null;
  highlights: string[] | null;
  email: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
  seniority_rank: number | null;
  joined_on: string | null;
  status: string | null;
};

function initialsFrom(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((n) => n[0]!)
      .join("")
      .slice(0, 3)
      .toUpperCase() || "—"
  );
}

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

function AdvocateCard({ a, index }: { a: Advocate; index: number }) {
  // Defensive defaults — DB rows may omit array/optional columns.
  const fullName = a.full_name ?? "Advocate";
  const designation = a.designation ?? "Associate";
  const languages = Array.isArray(a.languages) ? a.languages.filter(Boolean) : [];
  const highlights = Array.isArray(a.highlights) ? a.highlights.filter(Boolean) : [];
  const secondaryPractices = Array.isArray(a.secondary_practices)
    ? a.secondary_practices.filter(Boolean)
    : [];
  const primaryPractice = a.primary_practice ?? "";
  const years = typeof a.years_practice === "number" ? a.years_practice : 0;

  return (
    <Reveal
      delay={(index % 4) * 0.08}
      className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-14 py-14 border-t border-[color:var(--color-hairline-soft)]"
    >
      {/* Photo or Initials */}
      <div className="relative">
        {a.photo_url ? (
          <img
            src={a.photo_url}
            alt={fullName}
            className="aspect-[4/5] object-cover border border-[color:var(--color-hairline-soft)] rounded"
          />
        ) : (
          <div className="aspect-[4/5] bg-[color:var(--color-paper-warm)] border border-[color:var(--color-hairline-soft)] flex items-center justify-center overflow-hidden">
            <span className="font-display text-7xl md:text-8xl text-[color:var(--color-gold-deep)]/80 group-hover:text-[color:var(--color-gold-deep)] transition-colors">
              {initialsFrom(fullName)}
            </span>
            <div className="absolute bottom-4 left-4 right-4 h-px bg-[color:var(--color-gold)]" />
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="eyebrow text-[0.6rem] mb-4">{designation}</div>
        <h3 className="serif-heading text-3xl md:text-4xl text-[color:var(--color-text-strong)] mb-2">
          {fullName}
        </h3>
        <div className="text-[0.78rem] tracking-wide text-[color:var(--color-gold-deep)] mb-6">
          {[a.enrollment_no, a.location].filter(Boolean).join(" • ")}
        </div>
        <div className="h-px w-12 bg-[color:var(--color-gold)] mb-6" />
        <p className="text-[0.95rem] leading-[1.95] text-[color:var(--color-text-muted)] max-w-2xl mb-6">
          {years > 0 ? `${years}+ years of experience` : "Advocate"}
          {primaryPractice ? ` in ${primaryPractice.toLowerCase()}.` : "."}
          {languages.length > 0 && ` Speaks ${languages.join(", ")}.`}
        </p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-[color:var(--color-gold-deep)] mb-3 uppercase tracking-widest">
              Representative Matters
            </p>
            <ul className="space-y-2">
              {highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="text-[0.85rem] text-[color:var(--color-text-muted)] flex gap-2">
                  <span className="text-[color:var(--color-gold-deep)] min-w-fit">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practice Areas */}
        <div className="flex flex-wrap gap-2">
          {primaryPractice && (
            <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--color-text-muted)] border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-warm)] px-3 py-1.5">
              {primaryPractice}
            </span>
          )}
          {secondaryPractices.slice(0, 2).map((s) => (
            <span
              key={s}
              className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--color-text-muted)] border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-warm)] px-3 py-1.5"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Contact */}
        {a.email && (
          <div className="mt-6">
            <a
              href={`mailto:${a.email}`}
              className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--color-gold-deep)] hover:text-[color:var(--color-gold-pale)] transition-colors"
            >
              Get in touch →
            </a>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function TeamPage() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        // Use Lovable Cloud's injected Supabase credentials.
        // (Lovable populates these at build time and they point at the
        // correct Cloud project where the advocates data lives.)
        const supabaseUrl =
          import.meta.env.VITE_SUPABASE_URL ||
          import.meta.env.VITE_SUPABASE_PROJECT_URL;
        const supabaseKey =
          import.meta.env.VITE_SUPABASE_ANON_KEY ||
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

        if (!supabaseUrl || !supabaseKey) {
          console.warn("[team] Supabase credentials not found in env");
          setAdvocates([]);
          setLoading(false);
          return;
        }

        // Only filter by status. We deliberately do NOT sort in the query
        // (sorting on a missing column returns HTTP 400) — we sort in the
        // browser instead, which is safe regardless of schema.
        const url = `${supabaseUrl}/rest/v1/advocates?status=eq.published`;
        console.log("[team] fetching:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
          },
        });

        console.log("[team] status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("[team] supabase error:", response.status, errorText);
          setAdvocates([]);
          setLoading(false);
          return;
        }

        const data: Advocate[] = await response.json();
        console.log("[team] advocates loaded:", data.length, data);
        setAdvocates(sortAdvocates(data));
      } catch (err) {
        console.error("[team] fetch error:", err);
        setAdvocates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

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
          {loading ? (
            <p className="text-[color:var(--color-text-muted)]">Loading team...</p>
          ) : error ? (
            <p className="text-red-300">{error}</p>
          ) : advocates.length === 0 ? (
            <p className="text-[color:var(--color-text-muted)]">Team members coming soon.</p>
          ) : (
            advocates.map((a, i) => <AdvocateCard key={a.id} a={a} index={i} />)
          )}
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