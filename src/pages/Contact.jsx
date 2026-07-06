import { PageHero } from '../components/Section.jsx'
import { IconBadge } from '../components/Decor.jsx'
import LeadForm from '../components/LeadForm.jsx'
import { SITE } from '../data/content.js'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're Listening"
        sub="Questions about a report, an order, or which service fits you best — reach out any way you like."
      />
      <section className="section-pad">
        <div className="container-av grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            {[
              ['mail', 'Email', SITE.email, `mailto:${SITE.email}`],
              ['chat', 'WhatsApp', 'Chat with our team', `https://wa.me/${SITE.whatsapp}`],
              ['play', 'YouTube', '@Astrovedansh', SITE.social.youtube],
              ['camera', 'Instagram', '@astro_vedansh', SITE.social.instagram],
            ].map(([icon, title, text, href]) => (
              <a key={title} href={href} target="_blank" rel="noreferrer" className="card flex items-center gap-4 !p-5">
                <IconBadge icon={icon} size="sm" />
                <span>
                  <span className="block font-heading font-bold text-maroon-900">{title}</span>
                  <span className="text-sm text-maroon-950/70">{text}</span>
                </span>
              </a>
            ))}
            <p className="text-sm text-maroon-950/60">
              Support hours: 10:00 AM – 7:00 PM IST, Monday to Saturday. Report queries are answered within 24 hours.
            </p>
          </div>
          <div className="rounded-3xl border border-maroon-100 bg-white p-8 shadow-lg">
            <h2 className="mb-6 font-display text-3xl text-maroon-900">Send a Message</h2>
            <LeadForm type="contact" button="Send Message" />
          </div>
        </div>
      </section>
    </>
  )
}
