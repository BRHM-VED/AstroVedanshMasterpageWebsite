import { useState } from 'react'
import { PageHero, SectionHeading } from '../components/Section.jsx'
import { IconBadge } from '../components/Decor.jsx'
import LeadForm from '../components/LeadForm.jsx'
import { nameNumber, mulank, bhagyank, meaning } from '../lib/numerology.js'

const INCLUDES = [
  ['calendar', '25-Year Predictions', 'Year-by-year phases for career, money, relationships and health.'],
  ['numbers', 'Your Core Numbers', 'Mulank, bhagyank and name number — decoded with their planetary rulers.'],
  ['leaf', 'Lucky Elements', 'Numbers, dates, days, colours and gemstones aligned to your vibration.'],
  ['pen', 'Name Correction', 'If needed — a subtle spelling adjustment to harmonise name and destiny.'],
  ['phone', 'Mobile & Vehicle Numbers', 'Which numbers to keep close and which to avoid.'],
  ['hands', 'Remedy Plan', 'Simple, practical remedies you can actually follow.'],
]

function MiniCalculator() {
  const [input, setInput] = useState({ name: '', date: '' })
  const [res, setRes] = useState(null)
  function calc(e) {
    e.preventDefault()
    const dob = new Date(input.date + 'T12:00:00')
    if (Number.isNaN(dob.getTime()) || !input.name.trim()) return
    setRes({ name: nameNumber(input.name), mulank: mulank(dob), bhagyank: bhagyank(dob) })
  }
  return (
    <div className="rounded-3xl bg-maroon-800 p-8 text-cream-100 shadow-xl">
      <h3 className="font-display text-3xl text-gold-400">Try It Free: Your Numbers</h3>
      <form onSubmit={calc} className="mt-5 space-y-4">
        <input className="input-av" placeholder="Full name (as commonly written)" value={input.name} onChange={(e) => setInput({ ...input, name: e.target.value })} />
        <input type="date" required className="input-av" value={input.date} onChange={(e) => setInput({ ...input, date: e.target.value })} />
        <button className="btn-gold w-full">Reveal My Numbers</button>
      </form>
      {res && (
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[['Mulank', res.mulank], ['Bhagyank', res.bhagyank], ['Name No.', res.name]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-maroon-700/60 p-4">
                <p className="font-heading text-xs font-bold uppercase text-gold-400">{k}</p>
                <p className="font-display text-4xl">{v}</p>
              </div>
            ))}
          </div>
          <p className="rounded-xl bg-maroon-950/40 p-4 text-sm leading-relaxed">{meaning(res.bhagyank)}</p>
          <p className="text-xs text-cream-100/60">
            {res.name === res.bhagyank || res.name === res.mulank
              ? '✅ Your name number harmonises with your birth numbers.'
              : '⚠️ Your name number differs from your birth numbers — the full report analyses whether a correction would help.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default function Numerology() {
  return (
    <>
      <PageHero
        eyebrow="Bestseller"
        title="Personalised Numerology Report"
        sub="A handcrafted report decoding your name and date of birth — with 25-year predictions and name-correction guidance."
      />
      <section className="section-pad">
        <div className="container-av">
          <SectionHeading eyebrow="What's Inside" title="Everything Your Numbers Reveal" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDES.map(([icon, title, text]) => (
              <div key={title} className="card">
                <IconBadge icon={icon} />
                <h3 className="mt-4 font-heading text-lg font-bold text-maroon-900">{title}</h3>
                <p className="mt-1 text-sm text-maroon-950/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-cream-100">
        <div className="container-av grid items-start gap-10 lg:grid-cols-2">
          <MiniCalculator />
          <div className="rounded-3xl border border-maroon-100 bg-white p-8 shadow-lg">
            <h3 className="font-display text-3xl text-maroon-900">Order Your Full Report</h3>
            <p className="mb-6 mt-2 text-sm text-maroon-950/70">
              Delivered digitally within 48 hours. Includes one follow-up clarification on WhatsApp.
            </p>
            <LeadForm type="numerology_report" button="Get My Personalised Report" withBirth withMessage={false} />
          </div>
        </div>
      </section>
    </>
  )
}
