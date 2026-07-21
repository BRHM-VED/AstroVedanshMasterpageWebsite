import { useEffect, useState } from 'react'
import { useSEO } from '../lib/seo.js'
import { PageHero } from '../components/Section.jsx'
import { panchang as localPanchang, RASHIS } from '../lib/astro.js'
import { fetchPanchang } from '../lib/astroApi.js'
import { Link } from 'react-router-dom'

const CITIES = [
  { name: 'New Delhi', lat: 28.6139, lon: 77.209 },
  { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
  { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'Hyderabad', lat: 17.385, lon: 78.4867 },
  { name: 'Pune', lat: 18.5204, lon: 73.8567 },
  { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
]

const timeIST = (iso) =>
  new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })

function normaliseApi(data) {
  const p = data.panchang
  const sunSid = data.sun_moon?.sun_sidereal_longitude
  const moonSid = data.sun_moon?.moon_sidereal_longitude
  const rahu = data.muhurtas?.rahu_kaal
  return {
    vara: p.vara,
    tithi: p.tithi.name,
    paksha: `${p.paksha} Paksha`,
    nakshatra: `${p.nakshatra.name} (Pada ${p.nakshatra.pada})`,
    yoga: p.yoga.name,
    karana: p.karana.name,
    moonRashi: typeof moonSid === 'number' ? RASHIS[Math.floor(moonSid / 30)] : '—',
    sunRashi: typeof sunSid === 'number' ? RASHIS[Math.floor(sunSid / 30)] : '—',
    rahuKaal: rahu ? `${timeIST(rahu.start)} – ${timeIST(rahu.end)}` : '—',
    source: 'live',
  }
}

function normaliseLocal(date) {
  const p = localPanchang(new Date(date + 'T06:00:00+05:30'))
  return { ...p, source: 'local' }
}

export default function Panchang() {
  useSEO({
    title: "Today's Panchang — Tithi, Nakshatra, Yoga, Karana & Rahu Kaal",
    description: 'Free Vedic panchang for any date and city: tithi, paksha, nakshatra, yoga, karana, vara, moon rashi and rahu kaal, computed with the Swiss Ephemeris.',
    path: '/panchang',
  })
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [city, setCity] = useState(CITIES[0].name)
  const [data, setData] = useState(() => normaliseLocal(new Date().toISOString().slice(0, 10)))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    const [year, month, day] = date.split('-').map(Number)
    const loc = CITIES.find((c) => c.name === city) || CITIES[0]
    fetchPanchang({ year, month, day, latitude: loc.lat, longitude: loc.lon })
      .then((res) => {
        if (alive) setData(normaliseApi(res))
      })
      .catch(() => {
        if (alive) setData(normaliseLocal(date))
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [date, city])

  const pretty = new Date(date + 'T06:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const rows = [
    ['Vara (Day)', data.vara],
    ['Tithi', `${data.tithi} — ${data.paksha}`],
    ['Nakshatra', data.nakshatra],
    ['Yoga', data.yoga],
    ['Karana', data.karana],
    ['Moon Rashi', data.moonRashi],
    ['Sun Rashi', data.sunRashi],
    ['Rahu Kaal', data.rahuKaal],
  ]

  return (
    <>
      <PageHero eyebrow="Vedic Almanac" title="Panchang" sub="The five limbs of time — tithi, nakshatra, yoga, karana and vara — for any date and city." />
      <section className="section-pad">
        <div className="container-av max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <label className="font-heading font-semibold text-maroon-900">Date:</label>
            <input type="date" className="input-av !w-auto" value={date} onChange={(e) => setDate(e.target.value)} />
            <label className="font-heading font-semibold text-maroon-900">City:</label>
            <select className="input-av !w-auto" value={city} onChange={(e) => setCity(e.target.value)}>
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className={`overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-lg transition-opacity ${loading ? 'opacity-60' : ''}`}>
            <div className="bg-maroon-800 px-6 py-5 text-center">
              <h2 className="font-display text-2xl text-cream-100">{pretty} · {city}</h2>
              <p className="text-xs text-cream-100/70">
                {data.source === 'live' ? 'Computed with the Swiss Ephemeris' : 'Simplified panchang (live engine unavailable)'}
              </p>
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
            {data.source === 'live'
              ? 'Rahu Kaal and rashi are computed for the selected city\'s coordinates.'
              : 'Values are computed with simplified formulas and can differ slightly near tithi/nakshatra boundaries.'}{' '}
            For muhurta decisions, <Link to="/consultation" className="font-bold text-maroon-700 underline">consult us</Link> for an exact reading.
          </p>
        </div>
      </section>
    </>
  )
}
