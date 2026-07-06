// Compact Vedic panchang & rashi calculations (low-precision Meeus-style formulas).
// Accurate to a fraction of a degree — fine for tithi/nakshatra/rashi display,
// not a replacement for full ephemeris software.

const RAD = Math.PI / 180

export const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami',
  'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami',
  'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya',
]

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya',
  'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana',
  'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
]

export const YOGAS = [
  'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti',
  'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata',
  'Variyana', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti',
]

export const RASHIS = [
  'Mesh (Aries)', 'Vrishabh (Taurus)', 'Mithun (Gemini)', 'Kark (Cancer)', 'Simha (Leo)',
  'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchik (Scorpio)', 'Dhanu (Sagittarius)',
  'Makar (Capricorn)', 'Kumbh (Aquarius)', 'Meen (Pisces)',
]

const KARANAS = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti']

export function julianDay(date) {
  return date.getTime() / 86400000 + 2440587.5
}

function norm360(x) {
  return ((x % 360) + 360) % 360
}

// Mean longitudes — truncated series, J2000 epoch
export function sunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525
  const L0 = norm360(280.46646 + 36000.76983 * T)
  const M = norm360(357.52911 + 35999.05029 * T) * RAD
  const C =
    (1.914602 - 0.004817 * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M)
  return norm360(L0 + C)
}

export function moonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525
  const Lp = norm360(218.3164477 + 481267.88123421 * T)
  const D = norm360(297.8501921 + 445267.1114034 * T) * RAD
  const M = norm360(357.5291092 + 35999.0502909 * T) * RAD
  const Mp = norm360(134.9633964 + 477198.8675055 * T) * RAD
  const F = norm360(93.272095 + 483202.0175233 * T) * RAD
  let lon =
    6.288774 * Math.sin(Mp) +
    1.274027 * Math.sin(2 * D - Mp) +
    0.658314 * Math.sin(2 * D) +
    0.213618 * Math.sin(2 * Mp) -
    0.185116 * Math.sin(M) -
    0.114332 * Math.sin(2 * F) +
    0.058793 * Math.sin(2 * D - 2 * Mp) +
    0.057066 * Math.sin(2 * D - M - Mp) +
    0.053322 * Math.sin(2 * D + Mp) +
    0.045758 * Math.sin(2 * D - M)
  return norm360(Lp + lon)
}

// Lahiri ayanamsa approximation
export function ayanamsa(jd) {
  const T = (jd - 2451545.0) / 36525
  return 23.85675 + 1.396042 * T * 0 + (50.2877 / 3600) * (jd - 2451545.0) / 365.25 + 0.000001
}

export function sidereal(lon, jd) {
  return norm360(lon - ayanamsa(jd))
}

export function panchang(date = new Date()) {
  const jd = julianDay(date)
  const sun = sunLongitude(jd)
  const moon = moonLongitude(jd)
  const diff = norm360(moon - sun)
  const tithiIdx = Math.floor(diff / 12)
  const paksha = tithiIdx < 15 ? 'Shukla Paksha' : 'Krishna Paksha'
  const moonSid = sidereal(moon, jd)
  const sunSid = sidereal(sun, jd)
  const nakIdx = Math.floor(moonSid / (360 / 27))
  const yogaIdx = Math.floor(norm360(moonSid + sunSid) / (360 / 27))
  const karanaIdx = Math.floor(diff / 6)
  const karana =
    karanaIdx === 0 ? 'Kimstughna'
    : karanaIdx >= 57 ? ['Shakuni', 'Chatushpada', 'Naga'][karanaIdx - 57] || 'Naga'
    : KARANAS[(karanaIdx - 1) % 7]
  const vara = ['Ravivar (Sunday)', 'Somvar (Monday)', 'Mangalvar (Tuesday)', 'Budhvar (Wednesday)', 'Guruvar (Thursday)', 'Shukravar (Friday)', 'Shanivar (Saturday)'][date.getDay()]
  // Rahu kaal segments (approx, using 6:00–18:00 day): index per weekday Sun..Sat
  const rahuSeg = [8, 2, 7, 5, 6, 4, 3][date.getDay()]
  const segStart = 6 + (rahuSeg - 1) * 1.5
  const fmt = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`
  return {
    tithi: TITHI_NAMES[tithiIdx],
    paksha,
    nakshatra: NAKSHATRAS[nakIdx],
    yoga: YOGAS[yogaIdx],
    karana,
    vara,
    moonRashi: RASHIS[Math.floor(moonSid / 30)],
    sunRashi: RASHIS[Math.floor(sunSid / 30)],
    rahuKaal: `${fmt(segStart)} – ${fmt(segStart + 1.5)}`,
  }
}

export function kundliSnapshot(dateOfBirth) {
  const jd = julianDay(dateOfBirth)
  const moonSid = sidereal(moonLongitude(jd), jd)
  const sunSid = sidereal(sunLongitude(jd), jd)
  const nakIdx = Math.floor(moonSid / (360 / 27))
  const pada = Math.floor((moonSid % (360 / 27)) / (360 / 108)) + 1
  return {
    moonRashi: RASHIS[Math.floor(moonSid / 30)],
    sunRashi: RASHIS[Math.floor(sunSid / 30)],
    nakshatra: NAKSHATRAS[nakIdx],
    pada,
    tithi: TITHI_NAMES[Math.floor(norm360(moonLongitude(jd) - sunLongitude(jd)) / 12)],
  }
}
