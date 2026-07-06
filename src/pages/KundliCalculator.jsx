import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/Section.jsx'
import { Icon } from '../components/Decor.jsx'
import { kundliSnapshot } from '../lib/astro.js'
import { mulank, bhagyank, meaning } from '../lib/numerology.js'

export default function KundliCalculator() {
  const [form, setForm] = useState({ name: '', date: '', time: '12:00' })
  const [result, setResult] = useState(null)

  function calculate(e) {
    e.preventDefault()
    const dob = new Date(`${form.date}T${form.time || '12:00'}:00+05:30`)
    if (Number.isNaN(dob.getTime())) return
    setResult({
      snapshot: kundliSnapshot(dob),
      mulank: mulank(dob),
      bhagyank: bhagyank(dob),
      name: form.name,
    })
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
              <button className="btn-primary w-full">Generate My Free Kundli Snapshot</button>
              <p className="text-center text-xs text-maroon-950/50">
                Instant calculation in your browser — nothing is stored.
              </p>
            </div>
          </form>
          <div>
            {result ? (
              <div className="rounded-3xl bg-maroon-800 p-8 text-cream-100 shadow-xl">
                <h2 className="font-display text-3xl text-gold-400">
                  {result.name ? `${result.name}'s` : 'Your'} Vedic Snapshot
                </h2>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ['Moon Rashi', result.snapshot.moonRashi],
                    ['Sun Rashi', result.snapshot.sunRashi],
                    ['Nakshatra', `${result.snapshot.nakshatra} (Pada ${result.snapshot.pada})`],
                    ['Birth Tithi', result.snapshot.tithi],
                    ['Mulank (Root No.)', result.mulank],
                    ['Bhagyank (Destiny No.)', result.bhagyank],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-maroon-700/60 p-4">
                      <dt className="font-heading text-xs font-bold uppercase tracking-wider text-gold-400">{k}</dt>
                      <dd className="mt-1 font-heading text-lg font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 rounded-xl bg-maroon-950/40 p-4 text-sm leading-relaxed">
                  <p><strong className="text-gold-400">Your Destiny Number says:</strong> {meaning(result.bhagyank)}</p>
                </div>
                <p className="mt-4 text-xs text-cream-100/60">
                  This is a simplified snapshot. Exact lagna, dashas and divisional charts need your birth place and a full reading.
                </p>
                <Link to="/consultation" className="btn-gold mt-6 w-full">Get the Complete Analysis</Link>
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
