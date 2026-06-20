# 💻 Code Snippets for Lovable
## Copy-Paste Ready Production Code

---

## 1️⃣ Font Import (Add to top of styles.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Crimson+Text:ital@0;1&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
```

---

## 2️⃣ Color Palette (@theme section)

```css
@theme {
  /* Premium Fonts */
  --font-display: "Playfair Display", Georgia, serif;
  --font-serif: "Crimson Text", Georgia, serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Premium Easing */
  --ease-silk: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-editorial: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-premium: cubic-bezier(0.2, 0, 0.38, 0.9);
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Premium Surfaces */
  --color-ink-deep: #0a0a0a;
  --color-ink: #0f0f0f;
  --color-paper: #1a1a1a;
  --color-paper-warm: #1f1f1f;
  --color-paper-card: #242424;
  --color-surface: #1a1a1a;
  --color-surface-subtle: #262626;

  /* Premium Text */
  --color-text-strong: #f5f5f5;
  --color-text: #e0e0e0;
  --color-text-muted: #a8a8a8;
  --color-text-subtle: #7a7a7a;
  --color-text-invert: #f5f5f5;
  --color-text-invert-muted: rgba(245, 245, 245, 0.7);

  /* Premium Gold & Accents */
  --color-gold: #d4af37;
  --color-gold-deep: #c9a961;
  --color-gold-pale: #e8d4a0;
  --color-gold-dim: rgba(212, 175, 55, 0.08);
  --color-accent: #8b9dc3;
  --color-accent-warm: #a89968;

  /* Refined Hairlines */
  --color-hairline: rgba(212, 175, 55, 0.2);
  --color-hairline-soft: rgba(245, 245, 245, 0.08);
  --color-hairline-invert: rgba(245, 245, 245, 0.12);
  --color-hairline-subtle: rgba(168, 153, 104, 0.1);
}
```

---

## 3️⃣ Premium Button Component

```tsx
export function GoldButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const cls =
    "inline-flex items-center justify-center gap-3 px-8 py-3 min-h-11 bg-[color:var(--color-gold-deep)] text-[color:var(--color-ink-deep)] text-[0.65rem] tracking-[0.34em] uppercase font-semibold transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color:var(--color-gold-pale)] hover:shadow-lg hover:shadow-[rgba(212,175,55,0.2)] active:scale-95 " +
    className;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
```

---

## 4️⃣ Premium Section Heading

```tsx
export function SectionHeading({
  children,
  em,
  invert = false,
}: {
  children: ReactNode;
  em?: string;
  invert?: boolean;
}) {
  return (
    <h2
      className={`font-serif font-bold text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] max-w-3xl leading-tight tracking-tight ${
        invert ? "text-[color:var(--color-text-invert)]" : "text-[color:var(--color-text-strong)]"
      }`}
    >
      {children}
      {em && (
        <em
          className={`italic font-serif font-bold ${
            invert ? "text-[color:var(--color-gold-pale)]" : "text-[color:var(--color-gold-deep)]"
          }`}
        >
          {" "}
          {em}
        </em>
      )}
    </h2>
  );
}
```

---

## 5️⃣ Premium Hero Typography

```tsx
<h1 className="font-serif font-bold text-[2rem] sm:text-[3rem] lg:text-[4rem] text-[color:var(--color-text-strong)] leading-tight tracking-tight">
  Strategic Legal Counsel.
  <br />
  Trusted Representation.
  <br />
  <em className="italic font-serif font-bold text-[color:var(--color-gold-deep)]">
    Practical Solutions.
  </em>
</h1>
```

---

## 6️⃣ Premium Practice Card

```tsx
<div className="group relative border-b border-r border-[color:var(--color-hairline-soft)] p-10 md:p-14 bg-[color:var(--color-paper-card)] hover:bg-[color:var(--color-surface-subtle)] transition-all duration-400 overflow-hidden card-hover">
  {/* Background gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-gold)]/0 to-[color:var(--color-gold)]/0 group-hover:from-[color:var(--color-gold)]/3 group-hover:to-[color:var(--color-gold)]/0 transition-all duration-500 pointer-events-none" />

  {/* Content */}
  <div className="relative">
    <div className="eyebrow mb-5 group-hover:text-[color:var(--color-gold-pale)] transition-colors duration-400">
      Pillar 01
    </div>

    <h3 className="font-serif font-bold text-[2rem] mb-5 group-hover:text-[color:var(--color-gold-pale)] transition-colors duration-400">
      Card Title
    </h3>

    <p className="text-base leading-relaxed text-[color:var(--color-text-muted)] mb-8 group-hover:text-[color:var(--color-text)] transition-colors duration-400">
      Card description here...
    </p>

    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-center gap-3 text-base transition-all duration-400 group-hover:translate-x-1"
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          <span className="h-px w-5 bg-[color:var(--color-gold-deep)] group-hover:w-8 group-hover:bg-[color:var(--color-gold-pale)] transition-all duration-400" />
          {item}
        </li>
      ))}
    </ul>
  </div>

  {/* Bottom accent line */}
  <span className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[color:var(--color-gold-deep)] to-[color:var(--color-gold-pale)] w-0 transition-all duration-700 group-hover:w-full" />
