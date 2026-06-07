import { describe, expect, it } from 'bun:test'
import { unwrapSmartredirect } from './smartredirect.js'

describe('unwrapSmartredirect', () => {
  it('should extract target from url param', () => {
    const url = new URL('https://smartredirect.de/?url=https%3A%2F%2Fexample.com%2Fproduct')

    expect(unwrapSmartredirect(url)).toBe('https://example.com/product')
  })

  it('should return undefined when url param is missing', () => {
    const url = new URL('https://smartredirect.de/?other=value')

    expect(unwrapSmartredirect(url)).toBeUndefined()
  })

  it('should return undefined for non-smartredirect hosts', () => {
    const url = new URL('https://example.com/?url=https%3A%2F%2Fother.com')

    expect(unwrapSmartredirect(url)).toBeUndefined()
  })
})
