import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TimeGreeting } from './TimeGreeting'

describe('TimeGreeting', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('時間帯による挨拶メッセージ', () => {
    it('朝の時間帯（5-11時）で「おはようございます」が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T08:00:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('おはようございます')).toBeInTheDocument()
    })

    it('昼の時間帯（12-17時）で「こんにちは」が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T14:00:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('こんにちは')).toBeInTheDocument()
    })

    it('晩の時間帯（18-4時）で「こんばんは」が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T20:00:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('こんばんは')).toBeInTheDocument()
    })

    it('深夜（2時）で「こんばんは」が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T02:00:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('こんばんは')).toBeInTheDocument()
    })

    it('早朝（5時）で「おはようございます」が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T05:00:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('おはようございます')).toBeInTheDocument()
    })

    it('正午（12時）で「こんにちは」が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T12:00:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('こんにちは')).toBeInTheDocument()
    })

    it('夕方（18時）で「こんばんは」が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T18:00:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('こんばんは')).toBeInTheDocument()
    })
  })

  describe('分数のFizzBuzz表示', () => {
    it('分数が3の倍数（3分）でFizzが表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T10:03:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('分: Fizz')).toBeInTheDocument()
    })

    it('分数が5の倍数（5分）でBuzzが表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T10:05:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('分: Buzz')).toBeInTheDocument()
    })

    it('分数が15の倍数（15分）でFizzBuzzが表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T10:15:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('分: FizzBuzz')).toBeInTheDocument()
    })

    it('分数が30の倍数（30分）でFizzBuzzが表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T10:30:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('分: FizzBuzz')).toBeInTheDocument()
    })

    it('分数が45の倍数（45分）でFizzBuzzが表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T10:45:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('分: FizzBuzz')).toBeInTheDocument()
    })

    it('分数が通常の数値（7分）で数値が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T10:07:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('分: 7')).toBeInTheDocument()
    })

    it('分数が0分で数値が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T10:00:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('分: 0')).toBeInTheDocument()
    })

    it('分数が1分で数値が表示される', () => {
      vi.setSystemTime(new Date('2024-01-01T10:01:00'))
      render(<TimeGreeting />)
      
      expect(screen.getByText('分: 1')).toBeInTheDocument()
    })
  })
})
