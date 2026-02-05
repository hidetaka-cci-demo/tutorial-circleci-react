import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { FibonacciIncrement } from './FibonacciIncrement'
import type { IncrementType } from '../../hooks/useFizzBuzz'

describe('FibonacciIncrement', () => {
  const increment = new FibonacciIncrement()

  describe('Property-Based Testing', () => {
    it('supports が true を返す場合、handle は常に previous + previous2 を返す', () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), fc.integer(), (current, previous, previous2) => {
          const context = {
            type: 'fibonacci' as IncrementType,
            current,
            previous,
            previous2,
          }
          if (increment.supports(context)) {
            const expected = (previous ?? 1) + (previous2 ?? 0)
            expect(increment.handle(context)).toBe(expected)
          }
        })
      )
    })

    it('"fibonacci" タイプに対しては常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context = { type: 'fibonacci' as IncrementType, current }
          expect(increment.supports(context)).toBe(true)
        })
      )
    })

    it('"fibonacci" 以外のタイプに対しては常に false を返す', () => {
      const otherTypes: IncrementType[] = ['add', 'subtract', 'multiply']
      fc.assert(
        fc.property(fc.integer(), (current) => {
          otherTypes.forEach((type) => {
            const context = { type, current }
            expect(increment.supports(context)).toBe(false)
          })
        })
      )
    })

    it('フィボナッチ数列の性質: F(n) = F(n-1) + F(n-2) を満たす', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 20 }),
          fc.integer({ min: 0, max: 100 }),
          fc.integer({ min: 0, max: 100 }),
          (_, prev, prev2) => {
            const context = {
              type: 'fibonacci' as IncrementType,
              current: 0,
              previous: prev,
              previous2: prev2,
            }
            const result = increment.handle(context)
            expect(result).toBe(prev + prev2)
          }
        )
      )
    })
  })

  describe('例示テスト', () => {
    it('初期状態（previous=1, previous2=0）で 1 を返す', () => {
      const context = {
        type: 'fibonacci' as IncrementType,
        current: 0,
        previous: 1,
        previous2: 0,
      }
      expect(increment.handle(context)).toBe(1)
    })

    it('previous と previous2 が未定義の場合、デフォルト値（1, 0）を使用して 1 を返す', () => {
      const context = {
        type: 'fibonacci' as IncrementType,
        current: 0,
      }
      expect(increment.handle(context)).toBe(1)
    })

    it('連続した呼び出しでフィボナッチ数列を生成する', () => {
      // フィボナッチ数列: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
      let previous2 = 0
      let previous = 1

      // 1回目: 0 + 1 = 1
      const context1 = {
        type: 'fibonacci' as IncrementType,
        current: 0,
        previous,
        previous2,
      }
      const result1 = increment.handle(context1)
      expect(result1).toBe(1)
      previous2 = previous
      previous = result1

      // 2回目: 1 + 1 = 2
      const context2 = {
        type: 'fibonacci' as IncrementType,
        current: 1,
        previous,
        previous2,
      }
      const result2 = increment.handle(context2)
      expect(result2).toBe(2)
      previous2 = previous
      previous = result2

      // 3回目: 2 + 1 = 3
      const context3 = {
        type: 'fibonacci' as IncrementType,
        current: 2,
        previous,
        previous2,
      }
      const result3 = increment.handle(context3)
      expect(result3).toBe(3)
      previous2 = previous
      previous = result3

      // 4回目: 3 + 2 = 5
      const context4 = {
        type: 'fibonacci' as IncrementType,
        current: 3,
        previous,
        previous2,
      }
      const result4 = increment.handle(context4)
      expect(result4).toBe(5)
      previous2 = previous
      previous = result4

      // 5回目: 5 + 3 = 8
      const context5 = {
        type: 'fibonacci' as IncrementType,
        current: 5,
        previous,
        previous2,
      }
      const result5 = increment.handle(context5)
      expect(result5).toBe(8)
    })

    it('大きな値でも正しく計算する', () => {
      const context = {
        type: 'fibonacci' as IncrementType,
        current: 100,
        previous: 55,
        previous2: 34,
      }
      expect(increment.handle(context)).toBe(89)
    })
  })
})
