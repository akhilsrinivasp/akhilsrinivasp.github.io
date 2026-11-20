// Resolves an image file name from assets/images (e.g. "oracle_logo.png") to its
// built URL. Going through Vite means the URL includes the site's base path,
// so images keep working when the site is served from a GitHub Pages subpath.
const images = import.meta.glob('~/assets/images/*', { eager: true, import: 'default' }) as Record<string, string>

export const useImage = (name: string): string => {
  const match = Object.entries(images).find(([path]) => path.endsWith(`/${name}`))
  return match ? match[1] : name
}
