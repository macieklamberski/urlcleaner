import { createParamExtractor } from '../utils.js'

// Awin affiliate redirect (www.awin1.com/cread.php?ued=<target> or ?p=<target>).
export const unwrapAwin = createParamExtractor({
  hosts: 'www.awin1.com',
  path: '/cread.php',
  params: ['ued', 'p'],
})
