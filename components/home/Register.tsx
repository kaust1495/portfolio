import Link from "next/link";
import { person, github } from "@/content/profile";
import { projectRecords } from "@/content/records";
import { Stamp } from "@/components/record/Stamp";
import { DecisionInline } from "./DecisionInline";

/**
 * The homepage: the register's front page.
 *
 * Thesis first, then one real decision you can play without scrolling past
 * it, then the records, then the ask. Nothing is parked at opacity 0 waiting
 * for an observer — content is visible at rest.
 */
export function Register() {
  const [lead, ...rest] = projectRecords;

  return (
    <div className="home">
      {/* ---- Masthead ------------------------------------------------ */}
      <section className="home__masthead">
        <aside className="home__apparatus">
          <p className="rec-id">REGISTER</p>
          <p className="rec-date">OPENED 2026</p>
          <p className="rec-date">GURUGRAM · IN</p>
          <p className="rec-date">OPEN TO RELOCATE</p>
          <Stamp status="LIVE" />
        </aside>

        <div className="home__argument">
          <h1 className="home__name">{person.name}</h1>
          <p className="home__thesis">
            I build the guardrails that let organisations trust automation.
          </p>
          <p className="home__sub">
            Engineer by training. Product thinker by practice. Builder by default.
          </p>

          <div className="home__actions">
            <Link href="/work" className="instr__btn">
              See the work
            </Link>
            <a href={person.resumeHref} target="_blank" rel="noopener noreferrer" className="instr__btn">
              Résumé ↗
            </a>
            <a href={`mailto:${person.email}`} className="instr__btn">
              Email
            </a>
          </div>
        </div>
      </section>

      {/* ---- DEC-01 -------------------------------------------------- */}
      <DecisionInline />

      {/* ---- The work ------------------------------------------------ */}
      <section className="home__section">
        <h2 className="rec-label">The work</h2>

        <Link href={`/work/${lead.slug}`} className="home__lead">
          <span className="home__leadHead">
            <span className="rec-id">{lead.id}</span>
            <Stamp status={lead.status} />
          </span>
          <span className="home__leadTitle">{lead.title}</span>
          <span className="home__leadProblem">{lead.problem}</span>
          <span className="home__leadNote">
            {lead.metrics.length === 0
              ? `No number yet — ${lead.wouldMeasure.length} stated measures, and why each one matters`
              : `${lead.metrics.length} metrics, each with provenance`}
          </span>
        </Link>

        <ul className="home__grid">
          {rest.map((r) => (
            <li key={r.id}>
              <Link href={`/work/${r.slug}`} className="home__card">
                <span className="home__cardHead">
                  <span className="rec-id">{r.id}</span>
                  <Stamp status={r.status} />
                </span>
                <span className="home__cardTitle">{r.title}</span>
                <span className="home__cardFact">
                  {r.metrics.length > 0 ? r.metrics[0].value : `${r.wouldMeasure.length} stated measures`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Lab ----------------------------------------------------- */}
      <section className="home__section">
        <h2 className="rec-label">Lab</h2>
        <p className="home__labLine">
          Everything on this site that moves, answers back or keeps score, I built — the generative
          soundtrack, the zero-backend lookup, three games and a live feed.
        </p>
        <Link href="/lab" className="xref">
          Seven builds, each with how it works →
        </Link>
      </section>

      {/* ---- The ask ------------------------------------------------- */}
      <section className="home__section home__ask">
        <h2 className="rec-label">The ask</h2>
        <p className="home__askLine">
          Product, venture, or a founder&rsquo;s office — if you are building something where the
          hard part is making automation trustworthy, that is the conversation I want.
        </p>
        <ul className="home__contact">
          <li>
            <a className="xref" href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </li>
          <li>
            <a className="xref" href={person.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a className="xref" href={github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </li>
          <li>
            <a className="xref" href={person.resumeHref} target="_blank" rel="noopener noreferrer">
              Résumé ↗
            </a>
          </li>
        </ul>
      </section>

      <footer className="home__footer">
        <span>{person.location}</span>
        <span>
          © {new Date().getFullYear()} {person.fullName}
        </span>
      </footer>
    </div>
  );
}
