import { createParamExtractor } from '../utils.js'

// smartredirect.de affiliate redirect (?url=<target>).
export const unwrapSmartredirect = createParamExtractor({
  hosts: 'smartredirect.de',
  params: ['url'],
})
