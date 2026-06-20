import { useEffect, useState } from "react";
import logo from "@/assets/afs-logo.png.asset.json";

const KEY = "afs-disclaimer-accepted-v2";

export function Disclaimer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const accept = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* noop */
    }
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="afs-disc-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--color-ink-deep)]/85 backdrop-blur-sm px-6"
    >
      <div className="max-w-[640px] w-full border border-[color:var(--color-hairline)] p-10 md:p-14 bg-[color:var(--color-paper)] shadow-2xl">
        <div className="flex items-center gap-5 mb-8">
          <img
            src={logo.url}
            alt="AFS Legal crest"
            className="h-14 w-auto object-contain"
            width={56}
            height={56}
          />
          <div className="border-l border-[color:var(--color-hairline-soft)] pl-5">
            <div className="font-display text-lg text-[color:var(--color-text-strong)] leading-tight">
              AFS Legal
            </div>
            <div className="eyebrow text-[0.55rem] mt-1">
              Advocates &amp; Legal Consultants
            </div>
          </div>
        </div>
        <div className="hairline mb-8" />
        <h2
          id="afs-disc-title"
          className="serif-heading text-2xl md:text-3xl mb-6 text-[color:var(--color-text-strong)]"
        >
          Legal Disclaimer
        </h2>
        <p className="text-sm leading-[1.85] text-[color:var(--color-text-muted)] mb-8">
          The Bar Council of India does not permit advertisement or solicitation
          by advocates in any form or manner. By accessing this website, you
          acknowledge that you are seeking information relating to AFS Legal of
          your own accord and that there has been no solicitation by AFS Legal
          or its members. The content of this website is for informational
          purposes only and should not be interpreted as legal advice.
        </p>
        <button
          onClick={accept}
          className="w-full md:w-auto px-8 py-3 bg-[color:var(--color-ink-deep)] text-[color:var(--color-text-invert)] text-xs tracking-[0.24em] uppercase font-medium hover:bg-[color:var(--color-gold-deep)] hover:text-white transition-colors duration-300"
        >
          I Understand &amp; Proceed
        </button>
      </div>
    </div>
  );
}