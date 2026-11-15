import { useState, type CSSProperties, type FormEvent } from 'react'
import { satwiscapeArticles } from '../../config/satwiscape/articles'
import { satwiscapeSecretPages } from '../../config/satwiscape/easterEggs'
import { satwiscapePublications } from '../../config/satwiscape/publications'
import { trendingSearches } from '../../config/satwiscape/searchConfig'
import type { SatwiscapeArticle, Publication } from '../../config/satwiscape/types'
import { articleAddress, getPublication, searchArticles, type BrowserPage, type BrowserVisit } from './browserModel'

type PageActions = { onSearch: (query: string) => void; onArticle: (articleId: string) => void; onPublication: (publicationId: string) => void; onHome: () => void; onBack: () => void }

function SearchLogo() {
  return <div className="satwise-logo" aria-label="SatwiSearch">
    <svg viewBox="0 0 72 60" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="10" y="8" width="43" height="35" fill="#fff5d6" stroke="#463a55" strokeWidth="4" />
      <rect x="17" y="15" width="29" height="20" fill="#c8e7df" />
      <path d="M17 30l10-9 7 6 6-5 6 6v7H17z" fill="#70a97b" />
      <rect x="23" y="21" width="6" height="6" fill="#f1c85e" />
      <path d="M40 33l20 19-6 6-20-20z" fill="#d88791" stroke="#463a55" strokeWidth="3" />
      <rect x="6" y="44" width="42" height="5" fill="#7f647d" />
      <rect x="22" y="49" width="13" height="5" fill="#7f647d" />
      <rect x="58" y="7" width="6" height="6" fill="#e7b85a" />
      <rect x="61" y="13" width="5" height="5" fill="#e7b85a" />
    </svg>
    <span>SATWI<span>SEARCH</span></span>
  </div>
}

function SearchMascot() {
  return <svg className="satwise-mascot" viewBox="0 0 112 88" aria-hidden="true" shapeRendering="crispEdges">
    <path d="M24 22h47v38H24z" fill="#8fc8c3" stroke="#493c56" strokeWidth="4" />
    <rect x="32" y="30" width="31" height="18" fill="#d7eff0" />
    <rect x="39" y="35" width="6" height="6" fill="#f1c85e" />
    <path d="M33 46l9-8 7 7 6-5 8 6v3H33z" fill="#699a75" />
    <path d="M47 22V12h17V7h10v9H64v6" fill="none" stroke="#493c56" strokeWidth="4" />
    <rect x="70" y="3" width="13" height="11" fill="#f2ca67" stroke="#493c56" strokeWidth="3" />
    <rect x="18" y="61" width="58" height="8" fill="#ce8990" stroke="#493c56" strokeWidth="3" />
    <rect x="30" y="69" width="8" height="9" fill="#735c74" /><rect x="57" y="69" width="8" height="9" fill="#735c74" />
    <path d="M83 47l18 18-5 5-18-18z" fill="#d88a91" stroke="#493c56" strokeWidth="3" />
    <circle cx="79" cy="43" r="11" fill="#fff3d2" stroke="#493c56" strokeWidth="4" />
    <rect x="76" y="40" width="6" height="6" fill="#7ca6a0" />
  </svg>
}

function HomePage({ onSearch, onArticle }: Pick<PageActions, 'onSearch' | 'onArticle'>) {
  const [query, setQuery] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); onSearch(query) }
  return <div className="sw-site sw-home-page">
    <div className="sw-page-paper">
      <div className="sw-home-masthead"><span>THE LITTLE INTERNET STARTS HERE</span><span>LINKS: ALL CLEAR <i aria-hidden="true" /></span></div>
      <section className="sw-search-hero">
        <SearchMascot />
        <SearchLogo />
        <p className="sw-home-tagline">Finding things. Occasionally finding Satwika.</p>
        <form className="sw-search-form" onSubmit={submit} role="search">
          <label className="sw-visually-hidden" htmlFor="satwiscape-home-search">Search the Satwiscape</label>
          <input id="satwiscape-home-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the little internet…" />
          <button type="submit">Search</button>
        </form>
        <div className="sw-search-hint"><span className="sw-spark-pixel" aria-hidden="true">✦</span> Try a trending search or wander around.</div>
      </section>

      <div className="sw-home-utility"><span className="sw-utility-dot" /> Internet weather <strong>Mostly sunny, with scattered pixels</strong><span className="sw-visitor-counter">VISITORS <b>00057</b></span></div>

      <section className="sw-trending-section" aria-labelledby="sw-trending-title">
        <div className="sw-section-title"><span className="sw-section-star" aria-hidden="true">✦</span><h2 id="sw-trending-title">TRENDING SEARCHES</h2><span className="sw-section-rule" /></div>
        <div className="sw-trending-list">{trendingSearches.map((trend, index) => <button key={trend} type="button" onClick={() => onSearch(trend)}><span>{String(index + 1).padStart(2, '0')}</span>{trend}<b aria-hidden="true">↗</b></button>)}</div>
      </section>

      <section className="sw-featured-section" aria-labelledby="sw-featured-title">
        <div className="sw-section-title"><span className="sw-section-star" aria-hidden="true">✦</span><h2 id="sw-featured-title">FRESH FROM THE FICTIONAL PRESS</h2><span className="sw-section-rule" /></div>
        <div className="sw-feature-grid">{satwiscapeArticles.map((article) => <ArticleCard key={article.id} article={article} onOpen={() => onArticle(article.id)} />)}</div>
      </section>
      <footer className="sw-site-footer"><span>SATWISEARCH • A FICTIONAL LITTLE SEARCH ENGINE</span><span>BEST VIEWED WITH A LITTLE CURIOSITY</span></footer>
    </div>
  </div>
}

