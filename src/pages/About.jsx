import { Link } from 'react-router-dom'
import { useSEO } from '../lib/seo.js'
import { PageHero, SectionHeading } from '../components/Section.jsx'
import { IconBadge } from '../components/Decor.jsx'
import { STATS, SITE } from '../data/content.js'

const VALUES = [
  ['compass', 'Honesty First', 'We tell you what the chart shows — both the favourable and the challenging — and never sell fear.'],
  ['yantra', 'Method over Mystery', 'Every reading follows classical Vedic and Chaldean methods: kundli, dashas, transits, numbers.'],
  ['shield', 'Practical Remedies', 'Remedies must fit real life. Mantras, conduct and charity come before expensive fixes.'],
  ['hands', 'Long-term Guidance', 'Most clients stay for years. We grow with your milestones — career, marriage, children, business.'],
]

export default function About() {
  useSEO({
    title: 'About AstroVedansh — Astrologer, Numerologist, Life Counsellor',
    description: 'The person and principles behind AstroVedansh: classical Vedic method cross-checked with numerology, honest guidance and practical remedies. 1 lakh+ clients.',
    path: '/about',
  })
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="The Person Behind AstroVedansh"
        sub={SITE.roles}
      />
      <section className="section-pad">
        <div className="container-av grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-4 rounded-3xl bg-gold-500/20 blur-xl" />
            <picture>
              <source srcSet="/assets/av-09.webp" type="image/webp" />
              <img
                src="/assets/av-09.jpg"
                alt="AstroVedansh astrologer"
                className="relative w-full rounded-3xl border-4 border-gold-500/60 shadow-2xl"
                width="900"
                height="1078"
                loading="lazy"
              />
            </picture>
          </div>
          <div>
            <p className="eyebrow">Namaste</p>
            <h2 className="h-section mt-2">Clarity, Not Fear. Direction, Not Drama.</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-maroon-950/80">
              <p>
                I am AstroVedansh — astrologer, numerologist and life counsellor. For over a decade I have
                done one thing: take the confusion people carry about career, marriage, money and health,
                and turn it into a clear next step using their own birth chart.
              </p>
              <p>
                My method is simple and disciplined. Your kundli is analysed the classical way — planets,
                dashas, transits — then cross-verified with Chaldean numerology and, where useful, hand
                analysis. If two systems agree, you get a confident answer. If the time is not right for
                something, I will say so plainly, along with when it will be.
              </p>
              <p>
                No fear-selling, no endless remedies, no "big problem, big price" tactics. Most of what I
                prescribe costs nothing: conduct, timing and consistency. Pujas and gemstones come only
                when your chart genuinely calls for them. That honesty is why more than one lakh clients —
                students, professionals, business owners and families — have stayed with me for years.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link to="/consultation" className="btn-primary">Consult Now</Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-maroon-950 py-12">
        <div className="container-av grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl text-gold-400 md:text-4xl">{s.value}</p>
              <p className="mt-1 font-heading text-sm text-cream-100/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section-pad">
        <div className="container-av">
          <SectionHeading eyebrow="Our Principles" title="How We Work" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(([icon, title, text]) => (
              <div key={title} className="card flex flex-col items-center text-center">
                <IconBadge icon={icon} />
                <h3 className="mt-4 font-heading text-lg font-bold text-maroon-900">{title}</h3>
                <p className="mt-2 text-sm text-maroon-950/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
