/**
 * Single source of truth for site content.
 * Facts here are drawn from Kaustubh's resume set + Master CV (Sept 2026).
 * Anything uncertain is tracked in /MISSING_INFO.md — keep this file conservative.
 */

export const person = {
  name: "Kaustubh Jain",
  fullName: "Kaustubh Anilkumar Jain",
  monogram: "KJ",
  // Positioning is deliberately not tied to one job title.
  role: "Product · Systems · 0→1",
  location: "Gurugram, India",
  email: "kaustubhjain98@gmail.com",
  linkedin: "https://www.linkedin.com/in/kaustubh-jain-495459243",
  resumeHref: "/kaustubh-jain-resume.pdf",
  // Drives metadataBase / OG / sitemap / JSON-LD.
  siteUrl: "https://kaustubhjain.vercel.app",
} as const;

export const hero = {
  eyebrow: "Builder · Operator · Investor-in-training",
  statement: "I build things — and I decide what's worth building.",
  sub:
    "Three years an engineer at Bank of America: .NET modernization, release automation, a governed agentic-AI prototype. Now at Masters' Union, moving between product, venture, and starting something of my own.",
};

// Short, first-person, meant to be edited often. Shown as a ticker on the console.
export const status = {
  updated: "September 2026",
  items: [
    "shipping v2 of this site, in public",
    "running a top-percentile book in the Masters' Union Investment Fund",
    "prototyping in the agentic-AI + legal space",
    "in case competitions — Galderma, and others via Unstop",
  ],
};

export type Destination = {
  id: string;
  label: string;
  blurb: string;
  kbd: string;
  href: string;
  featured?: boolean;
};

// The workbench. Order = visual order on the console.
export const destinations: Destination[] = [
  { id: "decisions", label: "Decisions", blurb: "Make the call. See the call I made.", kbd: "D", href: "/decisions", featured: true },
  { id: "work", label: "Work", blurb: "Four builds, four turning points.", kbd: "W", href: "/work", featured: true },
  { id: "about", label: "About", blurb: "The non-linear route to here.", kbd: "A", href: "/about" },
  { id: "playbook", label: "Playbook", blurb: "How I think about building.", kbd: "P", href: "/about#playbook" },
  { id: "now", label: "Now", blurb: "What I'm actually doing this month.", kbd: "N", href: "/about#now" },
  { id: "contact", label: "Contact", blurb: "Email · LinkedIn · résumé.", kbd: "C", href: "/about#contact" },
];

