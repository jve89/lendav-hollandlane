# SPEC.md — Lendav Hollandlane website

**Version 1.6 · 8 August 2026** — **the site has two pillars now, not one, and
section 11 is new.** Drone inspection is added as a second line of business
alongside cleaning: a path chooser on both home pages and one static page per
locale. Section 11 records the decision and, more importantly, **the copy
constraints that bind the inspection line**, which are stricter than anything
else on this site — no work claimed as done, **no qualification, certification,
licence or professional standing claimed or implied**, no equipment, no
regulatory statement about what is permitted, no price and no turnaround, and
**thermal imagery as documentation only — never measurement, never diagnosis**.
What is sold is imagery and documented observations; the interpretation belongs
to the client's own specialist and the page says so. Section 2's tertiary audience
and section 8's "planned for later" both described this line as future work and
are corrected in place. Nothing else moved: the hero decision, the footage
exception, the pricing rules and the ban on invented evidence are unchanged.

**Version 1.5 · 3 August 2026** — **a hero video is now on the site, and it is
not the operator's own footage.** Three things moved, all in section 9. The loop
length widened from **8–12 to 8–16 seconds**, because the first real cut is 15.4
seconds and encodes to 1.2 MB — well inside the byte cap, which is the limit that
actually governs. The **no-stock-footage rule was amended rather than repealed**:
third-party footage is permitted as decorative hero background under four
conditions that must hold together, and **before/after imagery is excluded from
that exception in all circumstances**. And the **current placeholder is recorded
as a dated, temporary exception with an explicit removal trigger** — here, in
PLAN's Phase 10 and in the ARCHITECTURE section 6 Hero contract, because a
version note at the top of one document is not where a future session will meet
it. Nothing else moved: the byte cap, the sequence that gates launch on the first
flight, and the ban on invented evidence are all unchanged.

**Version 1.4 · 29 July 2026** — **the hero video was built, and two statements
in this document turned out to describe a hero that is not what shipped.** Both
are corrected in place rather than annotated, because a governing document that
is actively wrong about the site is worse than one that says nothing. Section 9
described the FOOTAGE state as *"a media band above the price and credentials
block"*; it is a **scrimmed background behind the type**, which is what PLAN's
binding constraint list specified. Sections 6 and 9 both promised **zero bytes
of video on mobile**; the `(min-width: 48em)` condition came off the `<source>`
gate deliberately, so a phone fetches it too, and the budget is now a single
**1.5 MB** cap enforced by a build check rather than a desktop/mobile split.
Nothing else moved: the hero decision itself, the no-footage state as the
default path, the no-stock-footage rule and the sequence that gates launch on
the first flight are all unchanged.

**Version 1.3 · 26 July 2026** — section 5's differentiator list was overstated
and is corrected, and **section 10 is new**: the competitor publishes prices
too, and is cheaper. Version 1.2 settled the business name as **Lendav
Hollandlane** and the domain as `lendavhollandlane.ee`. The audience, the scope,
the content constraints and the hero decision are unchanged, as is the legal
name behind the brand, AIF OÜ.

---

## 1. What this is

The marketing website for **Lendav Hollandlane**, the consumer-facing trading name of AIF OÜ: drone-based roof, facade and solar panel cleaning in Estonia.

Its single job is to turn a stranger into a written enquiry with an address and an approximate area. It is not a shop, not a booking system, and not a portfolio for its own sake.

## 2. Who it is for

**Primary — Estonian homeowners.** Detached houses, typically 150–300 m² of roof, with visible moss. They find us by searching *katusepesu*, *katuse puhastus*, *fassaadipesu*, or through the Google Business Profile and Facebook. They decide fast, want a price before they call, and are choosing between us and a man with a ladder — not between drone operators.

**Secondary — housing associations (KÜ) and commercial property managers.** Larger sites, slower decisions, and they need documents: risk assessment, proof of insurance, a copy of the operational authorisation. Higher value per job, and the economics say these matter more than the volume suggests.

**Tertiary — English-speaking property owners and commercial clients**, and the inspection line.

*This read "groundwork for the future inspection/survey line" until 8 August 2026. It is not future work any more — it is a pillar on the home page and a page in both locales. See section 11, which governs what that page may say.*

