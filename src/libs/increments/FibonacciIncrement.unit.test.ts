import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { FibonacciIncrement } from './FibonacciIncrement'
import type { IncrementContext } from './incrementHandler'

describe('FibonacciIncrement', () => {
  const increment = new FibonacciIncrement()

  describe('supports メソッド', () => {
    it('type が "fibonacci" の場合、常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context: IncrementContext = { type: 'fibonacci', current }
          expect(increment.supports(context)).toBe(true)
        })
      )
    })

    it('type が "add" の場合、常に false を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context: IncrementContext = { type: 'add', current }
          expect(increment.supports(context)).toBe(false)
        })
      )
    })

    it('type が "subtract" の場合、常に false を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context: IncrementContext = { type: 'subtract', current }
          expect(increment.supports(context)).toBe(false)
        })
      )
    })

    it('type が "multiply" の場合、常に false を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context: IncrementContext = { type: 'multiply', current }
          expect(increment.supports(context)).toBe(false)
        })
      )
    })
  })

  describe('handle メソッド', () => {
    it('previous と previous2 が未定義の場合、1 + 0 = 1 を返す', () => {
      const context: IncrementContext = { type: 'fibonacci', current: 0 }
      expect(increment.handle(context)).toBe(1)
    })

    it('previous が 1、previous2 が 0 の場合、1 を返す', () => {
      const context: IncrementContext = {
        type: 'fibonacci',
        current: 0,
        previous: 1,
        previous2: 0,
      }
      expect(increment.handle(context)).toBe(1)
    })

    it('previous が 1、previous2 が 1 の場合、2 を返す', () => {
      const context: IncrementContext = {
        type: 'fibonacci',
        current: 1,
        previous: 1,
        previous2: 1,
      }
      expect(increment.handle(context)).toBe(2)
    })

    it('previous が 2、previous2 が 1 の場合、3 を返す', () => {
      const context: IncrementContext = {
        type: 'fibonacci',
        current: 2,
        previous: 2,
        previous2: 1,
      }
      expect(increment.handle(context)).toBe(3)
    })

    it('previous が 3、previous2 が 2 の場合、5 を返す', () => {
      const context: IncrementContext = {
        type: 'fibonacci',
        current: 3,
        previous: 3,
        previous2: 2,
      }
      expect(increment.handle(context)).toBe(5)
    })

    it('previous が 5、previous2 が 3 の場合、8 を返す', () => {
      const context: IncrementContext = {
        type: 'fibonacci',
        current: 5,
        previous: 5,
        previous2: 3,
      }
      expect(increment.handle(context)).toBe(8)
    })

    it('previous のみが指定されている場合、previous + 0 を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (prev) => {
          const context: IncrementContext = {
            type: 'fibonacci',
            current: 0,
            previous: prev,
          }
          expect(increment.handle(context)).toBe(prev + 0)
        })
      )
    })

    it('previous2 のみが指定されている場合、1 + previous2 を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (prev2) => {
          const context: IncrementContext = {
            type: 'fibonacci',
            current: 0,
            previous2: prev2,
          }
          expect(increment.handle(context)).toBe(1 + prev2)
        })
      )
    })

    it('previous と previous2 が指定されている場合、previous + previous2 を返す', () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (prev, prev2) => {
          const context: IncrementContext = {
            type: 'fibonacci',
            current: 0,
            previous: prev,
            previous2: prev2,
          }
          expect(increment.handle(context)).toBe(prev + prev2)
        })
      )
    })
  })
})
