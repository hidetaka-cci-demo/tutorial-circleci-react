import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { SubtractIncrement } from './SubtractIncrement'
import type { IncrementType } from '../../hooks/useFizzBuzz'

describe('SubtractIncrement', () => {
  const increment = new SubtractIncrement()

  describe('Property-Based Testing', () => {
    it('supports が true を返す場合、handle は常に current - 1 を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context = { type: 'subtract' as IncrementType, current }
          if (increment.supports(context)) {
            expect(increment.handle(context)).toBe(current - 1)
          }
        })
      )
    })

    it('"subtract" タイプに対しては常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context = { type: 'subtract' as IncrementType, current }
          expect(increment.supports(context)).toBe(true)
        })
      )
    })

    it('"subtract" 以外のタイプに対しては常に false を返す', () => {
      const otherTypes: IncrementType[] = ['add', 'fibonacci', 'multiply']
      fc.assert(
        fc.property(fc.integer(), (current) => {
          otherTypes.forEach((type) => {
            const context = { type, current }
            expect(increment.supports(context)).toBe(false)
          })
        })
      )
    })

    it('任意の数 n に対して n - 1 を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          const context = { type: 'subtract' as IncrementType, current: n }
          expect(increment.handle(context)).toBe(n - 1)
        })
      )
    })
  })

  describe('例示テスト', () => {
    it('0 に対して -1 を返す', () => {
      const context = { type: 'subtract' as IncrementType, current: 0 }
      expect(increment.handle(context)).toBe(-1)
    })

    it('1 に対して 0 を返す', () => {
      const context = { type: 'subtract' as IncrementType, current: 1 }
      expect(increment.handle(context)).toBe(0)
    })

    it('負の数 -1 に対して -2 を返す', () => {
      const context = { type: 'subtract' as IncrementType, current: -1 }
      expect(increment.handle(context)).toBe(-2)
    })

    it('負の数 -10 に対して -11 を返す', () => {
      const context = { type: 'subtract' as IncrementType, current: -10 }
      expect(increment.handle(context)).toBe(-11)
    })

    it('大きな数 1000 に対して 999 を返す', () => {
      const context = { type: 'subtract' as IncrementType, current: 1000 }
      expect(increment.handle(context)).toBe(999)
    })
  })
})
