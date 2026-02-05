import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { AddIncrement } from './AddIncrement'
import type { IncrementContext } from './incrementHandler'

describe('AddIncrement', () => {
  const increment = new AddIncrement()

  describe('supports メソッド', () => {
    it('type が "add" の場合、常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context: IncrementContext = { type: 'add', current }
          expect(increment.supports(context)).toBe(true)
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
    it('current + 1 を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (current) => {
          const context: IncrementContext = { type: 'add', current }
          expect(increment.handle(context)).toBe(current + 1)
        })
      )
    })

    it('current 0 を渡すと 1 を返す', () => {
      const context: IncrementContext = { type: 'add', current: 0 }
      expect(increment.handle(context)).toBe(1)
    })

    it('current 1 を渡すと 2 を返す', () => {
      const context: IncrementContext = { type: 'add', current: 1 }
      expect(increment.handle(context)).toBe(2)
    })

    it('current 5 を渡すと 6 を返す', () => {
      const context: IncrementContext = { type: 'add', current: 5 }
      expect(increment.handle(context)).toBe(6)
    })

    it('current -1 を渡すと 0 を返す', () => {
      const context: IncrementContext = { type: 'add', current: -1 }
      expect(increment.handle(context)).toBe(0)
    })

    it('current 100 を渡すと 101 を返す', () => {
      const context: IncrementContext = { type: 'add', current: 100 }
      expect(increment.handle(context)).toBe(101)
    })
  })
})
