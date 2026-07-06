import { Link } from 'react-router-dom'
import { PageHero } from '../components/Section.jsx'
import { POSTS } from '../data/content.js'
import { useApi } from '../lib/api.js'

export default function Blog() {
  const { data: posts } = useApi('/posts', POSTS)
  return (
    <>
      <PageHero
        eyebrow="Simplifying Astrology for Everyone"
        title="The AstroVedansh Blog"
        sub="Plain-language guides on astrology, numerology, panchang and remedies — no superstition, no scare tactics."
      />
      <section className="section-pad">
        <div className="container-av grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="card flex flex-col">
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-gold-600">{p.category}</p>
              <h2 className="mt-2 font-heading text-lg font-bold leading-snug text-maroon-900">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-maroon-950/70">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-maroon-950/50">{new Date(p.date || p.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="font-heading text-sm font-bold text-maroon-700">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
