"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hum — a generative ambient soundtrack.
 *
 * No audio files and no library. Every note is synthesised in the browser
 * with the Web Audio API and picked at play time from a D-minor pentatonic
 * set, so the music never loops and never repeats exactly. Two detuned
 * oscillators per note, a long attack/release envelope, and a lowpass
 * filter drifting under an LFO.
 *
 * Never autoplays — browsers block it and it's rude. Always a click.
 */

// D minor pentatonic, three octaves. Pentatonic because any two notes in it
// sound fine together, which is what makes random selection listenable.
const SCALE = [
  146.83, 174.61, 196.0, 220.0, 261.63, // D3 F3 G3 A3 C4
  293.66, 349.23, 392.0, 440.0, 523.25, // D4 F4 G4 A4 C5
  587.33, 698.46, 783.99, // D5 F5 G5
];

const BARS = 5;

export function Hum() {
  const [on, setOn] = useState(false);
  const [level, setLevel] = useState<number[]>(() => Array(BARS).fill(0.2));

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const analyserRef = useRef<AnalyserNode | null>(null);

  /** Build the graph once, on the first click (needs a user gesture). */
  const ensureGraph = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();

    const master = ctx.createGain();
    master.gain.value = 0;

    // gentle roll-off so nothing is ever harsh
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.6;

    // the filter breathes — this is most of why it sounds alive
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.05;
    lfoGain.gain.value = 420;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.85;

    master.connect(filter).connect(analyser).connect(ctx.destination);

    ctxRef.current = ctx;
    masterRef.current = master;
    analyserRef.current = analyser;
    return ctx;
  }, []);

  /** One note: two detuned oscillators, long swell, long tail. */
  const voice = useCallback((ctx: AudioContext, master: GainNode) => {
    const freq = SCALE[Math.floor(Math.random() * SCALE.length)];
    const now = ctx.currentTime;
    const attack = 1.6 + Math.random() * 1.4;
    const hold = 1.2 + Math.random() * 2.5;
    const release = 3.2 + Math.random() * 2.5;
    const peak = 0.055 + Math.random() * 0.045;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(peak, now + attack);
    g.gain.setValueAtTime(peak, now + attack + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, now + attack + hold + release);

    // a touch of movement in the stereo field
    const pan = ctx.createStereoPanner();
    pan.pan.value = Math.random() * 1.4 - 0.7;

    const stop = now + attack + hold + release + 0.1;
    [0, 1].forEach((i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      osc.detune.value = i === 0 ? -4 : 5; // beating between the two = warmth
      osc.connect(g);
      osc.start(now);
      osc.stop(stop);
    });

    g.connect(pan).connect(master);
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.1);
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const start = useCallback(() => {
    const ctx = ensureGraph();
    const master = masterRef.current;
    if (!master) return;
    void ctx.resume();

    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 2.4);

    // notes arrive at irregular intervals — a metronome would give it away
    const schedule = () => {
      voice(ctx, master);
      timerRef.current = window.setTimeout(schedule, 1700 + Math.random() * 3400);
    };
    voice(ctx, master);
    timerRef.current = window.setTimeout(schedule, 900);
  }, [ensureGraph, voice]);

  useEffect(() => {
    if (on) start();
    else stop();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [on, start, stop]);

  // pause when the tab is hidden — nobody wants a ghost tab humming
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) void ctxRef.current?.suspend();
      else if (on) void ctxRef.current?.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [on]);

  // bars follow the real output, not a fake animation
  useEffect(() => {
    if (!on) return;
    const data = new Uint8Array(32);
    const tick = () => {
      const a = analyserRef.current;
      if (a) {
        a.getByteFrequencyData(data);
        setLevel(Array.from({ length: BARS }, (_, i) => {
          const v = data[2 + i * 3] / 255;
          return 0.2 + Math.min(0.8, v * 2.6);
        }));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [on]);

  useEffect(() => () => { void ctxRef.current?.close(); }, []);

  return (
    <button
      onClick={() => {
        if (on) setLevel(Array(BARS).fill(0.2));
        setOn(!on);
      }}
      className="fixed bottom-5 left-5 z-[60] flex items-center gap-2.5 rounded-full px-3 py-2"
      style={{
        background: on ? "var(--coral-ink)" : "var(--surface)",
        color: on ? "#fff" : "var(--muted)",
        border: `1px solid ${on ? "transparent" : "var(--line-2)"}`,
        boxShadow: "var(--puff)",
        transitionProperty: "background, color, box-shadow",
        transitionDuration: "0.3s",
        transitionTimingFunction: "var(--ease)",
      }}
      aria-pressed={on}
      aria-label={on ? "Stop the ambient soundtrack" : "Play a generative ambient soundtrack"}
      title={on ? "Hum — playing. Generated live, never the same twice." : "Hum — a soundtrack this page writes as it plays"}
      data-doodle={on ? "it's writing that as it goes" : "turn the sound on?"}
    >
      <span className="flex h-4 items-end gap-[2.5px]" aria-hidden="true">
        {level.map((v, i) => (
          <span
            key={i}
            style={{
              width: 2.5,
              borderRadius: 2,
              background: "currentColor",
              height: `${v * 16}px`,
              transitionProperty: "height",
              transitionDuration: "0.14s",
              transitionTimingFunction: "linear",
            }}
          />
        ))}
      </span>
      <span className="text-xs font-medium">{on ? "Hum" : "Sound"}</span>
    </button>
  );
}
