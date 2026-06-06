import { createParamExtractor } from '../utils.js'

// Lever Analytics email click tracker (t.lever-analytics.com/...?dest=<target>).
export const unwrapLeverAnalytics = createParamExtractor({
  hosts: 't.lever-analytics.com',
  params: ['dest'],
})
