import { PageHero } from '../components/Section.jsx'
import { useSEO } from '../lib/seo.js'
import { Glyph } from '../components/Decor.jsx'
import { SIGNS, HOROSCOPE_FALLBACK } from '../data/content.js'
import { useApi } from '../lib/api.js'
import { Link } from 'react-router-dom'

export default function DailyHoroscope() {
  useSEO({
    title: 'Daily Horoscope — All 12 Rashis (Aries to Pisces)',
    description: "Today's horoscope for Mesh to Meen by AstroVedansh. Honest daily guidance for love, career, money and health for all 12 zodiac signs.",
    path: '/horoscope/daily',
  })
  const { data } = useApi('/horoscopes?period=daily', null)
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const textFor = (id) => {
    const row = Array.isArray(data) ? data.find((h) => h.sign === id) : null
    return row?.content || HOROSCOPE_FALLBACK[id]
  }
  return (
    <>
      <PageHero eyebrow={today} title="Daily Horoscope" sub="Guidance for all 12 rashis — read yours by moon sign for best accuracy." />
      <section className="section-pad">
        <div className="container-av grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((s) => (
            <article key={s.id} id={s.id} className="card scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-cream-100 text-2xl text-maroon-700">
                  <Glyph symbol={s.symbol} />
                </span>
                <div>
                  <h2 className="font-display text-2xl text-maroon-900">{s.name} <span className="text-base text-maroon-950/50">({s.hindi})</span></h2>
                  <p className="text-xs text-maroon-950/50">{s.dates}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-maroon-950/75">{textFor(s.id)}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-gold-500/40 bg-cream-100 p-8 text-center md:p-10">
          <p className="font-heading text-sm font-semibold text-maroon-950/70">
            This is general guidance. For personal timing based on your kundli, ask your question.
          </p>
          <a href="https://perfect-timing.astrovedansh.com/" className="btn-primary mt-5">
            Get Perfect Timing Report
          </a>
          <p className="mt-3 text-xs text-maroon-950/50">3-page answer · analysis · timing window · remedies</p>
        </div>
      </section>
    </>
  )
}
