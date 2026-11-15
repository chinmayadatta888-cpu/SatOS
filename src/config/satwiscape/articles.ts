import type { SatwiscapeArticle } from './types'

/** All fictional news copy and local pixel illustration paths live here. */
export const satwiscapeArticles: SatwiscapeArticle[] = [
  {
    id: 'illegally-cute', slug: 'scientists-confirm-satwika-illegally-cute', publicationId: 'daily-satwi',
    headline: 'Scientists Confirm Satwika Is Illegally Cute', subtitle: 'A highly unofficial investigation reaches an extremely obvious conclusion.',
    author: 'Mira Pixel, Staff Reporter', publicationDate: 'November 16, 2026',
    thumbnailPath: '/assets/satwiscape/daily-satwi.svg', mainImagePath: '/assets/satwiscape/daily-satwi.svg',
    summary: 'A research team has reportedly spent several months investigating an unusual phenomenon. Their conclusion? The evidence is overwhelming.',
    paragraphs: [
      'A research team assembled from the Department of Very Important Questions has wrapped up its investigation into a curious local phenomenon. After reviewing a stack of notes, charts, and one suspiciously heart-shaped graph, the panel announced its findings.',
      '“The evidence is overwhelming,” said the team’s spokesperson, standing beside a chalkboard covered in tiny stars. The report carefully labels every result as fictional, though the researchers insist their enthusiasm is entirely genuine.',
      'The panel recommends that readers take a short break, drink some water, and remember that this is a small joke from a small corner of the internet. Its official conclusion remains: case closed, smile optional but encouraged.',
    ], relatedArticleIds: ['happiness-levels', 'servers-overloaded'], keywords: ['cute', 'scientists', 'research', 'satwika', 'smile'],
  },
  {
    id: 'happiness-levels', slug: 'local-girl-causes-happiness-levels-to-exceed-limits', publicationId: 'satwi-times',
    headline: 'Local Girl Causes Happiness Levels to Exceed Recommended Limits', subtitle: 'A cheerful report from the entirely fictional Department of Good Moods.',
    author: 'Dev Shah, Mood Correspondent', publicationDate: 'November 15, 2026',
    thumbnailPath: '/assets/satwiscape/satwi-times.svg', mainImagePath: '/assets/satwiscape/satwi-times.svg',
    summary: 'Residents report unusually high levels of happiness following repeated encounters with a certain individual.',
    paragraphs: [
      'Residents of a make-believe neighbourhood reported a surprising rise in good moods this week. The Department of Good Moods says the numbers are “pleasantly above average” and has issued a reminder to keep a little room in the day for laughter.',
      'Researchers stress that their chart is decorative and that no real survey took place. Still, the headline has inspired several readers to send kind notes to people they appreciate.',
      'The department has closed its investigation for now. Its final advice is refreshingly simple: share a compliment, enjoy a favourite song, and let the good mood keep going.',
    ], relatedArticleIds: ['illegally-cute', 'favourite-person'], keywords: ['happiness', 'local', 'mood', 'smile', 'satwika'],
  },
  {
    id: 'birthday-detected', slug: 'birthday-detected-cake-recommended', publicationId: 'birthday-bulletin',
    headline: 'Birthday Detected. Cake Consumption Recommended.', subtitle: 'A festive notice from the Bureau of Important Celebrations.',
    author: 'Pip Confetti, Celebration Desk', publicationDate: 'November 16, 2026',
    thumbnailPath: '/assets/satwiscape/birthday-bulletin.svg', mainImagePath: '/assets/satwiscape/birthday-bulletin.svg',
    summary: 'Authorities have issued an official recommendation for cake consumption following the detection of a particularly important birthday.',
    paragraphs: [
      'The Bureau of Important Celebrations has issued its most cheerful notice of the season: a birthday has been detected. Officials recommend a generous helping of cake, a little music, and at least one moment to enjoy the day.',
      'The bulletin is a fictional celebration card rather than a real notice. Its illustrated cake contains no calories, but readers are welcome to find a real treat if one is nearby.',
      'Festivities may continue for as long as the birthday person likes. The bureau has no rules about candles, party hats, or having a quiet and cozy celebration instead.',
    ], relatedArticleIds: ['servers-overloaded', 'favourite-person'], keywords: ['birthday', 'cake', 'celebration', 'bulletin', 'november'],
  },
  {
    id: 'servers-overloaded', slug: 'internet-struggles-to-process-one-persons-cuteness', publicationId: 'pixel-news',
    headline: "Internet Struggles to Process One Person's Cuteness", subtitle: 'A fictional network alert says the tiny servers need a moment.',
    author: 'Byte Finch, Technology Desk', publicationDate: 'November 14, 2026',
    thumbnailPath: '/assets/satwiscape/pixel-news.svg', mainImagePath: '/assets/satwiscape/pixel-news.svg',
    summary: 'Several fictional internet servers have experienced temporary difficulties while attempting to calculate an unreasonable amount of cuteness.',
    paragraphs: [
      'A handful of imaginary servers displayed a pixelated loading bar after being asked to calculate an unreasonable amount of cuteness. Technicians responded by giving the computers a short breather and a cup of pretend tea.',
      'The network is back online. No actual systems were affected, and the alert is part of this fictional article collection. Readers can safely continue browsing at their own delightfully leisurely pace.',
      'The support team recommends turning the page off and on again, then remembering that the best things on the internet are often the small, kind ones.',
    ], relatedArticleIds: ['birthday-detected', 'illegally-cute'], keywords: ['internet', 'servers', 'pixel', 'technology', 'cute', 'loading'],
  },
  {
    id: 'favourite-person', slug: 'mysterious-girl-continues-being-everyones-favourite', publicationId: 'satwika-chronicle',
    headline: "Mysterious Girl Continues Being Everyone's Favourite", subtitle: 'Some stories are best left with a little sparkle around the edges.',
    author: 'A. Quill, Chronicle Editor', publicationDate: 'November 12, 2026',
    thumbnailPath: '/assets/satwiscape/satwika-chronicle.svg', mainImagePath: '/assets/satwiscape/satwika-chronicle.svg',
    summary: 'Despite extensive investigation, experts remain unable to explain how one person can make ordinary moments feel extraordinary.',
    paragraphs: [
      'The Chronicle’s fictional editors have spent an afternoon looking for a tidy explanation for why some people make ordinary moments feel a little brighter. Their notebook is full of thoughtful guesses, small stars, and one drawing of a teacup.',
      'No definitive answer was found, and perhaps that is fine. Some good things are easier to appreciate than to explain.',
      'This is a playful tribute written for a fictional little internet. It makes no claims about real investigations or real experts; it simply invites the reader to notice the small moments that make a day feel special.',
    ], relatedArticleIds: ['happiness-levels', 'birthday-detected'], keywords: ['mysterious', 'favourite', 'ordinary', 'extraordinary', 'chronicle'],
  },
]
