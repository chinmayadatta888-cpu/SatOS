import type { Publication } from './types'

/** Final fictional publication identities and their internal satwiscape:// addresses. */
export const satwiscapePublications: Publication[] = [
  { id: 'daily-satwi', name: 'The Daily Satwi', route: 'daily-satwi', tagline: 'The little paper with the big headlines.', theme: 'daily', accent: '#ad574e', bannerColor: '#a9534b' },
  { id: 'satwi-science-journal', name: 'Satwi Science Journal', route: 'satwi-science-journal', tagline: 'A fictional desk for curious questions.', theme: 'pixel', accent: '#487caa', bannerColor: '#416f96' },
  { id: 'satwi-times', name: 'The Satwi Times', route: 'satwi-times', tagline: 'Letters and stories from the little internet.', theme: 'times', accent: '#327e80', bannerColor: '#347f80' },
  { id: 'satwika-chronicle', name: 'The Satwika Chronicle', route: 'satwika-chronicle', tagline: 'A thoughtful record of lovely things.', theme: 'chronicle', accent: '#7b637d', bannerColor: '#79647b' },
]
