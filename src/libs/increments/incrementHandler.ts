import { type ResolveTarget } from 'class-resolver'
import type { IncrementType } from '../../hooks/useFizzBuzz'

export type IncrementContext = {
  type: IncrementType
  current: number
  previous?: number
  previous2?: number
}

// インクリメントタイプベースの処理を行うIncrementHandlerインターフェース
export interface IncrementHandler extends ResolveTarget<[IncrementContext], number, IncrementContext> {
  supports(context: IncrementContext): boolean
  handle(context: IncrementContext): number
}
