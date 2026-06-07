import { createParamExtractor } from '../utils.js'

// gate.sc URL-shortener-style redirect (?url=<target>).
export const unwrapGateSc = createParamExtractor({
  hosts: 'gate.sc',
  params: ['url'],
})
