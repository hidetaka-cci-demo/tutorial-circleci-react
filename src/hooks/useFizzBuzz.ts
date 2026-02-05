import { useState } from 'react'
import { resolveMode } from '../libs/modeResolver'
import { resolveIncrement } from '../libs/incrementResolver'

export type Mode = 'counter' | 'fizzbuzz' | 'primeOrPerfect'
export type IncrementType = 'add' | 'subtract' | 'fibonacci' | 'multiply'

export function useFizzBuzz() {
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState<Mode>('fizzbuzz')
  const [incrementType, setIncrementType] = useState<IncrementType>('add')
  const [previous, setPrevious] = useState<number | undefined>(1)
  const [previous2, setPrevious2] = useState<number | undefined>(0)

  const increment = () => {
    setCount((prev) => {
      const result = resolveIncrement(incrementType, prev, previous, previous2)
      
      if (result.previous !== undefined) {
        setPrevious(result.previous)
      }
      if (result.previous2 !== undefined) {
        setPrevious2(result.previous2)
      }
      
      return result.next
    })
  }

  const result = resolveMode(mode, count)

  return {
    count,
    result,
    increment,
    mode,
    setMode,
    incrementType,
    setIncrementType,
  }
}
