export function isEntityArray<T = unknown>(val: unknown, condition: (val: unknown) => val is T): val is T[] {
  if (!Array.isArray(val)) {
    return false;
  }

  for (const item of val) {
    if (!condition(item)) {
      return false;
    }
  }

  return true;
}
