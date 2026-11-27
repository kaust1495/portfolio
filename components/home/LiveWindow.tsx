"use client";

import { useState } from "react";

const APP_URL = "https://firststeplegalai.lovable.app/";

/**
 * The real product, running in the page. A browser-chrome frame around a
 * live iframe of FirstStep Legal AI. Not a screenshot, not a mockup: the
 * deployed app, usable in place. Falls back to a link if the embed stalls.
 */
export function LiveWindow() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="livewindow mt-6">
      <div className="livewindow-chrome">
        <span className="livewindow-dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="livewindow-url">
          <span className="livewindow-lock" aria-hidden="true">●</span>
          firststeplegalai.lovable.app
        </span>
        <a
          className="livewindow-open"
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          open full app ↗
        </a>
      </div>
      <div className="livewindow-body">
        {!loaded && (
          <div className="livewindow-skeleton" aria-hidden="true">
            <span>loading the live app…</span>
          </div>
        )}
        <iframe
          src={APP_URL}
          title="FirstStep Legal AI, live"
          className="livewindow-frame"
          loading="eager"
          onLoad={() => setLoaded(true)}
          allow="clipboard-write"
        />
      </div>
      <p className="livewindow-caption">
        The deployed app, running in this page. Anything you do here is the
        real product, not a replay.
      </p>
    </div>
  );
}
