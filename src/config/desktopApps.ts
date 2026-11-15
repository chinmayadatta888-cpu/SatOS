export type DesktopApp = {
  id: string
  name: string
  subtitle: string
  color: string
}

export const desktopApps: DesktopApp[] = [
  { id: 'photos', name: 'Photos', subtitle: 'Little moments, kept close.', color: '#f18a6c' },
  { id: 'note', name: 'Note For You', subtitle: 'A note with your name on it.', color: '#f5cf71' },
  { id: 'achievements', name: 'Achievements', subtitle: 'All the lovely things you have done.', color: '#9abf7b' },
  { id: 'recycle', name: 'Recycle Bin', subtitle: 'A tidy little corner.', color: '#8fc7d3' },
  { id: 'satwiscape', name: 'Satwiscape', subtitle: 'A tiny place to wander.', color: '#8bb4ea' },
  { id: 'message', name: 'Message to CD', subtitle: 'A message is waiting here.', color: '#e5a6b6' },
  { id: 'teddy', name: 'Junny HQ', subtitle: 'A little room for the face of Satwika OS.', color: '#ed5b81' },
  { id: 'settings', name: 'Settings', subtitle: 'Make this little world yours.', color: '#9a9bbd' },
]
