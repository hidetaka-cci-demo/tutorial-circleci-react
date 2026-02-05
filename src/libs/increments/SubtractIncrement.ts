import type { IncrementHandler } from './incrementHandler'
import type { IncrementType } from '../../hooks/useFizzBuzz'

export class SubtractIncrement implements IncrementHandler {
  supports(context: { type: IncrementType }): boolean {
    return context.type === 'subtract'
  }

  handle(context: { current: number }): number {
    return context.current - 1
  }
}