## 3. What the site must do

1. State what we clean and what it costs, above the fold.
2. Establish that we are licensed and insured, and that nobody walks on the customer's roof.
3. Show real before/after evidence of our own work.
4. Answer the objections that stop a booking: roof damage, chemicals, weather, water and power, timing.
5. Capture an enquiry with name, phone, email, address, service and approximate area.
6. Rank for Estonian roof- and facade-cleaning searches over time.

## 4. What this site explicitly does NOT do

- **No online booking or calendar.** Every job needs measuring before it can be priced. A booking widget would create appointments we cannot honour.
- **No instant automated quote.** An area-based calculator would quote jobs we would refuse and undercut jobs we should charge more for.
- **No payments, invoicing, or customer accounts.** Invoicing happens outside the site.
- **No page per Estonian town.** Two real regional pages, Tallinn and Harjumaa — and they are the first work *after* launch, not part of it. A new one is added only when a completed job in that town supplies genuine photos and content. Thin location pages are a ranking liability, not an asset.
- **No blog at launch — neither the posts nor the machine.** The infrastructure is built after launch, and the posts wait beyond that until there is something real to say.
- **No Russian at launch.** The routing and content model must make Russian a translation drop, not a refactor.
- **No customer login, no CRM, no dashboard.**
- **No stock photography, no invented testimonials, no fabricated case studies.** See CLAUDE.md — this is a hard rule, not a preference. **One narrow, conditional exception exists for decorative hero background video, and it is written out in section 9.** It does not reach photography of work, it does not reach before/after imagery under any circumstances, and it is not a general licence for third-party media.

## 5. Non-negotiable content constraints

- Every price shown is **excluding VAT**, and says so. Estonian VAT is 24%.
- We do **not** claim to be the first or only drone cleaning operator in Estonia. Droonipesu OÜ (trading as Pesutech) already operates nationwide. Our differentiators are **the structure of our price list** — a per-m² from-price, a stated minimum job value and an explicit ex-VAT basis, against their two from-prices on two service pages — the documented SORA SAIL II operational authorisation, and insurance. All three are verifiable claims. **This said "published pricing" until 26 July 2026, and that was overstated: they publish prices too, and they are cheaper. See section 10.**
- Regulatory claims must be exact: operational authorisation from the Estonian Transport Administration (Transpordiamet) for specific-category operations under SORA, SAIL II; third-party liability insurance under Regulation (EC) 785/2004.
- Any statement about cleaning products must name the actual product and its Estonian biocide authorisation. Until that is confirmed, **no product is named and no claim about one is made** — the page says that the product and its authorisation are given in the quote, and the unconfirmed fact is recorded as a comment in the content file. Revised in Phase 4: this previously required a visible `TODO:` marker on the live page. The constraint that matters is that nothing unverified is asserted, not that the gap is advertised to the customer. See CLAUDE.md.
- Estonian is the source of truth. English is a translation of it, not a parallel original.

## 6. Success criteria

**Technical (automatable, and the floor — not the goal):**
- `npm run build` exits 0
- `npm run check` exits 0 (Astro type check)
- No broken internal links
- Lighthouse performance ≥ 95, accessibility ≥ 95 on the home page, mobile
- Total page weight under 500 KB on first load, excluding photography

The 500 KB budget was written before the hero video was decided, and it carves out photography but not video. **Decided: the budget stays binding on mobile, and hero video is inside it.**

**This paragraph said "this costs nothing to honour, because the hero does not fetch video on a phone at all", and that stopped being true on 29 July 2026.** The `(min-width: 48em)` condition came off the hero's `<source>` gate when the video was built: excluding phones was a product decision dressed as a performance guard, and most of this site's traffic is mobile. **A phone now fetches the video too.**

What keeps the budget honest instead is *when* it is fetched. The poster is the LCP element and is a responsive AVIF/WebP `<Picture>`; the video is `preload="none"` and is fetched only when the hero enters the viewport, after the poster has painted, so it is outside the first-load critical path. It is capped at **1.5 MB** and a build check enforces that. **But it is no longer zero, so the honest arbiter is a measurement rather than an argument:** PageSpeed mobile on the deployed site, against PLAN Phase 10's gate of 90. Below that, the width condition goes back on. Lighthouse mobile is the measurement that matters, and it is the one a hero video most easily breaks.

