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
})