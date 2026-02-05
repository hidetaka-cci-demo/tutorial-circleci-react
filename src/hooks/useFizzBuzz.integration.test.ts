import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFizzBuzz } from './useFizzBuzz'

describe('useFizzBuzz', () => {
  it('初期値は0を返す', () => {
    const { result } = renderHook(() => useFizzBuzz())
    expect(result.current.result).toBe('0')
  })

  it('1回クリックすると1を返す', () => {
    const { result } = renderHook(() => useFizzBuzz())
    act(() => {
      result.current.increment()
    })
    expect(result.current.result).toBe('1')
  })

  it('3回クリックするとFizzを返す', () => {
    const { result } = renderHook(() => useFizzBuzz())
    act(() => {
      result.current.increment()
      result.current.increment()
      result.current.increment()
    })
    expect(result.current.result).toBe('Fizz')
  })

  it('5回クリックするとBuzzを返す', () => {
    const { result } = renderHook(() => useFizzBuzz())
    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.increment()
      }
    })
    expect(result.current.result).toBe('Buzz')
  })

  it('15回クリックするとFizzBuzzを返す', () => {
    const { result } = renderHook(() => useFizzBuzz())
    act(() => {
      for (let i = 0; i < 15; i++) {
        result.current.increment()
      }
    })
    expect(result.current.result).toBe('FizzBuzz')
  })

  describe('モード切り替え', () => {
    it('デフォルトモードはfizzbuzzである', () => {
      const { result } = renderHook(() => useFizzBuzz())
      expect(result.current.mode).toBe('fizzbuzz')
    })

    it('カウンターモードでは数値がそのまま表示される', () => {
      const { result } = renderHook(() => useFizzBuzz())
      act(() => {
        result.current.setMode('counter')
      })
      expect(result.current.mode).toBe('counter')
      expect(result.current.result).toBe('0')
    })

    it('カウンターモードで3回クリックすると3が表示される', () => {
      const { result } = renderHook(() => useFizzBuzz())
      act(() => {
        result.current.setMode('counter')
        result.current.increment()
        result.current.increment()
        result.current.increment()
      })
      expect(result.current.result).toBe('3')
    })

    it('カウンターモードで5回クリックすると5が表示される', () => {
      const { result } = renderHook(() => useFizzBuzz())
      act(() => {
        result.current.setMode('counter')
        for (let i = 0; i < 5; i++) {
          result.current.increment()
        }
      })
      expect(result.current.result).toBe('5')
    })

    it('カウンターモードで15回クリックすると15が表示される', () => {
      const { result } = renderHook(() => useFizzBuzz())
      act(() => {
        result.current.setMode('counter')
        for (let i = 0; i < 15; i++) {
          result.current.increment()
        }
      })
      expect(result.current.result).toBe('15')
    })

    it('fizzbuzzモードからcounterモードに切り替えられる', () => {
      const { result } = renderHook(() => useFizzBuzz())
      act(() => {
        result.current.increment()
        result.current.increment()
        result.current.increment()
      })
      expect(result.current.result).toBe('Fizz')
      
      act(() => {
        result.current.setMode('counter')
      })
      expect(result.current.mode).toBe('counter')
      expect(result.current.result).toBe('3')
    })

    it('counterモードからfizzbuzzモードに切り替えられる', () => {
      const { result } = renderHook(() => useFizzBuzz())
      act(() => {
        result.current.setMode('counter')
        result.current.increment()
        result.current.increment()
        result.current.increment()
      })
      expect(result.current.result).toBe('3')
      
      act(() => {
        result.current.setMode('fizzbuzz')
      })
      expect(result.current.mode).toBe('fizzbuzz')
      expect(result.current.result).toBe('Fizz')
    })

    it('モード切り替え後もincrementが正常に動作する', () => {
      const { result } = renderHook(() => useFizzBuzz())
      act(() => {
        result.current.setMode('counter')
        result.current.increment()
      })
      expect(result.current.result).toBe('1')
      
      act(() => {
        result.current.setMode('fizzbuzz')
        result.current.increment()
      })
      expect(result.current.result).toBe('2')
      
      act(() => {
        result.current.increment()
      })
      expect(result.current.result).toBe('Fizz')
    })
  })
})