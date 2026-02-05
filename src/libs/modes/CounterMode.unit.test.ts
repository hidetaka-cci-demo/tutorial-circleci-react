import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { CounterMode } from './CounterMode'
import type { ModeContext } from './modeHandler'

describe('CounterMode', () => {
  const mode = new CounterMode()

  describe('supports メソッド', () => {
    it('mode が "counter" の場合、常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (count) => {
          const context: ModeContext = { mode: 'counter', count }
          expect(mode.supports(context)).toBe(true)
        })
      )
    })

    it('mode が "fizzbuzz" の場合、常に false を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (count) => {
          const context: ModeContext = { mode: 'fizzbuzz', count }
          expect(mode.supports(context)).toBe(false)
        })
      )
    })

    it('mode が "primeOrPerfect" の場合、常に false を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (count) => {
          const context: ModeContext = { mode: 'primeOrPerfect', count }
          expect(mode.supports(context)).toBe(false)
        })
      )
    })
  })

  describe('handle メソッド', () => {
    it('count を文字列に変換して返す', () => {
      fc.assert(
        fc.property(fc.integer(), (count) => {
          const context: ModeContext = { mode: 'counter', count }
          expect(mode.handle(context)).toBe(count.toString())
        })
      )
    })

    it('count 0 を渡すと"0"を返す', () => {
      const context: ModeContext = { mode: 'counter', count: 0 }
      expect(mode.handle(context)).toBe('0')
    })

    it('count 1 を渡すと"1"を返す', () => {
      const context: ModeContext = { mode: 'counter', count: 1 }
      expect(mode.handle(context)).toBe('1')
    })

    it('count -1 を渡すと"-1"を返す', () => {
      const context: ModeContext = { mode: 'counter', count: -1 }
      expect(mode.handle(context)).toBe('-1')
    })

    it('count 100 を渡すと"100"を返す', () => {
      const context: ModeContext = { mode: 'counter', count: 100 }
      expect(mode.handle(context)).toBe('100')
    })
  })
})
