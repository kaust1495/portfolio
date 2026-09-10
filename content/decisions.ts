/**
 * The Decisions deck — the interactive centerpiece.
 * Three card kinds, one format: you make the call, then see the call Kaustubh made.
 * All grounded in real work (see content/profile.ts). Keep it honest and specific.
 */

export type Choice = { id: string; label: string; hint?: string };

export type DecisionCard =
  | {
      kind: "prioritize";
      id: string;
      tag: string;
      prompt: string;
      context: string;
      choices: Choice[]; // usually ship / defer / cut
      pick: string; // choice id Kaustubh made
      verdict: string; // "here's the call I made, and why"
      outcome: string;
    }
  | {
      kind: "invest";
      id: string;
      tag: string;
      prompt: string; // the one-line pitch
      context: string;
      choices: Choice[]; // back / pass
      pick: string;
      verdict: string;
      outcome: string;
    }
  | {
      kind: "branch";
      id: string;
      tag: string;
      prompt: string;
      context: string;
      choices: Choice[];
      // per-choice immediate consequence shown before the final verdict
      consequences: Record<string, string>;
      pick: string;
      verdict: string;
      outcome: string;
    };

export const deckIntro = {
  title: "Decisions",
  line: "Twelve calls from real work — product, capital, and one you make on-call. Pick, then see what I did.",
  kinds: [
    { k: "prioritize", label: "Ship / defer / cut", desc: "product prioritization" },
    { k: "invest", label: "Back / pass", desc: "early-stage judgment" },
    { k: "branch", label: "Live scenario", desc: "you're on-call" },
  ],
};

