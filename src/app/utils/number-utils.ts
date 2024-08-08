export function format(num: number | null): string {
  return num ? num.toFixed(2) : 'n/a';
}

export function emptyIfInvalid(num: number): number | null {
  return Number.isNaN(num) || !Number.isFinite(num) ? null : num;
}
