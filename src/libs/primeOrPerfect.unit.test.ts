import { describe, it, expect } from 'vitest'
import { primeOrPerfect } from './primeOrPerfect'

describe('primeOrPerfect', () => {
  describe('基本ケース', () => {
    it('1を渡すと"1"を返す', () => {
      expect(primeOrPerfect(1)).toBe('1')
    })

    it('4を渡すと"4"を返す', () => {
      expect(primeOrPerfect(4)).toBe('4')
    })

    it('8を渡すと"8"を返す', () => {
      expect(primeOrPerfect(8)).toBe('8')
    })

    it('9を渡すと"9"を返す', () => {
      expect(primeOrPerfect(9)).toBe('9')
    })

    it('10を渡すと"10"を返す', () => {
      expect(primeOrPerfect(10)).toBe('10')
    })
  })

  describe('素数ケース', () => {
    it('2を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(2)).toBe('素数')
    })

    it('3を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(3)).toBe('素数')
    })

    it('5を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(5)).toBe('素数')
    })

    it('7を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(7)).toBe('素数')
    })

    it('11を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(11)).toBe('素数')
    })

    it('13を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(13)).toBe('素数')
    })

    it('17を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(17)).toBe('素数')
    })

    it('19を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(19)).toBe('素数')
    })

    it('23を渡すと"素数"を返す', () => {
      expect(primeOrPerfect(23)).toBe('素数')
    })
  })

  describe('完全数ケース', () => {
    it('6を渡すと"完全数"を返す', () => {
      expect(primeOrPerfect(6)).toBe('完全数')
    })

    it('28を渡すと"完全数"を返す', () => {
      expect(primeOrPerfect(28)).toBe('完全数')
    })

    it('496を渡すと"完全数"を返す', () => {
      expect(primeOrPerfect(496)).toBe('完全数')
    })

    it('8128を渡すと"完全数"を返す', () => {
      expect(primeOrPerfect(8128)).toBe('完全数')
    })
  })

  describe('エッジケース', () => {
    it('0を渡すと"0"を返す', () => {
      expect(primeOrPerfect(0)).toBe('0')
    })
  })
})
