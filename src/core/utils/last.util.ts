export function last<T>(arr: Array<T>): T | undefined {
  if (!arr.length) {
    return undefined;
  }

  return arr[arr.length - 1];
}
