/** Resolve arquivos de /public respeitando o base do Vite (GitHub Pages em subpath). */
export const assetUrl = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