**Commercial (the real gate, not automatable):**
- The site produces a written enquiry with a real address.
- A visitor can find the price without contacting anyone.

## 7. Constraints

- One person maintains this, part-time, during a season in which he is flying 15 days a month.
- Content is edited as markdown in the repo, via Claude Code or directly on GitHub.
- Hosting must be free or near-free. No server, no database.
- The site must be fully usable on a phone: over half of Estonian home-services traffic is mobile.
- Contact details and prices must live in exactly one file. Changing a phone number must never mean editing more than one line.

## 8. Out of scope for v1, planned for later

Russian translation · blog posts · additional regional pages backed by real jobs · case studies with named commercial clients · review widget pulling from the Google Business Profile.

**"A separate section or site for the inspection and survey line" came off this list on 8 August 2026**, and it came off in the smallest form the question has: **one static page per locale on this site**, not a section and not a domain. Whether it ever earns its own section or its own domain is still open and is still deferred — ARCHITECTURE section 10 carries it. What is settled is that it exists here, and section 11 is what governs its copy.

## 9. Home page hero

**Decided.** The home page opens with a looped video of our own drone cleaning work — muted, autoplaying, `playsinline`, no controls, no sound. Directly beneath it, with nothing between, sits the price and credentials block: the published from-price excluding VAT, the Transpordiamet operational authorisation, the insurance, and that nobody walks on the roof.

This is the whole of section 3 items 1 and 2 in a single screen. The video answers "what is this" faster than a paragraph can; the block under it answers "what does it cost and can I trust them" before the visitor has scrolled.

**Our own footage does not exist yet, and what governs is the sequence, not a date.** The equipment is ordered; delivery follows roughly a week after that. The first flight is a **controlled job on family property, not a paying customer's roof**, flown as soon as the kit arrives. That flight produces the hero footage, a before/after pair, a measured job duration and the water-and-power answer. **The site launches after that flight, not before it.**

**What is on the site today is a placeholder that is not ours**, installed on 3 August 2026 under the amended rule below and recorded as a dated, temporary exception further down this section. It changes none of the above: the flight still produces the real footage, and it still gates launch.

An earlier version of this section put the footage at "September 2026" and had the site launching without it. That was an assumption made in session one and never checked with the operator; it is recorded here so it is not reinstated. Express this as a sequence — dates rot, and this one already did.

**No design decision changes.** Our footage did not exist when the hero was built, so the hero is built so that the state with no footage is the *default* path, not a degraded one — the same principle already applied to `BeforeAfter` in ARCHITECTURE section 6. **That remains a requirement of the component and is not softened by there being a file in `public/video/` today**: the media layers are gated on the assets existing, so deleting both files returns the site to a finished type-led hero with no code change. That property is what makes the placeholder below removable in one step.

### No stock footage — amended 3 August 2026, scoped rather than repealed

**The rule as it stood.** Section 4 and CLAUDE.md forbid stock photography, and that applied identically to video: if the footage was not ours, it did not go on the page.

**What the rule is actually protecting is authenticity, not copyright.** A visitor must never be shown work that is not this operator's and be led to believe it is. Written permission from a rights holder settles whether we may publish a file; it settles nothing about whether the visitor is misled, which is the only thing this rule was ever for. **So permission alone does not open the rule**, and the exception below is narrow by construction rather than by good intentions.

**Third-party footage is permitted only where all four of these hold together.** Any one of them failing puts the footage back under the flat prohibition above:

1. **Written permission from the rights holder exists and is recorded** — recorded in this repository, naming who granted it and for what.
2. **It is used only as decorative hero background.** Never in a before/after pair, never in a `jobs` entry, and never anywhere a claim about the operator's own work is made or implied.
3. **It carries no caption, alt text, address, date or surrounding context suggesting it is our job.** The hero media container is `aria-hidden` decoration and every claim the page makes is made in text beside it; nothing in that text may point at the footage as evidence.
4. **It is replaced by the operator's own footage as soon as that exists.** It is a placeholder carrying a removal trigger, not an asset.

