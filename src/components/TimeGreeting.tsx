import { fizzBuzz } from '../libs/fizzBuzz'

export function TimeGreeting() {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()

  let greeting: string
  if (hour >= 5 && hour < 12) {
    greeting = 'おはようございます'
  } else if (hour >= 12 && hour < 18) {
    greeting = 'こんにちは'
  } else {
    greeting = 'こんばんは'
  }

  const minuteFizzBuzz = fizzBuzz(minute)

  return (
    <div className="time-greeting">
      <div className="greeting-message">{greeting}</div>
      <div className="minute-fizzbuzz">分: {minuteFizzBuzz}</div>
    </div>
  )
}
