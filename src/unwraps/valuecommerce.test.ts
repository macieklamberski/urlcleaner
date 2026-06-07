import { describe, expect, it } from 'bun:test'
import { unwrapValuecommerce } from './valuecommerce.js'

describe('unwrapValuecommerce', () => {
  it('should extract target from vc_url param', () => {
    const url = new URL(
      'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=12345&pid=67890&vc_url=https%3A%2F%2Fexample.com%2Fproduct',
    )

    expect(unwrapValuecommerce(url)).toBe('https://example.com/product')
  })

  it('should return undefined when vc_url param is missing', () => {
    const url = new URL('https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=12345&pid=67890')

    expect(unwrapValuecommerce(url)).toBeUndefined()
  })

  it('should return undefined for non-referral paths', () => {
    const url = new URL('https://ck.jp.ap.valuecommerce.com/click?vc_url=https%3A%2F%2Fexample.com')

    expect(unwrapValuecommerce(url)).toBeUndefined()
  })

  it('should return undefined for non-ValueCommerce hosts', () => {
    const url = new URL('https://example.com/servlet/referral?vc_url=https%3A%2F%2Fother.com')

    expect(unwrapValuecommerce(url)).toBeUndefined()
  })
})
