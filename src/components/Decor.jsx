// Ornamental SVG system — line icons, mandala, dividers.
// Icons are drawn on a 24×24 grid, stroke 1.5, and inherit currentColor.

const PATHS = {
  planet: (
    <>
      <circle cx="12" cy="12" r="5.5" />
      <path d="M4.5 15.5c-2-.6-3.2-1.5-3.2-2.5C1.3 11.2 6 9.5 12 9.5s10.7 1.7 10.7 3.5c0 1-1.2 1.9-3.2 2.5" />
      <circle cx="17.5" cy="6" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  growth: (
    <>
      <path d="M3 20h18" />
      <path d="M4 16l4.5-4.5 3.5 3L18 8.5" />
      <path d="M14.5 8.5H18V12" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7.5-4.6-9.3-9C1.4 7.6 3.6 4.5 6.8 4.5c2.2 0 3.9 1.3 5.2 3.2 1.3-1.9 3-3.2 5.2-3.2 3.2 0 5.4 3.1 4.1 6.5-1.8 4.4-9.3 9-9.3 9z" />
      <path d="M8.5 10.5l2 2 3.5-3.5" />
    </>
  ),
  beads: (
    <>
      <circle cx="12" cy="19" r="2.2" />
      <circle cx="6.4" cy="16.4" r="1.6" />
      <circle cx="3.6" cy="11" r="1.6" />
      <circle cx="5" cy="5.6" r="1.6" />
      <circle cx="17.6" cy="16.4" r="1.6" />
      <circle cx="20.4" cy="11" r="1.6" />
      <circle cx="19" cy="5.6" r="1.6" />
      <circle cx="12" cy="3.4" r="1.6" />
    </>
  ),
  numbers: (
    <>
      <path d="M9 3L7 21M17 3l-2 18M4 9h17M3 15h17" />
    </>
  ),
  pen: (
    <>
      <path d="M12 2.5l2.5 5.5-2.5 9-2.5-9z" />
      <path d="M12 17v4.5" />
      <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  diya: (
    <>
      <path d="M5 14h14c0 3.5-3.1 6-7 6s-7-2.5-7-6z" />
      <path d="M3 14h18" />
      <path d="M12 11c1.8-1.2 1.8-3.3 0-5.5-1.8 2.2-1.8 4.3 0 5.5z" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 19c-1.5-2-2.2-4.5-1.2-7.5C11.3 9.7 12 8.5 12 8.5s.7 1.2 1.2 3c1 3 .3 5.5-1.2 7.5z" />
      <path d="M12 19c-3.2.3-5.8-.8-7.5-3.3 2-.8 3.9-.9 5.6-.3M12 19c3.2.3 5.8-.8 7.5-3.3-2-.8-3.9-.9-5.6-.3" />
      <path d="M12 19c-4.6 1-7.9-.2-9.5-2.2M12 19c4.6 1 7.9-.2 9.5-2.2" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10 4.8 7 4.3 3.5 4.5v13c3.5-.2 6.5.3 8.5 2 2-1.7 5-2.2 8.5-2v-13C17 4.3 14 4.8 12 6.5z" />
      <path d="M12 6.5v13" />
    </>
  ),
  gem: (
    <>
      <path d="M7 4h10l4 5.5L12 20.5 3 9.5z" />
      <path d="M3 9.5h18M12 20.5L8.5 9.5 12 4l3.5 5.5z" />
    </>
  ),
  yantra: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 5.5l6 10.5H6z" />
      <path d="M12 18.5L6 8h12z" opacity="0.6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  star: (
    <>
      <path d="M12 3l2.2 5.6 6 .4-4.6 3.9 1.5 5.8L12 15.5l-5.1 3.2 1.5-5.8L3.8 9l6-.4z" />
    </>
  ),
  shell: (
    <>
      <path d="M12 21c-4.5 0-8-3.2-8-7.4C4 8.5 7.5 3 12 3s8 5.5 8 10.6c0 4.2-3.5 7.4-8 7.4z" />
      <path d="M12 21V3M8 20l1.5-14M16 20l-1.5-14" />
    </>
  ),
  shield: (
    <>
      <path d="M12 21c-5-2.2-8-5.5-8-10V5l8-2.5L20 5v6c0 4.5-3 7.8-8 10z" />
      <path d="M8.5 11.5l2.5 2.5 4.5-4.5" />
    </>
  ),
  moon: (
    <>
      <path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z" />
      <circle cx="17" cy="6" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 2.8V7M16 2.8V7" />
      <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  snake: (
    <>
      <path d="M4 18c0-2.5 2-3.5 4-3.5s4 1 4-1.5-2-2.5-4-2.5-4-1-4-3.5S6 3.5 8 3.5h8" />
      <path d="M18 20.5c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5H12" />
      <circle cx="17" cy="3.5" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  flame: (
    <>
      <path d="M12 21c-3.9 0-6.5-2.6-6.5-6 0-4.5 4-6.5 4.5-11 3.5 2 8.5 6.5 8.5 11 0 3.4-2.6 6-6.5 6z" />
      <path d="M12 21c-1.8 0-3-1.3-3-3 0-2 1.8-3 3-5 1.2 2 3 3 3 5 0 1.7-1.2 3-3 3z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M4 7.5l8 6 8-6" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5c0 4.1-4 7.5-9 7.5-1 0-2-.1-2.9-.4L4 20l1.2-3.6C3.8 15.1 3 13.4 3 11.5 3 7.4 7 4 12 4s9 3.4 9 7.5z" />
    </>
  ),
  play: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9.2l5 2.8-5 2.8z" fill="currentColor" stroke="none" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" />
      <path d="M5 19c2-5 5.5-8.5 10-10.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  hands: (
    <>
      <path d="M7 21v-6.5L4.5 10c-.6-1-.3-2.2.7-2.8s2.2-.2 2.8.8L10 11V4.5C10 3.7 10.7 3 11.5 3s1.5.7 1.5 1.5V11l2-3c.6-1 1.8-1.4 2.8-.8s1.3 1.8.7 2.8L16 14.5V21" />
    </>
  ),
}

// Map CMS emoji values to drawn icons so admin-entered content also renders crafted.
const EMOJI_MAP = {
  '🪐': 'planet', '📈': 'growth', '💞': 'heart', '📿': 'beads', '🔢': 'numbers',
  '✍️': 'pen', '🕉️': 'diya', '🐍': 'snake', '🔴': 'flame', '🪔': 'diya',
  '🌸': 'lotus', '📖': 'book', '💛': 'gem', '💙': 'gem', '🔱': 'yantra',
  '🧿': 'eye', '✨': 'star', '🐚': 'shell', '🛡️': 'shield', '🌙': 'moon',
  '📅': 'calendar', '🗓️': 'calendar', '📧': 'mail', '💬': 'chat', '📺': 'play',
  '📸': 'camera', '📱': 'phone', '🍀': 'leaf', '🤝': 'hands', '🧭': 'compass',
  '📐': 'yantra', '🛠️': 'shield', '☀️': 'sun',
}

export function Icon({ name, className = 'h-7 w-7' }) {
  const paths = PATHS[name]
  if (!paths) return null
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths}
    </svg>
  )
}

