import { Link } from 'react-router-dom'
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
            <img src="/assets/av-09.png" alt="AstroVedansh astrologer" className="relative rounded-3xl border-4 border-gold-500/60 shadow-2xl" />
          </div>
          <div>
            <p className="eyebrow">Namaste 🙏</p>
            <h2 className="h-section mt-2">A Journey Built on Trust</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-maroon-950/80">
              <p>
                AstroVedansh began with a simple conviction: astrology should give people clarity and courage,
                not confusion and fear. What started as guidance for friends and family has grown into a practice
                trusted by more than one lakh clients across India and abroad.
              </p>
              <p>
                Every consultation combines classical Vedic astrology — kundli, dashas, gochar — with Chaldean
                numerology, so recommendations are cross-checked across two systems before they reach you.
                Reports are written personally, not generated.
              </p>
              <p>
                Whether you come with a career crossroads, a delayed marriage, a health worry or a business
                decision, you leave with the same three things: what the time holds, what is in your hands,
                and exactly what to do next.
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