function PublicationMasthead({ publication }: { publication: Publication }) {
  return <header className={`sw-publication-masthead pub-theme-${publication.theme}`} style={{ '--publication-accent': publication.accent, '--publication-banner': publication.bannerColor } as CSSProperties}>
    <span className="sw-publication-mark" aria-hidden="true">{publication.theme === 'birthday' ? '✦' : publication.theme === 'pixel' ? '▦' : publication.theme === 'chronicle' ? '❧' : '▤'}</span>
    <div><span className="sw-publication-kicker">A FICTIONAL PUBLICATION</span><h1>{publication.name}</h1><p>{publication.tagline}</p></div>
  </header>
}

function ArticleCard({ article, onOpen }: { article: SatwiscapeArticle; onOpen: () => void }) {
  const publication = getPublication(article.publicationId)
  return <button type="button" className={`sw-article-card pub-theme-${publication?.theme ?? 'daily'}`} style={publication ? { '--publication-accent': publication.accent } as CSSProperties : undefined} onClick={onOpen}>
    <span className="sw-card-image"><img src={article.thumbnailPath} alt="" loading="lazy" /><span className="sw-card-stamp">FICTION</span></span>
    <span className="sw-card-copy"><small>{publication?.name ?? 'Satwiscape'}</small><strong>{article.headline}</strong><span>{article.summary}</span><em>Read the story <b aria-hidden="true">→</b></em></span>
  </button>
}

function PublicationPage({ publicationId, onArticle }: { publicationId: string; onArticle: PageActions['onArticle'] }) {
  const publication = satwiscapePublications.find((item) => item.id === publicationId) ?? satwiscapePublications[0]
  const articles = satwiscapeArticles.filter((article) => article.publicationId === publication.id)
  return <div className={`sw-site sw-publication-page pub-theme-${publication.theme}`} style={{ '--publication-accent': publication.accent } as CSSProperties}>
    <div className="sw-page-paper"><PublicationMasthead publication={publication} />
      <div className="sw-pub-section-label"><span>LATEST EDITION</span><i /><span>ALL STORIES ARE FICTIONAL</span></div>
      {articles.map((article) => <button className="sw-publication-story" key={article.id} type="button" style={{ '--publication-accent': publication.accent } as CSSProperties} onClick={() => onArticle(article.id)}>
        <img src={article.thumbnailPath} alt="" loading="lazy" />
        <span><small>By {article.author} · {article.byline}</small><strong>{article.headline}</strong>{article.subtitle && <em>{article.subtitle}</em>}<b>Continue reading →</b></span>
      </button>)}
      {articles.length === 0 && <p className="sw-empty-publication">This publication is preparing its first edition.</p>}
      <footer className="sw-site-footer"><span>{publication.name.toUpperCase()}</span><span>INDEPENDENTLY IMAGINARY SINCE TODAY</span></footer>
    </div>
  </div>
}

