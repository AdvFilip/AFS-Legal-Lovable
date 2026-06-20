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

function getSeniorityLabel(rank: number): string {
  const labels: Record<number, string> = {
    1: "Partners",
    2: "Senior Associates",
    3: "Associates",
    4: "Of Counsel",
  };
  return labels[rank] || "Team";
}

function groupBySeniority(advocates: Advocate[]): Map<number, Advocate[]> {
  const groups = new Map<number, Advocate[]>();
  for (const a of advocates) {
    if (!groups.has(a.seniority_rank)) {
      groups.set(a.seniority_rank, []);
    }
    groups.get(a.seniority_rank)!.push(a);
  }
  return new Map([...groups.entries()].sort((a, b) => a[0] - b[0]));
}

function ListAdvocateCard({ a, index }: { a: Advocate; index: number }) {
  const languages = a.languages ?? [];
  const highlights = a.highlights ?? [];
  const secondaryPractices = a.secondary_practices ?? [];
  const primaryPractice = a.primary_practice ?? "";

  return (
    <Reveal
      delay={(index % 4) * 0.08}
      className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-14 py-14 border-t border-[color:var(--color-hairline-soft)]"
    >
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
              {a.full_name.split(" ").map((n) => n[0]).join("")}
            </span>
            <div className="absolute bottom-4 left-4 right-4 h-px bg-[color:var(--color-gold)]" />
          </div>
        )}
      </div>

      <div>
        <div className="eyebrow text-[0.6rem] mb-4">{a.designation}</div>
        <h3 className="serif-heading text-3xl md:text-4xl text-[color:var(--color-text-strong)] mb-2">
          {a.full_name}
        </h3>
        <div className="text-[0.78rem] tracking-wide text-[color:var(--color-gold-deep)] mb-6">
          {[a.enrollment_no, a.location].filter(Boolean).join(" • ")}
        </div>
        <div className="h-px w-12 bg-[color:var(--color-gold)] mb-6" />
        <p className="text-[0.95rem] leading-[1.95] text-[color:var(--color-text-muted)] max-w-2xl mb-6">
          {a.years_practice ? `${a.years_practice}+ years of experience` : "Advocate"}
          {primaryPractice ? ` in ${primaryPractice.toLowerCase()}.` : "."}
          {languages.length > 0 && ` Speaks ${languages.join(", ")}.`}
        </p>

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

        <div className="flex flex-wrap gap-2">
          {primaryPractice && (
            <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--color-text-muted)] border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-warm)] px-3 py-1.5">
              {primaryPractice}
            </span>
          )}
          {secondaryPractices.slice(0, 2).map((s) => (
            <span key={s} className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--color-text-muted)] border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-warm)] px-3 py-1.5">
              {s}
            </span>
          ))}
        </div>

        {a.email && (
          <div className="mt-6">
            <a href={`mailto:${a.email}`} className="text-[0.6rem] tracking-[0.2em] uppercase text-[color:var(--color-gold-deep)] hover:text-[color:var(--color-gold-pale)] transition-colors">
              Get in touch →
            </a>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function GridAdvocateCard({ a, index }: { a: Advocate; index: number }) {
  const languages = a.languages ?? [];
  const secondaryPractices = a.secondary_practices ?? [];
  const primaryPractice = a.primary_practice ?? "";

  return (
    <Reveal delay={(index % 12) * 0.04} className="group">
      <div className="border border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper-card)] p-6 h-full flex flex-col hover:border-[color:var(--color-gold-deep)] transition-colors">
        {/* Photo or Initials */}
        <div className="relative mb-4 h-40 flex items-center justify-center bg-[color:var(--color-paper-warm)] rounded overflow-hidden border border-[color:var(--color-hairline-soft)]">
          {a.photo_url ? (
            <img src={a.photo_url} alt={a.full_name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-display text-5xl text-[color:var(--color-gold-deep)]/60 group-hover:text-[color:var(--color-gold-deep)] transition-colors">
              {a.full_name.split(" ").map((n) => n[0]).join("")}
            </span>
          )}
        </div>

        {/* Name & Designation */}
        <h4 className="serif-heading text-lg text-[color:var(--color-text-strong)] mb-1">
          {a.full_name}
        </h4>
        <p className="text-xs text-[color:var(--color-gold-deep)] mb-3 uppercase tracking-wide">
          {a.designation}
        </p>

        {/* Location & Enrollment */}
        <p className="text-xs text-[color:var(--color-text-muted)] mb-3">
          {[a.enrollment_no, a.location].filter(Boolean).join(" • ")}
        </p>

        {/* Years & Languages */}
        <p className="text-xs text-[color:var(--color-text-muted)] mb-4 line-clamp-2">
          {a.years_practice ? `${a.years_practice}+ years` : "Advocate"}
          {languages.length > 0 && ` • ${languages.join(", ")}`}
        </p>

        {/* Practice Areas */}
        <div className="flex flex-wrap gap-1 mb-4">
          {primaryPractice && (
            <span className="text-[0.55rem] tracking-widest uppercase px-2 py-1 bg-[color:var(--color-gold-dim)] text-[color:var(--color-gold-deep)] rounded">
              {primaryPractice.split("&")[0].trim()}
            </span>
          )}
          {secondaryPractices.slice(0, 1).map((s) => (
            <span key={s} className="text-[0.55rem] tracking-widest uppercase px-2 py-1 bg-[color:var(--color-gold-dim)] text-[color:var(--color-gold-deep)] rounded">
              {s.split("&")[0].trim()}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-auto pt-4 border-t border-[color:var(--color-hairline-soft)]">
          {a.email ? (
            <a href={`mailto:${a.email}`} className="text-[0.6rem] tracking-widest uppercase text-[color:var(--color-gold-deep)] hover:text-[color:var(--color-gold-pale)] transition-colors">
              Contact →
            </a>
          ) : (
            <p className="text-[0.6rem] text-[color:var(--color-text-muted)]">No contact</p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function TeamPage() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
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

  const advocatesByRank = groupBySeniority(advocates);

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
        {/* View Toggle */}
        {advocates.length > 0 && (
          <div className="mb-8 flex gap-3">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors ${
                viewMode === "list"
                  ? "bg-[color:var(--color-gold-deep)] text-[color:var(--color-ink-deep)]"
                  : "bg-[color:var(--color-gold-dim)] text-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold-deep)] hover:text-[color:var(--color-ink-deep)]"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors ${
                viewMode === "grid"
                  ? "bg-[color:var(--color-gold-deep)] text-[color:var(--color-ink-deep)]"
                  : "bg-[color:var(--color-gold-dim)] text-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold-deep)] hover:text-[color:var(--color-ink-deep)]"
              }`}
            >
              Grid View
            </button>
          </div>
        )}

        <div>
          {loading ? (
            <p className="text-[color:var(--color-text-muted)]">Loading team...</p>
          ) : error ? (
            <p className="text-red-300">{error}</p>
          ) : advocates.length === 0 ? (
            <p className="text-[color:var(--color-text-muted)]">Team members coming soon.</p>
          ) : viewMode === "list" ? (
            advocates.map((a, i) => <ListAdvocateCard key={a.id} a={a} index={i} />)
          ) : (
            <div className="space-y-12">
              {Array.from(advocatesByRank.entries()).map(([rank, group]) => (
                <div key={rank}>
                  <h3 className="text-sm font-semibold text-[color:var(--color-gold-deep)] uppercase tracking-widest mb-6">
                    {getSeniorityLabel(rank)}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.map((a, i) => (
                      <GridAdvocateCard key={a.id} a={a} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
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