</div>
```

---

## 7️⃣ Premium Navigation Styling

```tsx
<header
  className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
    scrolled || open
      ? "bg-[color:var(--color-ink-deep)]/95 backdrop-blur-2xl border-b border-[color:var(--color-gold)]/20 h-[68px] shadow-xl shadow-black/40"
      : "bg-transparent h-[88px]"
  }`}
>
  {/* Nav links with gradient underline */}
  <Link
    to={item.to}
    className="relative px-4 py-2 text-[0.65rem] tracking-[0.32em] uppercase font-semibold text-[color:var(--color-text)] hover:text-[color:var(--color-gold-pale)] transition-all duration-400 group"
  >
    {item.label}
    <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-gradient-to-r from-[color:var(--color-gold-deep)] to-[color:var(--color-gold-pale)] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
  </Link>
</header>
```

---

## 8️⃣ Premium Utility Classes

```css
/* Card hover elevation */
@utility card-hover {
  transition: all 400ms var(--ease-silk);

  &:hover {
    background-color: var(--color-paper-card);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(245, 245, 245, 0.1);
    transform: translateY(-2px);
  }
}

/* Animated link underlines */
@utility link-premium {
  position: relative;
  color: var(--color-gold-deep);
  text-decoration: none;
  transition: color 400ms var(--ease-silk);

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--color-gold-pale);
    transition: width 400ms var(--ease-silk);
  }

  &:hover {
    color: var(--color-gold-pale);
    &::after {
      width: 100%;
    }
  }
}

/* Skeleton loader animation */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@utility skeleton {
  background: linear-gradient(
    90deg,
    var(--color-paper-card) 0%,
    var(--color-surface-subtle) 50%,
    var(--color-paper-card) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
}
```

---

## 9️⃣ Enhanced Base Transitions

```css
@layer base {
  a, button {
    transition:
      color 400ms var(--ease-silk),
      background-color 400ms var(--ease-silk),
      border-color 400ms var(--ease-silk),
      opacity 400ms var(--ease-silk),
      transform 400ms var(--ease-silk),
      box-shadow 400ms var(--ease-silk);
  }
}
```

---

## 🔟 Quick Copy-Paste Checklist

```
For styles.css:
☐ Line 1: Add Google Fonts import
☐ Lines 12-50: Update @theme colors
☐ Lines 335-400: Add new utilities

For components/afs/primitives.tsx:
☐ GoldButton: Update class names
☐ OutlineButton: Update class names
☐ SectionHeading: Update font classes

For components/afs/PracticeCard.tsx:
☐ Add gradient overlay div
☐ Update hover effects
☐ Add staggered animations

For components/afs/Nav.tsx:
☐ Update header backdrop blur
☐ Update border on scroll
☐ Update nav link styling

For routes/index.tsx:
☐ Update h1 class names
☐ Adjust font sizes
```

---

## 📋 By File Path

### If copying via Lovable editor:

1. **src/styles.css**
   - Paste entire updated file
   - Check fonts loading
   - Verify colors rendering

2. **src/components/afs/primitives.tsx**
   - Replace GoldButton function
   - Replace OutlineButton function
   - Replace SectionHeading function

3. **src/components/afs/PracticeCard.tsx**
   - Replace entire component
   - Test hover effects

4. **src/components/afs/Nav.tsx**
   - Update header className logic
   - Update nav link styling

5. **src/routes/index.tsx**
   - Find h1 element (around line 77)
   - Update className and styling

---

## ✅ Verification Steps

After pasting:

```
1. Save all files
2. Check for syntax errors (should be none)
3. Preview in Lovable
4. Verify fonts loaded (Google Fonts)
5. Check colors match specification
6. Test hover effects on cards
7. Test nav sticky behavior
8. Test on mobile preview
9. Check performance (no jank)
```

---

## 🎯 Colors Quick Reference

```
Primary Gold:        #d4af37  (buttons, accents)
Gold Deep:           #c9a961  (secondary gold)
Gold Pale:           #e8d4a0  (light accents)
Black Deep:          #0a0a0a  (primary background)
Paper Dark:          #1a1a1a  (secondary background)
Text Strong:         #f5f5f5  (headings, emphasis)
Text Regular:        #e0e0e0  (body text)
Text Muted:          #a8a8a8  (secondary text)
Blue-Gray Accent:    #8b9dc3  (accent color)
```

---

**All code is production-ready. Copy and deploy!** 🚀

