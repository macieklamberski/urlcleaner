import { describe, expect, it } from 'bun:test'
import { unwrapSjv } from './sjv.js'

describe('unwrapSjv', () => {
  it('should extract target from u param on a merchant subdomain', () => {
    const url = new URL('https://merchant.sjv.io/?subId1=abc&u=https%3A%2F%2Fexample.com%2Fproduct')

    expect(unwrapSjv(url)).toBe('https://example.com/product')
  })

  it('should match different merchant subdomains', () => {
    const url = new URL('https://shop-store.sjv.io/?u=https%3A%2F%2Fexample.com%2Fitem')

    expect(unwrapSjv(url)).toBe('https://example.com/item')
  })

  it('should return undefined when u param is missing', () => {
    const url = new URL('https://merchant.sjv.io/?subId1=abc')

    expect(unwrapSjv(url)).toBeUndefined()
  })

  it('should return undefined for non-sjv hosts', () => {
    const url = new URL('https://example.com/?u=https%3A%2F%2Fother.com')

    expect(unwrapSjv(url)).toBeUndefined()
  })
})
