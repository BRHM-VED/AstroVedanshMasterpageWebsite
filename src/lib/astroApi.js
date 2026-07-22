// Client for our own /api/astro/* proxy — the actual calculation engine
// (a third-party service) is never called from the browser; see
// cms/app/Http/Controllers/Api/AstroProxyController.php for the allowlist.
const BASE = import.meta.env.VITE_API_BASE || '/api'

export async function callAstro(path, body, { timeout = 12000 } = {}) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(`${BASE}/astro/${path}`, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`Astro API error (${res.status})`)
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}

export async function geocode(city, country) {
  return callAstro('utilities/geocode', { city, country })
}

export async function fetchPanchang({ year, month, day, hour = 6, minute = 0, latitude, longitude, timezone = 'Asia/Kolkata' }) {
  return callAstro('panchang/daily', { year, month, day, hour, minute, latitude, longitude, timezone })
}

export async function fetchRashi({ name, birth_year, birth_month, birth_day, birth_hour, birth_minute, latitude, longitude, timezone = 'Asia/Kolkata' }) {
  return callAstro('natal/rashi', { name, birth_year, birth_month, birth_day, birth_hour, birth_minute, latitude, longitude, timezone })
}

// The richer natal/vedic endpoints all share this nested birth_data shape
// (confirmed against the live API), unlike natal/rashi above.
function birthData({ name, birth_year, birth_month, birth_day, birth_hour, birth_minute, latitude, longitude, timezone = 'Asia/Kolkata' }) {
  return {
    birth_data: {
      name: name || 'Unknown',
      birth_year,
      birth_month,
      birth_day,
      birth_hour,
      birth_minute,
      latitude,
      longitude,
      timezone,
    },
  }
}

export async function fetchPlanets(params) {
  return callAstro('natal/planets', birthData(params))
}

export async function fetchHouses(params) {
  return callAstro('natal/houses', birthData(params))
}

export async function fetchDoshas(params) {
  return callAstro('vedic/doshas', birthData(params))
}

export async function fetchYogas(params) {
  return callAstro('vedic/yogas', birthData(params))
}

export async function fetchVimshottariDasha(params) {
  return callAstro('vedic/dashas/vimshottari', birthData(params))
}
