/* ------------------------------------------------------------------ *
 * Ship It — a feature comes at you, you call it: ship / defer / cut.
 * Each has one defensible answer + a one-line reason shown on a hit.
 * ------------------------------------------------------------------ */
export type Call = "ship" | "defer" | "cut";

export type Feature = { text: string; call: Call; why: string };

export const features: Feature[] = [
  { text: "Login is broken on Safari. 12% of new signups can't get in.", call: "ship", why: "Broken core flow beats everything on the roadmap." },
  { text: "Rewrite the billing service in Rust because the CTO likes Rust.", call: "cut", why: "A rewrite with no user-facing problem is a hobby, not a priority." },
  { text: "Dark mode. Most-requested thing in the feedback board this quarter.", call: "ship", why: "Clear demand, bounded scope, real goodwill." },
  { text: "Sales wants a bespoke feature to close one mid-size deal.", call: "cut", why: "One-off asks that no one else wants become forever maintenance." },
  { text: "Onboarding drops 40% at step 3 and nobody knows why.", call: "ship", why: "The biggest leak in the funnel is always worth a look first." },
  { text: "Marketing wants a fake countdown timer on the pricing page.", call: "cut", why: "Dark patterns buy a quarter and cost the brand." },
  { text: "Security found an API token that never expires.", call: "ship", why: "Security holes don't wait for the next planning cycle." },
  { text: "Add AI to the search bar. The board asked about 'our AI story'.", call: "defer", why: "'Add AI' isn't a spec. Find the user problem first." },
  { text: "Localise into 8 languages — before product-market fit.", call: "cut", why: "You're translating a product you're still changing weekly." },
  { text: "Export-to-PDF 500s for any user with an emoji in their name.", call: "ship", why: "Small blast radius, but it's a crash, and it's cheap." },
  { text: "Redesign the settings page. It's ugly but it works.", call: "defer", why: "Cosmetic-only work loses to anything that moves a metric." },
  { text: "The Friday migration script has no rollback.", call: "ship", why: "Add the rollback before it runs. Non-negotiable." },
  { text: "Competitor shipped a feature. Copy it this sprint.", call: "defer", why: "React to their move with a decision, not a reflex." },
  { text: "Keyboard shortcut for the action power users do 50 times a day.", call: "ship", why: "Tiny build, compounding time saved for your best users." },
  { text: "Build a native mobile app because one board member uses an iPad.", call: "cut", why: "A whole platform for an audience of one." },
  { text: "Free users found a loophole into the paid tier. It's costing real money.", call: "ship", why: "Active revenue leak — close it now." },
  { text: "Add rate limiting. The public API currently has none.", call: "ship", why: "One bad actor away from an outage." },
  { text: "A/B test the CTA button colour. Third time this year.", call: "cut", why: "You already know colour isn't the lever." },
  { text: "Slack integration — 3 customers asked, all on annual contracts.", call: "defer", why: "Real signal, not on fire. Queue it, don't drop it." },
  { text: "The public docs are six months out of date.", call: "defer", why: "Worth doing, rarely worth doing *this* second." },
  { text: "A governed approval gate for the deploy agent, before leadership sees it.", call: "ship", why: "The guardrail is what makes the demo credible in a bank." },
  { text: "Move the whole app to a new framework the community is excited about.", call: "cut", why: "Framework churn is cost with no customer on the other end." },
  { text: "Customer's data is showing up in another customer's dashboard.", call: "ship", why: "Data isolation bug. Everything else stops." },
  { text: "Gamify the dashboard with streaks and badges.", call: "defer", why: "Maybe later — first prove people want to come back at all." },
  { text: "Alerting has a bug that pages the on-call engineer at 3am for nothing.", call: "ship", why: "You're burning the team to save a day of work." },
  { text: "Add a second onboarding flow for enterprise, in parallel with the main one.", call: "defer", why: "Two flows to maintain forever — be sure the segment is real." },
];

export const shipItCopy = {
  intro: "A feature request drops in. Call it before it hits the deadline line. S = ship · D = defer · C = cut.",
  end: {
    good: "That's a product sense. You cut the noise and shipped what moved.",
    mid: "Solid. The judgment calls are where the points are.",
    low: "Prioritisation is a muscle. The trick is saying no to good ideas.",
  },
};

/* ------------------------------------------------------------------ *
 * Pipeline Panic — deploys queue up, keep prod alive.
 * ------------------------------------------------------------------ */
export type Deploy = {
  id: number;
  label: string;
  tested: boolean;
  touchesProd: boolean;
  offHours: boolean;
};

export const deployLabels = [
  "hotfix: null check",
  "feature: new dashboard",
  "config: bump timeouts",
  "dependency upgrade",
  "schema migration",
  "copy change",
  "auth refactor",
  "cache layer",
  "rate-limit tweak",
  "logging change",
  "payment webhook",
  "feature flag flip",
];

export const pipelineCopy = {
  intro:
    "Deploys arrive. Approve the safe ones, Test the risky ones, Hold when you're not sure. An untested change to prod is how uptime dies.",
  rules: [
    "Approve a tested, low-risk deploy → ships clean.",
    "Approve an untested prod change → incident. Uptime drops.",
    "Test → clears the risk, but the queue keeps moving.",
    "Hold → buys time, but a full queue is its own failure.",
  ],
  end: {
    good: "That's the Helix thesis in a game: autonomy is fine, as long as a human set the rules it runs inside.",
    mid: "You kept it alive. The gates are what did it.",
    low: "This is exactly why 'let the agent just deploy' doesn't fly in a bank.",
  },
};
