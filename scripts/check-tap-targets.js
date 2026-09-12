/**
 * Tap-target audit (BUILD-PLAN 0.4 / WCAG 2.2 SC 2.5.8, 44x44 minimum).
 *
 * Paste into the browser console at 390px, or run through a driver.
 * Inline links sitting inside a sentence are exempt under the spec's own
 * "inline" exception, so they're reported separately rather than as failures.
 */
window.checkTapTargets = function (min = 44) {
  const fails = [], inlineExempt = [];
  for (const el of document.querySelectorAll("a, button, [role=button], input, select")) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;                       // not rendered
    if (el.closest("[aria-hidden=true]")) continue;
    if (r.width >= min && r.height >= min) continue;
    const host = el.closest("p, li, dd, summary");
    const inline = host && host.textContent.trim().length > el.textContent.trim().length + 8;
    const row = {
      text: (el.getAttribute("aria-label") || el.textContent).trim().slice(0, 34),
      size: `${Math.round(r.width)}x${Math.round(r.height)}`,
    };
    (inline ? inlineExempt : fails).push(row);
  }
  return { path: location.pathname, fails, inlineExempt };
};
