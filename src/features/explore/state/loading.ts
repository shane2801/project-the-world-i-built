// Recovery ceiling, not a performance target or a network-request abort.
export const GRAPHICS_DEADLINE_MS = 20_000;

export function withLoadingDeadline<T>(operation: Promise<T>, milliseconds = GRAPHICS_DEADLINE_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('3D loading timed out.')), milliseconds);
    operation.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (error: unknown) => { clearTimeout(timer); reject(error); },
    );
  });
}
