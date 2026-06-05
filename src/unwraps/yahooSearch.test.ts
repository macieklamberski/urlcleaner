import { describe, expect, it } from 'bun:test'
import { unwrapYahooSearch } from './yahooSearch.js'

describe('unwrapYahooSearch', () => {
  it('should extract target from RU path segment', () => {
    const url = new URL(
      'https://r.search.yahoo.com/_ylt=AAA/SIG=BBB/EXP=CCC/RU=https%3A%2F%2Fexample.com%2Farticle/RK=2/RS=DDD-',
    )

    expect(unwrapYahooSearch(url)).toBe('https://example.com/article')
  })

  it('should return undefined for paths without RU= segment', () => {
    const url = new URL('https://r.search.yahoo.com/search?p=test')

    expect(unwrapYahooSearch(url)).toBeUndefined()
  })

  it('should return undefined when RK= terminator is missing', () => {
    const url = new URL('https://r.search.yahoo.com/_ylt=AAA/RU=https%3A%2F%2Fexample.com')

    expect(unwrapYahooSearch(url)).toBeUndefined()
  })

  it('should return undefined for non-Yahoo hosts', () => {
    const url = new URL(
      'https://example.com/_ylt=AAA/RU=https%3A%2F%2Fexample.com%2Fpage/RK=0/RS=BBB-',
    )

    expect(unwrapYahooSearch(url)).toBeUndefined()
  })
})
