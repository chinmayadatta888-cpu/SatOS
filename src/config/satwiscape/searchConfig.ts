/** Homepage suggestions and custom no-results copy are easy to replace here. */
export const trendingSearches = [
  'Junny Satwika OS',
  'blood volume clotting',
  'Deepak Satwika',
  'Dishen new policies',
]

export const notFoundMessages = [
  'Well, we looked everywhere. Even under the keyboard.',
  "This part of the internet hasn't been invented yet.",
  'No results. Maybe try searching for Satwika?',
  'The internet is confused. Give it a moment.',
  "Nothing here. But at least you're here.",
]

/** Tune matching without changing the search page renderer. Article aliases stay with each article. */
export const searchRules = {
  matchAllTokens: false,
  minimumTokenLength: 2,
  ignoredWords: ['the', 'and', 'for', 'is', 'are', 'to', 'of', 'a', 'an', 'how', 'why', 'what', 'does', 'about', 'with', 'one'],
}

export const satwiscapeSearchStorage = {
  bookmarks: 'satwiscape.bookmarks.v1',
  history: 'satwiscape.history.v1',
}
