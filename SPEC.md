# SPEC.md — Lendav Hollandlane website

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

**Tertiary — English-speaking property owners and commercial clients**, and groundwork for the future inspection/survey line.

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
- **No stock photography, no invented testimonials, no fabricated case studies.** See CLAUDE.md — this is a hard rule, not a preference.

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

The 500 KB budget was written before the hero video was decided, and it carves out photography but not video. **Decided: the budget stays binding on mobile, and hero video is inside it.** This costs nothing to honour, because the hero does not fetch video on a phone at all — see section 9. Lighthouse mobile is the measurement that matters, and it is the one a hero video most easily breaks. Desktop carries its own separate cap, also in section 9.

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

Russian translation · blog posts · additional regional pages backed by real jobs · a separate section or site for the inspection and survey line · case studies with named commercial clients · review widget pulling from the Google Business Profile.

## 9. Home page hero

**Decided.** The home page opens with a looped video of our own drone cleaning work — muted, autoplaying, `playsinline`, no controls, no sound. Directly beneath it, with nothing between, sits the price and credentials block: the published from-price excluding VAT, the Transpordiamet operational authorisation, the insurance, and that nobody walks on the roof.

This is the whole of section 3 items 1 and 2 in a single screen. The video answers "what is this" faster than a paragraph can; the block under it answers "what does it cost and can I trust them" before the visitor has scrolled.

**The footage does not exist yet, and what governs is the sequence, not a date.** The equipment is ordered; delivery follows roughly a week after that. The first flight is a **controlled job on family property, not a paying customer's roof**, flown as soon as the kit arrives. That flight produces the hero footage, a before/after pair, a measured job duration and the water-and-power answer. **The site launches after that flight, not before it.**

An earlier version of this section put the footage at "September 2026" and had the site launching without it. That was an assumption made in session one and never checked with the operator; it is recorded here so it is not reinstated. Express this as a sequence — dates rot, and this one already did.

**No design decision changes.** The footage does not exist *today*, so the hero must still be built so that the state with no footage is the *default* path, not a degraded one — the same principle already applied to `BeforeAfter` in ARCHITECTURE section 6. Building the empty path first is what stops a placeholder shipping to production.

**No stock footage.** Section 4 and CLAUDE.md forbid stock photography, and that applies identically to video. If the footage is not ours, it does not go on the page.

**Hosting — self-hosted in `public/video/`.** Not a video CDN. At this site's traffic the file is free to serve on the hosting plan we already have, with roughly two orders of magnitude of headroom. More importantly, what a video CDN sells — adaptive bitrate, a media library, a player — is of no use to a twelve-second silent loop, and its player is client JavaScript delivering HLS, which works against both the Lighthouse target above and the zero-JS rule. Revisit only if a real video library appears, meaning several job clips at Phase 10.

**Two states, and the NO-FOOTAGE state is the one that is built first.** `reference/direction-d.html` is the approved design direction and demonstrates both states on the same page.

- **NO-FOOTAGE — what the site renders today, and until the first flight.** A black, type-led hero: the headline, the sub, and the price and credentials block, carried by type and the tokens alone. **No media band, no poster, no placeholder.** Not a reserved empty band, not a grey box, not a blurred gradient standing in for a photograph, not the words "video coming soon" — the section simply has no media in it. This is the default path. It is built first and it must look finished, for two reasons: it is the state every preview build and every review renders in until the footage lands, and it is what launch falls back to if that footage slips or turns out unusable. A hero that looks broken without footage will ship looking broken.
- **FOOTAGE — what the same hero becomes.** It *gains* a media band above the price and credentials block. Within this state the media degrades video → poster still, under the two guards below.

The distinction matters for how it is built: this is a type-led hero that later gains a video, not a video hero with a hole in it. The no-footage state is not the bottom of a fallback chain — it is a finished design in its own right, and nothing about it is a placeholder awaiting an asset.

Detail in the Hero contract, ARCHITECTURE section 6.

**Mobile and `prefers-reduced-motion` — no video is fetched in either case.** A phone and a reduced-motion visitor both get the poster, or the image-free hero when there is no poster. Two independent guards enforce this, and both are built from the start rather than one held in reserve: a `media` gate on `<source>` that prevents the fetch, and a CSS rule that hides the video under `prefers-reduced-motion: reduce`. The guards cover different failure modes and neither is a substitute for the other.

**Budget.**

- **Mobile: zero bytes of video.** The 500 KB first-load budget in section 6 is binding, and the hero satisfies it by fetching no video at all.
- **Desktop: 2 MB maximum** for the hero video, counted as the single file the browser actually fetches, not the sum of the encodings offered.
- **Loop length: 12 seconds maximum.** Long enough to show the work, short enough to encode well under the cap and to loop without the seam becoming obvious.

A cut that cannot meet both caps is re-cut or re-encoded. It is not exempted.

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
