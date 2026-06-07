import { createParamExtractor } from '../utils.js'

// digidip affiliate redirect (<publisher>.digidip.net/visit?url=<target>).
export const unwrapDigidip = createParamExtractor({
  hosts: /\.digidip\.net$/,
  params: ['url'],
})
