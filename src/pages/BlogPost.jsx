import { Link, useParams } from 'react-router-dom'
import { POSTS } from '../data/content.js'
import { useApi } from '../lib/api.js'

export default function BlogPost() {
  const { slug } = useParams()
  const fallback = POSTS.find((p) => p.slug === slug) || null
  const { data: post } = useApi(`/posts/${slug}`, fallback)

  if (!post) {
    return (
      <div className="container-av py-24 text-center">
        <h1 className="font-display text-4xl text-maroon-900">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-6">Back to Blog</Link>
      </div>
    )
  }

  const paragraphs = (post.body || '').split('\n').filter(Boolean)
  return (
    <>
      <section className="bg-maroon-800 py-16 text-center text-cream-100">
        <div className="container-av max-w-3xl">
          <p className="eyebrow !text-gold-400">{post.category}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-cream-100/70">
            {new Date(post.date || post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · AstroVedansh
          </p>
        </div>
      </section>
      <article className="section-pad">
        <div className="container-av max-w-3xl space-y-5 text-base leading-relaxed text-maroon-950/85">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <div className="rounded-2xl bg-cream-100 p-6 text-center">
            <p className="font-heading font-semibold text-maroon-900">Want this analysed for your own chart?</p>
            <Link to="/consultation" className="btn-primary mt-4">Book a Consultation</Link>
          </div>
          <Link to="/blog" className="inline-block font-heading text-sm font-bold text-maroon-700">← All articles</Link>
        </div>
      </article>
    </>
  )
}
