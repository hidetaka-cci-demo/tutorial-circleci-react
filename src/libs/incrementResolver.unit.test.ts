import { describe, it, expect } from 'vitest'
import { resolveIncrement } from './incrementResolver'

describe('incrementResolver', () => {
  describe('各IncrementTypeの解決と結果', () => {
    it('"add" タイプに対して current + 1 を返す', () => {
      expect(resolveIncrement('add', 0).next).toBe(1)
      expect(resolveIncrement('add', 1).next).toBe(2)
      expect(resolveIncrement('add', 10).next).toBe(11)
      expect(resolveIncrement('add', -1).next).toBe(0)
    })

    it('"subtract" タイプに対して current - 1 を返す', () => {
      expect(resolveIncrement('subtract', 0).next).toBe(-1)
      expect(resolveIncrement('subtract', 1).next).toBe(0)
      expect(resolveIncrement('subtract', 10).next).toBe(9)
      expect(resolveIncrement('subtract', -1).next).toBe(-2)
    })

    it('"fibonacci" タイプに対して previous + previous2 を返す', () => {
      // デフォルト値（previous=1, previous2=0）で 1 を返す
      expect(resolveIncrement('fibonacci', 0).next).toBe(1)

      // 明示的に previous と previous2 を指定
      expect(resolveIncrement('fibonacci', 0, 1, 0).next).toBe(1)
      expect(resolveIncrement('fibonacci', 1, 1, 1).next).toBe(2)
      expect(resolveIncrement('fibonacci', 2, 2, 1).next).toBe(3)
      expect(resolveIncrement('fibonacci', 3, 3, 2).next).toBe(5)
      expect(resolveIncrement('fibonacci', 5, 5, 3).next).toBe(8)
    })

    it('"multiply" タイプに対して current * current を返す（0以外）', () => {
      expect(resolveIncrement('multiply', 1).next).toBe(1)
      expect(resolveIncrement('multiply', 2).next).toBe(4)
      expect(resolveIncrement('multiply', 3).next).toBe(9)
      expect(resolveIncrement('multiply', 4).next).toBe(16)
      expect(resolveIncrement('multiply', 10).next).toBe(100)
    })

    it('"multiply" タイプで 0 の場合は 1 を返す', () => {
      expect(resolveIncrement('multiply', 0).next).toBe(1)
    })

    it('"multiply" タイプで負の数でも正しく計算する', () => {
      expect(resolveIncrement('multiply', -1).next).toBe(1)
      expect(resolveIncrement('multiply', -2).next).toBe(4)
      expect(resolveIncrement('multiply', -3).next).toBe(9)
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
      expect(result1.next).toBe(1)
      previous2 = result1.previous2 ?? 0
      previous = result1.previous ?? 1
      current = result1.next

      // 2回目: 1 + 1 = 2
      const result2 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result2.next).toBe(2)
      previous2 = result2.previous2 ?? 0
      previous = result2.previous ?? 1
      current = result2.next

      // 3回目: 2 + 1 = 3
      const result3 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result3.next).toBe(3)
      previous2 = result3.previous2 ?? 0
      previous = result3.previous ?? 1
      current = result3.next

      // 4回目: 3 + 2 = 5
      const result4 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result4.next).toBe(5)
      previous2 = result4.previous2 ?? 0
      previous = result4.previous ?? 1
      current = result4.next

      // 5回目: 5 + 3 = 8
      const result5 = resolveIncrement('fibonacci', current, previous, previous2)
      expect(result5.next).toBe(8)
    })
  })

  describe('エッジケース', () => {
    it('大きな数でも正しく動作する', () => {
      expect(resolveIncrement('add', 1000000).next).toBe(1000001)
      expect(resolveIncrement('subtract', 1000000).next).toBe(999999)
      expect(resolveIncrement('multiply', 1000).next).toBe(1000000)
    })

    it('負の数でも正しく動作する', () => {
      expect(resolveIncrement('add', -100).next).toBe(-99)
      expect(resolveIncrement('subtract', -100).next).toBe(-101)
      expect(resolveIncrement('multiply', -10).next).toBe(100)
    })
  })

  describe('type切り替え時のバグ', () => {
    it('他のtypeからフィボナッチに切り替わる時にpreviousとprevious2が適切に初期化される', () => {
      // addタイプでいくつかカウントを進める
      let current = 0
      current = resolveIncrement('add', current).next
      expect(current).toBe(1)
      current = resolveIncrement('add', current).next
      expect(current).toBe(2)
      current = resolveIncrement('add', current).next
      expect(current).toBe(3)

      // ここでフィボナッチに切り替える
      // previousとprevious2がundefinedの状態で切り替わる
      const result = resolveIncrement('fibonacci', current)
      
      // nextは正しく計算される（デフォルト値で1+0=1）
      expect(result.next).toBe(1)
      
      // previousはデフォルト値の1が設定される（undefinedのため）
      expect(result.previous).toBe(1)
      
      // previous2はデフォルト値の0が設定される（undefinedのため）
      expect(result.previous2).toBe(0)
    })

    it('subtractタイプからフィボナッチに切り替わる時も同様', () => {
      let current = 10
      current = resolveIncrement('subtract', current).next
      expect(current).toBe(9)
      current = resolveIncrement('subtract', current).next
      expect(current).toBe(8)

      const result = resolveIncrement('fibonacci', current)
      expect(result.next).toBe(1)
      expect(result.previous).toBe(1) // デフォルト値
      expect(result.previous2).toBe(0) // デフォルト値
    })

    it('multiplyタイプからフィボナッチに切り替わる時も同様', () => {
      let current = 2
      current = resolveIncrement('multiply', current).next
      expect(current).toBe(4)
      current = resolveIncrement('multiply', current).next
      expect(current).toBe(16)

      const result = resolveIncrement('fibonacci', current)
      expect(result.next).toBe(1)
      expect(result.previous).toBe(1) // デフォルト値
      expect(result.previous2).toBe(0) // デフォルト値
    })
  })
})
