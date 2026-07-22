// Analytics + error tracking, fully opt-in via env vars — with neither set,
// this does nothing at all (no script tags, no network calls, zero risk).
// Once real accounts exist, set the vars below and rebuild; no code change
// needed. Neither requires an npm install (both load from CDN), so this
// stays safe to ship even before anyone has signed up for either service.
//
//   VITE_PLAUSIBLE_DOMAIN=astrovedansh.org   (https://plausible.io — pageviews/funnels)
//   VITE_SENTRY_DSN=https://xxx@o0.ingest.sentry.io/0   (https://sentry.io — JS error tracking)

export function initObservability() {
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN

  if (plausibleDomain) {
    const s = document.createElement('script')
    s.defer = true
    s.dataset.domain = plausibleDomain
    s.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(s)
  }

  if (sentryDsn) {
    const loader = document.createElement('script')
    loader.src = 'https://browser.sentry-cdn.com/8.9.2/bundle.tracing.min.js'
    loader.crossOrigin = 'anonymous'
    loader.onload = () => {
      window.Sentry?.init({
        dsn: sentryDsn,
        tracesSampleRate: 0.1,
        environment: import.meta.env.MODE,
      })
    }
    document.head.appendChild(loader)
  }
}
