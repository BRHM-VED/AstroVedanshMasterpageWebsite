import { useEffect, useState } from 'react'
import { getJSON } from './api.js'
import { SITE as DEFAULT_SITE } from '../data/content.js'

// Live contact info (WhatsApp, email, social) is editable in the CMS admin
// without a frontend redeploy. Fetched once per page load and shared across
// every component that needs it — SITE from content.js is only the offline
// fallback for when the CMS is unreachable.
let cache = null
let inflight = null

function fetchOnce() {
  if (!inflight) {
    inflight = getJSON('/settings', null).then((data) => {
      cache = data
      return data
    })
  }
  return inflight
}

export function useSiteSettings() {
  const [live, setLive] = useState(cache)

  useEffect(() => {
    if (cache) return
    let alive = true
    fetchOnce().then((data) => {
      if (alive) setLive(data)
    })
    return () => {
      alive = false
    }
  }, [])

  return {
    ...DEFAULT_SITE,
    tagline: live?.tagline || DEFAULT_SITE.tagline,
    roles: DEFAULT_SITE.roles,
    email: live?.email || DEFAULT_SITE.email,
    whatsapp: live?.whatsapp || DEFAULT_SITE.whatsapp,
    social: {
      youtube: live?.youtube || DEFAULT_SITE.social.youtube,
      instagram: live?.instagram || DEFAULT_SITE.social.instagram,
    },
  }
}
