// Convert ISO alpha-2 to flag emoji
export function getFlag(code: string): string {
  const upper = code.toUpperCase();
  const cp1 = 0x1f1e6 + (upper.charCodeAt(0) - 65);
  const cp2 = 0x1f1e6 + (upper.charCodeAt(1) - 65);
  return String.fromCodePoint(cp1, cp2);
}
