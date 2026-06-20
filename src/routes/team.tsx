import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout, Section, Eyebrow, SectionHeading, GoldButton } from "@/components/afs";
import { Reveal } from "@/components/afs/primitives";
import type { Advocate } from "@/lib/advocates";
import { sortAdvocates } from "@/lib/advocates";

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
            alt={a.full_name}
            className="aspect-[4/5] object-cover border border-[color:var(--color-hairline-soft)] rounded"
          />
        ) : (
          <div className="aspect-[4/5] bg-[color:var(--color-paper-warm)] border border-[color:var(--color-hairline-soft)] flex items-center justify-center overflow-hidden">
            <span className="font-display text-7xl md:text-8xl text-[color:var(--color-gold-deep)]/80 group-hover:text-[color:var(--color-gold-deep)] transition-colors">
              {a.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div className="absolute bottom-4 left-4 right-4 h-px bg-[color:var(--color-gold)]" />
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="eyebrow text-[0.6rem] mb-4">{a.designation}</div>
        <h3 className="serif-heading text-3xl md:text-4xl text-[color:var(--color-text-strong)] mb-2">
          {a.full_name}
        </h3>
        <div className="text-[0.78rem] tracking-wide text-[color:var(--color-gold-deep)] mb-6">
          {a.enrollment_no} • {a.location}
        </div>
        <div className="h-px w-12 bg-[color:var(--color-gold)] mb-6" />
        <p className="text-[0.95rem] leading-[1.95] text-[color:var(--color-text-muted)] max-w-2xl mb-6">
          {a.years_practice}+ years of experience in {a.primary_practice.toLowerCase()}.
          {a.languages.length > 0 && ` Speaks ${a.languages.join(", ")}.`}
        </p>

        {/* Highlights */}
        {a.highlights.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-[color:var(--color-gold-deep)] mb-3 uppercase tracking-widest">
              Representative Matters
            </p>
            <ul className="space-y-2">
              {a.highlights.slice(0, 3).map((h, i) => (
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
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--color-text-muted)] border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-warm)] px-3 py-1.5">
            {a.primary_practice}
          </span>
          {a.secondary_practices.slice(0, 2).map((s) => (
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
        // Query Supabase REST API directly for published advocates
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Supabase credentials not configured");
        }

        const url = new URL(`${supabaseUrl}/rest/v1/advocates`);
        url.searchParams.set('status', 'eq.published');
        url.searchParams.set('order', 'seniority_rank.asc,joined_on.asc,full_name.asc');

        const response = await fetch(url.toString(), {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch advocates");
        }

        const data: Advocate[] = await response.json();
        setAdvocates(sortAdvocates(data));
      } catch (err) {
        console.error("Team page fetch error:", err);
        setError(err instanceof Error ? err.message : "Error loading team");
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