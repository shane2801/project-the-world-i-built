export type EnvironmentKind = 'island' | 'campus' | 'network' | 'intelligence' | 'enterprise' | 'generic';
interface Preset { ground: string; accent: string; characterColor: string; environment: EnvironmentKind }
const presets: Readonly<Record<string, Preset>> = {
  'theme-mauritius': { ground: '#37665b', accent: '#e3ce83', characterColor: '#c9df9b', environment: 'island' },
  'theme-birmingham': { ground: '#493b46', accent: '#d9a0a3', characterColor: '#c38ba4', environment: 'campus' },
  'theme-freelance': { ground: '#293b56', accent: '#b0aff0', characterColor: '#b7b5ed', environment: 'network' },
  'theme-abu-dhabi': { ground: '#183f46', accent: '#69dfd0', characterColor: '#c2ebe4', environment: 'intelligence' },
  'theme-france': { ground: '#24354c', accent: '#dfbb75', characterColor: '#698cb3', environment: 'enterprise' },
};
const fallback: Preset = { ground: '#28413d', accent: '#dfbb75', characterColor: '#9cc3ab', environment: 'generic' };
export function getPreset(themeId: string): Preset { return presets[themeId] ?? fallback; }
