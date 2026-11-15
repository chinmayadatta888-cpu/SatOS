import { satwiscapeArticles } from '../../config/satwiscape/articles'
import { satwiscapeSecretPages } from '../../config/satwiscape/easterEggs'
import { notFoundMessages, searchRules } from '../../config/satwiscape/searchConfig'
import { satwiscapePublications } from '../../config/satwiscape/publications'
import type { SatwiscapeArticle } from '../../config/satwiscape/types'

export type BrowserPage =
  | { kind: 'home' }
  | { kind: 'search'; query: string }
  | { kind: 'publication'; publicationId: string }
  | { kind: 'article'; articleId: string }
  | { kind: 'not-found'; attempted: string; query?: string; message: string }
  | { kind: 'secret'; secretId: string }

export type BrowserVisit = { id: string; page: BrowserPage; url: string; title: string; visitedAt: number; scrollTop: number }
export type BrowserTab = { id: string; history: BrowserVisit[]; cursor: number; loading: boolean }

let visitSequence = 0

export function getArticle(id: string): SatwiscapeArticle | undefined {
  return satwiscapeArticles.find((article) => article.id === id)
}

export function getPublication(id: string) {
  return satwiscapePublications.find((publication) => publication.id === id)
}

export function articleAddress(article: SatwiscapeArticle): string {
  const publication = getPublication(article.publicationId)
  return `satwiscape://${publication?.route ?? 'home'}/${article.slug}`
}

export function pageAddress(page: BrowserPage): string {
  if (page.kind === 'home') return 'satwiscape://home'
  if (page.kind === 'search') return `satwiscape://search?q=${encodeURIComponent(page.query)}`
  if (page.kind === 'publication') return `satwiscape://${getPublication(page.publicationId)?.route ?? 'home'}`
  if (page.kind === 'article') {
    const article = getArticle(page.articleId)
    return article ? articleAddress(article) : 'satwiscape://home'
  }
  if (page.kind === 'secret') return `satwiscape://secret/${getSecret(page.secretId)?.slug ?? page.secretId}`
  return `satwiscape://404?from=${encodeURIComponent(page.attempted)}`
}

export function pageTitle(page: BrowserPage): string {
  if (page.kind === 'home') return 'SatwiSearch Home'
  if (page.kind === 'search') return `Search: ${page.query}`
  if (page.kind === 'publication') return getPublication(page.publicationId)?.name ?? 'Satwiscape'
  if (page.kind === 'article') return getArticle(page.articleId)?.headline ?? 'Satwiscape'
  if (page.kind === 'secret') return getSecret(page.secretId)?.title ?? 'A hidden page'
  return '404 — Page not found'
}

export function createVisit(page: BrowserPage): BrowserVisit {
  visitSequence += 1
  return { id: `visit-${Date.now()}-${visitSequence}`, page, url: pageAddress(page), title: pageTitle(page), visitedAt: Date.now(), scrollTop: 0 }
}

export function createHomeTab(id: string): BrowserTab {
  return { id, history: [createVisit({ kind: 'home' })], cursor: 0, loading: false }
}

export function normalizeQuery(query: string): string {
  return query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ')
}

function getSecret(id: string) {
  return satwiscapeSecretPages.find((secret) => secret.id === id || secret.slug === id)
}

export function searchArticles(query: string): SatwiscapeArticle[] {
  const normalized = normalizeQuery(query)
  if (!normalized) return []
  const ignored = new Set(searchRules.ignoredWords)
  const tokens = normalized.split(' ').filter((word) => word.length >= searchRules.minimumTokenLength && !ignored.has(word))
  const terms = tokens.length ? tokens : [normalized]
  return satwiscapeArticles.filter((article) => {
    const publication = getPublication(article.publicationId)
    const content = normalizeQuery([
      article.headline, article.subtitle, article.summary, article.author, article.publicationDate,
      ...article.paragraphs, ...article.keywords, publication?.name ?? '',
    ].join(' '))
    const matched = terms.map((term) => content.includes(term))
    return searchRules.matchAllTokens ? matched.every(Boolean) : matched.some(Boolean)
  })
}

export function searchPage(query: string, messageIndex: number): BrowserPage {
  const normalized = normalizeQuery(query)
  const secret = satwiscapeSecretPages.find((entry) => entry.triggerPhrases.some((phrase) => normalizeQuery(phrase) === normalized))
  if (secret) return { kind: 'secret', secretId: secret.id }
  if (searchArticles(query).length > 0) return { kind: 'search', query: query.trim() }
  return {
    kind: 'not-found', attempted: query.trim() || 'an empty search', query: query.trim(),
    message: notFoundMessages[messageIndex % notFoundMessages.length],
  }
}

function notFoundPage(attempted: string, messageIndex: number, query?: string): BrowserPage {
  return { kind: 'not-found', attempted, query, message: notFoundMessages[messageIndex % notFoundMessages.length] }
}

/** Resolves only the controlled Satwiscape scheme. Other schemes become an in-app 404. */
export function resolveAddress(rawAddress: string, messageIndex: number): BrowserPage {
  const input = rawAddress.trim()
  if (!input) return { kind: 'home' }
  if (!/^satwiscape:\/\//i.test(input)) {
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(input)) return notFoundPage(input, messageIndex)
    return searchPage(input, messageIndex)
  }

  try {
    const url = new URL(input)
    const host = url.hostname.toLowerCase()
    const segments = url.pathname.split('/').filter(Boolean).map((part) => decodeURIComponent(part))
    if (host === 'home') return { kind: 'home' }
    if (host === 'search') return searchPage(url.searchParams.get('q') ?? '', messageIndex)
    if (host === '404') return notFoundPage(url.searchParams.get('from') ?? url.searchParams.get('query') ?? 'that address', messageIndex, url.searchParams.get('query') ?? undefined)
    if (host === 'secret') {
      const secret = getSecret(segments[0] ?? '')
      if (secret) return { kind: 'secret', secretId: secret.id }
      return notFoundPage(input, messageIndex)
    }
    if (host === 'article') {
      const article = satwiscapeArticles.find((entry) => entry.id === segments[0] || entry.slug === segments[0])
      if (article) return { kind: 'article', articleId: article.id }
      return notFoundPage(input, messageIndex)
    }

    const publication = satwiscapePublications.find((entry) => entry.route === host || entry.id === host)
    if (publication && segments.length === 0) return { kind: 'publication', publicationId: publication.id }
    if (publication && segments.length > 0) {
      const article = satwiscapeArticles.find((entry) => entry.publicationId === publication.id && entry.slug === segments[0])
      if (article) return { kind: 'article', articleId: article.id }
      return notFoundPage(input, messageIndex)
    }
    const directArticle = satwiscapeArticles.find((entry) => entry.slug === host)
    if (directArticle) return { kind: 'article', articleId: directArticle.id }
    return notFoundPage(input, messageIndex)
  } catch {
    return notFoundPage(input, messageIndex)
  }
}

export function articleForVisit(visit: BrowserVisit | undefined): SatwiscapeArticle | undefined {
  return visit?.page.kind === 'article' ? getArticle(visit.page.articleId) : undefined
}
