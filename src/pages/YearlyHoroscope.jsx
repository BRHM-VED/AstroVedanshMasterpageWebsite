import { PageHero } from '../components/Section.jsx'
import { Glyph } from '../components/Decor.jsx'
import { SIGNS, YEARLY_FALLBACK } from '../data/content.js'
import { useApi } from '../lib/api.js'
import { Link } from 'react-router-dom'

export default function YearlyHoroscope() {
  const { data } = useApi('/horoscopes?period=yearly', null)
  const textFor = (id) => {
    const row = Array.isArray(data) ? data.find((h) => h.sign === id) : null
    return row?.content || YEARLY_FALLBACK[id]
  }
  return (
    <>
      <PageHero
        eyebrow="Varshik Rashifal"
        title="Horoscope 2026"
        sub="Your year at a glance — Mesh to Meen. For month-by-month timing, book a personal varshaphal reading."
      />
      <section className="section-pad">
        <div className="container-av space-y-5">
          {SIGNS.map((s) => (
            <article key={s.id} className="card flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex shrink-0 items-center gap-3 sm:w-52">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-cream-100 text-2xl text-maroon-700">
                  <Glyph symbol={s.symbol} />
                </span>
                <div>
                  <h2 className="font-display text-2xl text-maroon-900">{s.name}</h2>
                  <p className="text-xs text-maroon-950/50">{s.hindi} · {s.dates}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-maroon-950/75">{textFor(s.id)}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/consultation" className="btn-primary">Get Your Personal 2026 Reading</Link>
        </div>
      </section>
    </>
  )
}
