import { Link } from 'react-router-dom'
import { SectionHeading, Stars } from '../components/Section.jsx'
import { Icon, IconBadge, Glyph, Mandala, OrnamentDivider } from '../components/Decor.jsx'
import { panchang } from '../lib/astro.js'
import { useApi } from '../lib/api.js'
import {
  SITE, REPORTS, SERVICES, PRODUCTS, TESTIMONIALS, TESTIMONIAL_SCREENSHOTS, SIGNS, POSTS, FAQS,
} from '../data/content.js'
import { useState } from 'react'
import { useSEO } from '../lib/seo.js'

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="starfield relative overflow-hidden bg-maroon-800 text-cream-100">
      <Mandala className="pointer-events-none absolute -right-40 -top-40 h-[26rem] w-[26rem] text-gold-400/10" />
      <div className="container-av relative grid items-center gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:py-20">
        <div>
          <p className="flex items-center gap-3 font-heading text-xs font-bold uppercase tracking-[0.25em] text-gold-400 md:text-sm">
            <span className="h-px w-8 bg-gold-400/60 md:w-10" />
            {SITE.tagline}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] md:mt-5 md:text-7xl">
            Decode your destiny
            <span className="accent mt-1 block text-3xl normal-case text-gold-400 md:text-6xl">
              with Vedic wisdom
            </span>
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-cream-100/85 md:text-lg">
            AstroVedansh is an astrologer, numerologist and life counsellor.
            Personalised reports, one-on-one consultations and practical remedies
            for career, love, health and wealth.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4 md:mt-9">
            <Link to="/consultation" className="btn-gold">Book a Consultation</Link>
            <Link
              to="/numerology-report"
              className="group inline-flex items-center gap-2 font-heading font-semibold text-cream-100 underline decoration-gold-400/60 underline-offset-8 transition hover:decoration-gold-400"
            >
              Get your report <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-3 border-t border-cream-100/15 pt-5 text-sm text-cream-100/70">
            <Stars n={5} /> Trusted by 1 lakh+ clients across India &amp; abroad
          </p>
        </div>
        <div className="relative mx-auto hidden w-64 md:block lg:w-80">
          <Mandala className="absolute -inset-14 text-gold-400/25" />
          <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[3px] border-gold-500/70 shadow-2xl shadow-maroon-950/60">
            <img src="/assets/av-09.png" alt="AstroVedansh — astrologer and numerologist" className="w-full" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-950/85 to-transparent px-5 pb-4 pt-12 text-center">
              <p className="font-heading text-sm font-bold tracking-wide text-cream-100">{SITE.roles}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SignatureReports() {
  return (
    <section className="border-b border-maroon-100 bg-white">
      <div className="container-av py-8 md:py-12">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {REPORTS.map((r) => (
            <a key={r.id} href={r.href} className="card group flex flex-col gap-4">
              <span className="flex items-center gap-4">
                <img
                  src={r.img}
                  alt={`${r.title} logo`}
                  className="h-14 w-14 shrink-0 rounded-full border-2 border-gold-500/50 object-cover"
                />
                <span className="min-w-0">
                  <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">
                    Signature Report
                  </span>
                  <h2 className="font-display text-2xl leading-tight text-maroon-900">{r.title}</h2>
                </span>
              </span>
              <span className="space-y-1.5 text-sm">
                <p className="text-maroon-950/85">
                  <strong className="font-heading font-bold text-maroon-900">Best for:</strong> {r.bestFor}
                </p>
                <p className="text-maroon-950/70">
                  <strong className="font-heading font-bold text-maroon-900">You get:</strong> {r.get}
                </p>
              </span>
              <span className="btn-primary mt-auto self-start !px-5 !py-2.5 text-sm">
                {r.cta} <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Page sections ------------------------------ */

function PanchangStrip() {
  const p = panchang()
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const items = [
    ['Tithi', `${p.tithi} · ${p.paksha}`],
    ['Nakshatra', p.nakshatra],
    ['Yoga', p.yoga],
    ['Moon Rashi', p.moonRashi],
    ['Rahu Kaal', p.rahuKaal],
  ]
  return (
    <section className="border-b border-maroon-100 bg-cream-100/70">
      <div className="container-av py-7">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div className="flex items-center gap-3">
            <IconBadge icon="sun" size="sm" />
            <div>
              <p className="eyebrow !text-xs">Today's Panchang</p>
              <p className="font-heading text-sm font-bold text-maroon-900">{today}</p>
            </div>
          </div>
          <div className="hidden h-10 w-px bg-maroon-100 sm:block" />
          <div className="flex flex-1 flex-wrap gap-x-8 gap-y-2 text-sm">
            {items.map(([k, v], i) => (
              <div key={k} className={i > 1 ? 'hidden md:block' : ''}>
                <p className="font-heading text-[11px] font-bold uppercase tracking-wider text-gold-600">{k}</p>
                <p className="font-medium text-maroon-950/85">{v}</p>
              </div>
            ))}
          </div>
          <Link to="/panchang" className="group font-heading text-sm font-bold text-maroon-700 hover:text-maroon-900">
            Full panchang <span className="inline-block transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const { data: services } = useApi('/services', SERVICES)
  const [first, ...rest] = services
  return (
    <section className="section-pad">
      <div className="container-av">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <SectionHeading
            align="left"
            eyebrow="Our Services"
            title="One call can change your direction"
            sub="Every consultation is grounded in your actual birth chart — no generic predictions, no fear-selling."
          />
          <Link to="/consultation" className="btn-outline mb-12 hidden md:inline-flex">All services</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {first && (
            <Link to={first.cta || '/consultation'} className="starfield group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-maroon-800 p-8 text-cream-100 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl lg:row-span-2">
              <Mandala className="absolute -bottom-24 -right-24 h-72 w-72 text-gold-400/20 transition duration-700 group-hover:rotate-45" />
              <div className="relative">
                <IconBadge icon={first.icon} dark />
                <h3 className="mt-6 font-display text-3xl leading-tight">{first.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-100/75">{first.excerpt}</p>
              </div>
              <span className="relative mt-10 inline-flex items-center gap-2 font-heading text-sm font-bold text-gold-400">
                Explore <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          )}
          {rest.map((s) => (
            <Link key={s.id} to={s.cta || '/consultation'} className="card group flex items-center gap-5 sm:items-start">
              <IconBadge icon={s.icon} />
              <span className="min-w-0 flex-1">
                <h3 className="flex items-center justify-between gap-3 font-heading text-lg font-bold text-maroon-900">
                  {s.title}
                  <span className="text-maroon-700 transition group-hover:translate-x-1 sm:hidden">→</span>
                </h3>
                <p className="mt-1.5 hidden text-sm leading-relaxed text-maroon-950/65 sm:block">{s.excerpt}</p>
                <span className="mt-3 hidden items-center gap-1.5 font-heading text-sm font-bold text-maroon-700 sm:inline-flex">
                  Explore <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FreeTools() {
  const tools = [
    { to: '/free-kundli-calculator', icon: 'diya', title: 'Free Kundli Calculator', text: 'Your moon sign, nakshatra and birth tithi in seconds.' },
    { to: '/horoscope/daily', icon: 'moon', title: 'Daily Horoscope', text: 'Fresh guidance for all 12 rashis, every single day.' },
    { to: '/panchang', icon: 'calendar', title: "Today's Panchang", text: 'Tithi, nakshatra, yoga, karana and rahu kaal for today.' },
  ]
  return (
    <section className="starfield section-pad relative overflow-hidden bg-maroon-800 text-cream-100">
      <Mandala className="pointer-events-none absolute -right-40 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 text-gold-400/10" spin />
      <div className="container-av relative">
        <SectionHeading
          light
          eyebrow="Free Astrology Tools"
          title="Explore your chart — free"
          sub="Instant, honest snapshots powered by Vedic calculations. No signup needed."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              className={`group rounded-t-[5rem] rounded-b-2xl border border-cream-100/20 bg-maroon-700/40 px-6 pb-6 pt-9 text-center backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-gold-500/70 hover:bg-maroon-700/70 sm:rounded-t-[7rem] sm:px-8 sm:pb-8 sm:pt-12 ${i === 1 ? 'md:-translate-y-4 md:hover:-translate-y-6' : ''}`}
            >
              <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/50 text-gold-400 transition group-hover:scale-110">
                <Icon name={t.icon} className="h-8 w-8" />
              </span>
              <h3 className="mt-5 font-display text-2xl">{t.title}</h3>
              <p className="mt-2 text-sm text-cream-100/70">{t.text}</p>
              <span className="mt-5 inline-block font-heading text-sm font-bold text-gold-400">
                Try it free <span className="inline-block transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ShopTeaser() {
  const { data: products } = useApi('/products', PRODUCTS)
  return (
    <section className="section-pad">
      <div className="container-av">
        <SectionHeading
          eyebrow="Sacred Energy Tools"
          title="Energised tools for modern lives"
          sub="Rudraksha, gemstones, yantras and bracelets — certified, energised and recommended only when your chart calls for them."
        />
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <Link to="/shop" key={p.id} className="card group flex flex-col items-center !p-4 text-center sm:!p-6">
              <IconBadge icon={p.icon} size="sm" />
              <p className="mt-3 hidden font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600 sm:block">{p.category}</p>
              <h3 className="mt-1.5 font-heading text-sm font-bold leading-snug text-maroon-900 sm:text-lg">{p.title}</h3>
              <p className="accent mt-1.5 text-xl text-maroon-700 sm:text-2xl">₹{Number(p.price).toLocaleString('en-IN')}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/shop" className="btn-primary">Browse the Full Collection</Link>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const { data: testimonials } = useApi('/testimonials', TESTIMONIALS)
  return (
    <section className="section-pad bg-cream-100/70">
      <div className="container-av">
        <SectionHeading
          eyebrow="A Journey Built on Trust"
          title="What our clients say"
          sub="Real WhatsApp messages from real clients — shared with permission."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIAL_SCREENSHOTS.map((src, i) => (
            <figure
              key={src}
              className={`overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${i > 2 ? 'hidden lg:block lg:col-span-1' : ''} ${i === 3 ? 'lg:col-start-1' : ''}`}
            >
              <div className="flex items-center gap-2 border-b border-maroon-100 bg-cream-50 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-maroon-950/50">WhatsApp · client feedback</span>
              </div>
              <img src={src} alt={`WhatsApp feedback from an AstroVedansh client (${i + 1})`} loading="lazy" className="w-full" />
            </figure>
          ))}
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-maroon-800 p-7 text-cream-100 sm:col-span-2 lg:col-span-2">
            <Stars n={5} />
            <div className="space-y-4">
              {testimonials.slice(0, 2).map((t) => (
                <blockquote key={t.id} className="border-l-2 border-gold-400/60 pl-4 text-sm leading-relaxed text-cream-100/85">
                  "{t.text}" <span className="mt-1 block font-heading text-xs font-bold text-gold-400">— {t.name}</span>
                </blockquote>
              ))}
            </div>
            <Link to="/consultation" className="btn-gold self-start !px-5 !py-2.5 text-sm">Start Your Own Story</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ZodiacStrip() {
  return (
    <section className="section-pad">
      <div className="container-av">
        <SectionHeading eyebrow="Daily Horoscope" title="Choose your rashi" />
        <div className="mx-auto grid max-w-4xl grid-cols-4 gap-2.5 sm:gap-3 md:grid-cols-6">
          {SIGNS.map((s) => (
            <Link
              key={s.id}
              to={`/horoscope/daily#${s.id}`}
              className="group flex flex-col items-center gap-1.5 rounded-2xl border border-maroon-100 bg-white py-3.5 transition duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-lg hover:shadow-maroon-900/10 sm:gap-2 sm:py-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 bg-cream-100 text-xl text-maroon-700 transition group-hover:bg-maroon-700 group-hover:text-cream-100 sm:h-12 sm:w-12 sm:text-2xl">
                <Glyph symbol={s.symbol} />
              </span>
              <span className="text-center leading-tight">
                <span className="block font-heading text-xs font-bold text-maroon-900 sm:text-sm">{s.name}</span>
                <span className="hidden text-[11px] text-maroon-950/50 sm:block">{s.hindi}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogTeaser() {
  const { data: posts } = useApi('/posts', POSTS)
  const [lead, ...others] = posts
  const fmt = (p) => new Date(p.date || p.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  return (
    <section className="section-pad bg-cream-100/70">
      <div className="container-av">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <SectionHeading align="left" eyebrow="Simplifying Astrology" title="From the journal" />
          <Link to="/blog" className="btn-outline mb-12 hidden md:inline-flex">All articles</Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {lead && (
            <Link to={`/blog/${lead.slug}`} className="starfield group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-maroon-800 p-9 text-cream-100 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <Mandala className="absolute -right-20 -top-20 h-64 w-64 text-gold-400/20" />
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{lead.category} · {fmt(lead)}</p>
              <h3 className="mt-3 max-w-md font-display text-3xl leading-tight md:text-4xl">{lead.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-100/75">{lead.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-gold-400">
                Read the article <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          )}
          <div className="divide-y divide-maroon-100">
            {others.slice(0, 4).map((p, i) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className={`group items-baseline justify-between gap-6 py-5 first:pt-0 last:pb-0 ${i > 1 ? 'hidden sm:flex' : 'flex'}`}>
                <span>
                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">{p.category}</p>
                  <h3 className="mt-1 font-heading text-lg font-bold leading-snug text-maroon-900 transition group-hover:text-maroon-700">{p.title}</h3>
                </span>
                <span className="shrink-0 text-xs text-maroon-950/50">{fmt(p)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section-pad">
      <div className="container-av max-w-3xl">
        <SectionHeading eyebrow="FAQs" title="Questions, answered" />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl border transition ${open === i ? 'border-gold-500/50 bg-white shadow-md' : 'border-maroon-100 bg-white'}`}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left font-heading font-semibold text-maroon-900"
              >
                {f.q}
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/50 text-gold-600 transition ${open === i ? 'rotate-45 bg-gold-500 text-maroon-950' : ''}`}>+</span>
              </button>
              {open === i && <p className="px-6 pb-5 text-sm leading-relaxed text-maroon-950/70">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="starfield relative overflow-hidden bg-maroon-800">
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 text-gold-400/10" spin />
      <div className="container-av relative flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="font-display text-4xl text-cream-100 md:text-5xl">
          Too many thoughts?
          <span className="accent mt-1 block text-gold-400">Make them clear.</span>
        </h2>
        <OrnamentDivider className="text-gold-400" />
        <p className="max-w-xl text-cream-100/80">
          Bring your questions about career, marriage, health or money — leave with a plan rooted in your own chart.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/consultation" className="btn-gold">Book Your Call Now</Link>
          <Link to="/ask-astrologer" className="btn-outline !border-cream-100 !text-cream-100 hover:!bg-cream-100 hover:!text-maroon-900">
            Ask a Question First
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useSEO({
    title: 'Vedic Astrologer, Numerologist & Life Counsellor in India',
    description:
      "AstroVedansh — India's trusted Vedic astrologer & numerologist. Perfect Career and Perfect Timing reports, kundli analysis, consultations, online puja, remedies. 1 lakh+ clients.",
    path: '/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      ...REPORTS.map((r) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: r.title,
        description: `Best for: ${r.bestFor}. ${r.get}`,
        url: r.href,
        image: 'https://astrovedansh.org' + r.img,
        brand: { '@type': 'Brand', name: 'AstroVedansh' },
      })),
    ],
  })
  return (
    <>
      <Hero />
      <SignatureReports />
      <Services />
      <PanchangStrip />
      <FreeTools />
      <ShopTeaser />
      <Testimonials />
      <ZodiacStrip />
      <BlogTeaser />
      <FAQ />
      <FinalCTA />
    </>
  )
}
