# Lendav Hollandlane

Marketing website for Lendav Hollandlane — drone roof, facade and solar panel cleaning
in Estonia. Trading name of AIF OÜ.

**The business name lives in `src/config/site.ts` and nowhere else** — see CLAUDE.md,
"The brand name".

## Read these before doing anything

| File | What it is |
|---|---|
| `SPEC.md` | What this site does, who for, and what it explicitly does not do |
| `ARCHITECTURE.md` | Stack, file tree, data model, component contracts |
| `CLAUDE.md` | Working rules. Read every session. Non-negotiable. |
| `PLAN.md` | The phases, each with a verification command. **They are not in numerical order** — take the next one from the order table at the top of that file. |

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

> Read SPEC.md, ARCHITECTURE.md and PLAN.md. Take the next phase from the order table at
> the top of PLAN — the phases are **not** in numerical order, so do not infer it from the
> integers. Tell me which phase you have taken and why before doing anything else. Plan
> first, do not write anything until I approve.

Commit on every green phase.

**Phase 10 — the real content drop — is next.** Then launch. Phases 7, 8 and 11 are
post-launch. Phase 9 is done.

Take the next phase from the order table at the top of PLAN, not from this line and not
from the integers — the phases do not run in numerical order.

## Before launch — needs the operator, not code

Equipment and the first flight, which is a controlled job on family property and the source
of all the footage · the cleaning product decision, and with it the biocide sentence that
five service pages and the FAQ currently promise · the water and power answer ·
the `needs-operator-review` claims · a working email, blocked on Cloudflare Email
Routing not being configured · Google Business Profile verified · native-speaker
Estonian review of all copy.

**Settled on 26 July 2026 and no longer blocking:** the business name (Lendav
Hollandlane) and the domain (`lendavhollandlane.ee`, registered and owned; its DNS
migration to Cloudflare is a launch-checklist step, not a blocker). A data retention
period came off in Phase 9, replaced by a criterion.

PLAN's "blocked on the operator" section is the authoritative version of this list, with the
reasoning and the dependencies between items. Keep the two in step or delete this one.
