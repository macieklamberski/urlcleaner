import { describe, expect, it } from 'bun:test'
import { unwrapOutlookSafelinks } from './outlookSafelinks.js'

describe('unwrapOutlookSafelinks', () => {
  it('should extract target from url param', () => {
    const url = new URL(
      'https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fexample.com%2Fstory&data=foo&sdata=bar&reserved=0',
    )

    expect(unwrapOutlookSafelinks(url)).toBe('https://example.com/story')
  })

  it('should extract target from a different tenant subdomain', () => {
    const url = new URL(
      'https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fexample.com%2Fstory&data=foo',
    )

    expect(unwrapOutlookSafelinks(url)).toBe('https://example.com/story')
  })

  it('should return undefined when url param is missing', () => {
    const url = new URL('https://nam06.safelinks.protection.outlook.com/?data=foo')

    expect(unwrapOutlookSafelinks(url)).toBeUndefined()
  })

  it('should return undefined for non-Outlook hosts', () => {
    const url = new URL('https://example.com/?url=https%3A%2F%2Fother.com')

    expect(unwrapOutlookSafelinks(url)).toBeUndefined()
  })
})
