import Resolver from 'class-resolver'
import type { IncrementHandler, IncrementContext, IncrementResult } from './increments/incrementHandler'
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
  ): IncrementResult {
    const context: IncrementContext = { type, current, previous, previous2 }
    const handler = this.handlers.resolve(context)
    const next = handler.handle(context)
    
    // フィボナッチ数列の場合は、previousとprevious2も返す
    if (type === 'fibonacci') {
      // 連続呼び出しの場合: previousが定義されている場合はnextを返す（次回のpreviousとして使う）
      // 他のtypeから切り替わる場合: previousがundefinedの場合はデフォルト値1を返す
      const returnedPrevious = previous !== undefined ? next : 1
      // 連続呼び出しの場合: previousが定義されている場合はpreviousを返す（次回のprevious2として使う）
      // 他のtypeから切り替わる場合: previousがundefinedの場合はデフォルト値0を返す
      const returnedPrevious2 = previous !== undefined ? previous : 0
      
      return {
        next,
        previous: returnedPrevious,
        previous2: returnedPrevious2
      }
    }
    
    return { next }
  }
}

// シングルトンインスタンスをエクスポート
const incrementResolverInstance = new IncrementResolver()

export function resolveIncrement(
  type: IncrementType,
  current: number,
  previous?: number,
  previous2?: number
): IncrementResult {
  return incrementResolverInstance.execute(type, current, previous, previous2)
}
