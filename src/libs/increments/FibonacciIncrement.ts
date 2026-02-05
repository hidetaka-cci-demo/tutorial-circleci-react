import type { IncrementHandler } from './incrementHandler'
import type { IncrementType } from '../../hooks/useFizzBuzz'

export class FibonacciIncrement implements IncrementHandler {
  supports(context: { type: IncrementType }): boolean {
    return context.type === 'fibonacci'
  }

  handle(context: { current: number; previous?: number; previous2?: number }): number {
    const prev = context.previous ?? 1
    const prev2 = context.previous2 ?? 0
    return prev + prev2
  }
}
