export type BirthdayPhase =
  | 'welcome'
  | 'rescue-memory'
  | 'cake-intro'
  | 'light-candles'
  | 'after-light'
  | 'make-wish'
  | 'blow-candles'
  | 'after-blow'
  | 'cut-cake'
  | 'after-cut'
  | 'hidden-message'
  | 'gift-intro'
  | 'gift-wait'
  | 'complete'

export type BirthdayExpression = 'welcoming' | 'thoughtful' | 'proud' | 'encouraging' | 'gentle' | 'celebrating' | 'playful' | 'anticipation' | 'affectionate'

export type BirthdayLine = {
  speaker: 'Junny'
  text: string
  expression: BirthdayExpression
  visualBeat?: 'birthday-cheer' | 'rescue-memory' | 'cake-reveal' | 'candles-lit' | 'wish-pause' | 'confetti' | 'hidden-note' | 'gift-glow'
}

const lines = (expression: BirthdayExpression, entries: (string | [string, BirthdayLine['visualBeat']])[]): BirthdayLine[] => entries.map((entry) => ({
  speaker: 'Junny',
  text: typeof entry === 'string' ? entry : entry[0],
  expression,
  visualBeat: typeof entry === 'string' ? undefined : entry[1],
}))

export const birthdayDialogue: Record<BirthdayPhase, BirthdayLine[]> = {
  welcome: lines('welcoming', [
    ['SATWIKAAAA!', 'birthday-cheer'],
    "You're finally here!",
    "I've been preparing for this day for SO LONG!",
    'Do you know what day it is?',
    "IT'S YOUR BIRTHDAY!",
    'Happy Birthday, Satwika!',
    'Your Chief Happiness Officer has something very important prepared for you.',
  ]),
  'rescue-memory': lines('thoughtful', [
    ['I was thinking about something...', 'rescue-memory'],
    'Remember that little game you made for me?',
    'The one where I was in trouble, and you had to find me?',
    'You came looking for me. You found me. You saved me.',
    "I don't think I've ever properly thanked you for that.",
    'Well...',
    "Today, I'm here to return the favour.",
    'Consider this my very official birthday mission.',
  ]),
  'cake-intro': lines('proud', [
    'Now, enough about my heroic past.',
    ['LOOK WHAT I MADE!', 'cake-reveal'],
    'Your very own birthday cake!',
    'I may or may not have taste-tested it.',
    'Several times.',
    'I wanted it to be perfect for you.',
  ]),
  'light-candles': lines('encouraging', ["All right, Satwika. Let's light the candles together."]),
  'after-light': lines('encouraging', [['Look at them glow! I think I got the candles just right.', 'candles-lit']]),
  'make-wish': lines('gentle', [
    'Okay, this part is important.',
    'Close your eyes and make a wish.',
    ["Don't tell me what it is. Wishes are secret.", 'wish-pause'],
  ]),
  'blow-candles': lines('celebrating', ['Whenever you are ready, blow out the candles.']),
  'after-blow': lines('celebrating', [
    ['YOU DID IT!', 'confetti'],
    'I hope every little thing you wished for finds its way to you.',
  ]),
  'cut-cake': lines('playful', ['The extremely official cake-cutting ceremony may now begin.']),
  'after-cut': lines('playful', [
    'That was a very important operation.',
    'Quality control has approved the cake.',
    'Now, please enjoy your extremely official birthday cake.',
  ]),
  'hidden-message': lines('thoughtful', [['One more thing...', 'hidden-note']]),
  'gift-intro': lines('anticipation', [
    'Oh! I almost forgot.',
    "I have one more thing for you. It's not much...",
    'But I picked it especially for you.',
  ]),
  'gift-wait': lines('anticipation', [['Your present is right there, Satwika.', 'gift-glow']]),
  complete: lines('affectionate', [['Happy Birthday, Satwika! I will always be cheering for you. ♡', 'birthday-cheer']]),
}