export const now = {
  heading: "Where I am now",
  body: [
    "I'm in the PGP in Technology & Business Management at Masters' Union in Gurugram — a deliberate pivot from writing the code to choosing what the code should do.",
    "Day to day: managing a live portfolio in the top percentile of the Masters' Union Investment Fund, competing in case competitions (Galderma, and others through Unstop), and shipping side projects like FirstStep Legal AI.",
    "The path here wasn't linear — civil engineering, then advanced computing at C-DAC, then three and a half years of infrastructure work at Bank of America. What I keep coming back to: the interesting problems sit between what's technically true and what's worth doing.",
  ],
  targets: [
    { k: "Product", v: "0→1 and platform, technical products, AI-native workflows" },
    { k: "Venture", v: "early-stage diligence, technical evaluation, markets" },
    { k: "Founder's office", v: "chief-of-staff-style execution, cross-functional glue" },
  ],
};

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  timeframe: string;
  tags: string[];
  context: string;
  insight: string;
  work: string[];
  outcome: string[];
  href?: string;
  note?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "firststep",
    index: "01",
    title: "FirstStep Legal AI",
    kicker: "A plain-language guide to Indian law — and the next step to take",
    timeframe: "2025 · live",
    tags: ["0→1", "Consumer product", "Applied AI", "Legal access"],
    context:
      "Most people in India meet a legal problem — a bounced cheque, an eviction notice, a delayed salary, an FIR — with no idea what the law actually says or what to do first. The answers exist, buried in bare acts and government portals written for lawyers.",
    insight:
      "People don't need a chatbot that sounds confident. They need an answer they can act on: what the law says, which Act and Section it comes from, the official source, and the concrete next step — plus an honest line about where information ends and advice begins.",
    work: [
      "Designed and shipped FirstStep Legal AI: ask in plain language, get an explanation with Act and Section citations, jurisdiction-aware guidance, and links to official sources — India Code, eCourts, NALSA.",
      "Built guided pathways for the most common situations — cheque bounce under Section 138, tenant eviction, domestic-violence support, consumer complaints — as step-by-step flows rather than open-ended chat.",
      "Made the trust boundary explicit throughout: legal information, not legal advice, not reviewed by a lawyer.",
    ],
    outcome: [
      "Live and usable at firststeplegalai.lovable.app.",
      "A working answer to a question I keep asking: what does a responsible AI product look like in a high-stakes domain?",
    ],
    href: "https://firststeplegalai.lovable.app/",
    note: "Solo project, built with AI-assisted tooling. Ongoing.",
  },
  {
    id: "helix",
    index: "02",
    title: "Helix",
    kicker: "A governed agentic-AI framework for CI/CD",
    timeframe: "2025",
    tags: ["Agentic AI", "Release engineering", "Whitepaper + PoC", "Governance"],
    context:
      "Enterprise banking releases are fragile and heavily manual: every deployment is a checklist a person walks by hand, and a missed step can mean downtime for thousands of internal users. The obvious pitch — 'let an AI agent run the pipeline' — is a non-starter in a bank, because an autonomous system you can't audit or stop is a risk, not a tool.",
    insight:
      "Autonomy isn't the hard part. Trust is. An agent that acts on a regulated release pipeline needs the same things a junior engineer needs before you hand them production: scoped permissions, approval gates, a full audit trail, and a guaranteed way to roll back.",
    work: [
      "Designed a controlled agent architecture where agents propose actions but a human approves anything that touches a client-facing environment.",
      "Built a working proof-of-concept against real release workflows, with change logging and automated rollback as first-class features rather than afterthoughts.",
      "Wrote it up as an internal white paper and took it into the DCRS Innovation Challenge.",
    ],
    outcome: [
      "Earned a High Five Award in the DCRS Innovation Challenge for the approach.",
      "Reframed the internal conversation from 'can we trust AI in the pipeline' to 'what guardrails make it trustworthy'.",
    ],
    note: "PoC + white paper. Framework was not deployed to production.",
  },
  {
    id: "subpoena-migration",
    index: "03",
    title: "Subpoena processing migration",
    kicker: "Moving legal-document intake off a legacy system — LOSO, May 2025",
    timeframe: "2024–2025",
    tags: ["Platform migration", "Workflow redesign", "Compliance", "Dashboards"],
    context:
      "Subpoena and legal-document processing ran on a legacy intake system (FIRST) with limited visibility, manual assignment, and no real reporting. The mandate looked like a lift-and-shift onto Captiva and the Legal Tracking System. It wasn't.",
    insight:
      "A migration is a product decision in disguise. Moving the same broken workflow to a new platform just relocates the pain. The value was in redesigning how work gets routed, tracked, and reported — using the migration as the moment to do it.",
    work: [
      "Coordinated across engineering and compliance to sequence the cutover without breaking active legal matters.",
      "Shipped automated case assignment, personal work queues, and real-time dashboards as part of the move.",
      "Enabled forward-compatible document routing so digital intake and the new repository stayed in sync.",
    ],
    outcome: [
      "Delivered the LOSO May 2025 release on schedule with continuity of active matters.",
      "Turned an opaque manual process into one with live status, ownership, and management reporting.",
    ],
  },
  {
    id: "platform-automation",
    index: "04",
    title: "Platform consolidation & release automation",
    kicker: "Treating internal developer experience as a product",
    timeframe: "2024–2026",
    tags: ["Developer experience", "Automation", "OpenShift", "Infra"],
    context:
      "Core banking applications ran on .NET Framework 4.8 across a sprawl of physical servers, with 2–3 components deployed by hand every day. Environments drifted, releases took hours of manual effort, and the toil fell on a small team.",
    insight:
      "Internal tools have users too. The developers and administrators inside the bank are a user base with a workflow, a satisfaction level, and metrics — and nobody was treating their experience as a product.",
    work: [
      "Helped lead the migration of core applications from .NET Framework 4.8 to .NET 8, prioritizing by user impact and technical-debt reduction.",
      "Containerized web applications and deployment pipelines onto OpenShift to standardize environments and kill configuration drift.",
      "Automated the daily deployment cycle with Ansible and Jenkins, and coordinated a 150+ server upgrade for the Captiva platform to hit the August release date.",
    ],
    outcome: [
      "Cut roughly 2.5 hours of manual release work per day for a cross-functional team of 11.",
      "Consolidated 50+ physical servers and gave every environment the same shape.",
      "Roughly 40% reduction in deployment lag on the containerized applications.",
    ],
  },
];

