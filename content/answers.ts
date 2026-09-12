/**
 * Knowledge base for the "Ask me anything" widget.
 * No model, no API key — keyword-scored lookup over real content.
 * Keep answers first-person, short, and honest.
 */

export type Answer = {
  id: string;
  /** words/phrases that should route a question here */
  match: string[];
  /** shown as a suggestion chip when `suggest` is true */
  question: string;
  suggest?: boolean;
  answer: string;
  link?: { label: string; href: string };
};

export const answers: Answer[] = [
  {
    id: "who",
    match: ["who are", "who is", "about you", "yourself", "intro", "bio", "background", "tell me about"],
    question: "Who are you?",
    suggest: true,
    answer:
      "Kaustubh Jain. I spent three years as an engineer at Bank of America — .NET modernization, release automation, and a governed agentic-AI prototype called Helix. Now I'm at Masters' Union doing the PGP in Technology & Business Management, heading toward product, venture, or building something of my own.",
    link: { label: "Read the full story", href: "/about" },
  },
  {
    id: "looking",
    match: ["looking", "hiring", "job", "role", "opportunity", "available", "hire", "want", "seeking", "open to"],
    question: "Are you looking for a job?",
    suggest: true,
    answer:
      "Yes — product roles, venture (early-stage diligence), and founder's-office / chief-of-staff work. I'm not fussy about the title; I care about being close to real decisions. Based in Gurugram, open to relocating.",
    link: { label: "Email me", href: "mailto:kaustubhjain98@gmail.com" },
  },
  {
    id: "helix",
    match: ["helix", "agentic", "ai framework", "ci/cd", "cicd", "pipeline", "agent"],
    question: "What's Helix?",
    suggest: true,
    answer:
      "A governed agentic-AI framework for CI/CD. Banking releases are fragile and manual, but 'let an AI run the pipeline' is a non-starter in a bank. So I built a proof-of-concept where agents propose actions and a human approves anything touching production — with a full audit trail and one-command rollback. Wrote it up as an internal white paper; it earned a High Five Award in the DCRS Innovation Challenge.",
    link: { label: "Read the case study", href: "/work/helix" },
  },
  {
    id: "firststep",
    match: ["firststep", "first step", "legal", "law", "legal ai", "side project", "own product", "shipped"],
    question: "What have you shipped on your own?",
    suggest: true,
    answer:
      "FirstStep Legal AI — a plain-language guide to Indian law. Ask a question, get an answer with the exact Act and Section, a link to the official source (India Code, eCourts, NALSA), and a concrete next step. Guided pathways for the common cases: cheque bounce under Section 138, tenant eviction, domestic-violence support, consumer complaints. It's live.",
    link: { label: "Open FirstStep", href: "https://firststeplegalai.lovable.app/" },
  },
  {
    id: "work",
    match: ["work", "projects", "portfolio", "case study", "case studies", "built", "experience"],
    question: "Show me your work",
    answer:
      "Four builds: FirstStep Legal AI (my own product, live), Helix (the agentic-AI framework), the subpoena-processing migration at Bank of America, and a platform consolidation that cut ~2.5 hours of manual release work a day for a team of 11.",
    link: { label: "See all four", href: "/work" },
  },
  {
    id: "boa",
    match: ["bank of america", "boa", "bank", "banking", "previous job", "last job", "engineer"],
    question: "What did you do at Bank of America?",
    answer:
      "Feb 2023 to June 2026, in Global Markets & Consumer Banking Technology at GIFT City. Migrated core apps from .NET Framework 4.8 to .NET 8, containerized onto OpenShift, automated the daily release with Ansible and Jenkins, and coordinated a 150+ server Captiva upgrade to hit the August release. Four recognition awards while I was there.",
    link: { label: "The details", href: "/work/platform-automation" },
  },
  {
    id: "why-product",
    match: ["why product", "why switch", "why pm", "transition", "pivot", "career change", "why leave"],
    question: "Why the switch from engineering?",
    answer:
      "Because the interesting part was never the code. It was deciding what to build. At the bank I kept finding that the 'engineering task' was really a product decision in disguise — a migration was a chance to fix the workflow, an automation project was really about developer experience. I want to be on that side of the line.",
    link: { label: "How I think", href: "/about#playbook" },
  },
  {
    id: "education",
    match: ["education", "masters union", "mba", "degree", "study", "college", "university", "cdac", "school"],
    question: "Where did you study?",
    answer:
      "Masters' Union — PGP in Technology & Business Management, 2026 to 2027, in Gurugram. Before that a postgraduate diploma in advanced computing at C-DAC Pune, and before that a B.E. in Civil Engineering from Savitribai Phule Pune University. Not a straight line.",
    link: { label: "The whole route", href: "/about" },
  },
  {
    id: "investing",
    match: ["investing", "fund", "muif", "portfolio fund", "stocks", "markets", "vc", "venture"],
    question: "Do you invest?",
    answer:
      "I run a live book in the Masters' Union Investment Fund, currently in the top percentile. Venture is one of the three paths I'm seriously considering — early-stage diligence is a good fit for someone who can actually read the technical claims in a pitch.",
  },
  {
    id: "skills",
    match: ["skills", "stack", "tech", "technologies", "tools", "languages", "code"],
    question: "What's your stack?",
    answer:
      ".NET Core / C#, Java, SQL, Jenkins, Ansible, OpenShift, Kafka, Splunk, MongoDB, Git, JIRA. On the product side: PRDs, RICE/MoSCoW prioritization, roadmaps, GTM, product metrics. This site is Next.js and TypeScript, built from scratch.",
  },
  {
    id: "resume",
    match: ["resume", "cv", "download", "pdf"],
    question: "Can I see your résumé?",
    suggest: true,
    answer: "Yes — one page, PDF.",
    link: { label: "Download the résumé", href: "/kaustubh-jain-resume.pdf" },
  },
  {
    id: "contact",
    match: ["contact", "email", "reach", "linkedin", "get in touch", "message", "talk"],
    question: "How do I reach you?",
    answer:
      "Email is fastest — kaustubhjain98@gmail.com. I'm also on LinkedIn and GitHub. I read everything and reply to most of it.",
    link: { label: "Email me", href: "mailto:kaustubhjain98@gmail.com" },
  },
  {
    id: "games",
    match: ["game", "games", "fun", "play", "playground", "arcade", "bored"],
    question: "Show me the fun stuff",
    suggest: true,
    answer:
      "There's a Playground: Ship It (call features ship/defer/cut before the clock runs out), Bug Squash (thirty seconds, click the bugs), and a Decisions deck of twelve real calls I've made where you choose first and then see what I actually did.",
    link: { label: "Go to the Lab", href: "/lab" },
  },
  {
    id: "decisions",
    match: ["decisions", "deck", "judgment", "calls", "how do you decide", "prioritize", "prioritise"],
    question: "How do you make decisions?",
    answer:
      "Best way to find out is to make a few yourself. The Decisions deck has twelve real calls from my work — product prioritization, a couple of investment ones, and one you make on-call. You choose, then you see the call I made and what happened.",
    link: { label: "Play the deck", href: "/decisions" },
  },
  {
    id: "location",
    match: ["where", "location", "based", "city", "relocate", "remote", "india"],
    question: "Where are you based?",
    answer: "Gurugram, India — on campus at Masters' Union. Originally from Dondaicha, then Pune for a decade. Open to relocating.",
  },
  {
    id: "site",
    match: ["site", "website", "this", "built this", "how did you build", "nextjs", "made"],
    question: "How was this site built?",
    answer:
      "Next.js, TypeScript and Tailwind, deployed on Vercel, no site builder. The games, the decision deck and this chat are all hand-built. The 'tech pulse' on the homepage pulls the top Hacker News story live, so it's different every visit.",
    link: { label: "Source on GitHub", href: "https://github.com/kaust1495" },
  },
  {
    id: "weakness",
    match: ["weakness", "bad at", "worst", "fail", "failure", "mistake", "flaw"],
    question: "What are you bad at?",
    answer:
      "I over-own things. If something's broken and nobody's holding it, I'll pick it up — which is useful right up until it isn't, and I'm three projects deep on work nobody asked for. I'm learning to say 'that's a real problem and it isn't mine this quarter.'",
  },
  {
    id: "debate",
    match: ["debate", "debating", "hobby", "hobbies", "outside work", "interests", "civil"],
    question: "What do you do outside work?",
    answer:
      "I was a competitive debater for years — still the most useful training I've had for product and investment arguments. I also trained as a civil engineer; my final-year work on retrofitting a campus into a green building was published in JETIR in 2021.",
  },
];

export const fallback = {
  answer:
    "I don't have a canned answer for that one — I'm a lookup over what's on this site, not a live model. Try one of the suggestions, or just email Kaustubh and ask him directly.",
  link: { label: "Email Kaustubh", href: "mailto:kaustubhjain98@gmail.com" },
};

export const greeting =
  "Hi — I'm a small guide to this site. Ask me something, or pick one of these:";
