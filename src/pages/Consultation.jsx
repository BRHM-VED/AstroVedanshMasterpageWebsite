import { PageHero, SectionHeading, Stars } from '../components/Section.jsx'
import { useSEO } from '../lib/seo.js'
import LeadForm from '../components/LeadForm.jsx'
import { TESTIMONIALS } from '../data/content.js'

const PLANS = [
  {
    name: 'Quick Guidance Call',
    duration: '15 minutes',
    price: 1100,
    points: ['One focused question', 'Chart-based answer', 'One practical remedy'],
  },
  {
    name: 'Full Consultation',
    duration: '30 minutes',
    price: 2100,
    featured: true,
    points: ['Complete birth-chart reading', 'Career, love, health & wealth', 'Dasha & transit analysis', 'Personalised remedies'],
  },
  {
    name: 'Family / Business Session',
    duration: '60 minutes',
    price: 4100,
    points: ['Up to 3 charts', 'Kundli matching included', 'Business timing & muhurta', 'Follow-up on WhatsApp'],
  },
]

export default function Consultation() {
  useSEO({
    title: 'Astrology Consultation on Call — Career, Marriage, Health, Wealth',
    description: 'Book a one-on-one call with AstroVedansh. Birth-chart reading, dasha & transit analysis and personalised remedies. 15, 30 and 60-minute plans.',
    path: '/consultation',
  })
  return (
    <>
      <PageHero
        eyebrow="The Call Consultation"
        title="Talk Directly. Get Clarity."
        sub="A one-on-one call with AstroVedansh — your chart on the table, your questions answered without jargon or fear."
      />
      <section className="section-pad">
        <div className="container-av">
          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`card flex flex-col text-center ${p.featured ? 'border-2 !border-gold-500 shadow-xl' : ''}`}
              >
                {p.featured && (
                  <span className="mx-auto -mt-9 mb-3 rounded-full bg-gold-500 px-4 py-1 font-heading text-xs font-bold text-maroon-950">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-display text-2xl text-maroon-900">{p.name}</h3>
                <p className="mt-1 font-heading text-sm text-maroon-950/60">{p.duration}</p>
                <p className="mt-4 font-display text-4xl text-maroon-700">₹{p.price.toLocaleString('en-IN')}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-maroon-950/75">
                  {p.points.map((pt) => (
                    <li key={pt}>✦ {pt}</li>
                  ))}
                </ul>
                <a href="#book" className={`mt-6 ${p.featured ? 'btn-gold' : 'btn-primary'}`}>Choose Plan</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="book" className="section-pad bg-cream-100">
        <div className="container-av grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Book Your Slot"
              title="Reserve a Consultation"
              sub="Share your birth details and concern — our team confirms your slot on WhatsApp within a few hours."
            />
            <div className="space-y-4">
              {TESTIMONIALS.slice(0, 2).map((t) => (
                <figure key={t.id} className="rounded-2xl bg-white p-5 shadow-sm">
                  <Stars n={5} />
                  <blockquote className="mt-1 text-sm text-maroon-950/75">“{t.text}”</blockquote>
                  <figcaption className="mt-2 font-heading text-xs font-bold text-maroon-900">— {t.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-maroon-100 bg-white p-8 shadow-lg">
            <LeadForm type="consultation" button="Request My Consultation Slot" withBirth />
          </div>
        </div>
      </section>
    </>
  )
}
