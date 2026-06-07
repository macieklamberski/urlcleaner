import { describe, expect, it } from 'bun:test'
import { unwrapFirebaseDynamicLinks } from './firebaseDynamicLinks.js'

describe('unwrapFirebaseDynamicLinks', () => {
  it('should extract target from ofl param on .page.link host', () => {
    const url = new URL('https://example.page.link/?ofl=https%3A%2F%2Fexample.com%2Ffallback')

    expect(unwrapFirebaseDynamicLinks(url)).toBe('https://example.com/fallback')
  })

  it('should accept any subdomain under page.link', () => {
    const url = new URL('https://my-app.page.link/?ofl=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapFirebaseDynamicLinks(url)).toBe('https://example.com/page')
  })

  it('should return undefined when ofl param is missing', () => {
    const url = new URL('https://example.page.link/?other=value')

    expect(unwrapFirebaseDynamicLinks(url)).toBeUndefined()
  })

  it('should return undefined for non page.link hosts', () => {
    const url = new URL('https://example.com/?ofl=https%3A%2F%2Fother.com')

    expect(unwrapFirebaseDynamicLinks(url)).toBeUndefined()
  })

  it('should prefer link over ofl when both are present', () => {
    const url = new URL(
      'https://example.page.link/?link=https%3A%2F%2Fexample.com%2Fcanonical&ofl=https%3A%2F%2Fexample.com%2Ffallback',
    )

    expect(unwrapFirebaseDynamicLinks(url)).toBe('https://example.com/canonical')
  })
})
