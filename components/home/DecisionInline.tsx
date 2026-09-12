"use client";

import { useState } from "react";
import Link from "next/link";
import { decisions } from "@/content/decisions";

/**
 * DEC-01, inline on the homepage.
 *
 * Commit before reveal — non-negotiable, because it is the only thing that
 * makes the exercise worth anything. A visible skip sits beside it from the
 * first frame, so the ambitious interaction always has a conventional path
 * next to it.
 *
 * No aggregate percentage is shown: that needs a real counter, and inventing
 * one would be exactly the kind of unsourced number this site argues against.
 */
export function DecisionInline() {
  const card = decisions[0];
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <section className="dec" aria-labelledby="dec-01-heading">
      <div className="dec__head">
        <p className="rec-id">DEC-01</p>
        <Link href="/decisions" className="xref dec__skip">
          Skip to the full deck →
        </Link>
      </div>

      <h2 id="dec-01-heading" className="dec__prompt">
        {card.prompt}
      </h2>
      <p className="dec__context">{card.context}</p>

      <ul className="dec__choices">
        {card.choices.map((c, i) => {
          const isPicked = picked === c.id;
          const isMine = picked !== null && card.pick === c.id;
          return (
            <li key={c.id}>
              <button
                className="dec__choice"
                data-picked={isPicked}
                data-mine={isMine}
                disabled={picked !== null}
                onClick={() => setPicked(c.id)}
              >
                <span className="dec__choiceN">{String(i + 1).padStart(2, "0")}</span>
                <span className="dec__choiceLabel">{c.label}</span>
                {isMine && <span className="dec__tag dec__tag--mine">my call</span>}
                {isPicked && !isMine && <span className="dec__tag">yours</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite">
        {picked && (
          <div className="dec__reveal">
            <p className="rec-label">What I did</p>
            <p className="dec__verdict">{card.verdict}</p>
            <p className="rec-label dec__outcomeLabel">What happened</p>
            <p className="dec__outcome">{card.outcome}</p>
            <Link href="/decisions" className="xref">
              Eleven more calls →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
