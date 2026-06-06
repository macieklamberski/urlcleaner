import { createParamExtractor } from '../utils.js'

// Mailtrack email click tracker (mailtrack.io/?url=<target>).
export const unwrapMailtrack = createParamExtractor({
  hosts: 'mailtrack.io',
  params: ['url'],
})
