import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { MultiplyIncrement } from './MultiplyIncrement'
import type { IncrementContext } from './incrementHandler'

describe('MultiplyIncrement', () => {
  const increment = new MultiplyIncrement()

  describe('supports メソッド', () => {
    it('type が "multiply" の場合、常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context: IncrementContext = { type: 'multiply', current }
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

    it('type が "fibonacci" の場合、常に false を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context: IncrementContext = { type: 'fibonacci', current }
          expect(increment.supports(context)).toBe(false)
        })
      )
    })
  })

  describe('handle メソッド', () => {
    it('current が 0 の場合、1 を返す', () => {
      const context: IncrementContext = { type: 'multiply', current: 0 }
      expect(increment.handle(context)).toBe(1)
    })

    it('current が 0 以外の場合、current * current を返す', () => {
      fc.assert(
        fc.property(
          fc.integer().filter((n) => n !== 0),
          (current) => {
            const context: IncrementContext = { type: 'multiply', current }
            expect(increment.handle(context)).toBe(current * current)
          }
        )
      )
    })

    it('current 1 を渡すと 1 を返す', () => {
      const context: IncrementContext = { type: 'multiply', current: 1 }
      expect(increment.handle(context)).toBe(1)
    })

    it('current 2 を渡すと 4 を返す', () => {
      const context: IncrementContext = { type: 'multiply', current: 2 }
      expect(increment.handle(context)).toBe(4)
    })

    it('current 3 を渡すと 9 を返す', () => {
      const context: IncrementContext = { type: 'multiply', current: 3 }
      expect(increment.handle(context)).toBe(9)
    })

    it('current 5 を渡すと 25 を返す', () => {
      const context: IncrementContext = { type: 'multiply', current: 5 }
      expect(increment.handle(context)).toBe(25)
    })

    it('current -1 を渡すと 1 を返す', () => {
      const context: IncrementContext = { type: 'multiply', current: -1 }
      expect(increment.handle(context)).toBe(1)
    })

    it('current -2 を渡すと 4 を返す', () => {
      const context: IncrementContext = { type: 'multiply', current: -2 }
      expect(increment.handle(context)).toBe(4)
    })
  })
})
