export type SatwiscapeBookmark = { id: string; title: string; url: string }

/** Initial favourites. After first use, user edits are saved in localStorage. */
export const defaultSatwiscapeBookmarks: SatwiscapeBookmark[] = [
  { id: 'home', title: 'SatwiSearch Home', url: 'satwiscape://home' },
  { id: 'daily-satwi', title: 'The Daily Satwi', url: 'satwiscape://daily-satwi' },
  { id: 'birthday-bulletin', title: 'Birthday Bulletin', url: 'satwiscape://birthday-bulletin' },
  { id: 'pixel-news', title: 'Pixel News', url: 'satwiscape://pixel-news' },
]