**Before/after imagery is excluded from this exception in all circumstances** — third-party or not, permitted or not, captioned however carefully. Those images are *evidence*: section 3 item 3 asks the site to show real before/after evidence **of our own work**, and a borrowed pair is a false claim regardless of who owns the copyright. The hero is decoration and asserts nothing on its own; a before/after pair is an assertion. **That distinction is the entire boundary of this exception and it does not move.** `BeforeAfter`'s empty state stays the answer until a real job file lands.

### Current hero footage — a dated, temporary exception

**`public/video/hero.mp4` and `src/assets/hero-poster.jpg` are not the operator's footage.** They are **manufacturer-supplied footage of a third party's building**, used with the **supplier's written permission**, and they were installed on **3 August 2026** as a placeholder pending the operator's first controlled flight. They are used as decorative hero background only, carry no caption or context claiming the work, and appear in no before/after pair.

**Removal trigger: they are replaced the moment the operator has his own footage** — which is the same first flight this section already gates launch on. **The swap is two file copies and no code change**, at the two paths above. This is recorded here, in PLAN's Phase 10 and in the ARCHITECTURE section 6 Hero contract, so a session that meets the files meets the reason for them.

**Amending this rule put a false claim on the live site, and that is recorded here rather than quietly fixed.** The `BeforeAfter` empty state said *"Iga foto sellel lehel on meie enda töö"* — every photo on this page is our own work — and had said it since Phase 3. The placeholder hero poster is a photograph of a third party's building, and it sits a few hundred pixels above that sentence. **The claim and its counter-example shipped on the same page, in both locales, on 3 August 2026.** The copy has been narrowed to promise that every *before and after* photo is our own work, which is true, and which is where the promise was doing its work in the first place.

**The failure was in the method, not in the wording.** The exception was written into SPEC, PLAN, ARCHITECTURE, CLAUDE.md and the component comments — five places — and at no point did anyone search the site's own copy for a sentence asserting the rule being amended. Documentation states rules; **user-facing copy also states them, to the customer, as promises.** A rule that has been in force for months has usually been written into the product, and the product is the copy that matters.

**So this is now a requirement, not an observation. Amending or narrowing any rule of this kind — what may be photographed, what may be claimed, what may be published — requires a search of `src/i18n/` and `src/content/` in both locales for copy asserting the unamended rule, before the amendment is called done.** Grep for the subject of the rule, not for its wording, because the copy will not use the same words the documents do. Note what the search found, including nothing. **The documentation search is not a substitute**: the documents were all correct and consistent with each other while the page was telling visitors something false.

**Hosting — self-hosted in `public/video/`.** Not a video CDN. At this site's traffic the file is free to serve on the hosting plan we already have, with roughly two orders of magnitude of headroom. More importantly, what a video CDN sells — adaptive bitrate, a media library, a player — is of no use to a single short silent loop, and its player is client JavaScript delivering HLS, which works against both the Lighthouse target above and the zero-JS rule. Revisit only if a real video library appears, meaning several job clips at Phase 10.

**Two states, and the NO-FOOTAGE state is the one that is built first.** `reference/direction-d.html` is the approved design direction and demonstrates both states on the same page.

- **NO-FOOTAGE — the default path, and what the site rendered until 3 August 2026.** A black, type-led hero: the headline, the sub, and the price and credentials block, carried by type and the tokens alone. **No media band, no poster, no placeholder.** Not a reserved empty band, not a grey box, not a blurred gradient standing in for a photograph, not the words "video coming soon" — the section simply has no media in it. This is the default path. It is built first and it must look finished, for two reasons: it is the state every preview build and every review renders in until the footage lands, and it is what launch falls back to if that footage slips or turns out unusable. A hero that looks broken without footage will ship looking broken.
- **FOOTAGE — what the same hero becomes.** It *gains a scrimmed background behind the type* — the video and its poster sit behind the headline, the sub and the price and credentials block, under a uniform scrim. Within this state the media degrades video → poster still, under the guards below.

  **Corrected 29 July 2026: this said "a media band above the price and credentials block", and the hero was not built that way.** PLAN's Phase 10 constraint list said "scrimmed background loop … background, not foreground", that list governs where the two disagree, and background is what shipped. The sentence is corrected rather than annotated because a governing document that describes a layout the site does not have is worse than no description.

