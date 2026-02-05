import { useState } from 'react'
import { fizzBuzz } from '../libs/fizzBuzz'

export function useFizzBuzz() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  return {
    count,
    result: fizzBuzz(count),
    increment,
  }
}
