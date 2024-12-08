
export const applyFavicon = (logo: string) => {
  const element = document.querySelector('link[rel="icon shortcut"]')
  element?.setAttribute('href', logo)
}

export const applyTheme = (images: any) => {
  applyFavicon(images.favicon)
}