The distinction that still matters is how it is built: this is a type-led hero that later gains a video, not a video hero with a hole in it. The no-footage state is not the bottom of a fallback chain — it is a finished design in its own right, and nothing about it is a placeholder awaiting an asset. That is now enforced by construction: the media layers render only when the assets exist.

Detail in the Hero contract, ARCHITECTURE section 6.

**`prefers-reduced-motion` — no video is fetched.** A reduced-motion visitor gets the poster, or the image-free hero when there is no poster. Two independent guards enforce this, and both are built rather than one held in reserve: a `media` gate on `<source>` that prevents the fetch, and a CSS rule that hides the video under `prefers-reduced-motion: reduce`. The guards cover different failure modes and neither is a substitute for the other.

**Mobile is no longer part of that sentence, and this is the change.** It read "Mobile and `prefers-reduced-motion` — no video is fetched in either case" until 29 July 2026, when the `(min-width: 48em)` condition came off the `<source>` gate. **A phone now fetches the video**, deliberately: the poster is already the LCP element, the video is `preload="none"` and fetched on viewport entry, and a hero video no mobile visitor ever sees defeats the purpose of having one on a site whose traffic is mostly mobile. Reversible on a PageSpeed number — see section 6 and PLAN Phase 10.

**Budget.**

- **1.5 MB maximum** for the hero video, on every device, counted as the single file the browser actually fetches rather than the sum of the encodings offered. **This replaces the "2 MB desktop / zero mobile" split** that stood here until 29 July 2026. It is PLAN Phase 10's tighter number, and it is enforced by check 7 in `scripts/check-html.mjs` rather than trusted.
- **Loop length: 8–16 seconds.** Long enough to show the work, short enough to encode well under the cap and to loop without the seam becoming obvious.

  **Widened from 8–12 on 3 August 2026, and here is the reasoning, because the number itself carries none.** The first real cut is **15.4 seconds and 1,233,248 bytes — 1.18 MB against the 1.5 MB cap**, leaving about 330 KB of headroom. The 12-second figure was never a measurement: it was a judgement about two things, whether a longer cut could still be encoded well under the cap, and whether the loop seam would become obvious. Neither binds here. The encoding question is answered by the file, which came in a fifth under the cap; and seam visibility is a property of *where* the cut is made, not of how long it runs.

  **The byte cap is the governing limit, and the loop length is not a second one.** 1.5 MB is what actually protects a visitor on a phone connection, and it is the only one of these two numbers a machine enforces — check 7 in `scripts/check-html.mjs`. **A longer loop is therefore not licensed by this change: it must still satisfy the byte cap**, and a cut that cannot is re-cut or re-encoded exactly as the line below says. If a future cut needs more than 16 seconds *and* still fits in 1.5 MB, widen this bound again on the same reasoning — deliberately, with the numbers written down, and never by exempting the cap.
- **No audio track in the file at all** — stripped at encode, not muted at playback.
- **The poster** is the LCP element and is the hero asset counted against the 500 KB first-load budget in section 6.

A cut that cannot meet the caps is re-cut or re-encoded. It is not exempted.

See the Hero contract in ARCHITECTURE section 6.

## 10. Competitive position — Droonipesu OÜ / pesutech.ee

**Everything below was observed on 26 July 2026 and is a snapshot of that day,
not a standing truth.** Competitor pricing and copy move. A future session
re-checks these pages rather than trusting this section, exactly as the hosting
figures in ARCHITECTURE section 1 are treated. Sources:

- `https://pesutech.ee/samblatorje-drooniga/` — drone moss treatment
- `https://pesutech.ee/korgete-pindade-pesu-drooniga/` — drone washing of high surfaces

**This section is appended as 10 rather than inserted in sequence** because SPEC
section numbers are cited 33 times across 14 files in this repo; renumbering to
place it thematically would rewrite all of them to gain nothing.

### They publish prices, and they are cheaper

