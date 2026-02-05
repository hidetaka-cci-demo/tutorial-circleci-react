import type { IncrementHandler } from './incrementHandler'
import type { IncrementType } from '../../hooks/useFizzBuzz'

export class AddIncrement implements IncrementHandler {
  supports(context: { type: IncrementType }): boolean {
    return context.type === 'add'
  }

  handle(context: { current: number }): number {
    return context.current + 1
  }
}
