// A dynamic import keeps Three.js out of information-page startup.
export function loadRenderer() {
  return import('./PrototypeScene');
}
