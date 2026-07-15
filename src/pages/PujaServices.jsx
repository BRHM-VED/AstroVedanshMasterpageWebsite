import { PageHero, SectionHeading } from '../components/Section.jsx'
import { useSEO } from '../lib/seo.js'
import { IconBadge } from '../components/Decor.jsx'
import LeadForm from '../components/LeadForm.jsx'
import { PUJAS } from '../data/content.js'
import { useApi } from '../lib/api.js'

const STEPS = [
  ['1', 'Choose Your Puja', 'Pick from the list or let us recommend one after seeing your chart.'],
  ['2', 'Sankalp in Your Name', 'The pandit takes sankalp with your name, gotra and intention.'],
  ['3', 'Live Vidhi', 'Join the puja live on video or receive the full recording.'],
  ['4', 'Prasad & Guidance', 'Prasad is shipped where applicable, with after-puja instructions.'],
]

export default function PujaServices() {
  useSEO({
    title: 'Online Puja Services — Navagraha, Rahu-Ketu, Sade Sati & More',
    description: 'Book Vedic pujas performed live with full vidhi by experienced pandits: Navagraha Shanti, Rahu-Ketu dosh nivaran, Mangal dosh, Sade Sati, Lakshmi and Saraswati puja.',
    path: '/online-puja-services',
  })
  const { data: pujas } = useApi('/pujas', PUJAS)
  return (
    <>
      <PageHero
        eyebrow="Online Puja Services"
        title="Sacred Rituals, Performed Right"
        sub="Vedic pujas conducted by experienced pandits with complete vidhi — attend live from anywhere in the world."
      />
      <section className="section-pad">
        <div className="container-av">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pujas.map((p) => (
              <div key={p.id} className="card flex flex-col">
                <IconBadge icon={p.icon} />
                <h3 className="mt-4 font-display text-2xl text-maroon-900">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-maroon-950/70">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="accent text-2xl text-maroon-700">₹{Number(p.price).toLocaleString('en-IN')}</p>
                  <a href="#book-puja" className="btn-primary !px-5 !py-2 text-sm">Book Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-maroon-800 text-cream-100">
        <div className="container-av">
          <SectionHeading light eyebrow="How It Works" title="From Sankalp to Prasad" />
          <div className="grid gap-6 md:grid-cols-4">
            {STEPS.map(([n, title, text]) => (
              <div key={n} className="rounded-2xl border border-cream-100/20 bg-maroon-700/50 p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 font-display text-2xl text-maroon-950">{n}</span>
                <h3 className="mt-4 font-heading text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm text-cream-100/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="book-puja" className="section-pad">
        <div className="container-av max-w-2xl">
          <SectionHeading eyebrow="Book a Puja" title="Reserve Your Puja Date" sub="Mention the puja name and preferred date — we confirm pandit availability within a few hours." />
          <div className="rounded-3xl border border-maroon-100 bg-white p-8 shadow-lg">
            <LeadForm type="puja_booking" button="Request Puja Booking" />
          </div>
        </div>
      </section>
    </>
  )
}
