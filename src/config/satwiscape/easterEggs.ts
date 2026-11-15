import type { SecretPage } from './types'

/** Exact, hidden search phrases and pages. They are intentionally not shown on the homepage. */
export const satwiscapeSecretPages: SecretPage[] = [
  {
    id: 'birthday-signal', slug: 'birthday-signal', triggerPhrases: ['cake protocol', 'birthday signal'],
    title: 'Birthday Signal Received!', kicker: 'A little celebration found you', illustration: 'birthday',
    paragraphs: ['The party desk has received your secret signal.', 'Please accept this tiny pixel cake as a thank-you for exploring. It is entirely fictional and has an infinite supply of pretend frosting.'],
  },
  {
    id: 'pixel-explorer', slug: 'pixel-explorer', triggerPhrases: ['secret handshake', 'pixel explorer'],
    title: 'Certified Pixel Explorer', kicker: 'You found a hidden corner', illustration: 'discovery',
    paragraphs: ['A secret page! Your explorer badge is imaginary, but your curiosity is real.', 'Take a moment to enjoy the discovery, then keep wandering through the tiny internet.'],
  },
  {
    id: 'mystery-frequency', slug: 'mystery-frequency', triggerPhrases: ['mystery frequency', 'blue door'],
    title: 'A Message From Somewhere', kicker: 'The signal is mostly static', illustration: 'mystery',
    paragraphs: ['If you can read this, the little radio is working.', 'The rest of the message is still being typed by a very slow pixel. Check back whenever you like.'],
  },
]
