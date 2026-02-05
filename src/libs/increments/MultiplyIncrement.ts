import type { IncrementHandler } from './incrementHandler'
import type { IncrementType } from '../../hooks/useFizzBuzz'

export class MultiplyIncrement implements IncrementHandler {
  supports(context: { type: IncrementType }): boolean {
    return context.type === 'multiply'
  }

  handle(context: { current: number }): number {
    if (context.current === 0) {
      return 1
    }
    return context.current * context.current
  }
}
