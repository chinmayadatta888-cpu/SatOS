import type { Publication } from './types'

/** Fictional publication identities and their internal satwiscape:// addresses. */
export const satwiscapePublications: Publication[] = [
  { id: 'daily-satwi', name: 'The Daily Satwi', route: 'daily-satwi', tagline: 'The little paper with the big headlines.', theme: 'daily', accent: '#ad574e', bannerColor: '#a9534b' },
  { id: 'satwi-times', name: 'Satwi Times', route: 'satwi-times', tagline: 'Happiness, delivered by the minute.', theme: 'times', accent: '#327e80', bannerColor: '#347f80' },
  { id: 'birthday-bulletin', name: 'The Birthday Bulletin', route: 'birthday-bulletin', tagline: 'Special editions for very special days.', theme: 'birthday', accent: '#c26582', bannerColor: '#c36683' },
  { id: 'pixel-news', name: 'Pixel News', route: 'pixel-news', tagline: 'Bits, bytes, and other small wonders.', theme: 'pixel', accent: '#487caa', bannerColor: '#416f96' },
  { id: 'satwika-chronicle', name: 'The Satwika Chronicle', route: 'satwika-chronicle', tagline: 'A thoughtful record of lovely things.', theme: 'chronicle', accent: '#7b637d', bannerColor: '#79647b' },
]
