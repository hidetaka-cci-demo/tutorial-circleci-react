import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { FizzBuzzMode } from './FizzBuzzMode'
import type { ModeContext } from './modeHandler'

describe('FizzBuzzMode', () => {
  const mode = new FizzBuzzMode()

  describe('supports メソッド', () => {
    it('mode が "fizzbuzz" の場合、常に true を返す', () => {
      fc.assert(
        fc.property(fc.integer(), (count) => {
          const context: ModeContext = { mode: 'fizzbuzz', count }
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
    it('fizzBuzz 関数の結果を返す', () => {
      const testCases = [
        { count: 1, expected: '1' },
        { count: 2, expected: '2' },
        { count: 3, expected: 'Fizz' },
        { count: 4, expected: '4' },
        { count: 5, expected: 'Buzz' },
        { count: 6, expected: 'Fizz' },
        { count: 7, expected: '7' },
        { count: 9, expected: 'Fizz' },
        { count: 10, expected: 'Buzz' },
        { count: 12, expected: 'Fizz' },
        { count: 15, expected: 'FizzBuzz' },
        { count: 20, expected: 'Buzz' },
        { count: 30, expected: 'FizzBuzz' },
        { count: 0, expected: '0' },
      ]

      testCases.forEach(({ count, expected }) => {
        const context: ModeContext = { mode: 'fizzbuzz', count }
        expect(mode.handle(context)).toBe(expected)
      })
    })

    it('1を渡すと"1"を返す', () => {
      const context: ModeContext = { mode: 'fizzbuzz', count: 1 }
      expect(mode.handle(context)).toBe('1')
    })

    it('3を渡すと"Fizz"を返す', () => {
      const context: ModeContext = { mode: 'fizzbuzz', count: 3 }
      expect(mode.handle(context)).toBe('Fizz')
    })

    it('5を渡すと"Buzz"を返す', () => {
      const context: ModeContext = { mode: 'fizzbuzz', count: 5 }
      expect(mode.handle(context)).toBe('Buzz')
    })

    it('15を渡すと"FizzBuzz"を返す', () => {
      const context: ModeContext = { mode: 'fizzbuzz', count: 15 }
      expect(mode.handle(context)).toBe('FizzBuzz')
    })
  })
})
