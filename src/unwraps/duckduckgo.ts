import { createParamExtractor } from '../utils.js'

// DuckDuckGo search-result redirect (duckduckgo.com/l/?uddg=<target>).
export const unwrapDuckduckgo = createParamExtractor({
  hosts: 'duckduckgo.com',
  path: '/l/',
  params: ['uddg'],
})
