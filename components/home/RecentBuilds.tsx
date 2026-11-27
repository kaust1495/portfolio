const builds = [
  {
    tag: "Live demo · Nov 2026",
    title: "LeadLoop Checkpoint",
    body: "Chain-of-custody tracking for dead e-rickshaw batteries: one QR sticker per battery, scanned at pickup, yard weigh-in and the recycler's gate, with weight, photo and payout at each hand-off. A playable demo on dummy data.",
    href: "https://robinhood-leadloop.vercel.app/",
    link: "Play the demo ↗",
  },
  {
    tag: "Live dashboard · Nov 2026",
    title: "SupeRR Selector",
    body: "An exploratory model for which IPL players deliver under pressure: 196,528 IPL and T20I deliveries from 2022 to 2026 scored by how much each could swing the result, players rated against an average player in the same situation, 180 match resamples behind every list. On unseen data it matches conventional stats rather than beating them.",
    href: "https://rrsuper-selector.vercel.app/",
    link: "Open the dashboard ↗",
  },
  {
    tag: "Private preview",
    title: "Surplus Saver",
    body: "The Too Good To Go model, built for India: shops list end-of-day surplus food with a price and pickup window, buyers nearby reserve and collect with a pickup code. Full-stack build with shop-owner sign-in; buyers need no account.",
    href: null,
    link: null,
  },
];

/** Recent shipped work that is not (yet) a full chapter on the map. */
export function RecentBuilds() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {builds.map((b) => (
        <div key={b.title} className="card px-5 py-4">
          <p className="label" style={{ color: "var(--amber-ink)" }}>{b.tag}</p>
          <h3 className="mt-2 text-base font-semibold" style={{ color: "var(--ink)" }}>{b.title}</h3>
          <p className="mt-1.5 text-sm leading-snug" style={{ color: "var(--muted)" }}>{b.body}</p>
          {b.href && (
            <a className="link mt-2 inline-block text-sm" href={b.href} target="_blank" rel="noopener noreferrer">
              {b.link}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
