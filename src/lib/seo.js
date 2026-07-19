import { useEffect } from 'react'

const SITE_URL = 'https://astrovedansh.org'
const SITE_NAME = 'AstroVedansh'
// 1200×630 — the size Discover, Open Graph and Twitter cards expect.
const DEFAULT_IMAGE = `${SITE_URL}/assets/blog/default.png`

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

/**
 * Per-page SEO: title, description, canonical, Open Graph/Twitter tags and
 * optional JSON-LD blocks. Works client-side; index.html carries the global
 * Organization/WebSite JSON-LD so crawlers that skip JS still get the basics.
 */
export function useSEO({ title, description, path = '/', type = 'website', image = null, jsonLd = null, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Astrologer · Numerologist · Life Counsellor`
    const url = SITE_URL + path
    // Discover/social crawlers want a large (≥1200px) image per page, not one
    // shared default — pages can pass their own via `image`.
    const resolvedImage = image ? (image.startsWith('http') ? image : SITE_URL + image) : DEFAULT_IMAGE

    document.title = fullTitle
    setMeta('name', 'description', description)
    setCanonical(url)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')

    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', resolvedImage)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:locale', 'en_IN')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', resolvedImage)

    // Page-scoped JSON-LD (global Organization lives in index.html)
    document.querySelectorAll('script[data-seo="page"]').forEach((s) => s.remove())
    const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
    blocks.forEach((block) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seo = 'page'
      s.textContent = JSON.stringify(block)
      document.head.appendChild(s)
    })
  }, [title, description, path, type, image, noindex, JSON.stringify(jsonLd)]) // eslint-disable-line react-hooks/exhaustive-deps
}

export function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: SITE_URL + path,
    })),
  }
}

export { SITE_URL }
