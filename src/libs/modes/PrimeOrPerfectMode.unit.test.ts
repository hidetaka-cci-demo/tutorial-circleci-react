import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { PrimeOrPerfectMode } from './PrimeOrPerfectMode'
import type { ModeContext } from './modeHandler'

describe('PrimeOrPerfectMode', () => {
  const mode = new PrimeOrPerfectMode()

  describe('supports メソッド', () => {
    it('mode が "primeOrPerfect" の場合、常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (count) => {
          const context: ModeContext = { mode: 'primeOrPerfect', count }
          expect(mode.supports(context)).toBe(true)
        })
      )
    })

    it('mode が "counter" の場合、常に false を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (count) => {
          const context: ModeContext = { mode: 'counter', count }
          expect(mode.supports(context)).toBe(false)
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
  })

  describe('handle メソッド', () => {
    it('primeOrPerfect 関数の結果を返す', () => {
      const testCases = [
        { count: 1, expected: '1' },
        { count: 2, expected: '素数' },
        { count: 3, expected: '素数' },
        { count: 4, expected: '4' },
        { count: 5, expected: '素数' },
        { count: 6, expected: '完全数' },
        { count: 7, expected: '素数' },
        { count: 8, expected: '8' },
        { count: 9, expected: '9' },
        { count: 10, expected: '10' },
        { count: 11, expected: '素数' },
        { count: 13, expected: '素数' },
        { count: 28, expected: '完全数' },
        { count: 0, expected: '0' },
      ]

      testCases.forEach(({ count, expected }) => {
        const context: ModeContext = { mode: 'primeOrPerfect', count }
        expect(mode.handle(context)).toBe(expected)
      })
    })

    it('2を渡すと"素数"を返す', () => {
      const context: ModeContext = { mode: 'primeOrPerfect', count: 2 }
      expect(mode.handle(context)).toBe('素数')
    })

    it('6を渡すと"完全数"を返す', () => {
      const context: ModeContext = { mode: 'primeOrPerfect', count: 6 }
      expect(mode.handle(context)).toBe('完全数')
    })

    it('28を渡すと"完全数"を返す', () => {
      const context: ModeContext = { mode: 'primeOrPerfect', count: 28 }
      expect(mode.handle(context)).toBe('完全数')
    })

    it('4を渡すと"4"を返す', () => {
      const context: ModeContext = { mode: 'primeOrPerfect', count: 4 }
      expect(mode.handle(context)).toBe('4')
    })
  })
})
