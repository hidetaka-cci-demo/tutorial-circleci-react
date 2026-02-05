import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { FizzRule } from './FizzRule'

describe('FizzRule', () => {
  const rule = new FizzRule()

  describe('Property-Based Testing', () => {
    it('supports が true を返す場合、handle は常に "Fizz" を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          if (rule.supports(n)) {
            expect(rule.handle(n)).toBe('Fizz')
          }
        })
      )
    })

    it('supports が true を返す場合、n は 0 でなく、3 の倍数で、15 の倍数ではない', () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          if (rule.supports(n)) {
            expect(Object.is(n, 0)).toBe(false)
            expect(n % 3 === 0).toBe(true)
            expect(n % 15 === 0).toBe(false)
          }
        })
      )
    })

    it('3 の倍数で 15 の倍数でない正の数に対しては常に true を返す', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1 }).filter((n) => n % 3 === 0 && n % 15 !== 0),
          (n) => {
            expect(rule.supports(n)).toBe(true)
          }
        )
      )
    })

    it('0 に対しては常に false を返す', () => {
      expect(rule.supports(0)).toBe(false)
    })

    it('15 の倍数に対しては常に false を返す', () => {
      fc.assert(
        fc.property(
          fc.integer().map((n) => n * 15),
          (n) => {
            if (n !== 0) {
              expect(rule.supports(n)).toBe(false)
            }
          }
        )
      )
    })

    it('負の数も含めて、3 の倍数で 15 の倍数でない数に対しては true を返す', () => {
      fc.assert(
        fc.property(
          fc.integer().filter((n) => n !== 0 && n % 3 === 0 && n % 15 !== 0),
          (n) => {
            expect(rule.supports(n)).toBe(true)
          }
        )
      )
    })

    it('3 の倍数でも 15 の倍数でもない数に対しては false を返す', () => {
      fc.assert(
        fc.property(
          fc.integer().filter((n) => n === 0 || (n % 3 !== 0 || n % 15 === 0)),
          (n) => {
            expect(rule.supports(n)).toBe(false)
          }
        )
      )
    })
  })
})
