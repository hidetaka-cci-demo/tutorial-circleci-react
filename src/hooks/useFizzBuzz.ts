import { useState } from 'react'
import { fizzBuzz } from '../libs/fizzBuzz'
import { primeOrPerfect } from '../libs/primeOrPerfect'

export type Mode = 'counter' | 'fizzbuzz' | 'primeOrPerfect'

export function useFizzBuzz() {
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState<Mode>('fizzbuzz')

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const result =
    mode === 'counter'
      ? count.toString()
      : mode === 'fizzbuzz'
        ? fizzBuzz(count)
        : primeOrPerfect(count)

  return {
    count,
    result,
    increment,
    mode,
    setMode,
  }
}
