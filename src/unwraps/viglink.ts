import { createParamExtractor } from '../utils.js'

// VigLink affiliate redirect (redirect.viglink.com/?u=<target>).
export const unwrapViglink = createParamExtractor({
  hosts: 'redirect.viglink.com',
  params: ['u'],
})
