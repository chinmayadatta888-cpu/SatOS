export type Publication = {
  id: string
  name: string
  route: string
  tagline: string
  theme: string
  accent: string
  bannerColor: string
}

export type SatwiscapeArticle = {
  id: string
  slug: string
  publicationId: string
  headline: string
  subtitle: string
  author: string
  publicationDate: string
  thumbnailPath: string
  mainImagePath: string
  summary: string
  paragraphs: string[]
  relatedArticleIds: string[]
  keywords: string[]
}

export type SecretPage = {
  id: string
  slug: string
  triggerPhrases: string[]
  title: string
  kicker: string
  paragraphs: string[]
  illustration: 'birthday' | 'discovery' | 'mystery'
}
