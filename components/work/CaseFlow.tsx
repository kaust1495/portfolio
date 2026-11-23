"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CaseFlow.module.css";

const steps = [
  { label: "The question", title: "Ask in plain language", body: "Start with the situation, not the name of an Act.", note: "A legal problem, in the person's own words." },
  { label: "The explanation", title: "See where it comes from", body: "Act and Section citations, with links to official sources.", note: "The explanation stays connected to its source." },
  { label: "The next step", title: "Understand what to do next", body: "Guided pathways, with a clear line between information and advice.", note: "A next step, without pretending to replace a lawyer." },
];

/**
 * Time-indexed scene / persistent marker pattern adapted from Bang Motion's
 * MIT starter-explainer.html (Bang Tutorial, 2026). Original component, no GSAP
 * dependency. The full copyright notice is in THIRD_PARTY_NOTICES.md.
 */
export function CaseFlow() {
  const root = useRef<HTMLElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const elapsed = useRef(0);
  const selected = useRef(0);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [complete, setComplete] = useState(false);
  const [status, setStatus] = useState("Choose a step, or play the flow.");
  const duration = 6000;

  function stop() {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    setPlaying(false);
  }

  function seek(ms: number) {
    const q = Math.max(0, Math.min(1, ms / duration));
    // A single continuous scene: the marker moves, the reading layout does not.
    if (marker.current) marker.current.style.left = `${q * 100}%`;
    const next = Math.min(2, Math.floor(q * 3));
    if (next !== selected.current) {
      selected.current = next;
      setActive(next);
    }
  }

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      if (query.matches) {
        cancelAnimationFrame(frame.current);
        frame.current = 0;
        setPlaying(false);
        setStatus("Motion paused. Every step is available below.");
      }
    };
    const hidden = () => {
      if (document.hidden && frame.current) {
        cancelAnimationFrame(frame.current);
        frame.current = 0;
        setPlaying(false);
        setStatus("Paused while this page is hidden. Choose a step or continue.");
      }
    };
    query.addEventListener("change", change);
    document.addEventListener("visibilitychange", hidden);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && frame.current) {
        cancelAnimationFrame(frame.current);
        frame.current = 0;
        setPlaying(false);
        setStatus("Paused outside this view. Choose a step or continue.");
      }
    });
    if (root.current) observer.observe(root.current);
    return () => {
      cancelAnimationFrame(frame.current);
      query.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", hidden);
      observer.disconnect();
    };
  }, []);

  function choose(index: number) {
    stop();
    elapsed.current = index * duration / 2;
    seek(elapsed.current);
    selected.current = index;
    setActive(index);
    setComplete(index === 2);
    setStatus(steps[index].note);
  }

  function toggle() {
    if (playing) {
      stop();
      setStatus("Paused. Choose a step or continue.");
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      choose((active + 1) % steps.length);
      setStatus("Reduced motion: showing the selected step without animation.");
      return;
    }
    if (elapsed.current >= duration) elapsed.current = 0;
    setComplete(false);
    setPlaying(true);
    setStatus("Following the flow. Pause whenever you like.");
    const start = performance.now() - elapsed.current;
    const tick = (now: number) => {
      elapsed.current = Math.min(duration, now - start);
      seek(elapsed.current);
      if (elapsed.current < duration) frame.current = requestAnimationFrame(tick);
      else {
        frame.current = 0;
        setPlaying(false);
        setComplete(true);
        setStatus("Flow complete. Choose any step to revisit it.");
      }
    };
    frame.current = requestAnimationFrame(tick);
  }

  return (
    <section ref={root} className={styles.flow} aria-labelledby="firststep-flow-title">
      <div className={styles.intro}>
        <div>
          <p className="label">Inside the product</p>
          <h2 id="firststep-flow-title">From a question<br />to a next step.</h2>
        </div>
        <button type="button" className={`btn btn--sm ${styles.play}`} onClick={toggle} aria-pressed={playing}>
          <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>{playing ? "Pause" : complete ? "Replay the flow" : "Play the flow"}
        </button>
      </div>
      <div className={styles.track} aria-hidden="true">
        <span className={styles.origin}>QUESTION</span><span className={styles.destination}>NEXT STEP</span>
        <div className={styles.rail}><div className={styles.marker} ref={marker} /><i /><i /><i /></div>
      </div>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <button type="button" key={step.label} className={styles.step} data-active={active === i} aria-pressed={active === i} onClick={() => choose(i)}>
            <span className={styles.number}>{String(i + 1).padStart(2, "0")} / {step.label}</span>
            <span className={styles.title}>{step.title}</span>
            <span className={styles.body}>{step.body}</span>
          </button>
        ))}
      </div>
      <p className={styles.status} role="status" aria-live="polite">{status}</p>
      <p className={styles.boundary}>Illustrative flow, not a live legal answer. Legal information, not legal advice. Not reviewed by a lawyer.</p>
    </section>
  );
}
