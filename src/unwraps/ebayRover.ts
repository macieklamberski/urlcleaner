import { createParamExtractor } from '../utils.js'

// eBay Rover affiliate redirect (rover.ebay.<TLD>/...?mpre=<target>).
export const unwrapEbayRover = createParamExtractor({
  hosts: /^rover\.ebay\.[a-z.]+$/,
  params: ['mpre'],
})