export const decisions: DecisionCard[] = [
  {
    kind: "prioritize",
    id: "automate-vs-feature",
    tag: "Bank of America · release engineering",
    prompt:
      "The daily release takes ~2.5 hours of manual work. The team wants a new automation tool for a workflow they own. What gets built first?",
    context:
      "You have one engineer's worth of time. The manual deploy is 2–3 components a day, done by hand, for a team of 11. The requested tool is real but not on fire.",
    choices: [
      { id: "automate", label: "Automate the deploy", hint: "fix your own toil first" },
      { id: "tool", label: "Build the team's tool", hint: "serve the stated ask" },
      { id: "split", label: "Split the sprint", hint: "half and half" },
    ],
    pick: "automate",
    verdict:
      "Automate the deploy. The 2.5 hours wasn't just lost time — it was the thing blocking every other improvement. You can't iterate quickly on a pipeline a human walks by hand. Fixing it first made everything after it cheaper.",
    outcome:
      "Ansible + Jenkins pipeline for the daily components. ~2.5 hours/day back for the team; the requested tool shipped the following cycle, faster, on the freed-up capacity.",
  },
  {
    kind: "branch",
    id: "friday-deploy",
    tag: "Helix · you're on-call",
    prompt:
      "An AI agent has queued a production deployment for Friday 4pm. All automated checks passed. You're the human in the loop. Your move?",
    context:
      "This is the exact situation Helix was built for. The agent is capable and the checks are green. It's still Friday afternoon, and it's still a bank.",
    choices: [
      { id: "approve", label: "Approve it" },
      { id: "hold", label: "Hold until Monday" },
      { id: "test", label: "Require a human smoke test first" },
    ],
    consequences: {
      approve:
        "It deploys clean — this time. But you've just taught the system that green checks are enough to ship into the weekend unattended. The next agent, on a worse day, learns the same lesson.",
      hold:
        "Safe, but you've made the agent useless for anything time-sensitive. If 'hold until a human feels comfortable' is the real policy, the automation is theatre.",
      test:
        "Slower, but now there's a defined gate the agent can't talk its way past, and a human signal on the record. This scales.",
    },
    pick: "test",
    verdict:
      "Require the gate. The point of Helix was never 'trust the agent' — it was 'make the agent operate inside rules a human set.' Approval gates, a smoke test on anything client-facing, full audit trail, one-command rollback. Autonomy you can't inspect or stop isn't a tool, it's a liability.",
    outcome:
      "Helix's design puts a human approval gate on anything touching a client environment, with every agent action logged and reversible. Earned a High Five Award in the DCRS Innovation Challenge.",
  },
  {
    kind: "prioritize",
    id: "migration-scope",
    tag: "Bank of America · subpoena processing",
    prompt:
      "You've been asked to move legal-document intake from a legacy system onto a new platform. Same workflow, new home. How much do you touch?",
    context:
      "The old system has no real visibility, manual case assignment, and no reporting. The safe read of the mandate is: lift and shift, don't redesign.",
    choices: [
      { id: "lift", label: "Lift and shift", hint: "lowest risk, fastest" },
      { id: "redesign", label: "Redesign the workflow", hint: "use the move to fix it" },
      { id: "phase", label: "Shift now, fix later", hint: "two projects" },
    ],
    pick: "redesign",
    verdict:
      "Redesign it during the move. A migration is a product decision in disguise — it's the one time everyone's already touching the system and expecting change. 'Fix it later' almost always means never, because the budget and attention are gone once it's live.",
    outcome:
      "Shipped the LOSO May 2025 release with automated case assignment, personal work queues, and real-time dashboards built in. An opaque manual process became one with live status, ownership, and reporting.",
  },
  {
    kind: "invest",
    id: "legal-ai",
    tag: "You're the investor",
    prompt:
      "“An AI that answers everyday legal questions for India in plain language — with the exact Act and Section, the official source, and the next step. Not a lawyer, a first step.”",
    context:
      "Huge underserved need. Also a crowded 'AI wrapper' category, a hard trust bar, and no obvious moat on day one. (Full disclosure: I built one of these.)",
    choices: [
      { id: "back", label: "Back it" },
      { id: "pass", label: "Pass" },
    ],
    pick: "back",
    verdict:
      "Back it — but on the team's judgment about trust, not the tech. Anyone can wrap a model. The defensible version is the one that's obsessive about citations, jurisdiction, and saying 'this is where information ends and advice begins.' The moat is earned reliability in a domain where being confidently wrong is catastrophic.",
    outcome:
      "I shipped FirstStep Legal AI to test exactly this — guided pathways for the common cases (cheque bounce, eviction, domestic violence), every answer tied to India Code / eCourts / NALSA. Live at firststeplegalai.lovable.app.",
  },
  {
    kind: "prioritize",
    id: "safety-vs-demo",
    tag: "Helix · before the pitch",
    prompt:
      "Your agentic-AI prototype works in a demo. You're about to show leadership. Do you build the safety layer first, or show the capability now and add guardrails after?",
    context:
      "The demo is impressive on its own. Rollback, audit logging, and approval gates are unglamorous and would push the reveal back two weeks.",
    choices: [
      { id: "safety", label: "Safety layer first" },
      { id: "demo", label: "Show it now" },
    ],
    pick: "safety",
    verdict:
      "Safety first. In a bank, a capable agent with no guardrails isn't a promising demo — it's the reason the project gets killed. Leading with 'here's how it stays inside the rules' is what let the conversation move forward instead of stopping at 'we can't trust this.'",
    outcome:
      "The white paper and PoC led with governance: scoped permissions, human approval gates, audit trail, rollback. That framing is why it advanced in the Innovation Challenge instead of being shelved as a risk.",
  },
  {
    kind: "invest",
    id: "buzzword-startup",
    tag: "You're the investor",
    prompt:
      "“We’re building an AI-powered, blockchain-based marketplace that uses machine learning to disrupt how people book local services.”",
    context: "Confident founder. Big TAM slide. Three buzzwords in one sentence.",
    choices: [
      { id: "back", label: "Back it" },
      { id: "pass", label: "Pass" },
    ],
    pick: "pass",
    verdict:
      "Pass. Not because the words are trendy — because the sentence describes a technology stack, not a customer or a wedge. 'Booking local services' is a brutal, low-margin, incumbent-heavy market. If the pitch can't name one specific person whose day gets better and why they'd switch, the AI and the blockchain are decoration.",
    outcome:
      "The question I actually want answered: who is the first user, what do they do today instead, and why is that painful enough to change? Everything else is a second conversation.",
  },
  {
    kind: "prioritize",
    id: "hit-the-date",
    tag: "Bank of America · Captiva upgrade",
    prompt:
      "A 150-server platform upgrade is running behind. The August release date is close. Cut scope to make it, or slip the date for a clean cutover?",
    context:
      "The release train doesn't wait. Missing it means a month's delay for everything riding along. Rushing a 150-server cutover is how you cause an outage.",
    choices: [
      { id: "cut", label: "Cut scope, hit the date" },
      { id: "slip", label: "Slip the date, do it clean" },
      { id: "accelerate", label: "Accelerate part of it into this release" },
    ],
    pick: "accelerate",
    verdict:
      "Pull the critical piece forward and sequence it tightly. The REST-server work got accelerated into the August release with a detailed deployment plan and validation steps written for the administrators doing the work. Not heroics — a plan specific enough that the people executing it couldn't get lost.",
    outcome:
      "August release delivered on time. The deployment instruction document became the reference the capture administrators used for validation. Earned a Silver Award.",
  },
  {
    kind: "branch",
    id: "this-portfolio",
    tag: "This site · right now",
    prompt:
      "Your portfolio's first version is honest but plain. Some resume metrics are strong but not yet airtight. Ship now with the numbers, hold them, or ship without them?",
    context:
      "You're job-hunting now. A live site beats a perfect one that doesn't exist. But a number you can't defend in an interview is worse than no number.",
    choices: [
      { id: "ship-numbers", label: "Ship with the numbers" },
      { id: "hold", label: "Hold until every number is airtight" },
      { id: "ship-soft", label: "Ship now, numbers phrased carefully" },
    ],
    consequences: {
      "ship-numbers":
        "Fast and confident — until an interviewer asks 'how did you measure the 40%?' and you're reconstructing it live. One shaky answer colours the rest of the conversation.",
      hold: "The site never ships. Perfect is doing its usual job.",
      "ship-soft":
        "Live this week, and every claim is one you can walk through. The precise figures get added as each one is confirmed.",
    },
    pick: "ship-soft",
    verdict:
      "Ship now, phrase carefully, tighten later. That's literally how this site was built — v1 went live with qualitative claims and a written list of every number still being confirmed. Momentum plus a paper trail beats a polished thing that only exists in your head.",
    outcome:
      "You're looking at the result. It went from empty repo to live on Vercel in an afternoon, and it's still being built.",
  },
  {
    kind: "invest",
    id: "agent-governance",
    tag: "You're the investor",
    prompt:
      "“The control plane for enterprise AI agents — permissions, approval gates, audit, and rollback, so regulated companies can actually deploy them.”",
    context:
      "Right problem, clearly. But is it a company or a feature the cloud providers ship for free in 18 months? (Also adjacent to something I prototyped.)",
    choices: [
      { id: "back", label: "Back it" },
      { id: "pass", label: "Pass" },
    ],
    pick: "back",
    verdict:
      "Back it, with eyes open on the platform-risk. The bet is that regulated deployment is specific and painful enough — bank-grade audit, SOC/PCI mapping, change-management integration — that a focused team beats a generic cloud feature for years. If they're just building 'RBAC for agents,' pass. If they're building the thing a bank's risk team signs off on, that's a wedge.",
    outcome:
      "This is the gap I hit building Helix: the capability was the easy part, the governance was the whole game. Someone should own that layer.",
  },
  {
    kind: "prioritize",
    id: "internal-dx",
    tag: "Bank of America · platform",
    prompt:
      "Environments keep drifting, deploys break in ways that are hard to trace, and the developers affected have stopped complaining about it. What do you do?",
    context:
      "'Stopped complaining' is the dangerous part — the pain got normalised. There's no ticket, no mandate, no one asking you to fix it.",
    choices: [
      { id: "leave", label: "Not your mandate — leave it" },
      { id: "standardize", label: "Standardize the environments" },
      { id: "escalate", label: "Write it up and escalate" },
    ],
    pick: "standardize",
    verdict:
      "Own it. Containerize the apps and pipelines onto OpenShift so every environment has the same shape. Internal developers are users — they have a workflow and a satisfaction level, and nobody was treating their experience as a product. The absence of complaints was a measurement problem, not a signal that things were fine.",
    outcome:
      "Standardized environments on OpenShift, killed the configuration drift, consolidated 50+ physical servers. ~40% less deployment lag on the containerized apps.",
  },
  {
    kind: "invest",
    id: "founder-bet",
    tag: "You're the investor",
    prompt:
      "“Solo technical founder, no revenue, built and shipped three real products in a year while doing a full-time job and an MBA. Wants to go all in.”",
    context: "No traction slide. No team. Just a demonstrated rate of shipping.",
    choices: [
      { id: "back", label: "Back the person" },
      { id: "pass", label: "Pass — too early" },
    ],
    pick: "back",
    verdict:
      "Back the person, small, early. At pre-traction, you're underwriting one thing: how fast do they turn an idea into something real, and do they finish? Someone shipping three products a year around two full-time commitments has answered that. The idea will change; the shipping rate usually doesn't.",
    outcome:
      "This is the bet I'd want someone to make on me. It's also the lens I'd use on anyone else at this stage.",
  },
  {
    kind: "branch",
    id: "career-fork",
    tag: "You · the actual decision",
    prompt:
      "Three years into a stable engineering job with good reviews and four awards. PM, VC, and 'start something' all pull. What do you optimize for?",
    context:
      "The safe move is to stay and get promoted. Every other path is a pay cut and a step back to learn a new game.",
    choices: [
      { id: "stay", label: "Stay and climb" },
      { id: "pm", label: "Pivot to product" },
      { id: "optionality", label: "Buy optionality — MBA, then decide" },
    ],
    consequences: {
      stay: "Comfortable, and the comfort compounds. In three years the pivot costs twice as much and you know it.",
      pm: "Direct, but a single bet on one of the three paths before you've seriously tried the others.",
      optionality:
        "A year to work in public, ship things, run a fund, meet operators and investors, and find out which game actually fits — while keeping all three doors open.",
    },
    pick: "optionality",
    verdict:
      "Buy the optionality. The PGP at Masters' Union is a deliberate bet on range: manage a live portfolio, ship products, compete, and be around people doing all three of these jobs — then commit with evidence instead of a guess. The engineer-to-something transition is the point, and it's not finished.",
    outcome:
      "In progress. Managing a top-percentile book in the Masters' Union Investment Fund, shipping side projects, and figuring out which of the three this becomes.",
  },
];
