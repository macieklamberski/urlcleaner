import { createParamExtractor } from '../utils.js'

// Sovrn / sjv.io affiliate redirect (<merchant>.sjv.io/?u=<target>).
export const unwrapSjv = createParamExtractor({
  hosts: /\.sjv\.io$/,
  params: ['u'],
})
