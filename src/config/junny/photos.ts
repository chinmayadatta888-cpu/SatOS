import { junnyProfile } from './profile'

export type JunnyPhoto = {
  id: string
  image: string
  alt: string
  title: string
  caption: string
  note?: string
}

export const junnyPhotos: JunnyPhoto[] = [
  {
    id: 'official-portrait',
    image: junnyProfile.portrait,
    alt: 'Junny, a bright pink pixel-art teddy bear wearing a pink bow',
    title: 'Official mascot portrait',
    caption: 'The face of Satwika OS.',
    note: 'Employee JUN-001 · permanently on the team',
  },
]
