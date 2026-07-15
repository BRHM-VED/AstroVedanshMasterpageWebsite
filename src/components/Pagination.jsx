import { Link } from 'react-router-dom'

/**
 * Google-friendly pagination: every page is a real URL rendered as a plain
 * anchor (crawlable without JS execution), the current page is marked with
 * aria-current, and page 1 keeps the clean base path (no ?page=1 duplicate).
 */
export default function Pagination({ page, totalPages, basePath }) {
  if (totalPages <= 1) return null
  const sep = basePath.includes('?') ? '&' : '?'
  const url = (p) => (p === 1 ? basePath : `${basePath}${sep}page=${p}`)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const base =
    'flex h-10 min-w-10 items-center justify-center rounded-full px-3 font-heading text-sm font-bold transition'
  const idle = `${base} border border-maroon-100 bg-white text-maroon-900 hover:border-gold-500/60 hover:text-maroon-700`
  const current = `${base} bg-maroon-700 text-cream-100`

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link rel="prev" to={url(page - 1)} className={idle} aria-label="Previous page">
          ← Prev
        </Link>
      )}
      {pages.map((p) =>
        p === page ? (
          <span key={p} aria-current="page" className={current}>
            {p}
          </span>
        ) : (
          <Link key={p} to={url(p)} className={idle} aria-label={`Page ${p}`}>
            {p}
          </Link>
        ),
      )}
      {page < totalPages && (
        <Link rel="next" to={url(page + 1)} className={idle} aria-label="Next page">
          Next →
        </Link>
      )}
    </nav>
  )
}

/** Clamp a raw ?page= value into the valid range. */
export function usePage(searchParams, totalPages) {
  const raw = Number.parseInt(searchParams.get('page') || '1', 10)
  if (!Number.isFinite(raw) || raw < 1) return 1
  return Math.min(raw, Math.max(totalPages, 1))
}
