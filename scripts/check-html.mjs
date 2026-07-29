/**
 * Static output checks. Part of `npm run verify`. Keep it dependency-free.
 *
 *  1. every internal href resolves to a built file
 *  2. every application/ld+json block parses AND is not an unevaluated template literal
 *  3. every page has exactly one <h1>, a <title> and a meta description
 *  4. no HTML comment survives into any built page
 *  5. no <form> posts to nowhere
 *  6. the sitemap lists every indexable page, with the same hreflang set the page carries
 *  7. no file under public/video/ exceeds the 1.5 MB hero video cap
 *
 * Check 2 exists because a build can pass while emitting structured data as literal
 * text. It did, once. See the Phase 0 notes.
 *
 * Check 4 exists because every `<!-- unconfirmed: ... -->` and
 * `<!-- needs-native-review -->` marker written into a markdown content file in
 * Phase 4 shipped to production — 37 of them, internal English engineering notes on
 * Estonian customer pages. The markers are a repo convention (CLAUDE.md) and belong
 * in the repo only. This guards the whole class rather than the words in use today,
 * so the next convention marker cannot leak the same way.
 *
 * Check 5 exists because `import.meta.env` is inlined at build time: a deploy host
 * with no `PUBLIC_FORMSPREE_ID` set would emit a contact form whose `action` is
 * empty or `undefined`, and every other check here would pass. A contact page that
 * looks right and silently drops every enquiry is the worst failure this site can
 * have — it is invisible until someone asks why nobody is calling.
 *
 * `astro.config.mjs` declares that variable required in `env.schema`, which fails
 * the build first. This is the SECOND, INDEPENDENT guard, and it is not redundant:
 * it asserts on the built artefact rather than on the config, so it still fires if
 * a future session deletes the schema entry, swaps the form provider, or breaks the
 * action some other way. It guards the class — a form that posts nowhere — not the
 * name of one environment variable, which is the same reasoning that made check 4
 * catch every comment rather than the word `unconfirmed`.
 *
 * Check 6 exists because the sitemap shipped for four phases with the hreflang
 * alternates missing from TWENTY OF ITS TWENTY-TWO URLS, and nothing noticed. The
 * integration's `i18n` option pairs URLs by stripping the locale prefix and matching
 * the rest of the path, which cannot work on localised slugs — and its failure mode
 * is silence, not an error. `astro.config.mjs` now lifts each page's alternate set
 * out of its own built `<head>`; this asserts on the finished XML that it did.
 *
 * The page's own `<link rel="canonical">` is used as its identity, because BaseLayout
 * builds the canonical and the self-referencing alternate from the same array — so if
 * this check can find the page in the sitemap at all, those two already agree.
 *
 * Check 7 exists because PLAN Phase 10 caps the hero video at 1.5 MB and that cap is
 * the one hero constraint a machine can actually check. The rest of the list — 8–12
 * seconds, no audio track, a scrimmed background loop — is a judgement about footage;
 * a byte count is not. The CSS `@supports` gap is documented as a manual step for
 * exactly the opposite reason, so where a guard CAN be mechanical it should be one
 * rather than a paragraph somebody is trusted to have read.
 *
 * It reads `public/video/`, NOT `dist/video/`, and that is deliberate. `public/` is
 * what the repository commits and it cannot silently pass: if Astro's static-copy
 * behaviour ever changed, or the directory were excluded, a check reading `dist/`
 * would report success on a file it never saw. That is the silent-pass failure class
 * checks 4, 5 and 6 all exist to prevent, and this file should not reintroduce it.
 * The directory being absent is not an error — that is the no-footage state, which
 * SPEC section 9 says is a finished design rather than a missing asset.
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname } from 'node:path'

const DIST = 'dist'

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (extname(e.name) === '.html') out.push(p)
  }
  return out
}

function resolves(href) {
  const clean = href.split('#')[0].split('?')[0]
  if (!clean || clean === '/') return existsSync(join(DIST, 'index.html'))
  const base = join(DIST, clean)
  return existsSync(base) || existsSync(base + '.html') || existsSync(join(base, 'index.html'))
}

/**
 * Blank out <pre> and <code> regions, preserving length so offsets stay true.
 *
 * A post that *displays* HTML source must not fail check 4 for the markup it is
 * teaching. Phase 8 is blog infrastructure and the planned posts are technical, so
 * this is a real case rather than a hypothetical one. Everything outside these two
 * elements is markup, not content, and a comment there is a leak.
 */
