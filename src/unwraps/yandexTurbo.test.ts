import { describe, expect, it } from 'bun:test'
import { unwrapYandexTurbo } from './yandexTurbo.js'

describe('unwrapYandexTurbo', () => {
  it('should reconstruct source URL from subdomain and path', () => {
    const url = new URL('https://example-com.turbopages.org/example.com/s/article/2024/01/hello')

    expect(unwrapYandexTurbo(url)).toBe('https://example.com/article/2024/01/hello')
  })

  it('should restore dotted source hosts from dashed subdomains', () => {
    const url = new URL('https://news-example-com.turbopages.org/news.example.com/s/path')

    expect(unwrapYandexTurbo(url)).toBe('https://news.example.com/path')
  })

  it('should return undefined when path lacks the /s/ marker', () => {
    const url = new URL('https://example-com.turbopages.org/example.com/no-marker/path')

    expect(unwrapYandexTurbo(url)).toBeUndefined()
  })

  it('should return undefined for non-turbopages hosts', () => {
    const url = new URL('https://example.com/host/s/path')

    expect(unwrapYandexTurbo(url)).toBeUndefined()
  })
})
