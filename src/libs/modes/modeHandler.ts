import { type ResolveTarget } from 'class-resolver'
import type { Mode } from '../../hooks/useFizzBuzz'

export type ModeContext = {
  mode: Mode
  count: number
}

// モードベースの処理を行うModeHandlerインターフェース
export interface ModeHandler extends ResolveTarget<[ModeContext], string, ModeContext> {
  supports(context: ModeContext): boolean
  handle(context: ModeContext): string
}
