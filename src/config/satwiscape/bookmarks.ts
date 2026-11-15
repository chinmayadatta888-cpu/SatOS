export type SatwiscapeBookmark = { id: string; title: string; url: string }

/** Initial favourites. After first use, user edits are saved in localStorage. */
export const defaultSatwiscapeBookmarks: SatwiscapeBookmark[] = [
  { id: 'home', title: 'SatwiSearch Home', url: 'satwiscape://home' },
  { id: 'daily-satwi', title: 'The Daily Satwi', url: 'satwiscape://daily-satwi' },
  { id: 'satwi-science-journal', title: 'Satwi Science Journal', url: 'satwiscape://satwi-science-journal' },
  { id: 'satwi-times', title: 'The Satwi Times', url: 'satwiscape://satwi-times' },
  { id: 'satwika-chronicle', title: 'The Satwika Chronicle', url: 'satwiscape://satwika-chronicle' },
]
