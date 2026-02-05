import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { PerfectNumberRule } from './PerfectNumberRule'

describe('PerfectNumberRule', () => {
  const rule = new PerfectNumberRule()

  describe('Property-Based Testing', () => {
    it('supports が true を返す場合、handle は常に "完全数" を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          if (rule.supports(n)) {
            expect(rule.handle(n)).toBe('完全数')
          }
        })
      )
    })

    it('6 は完全数である', () => {
      expect(rule.supports(6)).toBe(true)
      expect(rule.handle(6)).toBe('完全数')
    })

    it('28 は完全数である', () => {
      expect(rule.supports(28)).toBe(true)
      expect(rule.handle(28)).toBe('完全数')
    })

    it('496 は完全数である', () => {
      expect(rule.supports(496)).toBe(true)
      expect(rule.handle(496)).toBe('完全数')
    })

    it('8128 は完全数である', () => {
      expect(rule.supports(8128)).toBe(true)
      expect(rule.handle(8128)).toBe('完全数')
    })

    it('1, 2, 3, 4, 5 は完全数ではない', () => {
      const nonPerfect = [1, 2, 3, 4, 5]
      nonPerfect.forEach((n) => {
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

    it('完全数でない正の数に対しては false を返す', () => {
      const nonPerfect = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 27, 29, 30]
      nonPerfect.forEach((n) => {
        expect(rule.supports(n)).toBe(false)
      })
    })
  })
})
