import { Link, useSearchParams } from 'react-router-dom'
import { useSEO } from '../lib/seo.js'
import { PageHero } from '../components/Section.jsx'
import { IconBadge } from '../components/Decor.jsx'
import Pagination, { usePage } from '../components/Pagination.jsx'
import { PRODUCTS, SITE } from '../data/content.js'
import { useApi } from '../lib/api.js'

const PER_PAGE = 12

export default function Shop() {
  const { data: products } = useApi('/products', PRODUCTS)
  const [searchParams] = useSearchParams()
  const cat = searchParams.get('category') || 'All'
  const categories = ['All', ...new Set(products.map((p) => p.category))]
  const filtered = cat === 'All' ? products : products.filter((p) => p.category === cat)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const page = usePage(searchParams, totalPages)
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const catUrl = (c) => (c === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(c)}`)

  useSEO({
    title:
      page > 1
        ? `Shop — Sacred Energy Tools, Page ${page} of ${totalPages}`
        : 'Shop — Certified Gemstones, Rudraksha, Yantras & Bracelets',
    description:
      'Energised sacred tools from AstroVedansh: lab-certified rudraksha, yellow & blue sapphire, Shri Yantra, chakra bracelets, gomti chakra and kavach.',
    // Category-filtered views canonicalise to the unfiltered catalogue;
    // pagination pages stay self-referencing.
    path: cat !== 'All' ? '/shop' : page > 1 ? `/shop?page=${page}` : '/shop',
  })

  return (
    <>
      <PageHero
        eyebrow="Sacred Energy Tools"
        title="The AstroVedansh Shop"
        sub="Certified gemstones, energised rudraksha, yantras and bracelets — every piece checked and energised before dispatch."
      />
      <section className="section-pad">
        <div className="container-av">
          <nav aria-label="Product categories" className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <Link
                key={c}
                to={catUrl(c)}
                aria-current={c === cat ? 'page' : undefined}
                className={`rounded-full px-5 py-2 font-heading text-sm font-semibold transition ${
                  c === cat ? 'bg-maroon-700 text-cream-100' : 'border border-maroon-100 bg-white text-maroon-900 hover:border-maroon-700'
                }`}
              >
                {c}
              </Link>
            ))}
          </nav>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((p) => (
              <div key={p.id} className="card flex flex-col items-center text-center">
                <IconBadge icon={p.icon} />
                <p className="mt-4 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">{p.category}</p>
                <h2 className="mt-1 flex-1 font-heading text-lg font-bold text-maroon-900">{p.title}</h2>
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
          <Pagination page={page} totalPages={totalPages} basePath={catUrl(cat)} />
          <p className="mt-10 text-center text-sm text-maroon-950/60">
            Not sure which tool suits your chart? <Link to="/consultation" className="font-bold text-maroon-700 underline">Book a consultation</Link> before you buy — the right remedy matters more than any product.
          </p>
        </div>
      </section>
    </>
  )
}
