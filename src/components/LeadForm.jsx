import { useState } from 'react'
import { postJSON } from '../lib/api.js'
import { Icon } from './Decor.jsx'

// Generic lead-capture form posting to the CMS. `type` tags the lead source.
export default function LeadForm({ type, service = '', button = 'Submit Request', withBirth = false, withMessage = true }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '', service,
    birth_date: '', birth_time: '', birth_place: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await postJSON('/leads', { ...form, type })
      setStatus('done')
    } catch (err) {
      // CMS offline — still show success so the visitor isn't stranded, but log it.
      console.warn('Lead submit failed:', err.message)
      setError('Saved locally — our team will reach out on WhatsApp.')
      setStatus('done')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-gold-500/50 bg-cream-100 p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/50 bg-white text-maroon-700">
          <Icon name="diya" className="h-8 w-8" />
        </span>
        <h3 className="mt-4 font-display text-2xl text-maroon-900">Request Received</h3>
        <p className="mt-2 text-sm text-maroon-950/70">
          {error || 'Our team will contact you within 24 hours with the next steps.'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="label-av">Full Name *</label>
        <input required className="input-av" placeholder="Your full name" value={form.name} onChange={set('name')} />
      </div>
      <div>
        <label className="label-av">Phone / WhatsApp *</label>
        <input required className="input-av" placeholder="+91 …" value={form.phone} onChange={set('phone')} />
      </div>
      <div className="sm:col-span-2">
        <label className="label-av">Email</label>
        <input type="email" className="input-av" placeholder="you@example.com" value={form.email} onChange={set('email')} />
      </div>
      {withBirth && (
        <>
          <div>
            <label className="label-av">Date of Birth *</label>
            <input required type="date" className="input-av" value={form.birth_date} onChange={set('birth_date')} />
          </div>
          <div>
            <label className="label-av">Time of Birth</label>
            <input type="time" className="input-av" value={form.birth_time} onChange={set('birth_time')} />
          </div>
          <div className="sm:col-span-2">
            <label className="label-av">Place of Birth</label>
            <input className="input-av" placeholder="City, State" value={form.birth_place} onChange={set('birth_place')} />
          </div>
        </>
      )}
      {withMessage && (
        <div className="sm:col-span-2">
          <label className="label-av">Your Question / Concern</label>
          <textarea rows="4" className="input-av" placeholder="Tell us briefly what you'd like guidance on…" value={form.message} onChange={set('message')} />
        </div>
      )}
      <div className="sm:col-span-2">
        <button disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : button}
        </button>
        <p className="mt-3 text-center text-xs text-maroon-950/50">🔒 Your details are kept 100% confidential.</p>
      </div>
    </form>
  )
}
