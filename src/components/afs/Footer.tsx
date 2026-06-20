import { Link } from "@tanstack/react-router";
import { FIRM, NAV_ITEMS } from "@/lib/afs-data";
import logo from "@/assets/afs-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-hairline-soft)] bg-[color:var(--color-ink-deep)] text-[color:var(--color-text-invert-muted)]">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <img
                src={logo.url}
                alt="AFS Legal crest"
                className="h-14 w-auto object-contain opacity-95"
                width={56}
                height={56}
              />
              <div>
                <div className="font-display text-xl text-[color:var(--color-text-invert)] leading-tight">
                  AFS Legal
                </div>
                <div className="eyebrow text-[0.55rem] mt-1 text-[color:var(--color-gold-pale)]">
                  Advocates &amp; Legal Consultants
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm leading-[1.95] max-w-sm">
              A multidisciplinary legal practice in Tiruchirappalli, delivering
              considered counsel and trusted representation to individuals,
              businesses and institutions.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="eyebrow text-[0.58rem] mb-5 text-[color:var(--color-gold-pale)]">
              Navigate
            </div>
            <ul className="space-y-3 text-sm">
              {NAV_ITEMS.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="hover:text-[color:var(--color-gold-pale)] transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="eyebrow text-[0.58rem] mb-5 text-[color:var(--color-gold-pale)]">
              Contact
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={FIRM.phoneHref}
                  className="hover:text-[color:var(--color-gold-pale)] transition-colors"
                >
                  {FIRM.phone}
                </a>
              </li>
              <li>
                <a
                  href={FIRM.emailHref}
                  className="hover:text-[color:var(--color-gold-pale)] transition-colors"
                >
                  {FIRM.email}
                </a>
              </li>
              <li className="leading-relaxed opacity-80">{FIRM.address}</li>
            </ul>
            <div className="eyebrow text-[0.58rem] mt-8 mb-4 text-[color:var(--color-gold-pale)]">
              Legal
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/disclaimer"
                  className="hover:text-[color:var(--color-gold-pale)] transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[color:var(--color-gold-pale)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[color:var(--color-hairline-invert)] flex flex-col md:flex-row justify-between gap-4 text-[0.7rem] tracking-wider opacity-70">
          <div>© {new Date().getFullYear()} AFS Legal. All rights reserved.</div>
          <div className="max-w-xl">
            As per Bar Council of India rules, this website is for informational
            purposes only. Nothing here constitutes legal advice or solicitation.
          </div>
        </div>
      </div>
    </footer>
  );
}