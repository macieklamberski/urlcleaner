import { createParamExtractor } from '../utils.js'

// Effiliation French affiliate network (?url=<target>).
export const unwrapEffiliation = createParamExtractor({
  hosts: /\.effiliation\.com$/,
  params: ['url'],
})
