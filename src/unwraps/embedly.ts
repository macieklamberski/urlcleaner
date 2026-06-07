import { createParamExtractor } from '../utils.js'

// Embedly oEmbed widget proxy (cdn.embedly.com or embed.ly with ?src=<target>).
export const unwrapEmbedly = createParamExtractor({
  hosts: ['cdn.embedly.com', 'embed.ly'],
  params: ['src'],
})
