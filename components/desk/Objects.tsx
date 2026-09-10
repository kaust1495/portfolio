"use client";

/* Desk objects — characterful CSS/SVG props. Warm palette, tactile shadows. */

const shadow = "0 16px 34px -14px rgba(0,0,0,0.65), 0 3px 6px rgba(0,0,0,0.35)";

export function CRT() {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <div className="screen p-2.5">
        <div className="screen-inner relative aspect-[4/3] overflow-hidden p-3 font-mono text-[0.62rem] leading-relaxed" style={{ color: "var(--accent-2)" }}>
          <p style={{ color: "var(--ok)" }}>&gt; decisions --play</p>
          <p className="mt-1" style={{ color: "var(--muted)" }}>12 calls loaded.</p>
          <p className="mt-1" style={{ color: "var(--muted)" }}>ship / defer / cut</p>
          <p style={{ color: "var(--muted)" }}>back / pass</p>
          <p className="mt-2" style={{ color: "var(--ink)" }}>
            your move<span className="crt-caret">▋</span>
          </p>
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 0%, transparent 55%, rgba(0,0,0,0.4))" }} />
        </div>
      </div>
      {/* stand */}
      <div className="mx-auto h-3 w-1/3 rounded-b-md" style={{ background: "#2b2119" }} />
      <div className="mx-auto h-1.5 w-1/2 rounded-full" style={{ background: "#1c150e" }} />
      <style jsx>{`
        .crt-caret {
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export function Arcade() {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <svg viewBox="0 0 120 170" className="w-full">
        <path d="M12 20c0-8 6-14 14-14h68c8 0 14 6 14 14v138c0 6-5 10-10 10H22c-6 0-10-4-10-10Z" fill="#33261a" />
        <rect x="20" y="16" width="80" height="46" rx="6" fill="#0f0d0a" />
        <rect x="26" y="22" width="68" height="34" rx="3" fill="#12100c" />
        <text x="60" y="42" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#ef8a3c">PLAY</text>
        <rect x="20" y="74" width="80" height="30" rx="5" fill="#241b12" />
        <circle cx="42" cy="89" r="7" fill="#1a140d" />
        <circle cx="40" cy="86" r="4" fill="#e6745f" />
        <circle cx="66" cy="88" r="4.5" fill="#e2ab41" />
        <circle cx="80" cy="88" r="4.5" fill="#8ec98b" />
        <rect x="24" y="116" width="72" height="40" rx="4" fill="#2b2016" />
        <text x="60" y="140" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#b6a88f">ARCADE</text>
      </svg>
    </div>
  );
}

export function Notebook() {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <div className="relative rounded-md p-4" style={{ background: "linear-gradient(160deg,#3b6b57,#2f5545)", minHeight: 128 }}>
        <div className="absolute left-2 top-0 flex h-full flex-col justify-around">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="block h-1.5 w-1.5 rounded-full" style={{ background: "#1c150e" }} />
          ))}
        </div>
        <p className="ml-4 font-mono text-xs tracking-widest" style={{ color: "#dfeee7" }}>
          FIELD
          <br />
          NOTES
        </p>
        <p className="ml-4 mt-3 font-hand text-lg leading-tight" style={{ color: "#cfe6dc" }}>
          4 builds,
          <br />4 turning points
        </p>
      </div>
      <div className="absolute -right-2 top-6 h-1 w-16 rotate-[24deg] rounded-full" style={{ background: "#c9a15e" }} />
    </div>
  );
}

export function Stickies() {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <div className="absolute inset-0 rotate-[8deg] rounded-sm" style={{ background: "#e0b94a" }} />
      <div className="absolute inset-0 -rotate-[5deg] rounded-sm" style={{ background: "#e8c96a" }} />
      <div className="relative rounded-sm p-3" style={{ background: "#f0d886", minHeight: 118 }}>
        <p className="font-hand text-[1.05rem] leading-tight" style={{ color: "#5b4415" }}>
          own the problem
          <br />
          nobody flagged.
        </p>
        <p className="mt-2 font-hand text-sm" style={{ color: "#7a5c1c" }}>+ 3 more →</p>
      </div>
    </div>
  );
}

export function Polaroid({ src = "/kaustubh-avatar.webp" }: { src?: string }) {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <div className="rounded-[3px] bg-[#f4efe6] p-2 pb-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="block aspect-square w-full object-cover" style={{ filter: "saturate(0.95) contrast(1.03)" }} />
        <p className="absolute bottom-1.5 left-0 w-full text-center font-hand text-base" style={{ color: "#4a3f30" }}>
          that&rsquo;s me →
        </p>
      </div>
      {/* paperclip */}
      <svg viewBox="0 0 40 60" className="absolute -left-2 -top-4 w-7" aria-hidden="true">
        <path d="M14 8v34a8 8 0 0016 0V14a5 5 0 00-10 0v26" fill="none" stroke="#d9534f" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ResumeSheet() {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <div className="paper-card relative p-3.5" style={{ minHeight: 150 }}>
        <div className="absolute right-0 top-0 h-6 w-6" style={{ background: "linear-gradient(225deg, var(--bg-2) 50%, transparent 50%)" }} />
        <p className="font-serif text-sm" style={{ color: "var(--paper-ink)" }}>
          Kaustubh Jain
        </p>
        <div className="mt-2 space-y-1.5">
          {[100, 72, 88, 60, 92, 68].map((w, i) => (
            <span key={i} className="block h-1 rounded-full" style={{ width: `${w}%`, background: "#c9bda2" }} />
          ))}
        </div>
        <p className="mt-3 font-mono text-[0.6rem] tracking-widest" style={{ color: "#8a7d63" }}>
          DOWNLOAD PDF ↗
        </p>
      </div>
    </div>
  );
}

export function Radio({ playing }: { playing?: boolean }) {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: "linear-gradient(160deg,#3a2c1e,#2a2016)" }}>
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md" style={{ background: "#1a140d" }}>
          <div
            className="h-8 w-8 rounded-full border-2"
            style={{ borderColor: "#c9a15e", background: "repeating-radial-gradient(circle, #241b12 0 2px, #1a140d 2px 4px)", animation: playing ? "spin 3s linear infinite" : "none" }}
          />
        </div>
        <div>
          <p className="font-mono text-[0.58rem] tracking-widest" style={{ color: playing ? "var(--ok)" : "var(--faint)" }}>
            {playing ? "● ON AIR" : "○ TAP TO TUNE"}
          </p>
          <p className="font-hand text-lg leading-tight" style={{ color: "#e8dcc8" }}>
            what I&rsquo;m
            <br />
            into now
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export function DeskCalendar({ teaser }: { teaser: string }) {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      {/* stand */}
      <div className="absolute -bottom-2 left-1/2 h-4 w-10 -translate-x-1/2 rounded-b" style={{ background: "#1c150e" }} />
      <div className="paper-card p-3" style={{ minHeight: 130 }}>
        <div className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: "#c9bda2" }}>
          <span className="font-mono text-[0.55rem] tracking-widest" style={{ color: "#8a7d63" }}>
            DID YOU KNOW
          </span>
          <span className="text-xs" style={{ color: "#8a7d63" }}>↻</span>
        </div>
        <p className="mt-2 text-[0.78rem] leading-snug" style={{ color: "var(--paper-ink)" }}>
          {teaser}
        </p>
      </div>
    </div>
  );
}

export function Newspaper({ headline }: { headline: string }) {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <div className="paper-card p-3" style={{ minHeight: 118 }}>
        <p className="text-center font-serif text-base" style={{ color: "var(--paper-ink)" }}>
          The Daily Build
        </p>
        <div className="my-1.5 h-px w-full" style={{ background: "#a89a7e" }} />
        <p className="font-mono text-[0.55rem] tracking-widest" style={{ color: "#8a7d63" }}>
          WHAT TECH IS ARGUING ABOUT
        </p>
        <p className="mt-1 line-clamp-3 text-[0.76rem] font-medium leading-snug" style={{ color: "var(--paper-ink)" }}>
          {headline}
        </p>
      </div>
    </div>
  );
}

export function Mug() {
  return (
    <div className="relative" style={{ filter: `drop-shadow(${shadow})` }}>
      <svg viewBox="0 0 70 70" className="w-full overflow-visible" aria-hidden="true">
        <g className="steam">
          <path d="M28 12c4-4 0-8 4-12" fill="none" stroke="#b6a88f" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
          <path d="M40 14c4-4 0-8 4-12" fill="none" stroke="#b6a88f" strokeWidth="2.4" strokeLinecap="round" opacity="0.35" />
        </g>
        <path d="M14 26h38v24a12 12 0 01-12 12H26a12 12 0 01-12-12Z" fill="#c96a4a" />
        <path d="M52 30h6a8 8 0 010 16h-6" fill="none" stroke="#c96a4a" strokeWidth="5" />
        <ellipse cx="33" cy="26" rx="19" ry="4" fill="#8a3f2b" />
      </svg>
      <style jsx>{`
        .steam {
          animation: rise 2.6s ease-in-out infinite;
        }
        @keyframes rise {
          0%,
          100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
}
