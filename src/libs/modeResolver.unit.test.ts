import { describe, it, expect } from 'vitest'
import { resolveMode } from './modeResolver'

describe('resolveMode', () => {
  describe('counter モード', () => {
    it('count 0 を渡すと"0"を返す', () => {
      expect(resolveMode('counter', 0)).toBe('0')
    })

    it('count 1 を渡すと"1"を返す', () => {
      expect(resolveMode('counter', 1)).toBe('1')
    })

    it('count 5 を渡すと"5"を返す', () => {
      expect(resolveMode('counter', 5)).toBe('5')
    })

    it('count 10 を渡すと"10"を返す', () => {
      expect(resolveMode('counter', 10)).toBe('10')
    })

    it('count -1 を渡すと"-1"を返す', () => {
      expect(resolveMode('counter', -1)).toBe('-1')
    })

    it('count 100 を渡すと"100"を返す', () => {
      expect(resolveMode('counter', 100)).toBe('100')
    })
  })

  describe('fizzbuzz モード', () => {
    it('count 1 を渡すと"1"を返す', () => {
      expect(resolveMode('fizzbuzz', 1)).toBe('1')
    })

    it('count 3 を渡すと"Fizz"を返す', () => {
      expect(resolveMode('fizzbuzz', 3)).toBe('Fizz')
    })

    it('count 5 を渡すと"Buzz"を返す', () => {
      expect(resolveMode('fizzbuzz', 5)).toBe('Buzz')
    })

    it('count 15 を渡すと"FizzBuzz"を返す', () => {
      expect(resolveMode('fizzbuzz', 15)).toBe('FizzBuzz')
    })

    it('count 6 を渡すと"Fizz"を返す', () => {
      expect(resolveMode('fizzbuzz', 6)).toBe('Fizz')
    })

    it('count 10 を渡すと"Buzz"を返す', () => {
      expect(resolveMode('fizzbuzz', 10)).toBe('Buzz')
    })

    it('count 30 を渡すと"FizzBuzz"を返す', () => {
      expect(resolveMode('fizzbuzz', 30)).toBe('FizzBuzz')
    })

    it('count 0 を渡すと"0"を返す', () => {
      expect(resolveMode('fizzbuzz', 0)).toBe('0')
    })
  })

  describe('primeOrPerfect モード', () => {
    it('count 1 を渡すと"1"を返す', () => {
      expect(resolveMode('primeOrPerfect', 1)).toBe('1')
    })

    it('count 2 を渡すと"素数"を返す', () => {
      expect(resolveMode('primeOrPerfect', 2)).toBe('素数')
    })

    it('count 3 を渡すと"素数"を返す', () => {
      expect(resolveMode('primeOrPerfect', 3)).toBe('素数')
    })

    it('count 5 を渡すと"素数"を返す', () => {
      expect(resolveMode('primeOrPerfect', 5)).toBe('素数')
    })

    it('count 6 を渡すと"完全数"を返す', () => {
      expect(resolveMode('primeOrPerfect', 6)).toBe('完全数')
    })

    it('count 7 を渡すと"素数"を返す', () => {
      expect(resolveMode('primeOrPerfect', 7)).toBe('素数')
    })

    it('count 28 を渡すと"完全数"を返す', () => {
      expect(resolveMode('primeOrPerfect', 28)).toBe('完全数')
    })

    it('count 4 を渡すと"4"を返す', () => {
      expect(resolveMode('primeOrPerfect', 4)).toBe('4')
    })

    it('count 8 を渡すと"8"を返す', () => {
      expect(resolveMode('primeOrPerfect', 8)).toBe('8')
    })

    it('count 0 を渡すと"0"を返す', () => {
      expect(resolveMode('primeOrPerfect', 0)).toBe('0')
    })
  })
})
