# Lennupesu

Marketing website for Lennupesu — drone roof, facade and solar panel cleaning in Estonia.
Consumer brand of AIF Drone Services OÜ.

## Read these before doing anything

| File | What it is |
|---|---|
| `SPEC.md` | What this site does, who for, and what it explicitly does not do |
| `ARCHITECTURE.md` | Stack, file tree, data model, component contracts |
| `CLAUDE.md` | Working rules. Read every session. Non-negotiable. |
| `PLAN.md` | Numbered phases, each with a verification command |

`reference/one-pager-v1.html` is the original single-file site. It is the design source
and the content source for Phases 1 and 3. It is not part of the build.

## Commands

```bash
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