function ArticlePage({ articleId, onArticle, onPublication, onHome }: { articleId: string; onArticle: PageActions['onArticle']; onPublication: PageActions['onPublication']; onHome: PageActions['onHome'] }) {
  const article = satwiscapeArticles.find((item) => item.id === articleId) ?? satwiscapeArticles[0]
  const publication = getPublication(article.publicationId) ?? satwiscapePublications[0]
  const related = article.relatedArticleIds.map((id) => satwiscapeArticles.find((item) => item.id === id)).filter((item): item is SatwiscapeArticle => Boolean(item))
  return <div className={`sw-site sw-article-page pub-theme-${publication.theme}`} style={{ '--publication-accent': publication.accent } as CSSProperties}>
    <div className="sw-page-paper">
      <div className="sw-article-nav"><button type="button" onClick={() => onPublication(publication.id)}>← {publication.name}</button><span>FEATURED STORY</span></div>
      <article className="sw-editorial">
        <PublicationMasthead publication={publication} />
        <div className="sw-article-content">
          <span className="sw-fiction-label">FICTIONAL NEWS • FOR FUN</span>
          <h1>{article.headline}</h1>
          {article.subtitle && <p className="sw-article-subtitle">{article.subtitle}</p>}
          <div className="sw-article-byline"><span>By <strong>{article.author}</strong><small>{article.byline}</small></span>{article.publicationDate && <time>{article.publicationDate}</time>}</div>
          <figure className="sw-article-figure"><img src={article.mainImagePath} alt="Pixel-art illustration for this fictional article" /><figcaption>A tiny illustration from the {publication.name} art desk.</figcaption></figure>
          <p className="sw-article-lede">{article.summary}</p>
          <div className="sw-article-body">{article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          <div className="sw-fiction-notice"><strong>THE SATWISCAPE FICTION DESK</strong><span>This is a playful fictional story. It is not real news, research, reporting, or medical advice.</span></div>
        </div>
      </article>
      <section className="sw-related-stories"><div className="sw-section-title"><span className="sw-section-star" aria-hidden="true">✦</span><h2>RELATED STORIES</h2><span className="sw-section-rule" /></div>
        <div className="sw-related-list">{related.map((item) => <button key={item.id} type="button" onClick={() => onArticle(item.id)}><span>{getPublication(item.publicationId)?.name}</span><strong>{item.headline}</strong><b aria-hidden="true">→</b></button>)}</div>
      </section>
      <footer className="sw-site-footer"><button type="button" onClick={onHome}>SatwiSearch Home</button><button type="button" onClick={() => onPublication(publication.id)}>More from {publication.name}</button><button type="button" onClick={() => onArticle(satwiscapeArticles[0].id)}>Read the front page story</button></footer>
    </div>
  </div>
}

function SearchResultsPage({ query, onArticle }: { query: string; onArticle: PageActions['onArticle'] }) {
  const results = searchArticles(query)
  return <div className="sw-site sw-results-page"><div className="sw-page-paper">
    <header className="sw-results-heading"><span className="sw-results-mark">S</span><div><span>SATWISEARCH RESULTS</span><h1>Looking for “{query}”</h1><p>{results.length} {results.length === 1 ? 'story' : 'stories'} found in the little internet</p></div></header>
    <ol className="sw-result-list">{results.map((article) => {
      const publication = getPublication(article.publicationId)
      return <li key={article.id}><button type="button" onClick={() => onArticle(article.id)}>
        <span className="sw-result-address">{articleAddress(article)}</span><strong>{article.headline}</strong><span className="sw-result-publication">{publication?.name}</span><p>{article.summary}</p><small>Open story <b aria-hidden="true">→</b></small>
      </button></li>
    })}</ol>
    <div className="sw-results-tip"><span aria-hidden="true">✦</span> Search results are hand-picked from fictional Satwiscape pages.</div>
    <footer className="sw-site-footer"><span>SEARCHED THE LOCAL SATWISCAPE INDEX</span><span>NO OUTSIDE WEB PAGES</span></footer>
  </div></div>
}

function ErrorIllustration() {
  return <svg className="sw-error-art" viewBox="0 0 150 122" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="18" y="10" width="104" height="81" fill="#fff5d9" stroke="#493c57" strokeWidth="5"/><rect x="27" y="20" width="86" height="62" fill="#b6dce4"/>
    <rect x="48" y="39" width="44" height="31" fill="#f6e5bf" stroke="#493c57" strokeWidth="4"/><rect x="57" y="47" width="8" height="8" fill="#bf7385"/><rect x="76" y="47" width="8" height="8" fill="#bf7385"/><path d="M58 64h27v5H58z" fill="#816c80"/>
    <rect x="33" y="93" width="74" height="8" fill="#6b5b75"/><rect x="53" y="101" width="36" height="8" fill="#6b5b75"/><rect x="17" y="42" width="7" height="7" fill="#e6bc56"/><rect x="118" y="31" width="8" height="8" fill="#d88091"/>
  </svg>
}

function NotFoundPage({ page, onSearch, onHome, onBack, canGoBack }: { page: Extract<BrowserPage, { kind: 'not-found' }>; onSearch: PageActions['onSearch']; onHome: PageActions['onHome']; onBack: PageActions['onBack']; canGoBack: boolean }) {
  const [query, setQuery] = useState(page.query ?? '')
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); onSearch(query) }
  return <div className="sw-site sw-notfound-page"><div className="sw-page-paper">
    <section className="sw-notfound-card"><ErrorIllustration /><span className="sw-notfound-code">404 — PAGE NOT FOUND</span><h1>Oops, this page wandered off.</h1><p>{page.message}</p>
      <small>We tried to visit <code>{page.attempted}</code> inside the Satwiscape, but that address isn't here.</small>
      <form className="sw-search-form sw-search-again" role="search" onSubmit={submit}><label className="sw-visually-hidden" htmlFor="satwiscape-404-search">Search again</label><input id="satwiscape-404-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try another search…"/><button type="submit">Search again</button></form>
      <div className="sw-error-actions"><button type="button" disabled={!canGoBack} onClick={onBack}>← Back</button><button type="button" onClick={onHome}>Go home</button></div>
    </section>
    <footer className="sw-site-footer"><span>SATWISEARCH ERROR DESK</span><span>THE LITTLE INTERNET IS STILL OKAY</span></footer>
  </div></div>
}