export const principles = [
  {
    n: "01",
    title: "Own the problem nobody flagged",
    body:
      "The Helix work started because releases were quietly getting riskier, not because anyone asked me to fix it. The judgment call — deciding a thing is worth owning before it's on fire — matters more than the build.",
  },
  {
    n: "02",
    title: "A migration is a product decision in disguise",
    body:
      "Every 'just move it' project is a chance to fix the workflow underneath. If you don't, you've spent the budget and kept the problem.",
  },
  {
    n: "03",
    title: "Automation is a trust exercise",
    body:
      "People don't adopt an automated pipeline because it's clever. They adopt it because they can see what it did, undo it, and explain it to an auditor.",
  },
  {
    n: "04",
    title: "Internal users are still users",
    body:
      "The developer waiting on a deploy has a worse day than most customers ever do. Measure it, and it gets better.",
  },
];

export const beyond = {
  heading: "Before this",
  body: [
    "I trained as a civil engineer. My final-year work — a structural and energy assessment for retrofitting an existing campus into a green building — was published in the JETIR journal in 2021.",
    "Then a postgraduate diploma in advanced computing at C-DAC, where I built a full-stack rental-marketplace project, and a switch into software.",
    "Somewhere in there I also spent years as a competitive debater, which is still the most useful training I've had for product and investment arguments: hold a position, steelman the other one, change your mind in public when the evidence does.",
  ],
  facts: [
    { k: "Education", v: "PGP TBM, Masters' Union · PGDAC, C-DAC · B.E. Civil, SPPU" },
    { k: "Investing", v: "Masters' Union Investment Fund — managing a live portfolio, top percentile" },
    { k: "Published", v: "Green-building retrofit study, JETIR Vol. 8 (2021)" },
    { k: "Recognition", v: "Four awards at Bank of America — Silver, Bronze, 2× High Five" },
    { k: "Languages", v: "English, Hindi, Marathi" },
    { k: "Certifications", v: "McKinsey Forward Program · .NET Core · Kafka · GitHub Copilot" },
  ],
  exploring: [
    "Agentic systems and where governance has to sit for them to be usable",
    "Capital markets, fintech, and how technical diligence actually gets done",
    "What a great internal product team measures",
  ],
};

export const github = "https://github.com/kaust1495";
export const firstStep = "https://firststeplegalai.lovable.app/";

export const contact = {
  heading: "Get in touch",
  line:
    "Hiring for product, building a fund, starting something, or just want to compare notes on agentic systems — I read everything that comes in and reply to most of it.",
  links: [
    { label: "Email", value: person.email, href: `mailto:${person.email}` },
    { label: "LinkedIn", value: "in/kaustubh-jain", href: person.linkedin },
    { label: "GitHub", value: "@kaust1495", href: github },
    { label: "Résumé", value: "PDF ↗", href: person.resumeHref },
  ],
};

// External links surfaced in the command bar.
export const externalLinks = [
  { label: "LinkedIn", href: person.linkedin },
  { label: "GitHub", href: github },
  { label: "FirstStep Legal AI (live project)", href: firstStep },
  { label: "Email Kaustubh", href: `mailto:${person.email}` },
  { label: "Download résumé (PDF)", href: person.resumeHref },
];

export const marqueeWords = [
  "product judgment",
  "0→1",
  "agentic systems + governance",
  "release engineering",
  "technical diligence",
  "capital allocation",
  "developer experience",
  "founder's office",
  "platform migration",
  "shipping in public",
];
