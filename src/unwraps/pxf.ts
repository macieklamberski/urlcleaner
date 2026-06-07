import { createParamExtractor } from '../utils.js'

// Impact Radius / pxf.io affiliate redirect (<merchant>.pxf.io/?u=<target>).
export const unwrapPxf = createParamExtractor({
  hosts: /\.pxf\.io$/,
  params: ['u'],
})
