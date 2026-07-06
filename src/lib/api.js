import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_API_BASE || '/api'

export async function getJSON(path, fallback = null) {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 4000)
    const res = await fetch(BASE + path, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
    clearTimeout(t)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    return json.data ?? json
  } catch {
    return fallback
  }
}

export async function postJSON(path, body) {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Request failed (${res.status})`)
  }
  return res.json()
}

// Fetch from the CMS API, falling back to bundled content when the API is offline.
export function useApi(path, fallback) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive = true
    getJSON(path, null).then((res) => {
      if (!alive) return
      if (res && (!Array.isArray(res) || res.length > 0)) setData(res)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [path])
  return { data, loading }
}
