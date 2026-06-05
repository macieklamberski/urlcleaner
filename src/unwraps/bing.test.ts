import { describe, expect, it } from 'bun:test'
import { unwrapBing } from './bing.js'

describe('unwrapBing', () => {
  it('should extract target from u param with a1 prefix', () => {
    const url = new URL('https://www.bing.com/ck/a?!&&u=a1aHR0cHM6Ly9leGFtcGxlLmNvbS9wYWdl')

    expect(unwrapBing(url)).toBe('https://example.com/page')
  })

  it('should extract target from u param with a2 prefix', () => {
    const url = new URL('https://www.bing.com/ck/a?u=a2aHR0cHM6Ly9leGFtcGxlLmNvbS9wYWdl')

    expect(unwrapBing(url)).toBe('https://example.com/page')
  })

  it('should accept cn.bing.com host', () => {
    const url = new URL('https://cn.bing.com/ck/a?u=a1aHR0cHM6Ly9leGFtcGxlLmNvbS9wYWdl')

    expect(unwrapBing(url)).toBe('https://example.com/page')
  })

  it('should accept bing.com without www subdomain', () => {
    const url = new URL('https://bing.com/ck/a?u=a1aHR0cHM6Ly9leGFtcGxlLmNvbS9wYWdl')

    expect(unwrapBing(url)).toBe('https://example.com/page')
  })

  it('should return undefined when prefix is missing', () => {
    const url = new URL('https://www.bing.com/ck/a?u=aHR0cHM6Ly9leGFtcGxlLmNvbS9wYWdl')

    expect(unwrapBing(url)).toBeUndefined()
  })

  it('should return undefined when decoded value is not http(s)', () => {
    const url = new URL('https://www.bing.com/ck/a?u=a1bm90LWEtdXJs')

    expect(unwrapBing(url)).toBeUndefined()
  })

  it('should return undefined when u param is missing', () => {
    const url = new URL('https://www.bing.com/ck/a?other=value')

    expect(unwrapBing(url)).toBeUndefined()
  })

  it('should return undefined for non-/ck/a paths', () => {
    const url = new URL('https://www.bing.com/search?q=test')

    expect(unwrapBing(url)).toBeUndefined()
  })

  it('should return undefined for non-Bing hosts', () => {
    const url = new URL('https://example.com/ck/a?u=a1aHR0cHM6Ly9leGFtcGxlLmNvbS9wYWdl')

    expect(unwrapBing(url)).toBeUndefined()
  })
})
