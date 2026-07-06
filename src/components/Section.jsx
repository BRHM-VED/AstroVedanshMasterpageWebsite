import { Mandala, OrnamentDivider } from './Decor.jsx'

export function SectionHeading({ eyebrow, title, sub, light = false, align = 'center' }) {
  const left = align === 'left'
  return (
    <div className={`mb-12 max-w-2xl ${left ? '' : 'mx-auto text-center'}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`h-section mt-2 ${light ? '!text-cream-100' : ''}`}>{title}</h2>
      <OrnamentDivider
        className={light ? 'mt-4 text-gold-400' : 'mt-4 text-gold-500'}
        mx={left ? 'ml-0' : 'mx-auto'}
      />
      {sub && <p className={`mt-4 text-base ${light ? 'text-cream-100/80' : 'text-maroon-950/70'}`}>{sub}</p>}
    </div>
  )
}

export function Stars({ n = 5 }) {
  return <span className="tracking-widest text-gold-500">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

export function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="starfield relative overflow-hidden bg-maroon-800 text-cream-100">
      <Mandala className="pointer-events-none absolute -right-32 -top-32 h-[26rem] w-[26rem] text-gold-400/15" spin />
      <Mandala className="pointer-events-none absolute -bottom-40 -left-36 h-[22rem] w-[22rem] text-gold-400/10" />
      <div className="container-av relative py-12 text-center md:py-20">
        {eyebrow && <p className="eyebrow !text-gold-400">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-3xl md:text-6xl">{title}</h1>
        <OrnamentDivider className="mt-5 text-gold-400" />
        {sub && <p className="mx-auto mt-5 max-w-2xl text-cream-100/85">{sub}</p>}
        {children}
      </div>
    </section>
  )
}
