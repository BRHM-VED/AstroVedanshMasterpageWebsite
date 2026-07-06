import { SITE } from '../data/content.js'

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=Namaste%20AstroVedansh%2C%20I%20would%20like%20a%20consultation.`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white">
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 4.7 1.6 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm5.9 16.6c-.3.8-1.5 1.5-2.4 1.7-.6.1-1.5.2-4.3-.9-3.6-1.5-5.9-5.1-6.1-5.4-.2-.2-1.4-1.9-1.4-3.7s.9-2.6 1.3-3c.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6l1.1 2.7c.1.2.2.5 0 .7l-.4.7-.6.7c-.2.2-.4.4-.2.8.2.3 1 1.7 2.2 2.7 1.5 1.4 2.8 1.8 3.2 2 .4.2.6.1.8-.1l1.3-1.5c.3-.3.5-.3.9-.2l2.5 1.2c.4.2.6.3.7.5.1.1.1.9-.2 1.6z" />
      </svg>
    </a>
  )
}
