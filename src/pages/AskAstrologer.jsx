import { PageHero } from '../components/Section.jsx'
import { useSEO } from '../lib/seo.js'
import LeadForm from '../components/LeadForm.jsx'

export default function AskAstrologer() {
  useSEO({
    title: 'Ask an Astrologer — One Question, One Honest Answer',
    description: 'Send one focused question about marriage, career, business or finance with your birth details and get a chart-based answer within 48 hours.',
    path: '/ask-astrologer',
  })
  return (
    <>
      <PageHero
        eyebrow="Ask the Astrologer"
        title="One Question. One Honest Answer."
        sub="Not ready for a full consultation? Send one specific question with your birth details and receive a chart-based reply within 48 hours."
      />
      <section className="section-pad">
        <div className="container-av grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-maroon-900">Good questions to ask</h2>
            {[
              'Is 2026 favourable for changing my job?',
              'When is marriage likely for me?',
              'Should I start my business this year or wait?',
              'Why do my savings never grow despite good income?',
              'Is this property purchase auspicious for my family?',
            ].map((q) => (
              <p key={q} className="rounded-2xl rounded-bl-sm border border-maroon-100 bg-white p-4 pl-5 text-sm text-maroon-950/80 shadow-sm">
                <span className="accent mr-1 text-lg text-gold-600">“</span>{q}<span className="accent ml-0.5 text-lg text-gold-600">”</span>
              </p>
            ))}
            <p className="text-sm text-maroon-950/60">
              The more specific your question, the sharper the answer. One submission covers one question.
            </p>
          </div>
          <div className="rounded-3xl border border-maroon-100 bg-white p-8 shadow-lg">
            <LeadForm type="ask_question" button="Send My Question" withBirth />
          </div>
        </div>
      </section>
    </>
  )
}
