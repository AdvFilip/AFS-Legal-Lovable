export const FIRM = {
  name: "AFS Legal",
  tagline: "Advocates & Legal Consultants",
  city: "Tiruchirappalli · Tamil Nadu · India",
  phone: "+91 94423 50036",
  phoneHref: "tel:+919442350036",
  email: "support@afslegal.in",
  emailHref: "mailto:support@afslegal.in",
  address:
    "No. 11, Madurai Road, Palakarai, Tiruchirappalli – 620 008, Tamil Nadu, India",
  website: "www.afslegal.in",
} as const;

export const NAV_ITEMS = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "Expertise", to: "/practice-areas" as const },
  { label: "Leadership", to: "/team" as const },
  { label: "Insights", to: "/insights" as const },
  { label: "Careers", to: "/careers" as const },
  { label: "Contact", to: "/contact" as const },
];

/* Expertise — four pillars, each with sub-disciplines */
export type ExpertisePillar = {
  num: string;
  title: string;
  blurb: string;
  areas: string[];
};

export const EXPERTISE: ExpertisePillar[] = [
  {
    num: "01",
    title: "Dispute Resolution & Litigation",
    blurb:
      "Considered courtroom representation across civil, criminal and consumer forums — built on rigorous preparation and a steady, evidence-first posture.",
    areas: [
      "Civil Litigation",
      "Criminal Defense",
      "Consumer Litigation",
      "Family & Matrimonial Matters",
    ],
  },
  {
    num: "02",
    title: "Property & Real Estate",
    blurb:
      "End-to-end advisory on land and property — from title scrutiny and documentation to representation in possession, partition and ownership disputes.",
    areas: [
      "Property Documentation",
      "Title Verification",
      "Land & Property Disputes",
      "Due Diligence",
    ],
  },
  {
    num: "03",
    title: "Business & Commercial Advisory",
    blurb:
      "Counsel for MSMEs, entrepreneurs and growing enterprises — contracts that hold, recoveries that move, and structures that align with how a business actually operates.",
    areas: [
      "MSME Advisory",
      "Commercial Contracts",
      "Recovery Proceedings",
      "Business Structuring",
    ],
  },
  {
    num: "04",
    title: "Emerging Practice Areas",
    blurb:
      "Practical guidance for clients navigating digital risk, cyber incidents and the legal questions arising from new technology and new ways of doing business.",
    areas: [
      "Cyber Law",
      "Digital Evidence",
      "Startup Advisory",
      "Data Protection",
    ],
  },
];

/* Legacy alias — some routes refer to PRACTICE_AREAS as a flat list */
export type PracticeArea = {
  num: string;
  title: string;
  blurb: string;
  tags: string[];
};

export const PRACTICE_AREAS: PracticeArea[] = EXPERTISE.map((p) => ({
  num: p.num,
  title: p.title,
  blurb: p.blurb,
  tags: p.areas,
}));

/* Leadership — real, named profiles only */
export type Advocate = {
  initials: string;
  name: string;
  honorific: string;
  quals: string;
  designation: string;
  bio: string;
  focus: string[];
};

export const LEADERSHIP: Advocate[] = [
  {
    initials: "FS",
    name: "A. Filip Shenan",
    honorific: "Adv.",
    quals: "MBA · M.Phil. · PGDEC · LLB (Hons)",
    designation: "Managing Counsel",
    bio: "A multidisciplinary professional with over 25 years of experience spanning legal practice, business operations, entrepreneurship, agriculture and organisational leadership. Brings a rare combination of courtroom rigour and operating-business judgement to every engagement.",
    focus: ["Civil & Commercial", "Property", "MSME Advisory", "Cyber Law"],
  },
  {
    initials: "NS",
    name: "N. Siva",
    honorific: "Adv.",
    quals: "B.Sc. · B.L.",
    designation: "Senior Counsel",
    bio: "Senior litigation professional with extensive experience in legal practice and dispute resolution. Known for measured courtroom advocacy and disciplined case management across civil and criminal matters.",
    focus: ["Civil Litigation", "Criminal Defense", "Dispute Resolution"],
  },
];

/* Industries served */
export const INDUSTRIES = [
  "Individuals & Families",
  "MSMEs",
  "Startups",
  "Agriculture & Agribusiness",
  "Real Estate",
  "Educational Institutions",
];

/* Insights — placeholder editorial content */
export type Insight = {
  num: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
};

export const INSIGHTS: Insight[] = [
  {
    num: "01",
    category: "Property Law",
    title: "Title Due Diligence Before Purchase: A Practical Checklist",
    excerpt:
      "A measured walk-through of the documentation, encumbrance enquiries and statutory checks that ought to precede any property acquisition in Tamil Nadu.",
    date: "June 2026",
    read: "8 min read",
  },
  {
    num: "02",
    category: "Consumer Rights",
    title: "Filing Effective Complaints Before Consumer Commissions",
    excerpt:
      "A structured note on jurisdiction, pleadings and evidentiary practice for consumer disputes — including the procedural shifts under the 2019 Act.",
    date: "May 2026",
    read: "6 min read",
  },
  {
    num: "03",
    category: "Cyber Law",
    title: "Section 65B and the Admissibility of Digital Evidence",
    excerpt:
      "An overview of how the courts have shaped the certification requirement for electronic records, and what litigants and businesses should preserve from day one.",
    date: "April 2026",
    read: "10 min read",
  },
  {
    num: "04",
    category: "MSME Advisory",
    title: "Recovering Outstanding Receivables Without Disrupting Business",
    excerpt:
      "Practical strategies for MSME proprietors — from structured demand notices to the disciplined use of summary procedures and arbitration.",
    date: "March 2026",
    read: "7 min read",
  },
];

/* Editorial pillars used on the homepage */
export const PILLARS = [
  {
    num: "01",
    title: "Considered Counsel",
    body: "Legal advice grounded in careful study of the facts, the record and the law — never rushed, never templated.",
  },
  {
    num: "02",
    title: "Business Sense",
    body: "Strategies informed by an honest understanding of how clients actually operate, transact and decide.",
  },
  {
    num: "03",
    title: "Long-Term Trust",
    body: "A practice built one engagement at a time — through discretion, accountability and consistent results.",
  },
];

export const STATS = [
  { num: "25+", label: "Years of Combined Practice" },
  { num: "04", label: "Pillars of Expertise" },
  { num: "06", label: "Sectors Served" },
  { num: "1:1", label: "Partner-Led Engagement" },
];