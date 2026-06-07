import { createParamExtractor } from '../utils.js'

// GeoRiot / Geni.us geo-targeted affiliate redirect (target.georiot.com/?GR_URL=<target>).
export const unwrapGeoriot = createParamExtractor({
  hosts: 'target.georiot.com',
  params: ['GR_URL'],
})
