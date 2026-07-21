import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { POSTS, coverFor } from '../data/content.js'
import { useApi } from '../lib/api.js'
import { useSEO, breadcrumbs, SITE_URL } from '../lib/seo.js'

const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'blockquote']

// CMS posts may still hold legacy plain text (paragraphs separated by blank
// lines) alongside newer rich-text HTML from the Quill editor. Detect which
// one we have and render accordingly.
function isHtml(str) {
  return /<[a-z][\s\S]*>/i.test(str)
}

export default function BlogPost() {
  const { slug } = useParams()
  const fallback = POSTS.find((p) => p.slug === slug) || null
  const { data: post } = useApi(`/posts/${slug}`, fallback)
  const cover = post ? coverFor(post) : null

  // Timely posts (transit alerts, muhurta dates — flagged `is_news` in the
  // CMS) are marked up as NewsArticle for Google News; evergreen guides stay
  // BlogPosting, which is what they actually are.
  const isNews = Boolean(post?.is_news)
  const author = post?.author_name
    ? { '@type': 'Person', name: post.author_name }
    : { '@type': 'Organization', name: 'AstroVedansh', url: 'https://astrovedansh.org/' }

  useSEO({
    title: post ? post.title : 'Article not found',
    description: post?.excerpt || 'Astrology and numerology articles by AstroVedansh.',
    path: `/blog/${slug}`,
    type: 'article',
    image: cover,
    noindex: !post,
    jsonLd: post
      ? [
          {
            '@context': 'https://schema.org',
            '@type': isNews ? 'NewsArticle' : 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: [SITE_URL + cover],
            datePublished: post.date || post.published_at,
            ...(isNews && post.updated_at ? { dateModified: post.updated_at } : {}),
            author,
            publisher: { '@id': 'https://astrovedansh.org/#org' },
            mainEntityOfPage: `https://astrovedansh.org/blog/${slug}`,
            articleSection: post.category,
            inLanguage: 'en-IN',
          },
          breadcrumbs([['Home', '/'], ['Blog', '/blog'], [post.title, `/blog/${slug}`]]),
        ]
      : null,
  })

  if (!post) {
    return (
      <div className="container-av py-24 text-center">
        <h1 className="font-display text-4xl text-maroon-900">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-6">Back to Blog</Link>
      </div>
    )
  }

  const body = post.body || ''
  const richBody = isHtml(body)
  const paragraphs = richBody ? [] : body.split('\n').filter(Boolean)
  const cleanHtml = richBody ? DOMPurify.sanitize(body, { ALLOWED_TAGS }) : ''

  return (
    <>
      <section className="bg-maroon-800 py-16 text-center text-cream-100">
        <div className="container-av max-w-3xl">
          <p className="eyebrow !text-gold-400">
            {post.category}
            {isNews && <span className="ml-2 rounded-full border border-gold-400/50 px-2 py-0.5 text-[10px]">Timely</span>}
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-cream-100/70">
            {new Date(post.date || post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.author_name || 'AstroVedansh'}
          </p>
        </div>
      </section>
      <article className="section-pad !pt-0">
        <div className="container-av max-w-3xl">
          <img
            src={cover}
            alt={post.title}
            className="-mt-10 mb-10 aspect-[1200/630] w-full rounded-2xl border border-maroon-100 object-cover shadow-lg"
          />
          {richBody ? (
            <div className="article-content" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          ) : (
            <div className="space-y-5 text-base leading-relaxed text-maroon-950/85">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
          <div className="mt-8 rounded-2xl bg-cream-100 p-6 text-center">
            <p className="font-heading font-semibold text-maroon-900">Want this analysed for your own chart?</p>
            <Link to="/consultation" className="btn-primary mt-4">Book a Consultation</Link>
          </div>
          <Link to="/blog" className="mt-6 inline-block font-heading text-sm font-bold text-maroon-700">← All articles</Link>
        </div>
      </article>
    </>
  )
}
