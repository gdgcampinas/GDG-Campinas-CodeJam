export function parseTraits(input: string): string[] {
  return input
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

export function formatTraits(traits: readonly string[]): string {
  return traits.join(', ')
}
