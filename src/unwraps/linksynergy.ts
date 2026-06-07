import { createParamExtractor } from '../utils.js'

// LinkSynergy affiliate redirect (click.linksynergy.com/deeplink?murl=<target>).
export const unwrapLinksynergy = createParamExtractor({
  hosts: 'click.linksynergy.com',
  path: '/deeplink',
  params: ['murl'],
})
