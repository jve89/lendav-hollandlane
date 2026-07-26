# Lennupesu

Marketing website for Lennupesu — drone roof, facade and solar panel cleaning in Estonia.
Consumer brand of AIF OÜ.

## Read these before doing anything

| File | What it is |
|---|---|
| `SPEC.md` | What this site does, who for, and what it explicitly does not do |
| `ARCHITECTURE.md` | Stack, file tree, data model, component contracts |
| `CLAUDE.md` | Working rules. Read every session. Non-negotiable. |
| `PLAN.md` | Numbered phases, each with a verification command |

`reference/direction-d.html` is the **approved design direction** and the design source
from Phase 1 onwards: near-black base, cyan accent, floating glass pill navigation, large
tight centred headline type, and a light section for services. It also demonstrates the
two hero states — see SPEC section 9. It is not part of the build.

`reference/one-pager-v1.html` is the original single-file site. It is **superseded as the
design source** by `reference/direction-d.html` and is kept for reference only. It remains
a *content* source for Phase 2, where its Estonian copy is still the draft to work from.
Do not take colour, type or layout decisions from it.

## Commands

**Run `nvm use` in this repo before anything else, every session.** Astro 7 requires
Node 22.12 or newer, and this machine does not reliably default to it: a clean login
shell resolves to Homebrew's Node, and an inherited shell may still be on Node 20.
`.nvmrc` pins 22, but only `nvm use` applies it. Check with `node -v` before you
install or build — an install on the wrong Node writes the wrong lockfile.

```bash
nvm use            # FIRST. reads .nvmrc → Node 22
npm install
npm run dev        # local dev server
npm run verify     # check + build + output checks — THE GATE
```

`npm run verify` exiting 0 is the technical definition of done for a phase.
It proves the site is not broken. It does not prove the site works.

## Session pattern

Fresh Claude Code session per phase:

> Read SPEC.md, ARCHITECTURE.md and PLAN.md. We are doing Phase N.
> Plan first, do not write anything until I approve.

Commit on every green phase.

## Before launch — needs the operator, not code

Registry code · VAT number · real phone and email · Formspree account ·
the cleaning product and its Estonian biocide authorisation · the water and power answer ·
`lennupesu.ee` registered and DNS pointed · Google Business Profile verified ·
native-speaker Estonian review of all copy.
