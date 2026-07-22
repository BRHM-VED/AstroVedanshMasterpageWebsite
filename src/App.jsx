import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useLayoutEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import Home from './pages/Home.jsx'

// Every other route is code-split — a visitor to e.g. /contact only downloads
// the Contact chunk (plus the small shared vendor/router chunk) instead of
// all 18 pages' JS in one bundle. Home stays eagerly imported since it's the
// most common landing page and shouldn't show a loading flash.
const Consultation = lazy(() => import('./pages/Consultation.jsx'))
const KundliCalculator = lazy(() => import('./pages/KundliCalculator.jsx'))
const DailyHoroscope = lazy(() => import('./pages/DailyHoroscope.jsx'))
const YearlyHoroscope = lazy(() => import('./pages/YearlyHoroscope.jsx'))
const Numerology = lazy(() => import('./pages/Numerology.jsx'))
const PujaServices = lazy(() => import('./pages/PujaServices.jsx'))
const AskAstrologer = lazy(() => import('./pages/AskAstrologer.jsx'))
const Shop = lazy(() => import('./pages/Shop.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Panchang = lazy(() => import('./pages/Panchang.jsx'))
const Legal = lazy(() => import('./pages/Legal.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname, search } = useLocation()
  // `behavior: 'instant'` explicitly overrides the global CSS
  // `scroll-behavior: smooth` (index.css), which otherwise turns this into
  // an animated scroll that later layout shifts (async data/images) can
  // freeze partway through, landing the visitor mid-page after navigation.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/free-kundli-calculator" element={<KundliCalculator />} />
            <Route path="/horoscope/daily" element={<DailyHoroscope />} />
            <Route path="/horoscope/2026" element={<YearlyHoroscope />} />
            <Route path="/numerology-report" element={<Numerology />} />
            <Route path="/online-puja-services" element={<PujaServices />} />
            <Route path="/ask-astrologer" element={<AskAstrologer />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/panchang" element={<Panchang />} />
            <Route path="/privacy-policy" element={<Legal kind="privacy" />} />
            <Route path="/terms" element={<Legal kind="terms" />} />
            <Route path="/refund-policy" element={<Legal kind="refund" />} />
            <Route path="/corrections-policy" element={<Legal kind="corrections" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