function maskCodeRegions(html) {
  return html.replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, (m) => ' '.repeat(m.length))
}

/** A one-line, 80-character excerpt of a comment, for the error message. */
function excerpt(text) {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length > 80 ? `${flat.slice(0, 80)}…` : flat
}

if (!existsSync(DIST)) {
  console.error('check-html: dist/ not found. Run `npm run build` first.')
  process.exit(1)
}

/** `{ 'et-EE': 'https://…', … }` -> a stable string, so two sets compare by value. */
const fingerprint = (alts) =>
  Object.entries(alts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([lang, href]) => `${lang}=${href}`)
    .join(' ')

/** Every `<link rel="alternate" hreflang=… href=…>` in a page's head, as lang -> href. */
function headAlternates(html) {
  const alts = {}
  for (const tag of html.matchAll(/<link\b[^>]*\brel="alternate"[^>]*>/gi)) {
    const lang = /\bhreflang="([^"]+)"/i.exec(tag[0])?.[1]
    const href = /\bhref="([^"]+)"/i.exec(tag[0])?.[1]
    if (lang && href) alts[lang] = href
  }
  return alts
}

const files = await walk(DIST)
const errors = []
/** Collected during the walk; check 6 compares them against the sitemap afterwards. */
const pages = []

for (const f of files) {
  const html = await readFile(f, 'utf8')

  // 1. internal links
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1]
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue
    if (!href.startsWith('/')) continue
    if (!resolves(href)) errors.push(`${f}: broken internal link -> ${href}`)
  }

  // 2. structured data actually rendered and parseable
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  if (!blocks.length) errors.push(`${f}: no JSON-LD block`)
  for (const b of blocks) {
    const raw = b[1].trim()
    if (raw.includes('JSON.stringify') || raw.includes('{{') || raw.startsWith('{JSON')) {
      errors.push(`${f}: JSON-LD emitted as an unevaluated template, not data`)
      continue
    }
    try { JSON.parse(raw) } catch { errors.push(`${f}: JSON-LD does not parse`) }
  }
  if (/<set:html>/.test(html)) errors.push(`${f}: literal <set:html> tag leaked into output`)

  // 3. basic head and heading hygiene
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length
  if (h1s !== 1) errors.push(`${f}: expected exactly one <h1>, found ${h1s}`)
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${f}: missing or empty <title>`)
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${f}: missing meta description`)

  // 4. no HTML comment in the markup
  const markup = maskCodeRegions(html)
  for (const c of markup.matchAll(/<!--([\s\S]*?)-->/g)) {
    errors.push(`${f}: HTML comment in output -> <!-- ${excerpt(c[1])} -->`)
  }
  if (/<!--(?![\s\S]*?-->)/.test(markup)) {
    errors.push(`${f}: unterminated HTML comment in output`)
  }

  // 5. no form posts to nowhere
  for (const m of html.matchAll(/<form\b([^>]*)>/gi)) {
    const attrs = m[1]
    const action = /\baction="([^"]*)"/i.exec(attrs)?.[1]
    const method = /\bmethod="([^"]*)"/i.exec(attrs)?.[1]

    if (!action) {
      errors.push(`${f}: <form> has no action — it would post to this page`)
    } else if (!/^https:\/\/\S+$/.test(action) || /\bundefined\b|\bnull\b/.test(action)) {
      errors.push(`${f}: <form> action is not a usable absolute https URL -> "${action}"`)
    }

    if (!method || method.toLowerCase() !== 'post') {
      errors.push(`${f}: <form> method is "${method ?? 'unset'}", expected POST`)
    }
  }

  /* Formspree rejects a relative `_next`, and a redirect that silently fails is
     invisible from the build. This asserts that the URL is absolute and well
     formed, which is all a build can know — whether it resolves is not a
     question for this check, and never was. */
  for (const m of html.matchAll(/<input\b[^>]*\bname="_next"[^>]*>/gi)) {
    const value = /\bvalue="([^"]*)"/i.exec(m[0])?.[1]
    if (!value || !/^https:\/\/\S+$/.test(value) || /\bundefined\b/.test(value)) {
      errors.push(`${f}: _next must be an absolute https URL -> "${value ?? 'unset'}"`)
    }
  }

  // 6a. gather what the page says about itself, for the sitemap comparison below
  const canonical = /<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/i.exec(html)?.[1]
  if (!canonical) errors.push(`${f}: no canonical URL`)
  else {
    pages.push({
      file: f,
      canonical,
      noindex: /<meta\b[^>]*\bname="robots"[^>]*\bcontent="[^"]*noindex/i.test(html),
      alternates: headAlternates(html),
    })
  }
}

