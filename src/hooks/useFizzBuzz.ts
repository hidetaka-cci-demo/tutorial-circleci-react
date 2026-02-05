import { useState } from 'react'

function fizzBuzz(n: number): string {
  if (n === 0) return '0'
  if (n % 15 === 0) return 'FizzBuzz'
  if (n % 3 === 0) return 'Fizz'
  if (n % 5 === 0) return 'Buzz'
  return n.toString()
}

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
