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
      const next = resolveIncrement(incrementType, prev, previous, previous2)
      
      // フィボナッチ数列の場合は、前の2つの値を更新
      if (incrementType === 'fibonacci') {
        setPrevious2(previous)
        setPrevious(next)
      }
      
      return next
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
