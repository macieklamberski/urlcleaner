import { describe, expect, it } from 'bun:test'
import { unwrapDigidip } from './digidip.js'

describe('unwrapDigidip', () => {
  it('should extract target from url param', () => {
    const url = new URL('https://example.digidip.net/visit?url=https%3A%2F%2Fexample.com%2Fproduct')

    expect(unwrapDigidip(url)).toBe('https://example.com/product')
  })

  it('should return undefined when url param is missing', () => {
    const url = new URL('https://example.digidip.net/visit?other=value')

    expect(unwrapDigidip(url)).toBeUndefined()
  })

  it('should return undefined for non-digidip hosts', () => {
    const url = new URL('https://example.com/?url=https%3A%2F%2Fother.com')

    expect(unwrapDigidip(url)).toBeUndefined()
  })
})
