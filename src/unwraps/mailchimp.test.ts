import { describe, expect, it } from 'bun:test'
import { unwrapMailchimp } from './mailchimp.js'

describe('unwrapMailchimp', () => {
  it('should extract target from url param', () => {
    const url = new URL(
      'https://list.mailchimp.com/mctx/clicks?url=https%3A%2F%2Fexample.com%2Farticle&xid=abc&uid=12345',
    )

    expect(unwrapMailchimp(url)).toBe('https://example.com/article')
  })

  it('should match other Mailchimp subdomains', () => {
    const url = new URL(
      'https://eepurl.mailchimp.com/mctx/clicks?url=https%3A%2F%2Fexample.com%2Fother',
    )

    expect(unwrapMailchimp(url)).toBe('https://example.com/other')
  })

  it('should return undefined when url param is missing', () => {
    const url = new URL('https://list.mailchimp.com/mctx/clicks?xid=abc')

    expect(unwrapMailchimp(url)).toBeUndefined()
  })

  it('should return undefined for non-clicks paths', () => {
    const url = new URL('https://list.mailchimp.com/clicks?url=https%3A%2F%2Fexample.com')

    expect(unwrapMailchimp(url)).toBeUndefined()
  })

  it('should return undefined for non-Mailchimp hosts', () => {
    const url = new URL('https://example.com/mctx/clicks?url=https%3A%2F%2Fother.com')

    expect(unwrapMailchimp(url)).toBeUndefined()
  })
})