Both drone pages state **"Hind alates 2 EUR m²"**. Our roof and facade
from-price is €3/m². There is no price list page on their site, no minimum job
value, and no price on their home page.

**We are at least 50% more expensive on the figure a homeowner actually
compares, and possibly more.** Their pages do not state a VAT basis. Ours is
explicitly excluding VAT. So:

| if their €2 is | their ex-VAT price | we are dearer by |
|---|---|---|
| excluding VAT | €2.00 | 50% |
| including VAT | €1.61 | 86% |

**50% is the best case for us, and their basis is unknown.** Do not collapse
this to a single number, and do not resolve it by assuming the more flattering
reading — an unstated basis is an unknown, not a default.

**This is recorded, not acted on.** `site.prices` is unchanged. The pricing
decision belongs to Phase 10, when the first job produces real throughput and
cost data — see PLAN.

### The minimum job value is not a second price gap. It is a different market.

**Read this before drawing any conclusion from the per-m² comparison above.** On
its own that comparison describes our position wrongly, and the correction is
not a detail.

They state no minimum job value. We state **€450**. On a 60 m² garage roof their
site implies **€120** and ours implies **€450**:

| roof | theirs, implied | ours | ratio | |
|---|---|---|---|---|
| 60 m² | €120 | €450 | **3.75×** | minimum binds |
| 100 m² | €200 | €450 | **2.25×** | minimum binds |
| 150 m² | €300 | €450 | 1.50× | per-m² applies |
| 200 m² | €400 | €600 | 1.50× | per-m² applies |
| 300 m² | €600 | €900 | 1.50× | per-m² applies |

That is not a 50% gap. It is a different market, and it is **a deliberate choice
rather than a competitive weakness.**

**The minimum stops binding at exactly 150 m²** — €450 ÷ €3 — which is exactly
the lower bound of the roof size named as our primary audience in section 2,
*"typically 150–300 m²"*. Inside that band the gap is a flat 1.50× and the
minimum never applies. Below it the ratio climbs because we are not bidding.

**We are structurally not competing for small jobs, because a small job does not
pay for the trip.** The equipment, the setup and the travel cost the same on a
60 m² garage as on a 250 m² house. The minimum is what stops the site producing
enquiries we would have to decline or lose money on — the same reasoning as the
no-booking and no-calculator decisions in section 4.

**So do not "fix" the minimum on the strength of a price comparison.** A future
session reading only the per-m² figures would see a 3.75× gap at the small end,
read it as a competitiveness problem, and lower or drop a number that is doing
exactly its job. If the minimum is ever revisited it is on throughput and cost
data from real jobs — Phase 10 — and never because a competitor quotes a lower
number for work we have decided not to want.

### What is genuinely ours, and what is not

**Ours, and defensible:**

- **The structure of the price list.** They publish two from-prices on two
  service pages. We publish a price list with a per-m² from-price, a minimum job
  value and a stated ex-VAT basis. The difference is findability and
  completeness, not the mere fact of publishing.
- **An English site.** They are Estonian only. This is what SPEC section 2's
  tertiary audience rests on.
- **A drone company, not a company with a drone.** They list eight services, of
  which two are drone-based. It is an exterior cleaning business that owns a
  drone.
- **A documented operational authorisation, stated on our site.** See below for
  the hard limit on how this may be used.

**Not ours, and must not be claimed:**

- **Cheaper.** We are not, on the headline figure.
- **More social proof.** They carry no reviews, testimonials or customer counts.
  Neither do we. This is a tie, and it stays a tie until an arm's-length
  customer has paid and agreed to be quoted — PLAN Phase 10.

### The credentials gap, stated exactly

The only safety language anywhere on their site is the generic *"Töötame
vastavalt Eesti ja Euroopa Liidu ohutusnõuetele"*. Neither drone page nor the
home page names Transpordiamet, SORA, the specific category, a pilot competency
or insurance.

**What that licenses us to say: their website does not state an authorisation,
and ours does.** That is an observation about two websites and it is true.

**What it never licenses, in the repo or on a page: that they do not hold one.**
We have no idea. A permission absent from a marketing site is not a permission
absent from the operator, and the inference is as forbidden as the assertion.
This is in CLAUDE.md's forbidden-claims list, and that list governs.

