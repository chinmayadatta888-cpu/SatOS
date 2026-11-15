export type RecycleMemory = {
  id: string
  name: string
  kind: 'text' | 'memory' | 'data' | 'program'
  size: string
  removed: string
}

/** Decorative examples only. These are not files on the user's device. */
export const recycleMemories: RecycleMemory[] = [
  { id: 'sunshine', name: 'A little sunshine.txt', kind: 'text', size: '2 KB', removed: 'Just now' },
  { id: 'favourites', name: 'Favourite memories.mem', kind: 'memory', size: '∞ KB', removed: 'A long time ago' },
  { id: 'birthday', name: 'Birthday moments.dat', kind: 'data', size: '16 KB', removed: 'Never, actually' },
  { id: 'happiness', name: 'Happiness.exe', kind: 'program', size: 'Forever', removed: 'Not removable' },
]

/** Each Empty attempt advances to the next gentle refusal. */
export const emptyBinMessages = [
  'Nice try! We don’t delete good memories here.',
  'ERROR 404: Memories cannot be deleted.',
  'This file is too precious to remove.',
  'Operation denied. Happiness is permanent.',
  'Sorry, this system protects its favourite things.',
]
