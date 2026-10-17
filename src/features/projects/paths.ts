export function projectPath(id: string): string {
  // Static directory names must survive host decoding without path traversal.
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(id)) {
    throw new Error(`Project ID must be URL-safe (letters, numbers, "_" or "-"): ${id}`);
  }
  return `/projects/${id}/`;
}
