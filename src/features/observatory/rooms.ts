export const observatoryRooms = [
  { id: 'timeline', title: 'Timeline Room' },
  { id: 'projects', title: 'Project Gallery' },
  { id: 'skills', title: 'Skill Constellation' },
  { id: 'future', title: 'Future Room' },
] as const;
export type ObservatoryRoomId = typeof observatoryRooms[number]['id'];
