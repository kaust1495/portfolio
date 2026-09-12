# CONTENT-NEEDED.md

**This blocks Phase 2.** Do not build the visual system around absent evidence —
that produces a polished shell, which is exactly what the current site is.

Kaustubh fills this in. The agent should refuse to proceed past Phase 1 with
`TODO` left anywhere in `content/records/`.

---

## Part A — the eight questions

Answer in writing in `docs/ANSWERS.md` before any design work.

1. **Which single role should the homepage optimise for first?**
   Product manager · founder's office · product strategist · technical
   program/platform · venture. Pick one. "A hybrid" is the current answer and
   it is why the positioning is diffuse.

2. **Which three projects can show screenshots, diagrams or measurable results
   without breaching confidentiality?** Name them. For anything that can't,
   say what the redacted version can show.

3. **For each project: what did you personally own, versus the team?**
   Use the five levels — owned / built / collaborated on / influenced / team
   outcome. This is the highest-credibility field on the site and the one most
   likely to be fudged.

4. **What is the strongest disagreement or trade-off you handled in each
   project?** Who disagreed, what they argued, and how it resolved. This
   populates the `TRADE-OFF` field, which is required and currently empty on
   all four.

5. **Which one claim about yourself do you most want believed after five
   minutes?** One sentence. Everything on the site either supports it or gets cut.

6. **What kind of email would make you reply within an hour?** This becomes
   "the ask" in the footer, verbatim.

7. **Which parts of the current site do you actually enjoy maintaining?**
   Anything you don't enjoy maintaining will go stale and a stale register is
   worse than no register.

8. **Which existing interactions are technically interesting but strategically
   irrelevant?** Be honest. This one will hurt.

---

## Part B — the four project records

For each of PRJ-01…04, supply every field. No blanks.

```yaml
id: PRJ-02
title: Helix
date: 2025
status: PoC                 # LIVE | SHIPPED | PoC | PROPOSED | INTERNAL | SUPERSEDED
confidence: tested          # shipped | tested | proposed | self-reported
confidential: true

ownership:
  owned: []                 # what you personally decided and built
  collaborated: []          # what you did with others
  team: []                  # what the team achieved that you contributed to

problem: ""                 # what was wrong, and for whom
constraint: ""              # what made the obvious answer impossible
options: ["", "", ""]       # at least three, honestly stated
decision: ""                # what you chose
tradeoff: ""                # what you knowingly gave up — REQUIRED
result: ""                  # what changed
supersededBy: null          # or what you'd do differently now

metrics:
  - value: ""
    measure: ""             # how it was counted
    period: ""
    scope: ""               # team size, systems, blast radius
    ownership: ""           # one of the five levels
    limitation: ""          # what would make a sceptic doubt it
    verifiable: false       # false ⇒ rendered as explicitly unverifiable

exhibits:
  - id: EX-03
    kind: diagram           # diagram | screenshot | artifact
    proves: ""              # what it PROVES, not what it is
    redaction: ""           # what must be blacked out, and the generalised label
```

### Known gaps to close

**PRJ-01 FirstStep** — currently resolves to "Live and usable," which is not an
outcome. Needed: queries answered · pathways completed · jurisdictions covered ·
a hand-checked accuracy sample (even n=50 counts) · what you personally designed
versus what AI-assisted tooling produced · how you evaluate hallucination or
unsafe advice.

**PRJ-02 Helix** — currently resolves to an internal award, which is not an
outcome. Needed: release steps the PoC automated · number of approval gates ·
rollback time · test conditions · what stayed hypothetical. Keep the `PoC` stamp
and never imply production.

**PRJ-03 Subpoena** — currently resolves to "delivered on schedule." Needed:
document volume · cycle time before and after · error or misroute rate ·
queue visibility before and after · your role in the cutover sequencing.

**PRJ-04 Platform** — the strongest record. Fix the scoping only:
`50+ servers consolidated · 150+ upgraded (Captiva)`. Never `150+ servers`
alone — the site currently states both figures for different things, and
collapsing them is the kind of drift that kills credibility on a page whose
whole argument is provenance.

---

## Part C — the other records

**DEC-01…12** — you already have twelve. For each: context · options · your
choice · reasoning · outcome · which PRJ it links to. DEC-01 goes on the
homepage, so pick the most legible one.

**LAB-01…07** — you already have seven. Each needs a `PROVES:` line: what
engineering judgment does this reveal? And each needs a live inline demo rather
than a description of one.

**NOTE-01…03** — three field notes, to ship in Phase 5. Suggested, because only
you can write them:
- What a bank actually requires before it lets an agent touch a pipeline
- Why every migration is a product decision in disguise
- What you got wrong in your first six months managing a book

**Investment claim** — the site says "top-percentile book" three times with no
figure, no benchmark, no period. Either attach a number and a period, or cut the
adjective. One position memo — thesis, entry, what you got wrong, what happened
— would do more than the phrase repeated indefinitely.

---

## Part D — assets

- Portrait, square crop, to be rendered as an ID photo. The current formal
  suit-and-tie shot works in this treatment; it did not work next to a
  handwritten greeting.
- Any screenshot, architecture sketch, whiteboard photo, Jenkins view, dashboard
  or whitepaper page you are permitted to show, redacted or not. **Four case
  studies currently contain zero images.** A blurred screenshot with a callout
  arrow beats no screenshot by an enormous margin.
- Résumé source (not just the PDF) so `/resume` can be generated as HTML with a
  print stylesheet.

---

## The rule

If a number does not exist, **say what you would measure and why.** That is
itself a product answer, and it is far stronger than a vague claim. The site's
entire argument is provenance — an honest gap is on-message; a soft assertion is
off-message.