/** Round medallion holding a drawn icon; falls back to the raw emoji if unmapped. */
export function IconBadge({ icon, dark = false, size = 'lg' }) {
  const name = PATHS[icon] ? icon : EMOJI_MAP[icon]
  const sz = size === 'lg' ? 'h-14 w-14' : 'h-11 w-11'
  const inner = size === 'lg' ? 'h-7 w-7' : 'h-5.5 w-5.5'
  return (
    <span
      className={`inline-flex ${sz} shrink-0 items-center justify-center rounded-full border ${
        dark
          ? 'border-gold-400/50 bg-maroon-950/40 text-gold-400'
          : 'border-gold-500/40 bg-cream-100 text-maroon-700'
      }`}
    >
      {name ? <Icon name={name} className={inner} /> : <span className="text-2xl leading-none">{icon}</span>}
    </span>
  )
}

/** Zodiac symbol forced into text presentation (elegant glyph, not emoji square). */
export function Glyph({ symbol, className = '' }) {
  return <span className={`zodiac-glyph ${className}`}>{symbol + '︎'}</span>
}

/** Thin ornamental divider: line — diamond — line */
export function OrnamentDivider({ className = 'text-gold-500', mx = 'mx-auto' }) {
  return (
    <svg viewBox="0 0 220 12" className={`${mx} h-3 w-52 ${className}`} fill="none" aria-hidden="true">
      <line x1="0" y1="6" x2="88" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="132" y1="6" x2="220" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="105" y="1" width="10" height="10" transform="rotate(45 110 6)" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="96" cy="6" r="1.5" fill="currentColor" />
      <circle cx="124" cy="6" r="1.5" fill="currentColor" />
    </svg>
  )
}

/** Large mandala ring for watermarks and the hero halo. */
export function Mandala({ className = '', spin = false }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15)
  return (
    <svg viewBox="0 0 400 400" className={`${className} ${spin ? 'animate-spin-slow' : ''}`} fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="200" cy="200" r="196" strokeWidth="1" opacity="0.5" />
      <circle cx="200" cy="200" r="178" strokeWidth="0.75" strokeDasharray="3 7" />
      <circle cx="200" cy="200" r="140" strokeWidth="0.75" opacity="0.6" />
      <circle cx="200" cy="200" r="112" strokeWidth="0.5" strokeDasharray="1 5" />
      {spokes.map((a) => (
        <g key={a} transform={`rotate(${a} 200 200)`}>
          <path d="M200 22c5 8 5 16 0 24-5-8-5-16 0-24z" strokeWidth="0.9" opacity="0.8" />
          <circle cx="200" cy="56" r="1.6" fill="currentColor" stroke="none" opacity="0.7" />
        </g>
      ))}
      {spokes.filter((_, i) => i % 2 === 0).map((a) => (
        <g key={a} transform={`rotate(${a + 7.5} 200 200)`}>
          <path d="M200 92c7 10 7 20 0 30-7-10-7-20 0-30z" strokeWidth="0.7" opacity="0.5" />
        </g>
      ))}
    </svg>
  )
}

/** Scrolling ribbon of offerings separated by diamonds. */
export function Marquee({ items }) {
  const row = items.map((t, i) => (
    <span key={i} className="mx-6 inline-flex items-center gap-6 font-heading text-sm font-semibold uppercase tracking-[0.25em] text-cream-100/85">
      {t}
      <svg viewBox="0 0 10 10" className="h-2 w-2 text-gold-400" aria-hidden="true">
        <rect x="1.5" y="1.5" width="7" height="7" transform="rotate(45 5 5)" fill="currentColor" />
      </svg>
    </span>
  ))
  return (
    <div className="overflow-hidden border-y border-gold-500/30 bg-maroon-950 py-3.5">
      <div className="animate-marquee flex w-max">
        <div className="flex shrink-0 items-center">{row}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{row}</div>
      </div>
    </div>
  )
}
