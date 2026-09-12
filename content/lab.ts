/**
 * Lab — the small things built for this site.
 *
 * Every one of these is real, running on the page you're on, and written
 * from scratch. They're here because "I can build the thing" is easier to
 * demonstrate than to claim.
 */

export type LabItem = {
  id: string;
  name: string;
  blurb: string;
  how: string;
  stack: string[];
  tint: string;
  glyph: string;
  /** Where to go to try it, if it isn't already on-screen. */
  href?: string;
  cta?: string;
  /** True when the thing is live on every page and needs no link. */
  ambient?: boolean;
};

export const labIntro =
  "Everything on this site that moves, plays or answers back, I built. No page builder, no template, no plugin. Here's what each one actually does.";

export const labItems: LabItem[] = [
  {
    id: "hum",
    name: "Hum",
    blurb:
      "A soundtrack the page composes while you listen. It has no audio files — every note is generated in your browser, and it never plays the same sequence twice.",
    how:
      "Web Audio API. Notes are drawn at random from a D-minor pentatonic set, so any two of them sit together. Each is two detuned oscillators through a long attack-and-release envelope, panned randomly, run into a lowpass filter whose cutoff drifts under a 0.05 Hz LFO. The bars on the button read the real output through an analyser node.",
    stack: ["Web Audio API", "no files", "~180 lines"],
    tint: "tint-coral",
    glyph: "◍",
    cta: "Press Sound, bottom-left",
    ambient: true,
  },
  {
    id: "buddy",
    name: "The little guy (retired)",
    blurb:
      "A character that followed your cursor across the whole site and explained things on hover. Removed in the register rebuild — it pulled attention away from the argument, and ambient motion is now against the rules of this site.",
    how:
      "A requestAnimationFrame loop easing toward the pointer with a lazy spring. Position lived on a ref and wrote straight to a transform — never React state — so it held 60fps without re-rendering the page. Any element could give it a line to say with one data attribute. It worked; it just stopped earning its place.",
    stack: ["rAF", "SVG", "superseded"],
    tint: "tint-sky",
    glyph: "◕",
    cta: "Retired — kept here because removals are records too",
  },
  {
    id: "askme",
    name: "Ask me anything",
    blurb:
      "A chat box that answers questions about me — what I've built, what I'm looking for, what I'm bad at. Honest about being a lookup rather than a language model.",
    how:
      "A hand-written knowledge base scored against your question by keyword overlap, with longer matches weighted higher and a confidence floor below which it admits it doesn't know. No API key, no backend, no per-visit cost. After three questions it offers a box to tell me what should be here instead.",
    stack: ["Keyword scoring", "zero backend"],
    tint: "tint-butter",
    glyph: "◔",
    cta: "Bottom-right corner",
    ambient: true,
  },
  {
    id: "bug-squash",
    name: "Bug Squash",
    blurb: "Thirty seconds. Bugs surface, you squash them, gold ones are worth five. Pure arcade, no lesson attached.",
    how:
      "Spawn timers with a difficulty curve, a combo multiplier that decays if you miss, and best score kept in localStorage so it remembers you. Rendered in DOM rather than canvas so it's still keyboard- and screen-reader-navigable.",
    stack: ["React", "localStorage"],
    tint: "tint-sage",
    glyph: "◆",
    href: "/lab",
    cta: "Play",
  },
  {
    id: "ship-it",
    name: "Ship It",
    blurb:
      "A feature request every few seconds. Ship, defer or cut — and find out whether you'd have made the same call I did.",
    how:
      "Twenty-six real requests drawn from work I've actually done, each with a defensible answer and the reasoning behind it. Timed, three lives, combo scoring. It's a prioritisation exercise wearing a game as a disguise.",
    stack: ["Keyboard-first", "26 real calls"],
    tint: "tint-peach",
    glyph: "▲",
    href: "/lab",
    cta: "Play",
  },
  {
    id: "decisions",
    name: "The decision deck",
    blurb:
      "Twelve calls I genuinely had to make. You pick first, then I show you what I picked and what happened next.",
    how:
      "Three card types — prioritise, invest, branch — with the branch cards carrying a different consequence for each path. You commit before you see my answer, which is the only way this kind of thing is worth anything.",
    stack: ["12 cards", "real outcomes"],
    tint: "tint-coral",
    glyph: "❋",
    href: "/decisions",
    cta: "Open the deck",
  },
  {
    id: "pulse",
    name: "Tech pulse",
    blurb: "The top story on Hacker News right now, live on my homepage. Not a screenshot, not cached copy.",
    how:
      "Hacker News' public Firebase endpoint, fetched client-side. No key, no server, no rate limit to manage. It degrades to nothing visible if the request fails, because a broken widget is worse than no widget.",
    stack: ["HN Firebase API", "client fetch"],
    tint: "tint-sky",
    glyph: "◈",
    cta: "Running below",
  },
];
