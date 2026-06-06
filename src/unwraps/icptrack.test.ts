import { describe, expect, it } from 'bun:test'
import { unwrapIcptrack } from './icptrack.js'

describe('unwrapIcptrack', () => {
  it('should extract target from destination param', () => {
    const url = new URL(
      'https://click.icptrack.com/icp/relay.php?r=1&msgid=2&destination=https%3A%2F%2Fexample.com%2Farticle',
    )

    expect(unwrapIcptrack(url)).toBe('https://example.com/article')
  })

  it('should return undefined for non-relay paths', () => {
    const url = new URL('https://click.icptrack.com/other?destination=https%3A%2F%2Fexample.com')

    expect(unwrapIcptrack(url)).toBeUndefined()
  })

  it('should return undefined when destination param is missing', () => {
    const url = new URL('https://click.icptrack.com/icp/relay.php?r=1&msgid=2')

    expect(unwrapIcptrack(url)).toBeUndefined()
  })

  it('should return undefined for non-ICPTrack hosts', () => {
    const url = new URL('https://example.com/icp/relay.php?destination=https%3A%2F%2Fother.com')

    expect(unwrapIcptrack(url)).toBeUndefined()
  })
})
