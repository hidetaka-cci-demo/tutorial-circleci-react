import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { PrimeRule } from './PrimeRule'

describe('PrimeRule', () => {
  const rule = new PrimeRule()

  describe('Property-Based Testing', () => {
    it('supports が true を返す場合、handle は常に "素数" を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          if (rule.supports(n)) {
            expect(rule.handle(n)).toBe('素数')
          }
        })
      )
    })

    it('2 は素数である', () => {
      expect(rule.supports(2)).toBe(true)
      expect(rule.handle(2)).toBe('素数')
    })

    it('3, 5, 7, 11, 13 は素数である', () => {
      const primes = [3, 5, 7, 11, 13]
      primes.forEach((n) => {
        expect(rule.supports(n)).toBe(true)
        expect(rule.handle(n)).toBe('素数')
      })
    })

    it('1 は素数ではない', () => {
      expect(rule.supports(1)).toBe(false)
    })

    it('4, 6, 8, 9, 10 は素数ではない', () => {
      const nonPrimes = [4, 6, 8, 9, 10]
      nonPrimes.forEach((n) => {
        expect(rule.supports(n)).toBe(false)
      })
    })

    it('0 に対しては常に false を返す', () => {
      expect(rule.supports(0)).toBe(false)
    })

    it('負の数に対しては常に false を返す', () => {
      fc.assert(
        fc.property(fc.integer({ max: -1 }), (n) => {
          expect(rule.supports(n)).toBe(false)
        })
      )
    })

    it('合成数に対しては常に false を返す', () => {
      const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25]
      composites.forEach((n) => {
        expect(rule.supports(n)).toBe(false)
      })
    })
  })
})
