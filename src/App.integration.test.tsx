import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('アプリが正しくレンダリングされる', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('ボタンをクリックするとカウントが増える', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button')
    
    expect(button).toHaveTextContent('0')
    
    await user.click(button)
    expect(button).toHaveTextContent('1')
    
    await user.click(button)
    expect(button).toHaveTextContent('2')
  })

  it('3回クリックするとFizzが表示される', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button')
    
    await user.click(button)
    await user.click(button)
    await user.click(button)
    
    expect(button).toHaveTextContent('Fizz')
  })

  describe('モード切り替え', () => {
    it('ラジオボタンが正しくレンダリングされる', () => {
      render(<App />)
      const counterRadio = screen.getByRole('radio', { name: /カウンター/i })
      const fizzbuzzRadio = screen.getByRole('radio', { name: /FizzBuzz/i })
      
      expect(counterRadio).toBeInTheDocument()
      expect(fizzbuzzRadio).toBeInTheDocument()
    })

    it('デフォルトでFizzBuzzモードが選択されている', () => {
      render(<App />)
      const fizzbuzzRadio = screen.getByRole('radio', { name: /FizzBuzz/i })
      const counterRadio = screen.getByRole('radio', { name: /カウンター/i })
      
      expect(fizzbuzzRadio).toBeChecked()
      expect(counterRadio).not.toBeChecked()
    })

    it('カウンターモードのラジオボタンをクリックしてモードを切り替えられる', async () => {
      const user = userEvent.setup()
      render(<App />)
      const counterRadio = screen.getByRole('radio', { name: /カウンター/i })
      const button = screen.getByRole('button')
      
      await user.click(counterRadio)
      
      expect(counterRadio).toBeChecked()
      expect(button).toHaveTextContent('0')
    })

    it('FizzBuzzモードのラジオボタンをクリックしてモードを切り替えられる', async () => {
      const user = userEvent.setup()
      render(<App />)
      const counterRadio = screen.getByRole('radio', { name: /カウンター/i })
      const fizzbuzzRadio = screen.getByRole('radio', { name: /FizzBuzz/i })
      const button = screen.getByRole('button')
      
      await user.click(counterRadio)
      expect(counterRadio).toBeChecked()
      
      await user.click(fizzbuzzRadio)
      expect(fizzbuzzRadio).toBeChecked()
      expect(button).toHaveTextContent('0')
    })

    it('カウンターモードに切り替えた後、ボタンをクリックすると数値が表示される', async () => {
      const user = userEvent.setup()
      render(<App />)
      const counterRadio = screen.getByRole('radio', { name: /カウンター/i })
      const button = screen.getByRole('button')
      
      await user.click(counterRadio)
      await user.click(button)
      await user.click(button)
      await user.click(button)
      
      expect(button).toHaveTextContent('3')
    })

    it('カウンターモードで3回クリックしてもFizzではなく3が表示される', async () => {
      const user = userEvent.setup()
      render(<App />)
      const counterRadio = screen.getByRole('radio', { name: /カウンター/i })
      const button = screen.getByRole('button')
      
      await user.click(counterRadio)
      await user.click(button)
      await user.click(button)
      await user.click(button)
      
      expect(button).toHaveTextContent('3')
      expect(button).not.toHaveTextContent('Fizz')
    })

    it('カウンターモードからFizzBuzzモードに切り替えると、同じカウントでFizzBuzzルールが適用される', async () => {
      const user = userEvent.setup()
      render(<App />)
      const counterRadio = screen.getByRole('radio', { name: /カウンター/i })
      const fizzbuzzRadio = screen.getByRole('radio', { name: /FizzBuzz/i })
      const button = screen.getByRole('button')
      
      await user.click(counterRadio)
      await user.click(button)
      await user.click(button)
      await user.click(button)
      expect(button).toHaveTextContent('3')
      
      await user.click(fizzbuzzRadio)
      expect(button).toHaveTextContent('Fizz')
    })
  })

  describe('TimeGreetingコンポーネント', () => {
    describe('モック時刻を使った安定したテスト', () => {
      beforeEach(() => {
        vi.useFakeTimers()
      })

      afterEach(() => {
        vi.useRealTimers()
      })

      it('朝の時間帯（8時15分）で正しいメッセージが表示される', () => {
        vi.setSystemTime(new Date('2024-01-01T08:15:00'))
        render(<App />)
        
        expect(screen.getByText('おはようございます')).toBeInTheDocument()
        expect(screen.getByText('分: FizzBuzz')).toBeInTheDocument()
      })

      it('昼の時間帯（14時30分）で正しいメッセージが表示される', () => {
        vi.setSystemTime(new Date('2024-01-01T14:30:00'))
        render(<App />)
        
        expect(screen.getByText('こんにちは')).toBeInTheDocument()
        expect(screen.getByText('分: FizzBuzz')).toBeInTheDocument()
      })

      it('晩の時間帯（20時45分）で正しいメッセージが表示される', () => {
        vi.setSystemTime(new Date('2024-01-01T20:45:00'))
        render(<App />)
        
        expect(screen.getByText('こんばんは')).toBeInTheDocument()
        expect(screen.getByText('分: FizzBuzz')).toBeInTheDocument()
      })

      it('分数が3の倍数（3分）でFizzが表示される', () => {
        vi.setSystemTime(new Date('2024-01-01T10:03:00'))
        render(<App />)
        
        expect(screen.getByText('分: Fizz')).toBeInTheDocument()
      })

      it('分数が5の倍数（5分）でBuzzが表示される', () => {
        vi.setSystemTime(new Date('2024-01-01T10:05:00'))
        render(<App />)
        
        expect(screen.getByText('分: Buzz')).toBeInTheDocument()
      })

      it('分数が15の倍数（15分）でFizzBuzzが表示される', () => {
        vi.setSystemTime(new Date('2024-01-01T10:15:00'))
        render(<App />)
        
        expect(screen.getByText('分: FizzBuzz')).toBeInTheDocument()
      })

      it('分数が通常の数値（7分）で数値が表示される', () => {
        vi.setSystemTime(new Date('2024-01-01T10:07:00'))
        render(<App />)
        
        expect(screen.getByText('分: 7')).toBeInTheDocument()
      })

      it('深夜の時間帯（2時）で正しいメッセージが表示される', () => {
        vi.setSystemTime(new Date('2024-01-01T02:00:00'))
        render(<App />)
        
        expect(screen.getByText('こんばんは')).toBeInTheDocument()
      })
    })

    describe('実際の時刻を使ったflakyテスト（このテストは意図的にflakyです）', () => {
      it('現在の分数に応じたFizzBuzz結果が表示される', () => {
        // このテストは意図的にflakyです
        // テスト実行中に分が変わると失敗する可能性があります
        render(<App />)
        
        const now = new Date()
        const minute = now.getMinutes()
        
        // 分数に応じた期待値を計算
        let expectedValue: string
        if (minute % 15 === 0) {
          expectedValue = 'FizzBuzz'
        } else if (minute % 3 === 0) {
          expectedValue = 'Fizz'
        } else if (minute % 5 === 0) {
          expectedValue = 'Buzz'
        } else {
          expectedValue = minute.toString()
        }
        
        // このアサーションは、テスト実行中に分が変わると失敗する可能性がある
        expect(screen.getByText(`分: ${expectedValue}`)).toBeInTheDocument()
      })

      it('現在の時間帯に応じた挨拶メッセージが表示される', () => {
        // このテストは意図的にflakyです
        // テスト実行中に時間が変わると失敗する可能性があります
        render(<App />)
        
        const now = new Date()
        const hour = now.getHours()
        
        let expectedGreeting: string
        if (hour >= 5 && hour < 12) {
          expectedGreeting = 'おはようございます'
        } else if (hour >= 12 && hour < 18) {
          expectedGreeting = 'こんにちは'
        } else {
          expectedGreeting = 'こんばんは'
        }
        
        // このアサーションは、テスト実行中に時間が変わると失敗する可能性がある
        expect(screen.getByText(expectedGreeting)).toBeInTheDocument()
      })
    })
  })
})