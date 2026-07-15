import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SITE } from '../data/content.js'

const NAV = [
  { to: '/', label: 'Home' },
  {
    label: 'Reports',
    highlight: true,
    children: [
      { href: 'https://perfect-career.astrovedansh.com/', label: 'Perfect Career Report' },
      { href: 'https://perfect-timing.astrovedansh.com/', label: 'Perfect Timing Report' },
      { to: '/numerology-report', label: 'Numerology Report' },
    ],
  },
  {
    label: 'Horoscope',
    children: [
      { to: '/horoscope/daily', label: 'Daily Horoscope' },
      { to: '/horoscope/2026', label: 'Horoscope 2026' },
      { to: '/panchang', label: "Today's Panchang" },
    ],
  },
  {
    label: 'Free Tools',
    children: [
      { to: '/free-kundli-calculator', label: 'Free Kundli Calculator' },
      { to: '/numerology-report', label: 'Numerology & Name Correction' },
    ],
  },
  { to: '/consultation', label: 'Consultation' },
  { to: '/online-puja-services', label: 'Puja Services' },
  { to: '/shop', label: 'Shop' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
]

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img src="/assets/av-20.png" alt="AstroVedansh" className="h-11 w-11 rounded-full ring-2 ring-gold-500" />
      <span className="leading-none">
        <span className="block font-display text-2xl text-cream-100">
          Astro<span className="text-gold-400">Vedansh</span>
        </span>
        <span className="block font-heading text-[10px] font-semibold uppercase tracking-[0.25em] text-cream-100/70">
          {SITE.tagline}
        </span>
      </span>
    </Link>
  )
}

function NavItem({ item, className, onClick }) {
  return item.href ? (
    <a href={item.href} className={className} onClick={onClick}>{item.label}</a>
  ) : (
    <NavLink to={item.to} className={className} onClick={onClick}>{item.label}</NavLink>
  )
}

function Dropdown({ item }) {
  return (
    <div className="group relative">
      <button
        className={`flex items-center gap-1 rounded-full px-4 py-2 font-heading text-sm font-semibold transition hover:text-gold-400 ${
          item.highlight ? 'text-gold-400' : 'text-cream-100/90'
        }`}
      >
        {item.label}
        <svg className="h-3 w-3 transition group-hover:rotate-180" viewBox="0 0 12 12" fill="currentColor">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      <div className="invisible absolute left-0 top-full z-40 min-w-56 rounded-xl border border-maroon-100 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
        {item.children.map((c) => (
          <NavItem
            key={c.to || c.href}
            item={c}
            className="block px-4 py-2.5 font-heading text-sm font-medium text-maroon-900 hover:bg-cream-100"
          />
        ))}
      </div>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 shadow-lg shadow-maroon-950/20">
      <div className="hidden bg-maroon-950 text-cream-100/80 sm:block">
        <div className="container-av flex items-center justify-between py-1.5 text-xs">
          <span className="font-heading tracking-wide">{SITE.roles}</span>
          <div className="hidden items-center gap-4 sm:flex">
            <a href={`mailto:${SITE.email}`} className="hover:text-gold-400">{SITE.email}</a>
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer" className="hover:text-gold-400">YouTube</a>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="hover:text-gold-400">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gold-500/60 bg-maroon-800">
        <div className="container-av flex items-center justify-between py-3">
          <Wordmark />
          <nav className="hidden items-center lg:flex">
            {NAV.map((item) =>
              item.children ? (
                <Dropdown key={item.label} item={item} />
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 font-heading text-sm font-semibold transition ${
                      isActive ? 'text-gold-400' : 'text-cream-100/90 hover:text-gold-400'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <Link to="/consultation" className="btn-gold ml-3 !px-5 !py-2 text-sm">
              Book a Call
            </Link>
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-cream-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav className="border-t border-maroon-700 bg-maroon-800 pb-4 lg:hidden">
            {NAV.flatMap((item) => (item.children ? item.children : [item])).map((item) => (
              <NavItem
                key={item.to || item.href}
                item={item}
                onClick={() => setOpen(false)}
                className="block px-6 py-3 font-heading font-semibold text-cream-100/90 hover:text-gold-400"
              />
            ))}
            <div className="px-6 pt-2">
              <Link to="/consultation" onClick={() => setOpen(false)} className="btn-gold w-full text-sm">
                Book a Call
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
