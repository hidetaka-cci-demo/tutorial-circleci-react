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
})