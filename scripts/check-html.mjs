/**
 * Static output checks. Part of `npm run verify`. Keep it dependency-free.
 *
 *  1. every internal href resolves to a built file
 *  2. every application/ld+json block parses AND is not an unevaluated template literal
 *  3. every page has exactly one <h1>, a <title> and a meta description
 *
 * Check 2 exists because a build can pass while emitting structured data as literal
 * text. It did, once. See the Phase 0 notes.
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
}

if (errors.length) {
  console.error(`check-html: ${errors.length} problem(s)`)
  for (const e of errors) console.error(`  ${e}`)
  process.exit(1)
}
console.log(`check-html: OK — ${files.length} page(s): links, JSON-LD, headings, meta`)
