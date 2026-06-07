import { createParamExtractor } from '../utils.js'

// partner-ads.com Danish affiliate network (?htmlurl=<target>).
export const unwrapPartnerAds = createParamExtractor({
  hosts: /\.partner-ads\.com$/,
  params: ['htmlurl'],
})
