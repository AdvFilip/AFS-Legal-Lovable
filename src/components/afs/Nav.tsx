import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/afs-data";
import logo from "@/assets/afs-logo.png.asset.json";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-[color:var(--color-ink-deep)] focus:text-[color:var(--color-gold-pale)] focus:px-4 focus:py-2 focus:text-xs"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-[color:var(--color-ink-deep)]/95 backdrop-blur-2xl border-b border-[color:var(--color-gold)]/20 h-[68px] shadow-xl shadow-black/40"
            : "bg-transparent h-[88px]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20 h-full transition-[height] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
          <Link
            to="/"
            className="flex items-center gap-4 group"
            aria-label="AFS Legal home"
          >
            <img
              src={logo.url}
              alt="AFS Legal crest"
              className={`w-auto object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "h-9" : "h-11"}`}
              width={44}
              height={44}
            />
            <div className="hidden sm:flex flex-col leading-tight border-l border-[color:var(--color-hairline-soft)] pl-4">
              <span className="font-display text-[0.95rem] tracking-[0.02em] text-[color:var(--color-text-strong)] leading-none">
                AFS Legal
              </span>
              <span className="eyebrow text-[0.46rem] mt-2">
                Advocates &amp; Legal Consultants
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-4 py-2 text-[0.65rem] tracking-[0.32em] uppercase font-semibold text-[color:var(--color-text)] hover:text-[color:var(--color-gold-pale)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group"
                activeProps={{ className: "text-[color:var(--color-gold-pale)]" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
                <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-gradient-to-r from-[color:var(--color-gold-deep)] to-[color:var(--color-gold-pale)] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="lg:hidden p-2 text-[color:var(--color-text-strong)] min-h-11 min-w-11 inline-flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-[color:var(--color-hairline-soft)] bg-[color:var(--color-paper)]">
            <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="py-4 text-sm tracking-[0.22em] uppercase font-medium text-[color:var(--color-text)] border-b border-[color:var(--color-hairline-soft)] last:border-0 hover:text-[color:var(--color-gold-deep)] transition-colors"
                  activeProps={{ className: "text-[color:var(--color-gold-deep)]" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}