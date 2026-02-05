import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { FizzBuzzRule } from './FizzBuzzRule'

describe('FizzBuzzRule', () => {
  const rule = new FizzBuzzRule()

  describe('Property-Based Testing', () => {
    it('supports が true を返す場合、handle は常に "FizzBuzz" を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          if (rule.supports(n)) {
            expect(rule.handle(n)).toBe('FizzBuzz')
          }
        })
      )
    })

    it('supports が true を返す場合、n は 0 でなく、15 の倍数である', () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          if (rule.supports(n)) {
            expect(Object.is(n, 0)).toBe(false)
            expect(n % 15 === 0).toBe(true)
          }
        })
      )
    })

    it('15 の倍数で正の数に対しては常に true を返す', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1 }).map((n) => n * 15),
          (n) => {
            expect(rule.supports(n)).toBe(true)
          }
        )
      )
    })

    it('0 に対しては常に false を返す', () => {
      expect(rule.supports(0)).toBe(false)
    })

    it('負の数も含めて、15 の倍数（0 以外）に対しては true を返す', () => {
      fc.assert(
        fc.property(
          fc.integer().filter((n) => n !== 0 && n % 15 === 0),
          (n) => {
            expect(rule.supports(n)).toBe(true)
          }
        )
      )
    })

    it('15 の倍数でない数に対しては false を返す', () => {
      fc.assert(
        fc.property(
          fc.integer().filter((n) => n === 0 || n % 15 !== 0),
          (n) => {
            expect(rule.supports(n)).toBe(false)
          }
        )
      )
    })
  })
})
