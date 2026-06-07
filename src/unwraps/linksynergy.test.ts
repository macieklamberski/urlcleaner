import { describe, expect, it } from 'bun:test'
import { unwrapLinksynergy } from './linksynergy.js'

describe('unwrapLinksynergy', () => {
  it('should extract target from murl param', () => {
    const url = new URL(
      'https://click.linksynergy.com/deeplink?id=abc&mid=12345&murl=https%3A%2F%2Fexample.com%2Fproduct',
    )

    expect(unwrapLinksynergy(url)).toBe('https://example.com/product')
  })

  it('should return undefined when murl param is missing', () => {
    const url = new URL('https://click.linksynergy.com/deeplink?id=abc&mid=12345')

    expect(unwrapLinksynergy(url)).toBeUndefined()
  })

  it('should return undefined for non-deeplink paths', () => {
    const url = new URL('https://click.linksynergy.com/click?murl=https%3A%2F%2Fexample.com')

    expect(unwrapLinksynergy(url)).toBeUndefined()
  })

  it('should return undefined for non-LinkSynergy hosts', () => {
    const url = new URL('https://example.com/deeplink?murl=https%3A%2F%2Fother.com')

    expect(unwrapLinksynergy(url)).toBeUndefined()
  })
})
