import { useState } from 'react'
import { useSEO } from '../lib/seo.js'
import { PageHero } from '../components/Section.jsx'
import { panchang } from '../lib/astro.js'
import { Link } from 'react-router-dom'

export default function Panchang() {
  useSEO({
    title: "Today's Panchang — Tithi, Nakshatra, Yoga, Karana & Rahu Kaal",
    description: 'Free Vedic panchang for any date: tithi, paksha, nakshatra, yoga, karana, vara, moon rashi and rahu kaal, calculated instantly.',
    path: '/panchang',
  })
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const p = panchang(new Date(date + 'T06:00:00+05:30'))
  const pretty = new Date(date + 'T06:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const rows = [
    ['Vara (Day)', p.vara],
    ['Tithi', `${p.tithi} — ${p.paksha}`],
    ['Nakshatra', p.nakshatra],
    ['Yoga', p.yoga],
    ['Karana', p.karana],
    ['Moon Rashi', p.moonRashi],
    ['Sun Rashi', p.sunRashi],
    ['Rahu Kaal (approx)', p.rahuKaal],
  ]
  return (
    <>
      <PageHero eyebrow="Vedic Almanac" title="Panchang" sub="The five limbs of time — tithi, nakshatra, yoga, karana and vara — for any date." />
      <section className="section-pad">
        <div className="container-av max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <label className="font-heading font-semibold text-maroon-900">Choose date:</label>
            <input type="date" className="input-av !w-auto" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-lg">
            <div className="bg-maroon-800 px-6 py-5 text-center">
              <h2 className="font-display text-2xl text-cream-100">{pretty}</h2>
              <p className="text-xs text-cream-100/70">Calculated for sunrise, IST · Simplified panchang</p>
            </div>
            <dl>
              {rows.map(([k, v], i) => (
                <div key={k} className={`flex items-center justify-between px-6 py-4 ${i % 2 ? 'bg-cream-50' : 'bg-white'}`}>
                  <dt className="font-heading text-sm font-bold text-maroon-700">{k}</dt>
                  <dd className="text-sm font-medium text-maroon-950/85">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-6 text-center text-xs text-maroon-950/50">
            Values are computed with simplified formulas and can differ slightly near tithi/nakshatra boundaries.
            For muhurta decisions, <Link to="/consultation" className="font-bold text-maroon-700 underline">consult us</Link> for an exact reading.
          </p>
        </div>
      </section>
    </>
  )
}
