/**
 * Content collection schemas. ARCHITECTURE section 5.
 *
 * THIS PATH IS DELIBERATE: `src/content.config.ts`, not `src/content/config.ts`,
 * which is the deprecated Astro 4 location and is silently ignored by Astro 7.
 *
 * Every collection declares a `loader`, and `z` comes from `astro/zod` rather
 * than `astro:content`. Both are Astro 6/7 requirements, not preferences.
 *
 * WHY `z.strictObject` AND NOT `z.object`, everywhere below:
 * `z.object` STRIPS an unknown key silently. A frontmatter field misspelled as
 * `ordr:` would drop out, and if the real field were optional the file would
 * validate and the page would render wrong. `strictObject` raises
 * `unrecognized_keys` and fails the build, which is what PLAN Phase 3 means by
 * "a bad frontmatter key must fail the build". Astro 7 ships Zod 4, so
 * `strictObject` is the current spelling of this; the deprecated `.strict()`
 * does the same thing and is not used.
 *
 * NO PRICE, PHONE NUMBER, EMAIL OR REGISTRY CODE IS DECLARED IN ANY SCHEMA
 * BELOW. `services` carries a `priceKind` — a REFERENCE that `ServiceCard`
 * resolves against `site.prices`. This is a deliberate departure from the field
 * list in ARCHITECTURE section 5, which named `priceFrom` and `priceUnit`: a
 * euro amount typed into a markdown file breaks the single-source rule in
 * CLAUDE.md, which overrides. ARCHITECTURE section 5 has been corrected to match.
 *
 * ENTRY IDS: the glob loader uses the frontmatter `slug` as the entry id when one
 * is present, so ids are flat — `katusepesu`, `roof-cleaning` — not `et/…`. That
 * is safe only because CLAUDE.md forbids sharing a slug across locales. If a slug
 * ever were shared, the two files would collide on one id and the build would
 * fail loudly, which is the outcome we want.
 *
 * KNOWN LIMIT: zod cannot see the file path, so a file sitting in `et/` that
 * declares `locale: en` validates. Phase 4 filters entries by `data.locale`, so
 * the effect is a visibly wrong-language page rather than a silent corruption.
 * The guard for it — comparing `entry.filePath` against `data.locale` — belongs
 * in Phase 4's `getStaticPaths`, where the entries are actually consumed.
 */
import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { locales } from './i18n/ui'
import { priceKinds, serviceKeys } from './i18n/home'

/**
 * Shared field shapes. Declared once so two collections cannot disagree about
 * what a slug or a locale is.
 */

/** Lowercase, digits and single hyphens. Catches `Katusepesu` and `katuse pesu`. */
const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be lowercase words joined by single hyphens')

/** The locale set comes from `i18n/ui.ts`. Adding Russian there covers content too. */
const locale = z.enum(locales)

const seo = {
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
}

/**
 * `services` — one markdown file per service per locale.
 *
 * `priceKind` is a reference, never an amount. `priceNote` is prose that
 * qualifies the price ("mõõdame objektil üle") and must never contain a figure —
 * that is a review matter, not something zod can check.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.strictObject({
    title: z.string().min(1),
    slug,
    locale,
    /** One or two sentences. Serves the service page and its meta description. */
    summary: z.string().min(1),
    priceKind: z.enum(priceKinds),
    priceNote: z.string().optional(),
    /** Display order within the services index. */
    order: z.number().int().positive(),
    icon: z.enum(serviceKeys),
    ...seo,
    /**
     * Which FAQ answers this service page repeats. Deliberately NOT a
     * `reference()`: there is no `faq` collection — the FAQ lives in
     * `i18n/home.ts` until Phase 5 builds `kkk.astro` and defines the id space.
     * Stays `[]` until then.
     */
    faqRefs: z.array(z.string()).default([]),
  }),
})

/**
 * `locations` — one per region we can honestly claim.
 *
 * The refine below turns CLAUDE.md's location-page rule into a build error: a
 * region page may exist only if it is a launch region or it has a real job
 * behind it. The word-count half of that rule stays a review matter.
 */
const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z
    .strictObject({
      name: z.string().min(1),
      slug,
      locale,
      intro: z.string().min(1),
      /** True for the two launch regions, Tallinn and Harjumaa. Nothing else. */
      isPrimary: z.boolean(),
      jobRefs: z.array(reference('jobs')).default([]),
      ...seo,
    })
    .refine((v) => v.isPrimary || v.jobRefs.length > 0, {
      message:
        'a location page needs at least one job in jobRefs unless it is a launch region (isPrimary)',
      path: ['jobRefs'],
    }),
})

/**
 * `jobs` — a completed job. The evidence layer, and locale-independent: a
 * photograph, an area and a town do not need translating.
 *
 * EMPTY AT LAUNCH, and that is the point. `BeforeAfter` renders its empty state
 * from this collection being empty, and CLAUDE.md forbids inventing an entry
 * here to fill a page.
 *
 * TODO(photos): the first real before/after pairs are expected after the first
 * jobs, ~September 2026 — PLAN Phase 10. This marker lives in the repo and never
 * on a page, so a future session does not mistake the empty state for unfinished
 * work.
 *
 * There is NO `id` field. ARCHITECTURE section 5 listed one, but the glob loader
 * derives the id from the file path; declaring it in frontmatter would collide
 * with the entry's own id, and `strictObject` rejects it. Corrected in the doc.
 */
const jobs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs' }),
  schema: ({ image }) =>
    z
      .strictObject({
        date: z.date(),
        town: z.string().min(1),
        service: z.enum(serviceKeys),
        areaM2: z.number().positive(),
        durationHours: z.number().positive(),
        /** Free text, e.g. "eterniit", "plekk-katus". Not an enum: the set is open. */
        roofType: z.string().min(1),
        /**
         * `image()`, not a string path, so the pair goes through Astro's `<Image>`:
         * WebP, intrinsic width and height, and therefore no layout shift, per
         * ARCHITECTURE section 7. Photos live beside the entry in
         * `src/content/jobs/photos/` and are referenced relatively
         * (`./photos/x.jpg`) — a path that does not resolve fails the build,
         * which a `public/` string could never do.
         */
        beforeImage: image(),
        afterImage: image(),
        /**
         * A site-relative path to our own file, matching the self-hosting
         * decision in SPEC section 9. The pattern is enforced because the
         * failure mode is someone pasting a YouTube link, and an embed means
         * client JavaScript and a third-party dependency — a closed decision.
         */
        videoUrl: z
          .string()
          .regex(/^\/video\/[\w-]+\.(mp4|webm)$/, 'must be a self-hosted file under /video/')
          .optional(),
        /**
         * A real quote from a real customer who has agreed to it, or absent.
         * CLAUDE.md forbids a placeholder here, in any form and however marked.
         */
        testimonial: z.string().optional(),
        testimonialAuthor: z.string().optional(),
        /** False until the customer has agreed the photos may be published. */
        published: z.boolean().default(false),
      })
      .refine((v) => Boolean(v.testimonial) === Boolean(v.testimonialAuthor), {
        message:
          'testimonial and testimonialAuthor go together — an unattributed review must not be published',
        path: ['testimonialAuthor'],
      }),
})

/**
 * `posts` — the blog. Empty at launch; the machine ships in Phase 8, the posts
 * follow when there is something real to say.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.strictObject({
      title: z.string().min(1),
      slug,
      locale,
      date: z.date(),
      excerpt: z.string().min(1),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      /** Defaults to true: a post is unfinished until it says otherwise. */
      draft: z.boolean().default(true),
    }),
})

export const collections = { services, locations, jobs, posts }
