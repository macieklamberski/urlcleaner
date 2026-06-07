import { describe, expect, it } from 'bun:test'
import { unwrapPxf } from './pxf.js'

describe('unwrapPxf', () => {
  it('should extract target from u param on a merchant subdomain', () => {
    const url = new URL('https://merchant.pxf.io/?subId1=abc&u=https%3A%2F%2Fexample.com%2Fproduct')

    expect(unwrapPxf(url)).toBe('https://example.com/product')
  })

  it('should match different merchant subdomains', () => {
    const url = new URL('https://shop-store.pxf.io/?u=https%3A%2F%2Fexample.com%2Fitem')

    expect(unwrapPxf(url)).toBe('https://example.com/item')
  })

  it('should return undefined when u param is missing', () => {
    const url = new URL('https://merchant.pxf.io/?subId1=abc')

    expect(unwrapPxf(url)).toBeUndefined()
  })

  it('should return undefined for non-pxf hosts', () => {
    const url = new URL('https://example.com/?u=https%3A%2F%2Fother.com')

    expect(unwrapPxf(url)).toBeUndefined()
  })
})
