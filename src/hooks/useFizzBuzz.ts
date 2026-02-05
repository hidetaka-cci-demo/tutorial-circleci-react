import { useState } from 'react'
import { resolveMode } from '../libs/modeResolver'

export type Mode = 'counter' | 'fizzbuzz' | 'primeOrPerfect'

export function useFizzBuzz() {
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState<Mode>('fizzbuzz')

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const result = resolveMode(mode, count)

  return {
    count,
    result,
    increment,
    mode,
    setMode,
  }
}
