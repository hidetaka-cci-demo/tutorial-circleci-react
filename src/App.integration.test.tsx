import { describe, it, expect } from 'vitest'
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
})