/*
 * 6. the sitemap agrees with the pages
 *
 * Two directions, and both matter. An indexable page missing from the sitemap is
 * not submitted; a noindexed page present in it tells a crawler two contradictory
 * things about the same URL. The alternate sets are compared by value rather than
 * merely counted, because the failure being guarded against — twenty pages with an
 * EMPTY set — would pass any check that only asked whether the entry existed.
 */
const SITEMAP = join(DIST, 'sitemap-0.xml')

if (!existsSync(SITEMAP)) {
  errors.push(`${SITEMAP}: not found — the sitemap integration did not run`)
} else {
  const xml = await readFile(SITEMAP, 'utf8')
  const listed = new Map()

  for (const entry of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(entry[1])?.[1]
    if (!loc) continue
    const alts = {}
    for (const link of entry[1].matchAll(/<xhtml:link\b[^>]*\/>/g)) {
      const lang = /\bhreflang="([^"]+)"/.exec(link[0])?.[1]
      const href = /\bhref="([^"]+)"/.exec(link[0])?.[1]
      if (lang && href) alts[lang] = href
    }
    listed.set(loc, alts)
  }

  for (const page of pages) {
    const inSitemap = listed.has(page.canonical)

    if (page.noindex) {
      if (inSitemap) {
        errors.push(
          `${page.file}: noindex page is listed in the sitemap -> ${page.canonical}`,
        )
      }
      continue
    }

    if (!inSitemap) {
      errors.push(`${page.file}: indexable page missing from the sitemap -> ${page.canonical}`)
      continue
    }

    const want = fingerprint(page.alternates)
    const got = fingerprint(listed.get(page.canonical))
    if (want !== got) {
      errors.push(
        `${page.file}: sitemap hreflang set disagrees with the page's own <head>\n` +
          `      head:    ${want || '(none)'}\n` +
          `      sitemap: ${got || '(none)'}`,
      )
    }
  }
}

/*
 * 7. the hero video is inside its budget
 *
 * PLAN Phase 10 caps it at 1.5 MB, which is TIGHTER than SPEC section 9's 2 MB and
 * deliberately so — the SPEC ceiling is not a licence to spend up to it. Footage that
 * cannot meet the cap is re-cut or re-encoded, never exempted, so this check does not
 * take an override and must not be given one.
 */
const VIDEO_DIR = join('public', 'video')
const VIDEO_MAX_BYTES = Math.round(1.5 * 1024 * 1024)

/** Every file under a directory, recursively. Absent directory -> no files. */
async function filesUnder(dir) {
  if (!existsSync(dir)) return []
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await filesUnder(p)))
    else if (e.isFile()) out.push(p)
  }
  return out
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

const videoFiles = await filesUnder(VIDEO_DIR)
for (const f of videoFiles) {
  const { size } = await stat(f)
  if (size > VIDEO_MAX_BYTES) {
    /* The byte counts are printed as well as the megabytes because a file one
       byte over the cap rounds to "1.50 MB exceeds the 1.50 MB cap", which reads
       like a bug in the check rather than a file to re-encode. */
    errors.push(
      `${f}: ${mb(size)} exceeds the ${mb(VIDEO_MAX_BYTES)} hero video cap (PLAN Phase 10) ` +
        `by ${(size - VIDEO_MAX_BYTES).toLocaleString('en-US')} bytes ` +
        `(${size.toLocaleString('en-US')} of ${VIDEO_MAX_BYTES.toLocaleString('en-US')}).\n` +
        `      Re-cut or re-encode it. Do not raise the cap — the budget is the constraint, ` +
        `not the footage.`,
    )
  }
}

if (errors.length) {
  console.error(`check-html: ${errors.length} problem(s)`)
  for (const e of errors) console.error(`  ${e}`)
  process.exit(1)
}
console.log(
  `check-html: OK — ${files.length} page(s): links, JSON-LD, headings, meta, no comments, ` +
    `forms post somewhere, sitemap hreflang matches every page; ` +
    `${videoFiles.length} video file(s) under ${mb(VIDEO_MAX_BYTES)}`,
)
