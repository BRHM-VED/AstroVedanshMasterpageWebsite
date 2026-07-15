import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import Home from './pages/Home.jsx'
import Consultation from './pages/Consultation.jsx'
import KundliCalculator from './pages/KundliCalculator.jsx'
import DailyHoroscope from './pages/DailyHoroscope.jsx'
import YearlyHoroscope from './pages/YearlyHoroscope.jsx'
import Numerology from './pages/Numerology.jsx'
import PujaServices from './pages/PujaServices.jsx'
import AskAstrologer from './pages/AskAstrologer.jsx'
import Shop from './pages/Shop.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Panchang from './pages/Panchang.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname, search])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
