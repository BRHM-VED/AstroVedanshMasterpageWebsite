import { Link } from 'react-router-dom'
import { useSiteSettings } from '../lib/settings.js'

const COLS = [
  {
    title: 'Services',
    links: [
      ['Consultation', '/consultation'],
      ['Numerology Report', '/numerology-report'],
      ['Online Puja Services', '/online-puja-services'],
      ['Ask an Astrologer', '/ask-astrologer'],
      ['Shop Sacred Tools', '/shop'],
    ],
  },
  {
    title: 'Free Resources',
    links: [
      ['Kundli Analysis', '/kundli'],
      ['Daily Horoscope', '/horoscope/daily'],
      ['Horoscope 2026', '/horoscope/2026'],
      ["Today's Panchang", '/panchang'],
      ['Blog', '/blog'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About AstroVedansh', '/about'],
      ['Contact Us', '/contact'],
      ['Privacy Policy', '/privacy-policy'],
      ['Terms & Policies', '/terms'],
      ['Refund Policy', '/refund-policy'],
      ['Corrections Policy', '/corrections-policy'],
    ],
  },
]

export default function Footer() {
  const SITE = useSiteSettings()
  return (
    <footer className="bg-maroon-950 text-cream-100/80">
      <div className="container-av grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src="/assets/av-20.png" alt="AstroVedansh" className="h-12 w-12 rounded-full ring-2 ring-gold-500" />
            <span className="font-display text-2xl text-cream-100">
              Astro<span className="text-gold-400">Vedansh</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            {SITE.roles}. Guiding 1 lakh+ clients with honest, practical Vedic astrology and numerology.
          </p>
          <div className="mt-4 flex gap-3">
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer" className="rounded-full bg-maroon-800 px-4 py-2 text-xs font-semibold hover:bg-maroon-700">YouTube</a>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-maroon-800 px-4 py-2 text-xs font-semibold hover:bg-maroon-700">Instagram</a>
          </div>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-lg text-gold-400">{col.title}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="transition hover:text-gold-400">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-maroon-800">
        <div className="container-av flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} AstroVedansh · astrovedansh.org · All rights reserved.</p>
          <div className="flex items-center gap-3 opacity-80">
            <img src="/assets/av-05.png" alt="Visa & Mastercard accepted" className="h-6 rounded" />
            <span>100% Secure Payment</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
