import { describe, expect, it } from 'bun:test'
import { cleanUrl, stripTrackingParams, unwrapUrl } from './clean.js'
import { createParamExtractor } from './utils.js'

const exampleUnwrapper = createParamExtractor({
  hosts: 'redirect.example.com',
  params: ['target'],
})

const nestedUnwrapper = createParamExtractor({
  hosts: 'outer.example.com',
  params: ['url'],
})

describe('unwrapUrl', () => {
  it('should return the first matching unwrapper result', () => {
    const url = new URL('https://redirect.example.com/?target=https%3A%2F%2Fexample.com%2Fpost')

    expect(unwrapUrl(url, [nestedUnwrapper, exampleUnwrapper])).toBe('https://example.com/post')
  })

  it('should return undefined when no unwrapper matches', () => {
    const url = new URL('https://example.com/post')

    expect(unwrapUrl(url, [exampleUnwrapper])).toBeUndefined()
  })

  it('should return undefined for empty unwrapper list', () => {
    const url = new URL('https://redirect.example.com/?target=https%3A%2F%2Fexample.com')

    expect(unwrapUrl(url, [])).toBeUndefined()
  })
})

describe('stripTrackingParams', () => {
  it('should delete matching params and report the change', () => {
    const url = new URL('https://example.com/post?utm_source=feed&id=42')

    const isChanged = stripTrackingParams(url, ['utm_source'])

    expect(isChanged).toBe(true)
    expect(url.toString()).toBe('https://example.com/post?id=42')
  })

  it('should match param names case-insensitively', () => {
    const url = new URL('https://example.com/post?UTM_Source=feed&id=42')

    const isChanged = stripTrackingParams(url, ['utm_source'])

    expect(isChanged).toBe(true)
    expect(url.toString()).toBe('https://example.com/post?id=42')
  })

  it('should report no change when nothing matches', () => {
    const url = new URL('https://example.com/post?id=42')

    const isChanged = stripTrackingParams(url, ['utm_source'])

    expect(isChanged).toBe(false)
    expect(url.toString()).toBe('https://example.com/post?id=42')
  })
})

describe('cleanUrl', () => {
  it('should strip default tracking params', () => {
    const url = 'https://example.com/post?utm_source=feed&utm_medium=email&id=42'

    expect(cleanUrl(url)).toBe('https://example.com/post?id=42')
  })

  it('should unwrap with custom unwrappers and strip tracking params', () => {
    const target = 'https://example.com/post?utm_source=feed&id=42'
    const url = `https://redirect.example.com/?target=${encodeURIComponent(target)}`

    const cleaned = cleanUrl(url, { unwrappers: [exampleUnwrapper] })

    expect(cleaned).toBe('https://example.com/post?id=42')
  })

  it('should unwrap nested wrappers up to the depth limit', () => {
    const target = 'https://example.com/post'
    const inner = `https://redirect.example.com/?target=${encodeURIComponent(target)}`
    const url = `https://outer.example.com/?url=${encodeURIComponent(inner)}`

    const cleaned = cleanUrl(url, { unwrappers: [exampleUnwrapper, nestedUnwrapper] })

    expect(cleaned).toBe('https://example.com/post')
  })

  it('should stop unwrapping at maxUnwrapDepth', () => {
    const target = 'https://example.com/post'
    const inner = `https://redirect.example.com/?target=${encodeURIComponent(target)}`
    const url = `https://outer.example.com/?url=${encodeURIComponent(inner)}`

    const cleaned = cleanUrl(url, {
      unwrappers: [exampleUnwrapper, nestedUnwrapper],
      maxUnwrapDepth: 1,
    })

    expect(cleaned).toBe(inner)
  })

  it('should return the unwrapped target as-is when nothing is stripped', () => {
    const target = 'https://example.com/post'
    const url = `https://redirect.example.com/?target=${encodeURIComponent(target)}`

    const cleaned = cleanUrl(url, { unwrappers: [exampleUnwrapper] })

    expect(cleaned).toBe(target)
  })

  it('should respect a custom tracking param list', () => {
    const url = 'https://example.com/post?session=abc&utm_source=feed'

    const cleaned = cleanUrl(url, { trackingParams: ['session'] })

    expect(cleaned).toBe('https://example.com/post?utm_source=feed')
  })

  it('should return the input unchanged when it is not a valid URL', () => {
    expect(cleanUrl('not a url')).toBe('not a url')
  })

  it('should return the input unchanged when nothing applies', () => {
    const url = 'https://example.com/post?id=42'

    expect(cleanUrl(url)).toBe(url)
  })

  it('should keep the wrapper when the unwrapped target is not a valid URL', () => {
    const url = 'https://redirect.example.com/?target=not-a-url'

    const cleaned = cleanUrl(url, { unwrappers: [exampleUnwrapper] })

    expect(cleaned).toBe(url)
  })
})
