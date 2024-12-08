import { Partner } from './beef/types'
import * as service from './theme'

describe('applyFavicon', () => {

  it('happy path', () => {

    document.head.innerHTML = `
      <link rel="icon shortcut" href="original-value">
    `

    service.applyFavicon('new-value')

    const linkHref = document.querySelector('link[rel="icon shortcut"]').getAttribute('href')

    expect(linkHref).toBe('new-value')

  })

})

export const partnerFactory = (): Partner => {

  return {
    name: 'string',
    images: {
      logoMedium: 'string',
    },
    links: {
      contactSupportUrl: 'string',
    },
    colours: {
      logoMedium: 'string',
    },
  } as any

}
