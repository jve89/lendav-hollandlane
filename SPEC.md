# SPEC.md — LennuPesu website

**Version 1.1 · 25 July 2026**

---

## 1. What this is

The marketing website for **LennuPesu**, the consumer-facing brand of AIF Drone Services OÜ: drone-based roof, facade and solar panel cleaning in Estonia.

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
- **No page per Estonian town.** Two real regional pages at launch. A new one is added only when a completed job in that town supplies genuine photos and content. Thin location pages are a ranking liability, not an asset.
- **No blog posts at launch.** The infrastructure ships; the posts wait until there is something real to say.
- **No Russian at launch.** The routing and content model must make Russian a translation drop, not a refactor.
- **No customer login, no CRM, no dashboard.**
- **No stock photography, no invented testimonials, no fabricated case studies.** See CLAUDE.md — this is a hard rule, not a preference.

## 5. Non-negotiable content constraints

- Every price shown is **excluding VAT**, and says so. Estonian VAT is 24%.
- We do **not** claim to be the first or only drone cleaning operator in Estonia. Droonipesu OÜ (trading as Pesutech) already operates nationwide. Our differentiators are published pricing, the documented SORA SAIL II operational authorisation, and insurance — all of which are verifiable claims.
- Regulatory claims must be exact: operational authorisation from the Estonian Transport Administration (Transpordiamet) for specific-category operations under SORA, SAIL II; third-party liability insurance under Regulation (EC) 785/2004.
- Any statement about cleaning products must name the actual product and its Estonian biocide authorisation. Until that is confirmed, the page carries a visible TODO marker and ships blank rather than vague.
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

**The footage does not exist yet.** There is no video and no photography until the first jobs, expected September 2026. The hero must therefore be built so that the state with no footage is the *default* path, not a degraded one — the same principle already applied to `BeforeAfter` in ARCHITECTURE section 6. Building the empty path first is what stops a placeholder shipping to production.

**No stock footage.** Section 4 and CLAUDE.md forbid stock photography, and that applies identically to video. If the footage is not ours, it does not go on the page.

**Hosting — self-hosted in `public/video/`.** Not a video CDN. At this site's traffic the file is free to serve on the hosting plan we already have, with roughly two orders of magnitude of headroom. More importantly, what a video CDN sells — adaptive bitrate, a media library, a player — is of no use to a twelve-second silent loop, and its player is client JavaScript delivering HLS, which works against both the Lighthouse target above and the zero-JS rule. Revisit only if a real video library appears, meaning several job clips at Phase 10.

**Two states, and the NO-FOOTAGE state is what ships.** `reference/direction-d.html` is the approved design direction and demonstrates both states on the same page.

- **NO-FOOTAGE — what launches, and what the site lives on until the footage exists.** A black, type-led hero: the headline, the sub, and the price and credentials block, carried by type and the tokens alone. **No media band, no poster, no placeholder.** Not a reserved empty band, not a grey box, not a blurred gradient standing in for a photograph, not the words "video coming soon" — the section simply has no media in it. This is the default path. It is built first and it must look finished, because it is what the site launches with and may run on for months.
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
