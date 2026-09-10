# Reference research — what makes a portfolio worth spending time on

Done Sept 2026, prompted by the note that v2 was "too simple, common theme, not interactive
enough." Reference the user gave: **aishashok.com**.

## The sites studied

| Site | The move | What to take |
|---|---|---|
| **aishashok.com** | A warm cream "desk". Scattered physical objects — hanging lamp, polaroid on a paperclip, book shelf, CRT showing "field_notes", spinning vinyl record, floppy-disk folder, live flip-clock, coffee-cup toolbar, "tidy desk" reset, a notification card ("would like to share a thought"). Monospace + handwritten script type. | The **desk/room metaphor**. Objects *are* the navigation. Live bits (clock, record). A "tidy" reset. Cozy > corporate. |
| **Bruno Simon** (bruno-simon.com) | Drive a toy car through a 3D world to find projects. Leave a public message in the world. | Turning the site into a *place*. A guestbook baked into the world. (Full 3D is overkill for a PM.) |
| **Robby Leonardi** | Scroll = a side-scrolling platformer of his résumé. | Résumé as a game. Progression as storytelling. |
| **Stephane Willems** | A character in the dark; your cursor is a torch lighting its face; it never loses sight of your cursor. | A **character** ("mini-me") that tracks the cursor = instant personality + "someone's home". |
| **André Souza** | Hero = drag gramophone platters, polaroids, notes, a scratch-off card to reveal details. A fake social-post card introduces him. | Draggable hero objects. Hidden details you *uncover*. |
| **Chris Pokrzywa / Maxime Guillon** | A 3D workspace / island house; every object = a skill (mug labelled "React"). | Objects carry meaning, not just decoration. |
| **Josh Comeau** | Content-rich blog where *every* toggle, button, hover has a small delightful animation. "The case for whimsy." | Whimsy lives in the **micro-interactions**, not just the hero. Delight compounds. |
| **Cassie Evans / Lynn Fisher** | Each section its own pastel world; CSS-art showmanship. | Colour as chapters. Craft as the flex. |
| **Yifei Luo / Aseem Gautam / André** | "Creative mess" playgrounds — everything reacts, you poke around and wonder what else is here. | The goal feeling: *"what else can I click?"* |

## Principles extracted

1. **Make it a place, not a page.** A desk you land at, not a scroll you consume.
2. **Objects are navigation.** Every clickable thing is also a physical object with a reason to be there.
3. **Someone is home.** A cursor-aware character (the "mini-me") that idles, reacts, waves. This is the single biggest "personality" lever.
4. **Ambient motion = mesmerizing.** Lamp flicker, dust motes, a swaying plant, a spinning record, a breathing character. Nothing demanding, always alive.
5. **Reward poking.** Hidden details, easter eggs, things that respond only when dragged or double-clicked.
6. **Live > static.** A real clock. A real "what's tech arguing about right now" feed. A day-counter. It proves the site is tended.
7. **Games that mean something.** Not filler — small games that dramatise how he thinks (ship/cut decisions, deployment gates) and can be listed as projects.
8. **Keep the fast path.** ⌘K / a menu for recruiters who want the résumé in 5 seconds and don't want to play.
9. **Whimsy in every corner.** Buttons, toggles, the 404, the loading state — all get a small animation.
10. **Warm, not the default dark-tech.** Espresso/parchment/wood/brass over the common near-black + neon.

## Direction chosen for Kaustubh

**"The Desk" (warm, night-time)** — you arrive at his desk under a warm lamp. On it:
- **Mini-me** — hand-drawn SVG, idle-breathing, head/eyes track the cursor, waves on load, reacts to drags and game wins.
- **Polaroid** (his photo, paperclipped) · **Notebook** → Work · **CRT monitor** → Decisions · **Arcade cabinet** → the games · **Desk calendar** → a flip-card tech fun-fact deck · **Newspaper** → live "tech pulse" (Hacker News top story, real API, no key) · **Sticky notes** → the playbook · **Résumé sheet** → PDF · **Radio** → what he's into now · **Coffee mug** → easter egg.
- Everything draggable (positions persist per visitor); **"tidy desk"** resets. Ambient: lamp glow, dust, the radio dial pulsing.
- **Arcade games** (also listed as projects): **Ship It** (features fly toward a deadline — tap ship / cut / defer, score = good calls per minute) and **Pipeline Panic** (Helix-flavoured: approve / hold / test incoming deploys, don't break prod).
- Inner pages (Work, Decisions, About) restyled to the warm theme; open like you picked the object up.
- ⌘K stays as the recruiter fast-path.
