import { describe, it, expect } from 'vitest'
import { fizzBuzz } from './fizzBuzz'

describe('fizzBuzz', () => {
  describe('基本ケース', () => {
    it('1を渡すと"1"を返す', () => {
      expect(fizzBuzz(1)).toBe('1')
    })

    it('2を渡すと"2"を返す', () => {
      expect(fizzBuzz(2)).toBe('2')
    })

    it('4を渡すと"4"を返す', () => {
      expect(fizzBuzz(4)).toBe('4')
    })

    it('7を渡すと"7"を返す', () => {
      expect(fizzBuzz(7)).toBe('7')
    })

    it('11を渡すと"11"を返す', () => {
      expect(fizzBuzz(11)).toBe('11')
    })
  })

  describe('Fizz ケース（3の倍数）', () => {
    it('3を渡すと"Fizz"を返す', () => {
      expect(fizzBuzz(3)).toBe('Fizz')
    })

    it('6を渡すと"Fizz"を返す', () => {
      expect(fizzBuzz(6)).toBe('Fizz')
    })

    it('9を渡すと"Fizz"を返す', () => {
      expect(fizzBuzz(9)).toBe('Fizz')
    })

    it('12を渡すと"Fizz"を返す', () => {
      expect(fizzBuzz(12)).toBe('Fizz')
    })

    it('18を渡すと"Fizz"を返す', () => {
      expect(fizzBuzz(18)).toBe('Fizz')
    })
  })

  describe('Buzz ケース（5の倍数）', () => {
    it('5を渡すと"Buzz"を返す', () => {
      expect(fizzBuzz(5)).toBe('Buzz')
    })

    it('10を渡すと"Buzz"を返す', () => {
      expect(fizzBuzz(10)).toBe('Buzz')
    })

    it('20を渡すと"Buzz"を返す', () => {
      expect(fizzBuzz(20)).toBe('Buzz')
    })

    it('25を渡すと"Buzz"を返す', () => {
      expect(fizzBuzz(25)).toBe('Buzz')
    })
  })

  describe('FizzBuzz ケース（15の倍数）', () => {
    it('15を渡すと"FizzBuzz"を返す', () => {
      expect(fizzBuzz(15)).toBe('FizzBuzz')
    })

    it('30を渡すと"FizzBuzz"を返す', () => {
      expect(fizzBuzz(30)).toBe('FizzBuzz')
    })

    it('45を渡すと"FizzBuzz"を返す', () => {
      expect(fizzBuzz(45)).toBe('FizzBuzz')
    })

    it('60を渡すと"FizzBuzz"を返す', () => {
      expect(fizzBuzz(60)).toBe('FizzBuzz')
    })
  })

  describe('エッジケース', () => {
    it('0を渡すと"0"を返す', () => {
      expect(fizzBuzz(0)).toBe('0')
    })
  })
})
