import Resolver from 'class-resolver'
import type { IncrementHandler, IncrementContext } from './increments/incrementHandler'
import type { IncrementType } from '../hooks/useFizzBuzz'
import { AddIncrement } from './increments/AddIncrement'
import { SubtractIncrement } from './increments/SubtractIncrement'
import { FibonacciIncrement } from './increments/FibonacciIncrement'
import { MultiplyIncrement } from './increments/MultiplyIncrement'

// IncrementResolverクラスの実装
class IncrementResolver {
  private handlers: Resolver<IncrementHandler, IncrementContext>

  constructor() {
    this.handlers = new Resolver<IncrementHandler, IncrementContext>(
      new AddIncrement(),
      new SubtractIncrement(),
      new FibonacciIncrement(),
      new MultiplyIncrement()
    )
  }

  execute(
    type: IncrementType,
    current: number,
    previous?: number,
    previous2?: number
  ): number {
    const context: IncrementContext = { type, current, previous, previous2 }
    const handler = this.handlers.resolve(context)
    return handler.handle(context)
  }
}

// シングルトンインスタンスをエクスポート
const incrementResolverInstance = new IncrementResolver()

export function resolveIncrement(
  type: IncrementType,
  current: number,
  previous?: number,
  previous2?: number
): number {
  return incrementResolverInstance.execute(type, current, previous, previous2)
}