## 11. The inspection line — the second pillar

**Decided 8 August 2026.** This site sells two things, not one. Alongside the
cleaning services it offers **drone inspection**: `/inspektsioon` and
`/en/inspection`, with a two-card path chooser directly under the hero on both
home pages sending a visitor to whichever pillar they came for.

**It is appended as section 11 rather than inserted thematically**, for the same
reason section 10 was: SPEC section numbers are cited across this repository by
number, and renumbering to place this beside the audience section would rewrite
all of them to gain nothing.

### What it is, in one sentence

**We fly, we photograph, we write down what we saw, and we hand the material
over. Somebody else decides what it means.**

That sentence is the whole product and it is also the whole constraint. Every
rule below follows from it, and a future session that keeps the sentence true
will not break any of them by accident.

### The copy constraints — binding, and stricter than the rest of the site

These are not style preferences and they are not a disclaimer to be softened.
This page describes **work that has never been done**, for a line of business
that **holds no qualification of any kind**, using **payloads the operator does
not own**. It is the highest-risk copy on the site: unlike most content slips in
this repository, several of these have a route to a legal problem rather than an
embarrassing correction.

1. **No claim or implication that any inspection work has been done.** No job
   count, no case study, no "we have inspected", no photograph of a result. Where
   the page lists kinds of job it must say **in the copy the visitor reads** that
   the list describes the kind of work and not work already completed — the same
   sentence, and the same reason, as the industrial service page.

2. **No claim or implication of any qualification, certification, licence or
   professional standing.** Forbidden by name, in both locales: *energiamärgis*,
   *energiaaudit*, *energiaaudiitor*, structural assessment, engineering opinion,
   insurance determination, and the words *expert*, *certified* and *official*
   applied to us. **Watch the soft forms**, exactly as with the competitor rule
   in section 10 — "our assessment", "our findings show", "we determine",
   "professional inspection" are all the same claim with the noun moved.

   What is offered is **imagery and documented observations**. The
   interpretation belongs to the client's own specialist, and **the page says so
   explicitly, as a selling point rather than as small print**: what the service
   buys is a qualified person seeing a roof without a scaffold, and that is a
   better argument than a borrowed credential would be.

3. **No statement about which airspace, altitudes, distances or object types are
   permitted.** That follows from the operational authorisation, and whether that
   authorisation reaches inspection flights is **unverified**. The page therefore
   makes no regulatory claim at all — not the authorisation, not the insurance,
   not "we are permitted to fly over houses" — and answers the question by
   scoping instead: we say whether we can take a site on once we have been told
   what it is. **Do not import the home page's credentials strip here on the
   grounds that its claims are true elsewhere.** They are true of the cleaning
   operation, which is what they were verified against.

4. **No equipment claim.** The `TODO(equipment)` prohibition at the top of
   `src/i18n/about.ts` applies here in full: no drone make or model, no camera or
   payload name, no sensor specification, no resolution, no flight time. **The
   payloads for this work are rented and nothing is owned yet.**

5. **No price, no turnaround promise, no availability guarantee.** Quote-based
   only, on exactly the terms the industrial service page uses. `site.ts` holds
   no inspection price and `src/i18n/inspection.ts` must never become the place
   one is typed.

6. **No seasonal claim about thermal imaging**, unless it is stated as a general
   physical fact rather than as a service promise. The page says a thermal image
   shows differences in surface temperature and that those are only visible when
   a difference exists — which is physics, is true, and promises nothing about
   our sensor, our season or our results. *"Best results in winter"* is a service
   promise and is forbidden.

7. **Thermal imagery is documentation. It is never measurement and never
   diagnosis** — and the page states that boundary explicitly, including the two
   specific things it rules out: **no productivity or output measurement of solar
   panels, and no electrical diagnosis or fault finding.** Added 8 August 2026
   with the pillar itself; the reasoning is below, because the constraint is not
   self-evident from the constraint.

### Why constraint 7 exists, and the "fix" that must not be applied

