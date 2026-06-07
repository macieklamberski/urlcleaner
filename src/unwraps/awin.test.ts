import { describe, expect, it } from 'bun:test'
import { unwrapAwin } from './awin.js'

describe('unwrapAwin', () => {
  it('should extract target from ued param', () => {
    const url = new URL(
      'https://www.awin1.com/cread.php?awinmid=1234&awinaffid=5678&ued=https%3A%2F%2Fexample.com%2Fproduct',
    )

    expect(unwrapAwin(url)).toBe('https://example.com/product')
  })

  it('should fall back to p param when ued is missing', () => {
    const url = new URL(
      'https://www.awin1.com/cread.php?awinmid=1234&p=https%3A%2F%2Fexample.com%2Fother',
    )

    expect(unwrapAwin(url)).toBe('https://example.com/other')
  })

  it('should return undefined when both ued and p are missing', () => {
    const url = new URL('https://www.awin1.com/cread.php?awinmid=1234&awinaffid=5678')

    expect(unwrapAwin(url)).toBeUndefined()
  })

  it('should return undefined for non-Awin hosts', () => {
    const url = new URL('https://example.com/cread.php?ued=https%3A%2F%2Fother.com')

    expect(unwrapAwin(url)).toBeUndefined()
  })
})
