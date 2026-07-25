# SPEC.md — LennuPesu website

**Version 1.0 · 25 July 2026**

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
