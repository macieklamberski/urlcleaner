import { describe, expect, it } from 'bun:test'
import { unwrapEffiliation } from './effiliation.js'

describe('unwrapEffiliation', () => {
  it('should extract target from url param', () => {
    const url = new URL('https://track.effiliation.com/?url=https%3A%2F%2Fexample.com%2Fproduct')

    expect(unwrapEffiliation(url)).toBe('https://example.com/product')
  })

  it('should return undefined when url param is missing', () => {
    const url = new URL('https://track.effiliation.com/?other=value')

    expect(unwrapEffiliation(url)).toBeUndefined()
  })

  it('should return undefined for non-effiliation hosts', () => {
    const url = new URL('https://example.com/?url=https%3A%2F%2Fother.com')

    expect(unwrapEffiliation(url)).toBeUndefined()
  })
})
