import { Link } from 'react-router-dom'
import { Icon } from '../components/Decor.jsx'
import { useSEO } from '../lib/seo.js'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you were looking for does not exist on astrovedansh.org.',
    path: '/404',
    noindex: true,
  })
  return (
    <div className="container-av flex flex-col items-center py-28 text-center">
      <span className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/40 bg-cream-100 text-maroon-700">
        <Icon name="moon" className="h-12 w-12" />
      </span>
      <h1 className="mt-6 font-display text-5xl text-maroon-900">Page Not in the Stars</h1>
      <p className="mt-3 max-w-md text-maroon-950/70">
        The page you're looking for doesn't exist — but your path forward definitely does.
      </p>
      <Link to="/" className="btn-primary mt-8">Return Home</Link>
    </div>
  )
}
