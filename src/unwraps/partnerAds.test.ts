import { describe, expect, it } from 'bun:test'
import { unwrapPartnerAds } from './partnerAds.js'

describe('unwrapPartnerAds', () => {
  it('should extract target from htmlurl param', () => {
    const url = new URL('https://www.partner-ads.com/?htmlurl=https%3A%2F%2Fexample.com%2Fdeal')

    expect(unwrapPartnerAds(url)).toBe('https://example.com/deal')
  })

  it('should return undefined when htmlurl param is missing', () => {
    const url = new URL('https://www.partner-ads.com/?other=value')

    expect(unwrapPartnerAds(url)).toBeUndefined()
  })

  it('should return undefined for non-partner-ads hosts', () => {
    const url = new URL('https://example.com/?htmlurl=https%3A%2F%2Fother.com')

    expect(unwrapPartnerAds(url)).toBeUndefined()
  })
})
