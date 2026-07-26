/**
 * Static output checks. Part of `npm run verify`. Keep it dependency-free.
 *
 *  1. every internal href resolves to a built file
 *  2. every application/ld+json block parses AND is not an unevaluated template literal
 *  3. every page has exactly one <h1>, a <title> and a meta description
 *  4. no HTML comment survives into any built page
 *  5. no <form> posts to nowhere
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
 */
import { readdir, readFile } from 'node:fs/promises'
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

const files = await walk(DIST)
const errors = []

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
     invisible from the build. The URL is expected not to RESOLVE yet — the domain
     is unregistered — but it must be absolute and well formed. */
  for (const m of html.matchAll(/<input\b[^>]*\bname="_next"[^>]*>/gi)) {
    const value = /\bvalue="([^"]*)"/i.exec(m[0])?.[1]
    if (!value || !/^https:\/\/\S+$/.test(value) || /\bundefined\b/.test(value)) {
      errors.push(`${f}: _next must be an absolute https URL -> "${value ?? 'unset'}"`)
    }
  }
}

if (errors.length) {
  console.error(`check-html: ${errors.length} problem(s)`)
  for (const e of errors) console.error(`  ${e}`)
  process.exit(1)
}
console.log(
  `check-html: OK — ${files.length} page(s): links, JSON-LD, headings, meta, no comments, forms post somewhere`,
)
