import { describe, expect, it } from 'bun:test'
import { unwrapCjNetwork } from './cjNetwork.js'

describe('unwrapCjNetwork', () => {
  it('should extract target from url param on dpbolvw.net', () => {
    const url = new URL(
      'https://www.dpbolvw.net/click-12345-67890?url=https%3A%2F%2Fexample.com%2Fproduct',
    )

    expect(unwrapCjNetwork(url)).toBe('https://example.com/product')
  })

  it('should match other CJ network hosts', () => {
    const url = new URL(
      'https://www.anrdoezrs.net/click-12345-67890?url=https%3A%2F%2Fexample.com%2Fitem',
    )

    expect(unwrapCjNetwork(url)).toBe('https://example.com/item')
  })

  it('should return undefined when url param is missing', () => {
    const url = new URL('https://www.tkqlhce.com/click-12345-67890')

    expect(unwrapCjNetwork(url)).toBeUndefined()
  })

  it('should return undefined for non-CJ hosts', () => {
    const url = new URL('https://example.com/click?url=https%3A%2F%2Fother.com')

    expect(unwrapCjNetwork(url)).toBeUndefined()
  })
})
