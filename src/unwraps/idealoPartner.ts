import { createParamExtractor } from '../utils.js'

// Idealo German shopping affiliate (?trg=<target>).
export const unwrapIdealoPartner = createParamExtractor({
  hosts: /\.idealo-partner\.com$/,
  params: ['trg'],
})
