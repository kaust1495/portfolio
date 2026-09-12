import Link from "next/link";
import type { ProjectRecord } from "@/lib/records";
import { Stamp } from "./Stamp";
import { Citation } from "./Citation";
import { Exhibit } from "./Exhibit";

/**
 * One template, every record. No per-record special-casing except the
 * evidence instrument slot, which varies so four case studies don't read as
 * the same page four times.
 *
 * Layout is the apparatus grid: 180px marginalia + 32px gutter + 64ch of
 * argument. The apparatus is sticky, so the metadata beside a paragraph is
 * that paragraph's metadata. At 390px it reflows into a header block above
 * the argument — a deliberate re-layout, not a squeeze.
 */
export function RecordTemplate({
  record,
  instrument,
}: {
  record: ProjectRecord;
  instrument?: React.ReactNode;
}) {
  const r = record;

  return (
    <article className="record">
      <header className="record__apparatus">
        <div className="record__apparatusInner">
          <p className="rec-id">{r.id}</p>
          <Stamp status={r.status} />
          <p className="rec-date">{r.timeframe}</p>

          <dl className="rec-meta">
            {r.ownership.owned.length > 0 && <Meta k="OWNED" items={r.ownership.owned} />}
            {r.ownership.collaborated.length > 0 && <Meta k="COLLABORATED" items={r.ownership.collaborated} />}
            {r.ownership.team.length > 0 && <Meta k="TEAM" items={r.ownership.team} />}
            <Meta k="CONFIDENCE" items={[r.confidence]} />
            {r.confidential && <Meta k="CONFIDENTIAL" items={["Details redacted"]} />}
            {r.exhibits.length > 0 && <Meta k="REFS" items={[r.exhibits.map((e) => e.id).join(" · ")]} refs />}
          </dl>
        </div>
      </header>

      <div className="record__argument">
        <h1 className="rec-title">{r.title}</h1>

        <Section label="Problem">
          <p>{r.problem}</p>
        </Section>

        <Section label="Constraint">
          <p>{r.constraint}</p>
        </Section>

        <Section label="Options">
          <ol className="rec-options">
            {r.options.map((o, i) => (
              <li key={i}>
                <span className="rec-options__n">{String(i + 1).padStart(2, "0")}</span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Decision">
          <p>{r.decision}</p>
        </Section>

        <Section label="Trade-off">
          <p className="rec-tradeoff">{r.tradeoff}</p>
        </Section>

        {(r.exhibits.length > 0 || instrument) && (
          <Section label="Evidence">
            {instrument}
            {r.exhibits.map((e) => (
              <Exhibit key={e.id} exhibit={e} />
            ))}
          </Section>
        )}

        <Section label="Result">
          <ul className="rec-result">
            {r.result.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>

          {r.metrics.length > 0 && (
            <dl className="rec-metrics">
              {r.metrics.map((m, i) => (
                <div key={m.value} className="rec-metrics__row">
                  <dt className="rec-metrics__value">
                    {m.value}
                    <Citation n={i + 1} metric={m} />
                  </dt>
                  <dd className="rec-metrics__measure">{m.measure}</dd>
                </div>
              ))}
            </dl>
          )}

          {r.metrics.length === 0 && (
            <div className="rec-gap">
              <p className="rec-gap__label">No number exists yet. Here is what I would measure, and why.</p>
              <ul className="rec-gap__list">
                {r.wouldMeasure.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        <Section label="Superseded?">
          <p>{r.superseded}</p>
          {r.supersededBy && (
            <p>
              Superseded by{" "}
              <Link className="xref" href={`/work/${r.supersededBy}`}>
                {r.supersededBy}
              </Link>
              .
            </p>
          )}
        </Section>

        {r.href && (
          <p className="rec-visit">
            <a className="xref" href={r.href} target="_blank" rel="noopener noreferrer">
              Visit the live product ↗
            </a>
          </p>
        )}
      </div>
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="rec-section">
      <h2 className="rec-label">{label}</h2>
      {children}
    </section>
  );
}

function Meta({ k, items, refs = false }: { k: string; items: string[]; refs?: boolean }) {
  return (
    <div className="rec-meta__row">
      <dt className="rec-meta__k">{k}</dt>
      <dd className={`rec-meta__v${refs ? " rec-meta__v--ref" : ""}`}>
        {items.length === 1 ? items[0] : (
          <ul>
            {items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
      </dd>
    </div>
  );
}
