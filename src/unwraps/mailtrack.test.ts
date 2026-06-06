import { describe, expect, it } from 'bun:test'
import { unwrapMailtrack } from './mailtrack.js'

describe('unwrapMailtrack', () => {
  it('should extract target from url param', () => {
    const url = new URL('https://mailtrack.io/?url=https%3A%2F%2Fexample.com%2Fpage')

    expect(unwrapMailtrack(url)).toBe('https://example.com/page')
  })

  it('should return undefined when url param is missing', () => {
    const url = new URL('https://mailtrack.io/?other=value')

    expect(unwrapMailtrack(url)).toBeUndefined()
  })

  it('should return undefined for non-Mailtrack hosts', () => {
    const url = new URL('https://example.com/?url=https%3A%2F%2Fother.com')

    expect(unwrapMailtrack(url)).toBeUndefined()
  })
})
