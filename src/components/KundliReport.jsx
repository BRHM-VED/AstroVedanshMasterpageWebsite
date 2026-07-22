import { useState } from 'react'
import { Icon } from './Decor.jsx'
import { currentDasha, julianDayToDate, siderealFromLongitude } from '../lib/astro.js'

const PLANET_ORDER = [
  ['sun', 'Sun (Surya)'],
  ['moon', 'Moon (Chandra)'],
  ['mars', 'Mars (Mangal)'],
  ['mercury', 'Mercury (Budh)'],
  ['jupiter', 'Jupiter (Guru)'],
  ['venus', 'Venus (Shukra)'],
  ['saturn', 'Saturn (Shani)'],
  ['true_node', 'Rahu'],
  ['ketu', 'Ketu'],
]

function fmtDate(jd) {
  return julianDayToDate(jd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function Accordion({ title, icon, badge, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-2xl border border-gold-400/20 bg-maroon-950/30">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-3 font-heading font-semibold text-cream-100">
          <Icon name={icon} className="h-5 w-5 shrink-0 text-gold-400" />
          {title}
          {badge && <span className="rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-400">{badge}</span>}
        </span>
        <svg className={`h-4 w-4 shrink-0 text-gold-400 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && <div className="border-t border-gold-400/10 px-5 py-4">{children}</div>}
    </div>
  )
}

/** Expandable detailed section shown below the core Vedic snapshot card, once
 *  the richer natal/dasha/dosha/yoga calls have resolved. Any subset can be
 *  missing (a single failed call shouldn't take the others down with it). */
export default function KundliReport({ planets, houses, doshas, yogas, dasha, ayanamsaDegrees }) {
  if (!planets && !houses && !doshas && !yogas && !dasha) return null

  // house_1's cusp *is* the ascendant in a whole-sign chart, but its sign
  // field (like every planet's below) comes back tropical — re-derive it
  // sidereal from the raw cusp longitude.
  const lagna = houses?.cusps?.house_1
    ? siderealFromLongitude(houses.cusps.house_1.cusp_longitude, ayanamsaDegrees)
    : null
  const activeDasha = dasha ? currentDasha(dasha) : null
  const presentDoshas = (doshas?.doshas || []).filter((d) => d.is_present)
  const presentYogas = (yogas?.yogas || []).filter((y) => y.is_present)

  return (
    <div className="mt-6 space-y-3">
      <p className="px-1 font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-400/80">Detailed Report</p>

      {(lagna || planets) && (
        <Accordion title="Lagna & Planet Positions" icon="planet" defaultOpen>
          {lagna && (
            <p className="mb-4 text-sm text-cream-100/80">
              <strong className="text-gold-400">Lagna (Ascendant):</strong> {lagna.sign} — {lagna.degreeInSign.toFixed(1)}°
            </p>
          )}
          {planets && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-cream-100/50">
                    <th className="whitespace-nowrap pb-2 pr-3 font-heading">Planet</th>
                    <th className="whitespace-nowrap pb-2 pr-3 font-heading">Sign</th>
                    <th className="whitespace-nowrap pb-2 pr-3 font-heading">Nakshatra</th>
                    <th className="whitespace-nowrap pb-2 font-heading">Retro</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANET_ORDER.filter(([key]) => planets[key]).map(([key, label]) => {
                    const p = planets[key]
                    const sid = siderealFromLongitude(p.longitude, ayanamsaDegrees)
                    return (
                      <tr key={key} className="border-t border-gold-400/10">
                        <td className="whitespace-nowrap py-2 pr-3 font-medium text-cream-100">{label}</td>
                        <td className="whitespace-nowrap py-2 pr-3 text-cream-100/80">{sid.sign} {sid.degreeInSign.toFixed(1)}°</td>
                        <td className="whitespace-nowrap py-2 pr-3 text-cream-100/80">{p.nakshatra} (P{p.nakshatra_pada})</td>
                        <td className="whitespace-nowrap py-2 text-cream-100/80">{p.is_retrograde ? 'R' : '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Accordion>
      )}

      {activeDasha && (
        <Accordion title="Current Dasha (Planetary Period)" icon="calendar">
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-maroon-950/40 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-gold-400">Mahadasha</p>
              <p className="mt-1 font-heading text-lg font-semibold text-cream-100">{activeDasha.maha.lord}</p>
              <p className="text-xs text-cream-100/60">{fmtDate(activeDasha.maha.start_jd)} – {fmtDate(activeDasha.maha.end_jd)}</p>
            </div>
            {activeDasha.antar && (
              <div className="rounded-xl bg-maroon-950/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gold-400">Antardasha (Sub-period)</p>
                <p className="mt-1 font-heading text-lg font-semibold text-cream-100">{activeDasha.antar.antardasha_lord}</p>
                <p className="text-xs text-cream-100/60">{fmtDate(activeDasha.antar.start_jd)} – {fmtDate(activeDasha.antar.end_jd)}</p>
              </div>
            )}
            <p className="text-xs text-cream-100/50">
              You are currently running {activeDasha.maha.lord} Mahadasha
              {activeDasha.antar ? ` – ${activeDasha.antar.antardasha_lord} Antardasha` : ''}, per the Vimshottari Dasha system.
            </p>
          </div>
        </Accordion>
      )}

      {(presentDoshas.length > 0 || presentYogas.length > 0) && (
        <Accordion title="Doshas & Yogas" icon="shield" badge={presentDoshas.length ? `${presentDoshas.length} dosha${presentDoshas.length > 1 ? 's' : ''}` : null}>
          <div className="space-y-4">
            {presentDoshas.map((d) => (
              <div key={d.yoga_name} className="rounded-xl border border-gold-400/20 bg-maroon-950/40 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-heading font-semibold text-cream-100">{d.yoga_name}</p>
                  <span className="shrink-0 rounded-full bg-gold-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-400">{d.strength}</span>
                </div>
                <p className="mt-1 text-sm text-cream-100/70">{d.effects}</p>
                {d.remedies && (
                  <p className="mt-2 text-xs text-cream-100/50"><strong className="text-gold-400/80">Remedy:</strong> {d.remedies}</p>
                )}
              </div>
            ))}
            {presentDoshas.length === 0 && (
              <p className="text-sm text-cream-100/60">No major doshas detected in this snapshot.</p>
            )}
            {presentYogas.slice(0, 4).map((y) => (
              <div key={y.yoga_name} className="rounded-xl border border-gold-400/20 bg-maroon-950/40 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-heading font-semibold text-cream-100">{y.yoga_name}</p>
                  <span className="shrink-0 rounded-full bg-gold-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-400">{y.strength}</span>
                </div>
                <p className="mt-1 text-sm text-cream-100/70">{y.effects}</p>
              </div>
            ))}
            {presentYogas.length > 4 && (
              <p className="text-center text-xs text-cream-100/50">+ {presentYogas.length - 4} more yogas found in your chart.</p>
            )}
          </div>
        </Accordion>
      )}
    </div>
  )
}
