import { useState } from 'react'
import { useSEO } from '../lib/seo.js'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/Section.jsx'
import { Icon } from '../components/Decor.jsx'
import { kundliSnapshot } from '../lib/astro.js'
import { mulank, bhagyank, meaning } from '../lib/numerology.js'
import { geocode, fetchRashi } from '../lib/astroApi.js'

export default function KundliCalculator() {
  useSEO({
    title: 'Free Kundli Calculator — Moon Sign, Nakshatra & Birth Tithi',
    description: 'Instant free Vedic kundli snapshot: moon rashi, sun rashi, nakshatra with pada, birth tithi, mulank and bhagyank. No signup needed.',
    path: '/free-kundli-calculator',
  })
  const [form, setForm] = useState({ name: '', date: '', time: '12:00', place: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function calculate(e) {
    e.preventDefault()
    const dob = new Date(`${form.date}T${form.time || '12:00'}:00+05:30`)
    if (Number.isNaN(dob.getTime())) return
    setLoading(true)

    const base = { mulank: mulank(dob), bhagyank: bhagyank(dob), name: form.name }

    if (form.place.trim()) {
      try {
        const loc = await geocode(form.place.trim())
        const [hour, minute] = (form.time || '12:00').split(':').map(Number)
        const rashi = await fetchRashi({
          name: form.name || 'Unknown',
          birth_year: dob.getFullYear(),
          birth_month: dob.getMonth() + 1,
          birth_day: dob.getDate(),
          birth_hour: hour,
          birth_minute: minute,
          latitude: loc.latitude,
          longitude: loc.longitude,
          timezone: loc.timezone || 'Asia/Kolkata',
        })
        setResult({ ...base, live: rashi, place: loc.display_name || form.place })
        setLoading(false)
        return
      } catch {
        // fall through to the local, place-independent snapshot below
      }
    }

    setResult({ ...base, snapshot: kundliSnapshot(dob) })
    setLoading(false)
  }

  return (
    <>
      <PageHero
        eyebrow="100% Free Tool"
        title="Free Kundli Calculator"
        sub="Enter your birth details for an instant Vedic snapshot — moon rashi, nakshatra, birth tithi and your core numerology numbers."
      />
      <section className="section-pad">
        <div className="container-av grid items-start gap-10 lg:grid-cols-2">
          <form onSubmit={calculate} className="rounded-3xl border border-maroon-100 bg-white p-8 shadow-lg">
            <h2 className="font-display text-3xl text-maroon-900">Your Birth Details</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="label-av">Full Name</label>
                <input className="input-av" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-av">Date of Birth *</label>
                  <input required type="date" className="input-av" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div>
                  <label className="label-av">Time of Birth (IST)</label>
                  <input type="time" className="input-av" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label-av">Place of Birth</label>
                <input className="input-av" placeholder="City, e.g. Jaipur (optional, sharpens accuracy)" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
              </div>
              <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
                {loading ? 'Calculating…' : 'Generate My Free Kundli Snapshot'}
              </button>
              <p className="text-center text-xs text-maroon-950/50">
                Instant calculation — nothing is stored.
              </p>
            </div>
          </form>
          <div>
            {result ? (
              <div className="rounded-3xl bg-maroon-800 p-8 text-cream-100 shadow-xl">
                <h2 className="font-display text-3xl text-gold-400">
                  {result.name ? `${result.name}'s` : 'Your'} Vedic Snapshot
                </h2>
                {result.place && <p className="mt-1 text-xs text-cream-100/60">Calculated for {result.place}</p>}
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  {(result.live
                    ? [
                        ['Moon Rashi', `${result.live.rashi} · ${result.live.hindiName}`],
                        ['Rashi Lord', result.live.rashiLord],
                        ['Nakshatra', `${result.live.nakshatra} (Pada ${result.live.nakshatraPada})`],
                        ['Nakshatra Lord', result.live.nakshatraLord],
                        ['Mulank (Root No.)', result.mulank],
                        ['Bhagyank (Destiny No.)', result.bhagyank],
                      ]
                    : [
                        ['Moon Rashi', result.snapshot.moonRashi],
                        ['Sun Rashi', result.snapshot.sunRashi],
                        ['Nakshatra', `${result.snapshot.nakshatra} (Pada ${result.snapshot.pada})`],
                        ['Birth Tithi', result.snapshot.tithi],
                        ['Mulank (Root No.)', result.mulank],
                        ['Bhagyank (Destiny No.)', result.bhagyank],
                      ]
                  ).map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-maroon-700/60 p-4">
                      <dt className="font-heading text-xs font-bold uppercase tracking-wider text-gold-400">{k}</dt>
                      <dd className="mt-1 font-heading text-lg font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 rounded-xl bg-maroon-950/40 p-4 text-sm leading-relaxed">
                  {result.live ? (
                    <p><strong className="text-gold-400">Your Moon Sign says:</strong> {result.live.traitsEnglish}</p>
                  ) : (
                    <p><strong className="text-gold-400">Your Destiny Number says:</strong> {meaning(result.bhagyank)}</p>
                  )}
                </div>
                <p className="mt-4 text-xs text-cream-100/60">
                  {result.live
                    ? 'Moon sign and nakshatra are calculated for your exact birth place with the Swiss Ephemeris. Full lagna, dashas and divisional charts still need a complete reading.'
                    : 'This is a simplified snapshot (no birth place given). Add your place of birth above for an exact moon sign and nakshatra.'}
                </p>
                <div className="mt-6 rounded-xl border border-gold-400/40 bg-maroon-950/40 p-5 text-center">
                  <p className="font-heading font-semibold text-cream-100">Want complete personal analysis of your chart?</p>
                  <Link to="/consultation" className="btn-gold mt-4 w-full">Get Astrology Report</Link>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-maroon-100 p-10 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/40 bg-cream-100 text-maroon-700">
                  <Icon name="diya" className="h-10 w-10" />
                </span>
                <p className="mt-4 font-heading font-semibold text-maroon-900">Your kundli snapshot will appear here</p>
                <p className="mt-1 text-sm text-maroon-950/60">Fill in your birth details and press the button.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