function SecretIllustration({ kind }: { kind: 'birthday' | 'discovery' | 'mystery' }) {
  if (kind === 'birthday') return <svg className="sw-secret-art" viewBox="0 0 130 100" aria-hidden="true" shapeRendering="crispEdges"><path d="M26 61h78v24H26z" fill="#e88f9e" stroke="#513c57" strokeWidth="4"/><path d="M35 44h60v19H35z" fill="#ffe19a" stroke="#513c57" strokeWidth="4"/><path d="M43 38V23l5-7 5 7v15m15 0V15l5-7 5 7v23m15 0V23l5-7 5 7v15" fill="#78a998" stroke="#513c57" strokeWidth="3"/><rect x="28" y="28" width="8" height="8" fill="#7bb5d5"/><rect x="98" y="34" width="8" height="8" fill="#d58ab1"/><rect x="18" y="51" width="7" height="7" fill="#efc15d"/></svg>
  if (kind === 'discovery') return <svg className="sw-secret-art" viewBox="0 0 130 100" aria-hidden="true" shapeRendering="crispEdges"><path d="M65 8l11 20 23 4-17 16 4 23-21-11-21 11 4-23-17-16 23-4z" fill="#f3d06f" stroke="#4d4058" strokeWidth="4"/><rect x="53" y="41" width="7" height="7" fill="#fff6d8"/><rect x="69" y="41" width="7" height="7" fill="#fff6d8"/><path d="M55 57h22v5H55z" fill="#bf7385"/><rect x="24" y="76" width="82" height="10" fill="#7d6583"/></svg>
  return <svg className="sw-secret-art" viewBox="0 0 130 100" aria-hidden="true" shapeRendering="crispEdges"><rect x="26" y="20" width="78" height="59" fill="#263e5a" stroke="#493e57" strokeWidth="4"/><rect x="35" y="29" width="60" height="40" fill="#d1e5df"/><path d="M40 58l12-12 9 8 8-14 20 23v6H40z" fill="#779e87"/><rect x="77" y="35" width="7" height="7" fill="#f2cf72"/><path d="M53 79v10H43v5h45v-5H78V79" fill="#79647c"/><rect x="14" y="35" width="6" height="6" fill="#d5899e"/><rect x="111" y="49" width="6" height="6" fill="#efc15d"/></svg>
}

function SecretPage({ secretId, onHome }: { secretId: string; onHome: PageActions['onHome'] }) {
  const secret = satwiscapeSecretPages.find((item) => item.id === secretId) ?? satwiscapeSecretPages[0]
  return <div className={`sw-site sw-secret-page sw-secret-${secret.illustration}`}><div className="sw-page-paper">
    <section className="sw-secret-card"><span className="sw-secret-kicker">{secret.kicker}</span><SecretIllustration kind={secret.illustration}/><h1>{secret.title}</h1>{secret.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<button type="button" onClick={onHome}>← Return to SatwiSearch</button></section>
    <footer className="sw-site-footer"><span>YOU FOUND A HIDDEN PAGE</span><span>KEEP IT BETWEEN YOU AND THE PIXELS</span></footer>
  </div></div>
}

export default function SatwiscapePageView({ visit, onSearch, onArticle, onPublication, onHome, onBack, canGoBack }: { visit: BrowserVisit; onSearch: PageActions['onSearch']; onArticle: PageActions['onArticle']; onPublication: PageActions['onPublication']; onHome: PageActions['onHome']; onBack: PageActions['onBack']; canGoBack: boolean }) {
  const page = visit.page
  if (page.kind === 'home') return <HomePage onSearch={onSearch} onArticle={onArticle} />
  if (page.kind === 'search') return <SearchResultsPage query={page.query} onArticle={onArticle} />
  if (page.kind === 'publication') return <PublicationPage publicationId={page.publicationId} onArticle={onArticle} />
  if (page.kind === 'article') return <ArticlePage articleId={page.articleId} onArticle={onArticle} onPublication={onPublication} onHome={onHome} />
  if (page.kind === 'secret') return <SecretPage secretId={page.secretId} onHome={onHome} />
  return <NotFoundPage page={page} onSearch={onSearch} onHome={onHome} onBack={onBack} canGoBack={canGoBack} />
}
