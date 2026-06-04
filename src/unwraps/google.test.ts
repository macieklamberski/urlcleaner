import { describe, expect, it } from 'bun:test'
import { unwrapGoogle } from './google.js'

describe('unwrapGoogle', () => {
  it('should extract target from url param', () => {
    const url = new URL('https://www.google.com/url?url=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapGoogle(url)).toBe('https://example.com/page')
  })

  it('should extract target from q param', () => {
    const url = new URL('https://www.google.com/url?q=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapGoogle(url)).toBe('https://example.com/page')
  })

  it('should prefer url param over q param', () => {
    const url = new URL(
      'https://www.google.com/url?url=https%3A%2F%2Freal.com&q=https%3A%2F%2Fwrong.com',
    )

    expect(unwrapGoogle(url)).toBe('https://real.com')
  })

  it('should return undefined for non-redirect Google URLs', () => {
    const url = new URL('https://www.google.com/search?q=test')

    expect(unwrapGoogle(url)).toBeUndefined()
  })

  it('should return undefined when target param is missing', () => {
    const url = new URL('https://www.google.com/url?sa=t&source=web')

    expect(unwrapGoogle(url)).toBeUndefined()
  })

  it('should return undefined for non-Google hosts', () => {
    const url = new URL('https://example.com/url?url=https%3A%2F%2Fother.com')

    expect(unwrapGoogle(url)).toBeUndefined()
  })

  it('should extract target from google.de host', () => {
    const url = new URL('https://www.google.de/url?url=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapGoogle(url)).toBe('https://example.com/page')
  })

  it('should extract target from google.co.uk host', () => {
    const url = new URL('https://www.google.co.uk/url?url=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapGoogle(url)).toBe('https://example.com/page')
  })

  it('should extract target without www subdomain', () => {
    const url = new URL('https://google.com/url?url=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapGoogle(url)).toBe('https://example.com/page')
  })

  it('should extract target from maps.google.com subdomain', () => {
    const url = new URL('https://maps.google.com/url?q=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapGoogle(url)).toBe('https://example.com/page')
  })

  it('should extract target from images.google.com subdomain', () => {
    const url = new URL('https://images.google.com/url?q=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapGoogle(url)).toBe('https://example.com/page')
  })

  it('should extract target from clients1.google.com subdomain', () => {
    const url = new URL('https://clients1.google.com/url?q=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapGoogle(url)).toBe('https://example.com/page')
  })
})
