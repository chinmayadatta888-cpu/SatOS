export type AchievementBadge = 'birthday' | 'heart' | 'crown' | 'diamond' | 'sun' | 'moon' | 'bolt' | 'hearts' | 'flower' | 'level'

export type Achievement = {
  id: string
  code: string
  title: string
  description: string
  reward: string
  badge: AchievementBadge
  color: string
  unlockDate?: string
}

/** Reorder, add, remove, or edit achievement content in this list. */
export const achievements: Achievement[] = [
  { id: 'birthday', code: 'BIRTHDAY.EXE', title: 'Successfully Survived Another Year', description: 'Another year completed. The legendary streak continues.', reward: '+1 Level', badge: 'birthday', color: '#f2c85f', unlockDate: 'November 16' },
  { id: 'overflow', code: 'CUTENESS_OVERFLOW', title: 'Cuteness Increased by 57%', description: 'Warning: Cuteness levels have exceeded recommended limits.', reward: '+57 Cuteness', badge: 'heart', color: '#e98ea8' },
  { id: 'main-character', code: 'MAIN_CHARACTER', title: 'Main Character Energy', description: 'Somehow manages to make every ordinary moment interesting.', reward: 'Main Character Privileges', badge: 'crown', color: '#efb462' },
  { id: 'rare-find', code: 'RARE_FIND', title: 'One in a Million', description: 'A genuinely rare human being.', reward: 'Legendary Status', badge: 'diamond', color: '#79c6cc' },
  { id: 'sunshine', code: 'SUNSHINE_MODE', title: 'Walking Sunshine', description: 'Brightening up the world without even trying.', reward: 'Sunshine Aura', badge: 'sun', color: '#f3cd6c' },
  { id: 'sleep-mode', code: 'SLEEP_MODE', title: 'Professional Sleep Enthusiast', description: 'Sleep is not a hobby. It is a lifestyle.', reward: '+8 Hours', badge: 'moon', color: '#9ba9d6' },
  { id: 'chaos', code: 'CHAOS_UNLOCKED', title: 'Certified Chaos', description: 'Order is optional. Personality is mandatory.', reward: 'Chaos Mode', badge: 'bolt', color: '#e99268' },
  { id: 'heart-stealer', code: 'HEART_STEALER', title: 'Heart Collector', description: 'Accidentally became someone’s favourite person.', reward: 'Infinite Hearts', badge: 'hearts', color: '#e67f9c' },
  { id: 'beauty', code: 'BEAUTY.EXE', title: 'Unreal Graphics', description: 'Rendering beauty at an unreasonable resolution.', reward: 'Maximum Resolution', badge: 'flower', color: '#b69bc9' },
  { id: 'level-up', code: 'LEVEL_UP', title: 'Another Chapter Begins', description: 'A new level, new memories, and new adventures.', reward: 'Next Chapter', badge: 'level', color: '#8ebe87' },
]
