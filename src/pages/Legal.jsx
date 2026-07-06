import { PageHero } from '../components/Section.jsx'
import { SITE } from '../data/content.js'

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['Information We Collect', 'We collect the details you share with us to deliver our services: name, contact information, and birth details (date, time, place) required for astrological analysis. Payment details are processed by our payment partners and are never stored on our servers.'],
      ['How We Use Your Information', 'Your birth details are used solely to prepare your reports and consultations. Contact details are used to deliver reports, confirm bookings and share updates you have opted into. We never sell or rent your personal data to third parties.'],
      ['Confidentiality of Consultations', 'Everything discussed in a consultation stays between you and AstroVedansh. Testimonials and chat screenshots are published only with explicit client permission, with identifying details minimised.'],
      ['Data Retention & Your Rights', 'You may request a copy of the data we hold about you, or ask for its deletion, by writing to our support email. We retain order records only as long as required for accounting and legal compliance.'],
      ['Cookies & Analytics', 'Our website uses minimal cookies for basic functionality and anonymous analytics to improve the experience. No advertising trackers are used.'],
    ],
  },
  terms: {
    title: 'Terms & Policies',
    sections: [
      ['Nature of Services', 'Astrology and numerology services offered by AstroVedansh are guidance-oriented interpretations based on classical systems. They are not a substitute for professional medical, legal or financial advice.'],
      ['Accuracy of Birth Details', 'Predictions depend on the accuracy of the birth details you provide. AstroVedansh is not responsible for interpretive deviations arising from incorrect or approximate birth information.'],
      ['Bookings & Delivery', 'Consultation slots are confirmed after payment. Personalised reports are delivered digitally within the communicated timeline, typically 48 hours. Delays, if any, are communicated proactively.'],
      ['Intellectual Property', 'All reports, articles and content on this website are the intellectual property of AstroVedansh and may not be reproduced or resold without written permission.'],
      ['Conduct', 'We reserve the right to decline service in cases of abusive behaviour or misuse of our platforms.'],
    ],
  },
  refund: {
    title: 'Refund Policy',
    sections: [
      ['Reports', 'Orders for personalised reports can be cancelled for a full refund any time before work on your report begins. Once preparation has started, the order is non-refundable as each report is individually handcrafted.'],
      ['Consultations', 'Consultation bookings can be rescheduled up to 12 hours before the slot at no charge. Cancellations made at least 24 hours in advance receive a full refund; later cancellations receive a 50% refund.'],
      ['Pujas', 'Puja bookings can be cancelled for a full refund until the sankalp date is confirmed with the pandit. After confirmation, bookings can be rescheduled but not refunded.'],
      ['Products', 'Sacred tools and gemstones are checked and energised before dispatch. Damaged-in-transit items are replaced free of cost if reported with unboxing evidence within 48 hours of delivery.'],
      ['How to Claim', `Write to ${SITE.email} with your order details. Approved refunds are processed to the original payment method within 7–10 working days.`],
    ],
  },
}

export default function Legal({ kind }) {
  const page = CONTENT[kind]
  return (
    <>
      <PageHero title={page.title} />
      <section className="section-pad">
        <div className="container-av max-w-3xl space-y-8">
          {page.sections.map(([h, body]) => (
            <div key={h}>
              <h2 className="font-display text-2xl text-maroon-900">{h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-maroon-950/75">{body}</p>
            </div>
          ))}
          <p className="text-xs text-maroon-950/50">Last updated: July 2026 · For questions write to {SITE.email}</p>
        </div>
      </section>
    </>
  )
}
