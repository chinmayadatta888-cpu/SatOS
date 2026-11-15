/**
 * Photo album content lives here so gallery order and captions can be edited
 * without changing the Photos UI. All starter entries intentionally reuse the
 * same supplied portrait until individual images are added.
 *
 * To add a photo, copy its original file into public/assets/photos/, add one
 * entry below with a unique id and its public URL, then set its title, date,
 * caption, and optional description.
 */
export type PhotoEntry = {
  id: string
  src: string
  title: string
  date: string
  caption: string
  description?: string
}

const suppliedPortrait = '/assets/photos/satwika-main.png'

export const photoEntries: PhotoEntry[] = [
  { id: 'sunshine', src: suppliedPortrait, title: 'A little sunshine', date: 'November 16, 2026', caption: 'A smile that brightens the whole little world.', description: 'One of the loveliest faces in Satwika OS.' },
  { id: 'main-character', src: suppliedPortrait, title: 'Main character energy', date: 'November 12, 2026', caption: 'Every story gets a little brighter when she is in it.', description: 'A favourite frame, saved just for you.' },
  { id: 'satwika-things', src: suppliedPortrait, title: 'Just Satwika things', date: 'October 28, 2026', caption: 'All the little details that make this world yours.', description: 'A tiny reminder of a very big kind of magic.' },
  { id: 'favourite-frame', src: suppliedPortrait, title: 'A favourite frame', date: 'October 9, 2026', caption: 'A moment worth keeping close.', description: 'A warm little memory for the album.' },
  { id: 'certified-cuteness', src: suppliedPortrait, title: 'Certified cuteness', date: 'September 21, 2026', caption: 'Officially approved by the happiness department.', description: 'No further evidence is needed.' },
  { id: 'birthday-girl', src: suppliedPortrait, title: 'The birthday girl', date: 'November 16, 2026', caption: 'Today, the whole little world celebrates you.', description: 'The brightest day on the Satwika calendar.' },
  { id: 'beautiful-moment', src: suppliedPortrait, title: 'A beautiful moment', date: 'August 14, 2026', caption: 'Some moments feel like sunshine even later.', description: 'A quiet favourite from the album.' },
  { id: 'picture-perfect', src: suppliedPortrait, title: 'Picture perfect', date: 'July 30, 2026', caption: 'A lovely frame for a lovely person.', description: 'Saved with a little extra care.' },
  { id: 'one-in-a-million', src: suppliedPortrait, title: 'One in a million', date: 'June 18, 2026', caption: 'There is only one you, and that is the best part.', description: 'A one-of-a-kind kind of lovely.' },
  { id: 'little-happiness', src: suppliedPortrait, title: 'A little happiness', date: 'May 6, 2026', caption: 'A small picture with a lot of joy in it.', description: 'For the days that need a bright spot.' },
  { id: 'simply-her', src: suppliedPortrait, title: 'Simply her', date: 'April 23, 2026', caption: 'Nothing fancy. Just someone wonderful.', description: 'A favourite because it is you.' },
  { id: 'star-of-os', src: suppliedPortrait, title: 'The star of this OS', date: 'March 11, 2026', caption: 'This little world was made with you in mind.', description: 'The original inspiration for Satwika OS.' },
]
