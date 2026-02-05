import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { MultiplyIncrement } from './MultiplyIncrement'
import type { IncrementType } from '../../hooks/useFizzBuzz'

describe('MultiplyIncrement', () => {
  const increment = new MultiplyIncrement()

  describe('Property-Based Testing', () => {
    it('supports が true を返す場合、handle は常に current * current を返す（0以外）', () => {
      fc.assert(
        fc.property(fc.integer().filter((n) => n !== 0), (current) => {
          const context = { type: 'multiply' as IncrementType, current }
          if (increment.supports(context)) {
            expect(increment.handle(context)).toBe(current * current)
          }
        })
      )
    })

    it('"multiply" タイプに対しては常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context = { type: 'multiply' as IncrementType, current }
          expect(increment.supports(context)).toBe(true)
        })
      )
    })

    it('"multiply" 以外のタイプに対しては常に false を返す', () => {
      const otherTypes: IncrementType[] = ['add', 'subtract', 'fibonacci']
      fc.assert(
        fc.property(fc.integer(), (current) => {
          otherTypes.forEach((type) => {
            const context = { type, current }
            expect(increment.supports(context)).toBe(false)
          })
        })
      )
    })

    it('0 以外の任意の数 n に対して n * n を返す', () => {
      fc.assert(
        fc.property(fc.integer().filter((n) => n !== 0), (n) => {
          const context = { type: 'multiply' as IncrementType, current: n }
          expect(increment.handle(context)).toBe(n * n)
        })
      )
    })

    it('負の数でも n * n を返す（負の数の2乗は正）', () => {
      fc.assert(
        fc.property(fc.integer({ max: -1 }), (n) => {
          const context = { type: 'multiply' as IncrementType, current: n }
          expect(increment.handle(context)).toBe(n * n)
          expect(increment.handle(context)).toBeGreaterThan(0)
        })
      )
    })
  })

  describe('例示テスト', () => {
    it('0 に対して 1 を返す（エッジケース）', () => {
      const context = { type: 'multiply' as IncrementType, current: 0 }
      expect(increment.handle(context)).toBe(1)
    })

    it('1 に対して 1 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: 1 }
      expect(increment.handle(context)).toBe(1)
    })

    it('2 に対して 4 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: 2 }
      expect(increment.handle(context)).toBe(4)
    })

    it('3 に対して 9 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: 3 }
      expect(increment.handle(context)).toBe(9)
    })

    it('4 に対して 16 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: 4 }
      expect(increment.handle(context)).toBe(16)
    })

    it('負の数 -1 に対して 1 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: -1 }
      expect(increment.handle(context)).toBe(1)
    })

    it('負の数 -2 に対して 4 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: -2 }
      expect(increment.handle(context)).toBe(4)
    })

    it('負の数 -3 に対して 9 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: -3 }
      expect(increment.handle(context)).toBe(9)
    })

    it('大きな数 10 に対して 100 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: 10 }
      expect(increment.handle(context)).toBe(100)
    })

    it('大きな数 100 に対して 10000 を返す', () => {
      const context = { type: 'multiply' as IncrementType, current: 100 }
      expect(increment.handle(context)).toBe(10000)
    })
  })
})
