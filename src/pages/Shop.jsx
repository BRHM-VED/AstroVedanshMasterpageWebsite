import { useState } from 'react'
import { PageHero } from '../components/Section.jsx'
import { IconBadge } from '../components/Decor.jsx'
import { PRODUCTS, SITE } from '../data/content.js'
import { useApi } from '../lib/api.js'

export default function Shop() {
  const { data: products } = useApi('/products', PRODUCTS)
  const categories = ['All', ...new Set(products.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const shown = cat === 'All' ? products : products.filter((p) => p.category === cat)
  return (
    <>
      <PageHero
        eyebrow="Sacred Energy Tools"
        title="The AstroVedansh Shop"
        sub="Certified gemstones, energised rudraksha, yantras and bracelets — every piece checked and energised before dispatch."
      />
      <section className="section-pad">
        <div className="container-av">
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-5 py-2 font-heading text-sm font-semibold transition ${
                  c === cat ? 'bg-maroon-700 text-cream-100' : 'border border-maroon-100 bg-white text-maroon-900 hover:border-maroon-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((p) => (
              <div key={p.id} className="card flex flex-col items-center text-center">
                <IconBadge icon={p.icon} />
                <p className="mt-4 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">{p.category}</p>
                <h3 className="mt-1 flex-1 font-heading text-lg font-bold text-maroon-900">{p.title}</h3>
                <p className="mt-2 text-sm text-maroon-950/70">{p.excerpt}</p>
                <p className="accent mt-3 text-2xl text-maroon-700">₹{Number(p.price).toLocaleString('en-IN')}</p>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Namaste, I want to order: ${p.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-4 !py-2.5 text-sm"
                >
                  Order on WhatsApp
                </a>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-maroon-950/60">
            Not sure which tool suits your chart? <a href="/consultation" className="font-bold text-maroon-700 underline">Book a consultation</a> before you buy — the right remedy matters more than any product.
          </p>
        </div>
      </section>
    </>
  )
}
