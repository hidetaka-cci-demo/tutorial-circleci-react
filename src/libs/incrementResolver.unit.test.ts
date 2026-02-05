import { describe, it, expect } from 'vitest'
import { resolveIncrement } from './incrementResolver'
import type { IncrementType } from '../hooks/useFizzBuzz'

describe('incrementResolver', () => {
  describe('各IncrementTypeの解決と結果', () => {
    it('"add" タイプに対して current + 1 を返す', () => {
      expect(resolveIncrement('add', 0)).toBe(1)
      expect(resolveIncrement('add', 1)).toBe(2)
      expect(resolveIncrement('add', 10)).toBe(11)
      expect(resolveIncrement('add', -1)).toBe(0)
    })

    it('"subtract" タイプに対して current - 1 を返す', () => {
      expect(resolveIncrement('subtract', 0)).toBe(-1)
      expect(resolveIncrement('subtract', 1)).toBe(0)
      expect(resolveIncrement('subtract', 10)).toBe(9)
      expect(resolveIncrement('subtract', -1)).toBe(-2)
    })

    it('"fibonacci" タイプに対して previous + previous2 を返す', () => {
      // デフォルト値（previous=1, previous2=0）で 1 を返す
      expect(resolveIncrement('fibonacci', 0)).toBe(1)

      // 明示的に previous と previous2 を指定
      expect(resolveIncrement('fibonacci', 0, 1, 0)).toBe(1)
      expect(resolveIncrement('fibonacci', 1, 1, 1)).toBe(2)
      expect(resolveIncrement('fibonacci', 2, 2, 1)).toBe(3)
      expect(resolveIncrement('fibonacci', 3, 3, 2)).toBe(5)
      expect(resolveIncrement('fibonacci', 5, 5, 3)).toBe(8)
    })

    it('"multiply" タイプに対して current * current を返す（0以外）', () => {
      expect(resolveIncrement('multiply', 1)).toBe(1)
      expect(resolveIncrement('multiply', 2)).toBe(4)
      expect(resolveIncrement('multiply', 3)).toBe(9)
      expect(resolveIncrement('multiply', 4)).toBe(16)
      expect(resolveIncrement('multiply', 10)).toBe(100)
    })

    it('"multiply" タイプで 0 の場合は 1 を返す', () => {
      expect(resolveIncrement('multiply', 0)).toBe(1)
    })

    it('"multiply" タイプで負の数でも正しく計算する', () => {
      expect(resolveIncrement('multiply', -1)).toBe(1)
      expect(resolveIncrement('multiply', -2)).toBe(4)
      expect(resolveIncrement('multiply', -3)).toBe(9)
    })
  })

  describe('フィボナッチ数列の連続呼び出し', () => {
    it('連続した呼び出しでフィボナッチ数列を生成する', () => {
      // フィボナッチ数列: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
      let previous2 = 0
      let previous = 1
      let current = 0

      // 1回目: 0 + 1 = 1
      const result1 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result1).toBe(1)
      previous2 = previous
      previous = result1
      current = result1

      // 2回目: 1 + 1 = 2
      const result2 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result2).toBe(2)
      previous2 = previous
      previous = result2
      current = result2

      // 3回目: 2 + 1 = 3
      const result3 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result3).toBe(3)
      previous2 = previous
      previous = result3
      current = result3

      // 4回目: 3 + 2 = 5
      const result4 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result4).toBe(5)
      previous2 = previous
      previous = result4
      current = result4

      // 5回目: 5 + 3 = 8
      const result5 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result5).toBe(8)
    })
  })

  describe('エッジケース', () => {
    it('大きな数でも正しく動作する', () => {
      expect(resolveIncrement('add', 1000000)).toBe(1000001)
      expect(resolveIncrement('subtract', 1000000)).toBe(999999)
      expect(resolveIncrement('multiply', 1000)).toBe(1000000)
    })

    it('負の数でも正しく動作する', () => {
      expect(resolveIncrement('add', -100)).toBe(-99)
      expect(resolveIncrement('subtract', -100)).toBe(-101)
      expect(resolveIncrement('multiply', -10)).toBe(100)
    })
  })
})
