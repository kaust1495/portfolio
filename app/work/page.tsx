import type { Metadata } from "next";
import Link from "next/link";
import { projectRecords } from "@/content/records";
import { routeMetadata } from "@/lib/seo";
import { Stamp } from "@/components/record/Stamp";

export const metadata: Metadata = routeMetadata({
  path: "/work",
  title: "Work",
  description:
    "PRJ-01…04 — four project records from Kaustubh Jain, each with its problem, constraint, options, decision, the trade-off he knowingly took, and what he would measure where no number exists yet.",
});

export default function WorkPage() {
  return (
    <div className="register-index">
      <header className="register-index__head">
        <p className="rec-label">The register</p>
        <h1 className="rec-title">Project records</h1>
        <p className="register-index__intro">
          Four records. Each one states what was wrong, what made the obvious answer impossible, what
          was chosen — and what was knowingly given up to choose it.
        </p>
      </header>

      <ol className="register-list">
        {projectRecords.map((r) => (
          <li key={r.id}>
            <Link href={`/work/${r.slug}`} className="register-row">
              <span className="register-row__id">{r.id}</span>
              <span className="register-row__main">
                <span className="register-row__title">{r.title}</span>
                <span className="register-row__problem">{r.problem}</span>
                <span className="register-row__facts">
                  {r.metrics.length > 0
                    ? `${r.metrics.length} metrics, each with provenance`
                    : `No number yet — ${r.wouldMeasure.length} stated measures`}
                  {" · "}
                  {r.exhibits.length} exhibit{r.exhibits.length > 1 ? "s" : ""}
                </span>
              </span>
              <span className="register-row__stamp">
                <Stamp status={r.status} />
                <span className="register-row__date">{r.timeframe}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