The solar panel service page says, in both locales, that we do **no
thermal-camera or output measurement** and no electrical work — inspecting,
repairing or replacing panels, the inverter, the cabling and the mountings needs
a solar installer. **That disclaimer is true, it is protective, it offers
nothing, and it stays exactly as written.** It is not to be softened, qualified
or "reconciled" with the inspection page.

The inspection page offers thermal imagery. **On a close reading the two do not
conflict** — the solar page refuses *measurement and electrical diagnosis*, the
inspection page supplies *pictures somebody else reads*. **A visitor does not do
a close reading.** Someone who meets an offer of thermal imagery on one page and
a refusal of thermal-camera work on another sees a contradiction, and that costs
more than the nuance saves.

**So the boundary is stated on the inspection side, where the offer is made,
rather than by touching the page that is already correct.** The distinction the
copy has to carry is *documentation versus measurement*, and it is carried in
the same paragraph as the offer so a reader cannot get one without the other.

**DO NOT ADD A CROSS-LINK FROM THE SOLAR PAGE TO THE INSPECTION PAGE.** This is
the obvious-looking tidy-up, it is why this subsection exists, and it is the one
change that would make the situation worse rather than better. **No thermal job
has been flown and no payload has been rented.** A link from a cleaning page
saying *"we do this over here"* advertises a service that has never been
performed — which is constraint 1 in this section, arriving through the back
door. The industrial page's link to `/inspektsioon` is not a precedent for it:
that link replaced a promise the page was *already making* and had nothing behind
it, whereas this one would create a new offer where the page currently makes
none.

**Revisit after the first thermal job has actually been flown**, at which point
the link is a statement about work done and is a fresh decision taken on the
evidence — not a gap somebody noticed in a governing document.

**Where the copy lives:** `src/i18n/inspection.ts`, with the same prohibitions
written at the top of the file beside the strings they govern — because a rule
in a governing document is read once and a rule beside the copy is read by
whoever is about to break it. That is the lesson section 9 paid for.

### What this decision deliberately did NOT do

- **There is no `/pesu`.** The cleaning card on the home page points at the
  existing services index. A second landing page for cleaning would duplicate
  `/teenused` and split its ranking.
- **No slug moved and no redirect exists.** Every `/teenused/*` and
  `/en/services/*` URL is exactly what it was.
- **Inspection is not a `serviceKey` and must not become one.** A seventh key
  would put it into the services grid, the price table and the collection-derived
  quote-form options, all of which describe cleaning work with a published per-m²
  price. It has one hand-added option in the quote form's `<select>` instead —
  one named exception, recorded in ARCHITECTURE section 6.
- **No FAQ entry, no `BeforeAfter`, no `Credentials` block on the page.** The
  first because the FAQ is cleaning copy; the second because a before/after pair
  is evidence of a job done and none have been; the third for the reason in
  constraint 3 above.

### The section 9 cross-reference rule was applied, and here is what it found

Section 9 requires that amending or narrowing a rule of this kind be preceded by
a search of `src/i18n/` and `src/content/` **in both locales, for the subject
rather than the wording**. That search was run for *ülevaatus, inspekt, kontroll,
inspection, survey* before anything was rewritten.

**It returned two findings that mattered, and they were resolved in opposite
directions — which is the part worth keeping.**

**One piece of copy had been made stale and was corrected at the source:** the
industrial service page, in both locales, said an inspection request was
*"different work and we answer it separately"* — a promise with nothing behind it
until 8 August 2026. It now names the separate answer and links to it, and it
repeats that no assessment is made there either, so the link cannot be read as
promising the report the paragraph above it refuses.

**One piece of copy was correct and was left untouched, with the reconciliation
written on the new page instead:** the solar panel page's refusal of
thermal-camera and output measurement. That is constraint 7 above, and the
asymmetry is deliberate — **when existing copy is true and protective, the new
page adapts to it, not the other way round.** A search that finds a conflict is
not automatically an instruction to edit what it found.

Everything else the search returned is unaffected and was deliberately left
alone; the phase report lists it. The two that look like matches and are not:
`Andmekaitse Inspektsioon` in the privacy policy is the regulator's name, and
*"pärast objekti ülevaatust"* on the pricing and facade pages means **looking a
property over before quoting a clean**, which is a different sense of the word
and remains true.
