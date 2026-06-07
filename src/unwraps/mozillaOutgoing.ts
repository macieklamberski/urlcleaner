import type { UrlUnwrapper } from '../types.js'

const pathRegex = /^\/v1\/[0-9a-f]{64}\/(.+)$/

const mozillaOutgoingHosts = new Set([
  'outgoing.prod.mozaws.net',
  'prod.outgoing.prod.webservices.mozgcp.net',
])

// Mozilla outgoing-link redirector used on Mozilla mailing lists, blogs, and
// support forums. Path: /v1/<sha256>/<URL-encoded-target>
export const unwrapMozillaOutgoing: UrlUnwrapper = (url) => {
  if (!mozillaOutgoingHosts.has(url.hostname)) {
    return
  }

  const match = url.pathname.match(pathRegex)
  if (!match) {
    return
  }

  try {
    return decodeURIComponent(match[1])
  } catch {}
}
